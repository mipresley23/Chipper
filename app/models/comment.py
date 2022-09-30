from flask_sqlalchemy import SQLAlchemy
from .db import db


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  media = db.Column(db.String(2000), nullable=True)
  body = db.Column(db.String(300), nullable=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  chirpId = db.Column(db.Integer, db.ForeignKey('chirps.id'), nullable=False)

  user = db.relationship("User", back_populates='comments')
  chirps = db.relationship("Chirp", back_populates='comments')


  #make comment info a dictionary so can send to frontend as json
  def to_dict(self):
    return{
      "id": self.id,
      "media": self.media,
      "body": self.body,
      "user": self.user.to_dict(),
      "chirpId": self.chirpId
    }
