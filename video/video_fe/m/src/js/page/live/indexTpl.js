/**
 * [index item tpl]
 */
let tpl = `
<div class="list-item">
	    <a href="/sub/<%=publisher.id%>.html">
            <div class="list-head">
                <div class="fl">
                    <img src="<%=publisher.icon%>"><span><%=publisher.name%></span>
                </div>
            </div>
		</a>
		<a href="/s/<%=id%>.html">
            <div class="item-img">
                <img onerror="javascript:this.style.display='none';" src="<%=image%>">
                <div class="live-flag"><%=live_status%></div>
                <span class="item-flag"><i><%=start_time%></i></span>
            </div>
			<h2 class="item-title"><%=title%></h2>
		</a>
</div>`;

module.exports = tpl;