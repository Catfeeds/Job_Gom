/**
 * [index item tpl]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
let tpl = `<%for(var i = 0,len = list.length; i < len; i++){%>
<li class="list-item">
	<%if(list[i].type == '0'){%>
	<a href="/channel/theme/<%=list[i].id%>.html">
	<%}else{%>
	<a href="/channel/live/<%=list[i].id%>.html">
	<%}%>
		<div class="item-img">
			<img onerror="javascript:this.style.display='none';" src="<%=list[i].image%>" alt="<%=list[i].title%>">
			<%if(list[i].video_id.trim() !=''){%>
			<span class="item-flag"><%=list[i].flag%></span>
			<%}%>
		</div>
		<h2 class="item-title"><%=list[i].title%></h2>
		<p class="item-desc"><%=list[i].subhead%></p>
	</a>
</li>
<%}%>
`;
module.exports = tpl;