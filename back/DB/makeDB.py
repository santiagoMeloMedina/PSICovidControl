from sys import stdin
from pymongo import MongoClient
from pprint import pprint
import os
import random
from datetime import datetime
import time
import pymongo
import csv


#-------------------------------------Ciudades y departamentos--------------------------------------------------
def checkDept(db,name):
    return True if db.department.find_one({"name":name}) != None else False

def checkCity(db,name):
    return True if db.city.find_one({"name":name}) != None else False

def getIdDept(db,name):
    return db.department.find_one({"name":name})['_id']

def getIdCity(db,name):
    return db.city.find_one({"name":name})['_id']

def getNameCity(db,_id):
    return db.city.find_one({"_id":_id})['name']

def registerDept(db,name):
    db.department.insert_one({"name":name})


def registerCity(db,name,idDept):
    db.city.insert_one({"name":name,"idDept":idDept})



def initializeCountryParams(db,fileName):
    with open(fileName,encoding="utf8") as file:
        reader,i = csv.reader(file),0
        for row in reader:
            if i > 0:
                fDept,fCity = checkDept(db,row[2]),checkCity(db,row[4])
                if(not fDept and not fCity):
                    registerDept(db,row[2])
                    registerCity(db,row[4],getIdDept(db,row[2]))
                elif(fDept and not fCity):
                    registerCity(db,row[4],getIdDept(db,row[2]))
            i += 1



#-------------------------------------Ciudades y departamentos--------------------------------------------------
def printDocument(doc):
    for k in doc.keys():
        print(f"{k}: {doc[k]}")
    print()


#------------------------------------Chequear registro de usuario------------------------------------
def checkUserCred(username,password,db):
    return str(db.user.find_one({'username':username,'password':password})['_id']) if db.user.find_one({'username':username,'password':password}) != None else None


def checkUsername(username,db):
    return True if db.user.find_one({'username':username}) != None else False

def checkEmail(email,db):
    return True if db.user.find_one({'email':email}) != None else False

def checkRegistration(username,email,db):
    return checkUsername(username,db) or checkEmail(email,db)

def checkStateCitizen(db,username):
    return db.citizen.find_one({'username':username})['state'] == 'A'


def checkStateHealthEntity(db,username):
    return db.healthEntity.find_one({'username':username})['state'] == 'A'

def checkStateEstablishment(db,username):
    return db.establishment.find_one({'username':username})['state'] == 'A'


#------------------------------------Chequear registro de usuario------------------------------------


def getRole(username,db):
    return db.user.find_one({'username':username})['rol']



#------------------------------------Registrar usuario------------------------------------


def registerUser(email,password,username,rol,db):
    db.user.insert_one({'email':email,'password':password,'username':username,'rol':rol})

def registerCitizen(docNum,username,names,lastNames,city,docType,phoneNum,neighHood,address,gender,birthdate,state,db):
    db.citizen.insert_one({'docNum':docNum,'username':username,'names':names, 'lastNames':lastNames,
    'city':city,'docType': docType,
    'phoneNum':phoneNum,'neighHood':neighHood,'address':address,'gender':gender,'birthdate':birthdate,
    'state':state})

def registerAdmin(docType,docNum,username,names,lastNames,db):
    db.administrator.insert_one({'docType':docType,'docNum':docNum,'username':username,
    'names':names,'lastNames':lastNames})

def registerHealthEn(docNum,username,name,city,docType,totalCap,totalBeds,totalRes,totalDocts,address,neighHood,phoneNum,state,db):
    db.healthEntity.insert_one({
        'docNum':docNum,'username':username,'name':name,'city':city,'docType':docType,
        'totalCap':totalCap,'totalBeds':totalBeds,'totalRes':totalRes,'totalDocts':totalDocts,
        'address':address,'neighHood':neighHood,'phoneNum':phoneNum,'state':state
    })


def registerEstablishment(docNum,username,name,city,docType,totalCap,address,neighHood,phoneNum,category,state,db):
    db.establishment.insert_one({
        'docNum':docNum,'username':username,'name':name,'city':city,'docType':docType,
        'totalCap':totalCap, 'address':address,'neighHood':neighHood,'phoneNum':phoneNum,
        'category':category,'state':state
    })


