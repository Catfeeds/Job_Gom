var fs = require('fs');
var path = require('path')
var paths = require('./paths')

var HtmlWebpackPlugin = require('html-webpack-plugin');  //处理pug

function dealHtml(obj){
	
	var pugDir = fs.readdirSync(paths.pug); //pug目录下的文件，也有可能为目录
		
	pugDir.forEach(function(dir,index,arr){	//dir 文件夹
		_dir = path.join(paths.pug,dir)
		var pugs = fs.readdirSync(_dir);	//htmls 文件夹下的pug文件集合
		
		pugs.forEach(function(file){	//每一个文件\
		
		var _file = file.replace(/pug$/,'html');

			var temp =  new HtmlWebpackPlugin({
				filename: '/html/'+ dir + '/'+_file,
				template:path.join(_dir,file),
				inject:false
			  
			})	
			
			obj.push(temp);
			
		})
	})
}

module.exports = dealHtml;