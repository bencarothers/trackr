import flask
from flask import redirect, url_for, request
import requests
from flask import Flask
from functools import wraps 

app = Flask(__name__)
task = {"do you": "work"}

def check_auth(username, password):
	'''This function is called to see if username/password
	combination is valid'''
	return username == 'shane' and password == 'best'

@app.route("/")
def index():
	return flask.render_template('index.html')

@app.route("/secret")
def secret():
	return flask.render_template('secret.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != 'admin' or request.form['password'] != 'admin':
			error = "Invalid credentials. Please try again"
		else:
			return redirect(url_for('secret'))
	return flask.render_template('login.html', error = error)



@app.route("/api_test")
def create_task():
    r = requests.get("http://127.0.0.1:8000/User")
    if r.status_code != 200:
        return
    return r._content


if __name__ == "__main__":
    app.run(debug=True)
