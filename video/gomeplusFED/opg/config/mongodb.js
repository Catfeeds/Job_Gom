/**
 * Created by lishengyong on 2016/12/30.
 */


var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://10.125.192.146:27017/builderUP';

MongoClient.connect(url, function (err, db) {
    assert.equal(null , err);
    console.log("Connected successfully to server");
    db.close();
})




