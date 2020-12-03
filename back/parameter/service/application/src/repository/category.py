
import random
from src.configuration.app import database
import src.constant.role as ROLE
from bson.objectid import ObjectId

def addCategory(name):
    result = None
    values = {'name':name}
    query = database.category.insert_one(values)
    if query:
        result = values
        result['_id'] = str(result['_id'])
    return result

def getCategories():
    result = []
    query = database.category.find({})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name']})
    return result

def deleteCategory(categoryId):
    result = None
    values = {'_id':ObjectId(categoryId)}
    query = database.category.remove(values)
    if query['n'] > 0:
        result = values
        result['_id'] = str(result['_id'])
    return result