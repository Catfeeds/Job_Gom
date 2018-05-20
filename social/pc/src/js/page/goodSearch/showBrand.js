/**
 *  商品搜索页面--显示更多品牌、品牌切换
 * @author Qiaoli
 */

var $wrap = $('[data-node=wrap]');
var $brandList = $('[data-node=brandList]');
var $brandLi = $('[data-node=brandList]').find('li');
var $letterList = $('[data-node=letterList]');
var fetch = require('io/fetch');
var url = require('io/url');

var active = 'active';

//点击更多
var showBrandList = function(t) {
    var $this = $(t);
    var parents = $this.parents('[data-node=wrap]');
    var letterLen = parents.find('[data-node=letterList]').length;
    if (!parents.hasClass(active)) {
        parents.addClass(active);
        $this.html('更多<em class="icon-down"></em>');
        if (letterLen) {
            $letterList.find('a').removeClass(active);
            $letterList.find('a:eq(0)').addClass(active);
            $brandList.find('li').show();
        }
    } else {
        parents.removeClass(active);
        $this.html('收起<em class="icon-up"></em>');
        if (letterLen) {
            getBrand();
        } else {
            return false;
        }
    }
};

var getBrand = function() {
    if ($('[data-node=letterList] a').length > 2) {
        return false;
    } else {
        fetch.get(url.get('getBrand'), {
            data: {
                words: $wrap.eq(0).data('brands')
            }
        }).done(function(data) {
            if (data.success === true) {
                var brandLetter = data.data.upperWord;
                var brandWord = data.data.firstWord;
                $.each(brandLetter, function(i, k) {
                    k = (k == 'Other') ? '#' : k;
                    var html = '<a href="javascript:;">' + k + '</a>';
                    $letterList.append(html);
                })
                $.each($brandLi, function(i, v) {
                    $(v).attr('data-word', brandWord[i]);
                })
            }
        })
    }
}

//鼠标经过切换品牌字母
var showOneBand = function(t) {
    var $this = $(t);
    var curVal = $this.text().toLowerCase();
    $letterList.find('a').removeClass(active);
    $this.addClass(active);
    changeBand(curVal);
};

//鼠标经过切换品牌
var changeBand = function(type) {
    type = (type == '#') ? 'other' : type;
    if (type == '所有品牌') {
        $brandList.find('li').show();
    } else {
        $brandList.find('li').hide();
        $brandList.find('li[data-word=' + type + ']').show();
    }
};

var init = function() {
    $wrap.on('click', '[data-action=more]', function() {
        showBrandList(this);
    });
    $letterList.on('mouseenter', 'a', function() {
        showOneBand(this);
    });
};

module.exports = {
    init: init
};