<?php
    $csspath = '404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header" title="圈子不存在"/>


<div class="wrong"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}>/images/public/404-3.png">
      <p>
          <span>该圈子已经解散啦，去<a href="<{$group_domain}>">圈子首页</a>逛逛吧</span>
      </p>
</div>

<include file="Home@Public:footer" />