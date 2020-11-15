
import random
from src.configuration.app import database
import src.repository.citizen as CitizenRepository
import src.repository.ep as EPRepository
import src.repository.es as ESRepository
import src.constant.role as ROLE


def authenticate(username, password):
    result = None
    check = database.user.find_one({'username':username,'password':password})
    if check != None:
        result = check
    return result

def checkUsername(username):
    return True if database.user.find_one({'username':username}) != None else False

def checkEmail(email):
    return True if database.user.find_one({'email':email}) != None else False

def checkRegistration(username, email):
    return checkUsername(username) or checkEmail(email)

def register(data):
    result = None
    values = {'email':data['email'],'password':data['password'],'username':data['username'],'rol':data['rol']}
    try:
        database.user.insert_one(values)
        result = values
    except Exception as e:
        pass
    return result

def getAllUsers(start, limit):
    result = CitizenRepository.getSome(start, limit) + EPRepository.getSome(start, limit) + ESRepository.getSome(start, limit)
    result = sorted(result, key = lambda x: False if not random.randint(0,1) else True)
    return result if len(result) > 0 else None

def getUnauthorized(start, limit):
    """This function obtains unathorized users from database"""
    result = []
    queryHealth = database.healthEntity.find({'state':'I'}).skip(start).limit(limit)
    queryEstablishment = database.establishment.find({'state':'I'}).skip(start).limit(limit)
    for doc in queryHealth:
        result.append({'id':str(doc['_id']),'rol': ROLE.ROLES['ES'],'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes'],'city':doc['city']})
    for doc in queryEstablishment:
        result.append({'id':str(doc['_id']),'rol': ROLE.ROLES['EP'],'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category'],'city':doc['city']})
    result = sorted(result, key = lambda x: False if not random.randint(0,1) else True)
    return result if len(result) > 0 else None