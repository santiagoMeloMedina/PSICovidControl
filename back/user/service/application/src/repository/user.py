
from src.configuration.app import database

def authenticate(username, password):
    result = None
    check = database.user.find_one({'username':username,'password':password})
    if check != None:
        result = check
    return result

def register(data):
    result = None
    values = {'email':data['email'],'password':data['password'],'username':data['username'],'rol':data['rol']}
    try:
        database.user.insert_one(values)
        result = values
    except Exception as e:
        pass
    return result