def getDepts(db):
    q,ans = db.department.find({}),list()
    for doc in q:
        ans.append(doc['name'])
    return ans


def getDeptByCity(db,cityName):
    return db.department.find_one({'_id': db.city.find_one({"name":cityName})["idDept"]})['name']

def getCitiesByDept(db,deptName):#obtiene todas las ciudades de un departamento
    q,ans =  db.city.find({'idDept' : getIdDept(db,deptName)}),list()
    for doc in q:
        ans.append(doc['name'])
    return ans

def getCategories(db):
    q,ans = db.category.find({}),list()
    for doc in q:
        ans.append(doc['name'])
    return ans

def getNeighHoodsByCity(db,cityName):#obtiene todos los barrios de una ciudad
    q,ans = db.neighborHood.find({'city':getIdCity(db,cityName)}),list()
    for doc in q:
        ans.append(doc['name'])
    return ans

def getDocTypes(db):
    q,ans = db.documentType.find({}),list()
    for doc in q:
        ans.append(doc['name'])
    return ans



#------------------------------------Registrar usuario------------------------------------



#------------------------------------Funciones administrador------------------------------------

def getInactiveUsers(db):
    ans = list()
    q1,q2,q3 = db.citizen.find({'state':'I'}),db.healthEntity.find({'state':'I'}),db.establishment.find({'state':'I'})
    for doc in q1:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'names':doc['names'],'lastNames':doc['lastNames'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    for doc in q2:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes']})
    for doc in q3:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return ans




def getUserData(db,username):
    rol,ans = db.user.find_one({'username':username})['rol'],list()
    if(rol == 'Admin'):
        doc = db.administrator.find_one({'username':username})
        ans.append({'docType':doc['docType'],'docNum':doc['docNum'],'username':doc['username'],'names':doc['names'],
        'lastNames':doc['lastNames']}) 
    elif(rol == 'Citizen'):
        doc = db.citizen.find_one({'username':username})
        ans.append({'docType':doc['docType'],'docNum':doc['docNum'],'username':doc['username'],'names':doc['names'],'lastNames':doc['lastNames'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    elif(rol == 'EP'):
        doc = db.establishment.find_one({'username':username})
        ans.append({'docType':doc['docType'],'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category'],'city':doc['city']})
    elif(rol == 'ES'):
        doc = db.healthEntity.find_one({'docType':doc['docType'],'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'city':doc['city']})
    

    return ans


def getUsersToActivateHealthEn(db,skipV,limitV):
    ans = list()
    qHe = db.healthEntity.find({'state':'I'}).skip(skipV).limit(limitV)
    for doc in qHe:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes'],'city':doc['city']})
    ans = sorted(ans,key = lambda x: False if not random.randint(0,1) else True)
    return ans

    
def getUsersToActivateEstablishment(db,skipV,limitV):
    ans = list()
    qEs = db.establishment.find({'state':'I'}).skip(skipV).limit(limitV)
    for doc in qEs:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category'],'city':doc['city']})

    ans = sorted(ans,key = lambda x: False if not random.randint(0,1) else True)
    return ans


#REvisar que la cuenta este activa!!!






def getUsersToActivate(db,skipV,limitV):
    ans = list()
    qHe,qEs = db.healthEntity.find({'state':'I'}).skip(skipV).limit(limitV),db.establishment.find({'state':'I'}).skip(skipV).limit(limitV)
    for doc in qHe:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes'],'city':doc['city']})
    for doc in qEs:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'city':doc['city']})
    ans = sorted(ans,key = lambda x: False if not random.randint(0,1) else True)
    return ans




def getActiveUsers(db):
    ans = list()
    q1,q2,q3 = db.citizen.find({'state':'A'}),db.healthEntity.find({'state':'A'}),db.establishment.find({'state':'A'})
    for doc in q1:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'names':doc['names'],'lastNames':doc['lastNames'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    for doc in q2:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes']})
    for doc in q3:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return ans


def getAllCitizens(db,skipV,limitV):
    ans,q = list(),db.citizen.find({}).skip(skipV).limit(limitV)
    for doc in q:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'names':doc['names'],'lastNames':doc['lastNames'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    return ans  


def getAllHealthEn(db,skipV,limitV):
    ans,q = list(),db.healthEntity.find({}).skip(skipV).limit(limitV)
    for doc in q:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes']})
    return ans     



def getAllEstablishment(db,skipV,limitV):
    ans,q = list(),db.establishment.find({}).skip(skipV).limit(limitV)
    for doc in q:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return ans


def getAllUsers(db,skipV,limitV):
    ans = getAllCitizens(db,skipV,limitV//3)+getAllHealthEn(db,skipV,limitV//3)+getAllEstablishment(db,skipV,limitV//3)
    ans = sorted(ans,key = lambda x: False if not random.randint(0,1) else True)
    return ans

    
def getAllDocTypes(db):
    q,ans = db.documentType.find({}),list()
    for doc in q:
        ans.append(doc['name'])
    return ans


def getAllExams(db):
    q,ans = db.exam.find({}),list()
    for doc in q:
        ans.append({"docNumCi":doc['docNumCi'],"docNumHe":doc['docNumHe'],"citizensName":doc['citizensName'],"result":doc['result']})
    return ans

def getAllEntries(db):#Mostrar el nombre de la persona y el del establecimiento ? 
    q,ans = db.entry.find({}),list()
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description']})
    return ans



def getEstablishmentsByCategory(db,name):#la db es la de users!
    q,ans = db.establishment.find({'category':name}),list()
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description'],'category':name})
    return ans

def getEntriesByCategory(db,establishments):#la db es la de EntryDB, establishments es una lista de numeros de documento de los EP de la categoria buscada
    q,ans = db.entry.find({'docNumEs':{'$in':establishments}}),list()#Revisar!
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description']}) 
    return ans

def getExamsByCitizenDocNum(db,docNum):#numero de documento del CIUDADANO
    q,ans = db.exam.find({'docNumCi':docNum}),list()
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans

def getExamsByCitizenName(db,name):
    q,ans = db.exam.find({'citizensName':name}),list()
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans
    

def getExamsByResult(db,result):
    q,ans = db.exam.find({'result':result}),list()
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans
       

def getAllNeighHoods(db):
    q,ans = db.neighborHood.find({}),list()
    for doc in q:
        ans.append({'name':doc['name'],'city': getNameCity(db,doc['city'])})
    return ans


def registerNeighHood(db,name,cityName):
    db.neighborHood.insert_one({'name':name,'city':getIdCity(db,cityName)})

def registerDocType(db,name):
    db.documentType.insert_one({'name':name})

def registerCategory(db,name):
    db.category.insert_one({'name':name})


def registerQuarantine(db,days):
    db.quarantine.drop()
    db.quarantine.insert_one({'days':days})


def deleteNeighHood(db,name):
    db.neighborHood.delete_one({'name':name})

def deleteDocType(db,name):
    db.documentType.delete_one({'name':name})


def deleteCategory(db,name):
    db.category.delete_one({'name':name})

def setCitizenState(db,username,newState):
    db.citizen.update_one({'username':username},{'$set':{'state':newState}},upsert = False)

def setHealthEnState(db,username,newState):
    db.healthEntity.update_one({'username':username},{'$set':{'state':newState}},upsert = False)


def setEstablishmentState(db,username,newState):
    db.establishment.update_one({'username':username},{'$set':{'state':newState}},upsert = False)


def setNameAdmin(db,username,newName):
    db.administrator.update_one({'username':username},{'$set':{'names':newName}},upsert = False)

def setLastnameAdmin(db,username,newLastname):
    db.administrator.update_one({'username':username},{'$set':{'lastNames':newLastname}},upsert = False)


def setPasswordUser(db,username,newPassword):# igual para todos los usuarios
    db.user.update_one({'username':username},{'$set':{'password':newPassword}},upsert = False)



#------------------------------------Funciones administrador---------------------------------------



#------------------------------------Funciones ciudadano---------------------------------------



def getDate(s):#string s in format "yy-mm-dd"
    return [int(i) for i in s.split("-")]



def setNameCitizen(db,username,newName):
    db.citizen.update_one({'username':username},{'$set':{'names':newName}},upsert = False)

def setLastnameCitizen(db,username,newLastname):
    db.citizen.update_one({'username':username},{'$set':{'lastNames':newLastname}},upsert = False)

def setPhoneNumberCitizen(db,username,newPhoneNum):
    db.citizen.update_one({'username':username},{'$set':{'phoneNum':newPhoneNum}},upsert = False)

def setNeighHoodCitizen(db,username,newNeighHood):
    db.citizen.update_one({'username':username},{'$set':{'neighHood':newNeighHood}},upsert = False)

def getCategoryById(db,_id):
    return db.establishment.find_one({'_id':_id})['category']


def getEntriesByCitizen(dbEntry,dbUsers,docNum): #BORRAR citizen de EntryDB?, db es la de EntryDB
    entries,ans = list(dbEntry.citizen.find_one({'docNum':docNum})['entriesReg']),list()
    print(entries)
    q = dbEntry.entry.find({'_id':{'$in':entries}}) #Revisar!
    for doc in q:
          ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description'],'category':getCategoryById(dbUsers,doc['idEs'])})
    return ans 


def getEntriesByCitizenAndCategory(dbEntry,dbUsers,docNum,category):
    entries,ans = list(dbEntry.citizen.find_one({'docNum':docNum})['entriesReg']),list()
    q = dbEntry.entry.find({'_id':{'$in':entries}}) #revisar
    for doc in q:
        _category = getCategoryById(dbUsers,doc['idEs'])
        if(_category == category):
            ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
            'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description'],'category':_category})
    return ans
 
def getEntriesByCitizenAndDate(dbEntry,dbUsers,docNum,initialDate,finalDate):
    initialDate,finalDate = getDate(initialDate),getDate(finalDate)
    entries,ans = list(dbEntry.citizen.find_one({'docNum':docNum})['entriesReg']),list()
    q = dbEntry.entry.find({'_id':{'$in':entries}}) #revisar
    for doc in q:
        date = getDate(doc['date'])
        if( initialDate[0] <= date[0] <= finalDate[0] and initialDate[1] <= date[1] <= finalDate[1] and initialDate[2] <= date[2] <= finalDate[2]):#dia/mes/anio
            ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
            'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description'],'category':getCategoryById(dbUsers,doc['idEs'])})
    return ans
 


