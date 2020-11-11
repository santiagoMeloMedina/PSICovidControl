
import src.repository.user as UserRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE

def authenticate():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    username, password = data["username"], data["password"]
    response = UserRepository.authenticate(username, password)
    if response != None:
        role = UserRepository.getRoleByUsername(username)
        token = jwt.encode(generatePayload(response, username, role), TOKEN.SECRET_KEY, algorithm="HS256").decode('utf-8')
        result[TOKEN.NAME] = token
    return result

def generatePayload(id, username, role):
    result = {
        TOKEN.PAYLOAD['ID']: id,
        TOKEN.PAYLOAD['USERNAME']: username,
        TOKEN.PAYLOAD['ROLE']: role
    }
    return result