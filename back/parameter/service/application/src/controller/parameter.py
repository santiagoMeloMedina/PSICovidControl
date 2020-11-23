
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.parameter as ParameterService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.PARAMETER['ALIAS'], __name__)
alias = BLUEPRINT.PARAMETER['ALIAS']

@route.route("/{}/department".format(alias), methods=["GET"])
def getAllDepartment():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ParameterService.getAllDepartment()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/city".format(alias), methods=["POST"])
def getCitiesByDepartment():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ParameterService.getCitiesByDepartment()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/neighborhood".format(alias), methods=["POST"])
def getNeighborhoodsByDepartment():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ParameterService.getNeighborhoodsByDepartment()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/documenttype".format(alias), methods=["GET"])
def getDocumentTypes():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ParameterService.getDocumentTypes()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/department/city".format(alias), methods=["POST"])
def getDepartmentByCity():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ParameterService.getDepartmentByCity()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result