#------------------------------------Funciones ciudadano---------------------------------------





#------------------------------------Funciones EP---------------------------------------
   

def setNameEstablishment(db,username,newName):
    db.establishment.update_one({'username':username},{'$set':{'names':newName}},upsert = False)

def setAddressEstablishment(db,username,newAddress):
    db.establishment.update_one({'username':username},{'$set':{'address':newAddress}},upsert = False)

def setPhoneNumberEstablishment(db,username,newPhoneNum):
    db.establishment.update_one({'username':username},{'$set':{'phoneNum':newPhoneNum}},upsert = False)

def setNeighHoodEstablishment(db,username,newNeighHood):
    db.establishment.update_one({'username':username},{'$set':{'neighHood':newNeighHood}},upsert = False)

def setCategoryEstablishment(db,username,newCategory):
    db.establishment.update_one({'username':username},{'$set':{'category':newCategory}},upsert = False)

def getGenderById(db,_id):
    return db.citizen.find_one({'_id':_id})['gender']

def getIdCitizenByDocNum(db,docNum):
    return db.citizen.find_one({'docNum':docNum})['_id']

def getCitizenByDocNum(db,docNum):
    return True if db.citizen.find_one({'docNum':docNum}) != None else False

def getEntriesByEstablishment(dbEntry,dbUsers,docNum):
    entries,ans = list(dbEntry.establishment.find_one({'docNum':docNum})['entriesReg']),list()
    q = dbEntry.entry.find({'_id':{'$in':entries}})
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans']}) 
    return ans

