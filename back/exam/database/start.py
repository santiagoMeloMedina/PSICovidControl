
import os
from pymongo import MongoClient

client = MongoClient(host=os.environ['HOST'],
                        port=int(os.environ['PORT']),
                        username=os.environ['MONGO_INITDB_ROOT_USERNAME'],
                        password=os.environ['MONGO_INITDB_ROOT_PASSWORD'])

def make(database):
    # col = database['healthEntity']
    # col.insert_one({
    #     'docNum':'',
    #     'exams':[]
    # })
    # col = database['exam']
    # col.insert_one({
    #     'docNumCi':'',
    #     'docNumHe':'',
    #     'citizensName': '',
    #     'citizensLastNames':'',
    #     'result':''
    # })
    pass

make(client[os.environ['MONGO_INITDB_DATABASE']])