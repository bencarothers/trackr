# import json
# from flask import request
from flask.ext import restful
from flask.ext.restful import reqparse
# from .api import app
from .api import api
from .api import db


class Lifts(restful.Resource):
    def __init__(self, *args, **kwargs):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('lift', type=str)

    def get(self):
        pass

    def post(self):
        pass


class Lift(restful.Resource):
    def get(self, lift_id):
        pass

    def delete(self, lift_id):
        pass


class Root(restful.Resource):
    def get(self):
        return {
            "status": 'OK',
            'mongo': str(db.db)
        }

api.add_resource(Root, "/")
api.add_resource(Lifts, "/lifts")
