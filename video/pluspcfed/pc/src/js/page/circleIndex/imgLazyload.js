require('lazyload');
var $container = $('[data-node=container]');
var tabLazy = function($selector){
	$selector.find('img').lazyload({
		effect: 'fadeIn',
	    failure_limit: 10
	})
};
tabLazy($container);
module.exports = tabLazy;