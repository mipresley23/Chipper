from flask_sqlalchemy import SQLAlchemy
from .db import db


#follows join table between a follower user and a 'following' user
follows = db.Table(
  'follows',
  db.Model.metadata,
  db.Column('user', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('follower', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)
