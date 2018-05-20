function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

window.alert = function(msg, cb) {
    if (typeof cb !== 'function') {
        cb = function() {};
    }
    msg = String(msg);
    var w = 0;
    var h = 0;
    var left = 0;
    var top = 0;
    var margin = '';
    var tpl = '<div style="min-width: 200px;padding: 40px 20px;margin:0;font:14px/1.7 \'Microsoft YaHei\';color: #333;border: 1px solid #DDD;border-bottom: none;text-align: center;">' + msg + '</div><button style="width: 100%;height: 40px;line-height: 40px;text-align: center;border:1px solid #DDD;border-top-color:#CCC;outline: none;background: #fefefe;cursor: pointer;">确定</button>';
    var wrapCss = 'background:rgba(0,0,0,.1);position:fixed;left:0;top:0;right:0;bottom:0;z-index:99998;cursor:auto;';

    var getBoxCssText = function(left, top, margin) {
        return 'position: fixed;left: ' + left + ';top:' + top + ';margin:' + margin + ';z-index: 99999;box-shadow: 0 0 10px 5px rgba(0,0,0,.3);background:#FFF;overflow: hidden;';
    }

    var wrap = document.createElement('div');
    var dom = document.createElement('div');
    var btn = null;
    wrap.style.cssText = wrapCss;
    dom.style.cssText = getBoxCssText(left, top, margin);
    dom.innerHTML = tpl;
    btn = dom.querySelector('button');
    btn.onclick = function() {
        document.body.removeChild(wrap);
        dom = null;
        wrap = null;
        btn.onclick = null;
        cb();
    }
    document.body.onkeydown = function(event) {
        var e = window.event || event;
        if (e.keyCode == "13") {
            btn.click();
        }
    };
    wrap.appendChild(dom);
    document.body.appendChild(wrap);
    w = dom.clientWidth;
    h = dom.clientHeight;

    left = top = '50%';
    margin = '-' + h / 2 + 'px 0 0 -' + w / 2 + 'px';

    dom.style.cssText = getBoxCssText(left, top, margin);
}

$(function() {
    if ('live' === videoType) {
        var video_box = $('.video-text'),
            text_box = video_box.find('div.text-form'),
            _btn = text_box.find('input.form-btn'),
            _textarea = text_box.find('input.form-text'),
            _tab = video_box.find('div.tab').find('a'),
            _infoArea = $('.text'),
            _talkArea = $('.text-list'),
            _video = $('.video'),
            _sideShow = _video.find('em.icon-open');

        //tab switch
        _tab.on('click', function(ev) {
            _tab.removeClass('active');
            var _anchor = $(ev.target).text();
            $(ev.target).addClass('active');
            if (_anchor == '\u5f39\u5e55') { //弹幕
                _infoArea.hide();
                _talkArea.show();
            } else {
                _infoArea.eq(0).show();
                _talkArea.hide();
            }
        });
        //展开关闭右侧
        _sideShow.on('click', function(ev) {
            var size = parseInt(_video.css('width')),
                danma = $('div.danma');
            if (size == 900) {
                _video.css('width', 1200);
                danma.css('width', 1200);
                _sideShow.eq(1).hide();
                _sideShow.eq(0).show();
                video_box.hide();
            } else {
                _video.css('width', 900);
                danma.css('width', 900);
                _sideShow.eq(0).hide();
                _sideShow.eq(1).show();
                video_box.show();
            }
        });
        // 弹幕
        var DanmaChat = new Chat();
        DanmaChat.init({
            textarea: _textarea,
            talkArea: _talkArea,
            btn: _btn,
            renderTimer: null,
            maxLength: 500,
            duringTime: 30,
            env: window.env,
            host_id: getCookie('host_id'),
            room_id: room_id,
            autoplay: 1,
            danmaku: 1,
            camera: 0,
            danmakuStatus: 1
        });
    }
});

var delCookie = function(name, path, domain) {
    document.cookie = name + "=" +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        "; expires=" + new Date().toUTCString();
};

var delAllCookies = function(domain) {
    var cookies = document.cookie.split(";");
    var cookie;
    for (var i = 0, len = cookies.length; i < len; i++) {
        document.cookie = cookies[i].replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;domain=" + domain);
    }
};

var messageList = [];

