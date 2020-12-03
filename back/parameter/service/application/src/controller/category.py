
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.category as CategoryService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.CATEGORY['ALIAS'], __name__)
alias = BLUEPRINT.CATEGORY['ALIAS']


@route.route("/{}/add".format(alias), methods=["POST"])
def addCategory():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = CategoryService.addCategory()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}".format(alias), methods=["GET"])
def getCategories():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = CategoryService.getCategories()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/delete".format(alias), methods=["POST"])
def deleteCategory():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = CategoryService.deleteCategory()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result