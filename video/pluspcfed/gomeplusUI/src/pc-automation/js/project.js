

/**加载数据**/
function init(){   
       var num=1,projectname="";
       get_Ajax(num,projectname);
        /***搜索结果* */
      $("#src-result .btn-result").click(function(){
            var element_val=$('body').find("#src-result").find(".ipt-txt").val();
            var projectname = nameTrans(element_val);
            clearHtml("#projet-tbl")
            get_Ajax(num,projectname);

      });
      
 
      /*分页*/
      $('body').on("click", ".next-page", function(){ 
          var element_val=$('body').find("#src-result").find(".ipt-txt").val();
          nextPage(nameTrans(element_val));
      });
      $('body').on("click", ".pre-page", function(){
          var element_val=$('body').find("#src-result").find(".ipt-txt").val();
          prePage(nameTrans(element_val));
      });
      $('body').on("click", ".first-page", function(){
          var element_val=$('body').find("#src-result").find(".ipt-txt").val();
          var projectname = nameTrans(element_val);
              clearHtml("#projet-tbl")
              get_Ajax(firstPage,projectname);
      });
      $('body').on("click", ".last-page", function(){
            var element_val=$('body').find("#src-result").find(".ipt-txt").val();
            var projectname = nameTrans(element_val);
                clearHtml("#projet-tbl")
                get_Ajax(lastPage,projectname);
      });
      /*分页**/
      function nextPage(name){
        if(pageCount>pageNum){
          pageNum++;
          clearHtml("#projet-tbl");
          get_Ajax(pageNum,name);
        }else{
          return false;
        }
      }
      function prePage(name){
        if(pageNum>1){
          pageNum-- ;
          clearHtml("#projet-tbl");
          get_Ajax(pageNum,name);
        }else{
          return false;
        }
      }
      /***清空* */
      $("#src-result .btn-clear").click(function(){
          $("#src-result").find("input").val("");
      });
      //新建名称
      $(".new-class .btn-add").click(function(){
          $("#dlg-1").show();
          $(".mark").show();
          $("#dlg-1 input").val("");
      });
      $("#dlg-1 .btn-submit").click(function(){
            // var classname = $("#dlg-1 input").val();
          var name_val = $("#dlg-1 input").val();
            if(name_val){
              var projectname=nameTrans(name_val);
              add_project(projectname);
              $(".dlg-box").hide();
              $(".mark").hide();
            }else{
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p>请输入名称</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                // $(".mark").css("display","none")
                // $("#dlg-1").css("display","none")
                }, 2000);
                 return false;
            } 
      });
      
      ///修改名称
      $('body').on("click", ".btn-reg-name", function(){
          $("#dlg-5").show();
          $(".mark").show();
          var projecId = $(this).parent().parent().attr("data-id");
          $("#dlg-5 .btn-submit").attr("data-projectid",projecId);
          $("#dlg-5 input").val("");
      });
      $("#dlg-5 .btn-submit").click(function(){
            var projecId = $(this).attr("data-projectid");
            var name_val = $("#dlg-5 input").val();
            if(name_val){
            var projectname=nameTrans(name_val);
            update_project(projecId,projectname);
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
        var projecId=$(this).parents("tr").attr("data-id");
         localStorage.setItem("projectId", projecId);
      })
}
init();

function get_Ajax(num,name){
  var url="http://10.58.56.252:8080/auto-android-case/project/jsonp/projectService?callback=bbb&pagenum="+num+"&size=10&project="+name;
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
                    var html = '<tr><th>项目编号</th><th>项目名称</th><th width="210">操作</th></tr>';
                    for(var i=0;i<dataList.length;i++){
                      html += '<tr data-name="'+ dataList[i].project + '" data-id="'+dataList[i].id+'"><td>' + dataList[i].id + '</td><td>' + dataList[i].project + '</td><td class="btn-link"><a class="btn-normal btn-reg-name" >修改名称</a><a class="btn-normal btn-view" href="class.html">一级分类查看</a></td></tr>';
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

/*ajax请求-添加**/
function add_project(project_name){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/project/jsonp/insert/projectService?callback=aaa&project="+project_name,
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
                console.log(data.code);
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
/*ajax请求-更新项目名*/
function update_project(id,project_name){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/project/jsonp/update/projectService?callback=aaa&id="+id+"&project="+project_name,
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
                parent.document.location.reload();
                }, 1000);

            },
             error:function(data){
                console.log(data.code);
                $(".m-toast").css("display","block");
                $(".m-toast").html("<p>输入分类名称重复了</p>");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none");
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

