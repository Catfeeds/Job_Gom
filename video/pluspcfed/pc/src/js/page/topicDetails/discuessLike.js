
var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint.js');
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var loginPop = require('module/popup/login');
module.exports = {
    parise: function(data){
        var _this = this;
        data.node.addClass('parising');
        fetch.post(url.get('praise'), {
            data: {
                id: data.id,
                type: 5,
                isPraise: data.isPraise
            }
        }).then(function(result) {
            if(result && result.success && result.code === 200){
                var num = parseInt(data.node.text(),10);
                num = data.isPraise ? (num + 1) : (num - 1);
                var title = data.isPraise ? '取消赞' : '赞';
                data.isPraise ? data.node.addClass('active')&&setTimeout(function(){
                    data.node.addClass('actived').attr('title', title);
                }, 400) : data.node.removeClass('actived').removeClass('active').attr('title', title);
                data.node.html(num + '<span></span>');
            }else if(result && result.code === 409){
                hint.init(result.message);
                data.node.addClass('actived').attr('title', '取消赞');
            }else if( parseInt(result.code) === 881011 ){
                
                _this.login(data);
            }else{
                hint.init(result.message);
            }
            data.node.removeClass('parising');
        }, function(result){
            data.node.removeClass('parising');
            hint.init(result.message);
        });
    },
    login: function(info){
        var _this = this;
        loginPop(function() {
            _this.parise(info);
        })
    },
    bind: function(){
        var _this = this;
        $('body').on('click', '[data-aciton="discuss-like"]', function(){
            var $this = $(this);
            if( $this.hasClass('parising') ){
                return false;
            }
            var info = {
                    id: $this.attr('data-id'),
                    isPraise: Number( !$this.hasClass('actived') ),
                    node: $this
                }
            checkLoginStatus() ?
                _this.parise(info) : 
                _this.login(info);
        });
    },
    init: function(){
        this.bind();
    }
}