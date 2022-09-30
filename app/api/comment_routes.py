from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Comment
from app.forms.comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#GET all comments
@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments])


#POST a new comment
@comment_routes.route('/', methods=['POST'])
def add_comment():
    form = CommentForm()
    print('form data: ', form.data)
    comment = Comment(
        body=form.data['body'],
        media=form.data['media'],
        userId=form.data['userId'],
        chirpId=form.data['chirpId']
    )
    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()


#Update an existing comment
@comment_routes.route('/<int:commentId>', methods=['PUT'])
def update_comment(commentId):
    comment = Comment.query.get(commentId)
    form = CommentForm()
    comment.body = form.data['body']
    comment.media = form.data['media']
    comment.userId = form.data['userId']
    comment.chirpId = form.data['chirpId']
    db.session.commit()
    return comment.to_dict()


#delete an existing comment
@comment_routes.route('/<int:commentId>', methods=['DELETE'])
def delete_comment(commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return "Delete Successful"
