#!/bin/bash

mongo -u admin -p admin --eval "\
    db = db.getSiblingDB('UserDB'); \
    db.createCollection('user'); \
    db.createCollection('citizen'); \
    db.createCollection('administrator'); \
    db.createCollection('healthEntity'); \
    db.createCollection('establishment'); \
    db.user.insert({'email':'crack@gmail.com','password':'crack','username':'crack','rol':'Admin'}); \
    db.administrator.insert({'docType':'CC','docNum':12341341,'username':'crack','name':'Crack','lastname':'Cracked'});"