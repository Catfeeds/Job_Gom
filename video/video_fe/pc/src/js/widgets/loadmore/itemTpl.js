/**
 *
 Created by zhangzhao on 2017/5/5.
 Email: zhangzhao@gomeplus.com
 */
export let items=`
    <% for(var i = 0, len = publisher.length; i < len; i++) {%>
        <li class="fl">
            <div class=" unslider-item">
                <a class="head" href="/sub/<%=publisher[i].id%>.html">
                    <img src="<%=publisher[i].icon%>" onerror="javascript:this.style.display='none';">
                </a>
                <h3 class="nickname">
                    <a href="/sub/<%=publisher[i].id%>.html"><%=publisher[i].name%></a>
                </h3>
                <p class="desc"><%=publisher[i].summary%></p>
                <div class="fans">粉丝：<span data-id="subnum"><%=publisher[i].subscribe_num%></span></div>
                <div class="subscribe-btn <%=(publisher[i].is_subscribe ? ' active ' : '')%>" data-action="subscribe" data-subscribeid="<%=publisher[i].id%>" data-status="<%=publisher[i].is_subscribe%>">
                    <span>＋订阅</span>
                    <em>已订阅</em>
                    <b>取消订阅</b>
                </div>
            </div>
        </li>
    <%}%>
`;