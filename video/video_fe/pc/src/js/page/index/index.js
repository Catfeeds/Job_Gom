/* css */
import 'css/page/index-new/index.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import { loginFlag, apiParams} from 'util/phpCommon.js';
import fetch from 'io/fetch';
import toast from 'components/toast';
import Scrollload from 'Scrollload';

import HeaderFixed from './headerFixed.js';
import BannerSlider from './bannerSlider.js';
import BackTop from 'plugin/backTop';
import wonderfulVideo from './wonderfulVideo.js';
import feeds from './feeds.js';
import bottomRecommend from './bottomRecommend.js';
import getViewsNumber from './getViewsNumber.js';
import formatNumber from 'util/formatNumber';

/* header 定位 */
HeaderFixed();

/* 焦点图 */
new BannerSlider({
	selector: '[data-node=indexBanner]',
	speed: 5000
});

new BackTop();

/* 追加推荐位1的视频观看记录 */
function recommendSite_1_views(){
	let $blocks = $('[data-node=recommendSite1]');
	let ids = [];
	$.each($blocks, function(i,e){
		let cards = $(e).find('[data-node=views]');
		$.each(cards,function(k,v){
			let vid = $(v).data('vid');
			ids.push(vid);
		});
	});
	let idsStr = ids.join(',');
	if (idsStr === '') {
		return false;
	}
	getViewsNumber(idsStr, function(data){
		let videoViews = data.data;
		let $site1 = $('[data-node=recommendSite1]');
		$.each(videoViews, function(i,e){
			let count = formatNumber(e);
			let viewCountStr = `<em class="icon-47"></em>${count}次`;
			$site1.find('[data-vid='+i+']').html(viewCountStr).removeClass('hide');
		});
	});
}

recommendSite_1_views();


let $scrollLoadBar = $('[data-node=scrollLoadBar]');
let loadMore = true;
let loadBlock = 1;
var apiParamskey =  loginFlag ? apiParams.inParams : apiParams.outParams;
let loadConfig = {
	1: {
		api: 'v1/cms/slot/videoRecommend?unique_key=middlerecommend',
		renderHTML: wonderfulVideo
	},
	2: {
		api: 'v1/video/hotPublish?'+apiParamskey,
		renderHTML: feeds
	},
	3: {
		api: 'v1/cms/slot/videoRecommend?unique_key=bottomrecommend',
		renderHTML: bottomRecommend
	}
};

function loadVideos(sl) {
	if (!loadMore) {
		return false;
	}

	fetch.get(loadConfig[loadBlock].api, {
		domain:"domain-sault",
		success: function(data) {
			loadConfig[loadBlock].renderHTML(data);
			loadBlock++;
			if (loadBlock > 3) {
				loadMore = false;
				sl.noData();
			}
			sl.unLock();
		},
		error: function(data) {
			sl.throwException();
			toast('网络请求异常');
		}
	});
}

let scrollLoad = new Scrollload($scrollLoadBar[0], function(sl) {
	loadVideos(sl);
}, {
	isInitLock: false,
	loadingHtml: '<div class="infinite-scroll"><em class="icon-49"></em><span>加载中...</span></div>',
	noDataHtml: '<div class="infinite-scroll"><span>没有更多了</span></div>',
	exceptionHtml: '<div class="infinite-scroll error" data-node="errorNode"><span>出错啦~请重试</span></div>'
});

$scrollLoadBar.on('click','[data-node=errorNode]', function(){
	scrollLoad.solveException();
});