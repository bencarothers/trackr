import flask
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
from flask import jsonify
from config.Config import DevelopmentConfig
from hasher import hash_alg

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def user_loader(user_id):
    """
    Query RESTFUL API to get current user
    """
    print "user id is: " + str(user_id) + "\n"
    #Make request to server to get user
    #user = User.objects.filter(**{"username" : user_id}).first()
    #confirm I got a user object
    user = 'lol'
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

@app.route('/test')
def test():
    return flask.render_template('test.html')

###AUTHENTICATION: DO WE WANT THIS ALL IN A SEPERATE FILE?
@app.route('/login', methods = ['GET', 'POST'])
def login():
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
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()

@app.route('/callback/<provider>')
def oauth_callback(provider):
    oauth = OAuthSignIn.get_provider(provider)
    username, email = oauth.callback()
    if email is None:
        flask.flash('Authentication failed Did not get an email!')
        return redirect(url_for('.register'))
    nickname = username
    if nickname is None or nickname == "":
        nickname = email.split('@')[0]
        url_for(post_user, username = nickname, password = password, email = email, provider = provider)
        return redirect(url_for('.secret'))
    else:
        #This is just a login
        user = user_loader(nickname)
        login_user(user,remember = True)
        flask.flash('Authentication succeeded. Welcome!')
        return redirect(url_for('.secret'))


@app.route('/api_post/<username>/<password>/<email>/', defaults = {'provider' : 'Trackr'})
def post_user(username, password, email, provider):
    payload = {'user_id': username, 'password': hash_alg(password), 'email': email, 'provider': provider}
    r = requests.post("http://127.0.0.1:8000/Add", json= payload)
    if r.status_code != 200:
        return "Wrong format"
    return r._content

@app.route("/api_get/<username>/<password>")
def get_user(username, password):
    print 'sending this to API'
    payload = {'user_id': username, 'password': hash_alg(password)}
    r = requests.get("http://127.0.0.1:8000/User", json = payload)
    if r.status_code != 200:
        return "IMPROPER"
    return r._content

@app.route("/api_check/<username>/<email>")
def check_user(username, email):
    payload = {'user_id': username, "email" : email}
    r = requests.get("http://127.0.0.1:8000/Check", json = payload)
    if r.status_code != 200:
        return "IMPROPER"
    return r._content


@app.route("/api_delete/<username>")
def delete_user(username):
    r = requests.get("http:127.0.0.1:8000/Delete")
    if r.status_code != 200:
        return "IMPROPER"
    return r._content

if __name__ == "__main__":
    app.run(debug = True)