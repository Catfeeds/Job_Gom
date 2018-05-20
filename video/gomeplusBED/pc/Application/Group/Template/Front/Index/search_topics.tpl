<?php
    $csspath = 'circleindex.css';
    $jspath = '/js/conf/searchTopics.js';
?>
<include file="Home@Public:header"/>
<script>
	$GLOBAL_CONFIG['sshtjg'] = '';  //话题搜索结果页
</script>
    <div class="wrap-box">
    	<div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
      	<div class="crumbs-box">
          <{$crumbs}>
      	</div>
      	<div class="circle-index-list clearfix" data-node="tiles" data-node="topicsWrap" data-keyWord="<{$word}>">
		</div>
	 	<div class="more-comments" data-action="loadMore" modelid="<?php echo $modelPub['ggckgd']?>" >
	        <a href="javascript:;" class="clearfix">
	            <span><img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">查看更多<em class="iconn-9"></em></span>
	        </a>
	    </div>
	    <div class="more-comments" data-node="loading" style="display: none;">
	        <a href="javascript:;" class="clearfix">
	            <span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span>
	        </a>
	    </div>
    </div>
<include file="Home@Public:footer" />
