
from src.configuration.app import database

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

def getAllEstablishment():
    result = []
    query = database.establishment.find({})
    for doc in query:
        result.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return result