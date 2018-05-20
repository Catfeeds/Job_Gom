'use strict';
$(function (){
    var initComplete = function () {
        window.danma = new Danma();
        danma.init({
            type: 'live',
            wrapper: document.getElementById('videoContainer'),
            element: document.getElementById('mxvPlayer'),
            danmaList: [],
            parser: 'dom'
        });
    };
    //danma 开关
    var openDanma = function (type, data) {
        $('.danma').show();
    };

    var closeDanma = function (type, data) {
        $('.danma').hide();
    };

    var v = new MeixinPlayer();
    v.init("104", 'videoContainer', {elementID: 'mxvPlayer', autoplay: 1,danmaku:1, env: 'dist', stream: 'rtmp', camera: 0, type: 'live'});
    //v.on('playerInited', initComplete);
    v.on('openDanmaku', openDanma);
    v.on('closeDanmaku', closeDanma);

    var Flash = {},
    video_box = $('.video-text'),
    text_box = video_box.find('div.text-form'),
    _btn = text_box.find('input.form-btn'),
    _textarea = text_box.find('input.form-text'),
    _tab = video_box.find('div.tab').find('a'),
    _infoArea = $('.text'), _talkArea = $('.text-list'),
    _video = $('.video'),
    _sideShow = _video.find('em.icon-open');

    window.Flash = v;

    Flash.messageList = [], //记录列表
    Flash.renderTimer = null,  //定时器
    Flash.flashObj = document['flashId'] || window['flashId'];  //?何时赋值？
    Flash.maxLength = 500,  //页面最多聊天记录条数
    Flash.duringTime = 30;
    //接受flash列表 只接收 不渲染
    Flash.showDanmaku = function (data){
        Flash.messageList.push(data);
        console.log(':push 了一条数据');
    }
    //页面初始化 后端调用
    Flash.getUserInfo = function (){
        var emcee_id,emcee_nickname;
        $.ajax({
            type: "GET",
            url: URL + '/v2/ext/peapod/video/videoDetailpage',
            data: {
                "pageUniqueId" : room_id
            },
            sync: false,
            dataType: "json",
            success: function (data) {
                emcee_id = data.peas.hostId;
                emcee_nickname = data.peas.item.name;
            }
        });
        var flashPackage = {
            user_id         : getCookie('user_id') || '',        //用户ID 
            user_nickname   : getCookie('user_name') || '',        //用户昵称
            emcee_id        : emcee_id,      //主持人ID
            emcee_nickname  : emcee_nickname      //主持人昵称
        };
        Flash.flashObj.setUserInfo(flashPackage);
    }

    //tab switch
    _tab.on('click', function(ev){
        _tab.removeClass('active');
        var _anchor = $(ev.target).text();
        $(ev.target).addClass('active');
        if(_anchor == '\u5f39\u5e55'){ //弹幕
            _infoArea.hide(); _talkArea.show();
        }else{
            _infoArea.show(); _talkArea.hide();
            //关闭渲染定时器
            clearInterval(Flash.duringTime);
        }
    });
    //展开关闭右侧
    _sideShow.on('click', function(ev){
        var size = parseInt(_video.css('width')), danma = $('div.danma');
        if(size == 900){
            _video.css('width', 1200); danma.css('width', 1200);
            _sideShow.eq(1).hide(); _sideShow.eq(0).show(); video_box.hide();
        }else{
            _video.css('width', 900);  danma.css('width', 900);
            _sideShow.eq(0).hide(); _sideShow.eq(1).show(); video_box.show();
        }
    });

    var userid = getCookie('user_id'), username = getCookie('user_name');

    if(userid && username){
        //开定时器渲染数据到页面
        renderList();
        Flash.renderTimer = setInterval(function (){
            renderList();
        }, Flash.duringTime);
        function renderList(){
            var arr = Flash.messageList;
            if(!arr.length) return;
            for(var  i = 0; i < arr.length; i ++){
                //m_style message样式 s_style 发送人样式 v_style 接收人样式 
                var m_style = formartStyle(data.content.style);
                var s_style = formartStyle(data.content.sender.style);
                //var v_style = formartStyle(data.content.receiver.style);
                var str =   '<li data-message_id="'+ data.message_id +'" data-room_id="'+ data.content.room_id +'" data-sender_id="'+ data.sender.user_id +'" data-receiver_id="'+ data.receiver.user_id +'">'+
                                '<a style="'+ s_style +'" href="javascript:;">'+ data.sender.nickname +'：</a><span style="'+ m_style +'">'+ data.content.content +'</span>'+
                            '</li>';
                /*var str =   '<li data-message_id="'+ data.message_id +'" data-room_id="'+ data.content.room_id +'" data-sender_id="'+ data.sender.user_id +'" data-receiver_id="'+ data.receiver.user_id +'">'+
                                '<a href="javascript:;">'+ data.sender.nickname +'：</a><span>'+ data.content.content +'</span>'+
                            '</li>';*/
                //插到页面里
                if(_talkArea.find('li').length >= Flash.maxLength){
                    _talkArea.find.('li:first').remove();
                }
                _talkArea.append(str);
                _talkArea.scrollTop(_talkArea[0].scrollHeight);
                //被渲染过 删除当前的
                arr.splice(i, 1);
                i--;
            }
        }
        //点击回车发送消息
        _textarea.on({
            keypress: function(e){
                if (e.which === 13) {
                    e.preventDefault();
                    sendMsg();
                }
            }
        });
    }
    //判断是否登录 未登录去登陆 登录了发消息
    function sendMsg(){
        var _val = _textarea.val();
        // input value为空 return
        if(!/\S/.test(_val)) return;

        if(getCookie('user_id') == null){
            //未登录 去登录
            $.ajax({
                type: "GET",
                url: '/Login/setContentTag',
                data: {},
                sync: false,
                dataType: "json",
                success: function (data) {}
            });
            var loginPopup = login({
                onLogin: function () {
                    window.location.reload();
                }
            });
            return;
        }else{
            //发送弹幕给flash
            Flash.flashObj.sendDanmaku();
            //立刻显示到聊天室
            //_talkArea.append('<li><a style="" href="javascript:;">'+ user_name +'：</a><span style="">'+ _val +'</span></li>');
            _textarea.val('');
        }
        //发弹幕方法
        function sendDanmaku(){
            var sendBulletPackage = {
                'content':  _val, //弹幕的内容 
                "room_id":  room_id, //视频ID 
                "style":    { //样式
                                "font-size": "22px", //字体大小 
                                "color": "#fff" //字体颜色 
                            },
                "sender": {
                            "user_id": userid, //发送者ID
                            "nickname": username, //发送者昵称
                            "style":    { //样式
                                            "font-size": "22px", //昵称字体大小
                                            "color": "#fff" //昵称字体颜色
                                        }
                            },
                "receiver": {
                            "user_id": "", //接收者ID
                            "nickname": "", //接收者昵称
                            "style":    { //样式
                                            "font-size": "22px", //昵称字体大小
                                            "color": "#fff", //昵称字体颜色
                                        }
                            },
                "type": "2" //代表范围 1代表全站 2代表群聊 3代表私聊
            };
            return sendBulletPackage;
        }
    }
    //点击发送消息
    _btn.on({
        click: function(){
            sendMsg();
        }
    });
   
});

/*
 *formartStyle 工具函数 格式化样式
 * param json type->object  json={'font-size' : '20px', 'color' : 'red'}
 * return type->string 'font-size:20px;color:red';
 */
function formartStyle(json){
    if(!json)return '';
    var arr = [];
    for(var name in json){
        arr.push(name + ':' + json[name] + ';');
    }
    return arr.join('');
}
var URL = getLocationUrl();
function getLocationUrl(){
    return location.host + location.port;
};


/*
    q1 :     flashObj什么时候能获取到?
    q2 ：    user_id  getCookie('user_id')? 
             user_name  getCookie('user_name')?
             主持人id name?  getCookie()? 
             视频id   getCookie('room_id')?  <?php echo $program->getProgramId(); ?>"
             接收人id name?
             3种 style 怎么传给后台?

             //http://gitlab.intra.gomeplus.com/video/hatchet/blob/master/application/views/pvideo/live.php
*/