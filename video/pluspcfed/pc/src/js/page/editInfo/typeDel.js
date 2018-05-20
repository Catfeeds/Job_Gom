var $typeBox = $('[data-node=typeBox]');
function hoverFn(){
	var $this = $(this);
	var $em = $this.find('em');
	$em.removeClass('none');
	$this.addClass('red-border');
	$em.on('click',function(){
		$this.remove();
		if(!$typeBox.find('[data-node="typeItem"]').length){
			$typeBox.append('<span class="no-type">无类目</span>');
		}
	})
};
function leaveFn(){
	var $this = $(this);
	var $em = $this.find('em');
	$em.addClass('none');
	$this.removeClass('red-border');
	$em.off('click');
};
function init(){
	$typeBox.on('mouseenter','[data-node=typeItem]',hoverFn)
	.on('mouseleave','[data-node=typeItem]',leaveFn);
}
module.exports.init = init;