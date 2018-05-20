define('conf/valentine/valentine.js',function(require,exports,module) {
    require('$');
    var ajax = require('utils/ajax');
    var common = require('mods/common');
    var UI = require('UI/alert');
    var base64 = require('utils/base64.js');
    BP.send({event_id:'P804W001',url:ShareUrl,name:'活动页面',cook_id:'',user_id:userId});
    // 查看礼物
    $('.findGift ').on('click',function(){
        BP.send({event_id:'B804W001',url:ShareUrl,name:'查看礼物和悄悄话',cook_id:'',user_id:userId});
        $('.maskShow').addClass('mask');
        $('.useRegist').show();
        //未登录,先注销再调登录
        if(userId==0){  
           $('.useRegist a').attr('href','/login/index?redirect='+base64.encode(ShareUrl)+'&onlineUserId='+onLineUserid);      
        }
    });
    // 跳转注册
    // $('.useRegist a').on('click',function(){
    //     BP.send({event_id:'B804W002',url:ShareUrl,name:'立即注册',cook_id:'',user_id:userId});
    //     $('.useRegist a').attr('href','/regist/index?redirect='+base64.encode(ShareUrl)+'&onlineUserId='+onLineUserid);
    // })
    // 我也要送礼物
    $('.giveGif').on('click',function(){
        BP.send({event_id:'B804W004',url:ShareUrl,name:'我也要送礼',cook_id:'',user_id:userId});
        $('.giveGif').attr('href',SendUrl);
    })
    // 成功页我也要送礼
    $('.giveGift').on('click',function(){
        BP.send({event_id:'B804W006',url:ShareUrl,name:'我也要送礼',cook_id:'',user_id:userId});
        $('.giveGift').attr('href',SendUrl);
    })
    // 成功页嗮礼品
    $('.shareGift').on('click',function(){
        BP.send({event_id:'B804W007',url:ShareUrl,name:'晒礼物，赢奖品',cook_id:'',user_id:userId});
        location.assign(WAP_DOMAIN +'/state/appdownload');
        
    })
    $('.useRegist,.maskShow').on('click',function(){
        $('.maskShow').removeClass('mask');
        $('.useRegist').hide();
    });
    function sleepAddressSelect(){
        addressSelect.attr('disabled','disabled');
        setTimeout(function(){
            addressSelect.removeAttr('disabled');
        },300);
    }
    // 填写收货地址
    var search = location.search.substr(1),isName = false,isPhone = false,phoneErrType = 1,isAddrDetail = false,doc=window.document;
    $('.useAddress').on('click',function(){
        BP.send({event_id:'B804W003',url:ShareUrl,name:'填写收货地址',cook_id:'',user_id:userId});
        $('.fromGift').css('display','none');
        $('#addressList').css('display','block');
    })

    var addressSelect = $("#addressSelect");
    $("#username").on('blur',function(){
        checkUserName();
        if(!isName){
            UI.alerter("请输入10个以内字符哟");
            return false;
        }
    });

    $('#address,#mobile').on('focus',function(){
        doc.body.scrollTop='60';
    });

    $('#mobile').on('keyup',function(){
        var phone = common.trimVal('mobile');
        var first = phone.slice(0,1);
        if(first === '0'){
            if(!/^0[0-9]{10,11}$/.test(phone)){
                isPhone = false;
                phoneErrType = 1;
            }else{
                isPhone = true;
            }
        }else if(first === '1'){
            if(!/^1[3-9][0-9]{9}$/.test(phone)){
                isPhone = false;
                phoneErrType = 2;
            }else{
                isPhone = true;
            }
        }else{
            isPhone = false;
            phoneErrType = 3;
        }
    });
    $('#mobile').on('blur',function(){
        sleepAddressSelect();
        checkPhone();
    });
    function checkPhone(){
        if(!isPhone){
            switch(phoneErrType){
                case 1: UI.alerter('电话号输入错误');break;
                case 2: UI.alerter('手机号输入错误');break;
                case 3: UI.alerter('请重新输入电话号码');break;
            }
            return false;
        }
        return true;
    }
    $('#address').on('keyup',function(){
        checkAddressDetail();
    });
    $('#address').on('blur',function(){
        sleepAddressSelect();
        checkAddressDetail();
        if(!isAddrDetail){
            UI.alerter('请输入50个以内字符哟');
            return false;
        }
    });
    //校验用户名规则
    function checkUserName(){
        var userName = common.trimVal('username');
        if(!/^[a-zA-Z0-9\u4E00-\u9FA5]*$/.test(userName) || common.getByteLen(userName) < 2 || common.getByteLen(userName) > 10){
            isName = false;
        }else{
            isName = true;
        }
    }
    //校验详细地址长度
    function checkAddressDetail(){
        var textarea = doc.getElementById('address');
        textarea.defaultValue = textarea.value;
        var address = common.trimVal('address');
        if(address.length < 2 || address.length > 50){
            isAddrDetail = false;
        }else{
            isAddrDetail = true;
        }
    }

    // 收货地址跳转
    $('.useAddress').on('click',function(){
        $('#addressList').css('display','block');
    })

    $('#addBtn').on('click',function(){
        var oName = $('#username').val();
        var oPhone = $('#mobile').val();;
        var oAddress = $('#address').val();;
        BP.send({event_id:'B804W005',url:ShareUrl,name:'提交',cook_id:'',user_id:userId,
        user_address_detail:oAddress,user_name: oName,user_phonenumber:oPhone   
        });
        if(oName&&oPhone&&oAddress){
            if(checkPhone()==false){
                return false;
            }
            console.log(oName,oPhone,oAddress)
            ajax.query('/op/qixi/addaddress', {
                lbid : libaoId,
                name : oName,
                address : oAddress,
                phone : oPhone
            },function(data){
                console.log(data)
                if(data.success){
                    $('#addressList').css('display','none');
                    $('#addSucc').css('display','block');
                }else{
                    UI.alerter('提交失败哦');
                }
            });
        }else{
            UI.alerter('您的信息输入不完整');
        }
    })

}); 
