
import random
from src.configuration.app import database
import src.constant.role as ROLE
from bson.objectid import ObjectId
import datetime

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

def getQuarantinePeriod():
    result = None
    query = database.quarantine.find_one({'state':'A'})
    if query:
        result = query
        result['_id'] = str(result['_id'])
    return result

def updateQuarantinePeriod(days):
    result = None
    update_query = database.quarantine.update_many({'state':'A'},{'$set': {'state':'I'}},upsert = False).matched_count
    values = {'days':days, 'state':'A', 'date': str(datetime.datetime.today().date())}
    add_query = database.quarantine.insert_one(values)
    if add_query:
        result = values
        result['_id'] = str(result['_id'])
    return result