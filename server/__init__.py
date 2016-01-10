from flask import Flask
from flask.ext.mongoengine import MongoEngine
from flask.ext.login import LoginManager

def register_blueprints(app):
    from trackr import trackr_api
    app.register_blueprint(trackr_api)

app = Flask(__name__)
app.config.from_object('server.config:DevelopmentConfig')
#Set settings for mongoDB
db = MongoEngine(app)

login_manager = LoginManager()

@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve
    """
    from models import User
    print "user id is: " + str(user_id) + "\n"
    user = User.objects.filter(**{"username" : user_id}).first()
    print "\n User is type: " + str(user)
    return user
    
login_manager.init_app(app)

#Register with any blueprints
register_blueprints(app)

