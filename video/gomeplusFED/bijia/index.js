var superagent = require("superagent");
var request = require('request');
var cheerio = require("cheerio");
var host = 'http://www.huihui.cn';
var api = host + '/search?q=';

function getPrice(key, price, cb) {
  superagent.get(api + encodeURIComponent(key)).end(function(err, res) {
    var data = [];
    var $ = cheerio.load(res.text);
    var items = $('#scList li');
    for (var i = 0; i < items.length; i++) {
      var obj = {};
      obj.title = items.eq(i).find('h2 .js-log').text().replace(/\r\n/g, '').trim();
      obj.url = host + items.eq(i).find('h2 .js-log').attr('href');
      obj.imgsource = items.eq(i).find('a.js-log img').attr('src');
      obj.imgurl = '/img?source='+encodeURIComponent(obj.imgsource);
      obj.price = items.eq(i).find('.scrow-price .js-log').text();
      obj.from = items.eq(i).find('.scrow-seller a').text();
      if (obj.title) {
        data.push(obj);
      }
    }
    cb(key, price, data);
  });
}

function getUrlKey(url, cb) {
  superagent.get(url).end(function(err, res) {
    var $ = cheerio.load(res.text);
    var key = $('h3.detail-data-tl').text();
    var price = $('[data-node=price]').text();
    getPrice(key, price, cb);
  });
}
/*
getUrlKey('https://m.gomeplus.com/item/5633-721457.html', function(key, price, data) {
  console.log(key, price, data);
});
*/
var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.get('/img', function(req, res) {
    var source = decodeURIComponent(req.query.source);
    //console.log(source);
    request.get(source).pipe(res);
});
app.get('/', function(req, res) {
  var key = req.query.key;
  var mxurl = req.query.mxurl;
  console.log(mxurl);
  if (mxurl) {
    getUrlKey(mxurl, function(name, price, data) {
      var msg = "美信价格相对便宜";
      //console.log(data);
      var flag = data.some(function(item){
        var f = parseFloat(item.price) < price;
        return f;
      });
      //console.log(flag);
      if(flag){
        msg = "美信价格相对较贵"; 
      }
      res.render('index', {
        key: key,
        msg:msg,
        mxurl: mxurl,
        name:name,
        price:price,
        data:data
      });
    });
  } else {
    res.render('index', {
      key: key,
      name:false,
      mxurl: mxurl
    });
  }
});

app.listen(3000);
console.log('app listen 3000');
