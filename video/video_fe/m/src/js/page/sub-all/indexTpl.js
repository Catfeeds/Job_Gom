import liveStatus from 'util/liveStatus';

function listTpl(data){
	let tpl = '';
	let floatCls = ['fl','fr'];

	for(let i=0,len=data.length; i<len; i++){
		var active = data[i].is_subscribe ? "active" : "";
		var isBtn = data[i].is_subscribe ? 1 : 0;
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
					<a class="subscripBtn ${active} fr" data-action="subscribe" data-subscribeid="${data[i].id}" data-status="${isBtn}">
						<span class="show"><em>+</em>订阅</span>
						<span class="hide">已订阅</span>
 					</a>
				</div>
				<ul class="msgContent">`;
		let sub = data[i].imageText;
		let klen = sub.length;
		for(let k=0; k<klen; k++){
			let clsIndex = k %2;
			let href = 'sv'.charAt(parseInt(sub[k].video_type));
			
			let flagspan = '';
			let flagType ='';
			
			let htmlstr = '';
			if (sub[k].live_status == '4') { 
				flagspan = sub[k].length;
				htmlstr = `<span class="item-flag">${flagspan}</span>`;
			}else{
				flagType = liveStatus(sub[k].live_status);
				htmlstr = `<div class="live-flag ">
						${flagType}
					</div>`;
			}
			tpl += `<li class="fl">
				<a href="/${href}/${sub[k].id}.html">
					<div class="imgShow">
						<img src="${sub[k].image}">
						`+htmlstr+`
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