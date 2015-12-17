import os
import json
import flask
from flask import Flask
from flask.ext import restful
from flask import make_response
from flask.ext.mongoengine import MongoEngine
from bson.json_util import dumps


MONGO_URL = os.environ.get("MONGO_URL")
if not MONGO_URL:
    MONGO_URL = 'mongodb://localhost:27017/rest'

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "test"}

# This may be for pymongo only
app.config["MONGO_URI"] = MONGO_URL
app.config["SECRET_KEY"] = 'HonestEngine'

db = MongoEngine(app)

def output_json(obj, code, headers=None):
    response = make_response(dumps(obj), code)
    response.headers.extend(headers or {})
    return response

DEFAULT_REPRESENTATIONS = {'application/json': output_json}

api = restful.Api(app)
api.representations = DEFAULT_REPRESENTATIONS

@app.route("/")
def index():
    return flask.render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
