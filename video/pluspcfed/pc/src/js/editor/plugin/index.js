require('./fonts');
require('./emoji');
if($GLOBAL_CONFIG.useVideo == '1'){
	require('./video');
}


require('./picture');
require('./goods');
require('./link');
//屏蔽快捷键
//require('./metakey');
//删除图片
require('./beforeInput');
//过滤粘贴
require('./grepPaste');
//过滤拖拽
require('./grepDrop');
//修复选中图片
require('./selectImg');
//插入后重新计算高度
require("./autoHeight");
//粘贴上传
require("./autoUpload");
//
require("./linkLayer");
//离开页面提示
//require("./beforeUnload");
