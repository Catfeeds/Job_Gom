var fetch = require("io/fetch");
var url = require('io/url');
var $form = $('[data-node=form]');
// var $categoryLi = $form.find('[data-node=categoryLi]');
var $categoryForm = $form.find('[data-node=categoryForm]');
var $categoryActive = $form.find('[data-node=categoryActive]');
var $categoryTxt = $form.find('[data-node=categoryTxt]');
var $categoryList = $form.find('[data-node=categoryList]');
var $categoryTip = $form.find('[data-node=categoryTip]');
var $document = $(document);

var listData;

var getChooseData = function(callback) {
    callback = callback || function() {};
    var $categoryList = $form.find('[data-node=categoryList]');
    $categoryList.children().remove();
    fetch.get(url.get('getMasterTypeList')).done(function(data) {
        listData = data.data.expertCategories;
        $(listData).each(function() {
            $categoryList.append('<a href="javascript:;" data-id="' + this.id + '">' + this.name + '</a>')
        });
        callback();
    }).fail(function() {
        alert("数据请求失败 请稍后尝试");
    });
};

var init = function() {
    $categoryActive.on('click', function() {
        if (!listData) {
            getChooseData();
        }
        $categoryActive.addClass('active');
        $categoryList.css('display', 'block');
    });
    $categoryList.on('click', 'a', function(event) {
        $categoryActive.removeClass('active');
        $categoryList.css('display', 'none');
        $categoryTxt.attr('data-id', $(event.target).attr('data-id')).html(event.target.innerHTML);
        $categoryTip.html('');
    });
    //点击空白事件处理
    $document.on('click', function(event) {
        if (!$categoryForm.is(event.target) && $categoryForm.has(event.target).length === 0) {
            $categoryList.css('display', 'none');
            $categoryActive.removeClass('active');
        }
    });
}

module.exports = {
    init: init,
    getChooseData: getChooseData
};