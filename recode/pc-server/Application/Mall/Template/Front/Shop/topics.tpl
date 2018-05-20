<?php
    $csspath = 'shop-detail.css';
    //$jspath  = '/js/conf/other_index.js';
?>
<include file="Public:shop" />
<div class="shop-topic" data-node="shopTopic">
  <div class="no-topic">
    
  </div>
  <div data-node="loadMore" class="more-comments"><a href="javascript:;" class="clearfix"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">点击加载更多<em class="iconn-9"></em></span></a></div>
<div data-node="loading" class="more-comments"><a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
<div data-node="noMore" class="more-comments"><a href="javascript:;" class="disabled clearfix"><span>没有可加载内容</span></a></div>   
  
</div> 

</div>

<include file="Home@Front/Public/footer" />