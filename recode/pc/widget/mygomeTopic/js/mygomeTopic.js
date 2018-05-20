(function() {
    var hotTopics = mygomeTopicData.data.data;
    if (hotTopics.topics) {
        var publishedTopics;
        var collectedTopics;
        var row = [];
        var $rows;
        var topicsDatas = [];
        var isFirst = true;
        var isAppend = [true, true, true];
        var html = '<div class="pluspc-mygomeTopic-box" data-small="pluspc-mygomeTopic-boxS">'
                +'<div class="pluspc-mygomeTopic-cont clearfix ">'
                    +'<div class="pluspc-mygomeTopic-tab">'
                        +' <div class="pluspc-left-tab J-pluspcTopic-tab">'
                            +'<a href="javascript:;" class="active">热门话题</a>'
                            +'<a href="javascript:;">我发布的话题</a>'
                            +'<a href="javascript:;">我收藏的话题</a>'
                        +'</div>'
                        +'<div class="pluspc-right-tab J-pluspc-create" >'
                            +'<a href="'+ hotTopics.createTopicUrl +'" target="_blank">发布话题</a>'
                        +'</div>'
                    +'</div>'
                    +'<div class="pluspc-mygomeTopic-list pluspc-mygomeTopic-show J-pluspcTopic-tabBox" >'
                        +'<div class="clearfix">'    
                            +'<div class="pluspc-topic-list"></div>'
                            +'<div class="pluspc-topic-list"></div>'
                            +'<div class="pluspc-topic-list pluspc-topic-last"></div>'
                        +'</div>'
                        +'<div class="pluspc-moreTopic">'
                              +'<p>没看够？去发现更多<a href="'+ hotTopics.homeUrl+ '" target="_blank">精彩话题</a>吧～</p>'
                        +'</div>'
                    +'</div>'
                    +'<div class="pluspc-mygomeTopic-list J-pluspcTopic-tabBox" >'
                        +'<div class="J-pluspc-info" style="display:none;">'
                            +'<div class="clearfix">'    
                                +'<div class="pluspc-topic-list"></div>'
                                +'<div class="pluspc-topic-list"></div>'
                                +'<div class="pluspc-topic-list pluspc-topic-last"></div>'
                            +'</div>'
                            +'<div class="pluspc-moreTopic">'
                                  +'<p>查看更多<a href="'+ hotTopics.publishedTopicUrl+'" target="_blank">我发布的话题</a></p>'
                            +'</div>'
                        +'</div>'
                        +'<div class="pluspc-noTopic J-pluspc-normal">'
                            +'<p>这里空空的~快去<a href="'+ hotTopics.createTopicUrl +'" target="_blank">发布话题</a>吧！</p>'
                        +'</div>'
                        +'<div class="pluspc-noTopic J-pluspc-error">'
                            +'<p>系统繁忙，请稍后再试。<a href="'+ window.location.href +'">点击刷新</a></p>'
                        +'</div>'
                        +'<div class="pluspc-topic-loading J-pluspc-loading"><span>加载中</span></div>'
                    +'</div>'
                    +'<div class="pluspc-mygomeTopic-list J-pluspcTopic-tabBox" >'
                        +'<div class="J-pluspc-info" style="display:none;">'
                            +'<div class="clearfix">'    
                                +'<div class="pluspc-topic-list"></div>'
                                +'<div class="pluspc-topic-list"></div>'
                                +'<div class="pluspc-topic-list pluspc-topic-last"></div>'
                            +'</div>'
                            +'<div class="pluspc-moreTopic">'
                                  +'<p>查看更多<a href="'+ hotTopics.collectedTopicUrl+'" target="_blank">我收藏的话题</a></p>'
                            +'</div>'
                        +'</div>'
                        +'<div class="pluspc-noTopic J-pluspc-error">'
                            +'<p>系统繁忙，请稍后再试。<a href="'+ window.location.href +'">点击刷新</a></p>'
                        +'</div>'
                        +'<div class="pluspc-noTopic J-pluspc-normal">'
                            +'<p>暂无收藏话题~快去发现更多<a href="' + hotTopics.homeUrl + '" target="_blank">精彩话题</a>吧！</p>'
                        +'</div>'
                        +'<div class="pluspc-topic-loading J-pluspc-loading"><span>加载中</span></div>'
                    +'</div>'
                +'</div>'
            +'</div>';
        mygomeTopicElement.html(html);
        var hostMaps = {
            '//js.dev.meixincdn.com:1314/CDN8053/':'pre',
            '//js.meixincdn.com/m/pc/':'online'
        };
        var currentHostType = typeof gomeplusCdn !== 'undefined' ? hostMaps[gomeplusCdn] : 'online';
        var apiLink = '';
        switch(currentHostType){

            case 'pre':
                apiLink = '//api-pluspc.atguat.com.cn/widget/index';
            break;

            default:
                apiLink = '//api-pluspc.gome.com.cn/widget/index';
        }
        var waterFull = {
            createChild: function(data) {
                var items = data.itemShow;
                var html = '<div class="pluspc-topic-box ' + (data.imageShow !== '' ? '' : 'no-pic') + '">';
                //有无话题主图
                if (data.imageShow !== '') {
                    html += '<div class="pluspc-topic-img">'
                              +'<a href="'+ data.topicDetailUrl +'" target="_blank">'
                                +'<span class="pluspc-topic-img-bg"></span>'
                                  +'<img src="'+ data.imageShow +'" alt="'+ data.nameShow +'">'
                              +'</a>'
                          +'</div>';
                }
                //话题内容区域
                html += '<div class="pluspc-topic-cont">';
                html += '<p class="pluspc-topic-title">'
                            //+'<em class="set-top">置顶</em>'
                            +'<a href="'+ data.topicDetailUrl +'" target="_blank">'+ data.nameShow +'</a>'
                        +'</p>'
                        +'<p class="pluspc-topic-icon clearfix">'
                            +'<span class="icon-like">'+ data.likeQuantity +'</span>'
                            +'<span class="icon-discuss">'+ data.replyShow +'</span>'
                        +'</p>'
                        +'<p class="pluspc-topic-description">'
                            +'<a href="'+ data.topicDetailUrl +'" target="_blank">'+ data.textShow +'</a>'
                        +'</p>';

                //话题中商品
                if (items.length > 0) {
                    html += '<div class="pluspc-goods-list">'
                    for (var i =0, len = data.itemShow.length; i < len; i++) {
                        html += '<div class="pluspc-goods-box clearfix">'
                                    +'<a href="'+ items[i].itemDetailUrl +'" target="_blank">'
                                        +'<div class="pluspc-goods-img">'
                                                   +'<img src="'+ items[i].url +'" alt="'+ items[i].item.name +'">'
                                        +'</div>'
                                        +'<div class="pluspc-goods-text">'
                                            +'<p class="pluspc-goods-title">'+ items[i].item.name +'</p>'
                                            +'<p class="pluspc-goods-price">'+ items[i].item.salePrice +'</p>'
                                        +'</div>'
                                    +'</a>'
                                + '</div>'
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
                return html;
            },
            getRows: function(index) {
                $rows = $('.pluspc-mygomeTopic-list').eq(index).find('.pluspc-topic-list');
                row = $('body').hasClass('w1000') || $('body').hasClass('w990')  ? [$rows.eq(0), $rows.eq(1)] : [$rows.eq(0), $rows.eq(1), $rows.eq(2)];
            },
            sortByHeight: function() {
                row.sort(function(a, b) {
                    return a.height() - b.height();
                });
                return row;
            },
            append: function(data, index) {
                this.getRows(index);
                var rows = waterFull.sortByHeight(index);
                var list = $('.pluspc-mygomeTopic-cont .J-pluspcTopic-tabBox').eq(index);
                //有数据
                if (data) {
                    //有list
                    if(data.topics){
                        $('.pluspc-mygomeTopic-list').eq(index).find('.J-pluspc-info').show();
                        for (var i = 0, len = data.topics.length; i < len; i++) {
                            rows = waterFull.sortByHeight(index);
                            rows[0].append(waterFull.createChild(data.topics[i]));
                            rows[0].find('img').error(function(){
                                $(this).attr('src', '//app.gomein.net.cn/images/grey.gif');
                            });
                        }
                        if (data.topics.length > 29) {
                            list.find('.pluspc-moreTopic').show();
                        }
                    }else{
                        list.find('.J-pluspc-info').hide();
                        list.find('.J-pluspc-normal').show();
                    }
                }
                if( index === 0 && isFirst ){
                    mygomeTopicElement.css('height', 'auto');
                    isFirst = false;
                }
            },
            tab: function() {
                $('body').on('click', '.J-pluspcTopic-tab a', function() {
                    var index = $('.J-pluspcTopic-tab a').index($(this));
                    var $tabWraps = $('.J-pluspcTopic-tabBox');
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings().removeClass('active');
                        $tabWraps.removeClass('pluspc-mygomeTopic-show').eq(index).addClass('pluspc-mygomeTopic-show');
                        index === 1 ? $('.J-pluspc-create').show() : $('.J-pluspc-create').hide();
                        index > 0 && waterFull.getOther( index );
                        if(isAppend[index] && topicsDatas[index] ){
                            waterFull.append( topicsDatas[index], index );
                            isAppend[index] = false;
                        }
                    }
                });
            },
            getOther: function( index ) {
                var flags = ['', 'publishedTopic', 'collectedTopic'];
                var $list = $('.pluspc-mygomeTopic-cont .J-pluspcTopic-tabBox').eq(index);
                var $list;
                var i;
                if( !topicsDatas[index] ){
                    $.ajax({
                        url: apiLink,
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {
                            "tplname": 'mygome_topic',
                            "flag": flags[index]
                        },
                        success: function(result) {
                            $list.find('.J-pluspc-loading').hide();
                            if (result.code === 200) {
                                $list = $('.pluspc-mygomeTopic-show');
                                i = $('.J-pluspcTopic-tabBox').index($list);
                                topicsDatas[index] = result.data.data
                                if( index === i ){
                                    waterFull.append(topicsDatas[index], i);
                                    isAppend[index] = false;
                                }
                            } else {
                                $list.find('.J-pluspc-error').show();
                            }
                        },
                        error: function(){
                            $list.find('J-pluspc-loading').hide();
                            $list.find('.J-pluspc-error').show();
                        }
                    });
                }
            },
            init: function() {
                waterFull.append(hotTopics, 0);
                waterFull.tab();
            }
        }

        waterFull.init();
    }

})();
