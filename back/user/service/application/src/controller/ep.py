
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.ep as EPService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.EP['ALIAS'], __name__)
alias = BLUEPRINT.EP['ALIAS']

@route.route("/{}/unauthorized".format(alias), methods=["POST"])
def getUnauthorized():
    """ This function obtains all unauthorized users"""
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = EPService.getUnauthorized()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result