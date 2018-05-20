let fs          = require("fs");
let path        = require("path");
let dns       	= require("dns");
let url       	= require("url");
let httpProxy 	= require("http-proxy");
let proxy     	= httpProxy.createProxyServer({});
let fileType  	= require("./fileType");

module.exports = function(req, res, fallbackFile){
  let host = req.headers.host.split(":")[0];
  let urlPath = url.parse(req.url).pathname;
	let realPath = path.join(__dirname, "../", urlPath.replace(/^\/(m\/pc\/dist|CDN\d+\/dist|CDN\d+\/debug|m\/uba-sdk|m\/UBA-SDK\/dist)/, "/debug"));
	if(fs.existsSync(realPath)){
		let ext = path.extname(realPath);
    ext = ext ? ext.split(".")[1] : "txt";
		fs.readFile(realPath, function(err, file){
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader('Content-Type', fileType[ext]);
      res.write(file);
      res.end();
    });
	}else{
		dns.resolve4(host, function(err, addresses) {
      if(err){
        return console.log(err)
      }
      if(addresses && addresses[0] !== "127.0.0.1"){
        proxy.web(req, res, {target: "http://"+ addresses[0]});
      }else{
      	let html = '<div style="padding:30px 0 10px;border-bottom:1px solid #000;text-align:center;font-size:22px;font-weight:bold;">404 Not Found</div>'+
         '<div style="padding-top:10px;text-align:center;font-size:18px;">node/'+ process.version.slice(1) +'</div>'
		    res.writeHead("404",{
		      'Content-Type': "text/html",
		      'Server': 'node/' + process.version.slice(1)
		    });
		    res.write(html);
				res.end();
      }
    });
	}
}
