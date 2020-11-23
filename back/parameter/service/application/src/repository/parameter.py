
import random
from src.configuration.app import database
import src.constant.role as ROLE
from bson.objectid import ObjectId

def getAllDepartment():
    result = []
    query = database.department.find({})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name']})
    return result
    
def getCitiesByDepartment(departmentId):
    result = []
    query = database.city.find({'departmentId':ObjectId(departmentId)})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name'],'departmentId':str(doc['departmentId'])})
    return result

def getNeighborhoodsByDepartment(cityId):
    result = []
    query = database.neighborHood.find({'cityId':ObjectId(cityId)})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name'],'cityId':str(doc['cityId'])})
    return result

def getDocumentTypes():
    result = []
    query = database.documentType.find({})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name']})
    return result

def getDepartmentByCity(cityId):
    result = []
    departmentId = []
    query = database.city.find({'_id': ObjectId(cityId)})
    for doc in query:
        departmentId.append(doc)
    query = database.department.find({'_id': departmentId[0]['departmentId']})
    for doc in query:
        result.append({'_id':str(doc['_id']),'name':doc['name']})
    return result