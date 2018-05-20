/*   使用示例  初始化已经集成至init.js
var ue = UE.getEditor('editor',{
		toolbars:[[]]
	});
*/
var ueditor = require("editor/index");
//var editorOpt = require("editor/pcInit");

var test = require("./test");

var ue = ueditor();

test.init(ue);