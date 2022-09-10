from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()

likes = db.Table(
  'likes',
  db.Model.metadata,
  db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('chirps', db.Integer, db.ForeignKey('chirps.id'), primary_key=True)
)

follows = db.Table(
  'follows',
  db.Model.metadata,
  db.Column('user', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('follower', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)


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

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def following(self, user):
      return self.followed.filter(follows.c.follower == user.id).count() > 0

    def follow(self, user):
      if not self.following(user):
        self.followed.append(user)

    def unfollow(self, user):
      if self.following(user):
        self.followed.remove(user)

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

    def to_dict_follow(self):
      return {
        'id': self.id,
        'username': self.username,
        'name': self.name,
        'profile_pic': self.profile_pic,
      }


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

  def addLikeChirp(self, user):
    if not self.have_liked(user):
      self.chirp_likes.append(user)

  def unlikeChirp(self, user):
    if self.have_liked(user):
      self.chirp_likes.remove(user)

  def have_liked(self, user):
    chirp_like_userIds = [x.id for x in self.chirp_likes]
    return user.id in chirp_like_userIds


  def to_dict(self):
    return{
      "id": self.id,
      "media": self.media,
      "body": self.body,
      "user": self.user.to_dict(),
      "likes": [user.to_dict() for user in self.chirp_likes]
    }


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  media = db.Column(db.String(2000), nullable=True)
  body = db.Column(db.String(300), nullable=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  chirpId = db.Column(db.Integer, db.ForeignKey('chirps.id'), nullable=False)

  user = db.relationship("User", back_populates='comments')
  chirps = db.relationship("Chirp", back_populates='comments')

  def to_dict(self):
    return{
      "id": self.id,
      "media": self.media,
      "body": self.body,
      "user": self.user.to_dict(),
      "chirpId": self.chirpId
    }
