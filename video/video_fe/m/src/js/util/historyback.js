/**
 * [header history back]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
function init(){
	var $header = $('[data-node="header"]');
	var $backBtn = $header.find('[data-action="back"]');

	$backBtn.on('click',function(){
		if (history.length < 1) {
			location.href = '/user/index.html';
		}else{
			history.back();
		}
		return false;
	});
}

export default init;