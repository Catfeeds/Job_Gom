/**
 *
 Created by zhangzhao on 2017/5/5.
 Email: zhangzhao@gomeplus.com
 */

export let items = `
    <% for(var i = 0, len = multipleImageText.length; i < len; i++) {%>
        <li>
            <div class="img">
                <a href="/v/<%=multipleImageText[i].id%>.html" target="_blank">
                    <img src="<%=multipleImageText[i].image%>"/>
                    <em class="icon-13"></em>
                    <span class="time"><%=$helpers.formatMsToDuration(multipleImageText[i].length)%></span>
                </a>
            </div>
            <a href="/v/<%=multipleImageText[i].id%>.html" target="_blank" class="list-title"><%=$helpers.overflowStr(multipleImageText[i].title)%></a>
            <div class="num">
	            <a href="/sub/<%=multipleImageText[i].publisher.id%>.html" target="_blank" class="list-name">
	                <img src="<%=multipleImageText[i].publisher.icon%>" onerror="javascript:this.style.display='none';" />
	                <span><%=multipleImageText[i].publisher.name%></span>
	            </a>
                <div class="fr">
                    <em class="icon-15"></em>
                    <span><%=$helpers.numberFormat(multipleImageText[i].praise_num)%></span>
                </div>
            </div>
            
        </li>
    <%}%>
`;