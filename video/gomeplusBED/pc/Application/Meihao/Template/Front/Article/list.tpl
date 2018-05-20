<?php
	$csspath = "meihaoListManager.css";
	$jspath = "/js/conf/meihaoListManager.js";
?>

<include file="Front/Public/header" />
<div class="meihao clearfix">
    <include file="Front/Public/left" />
    <div id="meihao-list-manager">
        <h2>文章管理</h2>
        <div class="article-title clearfix"> <span>已发文章</span>
            <div class="release"> <a target="_blank" href="publish?from=0">新建文章</a></div>
        </div>
        <empty name="list">
            <div class="create-msg">点击 "新建文章" 开始写文章~    </div>
        <else />

            <ul class="article-list" style="display:block;" data-node="releasedList">
                <foreach name="list" item="val">
                    <li class="clearfix" data-groupid="<{$val['groupId']}>" data-topicid="<{$val['topicId']}>" data-node="topicItem">
                        <a class="pic" target="_blank" href="<{$group_domain}>topic/<{$val['topicId']}>.html">
                            <img onerror="imgError(this, 'm')" src="<{$val['pic']}>">
                        </a >
                        <a title="<{$val['titleName']|htmlspecialchars=###}>" class="con" target="_blank" href="<{$group_domain}>topic/<{$val['topicId']}>.html">
                            <{$val['titleName']|htmlspecialchars=###}>
                        </a>
                        <div class="date">发布时间:<{$val['updateTime']|substr=###,0,10|date="Y-m-d H:i:s",###}></div>
                        <div class="oparate">
                            <a target="_blank" class="edit" href="publish?tid=<{$val['topicId']}>&from=1">编辑</a>
                            <a class="delete" data-action="delTopic" href="javascript:;">删除</a>
                        </div>
                    </li>
                </foreach>
            </ul>
            <div class="page" style="display:block;">
                <{$linkUrl}>
            </div>
        </empty>

    </div>
</div>
<include file="Home@Public:mh_footer"/>