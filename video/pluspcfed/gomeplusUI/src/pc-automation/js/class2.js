

/**加载数据**/
function init(){   
       var num=1,classname="",
       Sgetclass1id = localStorage.getItem("classid");
       // console.log("getclass1id"+Sgetclass1id);
       get_Ajax(num,Sgetclass1id,classname);
        /***搜索结果* */
      $("#src-result .btn-result").click(function(){
            var element_val=$('body').find("#src-result").find(".ipt-txt").val();
            var classname = nameTrans(element_val);
            clearHtml("#projet-tbl");
            // console.log("num:"+num+"getId:"+Sgetclass1id+"classname:"+classname);
            get_Ajax(num,Sgetclass1id,classname);
      });
      
      /*分页*/
      var pro_id=Sgetclass1id;
      $('body').on("click", ".next-page", function(){ 
          fn_nextPage()
      });
      $('body').on("click", ".pre-page", function(){
          
          fn_prePage();
      });
      $('body').on("click", ".first-page", function(){
        if(pageNum=="1"){
              return false;
          }else{
              fn_gotoPage(firstPage);
          }
      });
      $('body').on("click", ".last-page", function(){
          if(pageNum==pageCount){
              return false;
          }else{
              fn_gotoPage(lastPage);
          }
      });
      /*分页**/
      function fn_nextPage(){
        var element_val=$('body').find("#src-result").find(".ipt-txt").val();
          var classname=(nameTrans(element_val));
        if(pageCount>pageNum){
          pageNum++;
          clearHtml("#projet-tbl");
          get_Ajax(pageNum,pro_id,classname);
        }else{
          return false;
        }
      }
      function fn_prePage(){
        var element_val=$('body').find("#src-result").find(".ipt-txt").val();
          var classname=(nameTrans(element_val));
        if(pageNum>1){
          pageNum-- ;
          clearHtml("#projet-tbl");
          get_Ajax(pageNum,pro_id,classname);
        }else{
          return false;
        }
      }
      function fn_gotoPage(num){
          var element_val=$('body').find("#src-result").find(".ipt-txt").val();
          var classname=(nameTrans(element_val));
          clearHtml("#projet-tbl");
          // console.log("num:"+num+"getId:"+getId+"classname:"+classname)
          get_Ajax(num,pro_id,classname);
       }
      /***清空* */
      $("#src-result .btn-clear").click(function(){
          $("#src-result").find("input").val("");
      });
      //新建名称
      $(".new-class .btn-add").click(function(){
        var class1id = localStorage.getItem("projectId");
        //   console.log('新建idclass1id'+class1id);
          $("#dlg-1").show();
          $(".mark").show();
          $("#dlg-1 input").val("");
      });
      $("#dlg-1 .btn-submit").click(function(){
            // var classname = $("#dlg-1 input").val();
          var name_val = $("#dlg-1 input").val();
            if(name_val){
              var class_name=nameTrans(name_val);
            //   clearHtml("#projet-tbl");
              add_class(class_name,Sgetclass1id);
              $(".dlg-box").hide();
              $(".mark").hide();
            }else{
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p>请输入名称</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                }, 1000);
                 return false;
            } 
      });
      /**删除分类*/
      $('body').on("click", ".btn-del", function(){
          $(".dlg-alert").show();
          $(".mark").show();
          var dataid = $(this).parent().parent().attr("data-id");
          $(".dlg-alert .btn-sure").attr("data-id",dataid);
      });
      $(".dlg-alert .btn-sure").click(function(){
              var dataid= $(this).attr("data-id");
              del_class(dataid)
              $(".dlg-alert").hide();
              $(".mark").hide();
              // clearHtml("#projet-tbl");
      });
      ///修改名称
      $('body').on("click", ".btn-reg-name", function(){
          $("#dlg-5").show();
          $(".mark").show();
          var dataid = $(this).parent().parent().attr("data-id");
          var S_class1id = $(this).parent().parent().attr("data-class1id");
          $("#dlg-5 .btn-submit").attr("data-id",dataid);
          $("#dlg-5 .btn-submit").attr("data-class1id",S_class1id);
          $("#dlg-5 input").val("");
      });
      $("#dlg-5 .btn-submit").click(function(){
          var dataid = $(this).attr("data-id");
          var S_class1id = $(this).attr("data-class1id");
          var name_val = $("#dlg-5 input").val();
            if(name_val){
            var class_name=nameTrans(name_val);
            // clearHtml("#projet-tbl")
            update_project(class_name,S_class1id,dataid);
            $(".dlg-box").hide();
            $(".mark").hide();
            }else{
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p>请输入名称</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                }, 2000);
                 return false;
            } 
      });
       $('body').on("click", ".btn-view", function(){
        var dataId=$(this).parent().parent().attr("data-id");
        // console.log("dataId:"+dataId);
         localStorage.setItem("class2id", dataId);
      });
     
}
init();
function get_Ajax(num,class1id,classname){ 
  var url="http://10.58.56.252:8080/auto-android-case/class2/jsonp/class2Service?callback=aaa&pagenum="+num+"&size=10&class1id="+class1id+"&classname="+classname;
  $.ajax({
             type : "get",
             async:false,
             url : url,
             dataType : "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"aaa",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
                 if(data && data.list.length!=0){
                    var dataList = data.list;
                    var html = '<tr><th>分类编号</th><th>二级分类</th><th width="310">操作</th></tr>';
                    for(var i=0;i<dataList.length;i++){
                        html += '<tr data-name="'+ dataList[i].classname + '" data-id="'+dataList[i].id+'" data-class1id="'+dataList[i].class1id+'" data-projectid=""><td>' + dataList[i].id + '</td><td>' + dataList[i].classname + '</td><td class="btn-link"><a class="btn-normal btn-reg-name" >修改名称</a><a class="btn-normal btn-del" >删除分类</a><a class="btn-normal btn-view" href="class3.html">三级分类查看</a></td></tr>';
                    }
                 }else{
                   var html="<tr class='table-result'><td>暂无数据</td></tr>";
                 }
                 $("#projet-tbl").append(html);
                var data = data;
                pageNum = data.pageNum;
                firstPage=data.firstPage;
                lastPage=data.lastPage;
                pageCount=data.pageCount;
                nextPage =data.nextPage;
                prePage =data.prePage;
                // console.log(nextPage);
                $('body').find('.goto-page').text(pageNum);
                $('body').find('.currpage').text("当前"+pageNum+"页");
                $('body').find('.pageCount').text("共"+pageCount+"页");
                
            },
             error:function(){
                  console.log('请求ajax出错');
             }      
    })
}
/*渲染数据**/
// function loading_html(data){
//   var dataList = data.list;
//   var html = '<tr><th>分类编号</th><th>二级分类</th><th width="310">操作</th></tr>';
//   for(var i=0;i<dataList.length;i++){
//     html += '<tr data-name="'+ dataList[i].classname + '" data-id="'+dataList[i].id+'" data-class1id="'+dataList[i].class1id+'"><td>' + dataList[i].id + '</td><td>' + dataList[i].classname + '</td><td class="btn-link"><a class="btn-normal btn-reg-name" >修改名称</a><a class="btn-normal btn-del" >删除分类</a><a class="btn-normal btn-view" href="class3.html">三级分类查看</a></td></tr>';
//   }
//   // console.log(dataList);
//   var parent=$("#projet-tbl");
//   parent.append(html);
// }
/*ajax请求-添加**/
function add_class(class_name,class1id){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class2/jsonp/insert/class2Service?callback=sd&classname="+class_name+"&class1id="+class1id,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
               $(".m-toast").css("display","block");
                $(".m-toast").html("<p>操作成功</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
                clearHtml("#projet-tbl");
                parent.document.location.reload();
                }, 1000);

            },
             error:function(data){
                // console.log(data.code);
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p>输入分类名称重复了</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
                clearHtml("#projet-tbl");
                parent.document.location.reload();
                }, 1000);
                // return false;
             }          
    })
}
/***/
// function success(){

