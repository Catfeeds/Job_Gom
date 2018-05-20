var fetch = require('io/fetch');
var url = require('io/url');
var cateHtml = require('./categoryArray.tpl');
var dataListAry = [];
var $categoryNameUl = $("[data-node=categoryName]");
var $addMore = $("[data-node=addMordList]");
var $circleBox = $("[data-node=circleBox]");
var $load = $("[data-node=load]");
var $loading = $("[data-node=loading]");
var $noload = $("[data-node=noLoad]");
var pcImage = $_CONFIG['imgpath'];
var group_domain  = $_CONFIG['group_domain'];
	$load.addClass("hide");
	$loading.addClass("hide");
	$noload.addClass("hide");
	
var init = function (){

	//圈子列表浮动
	var circleNav = $("[data-node=circleNav]");
	var top = parseInt(circleNav.position().top);
	$(window).scroll(function(){
		var circleNav = $("[data-node=circleNav]");
		if($(this).scrollTop() >top){
			circleNav.css({
				"position":"fixed",
				"z-index":100
			});
			circleNav.addClass("topLy");
		}

		if($(this).scrollTop() <top){
			circleNav.css({
				"position":"relative"		
			});
			circleNav.removeClass("topLy");
		}
	});
	//加载－－圈子分类
	categoryName();
	var currentClick= false;
	recommendCircle(1,20,41,currentClick);

	$categoryNameUl.on("click","li",function(){
		var click = false;
		var $this = $(this);
		if(!$this.children("a").hasClass("active")){
			$categoryNameUl.children("li").children("a").removeClass("active");
			$this.children("a").addClass("active"); 
			var id = $this.attr("data-id");
			if(id==="41"){
				recommendCircle(1,20,41,click);
			}else{
				listCategory(1,20,id,click);
			}
		}
		$load.attr("data-loadId",id).attr("data-page",1);		
	});

	$load.on("click",function(){

		var page = parseInt($(this).attr("data-page"))+1;
		var id = $(this).attr("data-loadId");
		var click = true;
		if(id==="41"){
				recommendCircle(page,20,41,click);
			}else{
				listCategory(page,20,id,click);
		}
		$(this).attr("data-page",page)
		console.log(page);
	});

	// 收起，显示 
	$addMore.on("click",function(){
		if(!$categoryNameUl.hasClass("h-auto")){
			$categoryNameUl.addClass("h-auto");
			$(this).children("span").html("收起");
			$(this).children("em").addClass("icon-up").removeClass("icon-down");
		}else{
			$categoryNameUl.removeClass("h-auto");
			$(this).children("span").html("更多＋");
			$(this).children("em").addClass("icon-down").removeClass("icon-up");
		}
		
	});

}
// 
var listCategory = function(page,pagesize,id,click){
	var click = click;
	$load.addClass("hide").removeClass("show");
	$noload.addClass("hide").removeClass("show");
	if(click){
			$loading.addClass("show").removeClass("hide");
			$load.addClass("hide").removeClass("show");
		}

	fetch.post(url.get('groupLists')+'?type=1&page='+page+'&pagesize='+pagesize+'&categoryid='+id).then(function(data){

    	if(data.success){
    		if(click){
    			$loading.addClass("show").removeClass("hide");
    			$load.addClass("hide").removeClass("show");
    		}else{
    			$circleBox.empty();
    		}
   			dataListAry=[];
   			var itemDatas = data.data.resultList;
   			//console.log(itemDatas);
   			for(var i =0; i< 20; i++){
   				if(itemDatas.length <20){
   					
	   				if(i < itemDatas.length){
	   					
	   					var msg = { 
		   					"groupCategoryName" : itemDatas[i].group.category.name,
		   					"groupIcon" : itemDatas[i].group.icon,
		   					"groupId" : itemDatas[i].group.id,
		   					"groupIntro" : itemDatas[i].group.introduction,
		   					"groupMembers" : itemDatas[i].group.memberQuantity,
		   					"groupName" : itemDatas[i].group.name,
		   					"topicNum" :  itemDatas[i].group.topicQuantity,
		   					"classShow" :"show classColor"
		   					//"classBack" :"classColor"
	   					}
	   				}else if(i == itemDatas.length){
	   					var msg = {
		   					"groupCategoryName" : "创建圈子", 
		   					"groupIcon" : pcImage+"/images/public/circle-default.png",
		   					"groupId" : "",
		   					"groupIntro" : "",
		   					"groupMembers" : "",
		   					"groupName" : "创建自己感兴趣的圈子",
		   					"topicNum" :  "",
		   					"classShow" :"show classCreate"
		   					//"classBack" :"classCreate"
	   					}
	   				}else{
	   					var msg = {
		   					"groupCategoryName" : "", 
		   					"groupIcon" : "",
		   					"groupId" : "",
		   					"groupIntro" : "",
		   					"groupMembers" : "",
		   					"groupName" : "",
		   					"topicNum" :  "",
		   					"classShow" :"hide classColor"
		   					//"classBack" :"classColor"
	   					}
	   				}
   				}else{
   					var msg = {
	   					"groupCategoryName" : itemDatas[i].group.category.name, 
	   					"groupIcon" : itemDatas[i].group.icon,
	   					"groupId" : itemDatas[i].group.id,
	   					"groupIntro" : itemDatas[i].group.introduction,
	   					"groupMembers" : itemDatas[i].group.memberQuantity,
	   					"groupName" : itemDatas[i].group.name,
	   					"topicNum" :  itemDatas[i].group.topicQuantity,
	   					"classShow" :"show classColor"
   					}
   				}
   				
   				if(!msg.groupIcon){
   					msg.groupIcon =  pcImage+"/images/public/circle-default.png";
   				}
   				dataListAry.push(msg);

   			}
   			//console.log(dataListAry);
   			var addDiv = {
   				dataListAry:dataListAry
   			}
   			if(!click){
   				$circleBox.empty();
   			}
   			var item = cateHtml(addDiv);
   			$circleBox.append(item);
   			
   			var $classCreate = $(".classCreate");
   		
   			$classCreate.removeClass("big-red1 big-blue big-red2 small-red1 small-red2  small-green2 small-blue small-green1 small-yellow1 big-yellow1 small-yellow2 ");
   			$classCreate.children("p").empty();
   			$classCreate.children("p").append("<div>没有感兴趣的圈子？</div><div>去创建一个吧！</div>");
   			$classCreate.children(".hover-mask").children("a").children("span").removeClass("tag").addClass("pc-btn create-btn");
   			$classCreate.children(".hover-mask").children("a").children("ul").remove();
   			$classCreate.children(".hover-mask").children("a").attr("href","/index/create");
   			$loading.addClass("hide").removeClass("show");
   			if(itemDatas.length > 19  ){
   				$load.addClass("show").removeClass("hide");
   			}else if(itemDatas.length < 1){
   				$noload.addClass("show").removeClass("hide");
   			}
   			
   			
    	}
    });
}

