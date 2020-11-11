
from src.configuration.app import database

def register(data):
    result = None
    values = {
        'docType':data['docType'],'docNum':data['docNum'],'username':data['username'],
        'name':data['name'],'lastname':data['lastname']
    }
    try:
        database.administrator.insert_one(values)
        result = values
    except Exception as e:
        pass
    return result