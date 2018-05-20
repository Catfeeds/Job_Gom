var dialog = require('module/popup/addGoods/dialog');
var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var tpl = require('module/popup/addGoods/content.tpl');
var itemlist = require('module/popup/addGoods/itemContent.tpl');
var defaultItemlist = require('module/popup/addGoods/defaultItemContent.tpl');
var pubName = require('io/channel');
var indexof = require('lodash/indexOf');
var alert = require('module/popup/alert');

var pageNum = 1;
var maxlength = 9;
var isDefault = true;
var keyWord = '';
var changedList = [];
var isGetMore = false;
var options = {};
var degree = 1;
// var delChanged = [];
var addDialog;

var $searchTop = null,
    $searchInput = null,
    $searchBtn = null,
    $searchNormal = null,
    $searchLoading = null,
    $searchFail = null,
    $searchResult = null,
    $searchList = null,
    // $searchPage = null,
    $changeNum = null,
    $listBox = null,
    $changeList = null,
    $title = null,
    $getMore = null,
    $searchListBox = null;

var selectedGoods = {};

var init = function(changedGoods, max /* 最多可选 */ ) {
    var returnList = [];
    selectedGoods = {};
    // var selectedGoodsBak = {};
    for (var i in changedGoods) {
        changedList.push(~~i);
        returnList.push(changedGoods[i]);
    }

    maxlength = max || 9;
    selectedGoods = $.extend(true, selectedGoods, changedGoods);
    if (maxlength - returnList.length !== 0) {
        options = {
            title: ' ',
            modal: true,
            fixed: true,
            width: 610,
            content: tpl({
                imgSrc: $_CONFIG.imgpath,
                returnList: returnList,
                maxlength: maxlength - returnList.length
            }),
            className: 'pop-box',
            okValue: '插入商品',
            okCls: 'pc-btn pc-btnh35 circle-pop-btn btn-default',
            btnWrapCls: 'insert-cancel',
            ok: function() {
                if ($(this.node).find('[i-id=ok]').hasClass('btn-default')) {
                    return false;
                }
                Pubsub(pubName.setPubliser.changedItem).pub(selectedGoods);
                dialogClosed();
            },
            cancel: function() {
                dialogClosed();
            },
            onshow: function() {

                $('[i="title"]').hide();
                getNode(); //获取节点
                defaultItem(pageNum); //默认输出内容
                searchItem(); //搜索商品
                reGet(); //重新获取
                changeItem(); //选择添加的商品
                getMoreItem(); //加载 更多
                $('body').css({
                    height: '100%',
                    overflowY: 'hidden'
                });
            }
        };

    } else {
        options = {};
    }

    addDialog = dialog.create(options);
    addDialog.show();
};
//获取节点
var getNode = function() {
    $searchTop = $('[data-node="addTopBox"]');
    $searchInput = $searchTop.find('[data-action="addSearchInput"]');
    $searchBtn = $searchTop.find('[data-action="addSearchBtn"]');
    $searchNormal = $('[data-node="searchNormal"]');
    $searchLoading = $('[data-node="searchLoading"]');
    $searchFail = $('[data-node="searchFail"]');
    $searchResult = $('[data-node="searchResultBox"]');
    $searchList = $searchResult.find('[data-node="searchResultList"]');
    $listBox = $searchResult.find('[data-node="changedBox"]');
    $changeList = $listBox.find('[data-node="searchChangeList"]');
    $changeNum = $searchResult.find('[data-node="searchChangeNum"]');
    $title = $('[data-node="title"]'),
        $getMore = $searchResult.find('[data-action="moreItem"]');
    $searchListBox = $searchList.parent();
};

//初始化进弹窗获取数据
var defaultItem = function(pageNum) {
    getItems(url.get('getCollectItem'), {
        data: {
            page: pageNum,
            pagesize: 10
        },
        done: function(result) {
            var html = defaultItemlist({
                itemlist: result.data.collections,
                changedList: changedList,
                indexof: indexof
            });
            if (pageNum === 1) {
                $searchList.html(html);
            } else {
                $searchList.append(html);
            }
        }
    });
};

