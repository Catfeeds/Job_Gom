var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');

var init = function (){
	var $this = $(this);
	var divEm = $(this).parent();
	var $img = $($this.parents().eq(1)).children('img');
	var imgSrc = $img.attr('src');
	var oldImgSrc = $img.attr('data-oldImg');
	var roteNum =Number.parseInt(divEm.attr('data-roteNum'));

	if(oldImgSrc.indexOf(".gif") != -1){
		alert("gif图不支持旋转");
		return false;
	}else{
		if($this.hasClass('roteLeft')){
			roteNum =(roteNum + 90)%360;
		}else if($this.hasClass('roteRight')){
			roteNum =(roteNum - 90 + 360)%360;
		}

		if(roteNum===0){
			$img.attr('src',oldImgSrc);
			$img.css({
				"transform":"rotate("+roteNum+"deg)",
				"-ms-transform" : "rotate("+roteNum+"deg)",
				"-moz-transform":"rotate("+roteNum+"deg)",
				"-webkit-transform":"rotate("+roteNum+"deg)",
				"-o-transform":"rotate("+roteNum+"deg)"
			});
			divEm.attr('data-roteNum',roteNum);

		}else{
			var params = {
				imgPath : oldImgSrc,
		        angle : roteNum
			}
			fetch.post(url.get('handleimg'), {
		        data: params
		    }).then(function(data) {
		    	
		    	if(data.success){
		    		$img.attr('src',data.data);
		    		divEm.attr('data-roteNum',roteNum);
		    	}else{
		    		alert(data.message);
		    	}
		    });
		}
	}

	
	
}

module.exports = { init }