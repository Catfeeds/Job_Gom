var parent_node=$("#src-result");
var projectid=parent_node.find(".select-1 option:selected").val(),
                    class1id=parent_node.find(".select-2 option:selected").val(),
                    class2id=parent_node.find(".select-3 option:selected").val(),
                    class3id=parent_node.find(".select-4 option:selected").val();
                    projectid=(projectid>0)?projectid:projectid="";
                    class1id=(class1id>0)?class1id:class1id="";
                    class2id=(class2id>0)?class2id:class2id="";
                    class3id=(class3id>0)?class3id:class3id="";
var caseList = {
        init: function () { 
            this.initDom();
            this.initEvent();
            this.chooseClassify()
        },
        /*** 初始化DOM*/
        initDom: function () {
          var num=1,projectid="0",class1id="0",class2id="0",class3id="0",mobilebrand="",casename="";
          var project_name="",classname="";
          get_Ajax(num,projectid,class1id,class2id,class3id,mobilebrand,casename);
          choos_option(project_name);
          class_option(project_name);
          // console.log("pageNum:"+num+",projectid"+projectid+",class1id"+class1id+",class2id"+class2id+",class3id"+class3id+",mobilebrand"+mobilebrand+",casename"+casename);       
        },
        Load_options:function(){
            
        },
        /** 初始化事件*/
        initEvent: function () {
          var classname ="";
          // var projectid="0",class1id="0",class2id="0",class3id="0",mobilebrand="",casename="";
          var mobilebrand="",casename="";
           /**选项事件*/
           $(document).on("change",'#src-result .select-1',function(){
              change_projectid=$(this).val();
              chang_project_option(change_projectid,classname);
            });
            $(document).on("change",'#src-result .select-2',function(){
                var change_class1id=$(this).val();
                chang_class_option(change_class1id,classname);
            });
            $(document).on("change",'#src-result .select-3',function(){
                var change_class2id=$(this).val();
                chang_class2_option(change_class2id,classname);
            });
            $(document).on("change",'#src-result .select-4',function(){
                var change_class3id=$(this).val();
            });
            /**分类的select选项**/
           $(document).on("change",'select.select-1',function(){
              var change_projectid=$(this).val();
              $("#dlg-class .btn-submit").attr("data-project-id",change_projectid);
              class_option_1(change_projectid,classname);
            
            });
            $(document).on("change",'select.select-2',function(){
                var change_class1id=$(this).val();
                $("#dlg-class .btn-submit").attr("data-class-id" ,change_class1id);
                class_option_2(change_class1id,classname);
            });
            $(document).on("change",'select.select-3',function(){
                var change_class2id=$(this).val();
                $("#dlg-class .btn-submit").attr("data-class2-id" ,change_class2id);
                class_option_3(change_class2id,classname);
            });
            $(document).on("change",'select.select-4',function(){
                var change_class3id=$(this).val();
                $("#dlg-class .btn-submit").attr("data-class3-id", change_class3id);
                // console.log(class3id);
            });
            
            $('body').on("click", ".next-page", function(){ 
              if($(document).find("#src-result .btn-result").attr("data")=="true"){
                    var parent_node=$("#src-result");
                    var projectid=parent_node.find(".select-1 option:selected").val(),
                    class1id=parent_node.find(".select-2 option:selected").val(),
                    class2id=parent_node.find(".select-3 option:selected").val(),
                    class3id=parent_node.find(".select-4 option:selected").val();
                    projectid=(projectid>0)?projectid:projectid="";
                    class1id=(class1id>0)?class1id:class1id="";
                    class2id=(class2id>0)?class2id:class2id="";
                    class3id=(class3id>0)?class3id:class3id="";
                }else{
                    projectid=(projectid>0)?projectid:projectid="0";
                    class1id=(class1id>0)?class1id:class1id="0";
                    class2id=(class2id>0)?class2id:class2id="0";
                    class3id=(class3id>0)?class3id:class3id="0";
                }
                var pageNum= $(document).find(".fenye .currpage").attr("title");
                if(pageCount>pageNum){
                    pageNum++;
                  }else{
                    return false;
                  }
                  
                clearHtml("#projet-tbl");
                get_Ajax(pageNum,projectid,class1id,class2id,class3id,mobilebrand,casename);
                // console.log(pageNum+"projectid:"+projectid+"class1id:"+class1id+"class2id:"+class2id+"class3id:"+class3id+"num:"+pageNum+"casename:"+casename+"mobilebrand:"+mobilebrand);
                    
            });
            $('body').on("click", ".pre-page", function(){  
              if($(document).find("#src-result .btn-result").attr("data")=="true"){
                    // console.log("点了");
                    var parent_node=$("#src-result");
                    var projectid=parent_node.find(".select-1 option:selected").val(),
                    class1id=parent_node.find(".select-2 option:selected").val(),
                    class2id=parent_node.find(".select-3 option:selected").val(),
                    class3id=parent_node.find(".select-4 option:selected").val();
                    projectid=(projectid>0)?projectid:projectid="";
                    class1id=(class1id>0)?class1id:class1id="";
                    class2id=(class2id>0)?class2id:class2id="";
                    class3id=(class3id>0)?class3id:class3id="";
                }else{
                    projectid=(projectid>0)?projectid:projectid="0";
                    class1id=(class1id>0)?class1id:class1id="0";
                    class2id=(class2id>0)?class2id:class2id="0";
                    class3id=(class3id>0)?class3id:class3id="0";
                }
                var pageNum= $(document).find(".fenye .currpage").attr("title");
                if(pageNum>1){
                  pageNum-- ;
                }else{
                  return false;
                }
                clearHtml("#projet-tbl");
                get_Ajax(pageNum,projectid,class1id,class2id,class3id,mobilebrand,casename);
                // console.log(pageNum+"projectid:"+projectid+"class1id:"+class1id+"class2id:"+class2id+"class3id:"+class3id+"num:"+pageNum+"casename:"+casename+"mobilebrand:"+mobilebrand);      
          });
            $('body').on("click", ".first-page", function(){
              if($(document).find("#src-result .btn-result").attr("data")=="true"){
                    // console.log("点了");
                    var parent_node=$("#src-result");
                    var projectid=parent_node.find(".select-1 option:selected").val(),
                    class1id=parent_node.find(".select-2 option:selected").val(),
                    class2id=parent_node.find(".select-3 option:selected").val(),
                    class3id=parent_node.find(".select-4 option:selected").val();
                    projectid=(projectid>0)?projectid:projectid="";
                    class1id=(class1id>0)?class1id:class1id="";
                    class2id=(class2id>0)?class2id:class2id="";
                    class3id=(class3id>0)?class3id:class3id="";
                  }else{
                    projectid=(projectid>0)?projectid:projectid="0";
                    class1id=(class1id>0)?class1id:class1id="0";
                    class2id=(class2id>0)?class2id:class2id="0";
                    class3id=(class3id>0)?class3id:class3id="0";
                }
                if(pageNum=="1"){
                      return false;
                  }else{
                      pageNum=firstPage
                      clearHtml("#projet-tbl");
                      get_Ajax(pageNum,projectid,class1id,class2id,class3id,mobilebrand,casename);
                    // console.log(pageNum+"projectid:"+projectid+"class1id:"+class1id+"class2id:"+class2id+"class3id:"+class3id+"num:"+pageNum+"casename:"+casename+"mobilebrand:"+mobilebrand);
                  }
            });
            $('body').on("click", ".last-page", function(){
              if($(document).find("#src-result .btn-result").attr("data")=="true"){
                    // console.log("点了");
                    var parent_node=$("#src-result");
                    var projectid=parent_node.find(".select-1 option:selected").val(),
                    class1id=parent_node.find(".select-2 option:selected").val(),
                    class2id=parent_node.find(".select-3 option:selected").val(),
                    class3id=parent_node.find(".select-4 option:selected").val();
                    projectid=(projectid>0)?projectid:projectid="";
                    class1id=(class1id>0)?class1id:class1id="";
                    class2id=(class2id>0)?class2id:class2id="";
                    class3id=(class3id>0)?class3id:class3id="";
                }else{
                    projectid=(projectid>0)?projectid:projectid="0";
                    class1id=(class1id>0)?class1id:class1id="0";
                    class2id=(class2id>0)?class2id:class2id="0";
                    class3id=(class3id>0)?class3id:class3id="0";
                }
                if(pageNum==pageCount){
                    return false;
                }else{
                  pageNum=lastPage;
                }
                clearHtml("#projet-tbl");
                get_Ajax(pageNum,projectid,class1id,class2id,class3id,mobilebrand,casename);
                // console.log(pageNum+"projectid:"+projectid+"class1id:"+class1id+"class2id:"+class2id+"class3id:"+class3id+"num:"+pageNum+"casename:"+casename+"mobilebrand:"+mobilebrand);
            });
            

            /***清空* */
            $("#src-result .btn-clear").click(function(){
                $("#src-result").find("input").val("");
                var project_name=""
                choos_option(project_name);
                $("#src-result .select-2").html('<option value="0">请选择</option>"')
                $("#src-result .select-3").html('<option value="0">请选择</option>"')
                $("#src-result .select-4").html('<option value="0">请选择</option>"')
            });
            ///点击进行分类
           $(document).on("click", "#rest_class", function(){  
             var dom_tr =$(document).find(".tabl-class").find(".menu-radio-checked").parent().parent();
             var idlist="";
             for (var i = 0; i < dom_tr.length; i++) {
                  idlist += $(dom_tr[i]).attr("data-id")+",";
             }
             idnum=idlist.substr(0,idlist.length-1);
             var isture=$(document).find(".menu-radio").hasClass("menu-radio-checked");
             if(isture){
                $("#dlg-class").show();
                $(".mark").show(); 
                $("#dlg-class .btn-submit").attr("data-id",idnum);
             }else{
                $(".m-toast").css("display","block");
                $(".mark").css("display","block")
                var t=setTimeout( function(){
                $(".m-toast").css("display","none");
                $(".mark").css("display","none")
                }, 2000);
                return false;
             }      
           });
   
           /**点击全选事件*/
           $(document).on("click",".choose-all",function(){
              var data=$(this).attr("data");
              // console.log(data);
              if(data==1){
                $(this).attr('data', 0).attr('title','全选');
                $(this).parents(".tabl-class").find(".menu-radio").addClass("menu-radio-checked");
              }else{
                $(this).attr('data', 1).attr('title','取消全选');
                $(this).parents(".tabl-class").find(".menu-radio").removeClass("menu-radio-checked");
              }
            })
            $(document).on("click",".tabl-class tr",function(){
              var $dome_check =$(this).find(".menu-radio");
               if($dome_check.hasClass("menu-radio-checked")){
                  $dome_check.removeClass("menu-radio-checked");
               }else{
                  $dome_check.addClass("menu-radio-checked");
               }
            })
           /*点击关闭按钮*/
           $(".dlg-box .close").click(function(){
            $(".dlg-box").hide();
            $(".mark").hide();
            $(".btn-normal").removeClass("btn-hover");
          });
          // $(document).on('click', '.btn-box .btn-normal', function () {
          //     $(".btn-normal").removeClass("btn-hover");
          // });
          $(document).on('mouseout', '.btn-normal', function () {
            $(".btn-normal").removeClass("btn-hover");
            $(this).removeClass("btn-hover");
          });
          $(".dlg-box .btn-cancel").click(function(){
            $(".dlg-box").hide();
            $(".mark").hide();
          })
          $(document).on('click', '.btn-normal', function () {
            $(".btn-normal").removeClass("btn-hover");
            $(this).addClass("btn-hover");
          });
          /***side js** */
          $(".list li").click(function(){
            $(this).siblings().removeClass("curr");
            $(this).addClass("curr");
          });
          /****搜索按钮***/
          $("#src-result .btn-result").click(function(){
                  var parent_node=$(this).parents("#src-result");
                  var projectid=parent_node.find(".select-1 option:selected").val(),
                    class1id=parent_node.find(".select-2 option:selected").val(),
                    class2id=parent_node.find(".select-3 option:selected").val(),
                    class3id=parent_node.find(".select-4 option:selected").val();
                    projectid=(projectid>0)?projectid:projectid="";
                    class1id=(class1id>0)?class1id:class1id="";
                    class2id=(class2id>0)?class2id:class2id="";
                    class3id=(class3id>0)?class3id:class3id="";
                    var pageNum = 1;
                    var casename_val=$('body').find("#src-result").find(".ipt-txt").eq(1).val();
                    var mobile_val=$('body').find("#src-result").find(".ipt-txt").eq(0).val();
                    casename =  nameTrans(casename_val);
                    mobilebrand= nameTrans(mobile_val);
                    $(this).attr("data","true");
                    clearHtml("#projet-tbl");
                    // console.log("projectid:"+projectid+"class1id:"+class1id+"class2id:"+class2id+"class3id:"+class3id+"num:"+pageNum+"casename:"+casename+"mobilebrand:"+mobilebrand);
                    get_Ajax(pageNum,projectid,class1id,class2id,class3id,mobilebrand,casename);
          });
          $("#dlg-class .btn-submit").click(function(){
              var parent_node=$(this).parents("#dlg-class");
              var projectid =parent_node.find(".select-1 option:selected").val(),
              class1id=parent_node.find(".select-2 option:selected").val(),
              class2id=parent_node.find(".select-3 option:selected").val(),
              class3id=parent_node.find(".select-4 option:selected").val(),
              id=$(this).attr("data-id");

              update_case(projectid,class1id,class2id,class3id,id);
              $("#dlg-class").hide();
              $(".mark").hide(); 
              $(".menu-radio").removeClass("menu-radio-checked");
              // console.log("projectid"+projectid+",class1id"+class1id+",class2id"+class2id+",class3id"+class3id+",id"+id);
          });
        },
        chooseClassify: function(){
        },
        // tost:function(){
        //       $("#m-toast").css("display","block");
        //       var t=setTimeout( function(){
        //         $("#m-toast").css("display","none")
        //         }, 5000);
        // }
       
    };
