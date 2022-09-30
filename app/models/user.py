from .db import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .likes import likes
from .follows import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(2000), nullable=True)
    bio = db.Column(db.String(500), nullable=True)

    chirps = db.relationship("Chirp", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    user_likes = db.relationship("Chirp",
        secondary=likes,
        back_populates="chirp_likes",
        cascade='all, delete'
      )

    followed = db.relationship("User",
      secondary=follows,
      primaryjoin=(follows.c.user == id),
      secondaryjoin=(follows.c.follower == id),
      backref=db.backref('follows', lazy='dynamic'), lazy='dynamic')

  #returns hashed password to save to db
    @property
    def password(self):
        return self.hashed_password


  #puts password through hash function
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

  #check password for correct password on login
    def check_password(self, password):
        return check_password_hash(self.password, password)


  #check if user is following another particular user
    def following(self, user):
      return self.followed.filter(follows.c.follower == user.id).count() > 0

  #if user not following other user, user can follow that user
    def follow(self, user):
      print('db following: ', follows.c.follower)
      if not self.following(user):
        self.followed.append(user)

  #if user is following other user, user can unfollow that user
    def unfollow(self, user):
      if self.following(user):
        self.followed.remove(user)

  #make user info a dictionary to send to frontend as json
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'bio': self.bio,
            'followings': [x.to_dict_follow() for x in self.followed],
            'followers': [x.to_dict_follow() for x in self.follows]
        }

  #for purposes of creating the followers users list to add to dictionary above
    def to_dict_follow(self):
      return {
        'id': self.id,
        'username': self.username,
        'name': self.name,
        'bio': self.bio,
        'profile_pic': self.profile_pic,
      }
