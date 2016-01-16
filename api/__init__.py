import os
from flask import Flask
from flask import request
from flask import jsonify
from flask.ext import restful
from flask import make_response
from bson.json_util import dumps
from flask_mongoengine import MongoEngine
from flask.ext.superadmin import model
from flask.ext.superadmin import Admin

app = Flask(__name__)
app.config.from_object(__name__)
app.config['TESTING'] = True
app.config['MONGODB_SETTINGS'] = {'DB': "test"}
app.config["SECRET_KEY"] = 'HonestEngine'

db = MongoEngine()
db.init_app(app)


def output_json(obj, code, headers=None):
    response = make_response(dumps(obj), code)
    response.headers.extend(headers or {})
    return response

DEFAULT_REPRESENTATIONS = {'application/json': output_json}

class User(db.Document):
    user_id = db.StringField(max_length = 40, unique=True, required = True)
    password = db.StringField(max_length = 40, required = True)
    user_email = db.StringField(max_length = 40, unique=True, required = True)
    provider = db.StringField(max_length = 40, required = True)

    def __unicode__(self):
        return self.user_id

class getUser(restful.Resource):
    def get(self, user_id = None):
        data = request.get_json()
        user_id = data.get("user_id")
        user = User.objects.filter(**{"user_id" : user_id}).first()
        if user:
            return jsonify({"status": "ok", "user":user})
        else:
            return jsonify({"status":"fail"})

class loginUser(restful.Resource):

    def get(self, user_id=None, password=None):
        data = request.get_json()
        password = data.get('password')
        user_id = data.get('user_id')
        user = User.objects.filter(**{"user_id" : user_id, "password" : password}).first()
        if user:
            print 'PROPER LOG IN'
            return jsonify({"status": "ok", "log_in": user})
        else:
            print 'IMPROPER LOG IN'
            return {"status": "fail"}


class checkNewUser(restful.Resource):
    def get(self, user_id = None, user_email = None):
        data = request.get_json()
        user_id = data.get("user_id")
        user_email = data.get("email")
        taken_user = User.objects.filter(**{"user_id" : user_id}).first()
        taken_email = User.objects.filter(**{"user_email": user_email}).first()
        if (taken_user or taken_email):
            print "USER EXISTS: WON'T REGISTER"
            return jsonify({"status":"fail"})
        else:
            print 'NEW USER OK'
            return {"status":"ok"}


class postUser(restful.Resource):

    def post(self):
        data = request.get_json()
        if not data:
            data = {"status": "ERROR"}
            return jsonify(data)
        else:
            id = data.get('user_id')
            email = data.get('email')
            password = data.get('password')
            provider = data.get('provider')
            if id:
                User(user_id=id, password = password,user_email=email, provider = provider).save()
            else:
                return jsonify({"response": "registration number missing"})

class deleteUser(restful.Resource):
    
    def delete(self, user_id = None):
        if user_id is None:
            return jsonify({"response" : "ERROR"})
        else:
            user = User.objects.filter(**{"user_id" : user_id}).first()
            if user is None:
                return jsonify({"response" : "no user with this id"})
            else:
                User.objects.delete(user)


api = restful.Api(app)
api.representations = DEFAULT_REPRESENTATIONS
api.add_resource(getUser, '/User')
api.add_resource(loginUser, '/LoginUser')
api.add_resource(postUser, '/Add')
api.add_resource(deleteUser, '/Delete')
api.add_resource(checkNewUser, "/Check")
if __name__ == "__main__":
    admin = Admin(app, 'Simple Models')

    class UserModel(model.ModelAdmin):
        list_display = ('user_id', 'password', 'user_email', 'provider')

    admin.register(User, UserModel)
    app.debug = True
    app.run('0.0.0.0', 8000)