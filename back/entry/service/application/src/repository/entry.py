
import random
from src.configuration.app import database
import src.constant.role as ROLE
import datetime
from bson import ObjectId

def addEntry(epDocNum, citizenDocNum, epId, citizenId, temperature, mask, response, description, **kwargs):
    result = None
    today = str(datetime.datetime.today().date())
    now = str(datetime.datetime.today().time())
    values = {'epDocNum': epDocNum, 'citizenDocNum': citizenDocNum, 'epId': ObjectId(epId), 
              'citizenId': ObjectId(citizenId), 'temperature': temperature, 'date': today, 
              'time': now, 'mask': mask, 'response': response, 'description': description
            }
    query = database.entry.insert_one(values)
    if query:
        result = values
        id = result['_id']
        addEpEntry(epDocNum, id)
        addCitizenEntry(citizenDocNum, id)
        result['_id'] = str(id)
        result['citizenId'] = str(result['citizenId'])
        result['epId'] = str(result['epId'])
    return result

def addCitizenEntry(docNum, id):
    values = {'docNum': docNum}
    citizen = database.citizen.find_one(values)
    if not citizen:
        values['entries'] = []
        database.citizen.insert_one(values)
    else:
        values['entries'] = citizen['entries']
    values['entries'].append(id)
    database.citizen.update_one({'docNum': docNum}, {'$set': {'entries': values['entries']}},upsert = False)

def addEpEntry(docNum, id):
    values = {'docNum': docNum}
    ep = database.establishment.find_one(values)
    if not ep:
        values['entries'] = []
        database.establishment.insert_one(values)
    else:
        values['entries'] = ep['entries']
    values['entries'].append(id)
    database.establishment.update_one({'docNum': docNum}, {'$set': {'entries': values['entries']}},upsert = False)

def getAllEntryHistory(start, limit):
    result = []
    query = database.entry.find({}).skip(start).limit(limit)
    for doc in query:
        story = doc
        story['_id'] = str(story['_id'])
        story['citizenId'] = str(story['citizenId'])
        story['epId'] = str(story['epId'])
        result.append(story)
    return result

def getEntryHistoryByEp(docNum, start, limit):
    result = []
    values = {'docNum': docNum}
    ep = database.establishment.find_one(values)
    if ep:
        for id in ep['entries'][start:start+limit+1]:
            story = database.entry.find_one({'_id': ObjectId(id)})
            story['_id'] = str(story['_id'])
            story['citizenId'] = str(story['citizenId'])
            story['epId'] = str(story['epId'])
            result.append(story)
    return result

def getEntryHistoryByCitizen(docNum, start, limit):
    result = []
    values = {'docNum': docNum}
    citizen = database.citizen.find_one(values)
    if citizen:
        for id in citizen['entries'][start:start+limit+1]:
            story = database.entry.find_one({'_id': ObjectId(id)})
            story['_id'] = str(story['_id'])
            story['citizenId'] = str(story['citizenId'])
            story['epId'] = str(story['epId'])
            result.append(story)
    return result