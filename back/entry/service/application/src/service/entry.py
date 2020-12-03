
import src.repository.entry as EntryRepository
from flask import request
import jwt
import src.constant.token as TOKEN
import src.constant.response as RESPONSE
import src.constant.role as ROLE
import src.constant.value as VALUE
import src.constant.entry as ENTRY
import datetime
from datetime import timedelta

def addEntry():
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    data['response'], data['description'] = getResponseDescription(**data)
    response = EntryRepository.addEntry(**data)
    if response:
        result[VALUE.CONTENT] = response
    return result

def getResponseDescription(temperature, mask, exam, quarantine, date=None, **kwargs):
    result = True
    description = []
    quarantine = int(quarantine)
    today = datetime.datetime.strptime(date, '%Y-%m-%d') if date != None else datetime.datetime.today()
    plusQuarantine = datetime.datetime.today()-timedelta(1)
    if exam:
        plusQuarantine = datetime.datetime.strptime(exam['date'], '%Y-%m-%d')+timedelta(quarantine)
    conditions = {
        "TEMPERATURE": int(temperature) < ENTRY.RESPONSE['LIMIT_TEMPERATURE'], 
        "MASK": int(mask) > 0,
        "QUARANTINE": not (exam['result'] == ENTRY.RESPONSE['INFECTED'] and plusQuarantine >= today)
    }
    for condition in conditions:
        value = conditions[condition]
        result &= value
        if not value:
            description.append(ENTRY.DESCRIPTION[condition])
    result = ENTRY.RESPONSE["ACCEPT"] if result else ENTRY.RESPONSE["REJECT"]
    return result, '\n'.join(description)

def getAllEntryHistory(start, limit):
    result = RESPONSE.EMPTY.copy()
    response = EntryRepository.getAllEntryHistory(start, limit)
    if response:
        result[VALUE.CONTENT] = response
    return result

def getEntryHistoryByEp(start, limit):
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = EntryRepository.getEntryHistoryByEp(data['docNum'], start, limit)
    if response:
        result[VALUE.CONTENT] = response
    return result

def getEntryHistoryByCitizen(start, limit):
    result = RESPONSE.EMPTY.copy()
    data = eval(request.data.decode("utf-8"))
    response = EntryRepository.getEntryHistoryByCitizen(data['docNum'], start, limit)
    if response:
        result[VALUE.CONTENT] = response
    return result