$(function() {
    $(".navbar-expand-toggle").click(function() {
        $(".app-container").toggleClass("expanded");
        return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
    });
    return $(".navbar-right-expand-toggle").click(function() {
        $(".navbar-right").toggleClass("expanded");
        return $(".navbar-right-expand-toggle").toggleClass("fa-rotate-90");
    });
});

$(function() {
    return $('select').select2();
});

$(function() {
    return $('.toggle-checkbox').bootstrapSwitch({
        size: "small"
    });
});

$(function() {
    return $('.match-height').matchHeight();
});


$(function() {
    return $(".side-menu .nav .dropdown").on('show.bs.collapse', function() {
        return $(".side-menu .nav .dropdown .collapse").collapse('hide');
    });
});



//新加
//var $GLOBAL_CONFIG = {};
//$GLOBAL_CONFIG['main_domain'] = 'http://monitor.dev.atguat.com.cn/';
//$GLOBAL_CONFIG['live_id']= '11';

function answerData(){
    var dataAns = [];
    var item = [];
    $("#table tbody tr").each(function(i){
        i += 1;
        item = [$("#ans-title" + i).val(),$("#option-a" + i).val(),$("#option-b" + i).val(),$("#option-b" + i).val(),$("#answer" + i).val()];
        dataAns.push(item);
    });
    return dataAns;
}

function checkForm(){
    var subState = false;
    if(!validator($("#input4").val(),"num")){
        $("#input4").next().text("期望答对人数为纯数字");
        subState = false;
    }else{
        $("#input4").next().text("");
    }
    
    if(!validator($("#input5").val(),"num")){
        $("#input5").next().text("进入机器人最大值为纯数字");
        subState = false;
    }else{
        $("#input5").next().text("");
    }
    
    if($("#input1").val() == ""){
        $("#input1").next().text("直播标题不能为空");
        subState = false;
    }else{
        $("#input1").next().text("");
        subState = true;
    }
    
    if($("#input2").val() == ""){
        $("#input2").next().text("视频节目id不能为空");
        subState = false;
    }else if(!validator($("#input2").val(),"num")){
        $("#input2").next().text("视频节目id为纯数字");
        subState = false;
    }else{
        $("#input2").next().text("");
        subState = true;
    }
    
    if($("#input3").val() == ""){
        $("#input3").next().text("奖池信息不能为空");
        subState = false;
    }else if(!validator($("#input3").val(),"num")){
        $("#input3").next().text("奖池信息为纯数字");
        subState = false;
    }else{
        $("#input3").next().text("");
        subState = true;
    }
    
    return subState;
}

function checkTable(num){
    var subState = false;
    if($("#ans-title" + num).val() == ""){
        $("#ans-title" + num).addClass("error");
    }else{
        $("#ans-title" + num).removeClass("error");
        subState = true;
    }
    
    if($("#option-a" + num).val() == ""){
        $("#option-a" + num).addClass("error");
    }else{
        $("#option-a" + num).removeClass("error");
        subState = true;
    }
    
    if($("#option-b" + num).val() == ""){
        $("#option-b" + num).addClass("error");
    }else{
        $("#option-b" + num).removeClass("error");
        subState = true;
    }
    
    if($("#option-c" + num).val() == ""){
        $("#option-c" + num).addClass("error");
    }else{
        $("#option-c" + num).removeClass("error");
        subState = true;
    }
    
    if($("#answer" + num).val() == "0"){
        $("#answer" + num).next().addClass("error");
    }else{
        $("#answer" + num).next().removeClass("error");
        subState = true;
    }
    return subState;
}

