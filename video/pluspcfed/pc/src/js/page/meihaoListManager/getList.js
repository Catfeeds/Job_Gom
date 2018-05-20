var toast = require('module/hint').init;
var fetch = require('io/fetch');
var url = require("io/url");
var tpl = require('./li.tpl');

var domain = $GLOBAL_CONFIG['main_domain'];
var temp = '<div class="create-msg" style="display:none">点击 "新建文章" 开始写文章~</div>';
var $conData = $('.con-data');
var $more = $('.view-more');
$conData.append(temp);
var $msg = $('.create-msg');
var $ul = $('[data-node="releasedList"]');
var $pubNode = $('[data-node="pubNum"]');

var toLocalTime=function(str){
			str = parseInt(str);
			str = new Date(str);
			return str.getFullYear() + "-" + 
					(str.getMonth() + 1) + "-" + 
					str.getDate() + "  " + 
					str.getHours() + ":" + 
					str.getMinutes() + ":" + 
					str.getSeconds(); 

		}

function getList(){
    fetch.get(url.get('articleList'),{
    	data:{
    		page:1
    	}
    })
        .done(function(data){
        	var _data = data.data;   
        	var total = _data.totalTopicQuantity;

        	var topics = _data.topics;
        	

        	if(total == 0){
        		$ul.html('');
        		$msg.show();
                $more.hide();
        	}else{
        		var str = '';
        		for(var i=0,len=topics.length;i<len;i++){
        			var _temp = "";
        			var thisArr = topics[i];

        			str+= tpl({
        				id : thisArr.id,
        				topicId:thisArr.topicId,
        				groupId : thisArr.groupId,
        				titleName : thisArr.titleName,
        				pic : thisArr.pic,
        				updataTime : toLocalTime(thisArr.updateTime),
        				link : domain+'topic/'+ thisArr.groupId
        			})
           		}

           		$ul.html(str);

                if(total<=5){
                    $more.hide();
                }
        	}

            if($pubNode.length){
                $pubNode.text(total);
            }
            


        })
}

module.exports = getList;