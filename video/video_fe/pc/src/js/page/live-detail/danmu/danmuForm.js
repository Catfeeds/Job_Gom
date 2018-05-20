import fetch from 'io/fetch';
import EventEmitter from 'util/event-bus';
import toast from 'components/toast';
import Emoticons from './emoticons.js';
import emojiData from './emojiData.js';
import {loginFlag, page} from 'util/phpCommon';
import {login, logout} from 'common/commonLogin.js';
// import yantextData from './yantextData.js';

class DanmuForm extends EventEmitter{
    constructor(opts = {}) {
        super();

        this.$playerbox = $('[data-node=playerbox]');
        this.$danmubox = this.$playerbox.find('[data-node=danmubox]');
        this.$danmuform = this.$playerbox.find('[data-node=danmuform]');
        this.$toggle = this.$playerbox.find('[data-node=toggle]');
        this.$player = $('#mxplayer');

        this.$input = $('[data-node=danmuContent]');
        this.$submit = $('[data-action=submit]');
        this.$textnum = $('[data-node=textnum]');
        this.$curnum = this.$textnum.find('span').eq(0);
        this.textnum = 0;
        this.maxnum = 40;
        this.opts = opts;
        this.disabled = false;
    }
    destroy(){
        this.disabled = true;

        this.$danmuform.remove();
        this.$danmubox.remove();
        this.$toggle.remove();
        this.$player.width('1200px');
        this.$player.height('562px');
    }
    init(player) {

        if (this.disabled) {
            return false;
        }

        var $input = this.$input;
        var emoji = Emoticons();
        var inputLock = false;

        emoji.on('selected', (data) => {
            this.addEmoticons(data);
        });
        
        this.on('send', (msg) => {
            player.send(msg);
        });

        $input.on({
            'keyup':(e) => {
                if (e.which === 13) {
                    this.send(e.currentTarget.value);
                }
                return false;
            },
            'compositionstart': () => {
                inputLock = true;
            },
            'compositionend': () => {
                inputLock = false;
                $input.trigger('input');
            },
            'input': () => {
                inputLock || this.checkTextLength();
            }
        });

        this.$submit.on('click', () => {
            this.send($input.val());
            // return false;
        });
        this.inited();
    }
    inited(){
        this.$input.prop('readonly',false);
        let beforeMsg = window.localStorage.getItem('beforeMsg');
        if (beforeMsg !== null && $CONFIG.userId != 0) {
            this.$input.val(beforeMsg).trigger('input');
        }
        window.localStorage.removeItem('beforeMsg');
    }
    checkTextLength(){
        let _this = this;
        let txts = this.$input.val().trim();
        const maxLen = this.maxnum;
        let reg = /\[[^\[]+\]/g;
        let txtsArr = txts.split(reg) || [];
        let faceArr = txts.match(reg) || [];

        let newTxts = '';
        let strLen = 0;

        function textJoin(t){
            let tempStr = '';
            let len = 0,code = 0;
            let tLen = t.length;

            for(let i = 0; i<tLen; i++){
                code = t.charCodeAt(i);

                if (code >= 0 && code < 128) {
                    if (strLen + len >= maxLen) {
                        break;
                    }
                    len +=0.5;
                }else{
                    if (Math.ceil(strLen + len) >= maxLen) {
                        break;
                    }
                    len +=1;
                }

                tempStr += t[i];
            }

            return {
                str: tempStr,
                len: len
            };
        }

        txtsArr.forEach((v) => {
            let face = faceArr.shift();
            let txts = textJoin(v);
            strLen += txts.len;
            newTxts += txts.str;

            if (face && strLen <= maxLen - 1) {
                if (typeof emojiData[face] !== 'undefined') {
                    strLen += 1;
                    newTxts += face;
                }else{
                    // 偽表情，當做文本處理
                    txts = textJoin(face);
                    strLen += txts.len;
                    newTxts += txts.str;
                }
            }
            
        });

        let newStrLen = Math.ceil(strLen);
        // let newStrLen = strLen;

        if (newStrLen >= maxLen) {
            this.$input.val(newTxts);
        }

        this.textnum = newStrLen;

        this.changeTextNumStatus();
    }
    changeTextNumStatus(){
        if (this.textnum > 0) {
            this.$curnum.css('color','#FFF');
        }else{
            this.$curnum.css('color','');
        }
        this.$curnum.text(this.textnum);
    }
    addEmoticons(data){
        const maxLen = this.maxnum;
        function insertText(obj,str) {
            obj.focus();
            if (document.selection) {
                var sel = document.selection.createRange();
                sel.text = str;
            } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    cursorPos = startPos,
                    tmpStr = obj.value;
                obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
                cursorPos += str.length;
                obj.selectionStart = obj.selectionEnd = cursorPos;
            } else {
                obj.value += str;
            }
        }

        function calcEmojiLen(txt){
            let txtLen = txt.length;
            let len = 0,code = 0;
            for(let i=0;i<len;i++){
                code = txt.charCodeAt(i);
                if (code >= 0 && code < 128) {
                    len +=0.5;
                }else{
                    len +=1;
                }
            }
            return Math.ceil(len);
        }

        let strLen = data.type === 'emoji' ? 1 : calcEmojiLen(data.name);

        let afterLen = parseInt(this.textnum) + strLen;

        if (afterLen > maxLen) {
            return false;
        }

        insertText(this.$input[0], data.name);
        this.$input.trigger('input');
    }
    adaptationData(text){
        let txts = text.trim();
        let reg = /\[[^\[]+\]/g;
        let txtsArr = txts.split(reg) || [];
        let faceArr = txts.match(reg) || [];
        let content = [];

        txtsArr.forEach((v) => {
            let face = faceArr.shift();

            v !== '' && content.push( {font: v} );
            
            if (typeof face !== 'undefined') {
                if (typeof emojiData[face] !== 'undefined') {
                    content.push( {image: face} );
                }else{
                    content.push( {font: face} );
                }
            }
        });
        return content;
    }
    saveMsgBeforLogin(val){
        if (val.trim() !== '') {
            window.localStorage.setItem('beforeMsg',val);
        }
    }
    send(val) {
        if(!loginFlag){
            this.saveMsgBeforLogin(val);
            login();
        } else {
            if (!$.trim(val)) {
                let submitOffset = this.$submit.offset();
                toast({
                    msg:'发送内容不能为空哦',
                    x:submitOffset.left - 100,
                    y:submitOffset.top + 50,
                });
                return;
            }
            var data = {
                id: page.userId,
                name: page.nickName
            };
            // val = this.adaptationData(val);
            this.emit('send', this.buildData(val, data));
            this.$input.val('');
            this.textnum = 0;
            this.changeTextNumStatus();
        }
        
    }
    buildData(content, data) {
        var opts = this.opts;
        var userid = data.id;

        var contentColor = '#ffffff';
        var senderColor = '#49abd1';
        if (opts.host_id === userid) {
            contentColor = senderColor = '#e90034';
        }
        return {
            content: content, //弹幕的内容 
            room_id: opts.videoId, //视频ID 
            style: { //样式
                fontSize: '22px', //字体大小 
                color: contentColor //字体颜色 
            },
            sender: {
                user_id: userid, //发送者ID
                nickname: data.name, //发送者昵称
                // 'session_id': getCookie('PHPSESSID') || '', //sessionid
                style: {
                    fontSize: '22px', //昵称字体大小
                    color: senderColor //昵称字体颜色
                }
            },
            receiver: {
                user_id: '', //接收者ID
                nickname: '', //接收者昵称
                style: {
                    fontSize: '22px', //昵称字体大小
                    color: '#ffffff', //昵称字体颜色
                }
            }
            /*,
             "type": "2"*/ //代表范围 1代表全站 2代表群聊 3代表私聊
        };

    }
}

var instance;

export default (opts) => {
	if(!instance){
		instance = new DanmuForm(opts);
	}
	return instance;
};
