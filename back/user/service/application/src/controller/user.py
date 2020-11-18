
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
    """ This function authenticates a user"""
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
    """ This function registers a user"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.register()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/user".format(alias), methods=["POST"])
def getUser():
    """ This function obtains a user"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.getUser()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/all/<int:start>/<int:limit>".format(alias), methods=["GET"])
def getAllUsers(start, limit):
    """ This function obtains all users"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.getAllUsers(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/unauthorized/<int:start>/<int:limit>".format(alias), methods=["GET"])
def getUnauthorized(start, limit):
    """ This function obtains all unauthorized users"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.getUnauthorized(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/authorize".format(alias), methods=["POST"])
def authorize():
    """ This function authorize a certain user"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.authorize()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/update".format(alias), methods=["PUT"])
def update():
    """ This function updates a certain user"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = UserService.update()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result