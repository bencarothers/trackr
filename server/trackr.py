import flask
import requests
from flask import Flask

app = Flask(__name__)
task = {"do you": "work"}


@app.route("/")
def index():
    return flask.render_template('index.html')


@app.route("/api_test")
def create_task():
    r = requests.get("http://127.0.0.1:8000/User")
    if r.status_code != 200:
        return
    return r._content



if __name__ == "__main__":
    app.run(debug=True)
