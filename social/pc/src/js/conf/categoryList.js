webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var listCategory = __webpack_require__(92);
	var checkCreateStatus = __webpack_require__(94);
	listCategory.init();
	checkCreateStatus.init();
	// 埋点
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('groupList');

/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var loginPop = __webpack_require__(3); //登录弹窗
	var checkLoginStatus = __webpack_require__(47);
	var cateHtml = __webpack_require__(93);
	var dataListAry = [];
	var $categoryNameUl = $("[data-node=categoryName]");
	var $addMore = $("[data-node=addMordList]");
	var $circleBox = $("[data-node=circleBox]");
	var $load = $("[data-node=load]");
	var $loading = $("[data-node=loading]");
	var $noload = $("[data-node=noLoad]");
	var pcImage = $_CONFIG['imgpath'];
	var group_domain = $_CONFIG['group_domain'];
	$load.addClass("hide");
	$loading.addClass("hide");
	$noload.addClass("hide");

	var init = function init() {

	    //圈子列表浮动
	    var circleNav = $("[data-node=circleNav]");
	    var top = parseInt(circleNav.position().top);
	    $(window).scroll(function () {
	        var circleNav = $("[data-node=circleNav]");
	        if ($(this).scrollTop() > top) {
	            circleNav.css({
	                "position": "fixed",
	                "z-index": 100
	            });
	            circleNav.addClass("topLy");
	        }

	        if ($(this).scrollTop() < top) {
	            circleNav.css({
	                "position": "relative"
	            });
	            circleNav.removeClass("topLy");
	        }
	    });
	    //加载－－圈子分类
	    categoryName();
	    var currentClick = false;
	    recommendCircle(1, 20, 41, currentClick);

	    $categoryNameUl.on("click", "li", function () {
	        var click = false;
	        var $this = $(this);
	        if (!$this.children("a").hasClass("active")) {
	            $categoryNameUl.children("li").children("a").removeClass("active");
	            $this.children("a").addClass("active");
	            var id = $this.attr("data-id");
	            if (id === "41") {
	                recommendCircle(1, 20, 41, click);
	            } else {
	                listCategory(1, 20, id, click);
	            }
	        }
	        $load.attr("data-loadId", id).attr("data-page", 1);
	    });

	    $load.on("click", function () {

	        var page = parseInt($(this).attr("data-page")) + 1;
	        var id = $(this).attr("data-loadId");
	        var click = true;
	        if (id === "41") {
	            recommendCircle(page, 20, 41, click);
	        } else {
	            listCategory(page, 20, id, click);
	        }
	        $(this).attr("data-page", page);
	        console.log(page);
	    });

	    // 收起，显示
	    $addMore.on("click", function () {
	        if (!$categoryNameUl.hasClass("h-auto")) {
	            $categoryNameUl.addClass("h-auto");
	            $(this).children("span").html("收起");
	            $(this).children("em").addClass("iconn-1").removeClass("iconn-2");
	        } else {
	            $categoryNameUl.removeClass("h-auto");
	            $(this).children("span").html("更多");
	            $(this).children("em").addClass("iconn-2").removeClass("iconn-1");
	        }
	    });

	    $("body").on("click", '[data-node=newCreat]', function () {
	        if (!checkLoginStatus()) {
	            loginPop();
	            return false;
	        }
	        $(this).attr("href", "/index/create");
	    });
	};
	//
	var listCategory = function listCategory(page, pagesize, id, click) {
	    var click = click;
	    $load.addClass("hide").removeClass("show");
	    $noload.addClass("hide").removeClass("show");
	    if (click) {
	        $loading.addClass("show").removeClass("hide");
	        $load.addClass("hide").removeClass("show");
	    }

	    fetch.post(url.get('groupLists') + '?type=1&page=' + page + '&pagesize=' + pagesize + '&categoryid=' + id).then(function (data) {

	        if (data.success) {
	            if (click) {
	                $loading.addClass("show").removeClass("hide");
	                $load.addClass("hide").removeClass("show");
	            } else {
	                $circleBox.empty();
	            }
	            dataListAry = [];
	            var itemDatas = data.data.resultList;
	            //console.log(itemDatas);
	            for (var i = 0; i < 20; i++) {
	                if (itemDatas.length < 20) {

	                    if (i < itemDatas.length) {

	                        var msg = {
	                            "groupCategoryName": itemDatas[i].group.category.name,
	                            "groupIcon": itemDatas[i].group.icon,
	                            "groupId": itemDatas[i].group.id,
	                            "groupIntro": itemDatas[i].group.introduction,
	                            "groupMembers": itemDatas[i].group.memberQuantity,
	                            "groupName": itemDatas[i].group.name,
	                            "topicNum": itemDatas[i].group.topicQuantity,
	                            "classShow": "show classColor"
	                            //"classBack" :"classColor"
	                        };
	                    } else if (i == itemDatas.length) {
	                        var msg = {
	                            "groupCategoryName": "创建圈子",
	                            "groupIcon": pcImage + "/images/public/circle-default.png",
	                            "groupId": "",
	                            "groupIntro": "",
	                            "groupMembers": "",
	                            "groupName": "创建自己感兴趣的圈子",
	                            "topicNum": "",
	                            "classShow": "show classCreate"
	                            //"classBack" :"classCreate"
	                        };
	                    } else {
	                        var msg = {
	                            "groupCategoryName": "",
	                            "groupIcon": "",
	                            "groupId": "",
	                            "groupIntro": "",
	                            "groupMembers": "",
	                            "groupName": "",
	                            "topicNum": "",
	                            "classShow": "hide classColor"
	                            //"classBack" :"classColor"
	                        };
	                    }
	                } else {
	                    var msg = {
	                        "groupCategoryName": itemDatas[i].group.category.name,
	                        "groupIcon": itemDatas[i].group.icon,
	                        "groupId": itemDatas[i].group.id,
	                        "groupIntro": itemDatas[i].group.introduction,
	                        "groupMembers": itemDatas[i].group.memberQuantity,
	                        "groupName": itemDatas[i].group.name,
	                        "topicNum": itemDatas[i].group.topicQuantity,
	                        "classShow": "show classColor"
	                    };
	                }

	                if (!msg.groupIcon) {
	                    msg.groupIcon = pcImage + "/images/public/circle-default.png";
	                }
	                dataListAry.push(msg);
	            }
	            //console.log(dataListAry);
	            var addDiv = {
	                dataListAry: dataListAry
	            };
	            if (!click) {
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
	            $classCreate.children(".hover-mask").children("a").attr("href", "javascript:void(0)");
	            $classCreate.children(".hover-mask").children("a").attr("data-node", "newCreat");
	            $loading.addClass("hide").removeClass("show");
	            if (itemDatas.length > 19) {
	                $load.addClass("show").removeClass("hide");
	            } else if (itemDatas.length < 1) {
	                $noload.addClass("show").removeClass("hide");
	            }
	        }
	    });
	};

	//推荐圈子
	var recommendCircle = function recommendCircle(page, pagesize, id, click) {
	    $load.addClass("hide").removeClass("show");
	    $noload.addClass("hide").removeClass("show");
	    var click = click;
	    if (click) {
	        $loading.addClass("show").removeClass("hide");
	        $load.addClass("hide").removeClass("show");
	    }
	    fetch.post(url.get('recommendCircle') + '?page=' + page + '&pagesize=' + pagesize + '&metaid=' + id).then(function (data) {

	        if (data.success) {
	            if (click) {
	                $loading.addClass("show").removeClass("hide");
	                $load.addClass("hide").removeClass("show");
	            } else {
	                $circleBox.empty();
	            }
	            dataListAry = [];
	            var itemDatas = data.data.list[0].itemData;
	            for (var i = 0; i < 20; i++) {
	                if (itemDatas.length < 20) {
	                    if (i < itemDatas.length) {
	                        var msg = {
	                            "groupCategoryName": itemDatas[i].groupCategoryName,
	                            "groupIcon": itemDatas[i].groupIcon,
	                            "groupId": itemDatas[i].groupId,
	                            "groupIntro": itemDatas[i].groupIntro,
	                            "groupMembers": itemDatas[i].groupMembers,
	                            "groupName": itemDatas[i].groupName,
	                            "topicNum": itemDatas[i].topicNum,
	                            "classShow": "show"
	                        };
	                    } else if (i == itemDatas.length) {
	                        var msg = {
	                            "groupCategoryName": "创建圈子",
	                            "groupIcon": pcImage + "/images/public/circle-default.png",
	                            "groupId": "",
	                            "groupIntro": "",
	                            "groupMembers": "",
	                            "groupName": "创建自己感兴趣的圈子",
	                            "topicNum": "",
	                            "classShow": "show classCreate"
	                            //"classBack" :"classCreate"
	                        };
	                    } else {

	                        var msg = {
	                            "groupCategoryName": "",
	                            "groupIcon": "",
	                            "groupId": "",
	                            "groupIntro": "",
	                            "groupMembers": "",
	                            "groupName": "",
	                            "topicNum": "",
	                            "classShow": "hide"
	                        };
	                    }
	                } else {
	                    var msg = {
	                        "groupCategoryName": itemDatas[i].groupCategoryName,
	                        "groupIcon": itemDatas[i].groupIcon,
	                        "groupId": itemDatas[i].groupId,
	                        "groupIntro": itemDatas[i].groupIntro,
	                        "groupMembers": itemDatas[i].groupMembers,
	                        "groupName": itemDatas[i].groupName,
	                        "topicNum": itemDatas[i].topicNum,
	                        "classShow": "show"
	                    };
	                }

	                if (!msg.groupIcon) {
	                    msg.groupIcon = pcImage + "/images/public/circle-default.png";
	                }
	                dataListAry.push(msg);
	            }
	            var addDiv = {
	                dataListAry: dataListAry
	            };
	            if (!click) {
	                $circleBox.empty();
	            }
	            var item = cateHtml(addDiv);
	            $circleBox.append(item);
	            $load.attr("data-loadId", id).attr("data-page", page);

	            var $classCreate = $(".classCreate");
	            $classCreate.removeClass("big-red1  big-blue big-red2  big-yellow1 small-red1 small-red2 small-blue small-green1  small-green2 small-yellow1  small-yellow2 ");
	            $classCreate.children("p").empty();
	            $classCreate.children("p").append("<div>没有感兴趣的圈子？</div><div>去创建一个吧！</div>");
	            $classCreate.children(".hover-mask").children("a").children("span").removeClass("tag").addClass("pc-btn create-btn");
	            $classCreate.children(".hover-mask").children("a").children("ul").remove();
	            $classCreate.children(".hover-mask").children("a").attr("href", "javascript:void(0)");
	            $classCreate.children(".hover-mask").children("a").attr("data-node", "newCreat");
	            $loading.addClass("hide").removeClass("show");
	            if (itemDatas.length > 19) {
	                $load.addClass("show").removeClass("hide");
	            } else if (itemDatas.length < 1) {
	                $noload.addClass("show").removeClass("hide");
	            }
	        }
	    });
	};

	//圈子分类集合
	var categoryName = function categoryName() {
	    var html = '<li data-id ="41"><a href="javascript:;" class="active">推荐</a></li>';
	    fetch.post(url.get('categories')).then(function (data) {
	        if (data.success) {
	            var array = data.data;
	            for (var i = 0; i < array.length; i++) {
	                var icon = array[i].icon;
	                var id = array[i].id;
	                var name = array[i].name;
	                html += '<li data-id=' + id + '><a href="javascript:;">' + name + '</a></li>';
	            }
	            $categoryNameUl.empty();
	            $categoryNameUl.append(html);
	        }
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/categoryList/categoryArray',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,dataListAry=$data.dataListAry,$out='';$out+=' <div class="circle-square-table clearfix">  <div class="circle-big big-red1 hover ';
	$out+=$escape(dataListAry[0].classShow);
	$out+='" data-node="divNum_1"><img src="';
	$out+=$escape(dataListAry[0].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[0].groupName);
	$out+='</p> <div class="hover-type-big hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[0].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[0].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[0].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[0].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[0].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-red1 hover ';
	$out+=$escape(dataListAry[1].classShow);
	$out+='" data-node="divNum_2"><img src="';
	$out+=$escape(dataListAry[1].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[1].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[1].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[1].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[1].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[1].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[1].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-blue hover ';
	$out+=$escape(dataListAry[2].classShow);
	$out+='" data-node="divNum_2"><img src="';
	$out+=$escape(dataListAry[2].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[2].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[2].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[2].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[2].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[2].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[2].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> <div class="small-wrap">  <div class="circle-small small-green1 hover ';
	$out+=$escape(dataListAry[3].classShow);
	$out+='" data-node="divNum_3"><img src="';
	$out+=$escape(dataListAry[3].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[3].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[3].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[3].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[3].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[3].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[3].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-yellow1 hover ';
	$out+=$escape(dataListAry[4].classShow);
	$out+='" data-node="divNum_5"><img src="';
	$out+=$escape(dataListAry[4].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[4].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[4].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[4].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[4].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[4].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[4].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div> <div class="circle-square-table clearfix"> <div class="small-wrap">  <div class="circle-small small-blue hover ';
	$out+=$escape(dataListAry[5].classShow);
	$out+='" data-node="divNum_6"><img src="';
	$out+=$escape(dataListAry[5].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[5].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[5].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[5].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[5].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[5].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[5].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-red2 hover ';
	$out+=$escape(dataListAry[6].classShow);
	$out+='" data-node="divNum_7"><img src="';
	$out+=$escape(dataListAry[6].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[6].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[6].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[6].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[6].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[6].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[6].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div>  <div class="circle-big big-yellow1 hover ';
	$out+=$escape(dataListAry[7].classShow);
	$out+='" data-node="divNum_7"><img src="';
	$out+=$escape(dataListAry[7].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[7].groupName);
	$out+='</p> <div class="hover-type-big hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[7].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[7].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[7].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[7].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[7].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-yellow2 hover ';
	$out+=$escape(dataListAry[8].classShow);
	$out+='" data-node="divNum_8"><img src="';
	$out+=$escape(dataListAry[8].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[8].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[8].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[8].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[8].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[8].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[8].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-red2 hover ';
	$out+=$escape(dataListAry[9].classShow);
	$out+='" data-node="divNum_9"><img src="';
	$out+=$escape(dataListAry[9].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[9].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[9].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[9].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[9].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[9].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[9].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div> <div class="circle-square-table clearfix"> <div class="small-wrap">  <div class="circle-small small-blue hover ';
	$out+=$escape(dataListAry[10].classShow);
	$out+='" data-node="divNum_11"><img src="';
	$out+=$escape(dataListAry[10].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[10].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[10].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[10].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[10].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[10].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[10].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-green2 hover ';
	$out+=$escape(dataListAry[11].classShow);
	$out+='" data-node="divNum_12"><img src="';
	$out+=$escape(dataListAry[11].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[11].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[11].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[11].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[11].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[11].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[11].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div>  <div class="circle-big big-blue hover ';
	$out+=$escape(dataListAry[12].classShow);
	$out+='" data-node="divNum_13"><img src="';
	$out+=$escape(dataListAry[12].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[12].groupName);
	$out+='</p> <div class="hover-type-big hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[12].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[12].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[12].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[12].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[12].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-yellow2 hover ';
	$out+=$escape(dataListAry[13].classShow);
	$out+='" data-node="divNum_14"><img src="';
	$out+=$escape(dataListAry[13].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[13].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[13].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[13].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[13].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[13].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[13].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-red2 hover ';
	$out+=$escape(dataListAry[14].classShow);
	$out+='" data-node="divNum_15"><img src="';
	$out+=$escape(dataListAry[14].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[14].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[14].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[14].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[14].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[14].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[14].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div> <div class="circle-square-table clearfix">  <div class="circle-big big-red2 hover ';
	$out+=$escape(dataListAry[15].classShow);
	$out+='" data-node="divNum_16"><img src="';
	$out+=$escape(dataListAry[15].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[15].groupName);
	$out+='</p> <div class="hover-type-big hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[15].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[15].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[15].groupCategoryName);
	$out+='</span> <ul class="num clearfix"> <li><span class="count">';
	$out+=$escape(dataListAry[15].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[15].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-red1 hover ';
	$out+=$escape(dataListAry[16].classShow);
	$out+='" data-node="divNum_17"><img src="';
	$out+=$escape(dataListAry[16].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[16].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[16].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[16].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[16].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[16].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[16].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-blue hover ';
	$out+=$escape(dataListAry[17].classShow);
	$out+='" data-node="divNum_18"><img src="';
	$out+=$escape(dataListAry[17].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[17].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[17].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[17].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[17].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[17].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[17].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> <div class="small-wrap">  <div class="circle-small small-green2 hover ';
	$out+=$escape(dataListAry[18].classShow);
	$out+='" data-node="divNum_19"><img src="';
	$out+=$escape(dataListAry[18].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[18].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[18].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[18].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[18].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[18].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[18].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-yellow1 hover ';
	$out+=$escape(dataListAry[19].classShow);
	$out+='" data-node="divNum_20"><img src="';
	$out+=$escape(dataListAry[19].groupIcon);
	$out+='" class="head"> <p class="circle-title">';
	$out+=$escape(dataListAry[19].groupName);
	$out+='</p> <div class="hover-type-small hover-mask"><a href="/circle/';
	$out+=$escape(dataListAry[19].groupId);
	$out+='.html" target="_black"> <h2 class="circle-type">';
	$out+=$escape(dataListAry[19].groupName);
	$out+='</h2><span class="tag">';
	$out+=$escape(dataListAry[19].groupCategoryName);
	$out+='</span> <ul class="num"> <li><span class="count">';
	$out+=$escape(dataListAry[19].groupMembers);
	$out+='</span><span class="name">成员</span></li> <li><span class="count">';
	$out+=$escape(dataListAry[19].topicNum);
	$out+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var loginPop = __webpack_require__(3); //登录弹窗
	var checkLoginStatus = __webpack_require__(47);

	var $node = $("[data-node=createCircle]");

	var gotoPage = function gotoPage() {
		var href = $node.attr("href");
		window.location.href = href;
	};

	var init = function init() {
		$node.on("click", function () {
			if (!checkLoginStatus()) {
				loginPop({
					onLogin: gotoPage
				});
				return false;
			}
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});