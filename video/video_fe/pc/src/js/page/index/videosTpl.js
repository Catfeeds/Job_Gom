/**
 * [video list tpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import formatDate from 'util/formatDate';
import defaultHead from 'util/defaultHead';
import overflowStr from  'util/overflowStr';
import formatNumber from 'util/formatNumber';

function videoTpl(list){
	let tpl = '';
	let len = list.length;
	let dftHead = defaultHead();
	let v,href,flag,updateTime,userHead,hasPublisher,title,praiseNum;
	for(let i=0;i<len;i++){
		v = list[i];
		if ($.isArray(v.publisher)) {
			continue;
		}
		title = overflowStr(v.title,35);
		href = 'sv'.charAt(v.video_type);
		flag = v.length == '' ? '直播' : v.length;
		updateTime = formatDate(v.update_time*1000,'yyyy.MM.dd');
		userHead = v.publisher.icon == '' ? dftHead : v.publisher.icon;

		tpl += `<li>
		<div class="img">
			<a href="/${href}/${v.id}.html" target="_blank">
				<img src="${v.image}" alt="${v.title}"/>
				<span class="time">${flag}</span>
			</a>
		</div>
		<a href="/${href}/${v.id}.html" target="_blank" class="list-title" title="${v.title}">${title}</a>
		<div class="num">
			<a target="_blank" href="/sub/${v.publisher.id}.html" class="list-name">
				<img src="${userHead}" />
				<span>${v.publisher.name}</span>
			</a>
			<div class="fr hide" data-node="praise${v.id}">
				<em class="icon-15"></em>
				<span>0</span>
			</div>
		</div>
		
	</li>`;
	}
	return tpl;
}

export default videoTpl;