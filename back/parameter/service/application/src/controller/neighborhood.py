
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.neighborhood as NeighborhoodService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.NEIGHBORHOOD['ALIAS'], __name__)
alias = BLUEPRINT.NEIGHBORHOOD['ALIAS']


@route.route("/{}/add".format(alias), methods=["POST"])
def addNeighborhood():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = NeighborhoodService.addNeighborhood()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}".format(alias), methods=["POST"])
def getNeighborhoodsByDepartment():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = NeighborhoodService.getNeighborhoodsByDepartment()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/delete".format(alias), methods=["POST"])
def deleteNeighborhood():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = NeighborhoodService.deleteNeighborhood()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result