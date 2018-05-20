var fetch = require('io/fetch');
var url = require('io/url');
var upload = require('./upload');
var tplToast = require('./toast.tpl');

var $upIcon = $('#up_icon');
var $mainToast = $('.main-toast');

var init = {
	getPCStatus() {
		fetch.get(url.get('h5QruploadStatus'), {
			data: {
	            pageId: pageId || window.pageId,
	            qrcodeId: qrcodeId || window.qrcodeId
	        }
	    }).done(function(res) {
	    	if(res.success){
	    		if(res.data.page == "1" && res.data.qrcode == "1") {
		  			if(!res.data.qrcodetime && !window.StatusOnoff){
		  				clearInterval(window.TimeStatus);
		  				$upIcon.attr("disabled",true);
		  				$('#up_icon_more').attr("disabled",true);
						$mainToast.append(tplToast(
							{ data : ["二维码已失效请重新扫描"] }
						));
		  			}
		  		} else if (res.data.page == "2" || res.data.qrcode == "2" || res.code == "500") {
					clearInterval(window.TimeStatus);
					$upIcon.attr("disabled",true);
	  				$('#up_icon_more').attr("disabled",true);
					$mainToast.append(tplToast(
						{ data : ["二维码已失效，请重新扫描后上传"] }
					));
		  		} else {
		  			clearInterval(window.TimeStatus);
		  		}
	    	}
	    }).fail(function(error) {
	    	console.error(error);
	    })
	}
}


module.exports = {
	init : init
};
