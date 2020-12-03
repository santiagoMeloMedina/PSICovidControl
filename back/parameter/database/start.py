
import os
from pymongo import MongoClient
import csv

client = MongoClient(host=os.environ['HOST'],
                     port=int(os.environ['PORT']),
                     username=os.environ['MONGO_INITDB_ROOT_USERNAME'],
                     password=os.environ['MONGO_INITDB_ROOT_PASSWORD'])

def checkDept(database, name):
    return True if database.department.find_one({"name":name}) != None else False

def checkCity(database, name):
    return True if database.city.find_one({"name":name}) != None else False

def getIdDept(database,name):
    return database.department.find_one({"name":name})['_id']

def registerDept(database, name):
    database.department.insert_one({"name":name})

def registerCity(database, name, departmentId):
    database.city.insert_one({"name":name,"departmentId":departmentId})

def initializeCountryParams(database, fileName):
    with open(fileName,encoding="utf8") as file:
        reader,i = csv.reader(file),0
        for row in reader:
            if i > 0:
                fDept,fCity = checkDept(database,row[2]),checkCity(database,row[4])
                if(not fDept and not fCity):
                    registerDept(database,row[2])
                    registerCity(database,row[4],getIdDept(database,row[2]))
                elif(fDept and not fCity):
                    registerCity(database,row[4],getIdDept(database,row[2]))
            i += 1

def make(database):
    # col = database['category']
    # col.insert_one({
    #     'name':''
    # })
    # col = database['documentType']
    # col.insert_one({
    #     'name':''
    # })
    # col = database['city']
    # col.insert_one({
    #     'name':'', 
    #     'departmentId':''
    # })
    # col = database['department']
    # col.insert_one({
    #     'name':''
    # })
    # col = database['neighborHood']
    # col.insert_one({
    #     'name':'',
    #     'cityId':''
    # })
    # col = database['quarantine']
    # col.insert_one({
    #     'days':'',
    #     'state':''
    # })
    initializeCountryParams(database, os.environ['DATA'])

make(client[os.environ['MONGO_INITDB_DATABASE']])