'use strict';

const path = require('path'),
  Promise = require('bluebird'),
  assign = require('lodash.assign');

module.exports = class {
  name() {
    return path.basename(__dirname);
  }

  open(context, options) {
   // console.log(context);
    this.evArray=[];
    this.taskid=options.taskid;
    this.emitter=options.emitter;
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
        this.evArray.push(message);
      }
    }
  }
  close() {
    var that=this;
    return new Promise(function(resolve, reject) {
      that.emitter.emit(that.taskid+'-speed',that.evArray);
      console.log(that.taskid+'evArray has been emitted!');
      resolve(true);
    });
  }
};
