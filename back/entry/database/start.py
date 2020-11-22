
import os
from pymongo import MongoClient

client = MongoClient(host=os.environ['HOST'],
                        port=int(os.environ['PORT']),
                        username=os.environ['MONGO_INITDB_ROOT_USERNAME'],
                        password=os.environ['MONGO_INITDB_ROOT_PASSWORD'])

def make(database):
    col = database['establishment']
    col.insert_one({
        'docNum':'',
        'entriesReg':[]
    })
    col = database['entry']
    col.insert_one({
        'docNumCi':'',
        'docNumEs':'',
        'idEs':'', #IdObject del ES
        'idCitizen': '', #idObject del Citizen
        'temperature':'',
        'date':'',
        'time':'',
        'mask':'',
        'ans':'',
        'description':'',
    })
    col = database['citizen']
    col.insert_one({
        'docNum':'',
        'entriesReg':[]
    })

make(client[os.environ['MONGO_INITDB_DATABASE']])