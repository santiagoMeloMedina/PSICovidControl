
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.documentType as DocumentTypeService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.DOCUMENTTYPE['ALIAS'], __name__)
alias = BLUEPRINT.DOCUMENTTYPE['ALIAS']


@route.route("/{}/add".format(alias), methods=["POST"])
def addDocumentType():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = DocumentTypeService.addDocumentType()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}".format(alias), methods=["GET"])
def getDocumentTypes():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = DocumentTypeService.getDocumentTypes()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/delete".format(alias), methods=["POST"])
def deleteDocumentType():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = DocumentTypeService.deleteDocumentType()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result