/**
 * [unlogin my record tpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import liveStatus from 'util/liveStatus';
import formatDate from 'util/formatDate';

function unloginRecordTpl(list){
	let data = list.today.concat(list.before);
	let tpl = '';
	let vType,href;

	let i=0,len=data.length;
	for(;i<len;i++){
		vType = parseInt(data[i].video_type);
		href = 'sv'.charAt(vType);
		// data[i].flag = vType == 0 ? '直播' : timeLenFormat(data[i].length);
		let flagCls = '';
		if (vType == 0) {
			data[i].flag = liveStatus(data[i].live_status);
			flagCls = 'live-flag';
		}else{
			data[i].flag = timeLenFormat(data[i].length);
			flagCls = 'item-flag';
		}

		tpl += `
			<li class="section-item">
				<a href="/${href}/${data[i].id}.html">
					<div class="item-img">
						<img src="${data[i].image}">
						<div class="${flagCls}">${data[i].flag}</div>
					</div>
					<p>${data[i].title}</p>
				</a>
			</li>
		`;
	}
	return tpl;
}

export default unloginRecordTpl;