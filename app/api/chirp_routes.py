from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.forms.chirp_form import ChirpForm
from app.models import db
from app.models.db import Chirp

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

@chirp_routes.route('/', methods=['POST'])
def add_chirp():
    form = ChirpForm()
    print('form data: ', form.data)
    chirp = Chirp(
        body=form.data['body'],
        media=form.data['media'],
        userId=form.data['userId']
    )
    print('chirp: ', chirp)
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
