var code = require('./code');
var reports = require('./reports');

code.init();
reports.init();
$('.list-title a').eq(0).addClass('active');