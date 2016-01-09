from flask import Flask
from flask.ext.mongoengine import MongoEngine

def register_blueprints(app):
    from trackr import trackr_api
    app.register_blueprint(trackr_api)

app = Flask(__name__)
app.config.from_object('server.config:DevelopmentConfig')
#Set settings for mongoDB
db = MongoEngine(app)

#Register with any blueprints
register_blueprints(app)


