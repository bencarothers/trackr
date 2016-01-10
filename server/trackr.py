from flask import Flask
import requests
from flask import current_app
from flask import redirect, url_for, request, session, Blueprint
#from models import User
from authenticator import Authenticator
from Oauthenticator import OAuthenticator
from functools import wraps
from flask.ext.login import login_user, logout_user, current_user, LoginManager
from Oauth import OAuthSignIn

app = Flask(__name__)
app.config.from_object('config:DevelopmentConfig')
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def user_loader(user_id):
    """
    Query RESTFUL API to get current user
    """
    print "user id is: " + str(user_id) + "\n"
    #Make request to server to get user
    user = User.objects.filter(**{"username" : user_id}).first()
    #confirm I got a user object
    return user
    
@app.route("/")
def index():
    return flask.render_template('index.html')

def login_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_app.login_manager._login_disabled:
            return func(*args, **kwargs)
        elif not current_user.is_authenticated:
            flask.flash('Sorry, you have to login to go there!')
            return redirect(url_for('login'))
        return func(*args, **kwargs)
    return decorated_view

@app.route("/secret")
@login_required
def secret():
    return flask.render_template('secret.html')

###AUTHENTICATION: DO WE WANT THIS ALL IN A SEPERATE FILE?
@app.route('/login', methods = ['GET', 'POST'])
def login():
    from __init__ import login_manager, user_loader
    error = None
    if request.method == 'POST':
        if request.form['username'] == '' or request.form['password'] == '':
            error = "Please fill out the whole form"
        else:
            authenticator = Authenticator(
                username = request.form['username'],
                password = request.form['password']
                )
            if authenticator.validLogin():
                user = user_loader(request.form['username'])
                login_user(user, remember = True)
                return redirect(url_for('secret'))
            else:
                error = authenticator.error
                print 'trying to return login page ith error.'
                return flask.render_template('login.html', error = error)
    return flask.render_template('login.html', error = error)

@app.route('/register', methods = ['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        if request.form['username'] == '' or request.form['password'] == '' or request.form['email'] == '':
            error = "Please fill out the whole form"
        else:
            authenticator = Authenticator(
                username = request.form['username'],
                password = request.form['password'],
                email = request.form['email']
            )
            if authenticator.validForm():
                user = User(
                    username = authenticator.username,
                    password = authenticator.password,
                    email = authenticator.email,
                    provider = "Trackr"
                    )
                user.save()
                login_user(user, remember = True)
                flask.flash('You were just registered! Use these credentials to login!')
                return redirect(url_for('.login'))
            else:
                error = authenticator.error
    return flask.render_template('register.html', error = error)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flask.flash("You were just logged out!")
    return redirect(url_for('index'))

@app.route('/authorize/<provider>')
def oauth_authorize(provider):
    # Flask-Login function
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()

@app.route('/callback/<provider>')
def oauth_callback(provider):
    from __init__ import login_manager, user_loader

    oauth = OAuthSignIn.get_provider(provider)
    username, email = oauth.callback()
    if email is None:
        flask.flash('Authentication failed Did not get an email!')
        return redirect(url_for('.register'))
    nickname = username
    if nickname is None or nickname == "":
        nickname = email.split('@')[0]
    #Now we have the username and email. Let's load this one in the database.
    oauthenticator = OAuthenticator(
        username = nickname,
        email = email,
        provider = provider)
    if not oauthenticator.existingUser():
        user = User(
            username = oauthenticator.username,
            password = None,
            email = oauthenticator.email,
            provider = oauthenticator.provider
            )
        user.save()
        login_user(user, remember = True)
        return redirect(url_for('.secret'))
    else:
        #This is just a login
        user = user_loader(nickname)
        login_user(user,remember = True)
        flask.flash('Authentication succeeded. Welcome!')
        return redirect(url_for('.secret'))


@app.route("/api_test")
def create_task():
    r = requests.get("http://127.0.0.1:8000/User")
    if r.status_code != 200:
        return
    return r._content

if __name__ == "__main__":
    app.run(debug = True)