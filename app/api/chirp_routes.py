from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.chirp_form import ChirpForm
from app.models import db
from app.models.db import Chirp
from app.s3_funcs import upload_file_to_s3, allowed_file, get_unique_filename

chirp_routes = Blueprint('chirps', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@chirp_routes.route('/')
def get_chirps():
  chirps = Chirp.query.all()
  return jsonify([chirp.to_dict() for chirp in chirps])

@chirp_routes.route('/new', methods=['POST'])
def add_chirp():

    if "media" not in request.files:
        return {"error": "image required"}, 400

    image = request.files["media"]

    if not allowed_file(image.filename):
        return {"error": "file type must be png, jpg, jpeg, or gif"}, 400

    image.filename = get_unique_filename(image.filename)
    print('image filename: ', image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    new_chirp = Chirp(
        body=request.form.get('body'),
        media=url,
        userId=request.form.get('userId')
    )
    db.session.add(new_chirp)
    db.session.commit()

    return new_chirp.to_dict()

@chirp_routes.route('/', methods=["POST"])
def add_chirp_noimg():
    form = ChirpForm()
    print('form data: ', form.data)
    chirp = Chirp(
        body=form.data['body'],
        media=form.data['media'],
        userId=form.data['userId']
    )
    db.session.add(chirp)
    db.session.commit()

    return chirp.to_dict()


@chirp_routes.route('/<int:chirpId>', methods=['PUT'])
def update_chirp(chirpId):
    chirp = Chirp.query.get(chirpId)
    form = ChirpForm()
    chirp.body = form.data['body']
    chirp.media = form.data['media']
    chirp.userId = form.data['userId']
    db.session.commit()
    return chirp.to_dict()



@chirp_routes.route('/<int:chirpId>', methods=['DELETE'])
def delete_chirp(chirpId):
    chirp = Chirp.query.get(chirpId)
    db.session.delete(chirp)
    db.session.commit()
    return "Delete Successful"


#like routes

@chirp_routes.route('/likes/<int:chirpId>', methods=['PUT'])
@login_required
def likeChirp(chirpId):
    chirp = Chirp.query.get(chirpId)
    chirp.addLikeChirp(current_user)
    db.session.commit()
    return chirp.to_dict()

@chirp_routes.route('/unlikes/<int:chirpId>', methods=['PUT'])
@login_required
def unlikeChirp(chirpId):
    chirp = Chirp.query.get(chirpId)
    chirp.unlikeChirp(current_user)
    db.session.commit()
    return chirp.to_dict()
