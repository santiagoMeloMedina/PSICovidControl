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
        ans.append(str(doc['_id']))
    for doc in q2:
        ans.append(str(doc['_id']))
    for doc in q3:
        ans.append(str(doc['_id']))
    return ans


def getUsersToActivate(db):
    ans = list()
    q1,q2 = db.healthEntity.find({'state':'I'}),db.establishment.find({'state':'I'})
    for doc in q1:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes']})
    for doc in q2:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return ans



def getActiveUsers(db):
    ans = list()
    q1,q2,q3 = db.citizen.find({'state':'A'}),db.healthEntity.find({'state':'A'}),db.establishment.find({'state':'A'})
    for doc in q1:
        ans.append(str(doc['_id']))
    for doc in q2:
        ans.append(str(doc['_id']))
    for doc in q3:
        ans.append(str(doc['_id']))
    return ans


def getAllCitizens(db):
    ans,q = list(),db.citizen.find({})
    for doc in q:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'names':doc['names'],'lastNames':doc['lastNames'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'gender':doc['gender'],'state':doc['state']})
    return ans  


def getAllHealthEn(db):
    ans,q = list(),db.healthEntity.find({})
    for doc in q:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalDocts':doc['totalDocts'],'totalCap':doc['totalCap'],
        'totalRes':doc['totalRes']})
    return ans     



def getAllEstablishment(db):
    ans,q = list(),db.establishment.find({})
    for doc in q:
        ans.append({'docNum':doc['docNum'],'username':doc['username'],'name':doc['name'],
        'city':doc['city'],'phoneNum':doc['phoneNum'],'neighHood':doc['neighHood'],'address':doc['address'],
        'state':doc['state'],'totalCap':doc['totalCap'],'category':doc['category']})
    return ans


def getAllUsers(db):
    return getAllCitizens(db)+getAllHealthEn(db)+getAllEstablishment(db)

    
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
    q,ans = db.entries.find({}),list()
    for doc in q:
        ans.append({'docNumCi':doc['docNumCi'],'docNumEs':doc['docNumEs'],'temperature':doc['temperature'],
        'date':doc['date'],'time':doc['time'],'mask':doc['mask'],'ans':doc['ans'],'description':doc['description']})
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


def registerQuarantine(db,days):
    db.quarantine.drop()
    db.quarantine.insert_one({'days':days})



def setCitizenState(db,username,newState):#Revisar!!
    db.citizen.update_one({'username':username},{'$set':{'state':newState}},upsert = False)

def setHealthEnState(db,username,newState):#Revisar!!
    db.healthEntity.update_one({'username':username},{'$set':{'state':newState}},upsert = False)


def setEstablishmentState(db,username,newState):#Revisar!!
    db.establishment.update_one({'username':username},{'$set':{'state':newState}},upsert = False)



#------------------------------------Funciones administrador---------------------------------------



#------------------------------------Funciones ciudadano---------------------------------------
#TODO


#------------------------------------Funciones ciudadano---------------------------------------



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
        'name':'', 'dep':''

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
        'temperature':'',
        'date':'',
        'time':'',
        'mask':'',
        'ans':'',
        'description':''
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
        'result':''
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
   
    db = client.ParametersDB
    #db.city.drop()
    #db.department.drop()
    #initializeCountryParams(db,"dataset.csv")
    print(getCitiesByDept(db,"Antioquia"))
    
main()
    
