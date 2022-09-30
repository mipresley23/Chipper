from flask_sqlalchemy import SQLAlchemy
from .db import db


#likes join table between user and chirps
likes = db.Table(
  'likes',
  db.Model.metadata,
  db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('chirps', db.Integer, db.ForeignKey('chirps.id'), primary_key=True)
)
