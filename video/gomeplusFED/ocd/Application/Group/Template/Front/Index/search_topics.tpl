<?php
    $csspath = 'circle/circleindex.css';
    $jspath = '/js/conf/searchTopics.js';
?>
<include file="Home@Public:header"/>
    <div class="wrap-box">
    	<div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
      	<div class="crumbs-box">
          <{$crumbs}>
      	</div>
      	<div class="circle-index-list clearfix" data-node="tiles" data-node="topicsWrap" data-keyWord="<{$word}>">
		</div>
	 	<div class="more-comments" data-action="loadMore">
	        <a href="javascript:;" class="clearfix">
	            <span><img src="<{$pcimgpath}>/images/circle/small-logo.png">查看更多<em class="icon icon-right"></em></span>
	        </a>
	    </div>
	    <div class="more-comments" data-node="loading" style="display: none;">
	        <a href="javascript:;" class="clearfix">
	            <span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span>
	        </a>
	    </div>
    </div>
<include file="Home@Public:footer" />
