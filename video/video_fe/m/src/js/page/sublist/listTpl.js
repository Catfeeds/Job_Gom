
import defaultHead from 'util/defaultHead'; // 默认图片
import liveStatus from 'util/liveStatus';
import formatDate from 'util/formatDate';

function listTpl(data){
	var json = data;
	let tpl='';

	for(var i = 0; i<json.length; i++){
		var collectBtn = json[i].is_collect==0 ?"" :"active";
		var likeBtn = json[i].is_praise==0 ? "" :"active";
		let href = 'sv'.charAt(parseInt(json[i].video_type));
		let head = json[i].publisher.icon == '' ? defaultHead() : json[i].publisher.icon;
		// json[i].flag = json[i].video_type == 0 ? '直播' : json[i].length;

		// let flagCls = '';
		// if (json[i].video_type == 0) {
		// 	json[i].flag = liveStatus(json[i].live_status);
		// 	flagCls = 'live-flag';
		// }else{
		// 	json[i].flag = json[i].length;
		// 	flagCls = 'item-flag';
		// }

		let flagspan = '';
		let flagType ='';
		let updataTime = '';
		var htmlstr='';
		if (json[i].live_status == '4') { 
			flagspan = json[i].length;	
			updataTime = json[i].update_time;
			htmlstr = `<span class="item-flag ">${flagspan}</span>`;

		}else{
			flagType = liveStatus(json[i].live_status);
			flagspan = formatDate(parseInt(json[i].start_time)*1000, 'yyyy-MM-dd hh:mm');
			htmlstr = `<div class="live-flag ">
						${flagType}
						</div>
						<span class="item-flag ">${flagspan}</span>
					`;
		}

		tpl += `
		<div class="list-item">
	        <a href="/sub/${json[i].publisher.id}.html">
	            <div class="list-head">
	                <div class="fl">
	                    <img src="${head}"><span>${json[i].publisher.name}</span>
	                </div>
	                <div class="fr">${updataTime}</div>
	            </div>
	        </a>
	        <a href="/${href}/${json[i].id}.html">
	            <div class="item-img">
	                <img src="${json[i].image}" alt="">
	            	`+htmlstr+`
	            </div>
	            <h2 class="item-title">
	                ${json[i].title}</h2>
	            
	        </a>
	        <div class="item-icon clearfix">
	            <div class="fl ${collectBtn}" data-action="collect" data-collectid="${json[i].id}" data-status="${json[i].is_collect} ">
	                <em class="icon-7"></em>
	               
	            </div>
	            <div class="fl ${likeBtn}" data-action="like" data-likeid="${json[i].id}" data-status="${json[i].is_praise}">
	                <em class="icon-3"></em>
	                <span data-node="count">${json[i].praise_num}</span>
	            </div>
	        </div>
	    </div>
		`;
	}
	return tpl;
}
export default listTpl;
