let path = require("path");
let fs = require("fs");

function getEntry(dir){
  let entry = {};
  let files = fs.readdirSync(dir);
  files.forEach(function(file){
    let jsPath = path.resolve(dir, file, "js/page");
    let jsFiles = fs.readdirSync(jsPath);
    jsFiles.forEach(function(jsFile){
      jsFile = jsFile.replace(/(\..+)/, "");
      jsPath = jsPath.replace(/(\..+)/, "");
      entry[file + "/js/" + jsFile] = jsPath;
    })
  })
  return entry;
}
module.exports = getEntry;