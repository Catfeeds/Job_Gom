//禁止使用的快捷键  目前为加粗，下划线，斜体 ,还原
//禁止的快捷键,后期自行增加
var banKey = [66,73,85,89];
//有回调的快捷键,后期自行增加
var callbackArr = [{'key':90,'callback':ctrl_z}]


//撤销的回调函数
function ctrl_z (){
	var ue = UE.getEditor('editor');
	var txtBefore = ue.getContent();
	
	UE.getEditor('editor').execCommand('undo');
	
	var txtAfter = ue.getContent();
	if(txtBefore !== txtAfter) {
		z();
	}
}

function z(){
	console.log("this it's z callback");
}


module.exports = {
		callbackKey:callbackArr,
		banKey:banKey
		}