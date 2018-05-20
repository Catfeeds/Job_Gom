$(function(){ 
    $('.flag-f-menu li').click(function(event){
		$(this).find('.sub-f-list').toggle();
		$(this).siblings().find('.sub-f-list').hide();
    })
	 $(document).click(function(event){
	 	console.log(event.target)
		  var _con = $('.flag-f-menu');   // 设置目标区域
		  if(!_con.is(event.target) && _con.has(event.target).length === 0){ 
			$('.flag-f-menu li').find('.sub-f-list').hide();
		  }
	});
})