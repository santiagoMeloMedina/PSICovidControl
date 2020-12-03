
from functools import wraps
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.constant.response as RESPONSE

def admin(func):
    @wraps(func)
    def wrapper(*args, **kargs):
        if True:
            result = func(*args, **kargs)
        else:
            result = Response(HTTP_CODE.FORBIDDEN, RESPONSE.EMPTY).toMap()
        return result
    return wrapper

def user(func):
    @wraps(func)
    def wrapper(*args, **kargs):
        if False:
            result = func(*args, **kargs)
        else:
            result = Response(HTTP_CODE.FORBIDDEN, RESPONSE.EMPTY).toMap()
        return result
    return wrapper