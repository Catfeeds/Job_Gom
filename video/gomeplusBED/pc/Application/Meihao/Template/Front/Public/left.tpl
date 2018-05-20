<div id="aside-meihao">
	<div class="main-container">
		<dl class="index">
			<dd <?php if($activeUrl == 'home'): ?> class="active" <?php endif; ?> > <em></em><a class="black" href="<{$meihao_domain}>">首页 </a></dd>
		</dl>
		<dl class="con-manager">
			<dt><em></em><span>内容管理 </span></dt>
			<dd <?php if($activeUrl == 'topicList'){ ?> class="active" <?php } ?>>
				<a href="<{$meihao_domain}>article/topicList">文章管理    </a>
			</dd>
		</dl>
		<dl class="seting">
			<dt><em></em><span>设置       </span></dt>
			<dd <?php if($activeUrl == 'index'){ ?> class="active" <?php } ?>> 
                            <a href="<{$meihao_domain}>setting/index">账号信息设置</a>
                        </dd>
		</dl>
	</div>
	<div class="secondary-container">
		<dl>
			<dd><a target="_blank" href="<{$meihao_domain}>index/protocol">平台协议</a></dd>
			<dd><a target="_blank" href="<{$meihao_domain}>guide/index">操作指南</a></dd>
		</dl>
	</div>
</div>