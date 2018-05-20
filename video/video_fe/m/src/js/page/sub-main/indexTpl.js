/**
 * [indexTpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import fromNow from 'util/fromNow.js';
import formatDate from 'util/formatDate.js';
import timeLenFormat from 'util/timeLenFormat.js';
import liveStatus from 'util/liveStatus';
function indexTpl(v){
	let href = 'sv'.charAt(parseInt(v.video_type));
	let flagspan = '';
	let flagType ='';
	let classhide='';
	let updataTime = '';
	if (v.live_status == '4') { //???????????????????
		// flagspan = timeLenFormat(v.length);
		flagspan = v.length;
		classhide= 'hide';
		updataTime = v.update_time;
	}else{
		flagType = liveStatus(v.live_status);
		flagspan = formatDate(parseInt(v.start_time)*1000, 'yyyy-MM-dd hh:mm');
		// flagspan = v.start_time;
		updataTime = '';
	}

	return `<div class="list-item">
			<a href="/${href}/${v.id}.html">
				<div class="item-img">
					<img onerror="javascript:this.style.display='none';" src="${v.image}" title="${v.title}">
					 <div class="live-flag ${classhide}">
						${flagType}
					</div>
					<span class="item-flag ">${flagspan}</span>
					
				</div>
				<h2 class="item-title">${v.title}</h2>
				<div class="item-icon clearfix">
					<div class="fl ${v.is_collect ? 'active' : ''}" data-action="collect" data-collectid="${v.id}" data-status="${v.is_collect}">
						<em class="icon-7"></em>
					</div>
					<div class="fl ${v.is_praise ? 'active' : ''}" data-action="like" data-likeid="${v.id}" data-status="${v.is_praise}">
						<em class="icon-3"></em>
						<span data-node="count">${v.praise_num}</span>
					</div>
					<div class="fr">
						${updataTime}
					</div>
				</div>
			</a>
		</div>`;
}

export default indexTpl;