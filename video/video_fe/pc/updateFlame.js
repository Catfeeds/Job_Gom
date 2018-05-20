/**
 *
 Created by zhangzhao on 2017/3/24.
 Email: zhangzhao@gomeplus.com
 */
var http = require('http');
var callfile = require('child_process');

//Lets define a port we want to listen to
const PORT=8088;

//We need a function which handles requests and send response
function handleRequest(request, response){
    callfile.exec('cd /gomeo2o/www/news-dyc/flame && git pull', function(err){
        if (err) {
            response.end('flame更新失败！请重试，或去10.125.192.114的/gomeo2o/www/news-dyc/flame手动更新');
        }
        response.end('flame更新成功');
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});