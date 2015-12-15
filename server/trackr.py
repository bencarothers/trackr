import flask
from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "test"}
app.config["SECRET_KEY"] = 'HonestEngine'

db = MongoEngine(app)


@app.route("/")
def index():
    return flask.render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
