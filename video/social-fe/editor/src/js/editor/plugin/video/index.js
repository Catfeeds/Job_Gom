/**
 * 插入视频
 * @author Lin Fei
 */

var Pubsub = require('io/pubsub');
var empty = require('module/empty');
var toast = require('module/hint').init;
var alert = require('module/popup/alert');

var pop = require('./pop');

var videoLimitNUm = $EDITOR.GlobalVal.videoLimitNUm || 1;


UE.registerUI('insertvideo', function(editor, uiName) {

    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            var $content = $(editor.body);
            var videoLen = $content.find('[data-node="video"]').length;
            if(videoLen>=videoLimitNUm){
            	alert("您最多可以添加"+ videoLimitNUm + "个视频哦");
            	return;
            }
            pop(editor);
        }
    });

    // 插入后激活光标
    editor.addListener('afterinserthtml', function() {
        editor.focus();
    });


    //创建一个button
    var btn = new UE.ui.Button({
        name: 'insertvideo',
        title: '插入视频',
        label: '',
        iconEle: '<em class="insert-merchant iconn-29"></em>',
        cssRules: '',
        onclick: function() {
            editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}, 0);