/**
 * Created by liuxu on 2016/11/21.
 */
define('conf/staff/info-bind-dq.js', function (require) {
    var $ = require('$');
    var base64 = require('utils/base64.js');
    var UI = require('UI/alert');

    var typeOfInputVal = '';
    var dataJson = [];
    var oldName = $('#name').val();
    var oldStaffNum = $('#staff-num').val();


    //window.dept = {"level1":[{"id":"1","parent_id":"0","title":"\u534e\u5317"},{"id":"7","parent_id":"0","title":"\u534e\u4e1c"}],"level2":[{"id":"3","parent_id":"1","title":"\u5317\u4eac"},{"id":"5","parent_id":"1","title":"\u5929\u6d25"},{"id":"9","parent_id":"7","title":"\u4e0a\u6d77"},{"id":"11","parent_id":"7","title":"\u82cf\u5dde"},{"id":"13","parent_id":"1","title":"\u77f3\u5bb6\u5e84"},{"id":"27","parent_id":"1","title":"313"},{"id":"33","parent_id":"1","title":"\u5317\u4eac\u5927\u533a"}],"level3":[{"id":"15","parent_id":"3","title":"\u6d77\u6dc0"},{"id":"23","parent_id":"3","title":"\u671d\u9633"},{"id":"35","parent_id":"3","title":"\u4eae\u9a6c\u6865\u5206\u90e8"},{"id":"155","parent_id":"33","title":"\u4eae\u9a6c\u6865\u5206\u90e8"},{"id":"163","parent_id":"33","title":"\u4e09\u5143\u6865\u5206\u90e8"},{"id":"169","parent_id":"9","title":"\u666e\u9640\u533a"}],"level4":[{"id":"17","parent_id":"15","title":"\u4e2d\u5173\u6751\u5e97"},{"id":"25","parent_id":"23","title":"\u671b\u4eac\u5e97"},{"id":"37","parent_id":"3","title":"\u7f8e\u4fe1\u7f51\u7edc"},{"id":"157","parent_id":"155","title":"\u7f8e\u4fe1\u7f51\u7edc"},{"id":"165","parent_id":"163","title":"\u56fd\u7f8e\u91d1\u878d"},{"id":"171","parent_id":"169","title":"\u8fd1\u94c1\u5e97"}],"level5":[{"id":"19","parent_id":"17","title":"\u9500\u552e1"},{"id":"21","parent_id":"17","title":"\u4fc3\u9500"},{"id":"29","parent_id":"17","title":"\u5bfc\u8d2d"},{"id":"31","parent_id":"17","title":"\u7406\u60f3\u5927\u53a6"},{"id":"159","parent_id":"157","title":"\u8d22\u52a1"},{"id":"161","parent_id":"157","title":"\u9500\u552e"},{"id":"167","parent_id":"165","title":"\u4f1a\u8ba1"},{"id":"173","parent_id":"171","title":"\u9500\u552e"},{"id":"175","parent_id":"25","title":"PHP"}]};




    /*关闭蒙层*/
    $('#choose_cover').on("click", function() {
        hasHtyState();

    });

    /*确认绑定*/
    $('#confirm').click(function(){
        var name = Trim($('#name').val(), 'g');
        if(!name.length){
            UI.alerter('姓名不能为空！');
            return false;
        }
        if(hasSpecialByte(name)){
            UI.alerter('姓名中不能包含特殊字符或数字！');
            return false;
        }
        if(getStringLen(name) > 20){
            UI.alerter('请检查姓名，姓名不可超过10个汉字！');
            return false;
        }
        var staffNum = Trim($('#staff-num').val(), 'g');
        if(!staffNum.length){
            UI.alerter('请填写员工编号！');
            return false;
        }
        //if(!isNum(staffNum)){
        //    UI.alerter('请填写正确的员工编号！');
        //    return false;
        //}

        var params = {true_name: name,job_number: staffNum};
        $.ajax({
            type: 'get',
            url: '/op/shopbind/getdqgangwei',
            data: params,
            dataType: 'json',
            success: function(data) {
                console.log(data,1);
                if(data.code == 200){
                    if((name==oldName) && (staffNum==oldStaffNum)){
                        window.location.href = window.LoginSendUrl;
                    }else{
                        $('#confirm-name').text(name);
                        $('#confirm-no').text(staffNum);
                        $('#confirm-zb').text(data.data.depts.group);
                        $('#confirm-dep').text(data.data.depts.area);
                        $('#confirm-fir').text(data.data.depts.first);
                        $('#confirm-sec').text(data.data.depts.second);
                        $('#confirm-com').text(data.data.depts.shop);
                        $('#confirm-posi').text(data.data.depts.station);
                        //$('#choose_cover').show();
                        $('#choose_cover').addClass('xin-mask-all');
                        $('#confirm-info').show();
                        notHasHtyState();
                    }
                }else if(data.code == -1){
                    UI.alerter(data.msg,'#confirm',function(){window.location.href = window.LoginSendUrl;});
                }else{
                    UI.alerter(data.msg);
                }


            },
            error: function(jqXHR, textStatus, errorThrown) {

            }
        });




    });

    /*确认无误*/
    $('#submit').click(function(){
        var true_name = $('#confirm-name').text();
        var job_number = $('#confirm-no').text();
        var params = {true_name: true_name,job_number: job_number};
        $.ajax({
            type: 'get',
            url: '/op/shopbind/binddqstaff',
            data: params,
            dataType: 'json',
            success: function(data) {
                if(data.code == 200){
                    UI.alerter(data.msg,'#confirm',function(){window.location.href = window.LoginSendUrl;});
                }else if(data.code == -1){
                    UI.alerter(data.msg,'#confirm',function(){window.location.href = window.LoginSendUrl;});
                }else{
                    UI.alerter(data.msg);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {

            }
        });
    });

    /*返回修改*/
    $('#go-back').click(function(){
        removeXinMask();
        $('#confirm-info').hide();
    });

    /*关闭弹层*/
    $('#close').click(function(){
        removeXinMask();
        $('#confirm-info').hide();
    });





    /*去掉所有的空格*/
    function Trim(str,is_global){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g")
        {
            result = result.replace(/\s/g,"");
        }
        return result;
    }

    /*获取字符串长度*/
    function getStringLen(Str)
    {
        var i,len,code;
        if(Str==null || Str == "") return 0;
        len = Str.length;
        for (i = 0;i < Str.length;i++)
        {
            code = Str.charCodeAt(i);
            if (code > 255) {len ++;}
        }
        return len;
    }

    /*是否有特殊字符*/
    function hasSpecialByte(str){
        //return !/^[a-zA-Z0-9\u4E00-\u9FA5]*$/.test(str) ? true : false;
        return !/^[a-zA-Z\u4E00-\u9FA5]*$/.test(str) ? true : false;
    }

    /*验证数字*/
    function isNum(str){
        return /^\d{1,}$/.test(str) ? true : false;
    }

    /*没有历史状态添加*/
    function notHasHtyState(){
        if(!history.state){
            history.pushState({'id':123},'','')
        }
    }

    /*有历史状态返回*/
    function hasHtyState(){
        if(history.state){
            history.back();
        }
    }

    function removeXinMask(){
        hasHtyState();
        $('#choose_cover').removeClass('xin-mask-all');
    }

    window.onpopstate = function(){

        $('#confirm-info').hide();
    }

});