def getEntriesByEstablishmentAndDocNumCi(dbEntry,dbUsers,docNumEs,docNumCi):
    entries,ans = list(dbEntry.establishment.find_one({'docNum':docNumEs})['entriesReg']),list()
    q = dbEntry.entry.find({'_id':{'$in':entries},'docNumCi':docNumCi})#revisar
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans']}) 
    return ans

def getEntriesByEstablishmentAndGender(dbEntry,dbUsers,docNumEs,gender):
    entries,ans = list(dbEntry.establishment.find_one({'docNum':docNumEs})['entriesReg']),list()
    q = dbEntry.entry.find({'_id':{'$in':entries}})#revisar
    for doc in q:
        _gender = getGenderById(dbUsers,doc['idCitizen'])
        if _gender == gender:
            ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
            'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans']}) 
    return ans

def getEntriesByEstablishmentAndDate(dbEntry,docNumEs,initialDate,finalDate):
    initialDate,finalDate = getDate(initialDate),getDate(finalDate)
    entries,ans = list(dbEntry.establishment.find_one({'docNum':docNumEs})['entriesReg']),list()
    q = dbEntry.entry.find({'_id':{'$in':entries}}) #revisar
    for doc in q:
        date = getDate(doc['date'])
        if( initialDate[0] <= date[0] <= finalDate[0] and initialDate[1] <= date[1] <= finalDate[1] and initialDate[2] <= date[2] <= finalDate[2]):#dia/mes/anio
            ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
            'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description'],'category':getCategoryById(dbUsers,doc['idEs'])})
    return ans
 