$(function() {
    $("#form-save").click(function() {
        //  验证
        var state = checkForm();
        if(state){
            $.ajax({
                url: $GLOBAL_CONFIG['main_domain']+ 'api/createLive',
                type: 'POST', //GET
                data: {
                    title: $("#input1").val(),
                    program_id: $("#input2").val(),
                    bonus: $("#input3").val(),
                    expected_num: $("#input4").val(),
                    robot_num: $("#input5").val()
                },
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    $("#live-id").val(data.data.live_id);
                },
                error: function(xhr, textStatus) {
                    console.log('ajax请求失败')
                }
            })
        }
    });
    
//  添加新行
    $(document).on("click",".answer-add",function() {
        toast("dianji 取消");
        var num = parseInt($(this).attr("data-id")) + 1;
        var str = `
            <tr>
                <th>${num}</th>
                <td><input id="ans-title${num}" type="text" class="form-control" placeholder="请输入题目"></td>
                <td><input id="option-a${num}" type="text" class="form-control" placeholder="请输入选项1"></td>
                <td><input id="option-b${num}" type="text" class="form-control" placeholder="请输入选项2"></td>
                <td><input id="option-c${num}" type="text" class="form-control" placeholder="请输入选项3"></td>
                <td>
                    <select id="answer${num}">
                        <option value="0">请选择</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                    </select>
                </td>
                <td>
                    <button data-id="${num}" type="button" class="btn btn-sm btn-info answer-save">保存</button>
                    <button data-id="1" type="button" class="btn btn-sm btn-success answer-add">添加</button>
                    <input type="hidden" id="qid${num}" value="" />
                </td>
            </tr>
        `;
        $("#table tbody").append(str);
        $('select').select2();
        $(".answer-add").attr("data-id",num);
    });
    
    //  保存一行
    $(document).on("click",".answer-save",function() {
        var num = parseInt($(this).attr("data-id"));
        var state = checkTable(num);
        if(state){
            $.ajax({
                url: $GLOBAL_CONFIG['main_domain']+ 'api/createQuestion',
                type: 'POST', //GET
                async:true,    //或false,是否异步
                data: {
                    number: num,
                    content: $("#ans-title" + num).val(),
                    option_a: $("#option-a" + num).val(),
                    option_b: $("#option-b" + num).val(),
                    option_c: $("#option-c" + num).val(),
                    answer: $("#answer" + num).val(),
                    questions_id: $("#qid" + num).val(),
                    live_id: $("#live-id").val()
                },
                dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
                success: function(data) {
                    $("#qid" + num).val(data.data.questions_id);
                },
                error: function(xhr, textStatus) {
                    console.log('ajax请求失败')
                }
            })
        }
    });
    
    //保存全部
    $("#all-save").click(function() {
        var stateForm = checkForm();
//      var tableState = false;
//      console.log($("[id^='ans-title']").length);
//      $("[id^='ans-title']").each(function(i){
//          i += 1;
//          if($(this).val() == ""){
//              $(this).addClass("error");
//              tableState = false;
//          }else{
//              $(this).removeClass("error");
//              tableState = true;
//          }
//          console.log(tableState);
//      });
        var dataTable = answerData();
        console.log(dataTable);
        if(stateForm){ 
            $.ajax({
                url: $GLOBAL_CONFIG['main_domain']+ 'api/createLive',
                type: 'POST', //GET
                async:true,    //或false,是否异步
                data: {
                    title: $("#input1").val(),
                    program_id: $("#input2").val(),
                    bonus: $("#input3").val(),
                    expected_num: $("#input4").val(),
                    robot_num: $("#input5").val(),
                    questions: dataTable,
                    live_id: $GLOBAL_CONFIG['live_id']
                },
                dataType: 'json',
                success: function(data) {
                    console.log(data)
                },
                error: function(xhr, textStatus) {
                    console.log('ajax请求失败')
                }
            })
        }
    });
    
//  直播管理
    $(".live-out").click(function() {
        $.ajax({
            url: $GLOBAL_CONFIG['main_domain']+ 'api/offlineLive',
            type: 'get', //GET
            data: {
                live_id: $(this).attr("data-id")
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)
            },
            error: function(xhr, textStatus) {
                console.log('ajax请求失败')
            }
        })
    })
    
    
    //  出题
    $(".send-question").click(function() {
        var id = $(this).attr("data-id");
        $.ajax({
            url: $GLOBAL_CONFIG['main_domain']+ 'api/pushQuestion',
            type: 'get', //GET
            data: {
                questions_id: id
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)
                if(data.code == 200){
                    questionList(id);
                }
                
            },
            error: function(xhr, textStatus) {
                console.log('ajax请求失败')
            }
        });
    })
    
    //  公布结果
    $(".res-question").click(function() {
        var id = $(this).attr("data-id");
        clearTimeout(stopTime);
        $.ajax({
            url: $GLOBAL_CONFIG['main_domain']+ 'api/pushAnswer',
            type: 'get', //GET
            data: {
                questions_id: id
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)
            },
            error: function(xhr, textStatus) {
                console.log('ajax请求失败')
            }
        });
    })
})
var stopTime;
function questionList(id){
    $.ajax({
        url: $GLOBAL_CONFIG['main_domain']+ 'api/pushAnswer',
        type: 'get', //GET
        data: {
            questions_id: id
        },
        dataType: 'json',
        success: function(data) {

            console.log(data)
        },
        error: function(xhr, textStatus) {
            console.log('ajax请求失败')
        }
    });
    stopTime = setTimeout('questionList(' + id + ')',1000);
}


function toast(str){
    var toast = $(".toast");
    if(toast.hasClass("hide")){
        toast.removeClass("hide");
        toast.children("div").html(str);
        setTimeout(function(){
            toast.addClass("hide");
        },1000);
    }
}