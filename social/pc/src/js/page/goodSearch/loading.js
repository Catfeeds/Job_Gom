var loading = function() {
	var hide = 'hide';
	var show = 'show';
    var $searchList = $('[data-node=searchList]');
    var $result= $('[data-node=result]');
    var $noDataShow = $('[data-node=noDataShow]');
    var $page = $('[data-node=page]');
    var $addMoreData = $('[data-node=addMoreData]');
    $searchList.addClass(hide);
    $result.addClass(hide);
    $noDataShow.removeClass(show).addClass(hide);
    $page.removeClass(show).addClass(hide);
    $addMoreData.removeClass(hide);
};

module.exports = loading;
