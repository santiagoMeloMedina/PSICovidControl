
from src.configuration.app import database

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

def getAllCitizens():
    result = []
    query = database.citizen.find({})
    for doc in query:
        result.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],'lastname':doc['lastname'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    return result