caseList.init();


/**翻页的事件**/ 
function fenye(num){
               // var pagenum=$(".fenye .currpage").attr("title");
               // var pagecont=$(".fenye .pageCount").attr("title");
               // if(pagenum<pagecont){
               //    num++
               // }else if(pagenum>1){
               //    num--
               // }else if(pagenum=="1"){
               //    num=pagenum;
               // }else if(pagenum==pagecont){
               //    num=pagenum;
               // }else{
               //  return false;
               // }
}
function get_Ajax(num,projectid,class1id,class2id,class3id,mobilebrand,casename){ 
  var url= "http://10.58.56.252:8080/auto-android-case/case/jsonp/caseService?callback=sss&pagenum="+num+"&size=10&projectid="+projectid+"&class1id="+class1id+"&class2id="+class2id+"&class3id="+class3id+"&mobilebrand="+mobilebrand+"&casename="+casename;
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
                      var html = '<tr><th width="60"><span class="choose-all" checked="false" data="1">全选 </span></th><th width="440">名称</th><th>case所属位置</th></tr>';
                      for(var i=0;i<dataList.length;i++){
                        dataList[i].project=(typeof dataList[i].project!=="undefined")?dataList[i].project:dataList[i].projectid="<b>暂无</b>";
                        dataList[i].class1name=(typeof dataList[i].class1name!=="undefined")?dataList[i].class1name:dataList[i].class1name="<b>暂无</b>";
                        dataList[i].class2name=(typeof dataList[i].class2name!=="undefined")?dataList[i].class2name:dataList[i].class2name="<b>暂无</b>";
                        dataList[i].class3name=(typeof dataList[i].class3name!=="undefined")?dataList[i].class3name:dataList[i].class3name="<b>暂无</b>";
                        html += '<tr data-projectid="'+dataList[i].projectid+'" data-class1id="'+dataList[i].class1id+'" data-class2id="'+dataList[i].class2id+'" data-class3id="'+dataList[i].class3id+'" data-id="'+dataList[i].id+'"><td><span class="menu-radio"></span></td><td>' + dataList[i].casename + '</td><td>'+dataList[i].project+'>'+dataList[i].class1name+'>'+dataList[i].class2name+'>'+dataList[i].class3name+'</td></tr>';
                      }   
                 }else{
                  //  console.log("暂无数据");
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
                $('body').find('.goto-page').text(pageNum);
                $('body').find('.currpage').text("当前"+pageNum+"页");
                $('body').find('.currpage').attr("title",pageNum);
                $('body').find('.pageCount').text("共"+pageCount+"页");
                $('body').find('.pageCount').attr("title",pageCount);     
            },
             error:function(){
                  // console.log('请求ajax出错');
             }      
    })
}
function success(){}
/*ajax请求-更新项目名*/
function update_case(projectid,class1id,class2id,class3id,id){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/case/jsonp/update/caseService?callback=sss&projectid="+projectid+"&class1id="+class1id+"&class2id="+class2id+"&class3id="+class3id+"&id="+id,
             dataType : "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"sss",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
              // parent.document.location.reload();
            },
             error:function(){
                //  console.log('请求地址或参数不对');
             }      
    })
}

