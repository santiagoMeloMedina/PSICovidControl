
import random
from src.configuration.app import database
import src.constant.role as ROLE
from bson.objectid import ObjectId

def addDocumentType(name):
    result = None
    values = {'name':name}
    query = database.documentType.insert_one(values)
    if query:
        result = values
        result['_id'] = str(result['_id'])
    return result

def getDocumentTypes():
    result = []
    query = database.documentType.find({})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name']})
    return result
    
def deleteDocumentType(documentTypeId):
    result = None
    values = {'_id':ObjectId(documentTypeId)}
    query = database.documentType.remove(values)
    if query['n'] > 0:
        result = values
        result['_id'] = str(result['_id'])
    return result