// }
function del_class(id){
    $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class2/jsonp/delete/class2Service?callback=aaa&id="+id,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
               $(".m-toast").css("display","block");
                $(".m-toast").html("<p>操作成功</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
                clearHtml("#projet-tbl");
                parent.document.location.reload();
                }, 1000);

            },
             error:function(data){
                // console.log(data.code);
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p class='t-txt'>要删除此分类，须先删除子类</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
                clearHtml("#projet-tbl");
                parent.document.location.reload();
                }, 1000);
             }              
    })
}
/*ajax请求-更新项目名*/
function update_project(class_name,class1id,id){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class2/jsonp/update/class2Service?callback=sd1&classname="+class_name+"&class1id="+class1id+"&id="+id,
             dataType : "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
               $(".m-toast").css("display","block");
                $(".m-toast").html("<p>操作成功</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
                clearHtml("#projet-tbl");
                parent.document.location.reload();
                }, 1000);

            },
             error:function(data){
                // console.log(data.code);
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p>输入分类名称重复了</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
                clearHtml("#projet-tbl");
                parent.document.location.reload();
                }, 1000);
                // return false;
             }    
    })
}

/*公用方法**/
function clearHtml(element) {
  $('body').find(element).empty();
}
function nameTrans(name_txt){
              // var name_txt=element.val();
              name=decToHex(name_txt);
              name = encodeURIComponent(name);
              return name;
}
/**转码方法*/   
function decToHex(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u"+res.join("\\u");
}
function hexToDec (str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}

$(".dlg-box .close").click(function(){
  $(".dlg-box").hide();
  $(".mark").hide();
  $(".btn-normal").removeClass("btn-hover");
});
// $(document).on('click', '.btn-box .btn-normal', function () {
//     $(".btn-normal").removeClass("btn-hover");
// })
$(".dlg-box .btn-cancel").click(function(){
  $(".dlg-box").hide();
  $(".mark").hide();
})
$(document).on('click', '.btn-normal', function () {
  $(".btn-normal").removeClass("btn-hover");
  $(this).addClass("btn-hover");
});
$(document).on('mouseout', '.btn-normal', function () {
  $(".btn-normal").removeClass("btn-hover");
  $(this).removeClass("btn-hover");
});
/***side js** */
$(".list li").click(function(){
  $(this).siblings().removeClass("curr");
  $(this).addClass("curr");
});