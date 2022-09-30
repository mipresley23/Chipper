from flask_sqlalchemy import SQLAlchemy
from .likes import likes
from .db import db


class Chirp(db.Model):
  __tablename__ = 'chirps'

  id = db.Column(db.Integer, primary_key=True)
  media = db.Column(db.String(300), nullable=True)
  body = db.Column(db.String(300), nullable=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  user = db.relationship("User", back_populates='chirps')
  comments = db.relationship("Comment", back_populates='chirps', cascade='all, delete')
  chirp_likes = db.relationship("User",
        secondary=likes,
        back_populates="user_likes",
        cascade='all, delete'
    )

  #function to like a chirp if user hasn't liked already
  def addLikeChirp(self, user):
    if not self.have_liked(user):
      self.chirp_likes.append(user)

  #unlike a chirp user has already liked
  def unlikeChirp(self, user):
    if self.have_liked(user):
      self.chirp_likes.remove(user)

  #check to see if user has already liked chirp
  def have_liked(self, user):
    chirp_like_userIds = [x.id for x in self.chirp_likes]
    return user.id in chirp_like_userIds

  #make chirp info a dictionary so can send to front end as json
  def to_dict(self):
    return{
      "id": self.id,
      "media": self.media,
      "body": self.body,
      "user": self.user.to_dict(),
      "likes": [user.to_dict() for user in self.chirp_likes]
    }
