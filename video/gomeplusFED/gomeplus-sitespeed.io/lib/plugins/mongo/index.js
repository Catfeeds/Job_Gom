'use strict';

const path = require('path'),
  Promise = require('bluebird'),
  assign = require('lodash.assign'),
  MongoClient = require('mongodb').MongoClient;

module.exports = class {
  name() {
    return path.basename(__dirname);
  }

  open(context, options) {
   // console.log(context);
    this.dbArray=[];
    this.dburl=options.mongo.dburl;
    this.coll=options.mongo.coll;
    this.taskid=options.taskid;
  }

  processMessage(message) {

   switch (message.type) {
      case 'url':
      {
       this.pageurl=message.url;
       break;
      }

      case 'error':
      {
        console.log('error');
        break;
      }
      case 'browsertime.run':
      case 'browsertime.pageSummary':
      case 'browsertime.har':
      case 'browsertime.screenshot':
      case 'webpagetest.run':
      case 'webpagetest.pageSummary':
      case 'gpsi.data':
      case 'gpsi.pageSummary':
      case 'pagexray.run':
      case 'pagexray.pageSummary':
      case 'coach.run':
      case 'coach.pageSummary':
      case 'assets.aggregate':
      case 'domains.summary':
      case 'webpagetest.summary':
      case 'coach.summary':
      case 'pagexray.summary':
      case 'browsertime.summary':
      {
        this.dbArray.push(assign({},message,{
          url:this.pageurl,
          data:message.data,
          taskid:this.taskid
        }));
      }
    }
  }
  close() {
    var that=this;
    return new Promise(function(resolve, reject) {
      if (that.dbArray.length > 0) {
        MongoClient.connect(that.dburl, function(err, db) {
          console.log("Connected correctly to server.");
          db.collection(that.coll).insert(that.dbArray, function(err, result) {
            if(err){
              reject(err);
            }
            db.close();
            resolve(true);
            console.log("Inserted documents into collection.");
          });
        });
      } else {
        resolve(true);
      }
    });
  }
};
