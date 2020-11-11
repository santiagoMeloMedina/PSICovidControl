
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
