
from flask import Flask
from pymongo import MongoClient
import src.constant.database as DATABASE

app = Flask(__name__)
database = MongoClient( host=DATABASE.HOST, 
                        port=DATABASE.PORT, 
                        username=DATABASE.USER, 
                        password=DATABASE.PASSWORD)[DATABASE.NAME]
