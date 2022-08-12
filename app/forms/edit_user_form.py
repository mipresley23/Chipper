from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


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



class EditUserForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    profile_pic = StringField('profile_pic', validators=[checkProfilePic])
