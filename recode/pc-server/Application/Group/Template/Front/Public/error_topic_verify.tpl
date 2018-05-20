<?php
    $csspath = '404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header" title="圈子不存在"/>


<div class="wrong"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}>/images/public/404-5.png">
      <p>
          <span>抱歉！该话题审核未通过</span>
          <span>请返回<a href="<{$main_domain}>">首页</a>查看</span>
      </p>
</div>

<include file="Home@Public:footer" />