def updateCitizenEntry(db,_id,docNum):
    doc = db.citizen.find_one({'docNum':docNum})
    if( doc != None):
        entries = list(doc['entriesReg'])
        entries.append(_id)
        db.citizen.update_one({'docNum':docNum},{'$set': {'entriesReg':entries}},upsert = False)
    else:
        db.citizen.insert_one({'docNum':docNum,'entriesReg':[_id]})
    

def updateEstablishmentEntry(db,_id,docNum):
    doc = db.establishment.find_one({'docNum':docNum})
    if(doc != None):
        entries = list(doc['entriesReg'])
        entries.append(_id)
        db.establishment.update_one({'docNum':docNum},{'$set': {'entriesReg':entries}},upsert = False)
    else:
        db.establishment.insert_one({'docNum':docNum,'entriesReg':[_id]})
    


def registerEntry(db,docNumCi,docNumEs,idEs,idCitizen,temperature,date,time,mask,ans,description):
    _id = db.entry.insert_one({'docNumCi':docNumCi,'docNumEs':docNumEs,'idEs':idEs, 'idCitizen':idCitizen,'temperature':temperature,
    'date':date,'time':time,'mask':mask,'ans':ans,'description':description}).inserted_id
    updateCitizenEntry(db,_id,docNumCi)
    updateEstablishmentEntry(db,_id,docNumEs)



#------------------------------------Funciones EP---------------------------------------



#------------------------------------Funciones ES---------------------------------------



def setNameHealthEntity(db,username,newName):
    db.healthEntity.update_one({'username':username},{'$set':{'names':newName}},upsert = False)

def setAddressHealthEntity(db,username,newAddress):
    db.healthEntity.update_one({'username':username},{'$set':{'address':newAddress}},upsert = False)

def setPhoneNumberHealthEntity(db,username,newPhoneNum):
    db.healthEntity.update_one({'username':username},{'$set':{'phoneNum':newPhoneNum}},upsert = False)

def setNeighHoodHealthEntity(db,username,newNeighHood):
    db.healthEntity.update_one({'username':username},{'$set':{'neighHood':newNeighHood}},upsert = False)

def getExamsByHealthEntityAndDocNumCi(db,docNumCi,docNumHe):
    exams,ans = list(db.healthEntity.find_one({'docNum':docNumHe})['examsReg']),list()
    q = db.entry.find({'_id':{'$in':exams},'docNumCi':docNumCi})
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans

def getExamsByHealthEntityAndCitizenName(db,citizensName,docNumHe):
    exams,ans = list(db.healthEntity.find_one({'docNum':docNumHe})['examsReg']),list()
    q = db.entry.find({'_id':{'$in':exams},'citizensName':citizensName})
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans

def getExamsByHealthEntityAndResult(db,result,docNumHe):
    exams,ans = list(db.healthEntity.find_one({'docNum':docNumHe})['examsReg']),list()
    q = db.entry.find({'_id':{'$in':exams},'result':result})
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans



