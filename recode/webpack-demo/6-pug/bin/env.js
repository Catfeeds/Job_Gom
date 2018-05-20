var publicPath = '';
var host = '';
var desc = '';
var port = 80; // 开发环境:80, 仿真:443
var hosts = {
    dev: 'js.dev.meixincdn.com',
    prd: 'js-pre.meixincdn.com'
};
var pathname = '/debug/src/js';

var regString = process.argv.join('');

if(regString.indexOf('mx-dev')!= -1){

    host = hosts.dev;
    desc = '【开发环境】,请绑定: ';
    port = 80;
}  else if (regString.indexOf('mx-prd')!= -1) {
    host = hosts.prd;
	port = 443;
    desc = '【仿真】,请绑定: ';
}

publicPath = host + pathname;

module.exports = {
	host: host,
	port: port,
	publicPath: publicPath
}