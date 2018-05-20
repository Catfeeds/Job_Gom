var publicPath = '';
var host = '';
var desc = '';
var port = 80; // ¿ª·¢»·¾³:80, ·ÂÕæ:443
var hosts = {
    dev: 'js.dev.meixincdn.com',
    prd: 'js-pre.meixincdn.com'
};
var pathname = '/debug/src/js';

var regString = process.argv.join('');
var publicPath = '';
var host = '';
var desc = '';
var port = 80; // http:80, https:443
var hosts = {
    dev: 'js.dev.meixincdn.com',
    prd: 'js-pre.meixincdn.com',
    online:'js.meixincdn.com'
};
var protoHost='';
var pathname = '';

var regString = process.argv.join('');

//开发
if(regString.indexOf('mx-dev')!= -1){

    host = hosts.dev;
    desc = 'dev: ';
    port = 80;
    pathname = '/CDN8053/';
    protoHost= host;
//仿真
}  else if (regString.indexOf('mx-prd')!= -1) {

    host = hosts.prd;   
    desc = 'prd: ';
    port = 443;
    pathname = '/m/pc/';
    protoHost= 'https://'+ host;
//线上    
}else if(regString.indexOf('mx-online')!= -1){

    host = hosts.online;    
    desc = 'online: ';
    port = 443;
    protoHost= 'https://'+ host;

}


module.exports = {
    host: host,
    port: port,
    protoHost: protoHost
}
if(regString.indexOf('mx-dev')!= -1){

    host = hosts.dev;
    desc = '¡¾¿ª·¢»·¾³¡¿,Çë°ó¶¨: ';
    port = 80;
}  else if (regString.indexOf('mx-prd')!= -1) {
    host = hosts.prd;
	port = 443;
    desc = '¡¾·ÂÕæ¡¿,Çë°ó¶¨: ';
}

publicPath = host + pathname;

module.exports = {
	host: host,
	port: port,
	publicPath: publicPath
}