import base64
import os

import flask
from mock import MagicMock

import main

FUNCTIONS_TOPIC = os.getenv("FUNCTIONS_TOPIC")

# import os
# import json

# from flask import Flask, request

# app = Flask(__name__)

# @app.route('/', methods=['GET'])
# def hello_world():
#     target = os.environ.get('TARGET', 'World')
#     return 'Hello {}!\n'.format(target)

# @app.route('/', methods=['POST'])
# def event_handler():
#     print(json.dumps(request.headers))
#     return 'Got event'

# if __name__ == "__main__":
#     app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