/*ajax请求-添加**/
function choos_option(project_name){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/project/jsonp/projectService?callback=bbb&pagenum=1&size=999&project="+project_name,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
              $("#src-result .select-1").html('<option value="0">请选择</option>"')
              $("#src-result .select-2").html('<option value="0">请选择</option>"')
              $("#src-result .select-3").html('<option value="0">请选择</option>"')
              $("#src-result .select-4").html('<option value="0">请选择</option>"')
              // loading_select(data);
              var dataList = data.list;
              var html = '';
              for(var i=0;i<dataList.length;i++){
                html +='<option value="'+dataList[i].id+'">'+dataList[i].project+' </option>'
              }
              var parent=$("#src-result .select-1");
              parent.append(html);
              // console.log('项目加载');
            },
             error:function(){ 
                //  console.log('项目报错');
             }      
    })
}

function chang_project_option(projectid,classname){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class1/jsonp/class1Service?callback=aaa&pagenum=1&size=999&projectid="+projectid+"&classname="+classname,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
              $("#src-result .select-2").html('<option value="0">请选择</option>"')
              $("#src-result .select-3").html('<option value="0">请选择</option>"')
              $("#src-result .select-4").html('<option value="0">请选择</option>"')
              var dataList = data.list;
              var html = '';
              for(var i=0;i<dataList.length;i++){
                html +='<option value="'+dataList[i].id+'">'+dataList[i].classname+' </option>'
              }
              var parent=$("#src-result .select-2");
              parent.append(html);
            },
             error:function(){
                //  console.log('一级分类报错');
             }      
    })
}

