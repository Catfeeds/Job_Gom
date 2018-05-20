<?php
    $csspath = '404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Public:mshop_header"/>
<div class="wrong"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}><{$images}>">
      <p>
              <span><{$message}></span>
          <span>请返回<a href="<{$meidian_domain}>">首页</a>查看</span>
      </p>
</div>
<include file="Home@Public:footer" />