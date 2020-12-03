
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.exam as ExamService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.EXAM['ALIAS'], __name__)
alias = BLUEPRINT.EXAM['ALIAS']

@route.route("/{}/add".format(alias), methods=["POST"])
def addExam():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ExamService.addExam()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/history/es/<int:start>/<int:limit>".format(alias), methods=["POST"])
def getHistoryByEs(start, limit):
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ExamService.getHistoryByEs(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/history/<int:start>/<int:limit>".format(alias), methods=["GET"])
def getAllHistory(start, limit):
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ExamService.getAllHistory(start, limit)
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/history".format(alias), methods=["PUT"])
def updateExamResult():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ExamService.updateExamResult()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result

@route.route("/{}/citizen".format(alias), methods=["POST"])
def getCitizenExam():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ExamService.getCitizenExam()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result