
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

@route.route("/{}/all/<int:start>/<int:limit>".format(alias), methods=["POST"])
def getAllEntryHistory(start, limit):
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = EntryService.getAllEntryHistory(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/ep/<int:start>/<int:limit>".format(alias), methods=["POST"])
def getEntryHistoryByEp(start, limit):
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = EntryService.getEntryHistoryByEp(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/citizen/<int:start>/<int:limit>".format(alias), methods=["POST"])
def getEntryHistoryByCitizen(start, limit):
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = EntryService.getEntryHistoryByCitizen(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result