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
    user_id = db.StringField(unique=True)
    user_email = db.StringField(unique=True)

    def __unicode__(self):
        return self.username


class getUser(restful.Resource):

    def get(self, user_id=None, user_email=None):
        users = User.objects.all()
        if users:
            return jsonify({"status": "ok", "data": users[0]})
        else:
            return {"response": "no user found for {}".format(user_id)}


class postUser(restful.Resource):

    def post(self):
        data = request.get_json()
        if not data:
            data = {"response": "ERROR"}
            return Flask.jsonify(data)
        else:
            id = data.get('user_id')
            print id
            print data
            email = data.get('email')
            if id:
                User(user_id=id,user_email=email).save()
            else:
                return {"response": "registration number missing"}

api = restful.Api(app)
api.representations = DEFAULT_REPRESENTATIONS
api.add_resource(getUser, '/User')
api.add_resource(postUser, '/Add')

if __name__ == "__main__":
    admin = Admin(app, 'Simple Models')

    class UserModel(model.ModelAdmin):
        list_display = ('username', 'email')

    admin.register(User, UserModel)
    app.debug = True
    app.run('0.0.0.0', 8000)
