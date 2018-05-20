require('placeholder');
var $header = $('div[data-node="header"]'),
    $listBox = $header.find('div[data-node="selectList"]'),
    $selectBox = $header.find('p[data-node="selectbtn"]'),
    $selected = $selectBox.find('span[data-node="selected"]'),
    $searchInput,
    $searchBtn = $header.find('[data-node="searchbtn"]'),
    timer = null;
    require('placeholder');

// var indexOf = require('lodash/indexOf');
/*var selector = {
    'index': ['goods', '商品'],
    'topics': ['topic', '话题'],
    'group': ['group', '圈子'],
    'shop': ['shop', '店铺']
};*/
var searchUrl = {
    'group': $_CONFIG.group_domain + 'search/group?word=',
    'goods': $_CONFIG.product_search_gome + '/search?question=', // http://search.atguat.com.cn/search?question=电视
    'topic': $_CONFIG.group_domain + 'search/topics?word=',
    'shop': $_CONFIG.shop_search_gome + '/search?shop=' // TODO
};
var bp_types = {
    'group': 'group',
    'goods': 'product'
};
var analytic = function(keyWord, s_type) { // 发送埋点数据
    if (window.BP !== undefined) {
        BP.send({
            event_id: 'B000P009',
            s_word: keyWord,
            s_type: s_type
        });
    }
};

var searchKeyword = function(obj) {
    var location = window.location.href;
    var keyWord = encodeURIComponent($.trim(obj.value)),
        _type = $selected.attr('data-selected');
    if (keyWord !== '') {

        if (location.indexOf('/search/') !== -1 && location.indexOf('word=') !== -1) {
            window.location.href = searchUrl[_type] + keyWord;
        } else {
            window.open(searchUrl[_type] + keyWord);
        }
        analytic(keyWord, bp_types[_type]);
    }
}

var init = function(node) {

    $searchInput = $header.find(node);
    //搜索下拉框选择
    $listBox.on('click', 'a', function() {
        var _this = $(this);
        $selected.text($(this).text()).attr('data-selected', _this.attr('data-selector'));
        $listBox.hide();
    });

    //搜索悬停
    $selectBox.hover(function() {
        $listBox.show();
    }, function() {
        timer = setTimeout(function() {
            $listBox.hide();
        }, 50);
    });

    //下拉框悬停
    $listBox.hover(function() {
        clearTimeout(timer);
    }, function() {
        $listBox.hide();
    });

    //搜索框
    $searchInput.placeholder();

    //搜索框enter
    $searchInput.on('keydown', function(e) {
        var keycode = e.which;
        //处理回车的情况
        if (keycode === 13) {
            searchKeyword(this);
        }
    });

    //搜索按钮
    $searchBtn.on('click', function() {
        searchKeyword($searchInput[0]);
    });

}
module.exports = init;
