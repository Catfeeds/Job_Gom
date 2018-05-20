var url = require('../../io/url');
var fetch = require('io/fetch');
module.exports = {
	init: function(){
		/*url.get('shopMange')*/
		fetch.get( '/ajax/Mshop/shopRankingList' ).then(function(data) {
	    	if( data ){
	    		// console.log(data);
	    		// var data = result.data;
	    		var winner = data.pkList[0],
	    			myRank = data.pkList[1],
	    			lists = '',
	    			$rankBox = $('[data-node="ranking-box"]'),
	    			html = '',
	    			rightHtml = '',
	    			meidian_domain = $GLOBAL_CONFIG['meidian_domain'],
	    			rankHtml = '';
	    		data.topList.forEach(function (item){
	    			var singleShop = meidian_domain + 'shop-' + item.id + '.html',
	    				imgSrc = item.level ? ($GLOBAL_CONFIG['pcimgpath'] + '/images/user/level/level' + item.level + '.png') : '',
	    				img = imgSrc ? `<img src="${imgSrc}">` : ``;
	    			if(item.userName){
					    lists += `<li><a target="_blank" href="${singleShop}"><em>${item.ranking}</em><img onerror="imgError(this, 'h')" src="${item.icon}"><span title="${item.name}"><u>${rankSubStr(item.name)}</u>${img}<em>${item.userName}<strong>${item.userOrgName}</strong></em></span></a></li>`;
	    			}else{
	    				lists += `<li><a target="_blank" href="${singleShop}"><em>${item.ranking}</em><img onerror="imgError(this, 'h')" src="${item.icon}"><span title="${item.name}"><u>${rankSubStr(item.name)}</u>${img}</span></a></li>`;
	    			}
	    		});
	    		if(!isNaN(parseInt(myRank.ranking))){
	    			rankHtml = `第${myRank.ranking}名`;
	    		}else{
	    			rankHtml = `${myRank.ranking}`;
	    		}
	    		if(!myRank.id){
	    			rightHtml += `	<div class="ranking_pic_right fl not_login">
					                	<div class="number_one">
					                  		<div class="hg"></div><img onerror="imgError(this, 'h')" src="../../images/meidian/lun1.png">
					                	</div>
					                	<div class="number_one_detail">
					                  		<input type="button" value="开通美店，赚钱咯!" data-node="kt-meidian-refresh">
					                	</div>
					              	</div>`;
	    		}else{
	    			rightHtml += `	<div class="ranking_pic_right fl" data-id="${myRank.id}" data-userId="${myRank.userId}">
	    								<a href="${meidian_domain}shop-${myRank.id}.html" target="_blank">
						               		<div class="number_one my_ranking">
						                  		<div class="hg"></div><img onerror="imgError(this, 'h')" src="${myRank.icon}"><span>${rankHtml}</span>
						                	</div>
						               		<div class="number_one_detail">
						                		<h5>${myRank.name}</h5>
						                		<p>销售额：<span>${(myRank.salesAmount/100).toFixed(2)}</span></p>
						                		<p>订单量：<span>${myRank.orderAmount}</span></p>
						                		<p>返利金额：<span>${(myRank.rebateAmount/100).toFixed(2)}</span></p>
						                	</div>
					                	</a>
					              	</div>`;
	    		}
	    		html += `	<h1 class="clearfix"><span class="fl">${data.title}</span><em>${data.statisticsDate}</em></h1>
							<div class="ranking_main">
								<div class="ranking_pic clearfix">
					              	<div class="ranking_pic_left fl" data-id="${winner.id}" data-userId="${winner.userId}">
						                <a href="${meidian_domain}shop-${winner.id}.html" target="_blank">
						                	<div class="number_one">
						                 		<div class="hg"></div><img onerror="imgError(this, 'h')" src="${winner.icon}"><span>第${winner.ranking}名</span>
						                	</div>
						                	<div class="number_one_detail">
						                		<h5>${winner.name}</h5>
						                		<p>销售额：<span>${(winner.salesAmount/100).toFixed(2)}</span></p>
						                		<p>订单量：<span>${winner.orderAmount}</span></p>
						                		<p>返利金额：<span>${(winner.rebateAmount/100).toFixed(2)}</span></p>
						                	</div>
						                </a>
					              	</div>
					              	${rightHtml}
					            </div>
					            <div class="ranking_list">
					              	<ul class="clearfix">
					              		${lists}
					              	</ul>
					            </div>
					        </div>`;
	    		$rankBox.html(html);
	    	}else{
	    		console.log('数据获取失败，请重试！');
	    	}
	    }, function(){
	    	console.log('数据获取失败，请重试！');
	    });
	}
};
function rankSubStr(s) {
	var str = s;
    if(str == null)return 0;
    if(typeof str != 'string')str += '';
    str = str.replace(/[^\x00-\xff]/g, '01');
    return str.length >= 5 ? (s.substring(0, 5) + '...') : s;
}