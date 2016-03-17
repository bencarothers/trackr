import os
import flask
import requests
from flask import current_app
from flask import redirect, url_for, request, session, Blueprint
from functools import wraps
from flask.ext.login import login_user, logout_user, current_user, LoginManager, login_required
from user import User
from oauth import OAuthSignIn
from flask import jsonify
from config.config import DevelopmentConfig
from user import User
from hasher import hash_alg
from functools import wraps
from oauth import OAuthSignIn
from config.config import DevelopmentConfig
from flask import redirect, url_for, request, session, Blueprint, jsonify, current_app
from flask.ext.login import login_user, logout_user, current_user, LoginManager, login_required
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
from flask.ext.cors import CORS
import datetime, urllib, time, base64, time, hmac, json
from hashlib import sha1
from flask.ext.store import Store
import boto
from boto.s3.key import Key
import cv2
from hough_track import Trackr_Vid
from mk_gif import make_gif

app = flask.Flask(__name__)
CORS(app, origins = ["*api.ncf.space*", "*api.ncf.space*", "*localhost*"])
app.config.from_object(DevelopmentConfig)
login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = "barry_allen"
MONGO_URI = os.environ.get("MONGO_URI")

@login_manager.user_loader
def user_loader(user_id):
    user = User(user_id)
    return user

@app.route("/")
def index():
    return flask.render_template('index.html')

@app.route("/ajaxVideoUpload/<lift>/<weight>/<date>/", methods = ['POST'])
@login_required
def uploadVideo(lift, weight, date):
    user = current_user
    user_id = user.user_id
    file = request.files['file']
    vid_path, gif_path = save_raw_files(file, user_id, lift, weight, date)
    payload = {'user_id': user_id, 'lift_type': lift, 'weight': weight,
           'video_file_path': vid_path, 'gif_file_path' : gif_path, 'date': date}
    r = requests.post("http://api.ncf.space" + "/addLift",json = payload)
    if r.status_code != 200:
        return "IMPROPER"
    else:
        return r._content

def save_raw_files(file, user_id, lift, weight, date):
    vid_filename = str(date) + "." + str(lift) + "." + str(weight) + ".mp4"
    gif_filename = str(date) + "." + str(lift) + "." + str(weight) + ".gif"
    path_for_video = "/var/www/trackr/server/static/user_content/video/" + user_id
    path_for_gif =   "/var/www/trackr/server/static/user_content/gif/" + user_id
    if not os.path.exists(path_for_video):
        os.makedirs(path_for_gif)
        os.makedirs(path_for_video)
    file.save(path_for_video + "/" + vid_filename)
    make_gif(path_for_video + "/" + vid_filename, path_for_gif + "/" + gif_filename)
    path_for_video = make_server_usable_filename(path_for_video)
    path_for_gif = make_server_usable_filename(path_for_gif)
    return (path_for_video + "/" + vid_filename, path_for_gif + "/" + gif_filename)

def make_server_usable_filename(filename):
    start_index = filename.find("/static/")
    return filename[start_index:]

@app.route("/current_user/")
@login_required
def get_current_user():
    user = current_user
    if user:
        return jsonify({"status": "ok", "user": user.user_id, "lifts" : user.lifts})
    else:
        return jsonify({"status":"fail"})

@app.route('/logout_current_user/')
@login_required
def logout():
    logout_user()
    return jsonify({'status': 'ok'})

@app.route('/authorize/<provider>')
def oauth_authorize(provider):
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()

@app.route('/callback/<provider>')
def oauth_callback(provider):
    oauth = OAuthSignIn.get_provider(provider)
    username, email = oauth.callback()
    nickname = username
    if nickname is None or nickname == "":
        nickname = email.split('@')[0]
    checked = check_user(nickname, email)
    is_ok = checked.find('ok')
    if is_ok:
        user = user_loader(nickname)
        login_user(user)
    else:
        posted = post_user(username, str(provider), email, str(provider))
        user = user(nickname)
        login_user(user)
    return flask.render_template('index.html')

@app.route('/api_post/<username>/<password>/<email>/', defaults = {'provider' : 'Trackr'}, methods = ['POST'])
def post_user(username, password, email, provider):
    payload = {'user_id': username, 'password': hash_alg(password), 'email': email, 'provider': provider}
    r = requests.post("http://api.ncf.space" + "/Add", json= payload)
    if r.status_code != 200:
        return "Wrong format"
    return r._content

@app.route("/api_login/<username>/<password>", methods = ['POST'])
def get_user(username, password):
    payload = {'user_id': username, 'password': hash_alg(password)}
    r = requests.get("http://api.ncf.space" + "/LoginUser", json = payload)
    if r.status_code != 200:
    	return "IMPROPER"
    r_json = r.json()
    if 'log_in' in r_json:
        user = r_json['log_in']
        user = user_loader(user)
        login_user(user)
    return r._content

@app.route("/api_check/<username>/<email>")
def check_user(username, email):
    payload = {'user_id': username, "email" : email}
    r = requests.get("http://api.ncf.space" + "/Check", json = payload)
    if r.status_code != 200:
        return "IMPROPER"
    return r._content

@app.route("/api_get_lift/<username>")
def grab_lifts(username):
    payload = {'user_id': username}
    r = requests.get("http://api.ncf.space" + "/getLifts", json = payload)
    if r.status_code != 200:
        return "IMPROPER"
    return r._content

@app.route("/api_delete/<username>")
def delete_user(username):
    r = requests.get("http://api.ncf.space" + "/Delete")
    if r.status_code != 200:
        return "IMPROPER"
    return r._content

if __name__ == "__main__":
    app.debug = True
    app.run()
