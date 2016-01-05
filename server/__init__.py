from flask import Flask
from flask.ext.mongoengine import MongoEngine

def register_blueprints(app):
    from trackr import trackr_api
    app.register_blueprint(trackr_api)

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB' : 'trackr_users'}
app.config["SECRET_KEY"] = "master_guardian"
db = MongoEngine(app)
register_blueprints(app)
#from models import * 


