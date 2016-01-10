from flask import url_for
from server import db

class User(db.Document):
    username = db.StringField(max_length = 40, required = True)
    password = db.StringField(max_length = 40, required = False)
    email = db.StringField(max_length = 40, required = True)
    provider = db.StringField(max_length = 20, required = False)

    meta = {
        'allow_inheritance': True,
        'indexes': ['-username'],
        'ordering': ['-username']
    }

    def is_active(self):
        """True, as all users are active."""
        return True

    def get_id(self):
        """Return the email address to satisfy Flask-Login's requirements."""
        return self.username

    def is_authenticated(self):
    	return True

    def is_anonymous(self):
    	return False


