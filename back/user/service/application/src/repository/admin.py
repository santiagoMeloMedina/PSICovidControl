
from src.configuration.app import database
from src.model.user.admin import Admin

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

def update(data):
    result = 0
    user = Admin(**data)
    doc = database.administrator.find_one({'username': user.getUsername()})
    if(doc != None):
        result = database.administrator.update_one({'username': user.getUsername()},{'$set': user.getMap()},upsert = False).matched_count
    return result > 0