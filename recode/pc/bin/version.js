var fs = require("fs");
var env = require("./env");
var path = require("path");

function getStaticVersion(){
	var file = path.resolve(__dirname, "../package.json");
	var packageJson = fs.readFileSync(file, "utf8");

	var packageObj = packageJson && eval("(" + packageJson +")");

	var now = Date.now() + "";
	var version = (+now.slice(0,7) + +now.slice(7));
	if(env.build){
		packageObj.staticVersion = packageObj.staticVersion || {};
		packageObj.staticVersion.images = version;
		packageJson =  packageJson.replace(/(:?staticVersion[^,]+),/m, "staticVersion\": {\n\t\t\"images\": \"" + version + "\"\n\t},");
		fs.writeFileSync(file, packageJson);
	}
	return 	packageObj.staticVersion;
}

module.exports = getStaticVersion;
