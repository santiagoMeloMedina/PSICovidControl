
from flask import Blueprint
import src.constant.blueprint as BLUEPRINT
from src.model.response import Response
import src.constant.http_code as HTTP_CODE
import src.service.exam as ExamService
from src.configuration.security import admin, user
import src.constant.response as RESPONSE

route = Blueprint(BLUEPRINT.EXAM['ALIAS'], __name__)
alias = BLUEPRINT.EXAM['ALIAS']

@route.route("/{}/get".format(alias), methods=["POST"])
def get():
    result = Response(HTTP_CODE.ERROR, {}).toMap()
    try:
        response = ExamService.get()
        if response != RESPONSE.EMPTY.copy():
            result = Response(HTTP_CODE.SUCESSFUL, response).toMap()
    except Exception as e:
        print(e)
    return result