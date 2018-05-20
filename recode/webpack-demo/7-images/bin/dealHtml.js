var fs = require('fs');
var path = require('path')
var paths = require('./paths')

var HtmlWebpackPlugin = require('html-webpack-plugin');  //´¦Àípug

function dealHtml(obj){
	
	var pugDir = fs.readdirSync(paths.pug); //pugÄ¿Â¼ÏÂµÄÎÄ¼þ£¬Ò²ÓÐ¿ÉÄÜÎªÄ¿Â¼
		
	pugDir.forEach(function(dir,index,arr){	//dir ÎÄ¼þ¼Ð
		_dir = path.join(paths.pug,dir)
		var pugs = fs.readdirSync(_dir);	//htmls ÎÄ¼þ¼ÐÏÂµÄpugÎÄ¼þ¼¯ºÏ
		
		pugs.forEach(function(file){	//Ã¿Ò»¸öÎÄ¼þ\
		
		var _file = file.replace(/pug$/,'html');

			var temp =  new HtmlWebpackPlugin({
				filename: paths.dist+'/html/'+ dir + '/'+_file,
				template:path.join(_dir,file),
				inject:false
			  
			})	
			
			obj.push(temp);
			
		})
	})
}

module.exports = dealHtml;