
import formDate from 'util/formatDate.js';
import timeLenFormat from 'util/timeLenFormat.js';
import defaultHead from 'util/defaultHead.js';
import formatNumber from 'util/formatNumber.js';
import overflowStr from  'util/overflowStr';
function setTpl(data){
    var userId = data.id;
    var userImg = data.icon;
    var userName = data.name;
    var json = data.imageText;
    var id = data.id;
    var tpl ='';
    for(let i = 0 ; i < json.length; i++){
        var dataNum = parseInt(json[i].update_time)*1000;    
        var update = formDate(dataNum,"yyyy.MM.dd");
        var num = formatNumber(json[i].praise_num);
        var href = 'sv'.charAt(json[i].video_type);
        //var m = timeLenFormat(parseInt(json[i].length));
        //var img = json[i].image !="" ? json[i].image : defaultHead;
        tpl += `
        <li>
            <div class="img">
                <a href="/${href}/${json[i].id}.html" target="_blank" >
                    <img src="${json[i].image}">
                    <span class="time">${json[i].length}</span>
                    
                </a>
            </div>
            <a href="/${href}/${json[i].id}.html" target="_blank" class="list-title">${overflowStr(json[i].title,35)}</a>
            <div class="num">
            	<div class="fl">
                     <em class="icon-15"></em>
                    <span>${num}</span>
                </div>
                <div class="fr">
                   <span>${update}</span>
                </div>
            </div>
        </li>`;
    }

    return tpl;
}

export default setTpl;


