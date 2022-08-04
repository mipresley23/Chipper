from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
  body = TextAreaField('body', validators=[DataRequired()])
  media = StringField('media')
  userId = IntegerField('userId')
  chirpId = IntegerField('chirpId')
