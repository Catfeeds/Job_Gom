/* css */
import 'css/page/sub-relate/index.scss';
import GMP from 'GMP';
import Scrollload from 'Scrollload';
import fetch from 'io/fetch';
import toast from 'components/toast';
import {page} from 'util/phpCommon';
import Subscribe from 'components/action/subscribe.js';
import historyBack from 'util/historyback';
import 'widgets/head/index';
import formatNumber from 'util/formatNumber';

historyBack();

var load = function(keyword, pageNum) {
    return fetch.get('/searchPublisher.json', {
        data: {
            keyword: keyword,
            page: pageNum,
            size: 10
        }
    });
};
var pageNum = 1;

let tpl = `
    <% for(var i = 0, len = list.length; i < len; i++) { %>
        <li class="msgList" data-id="subcontent">
            <div class="msgNav">
                <a href="/sub/<%=list[i].id%>.html">
                    <div class="msgNav-head fl">
                        <div>
                            <img src='<%=list[i].icon%>' onerror='javascript:this.style.visibility="hidden";' />
                        </div>
                    </div>
                </a>
                <ul class="msgNav-msg fl">
                    <li class="msgNav-name"><%=list[i].name%></li>
                    <li class="msgNav-intr"><%=list[i].summary%></li>
                    <li class="msgNav-fans"><span data-id="subnum"><%=list[i].subscribe_num%></span>人订阅</li>
                </ul>
                <div class="subscripBtn <%=(list[i].is_subscribe ? ' active ' : '')%> fr" data-action="subscribe" data-subscribeid="<%=list[i].id%>" data-status="<%=list[i].is_subscribe%>">
                    <span class="show"><em>+</em>订阅</span>
                    <span class="hide">已订阅</span>
                </div>
            </div>
        </li>
	<%}%>
`;

let error = `<div class="no-data no-dy">
		        <div class="img"></div>
		        <p>暂无订阅记录</p>
	        </div>`;

let scrollload =new Scrollload(document.getElementById('wrap'), function(sl) {
    if (!page.loadMore) {
        sl.noData();
        return;
    }
    pageNum++;
    var scrollLoadError = function(){
        sl.throwException();
        toast('网络请求异常');
    };
    load(page.keyword, pageNum).done(function(json) {
        if(json && json.code === 200){
            var list = json.data.publisher;
            var len = list.length;
            if (pageNum === 1 && len === 0) {
                $('[data-id=subList]').empty().append(error);
                $(sl.bottomDom).hide();
                return;
            }
            if(len){
                let html = GMP.template(tpl)({
                    list: list
                });
                $('[data-id=subList]').append(html);
                sl.unLock();
            } else {
                sl.noData();
            }
        } else {
            scrollLoadError();
        }
    }).fail(function(){
        scrollLoadError();
    });
}, {
    isInitLock: false,
    loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
    noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
    exceptionHtml: '<div class="top-line no-more clickHandler"><p>出错啦请重试</p></div>'
});

scrollload.bottomDom.addEventListener('click', function (event) {
    if ($(event.target).hasClass('clickHandler')) {
        scrollload.solveException();
    }
});

//   订阅
new Subscribe({
    delegate:'[data-id=subList]',
    afterDoSuccess: function(data){
        var $dom = data.$el;
        var $delegate = data.$delegate;
        var count = data.res.data.total;
        $dom.addClass('active').attr('data-status', 1);
        $dom.siblings().find("[data-id=subnum]").text(formatNumber(count));
        toast('订阅成功');
    },
    afterUndoSuccess: function(data){
        var $dom = data.$el;
        var $delegate = data.$delegate;
        var count = data.res.data.total;
        $dom.removeClass('active').attr('data-status', 0);
        $dom.siblings().find("[data-id=subnum]").text(formatNumber(count));
        toast('已取消订阅');
    }
});