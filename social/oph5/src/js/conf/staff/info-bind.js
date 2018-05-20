/**
 * Created by tianguangyu on 2016/9/1.
 */
define('conf/staff/info-bind.js', function (require) {
    var $ = require('$');
    var base64 = require('utils/base64.js');
    var UI = require('UI/alert');

    var typeOfInputVal = '';
    var dataJson = [];
    var oldName = $('#name').val();
    var oldStaffNum = $('#staff-num').val();
    var oldPoId = $('#position-inp').attr('me-id');

    //window.dept = {"level1":[{"id":"1","parent_id":"0","title":"\u534e\u5317"},{"id":"7","parent_id":"0","title":"\u534e\u4e1c"}],"level2":[{"id":"3","parent_id":"1","title":"\u5317\u4eac"},{"id":"5","parent_id":"1","title":"\u5929\u6d25"},{"id":"9","parent_id":"7","title":"\u4e0a\u6d77"},{"id":"11","parent_id":"7","title":"\u82cf\u5dde"},{"id":"13","parent_id":"1","title":"\u77f3\u5bb6\u5e84"},{"id":"27","parent_id":"1","title":"313"},{"id":"33","parent_id":"1","title":"\u5317\u4eac\u5927\u533a"}],"level3":[{"id":"15","parent_id":"3","title":"\u6d77\u6dc0"},{"id":"23","parent_id":"3","title":"\u671d\u9633"},{"id":"35","parent_id":"3","title":"\u4eae\u9a6c\u6865\u5206\u90e8"},{"id":"155","parent_id":"33","title":"\u4eae\u9a6c\u6865\u5206\u90e8"},{"id":"163","parent_id":"33","title":"\u4e09\u5143\u6865\u5206\u90e8"},{"id":"169","parent_id":"9","title":"\u666e\u9640\u533a"}],"level4":[{"id":"17","parent_id":"15","title":"\u4e2d\u5173\u6751\u5e97"},{"id":"25","parent_id":"23","title":"\u671b\u4eac\u5e97"},{"id":"37","parent_id":"3","title":"\u7f8e\u4fe1\u7f51\u7edc"},{"id":"157","parent_id":"155","title":"\u7f8e\u4fe1\u7f51\u7edc"},{"id":"165","parent_id":"163","title":"\u56fd\u7f8e\u91d1\u878d"},{"id":"171","parent_id":"169","title":"\u8fd1\u94c1\u5e97"}],"level5":[{"id":"19","parent_id":"17","title":"\u9500\u552e1"},{"id":"21","parent_id":"17","title":"\u4fc3\u9500"},{"id":"29","parent_id":"17","title":"\u5bfc\u8d2d"},{"id":"31","parent_id":"17","title":"\u7406\u60f3\u5927\u53a6"},{"id":"159","parent_id":"157","title":"\u8d22\u52a1"},{"id":"161","parent_id":"157","title":"\u9500\u552e"},{"id":"167","parent_id":"165","title":"\u4f1a\u8ba1"},{"id":"173","parent_id":"171","title":"\u9500\u552e"},{"id":"175","parent_id":"25","title":"PHP"}]};
    if(window.isOverTime != 1){

        /*添加联想事件*/
        document.getElementById('com-name-inp').oninput = (function(){thinkData()});

        /*所属大区*/
        $('#big-dep').click(function(){
            lostBlur();
            if(window.dept.length == 0){
                UI.alerter('读取不到用户信息!');
                return;
            };
            typeOfInputVal = 'bigDep';
            dataJson = window.dept.level1;
            var pId = $('#big-dep-inp').attr('parent-id');
            loadData(pId);
            $('.tpc-adr-title').text('所属大区');
            showSelectBox();
        });

        /*一级分部*/
        $('#first-dep').click(function(){
            lostBlur();
            if($('#big-dep-inp').val().length <= 0){
                UI.alerter('请先选择所属大区!');
                return;
            }
            typeOfInputVal = 'firstDep';
            dataJson = window.dept.level2;
            var pId = $('#first-dep-inp').attr('parent-id');
            loadData(pId);
            $('.tpc-adr-title').text('一级分部');
            showSelectBox();
        });

        /*二级分部*/
        $('#second-dep').click(function(){
            lostBlur();
            if($('#first-dep-inp').val().length <= 0){
                UI.alerter('请先选择一级分部!');
                return;
            }
            typeOfInputVal = 'secondDep';
            dataJson = window.dept.level3;
            var pId = $('#second-dep-inp').attr('parent-id');
            loadData(pId);
            $('.tpc-adr-title').text('二级分部')
            showSelectBox();
        });

        /*公司名称*/
        $('#companyname-icon').click(function(){
            if($('#second-dep-inp').val().length <= 0){
                UI.alerter('请先选择二级分部!');
                return;
            }
            typeOfInputVal = 'companyName';
            dataJson = window.dept.level4;
            var pId = $('#com-name-inp').attr('parent-id');
            loadData(pId);
            $('.tpc-adr-title').text('门店/公司名称');
            showSelectBox();
        });

        /*岗位*/
        $('#position').click(function(){
            lostBlur();
            if($('#com-name-inp').val().length <= 0){
                UI.alerter('请先选择公司名称!');
                return;
            }
            typeOfInputVal = 'position';
            dataJson = window.dept.level5;
            var pId = $('#position-inp').attr('parent-id');
            loadData(pId);
            $('.tpc-adr-title').text('岗位职级');
            showSelectBox();
        });

        /*选中下拉列表*/
        $('#adr-ch-list').on('click','li',function(){
            switch (typeOfInputVal) {
                case 'bigDep':
                    if($('#big-dep-inp').val() != this.innerHTML){
                        $('#big-dep-inp').val(this.innerHTML);
                        $('#first-dep-inp').val('').attr('parent-id',-1);
                        $('#second-dep-inp').val('').attr('parent-id',-1);
                        $('#com-name-inp').val('').attr('parent-id',-1);
                        $('#position-inp').val('').attr('parent-id',-1);
                        $('#first-dep-inp').attr('parent-id', $(this).attr('id'));
                    }
                    break;
                case 'firstDep':
                    if($('#first-dep-inp').val() != this.innerHTML){
                        $('#first-dep-inp').val(this.innerHTML);
                        $('#second-dep-inp').val('').attr('parent-id',-1);
                        $('#com-name-inp').val('').attr('parent-id',-1);
                        $('#position-inp').val('').attr('parent-id',-1);
                        $('#second-dep-inp').attr('parent-id', $(this).attr('id'));
                    }
                    break;
                case 'secondDep':
                    if($('#second-dep-inp').val() != this.innerHTML){
                        $('#second-dep-inp').val(this.innerHTML);
                        $('#com-name-inp').val('').attr('parent-id',-1);
                        $('#position-inp').val('').attr('parent-id',-1);
                        $('#com-name-inp').attr('parent-id', $(this).attr('id'));
                    }
                    break;
                case 'companyName':
                    if($('#com-name-inp').val() != this.innerHTML){
                        $('#com-name-inp').val(this.innerHTML);
                        $('#position-inp').val('').attr('parent-id',-1);
                        $('#position-inp').attr('parent-id', $(this).attr('id'));
                    }
                    break;
                case 'position':
                    $('#position-inp').val(this.innerHTML);
                    $('#position-inp').attr('me-id', $(this).attr('id'));
                    break;
                default :
                    break;
            }
            hasHtyState();
            hideSelectBox();
        });

        /*填充select数据*/
        function loadData(pId){
            var html = '';
            for(var i=0;i< dataJson.length;i++ ){
                if(pId == dataJson[i].parent_id){
                    html += '<li id="' + dataJson[i].id + '" parent-id="' + dataJson[i].parent_id + '" class="">'+dataJson[i].title+'</li>'
                }
            }
            $('#adr-ch-list').html(html);
        }

        /*联想*/
        function thinkData(){
            if($('#second-dep-inp').val().length <= 0){
                UI.alerter('请先选择二级分部!');
                $('#com-name-inp').val('');
                return;
            }
            typeOfInputVal = 'companyName';
            dataJson = window.dept.level4;
            //$('#position-inp').attr('value', '').attr('parent-id',-1);
            $('#position-inp').val('');
            $('#position-inp').attr('parent-id', $(this).attr('id'));
            var pId = $('#com-name-inp').attr('parent-id');
            var html = '';
            for(var i=0;i< dataJson.length;i++ ){
                if(pId == dataJson[i].parent_id){
                    var thinkWord = $('#com-name-inp').val();
                    if(dataJson[i].title.indexOf($.trim(thinkWord)) >= 0){
                        html += '<li id="' + dataJson[i].id + '" parent-id="' + dataJson[i].parent_id + '" class="">'+dataJson[i].title+'</li>'
                    }
                }
            }
            $('#think-list ul').html(html);
            $('#think-list').show();
        //判断手动输入的内容是否合规
            for(var i=0;i< dataJson.length;i++ ){
                if(pId == dataJson[i].parent_id){
                    var thinkWord = $('#com-name-inp').val();
                    if(dataJson[i].title === $.trim(thinkWord)){
                        $('#position-inp').attr('parent-id', dataJson[i].id);
                        break;
                    }else{
                        $('#position-inp').attr('parent-id', -1);
                    }
                }
            }
        }

        /*点击联想列表*/
        $('#think-list ul').on('click','li',function(){
            //if($('#com-name-inp').val() != this.innerHTML){
            $('#com-name-inp').val(this.innerHTML);
            $('#position-inp').val('');
            $('#position-inp').attr('parent-id', $(this).attr('id'));
            $('#think-list').hide();
        });

    }else{
        $('#select-list-box').addClass('infor-form-gray');
        $('#com-name-inp').attr('readonly','readonly');
    }

    /*公司失去焦点时，隐藏联想弹框*/
    $('body').on('click',function(){
        if(window.event.target != $('#think-list')[0] && window.event.target != $('#com-name-inp')[0]  && window.event.target != $('#remove_bg')[0]){
            $('#think-list').hide();

        }
    });

    /*关闭蒙层*/
    $('#choose_cover').on("click", function() {
        hasHtyState();
        hideSelectBox();
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
        if(getStringLen(name) > 10){
            UI.alerter('请检查姓名，姓名不可超过10个字符！');
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
        var bigDep = $('#big-dep-inp').val().trim();
        if(!bigDep.length){
            UI.alerter('请选择大区！');
            return false;
        }
        var firstDep = $('#first-dep-inp').val().trim();
        if(!firstDep.length){
            UI.alerter('请选择一级分部！');
            return false;
        }
        var sectionDep = $('#second-dep-inp').val().trim();
        if(!sectionDep.length){
            UI.alerter('请选择二级分部！');
            return false;
        }
        var companyName = $('#com-name-inp').val().trim();
        if(!companyName.length){
            UI.alerter('请选择公司名称！');
            return false;
        }
        var position = $('#position-inp').val().trim();
        if(!position.length){
            UI.alerter('请选择岗位职级！');
            return false;
        }

        var dept_id = $('#position-inp').attr('me-id');
        if((name==oldName) && (staffNum==oldStaffNum) && (dept_id==oldPoId)){
            window.location.href = window.LoginSendUrl;
        }else{
            $('#confirm-name').text(name);
            $('#confirm-no').text(staffNum);
            $('#confirm-dep').text(bigDep);
            $('#confirm-fir').text(firstDep);
            $('#confirm-sec').text(sectionDep);
            $('#confirm-com').text(companyName);
            $('#confirm-posi').text(position);
            //$('#choose_cover').show();
            $('#choose_cover').addClass('xin-mask-all');
            $('#confirm-info').show();
            notHasHtyState();
        }

    });

    /*确认无误*/
    $('#submit').click(function(){
        var true_name = $('#confirm-name').text();
        var job_number = $('#confirm-no').text();
        var dept_id = $('#position-inp').attr('me-id');
        var params = {true_name: true_name,job_number: job_number,dept_id: dept_id};
        $.ajax({
            type: 'get',
            url: '/op/shopbind/submitApi',
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

    /*显示select弹层*/
    function showSelectBox(){

        notHasHtyState();
        lostBlur();

        $('#choose_cover').addClass('xin-mask-all');
        $('#choose-area').css({
            'transition': 'bottom 1s ease-out',
            'bottom': '0%',
            '-webkit-transition': 'bottom 1s ease-out',
            '-moz-transition': 'bottom 1s ease-out',
            "z-index": 10000,
            'opacity':1
        });
        $('#choose_cover').get(0).addEventListener("touchmove", function(event) {

            event.preventDefault();

        },false);
        // $('#choose-area').get(0).addEventListener('touchmove', function (e) {
        //     e.returnValue = false;
        //     e.stopPropagation && e.stopPropagation();
        //     return false;
        // });
        // $('#choose-area').get(0).onmousewheel=function(){return false};
        document.body.style.overflowY="hidden";
    }

    /*让所有的input框失去焦点防止光标闪烁*/
    function lostBlur(){
        document.getElementById('big-dep-inp').blur();
        document.getElementById('first-dep-inp').blur();
        document.getElementById('second-dep-inp').blur();
        document.getElementById('position-inp').blur();
    }

    /*隐藏select弹层*/
    function hideSelectBox(){
        $('#choose_cover').removeClass('xin-mask-all');
        $('#choose-area').css({
            'transition': 'bottom 1s ease-out',
            '-moz-transition': 'bottom 1s ease-out',
            '-webkit-transition': 'bottom 1s ease-out',
            'bottom': '-200%'
        });
        $('#choose_cover').get(0).removeEventListener("touchmove", function(event) {

            event.preventDefault();

        },false);
        // $('#choose-area').get(0).removeEventListener('touchmove', function (e) {
        //     e.returnValue = false;
        //     e.stopPropagation && e.stopPropagation();
        //     return false;
        // });
        // $('#choose-area').get(0).onmousewheel=function(){return true};
        document.body.style.overflowY="visible";
    }

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
        hideSelectBox();
        $('#confirm-info').hide();
    }

});