/**
 * [collect list tpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import liveStatus from 'util/liveStatus';
import formatDate from 'util/formatDate';

function listTpl(data){
	let tpl = '';
	let vInfo,vType,href,collectId;

	for(let i=0,len=data.length; i<len; i++){
		collectId = data[i].collect_id;
		vInfo = data[i].video_info;
		vType = parseInt(vInfo.video_type);
		href = 'sv'.charAt(vType);
		// data[i].flag = vType == 0 ? '直播' : timeLenFormat(vInfo.length);
		let flagCls = '';
		if (vType == 0) {
			data[i].flag = liveStatus(vInfo.live_status);
			flagCls = 'live-flag';
		}else{
			data[i].flag = timeLenFormat(vInfo.length);
			flagCls = 'item-flag';
		}

		tpl += `<a data-node="item" data-id="${collectId}" class="item" href="/${href}/${data[i].video_id}.html">
			<div class="item-img">
				<img src="${vInfo.image}">
				<div class="${flagCls}">${data[i].flag}</div>
			</div>
			<div class="item-info">
				<h2>${vInfo.title}</h2>`;
		if (vType == 0) {
			tpl += `<p>${formatDate(vInfo.start_time*1000, 'yyyy-MM-dd hh:mm')}</p>`;
		}
		if(vInfo.status != 0){
			tpl += `<div class="over">
						<span class="offline">已下线</span>
						<em data-action="delOffline" class="del icon-27"></em>
					</div>`;
		}
		tpl += `</div></a>`;
	}
	return tpl;
}

export default listTpl;