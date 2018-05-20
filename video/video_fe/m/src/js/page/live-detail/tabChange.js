
export default function(){
		let $form = $('[data-node="editor-form"]');
		let formPreDisplay = false;

		$("[data-node=tab]").on('click','li',function(){
				var $_this = $(this);
				var tab = $_this.attr('data-tab');
			 if(!$_this.hasClass('active')){
					 $_this.siblings().removeClass('active');
					 $_this.addClass('active');
					 var $content = $('[data-content='+tab+']');
					 $content.removeClass('hide').siblings().addClass('hide');
			 }

			 if (tab === 'chat') {
				  if (formPreDisplay) {
					$form.removeClass('hide');
				  }else{
					$form.addClass('hide');
				  }

			 }else{

				if (!$form.hasClass('hide')) {
					$form.addClass('hide');
        			  formPreDisplay = true;
				}else{
					$form.addClass('hide');
         			 formPreDisplay = false;
				}

			 }
		});

}

