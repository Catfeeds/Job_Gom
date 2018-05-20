/**
 * [底部推荐视频]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import getViewsNumber from './getViewsNumber.js';
import formatNumber from 'util/formatNumber';
import formatDate from 'util/formatDate';

let $recommendSite4 = $('[data-node=recommendSite4]');

function getContent(data , i){
	if (!data.videos.length) {
		return {
			html: ''
		};
	}
	let ids = {};
	let tpl = `
		<div class="block-title">
		    <h2>${data.name}</h2>
		</div>
		<div class="hot-list" data-node="recommendSite4">
		    <ul class="clearfix list">
	`;

	data.videos.forEach((v,k)=>{
		let href = 'sv'.charAt(v.video_type);
		if (v.video_type == 1) {
			ids[v.video_id] = v.video_id;
		}
		tpl += `
			<li>
			    <div class="img">
			        <a href="/${href}/${v.id}.html" target="_blank">
			            <img src="${v.image}" alt="${v.title}">`;
			tpl += getFlagHtml(v);
			tpl += `</a>
			    </div>
			    <a href="/${href}/${v.id}.html" target="_blank" class="list-title" title="${v.title}">${v.title}</a>
			    <div class="num">
			        <a target="_blank" href="/sub/${v.publisher.id}.html" class="list-name">
			            <img src="${v.publisher.icon}">
			            <span>${v.publisher.name}</span>
			        </a>
			    </div>
			</li>
		`;
	});


	tpl += `
		    </ul>
		</div>
	`;


	return {
		html: tpl,
		ids: ids
	};
}

function getFlagHtml(v){
	let tpl = ``;
	let time = timeLenFormat(v.length);
	if (v.video_type == 0) {
		// 直播
		let liveStr = '';
		let startTime = formatDate(v.start_time*1000, 'yyyy-MM-dd hh:mm');
		switch (~~v.live_status){
			case 1: 
				liveStr += `<span class="live">正在直播</span>`;
				break;
			case 2:
				liveStr += `<span class="live">即将直播</span>`;
				break;
			default:
				liveStr += `<span class="vod">直播回看</span>`;
				break;
		}
		return `
			${liveStr}
			<div class="img-text">
			    <span class="count">${startTime}</span>
			</div>
		`;
	}else{
		// 点播
		return `
			<div class="img-text">
			    <span class="count hide" data-node="views" data-vid="${v.video_id}"><em class="icon-47"></em>0次</span>
			    <span class="time">${time}</span>
			</div>
		`;
	}

}

function bottomRecommend(data){

	if (data.code != 0) {
		return false;
	}

	let blockData = data.data.list;
	let html = '';
	let videoIds = {};

	if (!blockData.length) {
		return false;
	}

	blockData.forEach((v, k)=>{
		let contentData = getContent(v, k);
		html += contentData.html;
		videoIds = Object.assign(videoIds, contentData.ids);
	});

	$recommendSite4.append(html);

	// 追加观看次数
	let idsStr = Object.keys(videoIds).join(',');
	getViewsNumber(idsStr, function(data){
		let videoViews = data.data;
		let $content = $('[data-node=recommendSite4]');
		$.each(videoViews, function(i,e){
			let count = formatNumber(e);
			let viewCountStr = `<em class="icon-47"></em>${count}次`;
			$content.find('[data-vid='+i+']').html(viewCountStr).removeClass('hide');
		});
	});
	
}


export default bottomRecommend;