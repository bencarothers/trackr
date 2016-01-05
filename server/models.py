from flask import url_for
from server import db

class User(db.Document):
    username = db.StringField(max_length = 20, required = True)
    password = db.StringField(max_length = 20, required = True)
    email = db.StringField(max_length = 20, required = True)

    def __unicode__(self):
        return self.title

    meta = {
        'allow_inheritance': True,
        'indexes': ['-username'],
        'ordering': ['-username']
    }


