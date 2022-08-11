from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def checkProfilePic(form, field):
    profile_pic = field.data
    if profile_pic != '':
        if profile_pic.endswith('.jpeg') or profile_pic.endswith('.jpg') or profile_pic.endswith('.png') == False:
            raise ValidationError('Profile Picture must be a jpg, jpeg, or png image.')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message="Must be a valid email address")])
    password = StringField('password', validators=[DataRequired(), Length(min= 6, max=255)])
    profile_pic = StringField('profile_pic', validators=[checkProfilePic])
