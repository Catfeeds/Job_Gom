/**
 * [精彩视频]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import getViewsNumber from './getViewsNumber.js';
import formatNumber from 'util/formatNumber';
import formatDate from 'util/formatDate';

let $recommendSite2 = $('[data-node=recommendSite2]');

function getContent(data , i){
	let toggleCls = i > 0 ? 'hide' : '';
	let tpl = `<ul class="clearfix list ${toggleCls}">`;
	let ids = {};

	data.forEach((v, k)=>{
		let href = 'sv'.charAt(v.video_type);
		let subtitle = typeof v.subtitle === 'undefined' ? '' : v.subtitle;
		if (v.video_type == 1) {
			ids[v.video_id] = v.video_id;
		}
		if (k === 0) {
			tpl += `
				<li class="big">
				    <div class="img">
				        <a href="/${href}/${v.id}.html" target="_blank" style="background: url('${v.image}') no-repeat center;background-size:cover;" title="${v.title}">`;
			tpl += getFlagHtml(v);
			tpl += `    </a>
				    </div>
				    <a href="/${href}/${v.id}.html" target="_blank" class="list-title" title="${v.title}">${v.title}</a>
				    <p>${subtitle}</p>
				</li>
			`;
		}else{
			tpl += `
				<li>
				    <div class="img">
				        <a href="/${href}/${v.id}.html" target="_blank">
				            <img src="${v.image}" alt="${v.title}">`;
				tpl += getFlagHtml(v);
				tpl += `</a>
				    </div>
				    <a href="/${href}/${v.id}.html" target="_blank" class="list-title" title="${v.title}">${v.title}</a>
				</li>
			`;
		}
	});
	tpl += '</ul>';

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

function wonderfulVideo(data){

	if (data.code != 0) {
		return false;
	}

	let blockTitle = data.data.slot.name;
	let blockData = data.data.list;
	let tabTitle = '';
	let tabContent = '';
	let videoIds = {};

	if (!blockData.length) {
		return false;
	}

	blockData.forEach((v, k)=>{
		tabTitle += `<a href="javascript:;" ${k === 0 ? 'class="active"' : ''}>${v.name}</a>`;
		let contentData = getContent(v.videos, k);
		tabContent += contentData.html;
		videoIds = Object.assign(videoIds, contentData.ids);
	});

	let titleHTML = `
		<div class="block-title">
		    <h2>${blockTitle}</h2>
		    <div class="index-tab" data-node="wonderfulVideoTab">
				${tabTitle}
		    </div>
		</div>
	`;
	let blockContent = `<div class="video-list" data-node="wonderfulVideoContent">
		${tabContent}
	</div>`;

	let wonderfulVideoHTML = titleHTML + blockContent;

	$recommendSite2.append(wonderfulVideoHTML);

	videoTab();

	// 追加观看次数
	let idsStr = Object.keys(videoIds).join(',');
	getViewsNumber(idsStr, function(data){
		let videoViews = data.data;
		let $content = $('[data-node=wonderfulVideoContent]');
		$.each(videoViews, function(i,e){
			let count = formatNumber(e);
			let viewCountStr = `<em class="icon-47"></em>${count}次`;
			$content.find('[data-vid='+i+']').html(viewCountStr).removeClass('hide');
		});
	});
	
}

function videoTab(){
	let $tab = $('[data-node=wonderfulVideoTab]');
	let $content = $('[data-node=wonderfulVideoContent]');
	$tab.on('mouseenter','a', function(){
		let $this = $(this);
		let index = $this.index();
		$tab.children('a').eq(index).addClass('active').siblings('a').removeClass('active');
		$content.children('ul').eq(index).removeClass('hide').siblings('ul').addClass('hide');
	});
}



export default wonderfulVideo;