var shopId = $GLOBAL_CONFIG['shopId'];
var $form =  $(".publish-form");
var tpl = '<a class="show-meidian" data-node="show-meidian" href="javascript:;">'+
				'<span class="menu-checkbox menu-checkbox-checked"></span>展示我的美店'+
			'</a>';
if( shopId ){
	$(tpl).appendTo($form);
	
	$('body').delegate("[data-node='show-meidian']",'click',function(){
		var $this = $(this);
		var $span = $this.find('span');
		if($span.hasClass('menu-checkbox-checked')){
			$span.removeClass('menu-checkbox-checked');
		}else{
			$span.addClass('menu-checkbox-checked');
		}
		return false;
	})
}