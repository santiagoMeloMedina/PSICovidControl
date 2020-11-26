
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.entry as EntryService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.ENTRY['ALIAS'], __name__)
alias = BLUEPRINT.ENTRY['ALIAS']

@route.route("/{}/add".format(alias), methods=["POST"])
def addEntry():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = EntryService.addEntry()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result