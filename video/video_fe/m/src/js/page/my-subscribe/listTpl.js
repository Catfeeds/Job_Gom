/**
 * [subscribe list tpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import timeLenFormat from 'util/timeLenFormat';
import liveStatus from 'util/liveStatus';
import formatDate from 'util/formatDate';

function listTpl(data){
	let tpl = '';
	let floatCls = ['fl','fr'];

	for(let i=0,len=data.length; i<len; i++){
		let noHead = data[i].icon == '' ? 'hide' : '';
		tpl += `
			<li class="msgList">
				<div class="msgNav">
					<a href="/sub/${data[i].id}.html">
						<div class="msgNav-head fl"><img class="${noHead}" src="${data[i].icon}"></div>
						<ul class="msgNav-msg fl">
							<li class="msgNav-name">${data[i].name}</li>
							<li class="msgNav-intr">${data[i].summary}</li>
							<li class="msgNav-fans"><span>${data[i].subscribe_num}</span>人订阅</li>
						</ul>
					</a>
				</div>
				<ul class="msgContent">`;
		let sub = data[i].imageText;
		let klen = sub.length;
		for(let k=0; k<klen; k++){
			if (k >= 2) {
				break;
			}
			let href = 'sv'.charAt(parseInt(sub[k].video_type));
			let clsIndex = k %2;
			// sub.flag = sub[k].video_type == 0 ? '直播' : timeLenFormat(sub[k].length);
			let flagCls = '';
			if (sub[k].video_type == 0) {
				sub.flag = liveStatus(sub[k].live_status);
				flagCls = 'live-flag';
			}else{
				// sub.flag = timeLenFormat(sub[k].length);
				sub.flag = sub[k].length;
				flagCls = 'item-flag';
			}
			tpl += `<li class="${floatCls[clsIndex]}">
				<a href="/${href}/${sub[k].id}.html">
					<div class="imgShow">
						<img src="${sub[k].image}">
						<div class="${flagCls}">${sub.flag}</div>
					</div>
					<div class="wordSpan">${sub[k].title}</div>
				</a>
			</li>`;
		}
		tpl += `</ul></li>`;
	}
	return tpl;
}

export default listTpl;