function Chat() {}
Chat.prototype.init = function(opt) {
    var that = this;
    if (!opt.room_id) return;
    // video init 参数处理
    this.room_id = opt.room_id;
    this.duringTime = opt.duringTime || 30;
    this.videoContainer = opt.videoContainer || 'videoContainer';
    this.elementID = opt.elementID || 'mxvPlayer';
    this.autoplay = opt.autoplay;
    this.danmaku = opt.danmaku;
    this.env = opt.env || 'dev';
    this.stream = opt.stream || '';
    this.camera = opt.camera;
    this.type = opt.type || 'live';
    this.danmakuStatus = opt.danmakuStatus;
    this.renderTimer = null;
    //v
    var v = new MeixinPlayer();
    v.init(this.room_id, this.videoContainer, {
        elementID: this.elementID,
        autoplay: this.autoplay,
        danmaku: this.danmaku,
        env: this.env,
        stream: this.stream,
        camera: this.camera,
        type: this.type,
        danmakuStatus: this.danmakuStatus
    });
    this.textarea = opt.textarea;
    this.talkArea = opt.talkArea;
    this.btn = opt.btn;
    this.host_id = opt.host_id;
    window.v = v;
    //video 监听事件
    v.on('playerInited', this.initComplete);
    // v.on('openDanmaku', this.openDanma);
    // v.on('closeDanmaku', this.closeDanma);
    //页面初始化 后端调用 获取用户信息 主持人信息
    v.on('needUserInfo', this.needUserInfo);
    //v.on('needEmceeInfo', this.needEmceeInfo);
    //接受flash列表 只接收 不渲染
    v.on('messageReceived', this.receiveMessage);
    //监听发消息结果事件 只返回boolean
    v.on('sendMessageSendResult', this.sendMessageSendResult);
    // 用户账号被其它人在其它地方登录被踢
    v.on('userLoginedByOther', this.userLoginedByOther);

    this.renderList();
    this.renderTimer = setInterval(function() {
        that.renderList();
    }, that.duringTime);

    if ((getCookie('host_name') == '') || (getCookie('host_name') == null)) {
        var host_name = '';
    } else {
        var host_name = getCookie('host_name');
    }
    this.sendDanmaEv();
};
Chat.prototype.initComplete = function() {
    /*window.danma = new Danma();
     danma.init({
     type: 'live',
     wrapper: document.getElementById('videoContainer'),
     element: document.getElementById('mxvPlayer'),
     danmaList: [],
     parser: 'dom'
     });*/
};
Chat.prototype.openDanma = function() {
    $('.danma').show();
};
Chat.prototype.closeDanma = function() {
    $('.danma').hide();
};

Chat.prototype.needUserInfo = function() {
    $.ajax({
        type: "GET",
        url: $GLOBAL_CONFIG['loginStyle'],
        data: { "type": 1 },
        dataType: "jsonp",
        jsonp: 'callback', //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
        sync: false,
        success: function(data) {
            var user = {
                user_id: '',
                nickname: ''
            }
            if(data.loginStatus == 3){
                user.user_id = data.loginId;    // 用户ID
                user.nickname = data.loginName; // 用户昵称
            }
            v.setUserInfo(user);
        },
        error: function(msg) {
            console.log('request error'); //执行错误
        }
    });
};
/*Chat.prototype.needEmceeInfo = function(){
 if((getCookie('host_name') == '') || (getCookie('host_name') == null)){
 var host_name = '';
 }else{
 var host_name = getCookie('host_name');
 }
 var host_id = (getCookie('host_id') == 0) ? '' : getCookie('host_id');
 var emceePackage = {
 emcee_id        : host_id,      //主持人ID
 nickname  : host_name      //主持人昵称
 };
 v.setEmceeInfo(emceePackage);
 };*/
