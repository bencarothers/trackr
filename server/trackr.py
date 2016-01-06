import flask
from flask import redirect, url_for, request, session
import requests
from flask import Flask
from functools import wraps
from flask import Blueprint
from server.models import User

trackr_api = Blueprint('trackr_api', __name__)

#Decorator for logging in
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flask.flash('You need to login first.')
            return redirect(url_for('.login'))
    return wrap

@trackr_api.route("/")
def index():
	return flask.render_template('index.html')

@trackr_api.route("/secret")
@login_required
def secret():
	return flask.render_template('secret.html')

@trackr_api.route('/login', methods = ['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != 'admin' or request.form['password'] != 'admin':
			error = "Invalid credentials. Please try again"
		else:
			session['logged_in'] = True 
			flask.flash('You were just logged in!')
			return redirect(url_for('.secret'))
	return flask.render_template('login.html', error = error)

@trackr_api.route('/register', methods = ['GET', 'POST'])
def register():
	error = None
	if request.method == 'POST':
		if request.form['username'] == '' or request.form['password'] == '':
			error = "Please fill out the whole form"
		else:
			user = User(
				username = request.form['username'],
				password = request.form['password'],
				email = request.form['email']
			)
			user.save()
			flask.flash('You were just registered! Use these credentials to login!')
			return redirect(url_for('.login'))
	return flask.render_template('register.html', error = error)

@trackr_api.route('/logout')
@login_required
def logout():
	session.pop('logged_in', None)
	flask.flash("You were just logged out!")
	return redirect(url_for('.index'))

@trackr_api.route("/api_test")
def create_task():
    r = requests.get("http://127.0.0.1:8000/User")
    if r.status_code != 200:
        return
    return r._content