function chang_class_option(class1id,classname){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class2/jsonp/class2Service?callback=aaa&pagenum=1&size=999&class1id="+class1id+"&classname="+classname,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
              $("#src-result .select-3").html('<option value="0">请选择</option>"')
              $("#src-result .select-4").html('<option value="0">请选择</option>"')
                var dataList = data.list;
                var html = '';
                for(var i=0;i<dataList.length;i++){
                  html +='<option value="'+dataList[i].id+'">'+dataList[i].classname+' </option>'
                }
                var parent=$("#src-result .select-3");
                parent.append(html);
            },
             error:function(){
                //  console.log('二级分类报错');
             }      
    })
}
function chang_class2_option(class2id,classname){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class3/jsonp/class3Service?callback=aaa&pagenum=1&size=999&class2id="+class2id+"&classname="+classname,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){ 
              $("#src-result .select-4").html('<option value="0">请选择</option>"')
                var dataList = data.list;
                var html = '';
                for(var i=0;i<dataList.length;i++){
                  html +='<option value="'+dataList[i].id+'">'+dataList[i].classname+' </option>'
                }
                var parent=$("#src-result .select-4");
                parent.append(html);
            },
             error:function(){
                //  console.log('三级分类报错');
             }      
    })
}
/**进行分类**/
function class_option(project_name){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/project/jsonp/projectService?callback=bbb&pagenum=1&size=999&project="+project_name,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
              $("#dlg-class .select-1").html('<option value="0">请选择</option>"')
              $("#dlg-class .select-2").html('<option value="0">请选择</option>"')
              $("#dlg-class .select-3").html('<option value="0">请选择</option>"')
              $("#dlg-class .select-4").html('<option value="0">请选择</option>"')
              var dataList = data.list;
              var html = '';
              for(var i=0;i<dataList.length;i++){
                html +='<option value="'+dataList[i].id+'">'+dataList[i].project+' </option>'
              }
              var parent=$("#dlg-class .select-1");
              parent.append(html);
              // console.log('项目加载2');
            },
             error:function(){ 
                 // console.log('项目报错');
             }      
    })
}
function class_option_1(projectid,classname){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class1/jsonp/class1Service?callback=aaa&pagenum=1&size=999&projectid="+projectid+"&classname="+classname,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
              $("#dlg-class .select-2").html('<option value="0">请选择</option>"')
              $("#dlg-class .select-3").html('<option value="0">请选择</option>"')
              $("#dlg-class .select-4").html('<option value="0">请选择</option>"')
              var dataList = data.list;
              var html = '';
              for(var i=0;i<dataList.length;i++){
                html +='<option value="'+dataList[i].id+'">'+dataList[i].classname+' </option>'
              }
              var parent=$("#dlg-class .select-2");
              parent.append(html);
            },
             error:function(){
                //  console.log('一级分类报错');
             }      
    })
}

