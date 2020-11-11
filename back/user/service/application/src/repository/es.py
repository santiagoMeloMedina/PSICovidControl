
from src.configuration.app import database

def register(data):
    result = None
    values = {
        'docNum':data['docNum'],'username':data['username'],'name':data['name'],'city':data['city'],'docType':data['docType'],
        'totalCap':data['totalCap'],'totalBeds':data['totalBeds'],'totalRes':data['totalRes'],'totalDocts':data['totalDocts'],
        'address':data['address'],'neighHood':data['neighHood'],'phoneNum':data['phoneNum'],'state':data['state']
    }
    try:
        database.healthEntity.insert_one(values)
        result = values
    except Exception as e:
        pass
    return result

def getAllHealthEn():
    result = []
    query = database.healthEntity.find({})
    for doc in query:
        result.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes']})
    return result