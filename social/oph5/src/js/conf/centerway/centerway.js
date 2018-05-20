define('conf/centerway/centerway.js',function (require,exports,module) {
    require('$');
    var AppInterface = require('utils/appInterface.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax');
    var common = require('mods/common');
    var UI = require('UI/alert');
    var storage = require('mods/storage');
    var base64 = require('utils/base64.js');

    var H5Host = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1];
    // 邀请好友
    var  invitation = H5Host+'/Invite/index';
    //埋点js
	  var params = {};
	  params.url = location.href;
	  params.userid = window.userId || 0;
	  params.cookid = storage.getCookie('PHPSESSID') || 0;
	  AppInterface.call('/common/statistics', {
    	    code: encodeURIComponent('PA0927H01'),
    	    desc: encodeURIComponent(JSON.stringify({
    	      name: '活动首页',
    	      user_id: params.userid,
    	      url: params.url,
    	      cook_id: params.cookid
    	    }))
	  });
    $('li.play').click(function(){
       AppInterface.call('common/tab',{
          tab : 1
       })
        AppInterface.call('/common/statistics', {
          code: encodeURIComponent('BA0927H04'),
          desc: encodeURIComponent(JSON.stringify({
            name: '去逛逛',
            user_id: params.userid,
            url: params.url,
            cook_id: params.cookid
          }))
    });
    });
    $('li.see').click(function(){
         AppInterface.call('/common/MyCoupon')
    });
    $('#tofriend').click(function(){
      location.href=invitation;  
    })
  	// 立即参与
    $('.join').click(function(){
       AppInterface.call('/common/getLoginStatus', function (data) {
              console.log(data);
              if (data.success) {
                  storage.setCookie('userId', data.data.userId);
                  storage.setCookie('token', data.data.token);
                  location.href = H5Host+'/op/followup/fans';
                  // callback();
              } else {
                  AppInterface.call('/common/logout', function (data) {
                      if (data.success) {
                          AppInterface.call('/common/login', function (data) {
                              if (data.success) {
                                  // location.href = H5Host+'/op/followup/fans';
                                  storage.setCookie('userId', data.data.userId);
                                  storage.setCookie('token', data.data.token);
                                   // window.location.reload();
                                  location.href = H5Host+'/op/followup/fans';
                                  // callback();
                             			 }
                          		});
                      		}
                 			 });
              		}
         		 });
    
            AppInterface.call('/common/statistics', {
                code: encodeURIComponent('BA0927H01'),
                desc: encodeURIComponent(JSON.stringify({
                  name: '立即参与',
                  user_id: params.userid,
                  url: params.url,
                  cook_id: params.cookid
                }))
            });
    });		
		// 一键关注
     $('body').on('click','.litimg-btn',function(){
        Ajax.query("/op/followup/attentionfans"
          ,function(data){
          if(data.success){
              $('.mask').css('display','block');
              $('.box-tip').css('display','block');//弹框
               AppInterface.call('/common/statistics', {
                  code: encodeURIComponent('BA0927H02'),
                  desc: encodeURIComponent(JSON.stringify({
                    name: '一键关注页',
                    user_id: params.userid,
                    url: params.url,
                    cook_id: params.cookid
                }))
            });
         
          }else{
            AppInterface.toast(data.message);             
          }
        });


      });  
    
		
});


 

