
from src.configuration.app import database
import src.constant.role as ROLE
from src.model.user.citizen import Citizen

def register(data):
    result = None
    values = {
        'docNum':data['docNum'],'username':data['username'],'name':data['name'], 'lastname':data['lastname'],
        'city':data['city'],'docType':data['docType'], 'phoneNum':data['phoneNum'],'neighHood':data['neighHood'],'address':data['address'],
        'gender':data['gender'],'birthdate':data['birthdate'],'state':data['state']
    }
    try:
        database.citizen.insert_one(values)
        result = values
    except Exception as e:
        pass
    return result

def getSome(start, limit):
    result = []
    query = database.citizen.find({}).skip(start).limit(limit)
    for doc in query:
        result.append({'id':str(doc['_id']),'rol': ROLE.ROLES['CITIZEN'],'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],'lastname':doc['lastname'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    return result

def setState(username, newState):
    result = database.citizen.update_one({'username':username},{'$set':{'state':newState}},upsert = False)
    return result.matched_count > 0

def update(data):
    result = 0
    user = Citizen(**data)
    doc = database.citizen.find_one({'username': user.getUsername()})
    if(doc != None):
        result = database.citizen.update_one({'username': user.getUsername()},{'$set': user.getMap()},upsert = False).matched_count
    return result > 0