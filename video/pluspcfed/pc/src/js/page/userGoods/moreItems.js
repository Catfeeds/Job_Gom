var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint');
var pageNum = 2;
var featuredList = null;
var flag = true;


//添加html
function appendHtml(data, type, callback) {
    var html = '';
    for (var i = 0, len = data.length; i < len; i++) {
        var url = 'https://item.gome.com.cn/' + data[i].id + '-' + data[i].skuID + '.html?' + (data[i].trId ? 'stid=' + data[i].trId : '') + '&mid=' + $_CONFIG.shopId;
        html += `<li>
            <div class="clearfix user-goods-good">
              <a href="` + url + `" target="_blank">
                <img src="` + data[i].imageUrl + `">
              </a>
            </div>
            <div class="clearfix user-goods-goods">`;
        if (data[i].flag === 1) {
                html += '<span class="user-goods-main">自营</span>';
        } else if (data[i].flag === 2) {
                html += '<span class="user-goods-rival">海外购</span>';
        } else if (data[i].flag === 3) {
                html += '<span class="user-goods-shop">门店</span>';
        }
        html += `<a href="` + url + `" target="_blank" title="` + data[i].name + `">` + data[i].name + `</a>
            </div>
            <div class="user-goods-priceBox clearfix">
              <span class="user-goods-price">￥` + /*(type === '0' ? Number(data[i].price, 10).toFixed(2) : data[i].price)*/ data[i].price + ` </span>
            </div>
            <div class="user-goods-info clearfix">
                <span class="user-goods-ret">
                  <span>佣金</span>
                  <span class="user-goods-rnum">最高￥` + (parseInt(data[i].commission) / 100).toFixed(2) + `</span>
                </span>
            </div>
            <div class="up-btn">
              <a class="user-goods-` + (data[i].onShelf ? 'down' : 'up') + ` J-good-sold" data-node="good-sold" href="javascript:;" data-itemid="` + data[i].id + `" data-skuid="` + data[i].skuID + `" data-identification="` + data[i].identification + `" data-status="` + Number(data[i].onShelf) + `"> ` + (data[i].onShelf ? "已" : "") + `上架</a>
            </div>
        </li>`;
    }
    $('.J-goods-list').append(html);
    //判断是否全部上架
    var $soldUp = $('[data-node="good-sold"]');
    var $rapidPutaway = $('[data-node="rapid-putaway"]');
    var flag = false; //表示已全部上架
    $soldUp.each(function() {
        var _status = $(this).attr('data-status');
        if (_status == 0) {
            flag = true;
        }
    });
    callback.call();

    if (flag) {
        $rapidPutaway.removeClass('putaway');
    } else {
      return;
    }
    //图片加载
    require('./imgError').init();
}

module.exports = {
    init: function() {
        $(document).on('scroll', function() {
            var $goodsList = $('[data-node="goodsList"]');
            if ($goodsList.height() + $goodsList.offset().top >= ($(window).height() + $(window).scrollTop())) return;
            if (!flag) return;
            flag = false;
            var _this = $('.J-goods-getMore');
            /**
            *@tip:精选tab是一次请求所有的数据，前端做分页；
            *     其他tab页后端支持分页，故每次请求只返回一页数据；
            */
            if($_CONFIG.type == 0){//精选tab
                if(!featuredList){//没有请求数据时
                    JXpage();
                }else{//已请求过数据
                    if(!featuredList.length) return;
                    appendHtml(featuredList.splice(0, 16), $_CONFIG.type, function() {
                        var loadHtml = featuredList.length == 0 ? '<span class="user-goods-moreLogo"><span>没有更多商品了</span></span>' : '';
                        var normal = featuredList.length == 0 ? 'user-goods-normal' : '';
                        _this.html(loadHtml).addClass(normal);
                        flag = true;
                    });
                }
            }else{//其他三个tab
                elsePage();
            }
            function JXpage(){//精选tab获取数据方法
                _this.addClass('more-loading');
                _this.html('<span class="user-goods-moreLoding">加载中...</span>');
                fetch.get(url.get('hotGoods') + $_CONFIG.type + '&pageNum=2', {}).then(function(result) {
                    featuredList = result.items;
                    featuredList.splice(0, 16);
                    if(!featuredList.length) return;//没有第二页数据
                    appendHtml(featuredList.splice(0, 16), $_CONFIG.type, function() {
                        var loadHtml = featuredList.length == 0 ? '<span class="user-goods-moreLogo"><span>没有更多商品了</span></span>' : '';
                        var normal = featuredList.length == 0 ? 'user-goods-normal' : '';
                        _this.html(loadHtml).addClass(normal);
                        flag = true;
                    });
                }, function(result) {
                    _this.html('<span class="user-goods-moreLogo" data-action="retry"><span class="user-goods-moreIcon">加载失败，点击重试</span></span>');
                    //获取数据失败后点击可重新获取
                    $('[data-action=retry]').on('click',JXpage);
                })
            }
            function elsePage(){//其他三个tab获取数据方法
                _this.addClass('more-loading');
                _this.html('<span class="user-goods-moreLoding">加载中...</span>');
                fetch.get(url.get('hotGoods') + $_CONFIG.type + '&pageNum=' + pageNum, {}).then(function(result) {
                    if(!result.items.length) return;
                    appendHtml(result.items, $_CONFIG.type, function() {
                        var loadHtml = result.items.length == 0 ? '<span class="user-goods-moreLogo"><span>没有更多商品了</span></span>' : '';
                        var normal = result.items.length == 0 ? 'user-goods-normal' : '';
                        _this.html(loadHtml).addClass(normal);
                        pageNum++;
                        flag = true;
                    })
                },function(result) {
                    _this.html('<span class="user-goods-moreLogo" data-action="retry"><span class="user-goods-moreIcon">加载失败，点击重试</span></span>');
                    //获取数据失败后点击可重新获取
                    $('[data-action=retry]').on('click',elsePage);
                });
            }
        })
    }
}
