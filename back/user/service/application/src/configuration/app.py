
from flask import Flask
from pymongo import MongoClient
import src.constant.database as DATABASE
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
database = MongoClient( host=DATABASE.HOST, 
                        port=DATABASE.PORT, 
                        username=DATABASE.USER, 
                        password=DATABASE.PASSWORD)[DATABASE.NAME]
