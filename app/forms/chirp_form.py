from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class ChirpForm(FlaskForm):
  body = TextAreaField('body', validators=[DataRequired(), Length(min=1, max=300, message='Chirp length must be between 1 and 300')])
  media = StringField('media')
  userId = IntegerField('userId')
