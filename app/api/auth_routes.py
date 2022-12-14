from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.s3_funcs import allowed_file, get_unique_filename, upload_file_to_s3

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            name=form.data['name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profile_pic=form.data['profile_pic'],
            cover_photo=form.data['cover_photo'],
            bio=form.data['bio']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/profileimage', methods=["POST"])
def add_profile_pic():
    if "profile_pic" not in request.files:
        return {"error": "image required"}, 400

    if 'cover_photo' not in request.files:
        return {'error': 'image required'}, 400

    image1 = request.files["profile_pic"]
    image2 = request.files['cover_photo']

    if not allowed_file(image1.filename):
        return {"error": "file type must be png, jpg, jpeg, or gif"}, 400

    if not allowed_file(image2.filename):
        return {"error": "file type must be png, jpg, jpeg, or gif"}, 400

    image1.filename = get_unique_filename(image1.filename)
    print('image filename: ', image1.filename)

    upload1 = upload_file_to_s3(image1)

    image2.filename = get_unique_filename(image2.filename)
    print('image filename: ', image2.filename)

    upload2 = upload_file_to_s3(image2)

    if "url" not in upload1:
        return upload1, 400

    if "url" not in upload2:
        return upload2, 400

    url1 = upload1["url"]

    url2 = upload2["url"]

    return {'profile_pic': url1, 'cover_photo': url2}


@auth_routes.route('/coverphoto', methods=["POST"])
def add_cover_photo():
    if "cover_photo" not in request.files:
        return {"error": "image required"}, 400

    image = request.files["cover_photo"]

    if not allowed_file(image.filename):
        return {"error": "file type must be png, jpg, jpeg, or gif"}, 400

    image.filename = get_unique_filename(image.filename)
    print('image filename: ', image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    return {'cover_photo': url}