//搜索 商品
var searchItem = function() {
    $searchInput.on('keyup', function(e) {
        var keycode = e.which;
        isDefault = false;
        isGetMore = false;
        keyWord = $.trim($(this).val());
        //处理回车的情况 
        if (keycode === 13) {
            if (keyWord !== '') {
                if (keyWord.length < 2) {
                    alert('请输入两个字符以上关键词');
                } else {
                    pageNum = 1;
                    $title.hide();
                    $getMore.find('span').html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
                    moreItem(pageNum, keyWord);
                }
            } else {
                alert('请输入关键词');
            }
        }
        //返回我收藏的商品列表
        if (keyWord === '') {
            $searchResult.children().eq(0).hide();
            isDefault = true;
            pageNum = 1;
            $title.show();
            defaultItem(pageNum); //默认输出内容
        }
    });
    $searchBtn.on('click', function() {
        isDefault = false;
        isGetMore = false;
        keyWord = $.trim($(this).prev().val());

        if (keyWord !== '') {
            if (keyWord.length < 2) {
                alert('请输入两个字符以上关键词');
            } else {
                $getMore.find('span').html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
                pageNum = 1;
                $title.hide();
                moreItem(pageNum, keyWord);
            }
        } else {
            alert('请输入关键词');
        }

    });
};

//获取更多商品

var moreItem = function(pageNum, txt) {
    getItems(url.get('getMoreItem'), {
        data: {
            pagenum: pageNum,
            pagesize: 10,
            word: txt
        },
        done: function(result) {
            var html = itemlist({
                itemlist: result.data.items,
                changedList: changedList,
                indexof: indexof
            });
            if (result.pageCount != "1") {
                $getMore.addClass("hide");
            }
            if (pageNum === 1) {
                $searchList.html(html);
            } else {
                $searchList.append(html);
            }
        }
    });
};

//ajax
var getItems = function(link, options) {
    if (pageNum === 1) {
        $searchList.hide();
        $searchFail.hide();
        $searchLoading.show();
        $searchNormal.hide();
    } else {
        $getMore.show();
    }
    fetch.get(link, {
        data: options.data
    }).done(function(result) {

        if (result.code === 200) {
            var resultItem = result.data.collections === undefined ? result.data.items : result.data.collections;
            if (resultItem.length === 0 && isDefault) {
                if (pageNum === 1) {
                    $searchNormal.show().text('暂无收藏的商品，可以搜索查找！');
                } else {
                    $getMore.show().find('span').text('没有可加载内容');
                }
            } else if (resultItem.length === 0) {
                if (pageNum === 1) {
                    $searchNormal.show().text('没有找到相关产品');
                    $searchResult.children().eq(0).hide();
                } else {
                    $getMore.show().find('span').text('没有可加载内容');
                }
            } else {
                $searchResult.show().children().eq(0).show();
                $searchList.show();
                options.done.call(this, result);
                $getMore.hide();
                isGetMore = false;

                if (resultItem.length < 10 && pageNum !== 1) {

                    isGetMore = true;
                    $getMore.show().find('span').text('没有可加载内容');
                }
            }

            // 重新定位弹窗位置
            addDialog.reset();

        } else if (result.code === 881001) {
            if (pageNum === 1) {
                $searchNormal.show().text('没有找到相关产品');
                $searchResult.children().eq(0).hide();
            } else {
                $getMore.show().find('span').text('没有可加载内容');
            }
        } else {
            if (pageNum === 1) {
                $searchFail.show();
            } else {
                $getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
            }
        }
    }).fail(function() {
        if (pageNum === 1) {
            $searchFail.show();
        } else {
            $getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
        }
    }).always(function() {
        $searchLoading.hide();
    });
};

//重新获取
var reGet = function() {
    $searchFail.on('click', function() {
        if (pageNum === 1) {
            $searchLoading.show();
            $searchFail.hide();
            if (isDefault) {
                defaultItem(pageNum);
            } else {
                moreItem(pageNum, keyWord);
            }
        }
    });
    $getMore.on('click', '[node-action="reget"]', function() {
        $(this).parent().html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
        if (isDefault) {
            defaultItem(pageNum);
        } else {
            moreItem(pageNum, keyWord);
        }
    });
};

