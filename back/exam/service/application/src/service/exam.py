
import src.repository.exam as ExamRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE

def addExam():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ExamRepository.addExam(**data)
    if response:
        result[VALUE.CONTENT] = response
    return result

def getHistoryByEs(start, limit):
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ExamRepository.getHistoryByEs(data['esDocNum'], start, limit)
    if response:
        result[VALUE.CONTENT] = response
    return result

def getAllHistory(start, limit):
    result = RESPONSE.EMPTY.copy()
    response = ExamRepository.getAllHistory(start, limit)
    if response:
        result[VALUE.CONTENT] = response
    return result

def updateExamResult():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ExamRepository.updateExamResult(data['_id'], data['result'])
    if response:
        result[VALUE.CONTENT] = response
    return result

def getCitizenExam():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = ExamRepository.getCitizenExam(data['docNum'])
    if response:
        result[VALUE.CONTENT] = response
    return result

