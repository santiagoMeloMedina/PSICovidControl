
from src.configuration.app import database
import random
import src.constant.role as ROLE
from src.model.user.ep import EP

def register(data):
    result = None
    values = {
        'docNum':data['docNum'],'username':data['username'],'name':data['name'],'city':data['city'],'docType':data['docType'],
        'totalCap':data['totalCap'], 'address':data['address'],'neighHood':data['neighHood'],'phoneNum':data['phoneNum'],
        'category':data['category'],'state':data['state']
    }
    try:
        database.establishment.insert_one(values)
        result = values
    except Exception as e:
        pass
    return result

def getSome(start, limit):
    result = []
    query = database.establishment.find({}).skip(start).limit(limit)
    for doc in query:
        result.append({'id':str(doc['_id']),'rol': ROLE.ROLES['EP'],'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return result

def setState(username, newState):
    result = database.establishment.update_one({'username':username},{'$set':{'state':newState}},upsert = False)
    return result.matched_count > 0

def update(data):
    result = 0
    user = EP(**data)
    doc = database.establishment.find_one({'username': user.getUsername()})
    if(doc != None):
        result = database.establishment.update_one({'username': user.getUsername()},{'$set': user.getMap()},upsert = False).matched_count
    return result > 0