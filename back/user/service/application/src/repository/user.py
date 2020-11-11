
from src.configuration.app import database

def authenticate(username, password):
    result = None
    check = database.user.find_one({'username':username,'password':password})
    if check != None:
        result = str(check['_id'])
    return result

def getRoleByUsername(username):
    return "Admin"