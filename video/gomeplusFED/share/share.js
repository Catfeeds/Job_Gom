var readJSON = require('read-json');
var writeJSON = require('write-json-file');
var program = require('commander');
var log = require('gutil-color-log');

function random(m, n) {
  return Math.random() * (n - m) + m;
}

function drawPeople(json) {
  var peoples = json.peoples;
  if (peoples.length) {
    var randomNumber = Math.floor(random(0, peoples.length));
    var sharePeople = peoples[randomNumber];
    json.peoples.splice(randomNumber, 1);
    json.shared.push(sharePeople);
    writeJSON.sync("./people.json", json);
    log('green', '恭喜 ' + sharePeople + ' 被抽中了！');
  } else {
    log('red', '已经全部抽完！');
  }
}

function clearShared(json) {
  var peoples = json.peoples;
  var shared = json.shared;
  json.peoples = shared.concat(peoples);
  json.shared = [];
  writeJSON.sync("./people.json", json);
  log('red', '抽奖箱已清空！');
}

function setPeopleShared(json, name) {
  var peoples = json.peoples;
  var shared = json.shared;
  var index = peoples.indexOf(name);
  var indexS =shared.indexOf(name);
  if (index >= 0) {
    json.peoples.splice(index, 1);
    json.shared.push(name);
    writeJSON.sync("./people.json", json);
    log('yellow', name + ' 被扔到了抽奖箱！');
  }else if(indexS== -1){
    log('red', name + '不在这个团队里面');
  }else {
    log('red', name + ' 已经被抽中了！');
  }
}
function addPeople(json,name){
  var peoples = json.peoples;
  var shared = json.shared;
  var arr=[...peoples,...shared];
  var index=arr.indexOf(name);
  if(index>=0){
    log('red', name + '已经在这个团队了');
  }else{
    json.peoples.push(name);
    writeJSON.sync("./people.json", json);
    log('green', '欢迎 ' + name + '加入到我们团队');
  }
}
function command(funcname, name) {
  readJSON('./people.json', function(err, json) {
    funcname.call(null, json, name);
  });
}

var myCommand = program.version('0.0.1');

myCommand.command('draw').action(function() {
  command(drawPeople);
});

myCommand.command('clear').action(function() {
  command(clearShared);
});

myCommand.command('set <name>').action(function(name) {
  command(setPeopleShared, name);
});

myCommand.command('add <name>').action(function(name) {
  command(addPeople, name);
});

program.parse(process.argv);