const md5 = require('./md5.js').MD5;
const timestamp = require('./md5.js').timestamp;
var hashTable = {};
var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;
var stats = [];
var path = require('path');
var basePath = path.join(__dirname, '../dist/');
console.log('basePath', basePath);
hashTable[timestamp] = {};
function getHashFile(basePath){
    fs.readdir(basePath, function(err, files) {
        for (var k = 0 ; k < files.length ; k++) {
            var path = basePath + files[k];
            var isDirectory = fs.statSync(path).isDirectory();   
            if (isDirectory){
                getHashFile(basePath + files[k] +  '/');
            } else {
                var arr = path.split('.');
                if ( arr.length <= 2 ){
                    var newPath = arr[0] + '_' + md5 + '.' + arr[1];
                    fs.renameSync(path, newPath);
                    hashTable[timestamp][path] = newPath;
                } else {
                    var filename = '';
                    var subname = '';
                    for (var i = 1; i < arr.length ; i++){
                        if(i < arr.length - 1) {
                            subname = subname + arr[i] + '.'
                        } else {
                            subname = subname + arr[i]
                        }
                    } 
                    filename = arr[0] + '_' + md5 + '.' +  subname ;

                    fs.renameSync(path, filename);
                    hashTable[timestamp][path] = filename;
                }
            }
            
        }
        var path = require('path');
        fs.writeFileSync( path.join(__dirname, './hashTable.json'), JSON.stringify(hashTable), 'utf8');
    });
}
getHashFile(basePath);