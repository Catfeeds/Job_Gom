<?php
	$csspath = "meihaoIndex.css";
    $jspath = "/js/conf/meihaoIndex.js";
?>
<include file="Front/Public/header" />
<div class="meihao clearfix">
	  <include file="Front/Public/left" />
      <div id="meihao-home">
        <notempty name="messageList">
        <div class="notice clearfix">
			<a class="left" target="_blank" href="<{$messageList['notifications'][0]['landingPageUrl']}>"><{$messageList['notifications'][0]['title']}></a><a class="right" target="_blank" href="/message/index">查看更多</a>
		</div>
        </notempty>

        <div class="count-data">
          <div class="con-title">综合数据</div>
          <div class="box clearfix">
            <dl class="con">
              <dt >累计内容发布数</dt>
              <dd data-node='pubNum'><{$totalInfo['meiTopic']?$totalInfo['meiTopic']:0}></dd>
            </dl>
            <dl class="prev">
              <dt>昨日内容总浏览次数</dt>
              <dd><{$totalInfo['meiPageView']?$totalInfo['meiPageView']:0}> </dd>
            </dl>
            <dl class="member">
              <dt>主推圈子总浏览量 / 成员数</dt>
              <dd><{$totalInfo['groupPageView']?$totalInfo['groupPageView']:0}> / <{$totalInfo['groupMemberNumber']?$totalInfo['groupMemberNumber']:0}></dd>
            </dl>
          </div>
        </div>
        <div class="content-manager">
          <div class="con-title">内容管理</div>
          <div class="con-data">

            <div class="article-title clearfix"> <span>已发文章</span>
              <div class="release"> <a target="_blank" href="/article/publish?from=0">新建文章</a></div>
            </div>
            <notempty name="articleList.totalPage">
            <ul class="article-list" style="display:block;" data-node="releasedList">
              <volist name="articleList.topics" id="topics" key="key" >
              <li class="clearfix" data-groupid="<{$topics['groupId']}>" data-topicid="<{$topics['topicId']}>" data-node="topicItem">
                <a class="pic" target="_blank" href="<{$group_domain}>topic/<{$topics['topicId']}>.html"><img src="<{$topics.pic}>" onerror="imgError(this, 'm')" /></a>
                <a class="con" target="_blank" href="<{$group_domain}>topic/<{$topics['topicId']}>.html"><{$topics['titleName']|htmlspecialchars=###}></a>
                <div class="date">发布时间:<{$topics['updateTime']|substr=###,0,10|date="Y-m-d H:i:s",###}></div>
                <div class="oparate">
                  <a class="edit" target="_blank" href="/article/publish?tid=<{$topics['topicId']}>&from=1">编辑</a>
                  <a class="delete" href="javascript:;" data-action="delTopic">删除</a></div>
              </li>
              </volist>
            </ul>
              <if condition="$articleList.totalPage gt 1 ">
                <div class="view-more"><a target="_blank" href="/article/topicList">查看更多</a></div>
              </if>
            <else />
              <div class="create-msg">点击 "新建文章" 开始写文章~</div>
            </notempty>
          </div>
        </div>
  </div>
</div>
<include file="Home@Public:mh_footer"/>
