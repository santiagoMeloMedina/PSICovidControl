
import src.repository.documentType as DocumentTypeRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE

def addDocumentType():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = DocumentTypeRepository.addDocumentType(data['name'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getDocumentTypes():
    result = RESPONSE.EMPTY.copy()
    response = DocumentTypeRepository.getDocumentTypes()
    if response:
        result[VALUE.CONTENT] = response
    return result

def deleteDocumentType():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = DocumentTypeRepository.deleteDocumentType(data['_id'])
    if response:
        result[VALUE.CONTENT] = response
    return result