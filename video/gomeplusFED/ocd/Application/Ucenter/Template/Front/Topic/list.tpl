<?php
    $csspath = 'usercenter/usercenter.css';
    $jspath = '/js/conf/uc_topic.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box mart20 clearfix">
	  <include file="Front/Public/left" />
      <div class="order-right">
        <div class="right-text-title">
          <h2>我发布的话题</h2><a href="<{$group_domain}>topic/publiser" target="_blank">发布话题</a>
        </div>
        <ul data-node="content" class="clearfix mytopic-list">
          <!-- content -->
        </ul>
<!--
        <div class="page"><a href="javascript:;">上一页</a><a href="javascript:;" class="active">1</a><a href="javascript:;">2</a><a href="javascript:;">3</a><a href="javascript:;">4</a><a href="javascript:;">5</a><a href="javascript:;">6</a><a href="javascript:;">下一页</a><a href="javascript:;" class="disabled">最后一页</a></div>
-->
    		<div data-node="loadMore" class="more-comments" style="display:none"><a href="javascript:;" class="clearfix"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png">点击加载更多<em class="icon icon-right">&#xe98c;</em></span></a></div>
    		<div data-node="loading" class="more-comments"><a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
    		<div data-node="noMore" class="more-comments" style="display:none"><a href="javascript:;" class="disabled clearfix"><span>没有可加载内容</span></a></div>
      </div>
    </div>
<include file="Home@Front/Public:footer" />
