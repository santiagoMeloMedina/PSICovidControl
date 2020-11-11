
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