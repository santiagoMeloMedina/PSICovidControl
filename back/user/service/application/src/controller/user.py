
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.user as UserService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.USER['ALIAS'], __name__)
alias = BLUEPRINT.USER['ALIAS']

@route.route("/{}/authenticate".format(alias), methods=["POST"])
def authenticate():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.authenticate()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/register".format(alias), methods=["POST"])
def register():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.register()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/all".format(alias), methods=["GET"])
def getAllUsers():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.getAllUsers()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result
