#!/bin/bash

mongo -u admin -p admin --eval "\
    db = db.getSiblingDB('UserDB'); \
    db.createCollection('user'); \
    db.createCollection('citizen'); \
    db.createCollection('administrator'); \
    db.createCollection('healthEntity'); \
    db.createCollection('establishment'); \
    db.user.insert({'email':'crack@gmail.com','password':'crack','username':'crack','rol':'Admin'}); \
    db.citizen.insert({'docNum':'','username':'','names':'', 'lastNames':'','city':'','docType': '','phoneNum':'','neighHood':'','address':'','gender':'','birthdate':'','state':''}); \
    db.administrator.insert({'docType':'','docNum':'','username':'','names':'','lastNames':''}); \
    db.healthEntity.insert({'docNum':'','username':'','name':'','city':'','docType':'','totalCap':'','totalBeds':'','totalRes':'','totalDocts':'','address':'','neighHood':'','phoneNum':'','state':''}); \
    db.establishment.insert({'docNum':'','username':'','name':'','city':'','docType':'','totalCap':'', 'address':'','neighHood':'','phoneNum':'','category':'','state':''}); "