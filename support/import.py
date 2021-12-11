import pymongo
import json
from pymongo import MongoClient, InsertOne
import certifi

#client = pymongo.MongoClient('mongodb+srv://mongo_user:mung??@cluster0.uqixe.mongodb.net/bibledb?retryWrites=true&w=majority', tlsCAFile=certifi.where())
db = client.bibledb
collection = db.books
requesting = []

with open(r"kjv.json") as f:
    for jsonObj in f:
        myDict = json.loads(jsonObj)
        requesting.append(InsertOne(myDict))

result = collection.bulk_write(requesting)
client.close()