def getExamsByHealthEntity(db,docNum):#db de exams
    exams,ans = list(db.healthEntity.find_one({'docNum':docNum})['examsReg']),list()
    q = db.entry.find({'_id':{'$in':exams}})
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumHe':doc['docNumHe'],'citizensName':doc['citizensName'],'result':doc['result']})
    return ans



def updateHealthEntity(db,_id,docNum):
    doc = db.healthEntity.find_one({'docNum': docNum})
    if(doc != None):
        exams = list(db.healthEntity.find_one({'docNum':docNum})['examsReg'])
        exams.append(_id)
        db.healthEntity.update_one({'docNum':docNum},{'$set': {'examsReg':exams}},upsert = False)
    else:
        db.healthEntity.insert_one({'docNum':docNum,'examsReg':[_id]})


def registerExam(db,docNumCi,docNumHe,citizensName,result,date,time):
    _id = db.exam.insert_one({'docNumCi':docNumCi,'docNumHe':docNumHe,'citizensname':citizensName,'result':result,'date':date,'time':time}).inserted_id
    updateHealthEntity(db,_id,docNumHe)


#------------------------------------Funciones ES---------------------------------------




#------------------------------------Declarar las bases de datos------------------------------------


def makeUsersDB(client):
    db = client['UsersDB']
    col = db['user']
    col.insert_one({'email':'','password':'','username':'','rol':''})

    col = db['citizen']
    col.insert_one({'docNum':'','username':'','names':'', 'lastNames':'',
    'city':'','docType': '',
    'phoneNum':'','neighHood':'','address':'','gender':'','birthdate':'',
    'state':''})

    col = db['administrator']
    col.insert_one({'docType':'','docNum':'','username':'',
    'names':'','lastNames':''
    })

    col = db['healthEntity']
    col.insert_one({
        'docNum':'','username':'','name':'','city':'','docType':'',
        'totalCap':'','totalBeds':'','totalRes':'','totalDocts':'',
        'address':'','neighHood':'','phoneNum':'','state':''
    })

    col = db['establishment']
    col.insert_one({
        'docNum':'','username':'','name':'','city':'','docType':'',
        'totalCap':'', 'address':'','neighHood':'','phoneNum':'',
        'category':'','state':''
    })




def makeParametersDB(client):
    db = client['ParametersDB']

    col = db['category']
    col.insert_one({'name':''
    })

    col = db['documentType']
    col.insert_one({
        'name':''
    })

    col = db['city']
    col.insert_one({
        'name':'', 'departmentId':''

    })


    col = db['department']
    col.insert_one({
        'name':''
    })

    col = db['neighborHood']
    col.insert_one({
        'name':'',
        'city':''

    })

    col = db['quarantine']
    col.insert_one({
        'days':'',
        'state':'' #si o no??
    })




def makeEntryDB(client):
    db = client['EntryDB']

    col = db['establishment']
    col.insert_one({
        'docNum':'',
        'entriesReg':[]
    })
    col = db['entry']
    col.insert_one({
        'docNumCi':'',
        'docNumEs':'',
        'idEs':'', #IdObject del ES
        'idCitizen': '', #idObject del Citizen
        'temperature':'',
        'date':'',
        'time':'',
        'mask':'',
        'ans':'',
        'description':'',
    })

    col = db['citizen']
    col.insert_one({
        'docNum':'',
        'entriesReg':[]
    })




def makeExamsDB(client):
    db = client['ExamsDB']
    col = db['healthEntity']
    col.insert_one({
        'docNum':'',
        'examsReg':[]
    })



    col = db['exam']
    col.insert_one({
        'docNumCi':'',
        'docNumHe':'',
        'citizensName': '',
        'citizensLastNames':'',
        'result':'',
        'date': '',
        'time': ''
    })

    col = db['citizen']
    col.insert_one({
        'docNum':'',
        'entriesReg':[]
    })


#------------------------------------Declarar las bases de datos------------------------------------




