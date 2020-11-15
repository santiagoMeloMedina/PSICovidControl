
import src.repository.es as ESRepository
from flask import request
import jwt
import src.constant.response as RESPONSE
import src.constant.value as VALUE

def getUnauthorized(start, limit):
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = EPRepository.getUnauthorized(start, limit)
    if response != None:
        result[VALUE.CONTENT] = response
    return result