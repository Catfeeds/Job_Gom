<?php
    $csspath = 'drafts.css';
    $jspath = '/js/conf/talent_draft.js';
?>
<include file="Platform/expert_header" />
<div class="talent clearfix">
    <include file="Platform/expert_left" />

    <div class="drafts">
        <div class="drafts-cont">
            <div class="drafts-title">草稿箱</div>
			<div class="no-draft none" data-node="noDraft">暂无草稿</div>
            <ul class="drafts-list none" data-node="draftListBox">
                <li class="list-top clearfix">
                    <div class="list-title">标题</div>
                    <div class="list-time">保存时间</div>
                    <div class="list-operate">操作</div>
                </li>
            </ul>
			<div class="getMore none" data-pageNum=1 data-action="getMore"><a href="javascript:void(0)"><img class="icon-logo" src="<{$pcimgpath}>/images/talent/logo.png"><span class="text">查看更多></span></a></div>
			<div class="getMore" data-node="loading"><a href="javascript:void(0)"><img class="icon-logo" src="<{$pcimgpath}>/images/talent/logo.png"><span class="text">正在加载...</span></a></div>
		</div>
    </div>

</div>

<include file="Platform/expert_footer" />