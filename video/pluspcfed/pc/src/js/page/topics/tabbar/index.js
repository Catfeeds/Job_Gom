var fetch = require('io/fetch');
var url = require('io/url');
require('module/tmodHelper/truncateByteLen')();
require('module/tmodHelper/truncateLenByJson')();
var tplList = require('../topicList.tpl');

var init = {
	tabData: {},
	data: {
		gid : $('.circle-l-l-tab').attr('data-gid')
	},
	requestType() {
		$('.circle-l-l-t-topic').find('a').on('click', function(event) {
			event.preventDefault();
			$(this).parent().addClass('tabtopic-active').siblings().removeClass('tabtopic-active');
			if(init.tabData[$(this).attr('data-type')]){
				init.changeTab($(this).attr('data-type'), init.tabData);
			} else {
				init.changeTab($(this).attr('data-type'));
			}
		})
	},
	changeTab(index, tabData) {
		if(tabData){
			$('[data-node=content]').html(tplList({
            	data : tabData[index],
            	type : index,
            	domain : $GLOBAL_CONFIG['group_domain']
            }));
            $('.page').html('');
            if(tabData[index].data.link_url)$('.page').html(tabData[index].data.link_url);
		} else {
			fetch.get(url.get('moreTopics'), {
            // validate: true,
	            data: {
	                gid : init.data.gid,
	            	type : index
	            }
	            /*,
	            onLogin: function (){
	                $_CONFIG['islogin'] = '1';
	                noRefreshFetch();
	            }*/
	        }).done(function(data/*, textStatus, jqXHR*/) {
	            if (data && data.success) {
	                // console.log(data)
	            	init.tabData[index] = data;
	                $('[data-node=content]').html(tplList({
	                	data : data,
	                	type : index,
	                	domain : $GLOBAL_CONFIG['group_domain']
	                }));
	                $('.page').html('');
	                if(data.data.link_url)$('.page').html(data.data.link_url);
	            }
	        }).fail(function(/*jqXHR, textStatus, errorThrown*/) {
	            // console.log(arguments);
	        }).always(function() {
	            // $els.attr('data-firing', 0);
	        });
		}
	}
}

module.exports = {
	init : init.requestType
}
