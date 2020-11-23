
import os
from pymongo import MongoClient

client = MongoClient(host=os.environ['HOST'],
                        port=int(os.environ['PORT']),
                        username=os.environ['MONGO_INITDB_ROOT_USERNAME'],
                        password=os.environ['MONGO_INITDB_ROOT_PASSWORD'])

def make(database):
    col = database['user']
    col.insert_one({'email':'crack@gmail.com','password':'crack','username':'crack','rol':'Admin'})
    col = database['administrator']
    col.insert_one({'docType':'CC','docNum':12341341,'username':'crack','name':'Crack','lastname':'Cracked'})

make(client[os.environ['MONGO_INITDB_DATABASE']])