def main():
    #print(pymongo.version)
    client = MongoClient(port = 27017)    
    #tester = {'pr':'sasa'}
    #x = col.insert_one(tester)
    #db = client['ParametersDB']
    #db = client['EntryPeDB']
    #db = client['MedExamsDB']
    #makeUsersDB(client)
    #makeParametersDB(client)
    #makeEntryDB(client)
    #makeExamsDB(client)
    db = client.UsersDB
    #db.user.insert_one({'email':'jj','password':'a','username':'b','rol':''})
    #db.citizen.insert_one({'state':'I'})
    #db.healthEntity.insert_one({'state':'A'})
    #db.establishment.insert_one({'state':'I'})
    #db.citizen.delete_one({'state':'I'})
    #db.healthEntity.delete_one({'state':'A'})
    #db.establishment.delete_one({'state':'I'})

    if(not checkRegistration("admin","admin@admini.com",db)):
        registerUser("admin@admini.com","admin","admin","Admin",db)
        registerAdmin(0,"424242","admin","angel","lee",db)

    if(not checkRegistration("miguel22","m@m.com",db)):
        registerUser("m@m.com","admin","miguel22","Citizen",db)
        registerCitizen("1233","miguel22","miguel","adad","dada",0,"21212121","haei","calle 1","masculino","22/06","A",db)

 
    if(not checkRegistration("miguel23","m2@m.com",db)):
        registerUser("m2@m.com","admin","miguel23","Citizen",db)
        registerCitizen("1233","miguel23","miguel2","adad","dada",0,"21111","haei","calle 1","masculino","22/06","A",db)
    
    if(not checkRegistration("clinica1","clinica@m.com",db)):
        registerUser("clinica@m.com","admin","clinica1","ES",db)
        #registerCitizen("1233","miguel23","miguel2","adad","dada",0,"21111","haei","calle 1","masculino","22/06","A",db)
        registerHealthEn("123455","clinica1","medical","bogota",1,34,55,33,44,"ffa","cadd","31111","I",db)
    
    if(not checkRegistration("clinica2","clinic2@m.com",db)):
        registerUser("clinic2@m.com","admin","clinica2","ES",db)
        #registerCitizen("1233","miguel23","miguel2","adad","dada",0,"21111","haei","calle 1","masculino","22/06","A",db)
        registerHealthEn("12345533","clinica2","medical","bogota",1,34,55,33,44,"ffa","cadd","31111","I",db)
    
    if(not checkRegistration("EP1","EP1@m.com",db)):
        registerUser("EP1@m.com","admin","EP1","EP",db)
        registerEstablishment("535353","EP1","Eestab1","cali",1,34,"dada","calle 1","3232323","hola","I",db)
    
    if(not checkRegistration("EP2","EP2@m.com",db)):
        registerUser("EP2@m.com","admin","EP2","EP",db)
        registerEstablishment("535353","EP2","Eestab1","cali",1,34,"dada","calle 1","3232323","hola","I",db)
    
    """
    #print(checkUserCred("b","a",db))
    #print(getInactiveUsers(db))
    #print(getActiveUsers(db))
    print(getAllCitizens(db))
    #for doc in getAllCitizens(db):
    #    printDocument(doc)
    print("\n\n\n")
    print(getAllHealthEn(db))
    print("\n\n\n")
    print(getAllEstablishment(db))
    print("\n\n\n\n\n")
    print(getUsersToActivate(db))
    print(db.list_collection_names())
    """
    r = getUsersToActivate(client.UsersDB,0,2)
    #r = getAllUsers(client.UsersDB,2,3)
    for doc in r:
        printDocument(doc)
    #print(getEntriesByEstablishmentAndCitizen(client.EntryDB,client.UsersDB,"",""))
    #setCitizenState(client.UsersDB,"miguel22","A")
    
    db = client.ParametersDB
    #print(getDeptByCity(db,"Cali"))
    #db.city.drop() 
    #db.department.drop()
    #initializeCountryParams(db,"dataset.csv")
    #print(getCitiesByDept(db,"Antioquia"))
    #print(getEstablishmentByCategory(client.UsersDB,""))
    #print(getEntriesByCategory(client.EntryDB,getEstablishmentByCategory(client.UsersDB,'')))
    
main()
    
