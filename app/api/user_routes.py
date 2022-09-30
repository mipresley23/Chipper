from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User

user_routes = Blueprint('users', __name__)

#get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


#get one user by id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


#route for adding follower
@user_routes.route('/follows/<int:userId>', methods=["PUT"])
@login_required
def add_follow(userId):
    user = User.query.get(userId)
    print('add follow user: ', user)
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()


#route for removing follower
@user_routes.route('/unfollow/<int:userId>', methods=["PUT"])
@login_required
def remove_follow(userId):
    user = User.query.get(userId)
    print('unfollow user: ', user)
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()
