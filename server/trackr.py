import flask
from flask import Flask
import requests
from flask import current_app
from flask import redirect, url_for, request, session, Blueprint
from authenticator import Authenticator
from Oauthenticator import OAuthenticator
from functools import wraps
from flask.ext.login import login_user, logout_user, current_user, LoginManager, login_required
from user import User
from Oauth import OAuthSignIn
from flask import jsonify
from config.Config import DevelopmentConfig
from hasher import hash_alg
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = "barry_allen"

@login_manager.user_loader
def user_loader(user_id):
    user = User(user_id)
    return user

@app.route("/")
def index():
    return flask.render_template('index.html')

@app.route("/ajaxVideoUpload/")
@login_required
def uploadVideo():
    return flask.render_template('index.html')

@app.route("/current_user/")
@login_required
def get_current_user:
    user = current_user
    web_readable_current_user = jsonify(user)
    return web_readable_current_user

@app.route('/test')
def test():
    return flask.render_template('test.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/authorize/<provider>')
def oauth_authorize(provider):
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()

@app.route('/callback/<provider>')
def oauth_callback(provider):
    oauth = OAuthSignIn.get_provider(provider)
    username, email = oauth.callback()
    print username
    print email
    print '\n GOT PAST CALLBACK'
    if email is None:
        return redirect(url_for('index'))
    nickname = username
    if nickname is None or nickname == "":
        nickname = email.split('@')[0]
        #url_for(post_user, username = nickname, password = password, email = email, provider = provider)
        return redirect(url_for('index'))
    else:
        #This is just a login
        user = user_loader(nickname)
        login_user(user)
        return redirect(url_for('index'))


@app.route('/api_post/<username>/<password>/<email>/', defaults = {'provider' : 'Trackr'})
def post_user(username, password, email, provider):
    payload = {'user_id': username, 'password': hash_alg(password), 'email': email, 'provider': provider}
    r = requests.post("http://127.0.0.1:8000/Add", json= payload)
    if r.status_code != 200:
        return "Wrong format"
    return r._content

@app.route("/api_login/<username>/<password>")
def get_user(username, password):
    payload = {'user_id': username, 'password': hash_alg(password)}
    r = requests.get("http://127.0.0.1:8000/LoginUser", json = payload)
    if r.status_code != 200:
        return "IMPROPER"
    r_json = r.json()
    if 'log_in' in r_json:
        user = r_json['log_in']
        user = user_loader(user['user_id'])
        login_user(user)
        print "hello, " + str(current_user.user_id)
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
