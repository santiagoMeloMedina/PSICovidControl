
import random
from src.configuration.app import database
import src.constant.role as ROLE
from bson import ObjectId

def updateHealthEntity(_id,docNum):
    doc = database.healthEntity.find_one({'docNum': docNum})
    if(doc != None):
        exams = list(database.healthEntity.find_one({'docNum':docNum})['examsReg'])
        exams.append(_id)
        database.healthEntity.update_one({'docNum':docNum},{'$set': {'examsReg':exams}},upsert = False)
    else:
        database.healthEntity.insert_one({'docNum':docNum,'examsReg':[_id]})

def updateCitizenExams(_id,docNum):
    doc = database.citizen.find_one({'docNum': docNum})
    if(doc != None):
        exams = list(database.citizen.find_one({'docNum':docNum})['examsReg'])
        exams.append(_id)
        database.citizen.update_one({'docNum':docNum},{'$set': {'examsReg':exams}},upsert = False)
    else:
        database.citizen.insert_one({'docNum':docNum,'examsReg':[_id]})


def addExam(citizenDocNum, esDocNum, name, result, date, time, **kwargs):
    values = {'citizenDocNum':citizenDocNum,'esDocNum':esDocNum,'name':name,'result':result,'date':date,'time':time}
    database.exam.insert_one(values)
    updateHealthEntity(values['_id'],esDocNum)
    updateCitizenExams(values['_id'],citizenDocNum)
    values['_id'] = str(values['_id'])
    return values


def getHistoryByEs(esDocNum, start, limit):
    ans, exams = [], []
    query = database.healthEntity.find_one({'docNum':esDocNum})
    if query:
        exams = query['examsReg']
    q = database.exam.find({'_id':{'$in':exams}}).skip(start).limit(limit)
    for doc in q:
        ans.append({"_id":str(doc['_id']),'citizenDocNum':doc['citizenDocNum'],'esDocNum':doc['esDocNum'],'name':doc['name'],
                    'result':doc['result'],'date':doc['date'],'time':doc['time']})
    return ans

def getAllHistory(start, limit):
    q,ans = database.exam.find({}).skip(start).limit(limit),list()
    for doc in q:
        ans.append({"_id":str(doc['_id']),"citizenDocNum":doc['citizenDocNum'],"esDocNum":doc['esDocNum'],"name":doc['name'],
                    "result":doc['result'],'date':doc['date'],'time':doc['time']})
    return ans

def updateExamResult(_id, result):
    response = database.exam.update_one({'_id':ObjectId(_id)},{'$set':{'result':result}},upsert = False).matched_count
    return response > 0

def getDate(s):#string s in format "yy-mm-dd"
    return [int(i) for i in s.split("-")]

def getExamById(_id):
    return database.exam.find_one({'_id':_id})

def getCitizenExam(docNum):
    res = database.citizen.find_one({'docNum':str(docNum)})
    date = list()
    ans = {}
    if res != None:
        date = [-1,-1,-1]
        res = list(res['examsReg'])
        for i in range(len(res)):
            doc = getExamById(res[i])
            nDate = getDate(doc['date'])
            if((nDate[0] > date[0]) or (nDate[0] == date[0] and nDate[1] > date[1]) or (nDate[0] == date[0] and nDate[1] == date[1] and nDate[2] > date[2])):
                date = list(nDate)
                ans = {'result':doc['result'],'date':doc['date']} 
    return ans