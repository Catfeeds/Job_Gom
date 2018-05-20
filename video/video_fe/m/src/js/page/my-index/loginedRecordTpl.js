/**
 * [my record tpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import liveStatus from 'util/liveStatus';
import formatDate from 'util/formatDate';

function loginedRecordTpl(list){
	let data = list.today.concat(list.before);
	let tpl = '';
	let vType,vInfo,href;

	let i=0,len=data.length;
	for(;i<len;i++){
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

		tpl += `
			<li class="section-item">
				<a href="/${href}/${vInfo.id}.html">
					<div class="item-img">
						<img src="${vInfo.image}">
						<div class="${flagCls}">${data[i].flag}</div>
					</div>
					<p>${vInfo.title}</p>
				</a>
			</li>
		`;
	}
	return tpl;
}

export default loginedRecordTpl;