//推荐圈子
var recommendCircle = function(page,pagesize,id,click){
	$load.addClass("hide").removeClass("show");
	$noload.addClass("hide").removeClass("show");
	var click = click;
	if(click){
			$loading.addClass("show").removeClass("hide");
			$load.addClass("hide").removeClass("show");
		}
	fetch.post(url.get('recommendCircle')+'?page='+page+'&pagesize='+pagesize+'&metaid='+id).then(function(data){
    
    
    	if(data.success){
    		if(click){
    			$loading.addClass("show").removeClass("hide");
    			$load.addClass("hide").removeClass("show");
    		}else{
    			$circleBox.empty();
    		}
   			dataListAry=[];
   			var itemDatas = data.data.list[0].itemData;
   			for(var i =0; i< 20; i++){
   				if(itemDatas.length <20){
	   				if(i < itemDatas.length){
	   					var msg = {
		   					"groupCategoryName" : itemDatas[i].groupCategoryName, 
		   					"groupIcon" : itemDatas[i].groupIcon,
		   					"groupId" : itemDatas[i].groupId,
		   					"groupIntro" : itemDatas[i].groupIntro,
		   					"groupMembers" : itemDatas[i].groupMembers,
		   					"groupName" : itemDatas[i].groupName,
		   					"topicNum" :  itemDatas[i].topicNum,
		   					"classShow" :"show"
	   					}
	   				}else if(i == itemDatas.length){
	   					var msg = {
		   					"groupCategoryName" : "创建圈子", 
		   					"groupIcon" : pcImage+"/images/public/circle-default.png",
		   					"groupId" : "",
		   					"groupIntro" : "",
		   					"groupMembers" : "",
		   					"groupName" : "创建自己感兴趣的圈子",
		   					"topicNum" :  "",
		   					"classShow" :"show classCreate"
		   					//"classBack" :"classCreate"
	   					}
	   				}else{

	   					var msg = {
		   					"groupCategoryName" : "", 
		   					"groupIcon" : "",
		   					"groupId" : "",
		   					"groupIntro" : "",
		   					"groupMembers" : "",
		   					"groupName" : "",
		   					"topicNum" :  "",
		   					"classShow" :"hide"
	   					}
	   				}

   				}else{
   					var msg = {
	   					"groupCategoryName" : itemDatas[i].groupCategoryName, 
	   					"groupIcon" : itemDatas[i].groupIcon,
	   					"groupId" : itemDatas[i].groupId,
	   					"groupIntro" : itemDatas[i].groupIntro,
	   					"groupMembers" : itemDatas[i].groupMembers,
	   					"groupName" : itemDatas[i].groupName,
	   					"topicNum" :  itemDatas[i].topicNum,
	   					"classShow" :"show"
   					}
   				}
   				
   				if(!msg.groupIcon){
   					msg.groupIcon =  pcImage+"/images/public/circle-default.png";
   				}
   				dataListAry.push(msg);

   			}
   			var addDiv = {
   				dataListAry:dataListAry
   			}
   			if(!click){
   				$circleBox.empty();
   			}
   			var item = cateHtml(addDiv);
   			$circleBox.append(item);
   			$load.attr("data-loadId",id).attr("data-page",page);
 
   			var $classCreate = $(".classCreate");
   			$classCreate.removeClass("big-red1  big-blue big-red2  big-yellow1 small-red1 small-red2 small-blue small-green1  small-green2 small-yellow1  small-yellow2 ");
   			$classCreate.children("p").empty();
   			$classCreate.children("p").append("<div>没有感兴趣的圈子？</div><div>去创建一个吧！</div>");
   			$classCreate.children(".hover-mask").children("a").children("span").removeClass("tag").addClass("pc-btn create-btn");
   			$classCreate.children(".hover-mask").children("a").children("ul").remove();
   			$classCreate.children(".hover-mask").children("a").attr("href","/index/create");
   			$loading.addClass("hide").removeClass("show");
   			if(itemDatas.length > 19  ){
   				$load.addClass("show").removeClass("hide");
   			}else if(itemDatas.length < 1){
   				$noload.addClass("show").removeClass("hide");
   			}
    	}
    });
}

//圈子分类集合
var categoryName = function(){
	var html='<li data-id ="41"><a href="javascript:;" class="active">推荐</a></li>';
	fetch.post(url.get('categories')).then(function(data){
    	if(data.success){
   			var array = data.data;
   			for(var i = 0; i <array.length; i ++){
   				var icon = array[i].icon;
   				var id = array[i].id;
   				var name  = array[i].name;
   				html+='<li data-id='+id+'><a href="javascript:;">'+name+'</a></li>'
   			}	
   			$categoryNameUl.empty();
   			$categoryNameUl.append(html);
    	}
    });
}

module.exports= {
	init :init
}




