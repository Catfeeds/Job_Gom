function screenChange(){
    $(window).width() > 1024 ? $('body').removeClass('screen-lit') : $('body').addClass('screen-lit');
};
function init(){
	window.onresize = screenChange;
	screenChange();
}
module.exports.init = init;