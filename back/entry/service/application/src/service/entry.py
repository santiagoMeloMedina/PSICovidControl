
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

def getResponseDescription(temperature, mask, exam, quarantine, **kwargs):
    result = True
    description = []
    plusQuarantine = datetime.datetime.today()-timedelta(1)
    if exam:
        plusQuarantine = datetime.datetime.strptime(exam['date'], '%Y-%m-%d')+timedelta(quarantine)
    conditions = {
        "TEMPERATURE": int(temperature) < ENTRY.RESPONSE['LIMIT_TEMPERATURE'], 
        "MASK": mask,
        "QUARANTINE": not (exam['result'] == ENTRY.RESPONSE['INFECTED'] and plusQuarantine >= datetime.datetime.today())
    }
    for condition in conditions:
        value = conditions[condition]
        result &= value
        if not value:
            description.append(ENTRY.DESCRIPTION[condition])
    result = ENTRY.RESPONSE["ACCEPT"] if result else ENTRY.RESPONSE["REJECT"]
    return result, '\n'.join(description)
