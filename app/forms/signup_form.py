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

def name_exists(form, field):
    name = field.data
    user = User.query.filter(User.name == name).first()
    if user:
        raise ValidationError('Name is already in use.')


def check_username_for_at(form, field):
    username = field.data
    if username.startswith('@') == False:
        raise ValidationError('Username must begin with @.')


#user signup form -- profile pic validation now happens with aws upload so no longer need form validators here
class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_exists])
    username = StringField('username', validators=[DataRequired(), check_username_for_at, username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message="Must be a valid email address")])
    password = StringField('password', validators=[DataRequired(), Length(min= 6, max=255)])
    profile_pic = StringField('profile_pic')
    bio = StringField('bio', validators=[Length(max=500)])
