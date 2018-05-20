var alert = require('module/popup/alert');

$("[data-node=tell_buger]").on("click",function(){
	var imgPath = $_CONFIG['imgpath'];
	alert('<div class="sm-download"><img src="'+imgPath+'/images/public/ma1.jpg"><p>描二维码，下载国美+APP查看消息</p></div>');
});