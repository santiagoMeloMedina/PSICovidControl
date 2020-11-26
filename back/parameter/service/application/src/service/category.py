
import src.repository.category as CategoryRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE

def addCategory():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = CategoryRepository.addCategory(data['name'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getCategories():
    result = RESPONSE.EMPTY.copy()
    response = CategoryRepository.getCategories()
    if response:
        result[VALUE.CONTENT] = response
    return result

def deleteCategory():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = CategoryRepository.deleteCategory(data['_id'])
    if response:
        result[VALUE.CONTENT] = response
    return result