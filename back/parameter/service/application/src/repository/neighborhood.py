
import random
from src.configuration.app import database
import src.constant.role as ROLE
from bson.objectid import ObjectId

def addNeighborhood(name, cityId):
    result = None
    values = {'name':name,'cityId':ObjectId(cityId)}
    query = database.neighborHood.insert_one(values)
    if query:
        result = values
        result['_id'] = str(result['_id'])
        result['cityId'] = str(result['cityId'])
    return result

def getNeighborhoodsByDepartment(cityId):
    result = []
    query = database.neighborHood.find({'cityId':ObjectId(cityId)})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name'],'cityId':str(doc['cityId'])})
    return result

def deleteNeighborhood(neighId):
    result = None
    values = {'_id':ObjectId(neighId)}
    query = database.neighborHood.remove(values)
    if query['n'] > 0:
        result = values
        result['_id'] = str(result['_id'])
    return result