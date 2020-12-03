
import src.repository.neighborhood as NeighborhoodRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE

def addNeighborhood():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = NeighborhoodRepository.addNeighborhood(data['name'], data['cityId'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getNeighborhoodsByDepartment():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = NeighborhoodRepository.getNeighborhoodsByDepartment(data['cityId'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def deleteNeighborhood():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = NeighborhoodRepository.deleteNeighborhood(data['_id'])
    if response:
        result[VALUE.CONTENT] = response
    return result