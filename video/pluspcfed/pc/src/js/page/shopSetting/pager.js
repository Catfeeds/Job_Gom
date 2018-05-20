require('module/pager');
var fetch = require('io/fetch');
var url = require('io/url');
var pager = require('./pager');
var hint = require('module/hint');
window.currentPage = 1;

//日期格式化
function dataFormat(data, space) {
	var date = new Date(data);
	var str = space || '-';
    return date.getFullYear() + str + (date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + str + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
}
//获取字符长度（字节）
function getStrLength(str){
  	return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
}

function getHtml(data){
	var html = '';
	for(var i = 0, len = data.length; i < len; i++ ){
		var url = 'https://item.gome.com.cn/'+ data[i].item.id +'-' + data[i].skuId +'.html?'+ (data[i].trId ? 'stid='+ data[i].trId : '' ) +'&mid='+ $_CONFIG.shopId;
		html += `<li>
				    <div class="clearfix user-shopSetting-good">
				        <a href="`+ url +`" target="_blank">
				            <img src="`+ data[i].item.mainImage +`" class="J-shopSetting-goodsImg">
				        </a>
				    </div>
				    <div class="clearfix user-shopSetting-goods">`;

		        if( data[i].item.flag === 1 ){
		        	html += '<span class="user-shopSetting-main">自营</span>';
		        }else if( data[i].item.flag === 2 ){
		        	html += '<span class="user-shopSetting-rival">海外购</span>';
		        }else if( data[i].item.flag === 3 ){
		          html += '<span class="user-shopSetting-shop">门店</span>';
		        }         
			   	html += `<a href="`+ url +`" class="J-shopSetting-goodName" target="_blank" title="`+ data[i].item.name +`">`+ data[i].item.name +`</a>
				    </div>
				    <div class="user-shopSetting-priceBox clearfix">
				        <span class="user-shopSetting-price">￥`+ data[i].item.salePrice +`</span>
				        <span class="user-shopSetting-ret"><span>佣金</span><span class="user-shopSetting-rnum">最高￥`+ (data[i].item.mostCommission/100).toFixed(2) +`</span></span>
				    </div>
				    <div class="user-shopSetting-gnotice"><span>30日销量:`+ data[i].item.sales +`</span><span class="user-shopSetting-date">上架时间:`+ dataFormat(data[i].onShelfAt, '.') +`</span>
				    </div>
				    <div class="clearfix">
				        <a class="user-shopSetting-delBtn J-shopSetting-delBtn" href="javascript:;" data-itemid="`+ data[i].itemId +`" data-skuid="`+ data[i].skuId +`" data-identification="`+ data[i].identification +`" data-status="`+ data[i].item.status +`">下架</a>
				        <a class="user-shopSetting-grayBtn" href="javascript:;"> 
				            <span `+ ( getStrLength(data[i].category.name) > 8 ? 'class="user-shopSetting-maxSize"' : '' ) +`>`+ data[i].category.name +`</span>
				        </a>
				        <a class="user-shopSetting-shareBtn J-shopSetting-shareBtn" href="javascript:;"> 分享</a>
				    </div>
				</li>`;
	}
	$('.J-shopSetting-list').html(html);
	$(window).scrollTop(0);
	//图片加载
	require('./imgError').init();
}
//获取目标页码数据
function getItems( currentPage ){
	fetch.get( url.get('shopMange') + currentPage, {}).then(function(result) {
    	if( result ){
			window.currentPage = currentPage;
    		getHtml(result.items);
    		pagination(currentPage, $_CONFIG.totalPageQuantity);
    	}else{
    		hint.init('数据获取失败，请重试！');
    	}
    }, function(){
    	hint.init('数据获取失败，请重试！');
    });
}

//初始化分页并设置点击页码回调
function pagination(currentPage, totalPage){
	$(".J-shopSetting-page").gPager({
		currentPage  : currentPage,				
		totalPage    : totalPage,		
		clickCallback: function(n){
			getItems(parseInt(n));
		}				
	});
}


module.exports = {
	getItems: getItems,
	init: function(){
		pagination(currentPage, $_CONFIG.totalPageQuantity);
	}
}