# import requests
# import os
# import json
import flask
from flask import Flask
# from urlparse import urljoin

app = Flask(__name__)


@app.route("/")
def index():
    return flask.render_template('index.html')


# Could be used if we want to use a restful api
# We could also try eve
# Delete if we decide against it

# @app.route('/api/<path:path>', methods=['GET'])
# def api(path):
#     clientToken = ''
#     clientSecret = ''
#     baseUrl = 'https://suggestqueries.google.com'
#     accessToken = ''

#      Authentication

#      session.auth = EdgeGridAuth (
#          client_token = clientToken,
#          client_secret = clientSecret,
#          access_token = accessToken
#      )

#     r = flask.requests.get(urljoin(baseUrl, path), params=request.args)

#     if r.status_code != requests.codes.ok:
#         return None

#     return flask.Response(r.content,  mimetype='application/json')

if __name__ == "__main__":
    app.run(debug=True)
