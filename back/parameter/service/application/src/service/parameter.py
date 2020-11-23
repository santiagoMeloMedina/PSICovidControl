
import src.repository.parameter as ParameterRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE

def getAllDepartment():
    result = RESPONSE.EMPTY.copy()
    response = ParameterRepository.getAllDepartment()
    if response:
        result[VALUE.CONTENT] = response
    return result

def getCitiesByDepartment():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ParameterRepository.getCitiesByDepartment(data['departmentId'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getNeighborhoodsByDepartment():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ParameterRepository.getNeighborhoodsByDepartment(data['cityId'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getDocumentTypes():
    result = RESPONSE.EMPTY.copy()
    response = ParameterRepository.getDocumentTypes()
    if response:
        result[VALUE.CONTENT] = response
    return result

def getDepartmentByCity():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ParameterRepository.getDepartmentByCity(data['cityId'])
    if response:
        result[VALUE.CONTENT] = response
    return result