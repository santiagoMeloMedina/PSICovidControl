
import src.repository.user as UserRepository
import src.repository.admin as AdminRepository
import src.repository.citizen as CitizenRepository
import src.repository.ep as EPRepository
import src.repository.es as ESRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE

def authenticate():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    username, password = data["username"], data["password"]
    response = UserRepository.authenticate(username, password)
    if response != None:
        id = str(response['_id'])
        role = response['rol']
        token = jwt.encode(generatePayload(id, username, role), TOKEN.SECRET_KEY, algorithm="HS256").decode('utf-8')
        result[TOKEN.NAME] = token
    return result

def generatePayload(id, username, role):
    result = {
        TOKEN.PAYLOAD['ID']: id,
        TOKEN.PAYLOAD['USERNAME']: username,
        TOKEN.PAYLOAD['ROLE']: role
    }
    return result

def getRoleRepository(data):
    rol = data['rol']
    if rol == ROLE.ROLES['ADMIN']:
        result = AdminRepository
    elif rol == ROLE.ROLES['CITIZEN']:
        result = CitizenRepository
    elif rol == ROLE.ROLES['EP']:
        result = EPRepository
    elif rol == ROLE.ROLES['ES']:
        result = ESRepository
    else:
        result = UserRepository
    return result

def setStateByRol(data):
    rol = data['rol']
    data['state'] = 'A'
    if rol == ROLE.ROLES['ADMIN']:
        result = AdminRepository
    elif rol == ROLE.ROLES['CITIZEN']:
        result = CitizenRepository
    elif rol == ROLE.ROLES['EP']:
        result = EPRepository
        data['state'] = 'I'
    elif rol == ROLE.ROLES['ES']:
        result = ESRepository
        data['state'] = 'I'
    else:
        result = UserRepository
    return result

def register():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    setStateByRol(data)
    repository = getRoleRepository(data)
    if not UserRepository.checkRegistration(data['username'], data['email']):
        user = UserRepository.register(data)
        profile = repository.register(data)
        user['_id'], profile['_id'] = str(user['_id']), str(profile['_id'])
        if user and profile:
            result[VALUE.CONTENT] = user
    return result

def getUser():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = UserRepository.getUser(data['username'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getAllUsers(start, limit):
    result = RESPONSE.EMPTY.copy()
    users = UserRepository.getAllUsers(start, limit)
    if users:
        result[VALUE.CONTENT] = users
    return result

def getUnauthorized(start, limit):
    result = RESPONSE.EMPTY.copy()
    response = UserRepository.getUnauthorized(start, limit)
    if response != None:
        result[VALUE.CONTENT] = response
    return result

def authorize():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    repository = getRoleRepository(data)
    response = None
    if data['state'] == 'I' or data['state'] == 'A':
        response = repository.setState(data['username'], data['state'])
    if response:
        result[VALUE.CONTENT] = True
    return result
    