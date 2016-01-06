from flask import url_for
from server import db

class User(db.Document):
    username = db.StringField(max_length = 40, required = True)
    password = db.StringField(max_length = 40, required = True)
    email = db.StringField(max_length = 40, required = True)

    meta = {
        'allow_inheritance': True,
        'indexes': ['-username'],
        'ordering': ['-username']
    }


