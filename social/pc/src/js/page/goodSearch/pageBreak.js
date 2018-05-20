require('lazyload');

var pageBreakB = require('module/pageBreak');
var fetch = require('io/fetch');
var tpl = require('./searchList.tpl');
var url = require('io/url');
    
var $page = $("[data-node=page]"),
    $pageShow = $("[data-node=pageShow]"),
    $currentPage = $("[data-node=currentPage]"),
    $tootlePage = $("[data-node=tootlePage]"),
    $prePage = $("[data-node=prePage]"),
    $searchList = $('[data-node="searchList"]'),
    $nextPage = $("[data-node=nextPage]"),
    $goodsNum = $("[data-node=goodsNum]"),

    $addMoreData = $("[data-node=addMoreData]"),
    $noDataShow = $("[data-node=noDataShow]");
    //$dataFalse = $("[data-node=dataFalse]");


var init = function(){
    initPage();
    $page.on("click","a",checkPage);
    $pageShow.on("click","em",checkPage);

}
// 页面预加载



//初始化翻页
function initPage(){
    // 判断是否有数据
    if(parseInt($goodsNum.html) == 0 ){
         $noDataShow.removeClass("hide").addClass("show");
    }else{
        var option = {
            "toPage" : $currentPage.html(),
            "tootlePage" :$tootlePage.html() 
        }
        if(option.tootlePage == 1){
            $prePage.addClass("disabled");
            $nextPage.addClass("disabled");
        }else if(option.tootlePage == 0){
            $page.addClass("hide");
            $prePage.addClass("disabled");
            $nextPage.addClass("disabled");
        }
        var ahtml = pageBreakB(option);
        $page.empty().append(ahtml);

    } 

    $addMoreData.css({
        "height": "220px",
        "line-height" : "220px",
        "text-align" : "center"
    }); 

}

//翻页
function checkPage(){
    var $this = $(this);
    var currentPage = $currentPage.html();
    //var tootlePage = $tootlePage.html();
    var toPage = "";
   
    if($this.hasClass("disabled") || $this.hasClass("noClick")){
        return false;    
    }else{

        if($this.attr("data-node") == "prePage" ){
            toPage = parseInt(currentPage )-1;
        }else if($this.attr("data-node") == "nextPage" ){
            toPage = parseInt(currentPage ) +1;
        }else {
            toPage  = $this.html();
        }
        getNewData(toPage,$this);
    }
   
}

//请求数据，并且显示翻页
function getNewData(toPage,thisObj){
    var $this1 = thisObj;
    $page.addClass("hide").removeClass("show");
    //var toPage = toPage;
    var queryStr = $_CONFIG['query_string'];
    var csid = $_CONFIG['csid'];
    $searchList.empty();
    $addMoreData.removeClass("hide").addClass("show");
    $noDataShow.removeClass("show").addClass("hide");

    fetch.get(url.get('searchGoods')+"?"+queryStr+"&page="+toPage).done(function(data) { 
        if (data.success === true) {
            var goods = data.data.items;
            if(goods.length < 1){
                //没数据
                falseText();
            }else{
                var option = {
                    "toPage" : data.data.page,
                    "tootlePage" : data.data.pageCount
                };
                changePage(option);
                var strObj = {
                    "aSrc" : $_CONFIG['mall_domain'],
                    "csid" : csid,
                    "goods" : goods,
                    "strImg" :$_CONFIG['imgpath']
                }
                $searchList.html(tpl(strObj));

                $addMoreData.removeClass("show").addClass("hide");
                $page.addClass("show").removeClass("hide");
                $currentPage.html(data.data.page);    
                $tootlePage.html(data.data.pageCount);
                $("img").lazyload({ effect : "fadeIn"});
            }
        }else{
             falseText();
        }
    }).fail(function() {
        falseText();
    });



    function changePage(option){
        if(!$this1.hasClass("noClick")){
             var newHtml = pageBreakB(option);
             $page.empty().append(newHtml);
             if(option.toPage == 1){
                $prePage.addClass("disabled");
                $nextPage.removeClass("disabled");
             }else if(option.toPage == option.tootlePage){
                $nextPage.addClass("disabled");
                $prePage.removeClass("disabled");
             }else{
                $nextPage.removeClass("disabled");
                $prePage.removeClass("disabled");
             }
        }
    }
}

// 请求失败处理
function falseText(){
    $addMoreData.removeClass("show").addClass("hide");
    $noDataShow.removeClass("hide").addClass("show");
    var k = 5;   
    var time1= setInterval(function(){
        if(k == 1){
            location.reload();
            clearInterval(time1)
        }else{
            $("[data-node=countDown]").html(--k);
        }
    },1000);    

    $("[data-node=spanRrfresh]").on("click",function(){
        location.reload();
    });
}


module.exports = {
    init : init
};