function class_option_2(class1id,classname){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class2/jsonp/class2Service?callback=aaa&pagenum=1&size=999&class1id="+class1id+"&classname="+classname,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){  
              $("#dlg-class .select-3").html('<option value="0">请选择</option>"')
              $("#dlg-class .select-4").html('<option value="0">请选择</option>"')
                var dataList = data.list;
                var html = '';
                for(var i=0;i<dataList.length;i++){
                  html +='<option value="'+dataList[i].id+'">'+dataList[i].classname+' </option>'
                }
                var parent=$("#dlg-class .select-3");
                parent.append(html);
            },
             error:function(){
                //  console.log('二级分类报错');
             }      
    })
}
function class_option_3(class2id,classname){
  $.ajax({
             type : "get",
             async:false,
             url : "http://10.58.56.252:8080/auto-android-case/class3/jsonp/class3Service?callback=aaa&pagenum=1&size=999&class2id="+class2id+"&classname="+classname,
             dataType : "jsonp",
             // jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            // jsonpCallback:"success",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){ 
              $("#dlg-class .select-4").html('<option value="0">请选择</option>"')
                var dataList = data.list;
                var html = '';
                for(var i=0;i<dataList.length;i++){
                  html +='<option value="'+dataList[i].id+'">'+dataList[i].classname+' </option>'
                }
                var parent=$("#dlg-class .select-4");
                parent.append(html);
            },
             error:function(){
                //  console.log('三级分类报错');
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