var changeItem = function() {
    if ($changeList.children().length) {
        $('[i-id=ok]').removeClass('btn-default');
    }
    $searchResult.on('click', '[data-action="item"]', function() {
         var $this = $(this);
         var imgSrc = $this.find('img').attr('src'),
                    pId = $this.attr('data-pId'),
                    shopId = $this.attr('data-shopid'),
                    html = '';
        if(maxlength == 1 ){
            if($changeList.children().length){
                $changeList.empty();
                $searchList.children("dl").removeClass("chosed-mer-true");

            }
            $this.addClass("chosed-mer-true");
            
            if ($changeList.children().length === 0) {
                    $listBox.show();
                }
                selectedGoods = {};
            selectedGoods[pId] = {
                shopId: shopId,
                PId: pId,
                title: $(this).find('[node-data="itemTitle"]').text(),
                img: imgSrc,
                price: $(this).find('[node-data="itemPrice"]').text(),
                link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'
            };    
            html = '<li data-pId="' + pId + '" data-degree="' + degree + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="iconn-66"></em></a></li>';               
        
            $changeList.append(html);
            $changeNum.text(maxlength - $changeList.children().length);
        }else{

            if (!$(this).hasClass('chosed-mer-true')) {
                if ($changeList.children().length >= maxlength) {
                    alert('最多可选取' + maxlength + '个商品');
                    return false;
                }

                changedList.push(~~pId);
                selectedGoods[pId] = {
                    shopId: shopId,
                    PId: pId,
                    title: $(this).find('[node-data="itemTitle"]').text(),
                    img: imgSrc,
                    price: $(this).find('[node-data="itemPrice"]').text(),
                    link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'
                };
                $(this).addClass('chosed-mer-true');
                html = '<li data-pId="' + pId + '" data-degree="' + degree + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="iconn-66"></em></a></li>';
                if ($changeList.children().length === 0) {
                    $listBox.show();
                }
                $changeList.append(html);
                $changeNum.text(maxlength - $changeList.children().length);
            } else {
                var pId = $(this).attr('data-pId'),
                    del = $changeList.find('[data-pid="' + pId + '"]')/*,
                    index = $changeList.children().index(del)*/;

                $(this).removeClass('chosed-mer-true');
                del.remove();
                /*delChanged.push(returnList[index]);
                changedList.splice(index, 1);
                returnList.splice(index, 1);*/
                delete selectedGoods[pId];
                if ($changeList.children().length === 0) {
                    $listBox.hide();
                }
                $changeNum.text(maxlength - $changeList.children().length);

            }


        }

        if ($changeList.children().length) {
            $('[i-id=ok]').removeClass('btn-default');
        } else {
            $('[i-id=ok]').addClass('btn-default');
        }

        addDialog.reset();

    }).on('click', '[data-action="delChanged"]', function() {
        var pId = $(this).closest('li').data('pid');
        var /*index = $changeList.children().index($(this).parents('li')),*/
            _this = this;
        $searchList.find('[data-pId="' + $(_this).parent().attr('data-pId') + '"]').removeClass('chosed-mer-true');

        $(_this).parents('li').remove();
        /*delChanged.push(returnList[index]);
        changedList.splice(index, 1);
        returnList.splice(index, 1);*/
        delete selectedGoods[pId];
        if ($changeList.children().length === 0) {
            $listBox.hide();
        }
        $changeNum.text(maxlength - $changeList.children().length);
        if (!$changeList.children().length) {
            $('[i-id=ok]').addClass('btn-default');
        }
    });
};

//加载更多
var getMoreItem = function() {
    $searchListBox.on('scroll', function() {
        if (!isGetMore && $searchListBox.scrollTop() === ($searchList.height() - $searchListBox.height())) {
            isGetMore = true;
            pageNum++;
            if (isDefault) {
                defaultItem(pageNum);
            } else {
                moreItem(pageNum, keyWord);
            }
        }
    });
};

//弹窗关闭
var dialogClosed = function() {
    degree++;
    $('body').css({
        height: 'auto',
        overflowY: 'auto'
    });

    $searchListBox.off('scroll');
    $searchResult.off('click');
    $searchFail.off('click');
    $searchInput.off('keyup');
    $searchBtn.off('click');
    pageNum = 1;
    // delChanged = [];
    isDefault = true;
    keyWord = '';
    isGetMore = false;
    changedList = [];
};

module.exports = init;