Chat.prototype.receiveMessage = function(type, data) {
    //判断是否有敏感词
    if (!data.isSensitive) {
        messageList.push(data);
        console.log('flash 成功发给 js');
    } else {
        console.log('当前数据有敏感词 被过滤掉');
    }
};
Chat.prototype.sendMessageSendResult = function(b) {
    if (!b) {
        console.error('flash接受弹幕消息error');
        alert('接受信息失败');
    } else {
        console.log('flash监控  ：   发送后端存储成功');
    }
};
Chat.prototype.renderList = function() {
    var arr = messageList;
    var that = this;
    if (!arr.length) {
        return;
    }
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i];
        var regLt = new RegExp('<', 'g');
        var regGt = new RegExp('/>', 'g');
        var content = data.content.content.replace(regLt, '&lt;').replace(regGt, '/&gt;');
        var str = '<li style="font-weight:bold;" data-message_id="' + data.message_id + '" data-room_id="' + data.content.room_id + '" data-sender_id="' + data.content.sender.user_id + '" data-receiver_id="' + data.content.receiver.user_id + '">' +
            '<a style="color:' + data.content.sender.style.color + ';" href="javascript:;">' + data.content.sender.nickname + '：</a><span style="color:' + data.content.style.color + ';">' + content + '</span>' +
            '</li>';
        /*if(that.host_id != getCookie('user_id')){
         //普通格式
         console.log('普通格式');
         var str = '<li data-message_id="'+ data.message_id +'" data-room_id="'+ data.content.room_id +'" data-sender_id="'+ data.content.sender.user_id +'" data-receiver_id="'+ data.content.receiver.user_id +'">'+
         '<a href="javascript:;">'+ data.content.sender.nickname +'：</a><span>'+ data.content.content +'</span>'+
         '</li>';
         }else{
         //主持人
         console.log('主持人');
         var str = '<li style="font-weight:bold;" data-message_id="'+ data.message_id +'" data-room_id="'+ data.content.room_id +'" data-sender_id="'+ data.content.sender.user_id +'" data-receiver_id="'+ data.content.receiver.user_id +'">'+
         '<a style="color:'+ data.content.sender.style.color +';" href="javascript:;">'+ data.content.sender.nickname +'：</a><span style="color:'+ data.content.style.color +';">'+ data.content.content +'</span>'+
         '</li>';
         }*/
        //插到页面里
        if (that.talkArea.find('li').length >= that.maxLength) {
            console.log('超过' + that.maxLength + '条了');
            that.talkArea.find('li:first').remove();
        }
        that.talkArea.find('ul').append(str);
        that.talkArea.scrollTop(that.talkArea[0].scrollHeight);
        //被渲染过 删除当前的
        arr.splice(i, 1);
        i--;
    }
};
Chat.prototype.sendMsg = function() {
    var that = this;
    var _val = this.textarea.val();
    // input value为空 return
    if (!/\S/.test(_val)) {
        console.log('你填的是空格');
        return;
    }

    //判断是否登录
    $.ajax({
        type: "GET",
        url: $GLOBAL_CONFIG['loginStyle'],
        data: { "type": 1 },
        dataType: "jsonp",
        jsonp: 'callback', //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
        sync: false,
        success: function(data) {
            if (data.loginStatus == 3) {
                //发送弹幕给flash
                var sendPackage = that.sendDanmaku(data.loginId, data.loginName);
                v.sendDanmaku(sendPackage);
                that.textarea.val('');
            } else {
                popGomeOnlineLogin(function() {
                    // window.location.reload();
                });
            }
        },
        error: function(msg) {
            console.log('request error'); //执行错误
        }
    });
}

Chat.prototype.sendDanmaku = function(userid, username) {
    var that = this;
    var _val = this.textarea.val();
    var contentColor = (that.host_id == userid) ? '#e90034' : '#ffffff';
    var senderColor = (that.host_id == userid) ? '#e90034' : '#49abd1';
    var sendBulletPackage = {
        'content': _val, //弹幕的内容 
        "room_id": that.room_id, //视频ID 
        "style": { //样式
            "fontSize": "22px", //字体大小 
            "color": contentColor //字体颜色 
        },
        "sender": {
            "user_id": userid, //发送者ID
            "nickname": username, //发送者昵称
            "session_id": getCookie('PHPSESSID') || '', //sessionid
            "style": { //样式
                "fontSize": "22px", //昵称字体大小
                "color": senderColor //昵称字体颜色
            }
        },
        "receiver": {
            "user_id": "", //接收者ID
            "nickname": "", //接收者昵称
            "style": { //样式
                "fontSize": "22px", //昵称字体大小
                "color": "#ffffff", //昵称字体颜色
            }
        }
        /*,
         "type": "2"*/ //代表范围 1代表全站 2代表群聊 3代表私聊
    };
    return sendBulletPackage;
}
Chat.prototype.sendDanmaEv = function() {
    var that = this;
    //点击回车发送消息
    this.textarea.on({
        keyup: function(e) {
            if (e.which === 13) {
                console.log(1);
                e.preventDefault();
                that.sendMsg();
            }
        }
    });
    //点击发送消息
    that.btn.on({
        click: function() {
            that.sendMsg();
        }
    });
};
Chat.prototype.StopRecieve = function(cb) {
    clearInterval(this.renderTimer);
    cb && cb();
};

Chat.prototype.userLoginedByOther = function() {
    // delAllCookies('.gomeplus.com');
    var alertInfo = "你的账号已在其他终端登录，是否重新登录！";
    alert(alertInfo, function() {
        $.ajax({
            type: "GET",
            url: $GLOBAL_CONFIG['loginStyle'],
            data: { "type": 1 },
            dataType: "jsonp",
            jsonp: 'callback', //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
            sync: false,
            success: function(data) {
                var userPackage = {
                    user_id: data.loginStatus == 3 ? data.loginId : '', //用户ID
                    nickname: data.loginStatus == 3 ? data.loginName : '', //用户昵称
                    // session_id: getCookie('PHPSESSID') || '' //sessionid
                };
                v.setUserInfo(userPackage);
            },
            error: function(msg) {
                console.log('request error'); //执行错误
            }
        });
    });

}
