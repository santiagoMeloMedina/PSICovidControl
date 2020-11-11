
from src.configuration.app import database
from src.repository.citizen import getAllCitizens
from src.repository.ep import getAllEstablishment
from src.repository.es import getAllHealthEn


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

def getAllUsers():
    result = getAllCitizens()+getAllEstablishment()+getAllHealthEn()
    return result