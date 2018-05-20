$(function(){
	var $parent = $(".active").parents("dl");
    $parent.addClass("on");
})


$('dt a').on('click',function(){
	var $this = $(this);
	var $b = $this.find('b');
	var $dl = $this.parents('dl');
	var $dt = $this.parent('dt');
	var $dd = $dt.siblings('dd');
	

	if($dd.is(':hidden')){
		//$b.text('－');

		$dd.slideDown();
		$dl.addClass('on');

	}else{
		//$b.text('+');

		$dd.slideUp();
		$dl.removeClass('on');
	}
	
})


