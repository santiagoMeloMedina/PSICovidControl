from sys import stdin
from pymongo import MongoClient
from pprint import pprint
import os
import random
from datetime import datetime
import time
import pymongo

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
        'state':''
    })




def makeEntryDB(client):
    db = client['EntryDB']

    col = db['establishment']
    col.insert_one({
        'docNum':'',
        'entriesReg':[]
    })
    col = db['entries']
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





    



def main():
    #print(pymongo.version)
    client = MongoClient(port = 27017)    
    #tester = {'pr':'sasa'}
    #x = col.insert_one(tester)
    #db = client['ParametersDB']
    #db = client['EntryPeDB']
    #db = client['MedExamsDB']
    makeUsersDB(client)
    makeParametersDB(client)
    makeEntryDB(client)
    makeExamsDB(client)

    print(client.list_database_names())
main()
    