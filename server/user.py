import requests
import json
class User(object):
    def __init__(self, user_id):
        self.user_id = user_id
        payload = {'user_id' : user_id}
        r = requests.get("http://localhost:8080" + "/getLifts",json = payload)
        response = json.loads(r.text)
        self.lifts = response['lifts']

    @property 
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True 

    @property
    def is_anonymous(self):
        return False 

    def get_id(self):
        try:
            return unicode(self.user_id)
        except AttributeError:
            raise NotImplementedError("No `id` attribute.")

    def __eq__(self, other):
        if isinstance(other, User):
            return self.get_id() == other.get_id()
        return NotImplemented

    def __ne__(self, other):
        equal = self.__eq__(other)
        if equal is NotImplemented:
            return NotImplemented
        return not equal

    def generate_auth_token(self, expiration = 6000):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None #Valid token, but expired 
        except BadSignature:
            return None #Invalid Token
        user = User.objects.filter(**{'user_id': user_id}).first()
        return user