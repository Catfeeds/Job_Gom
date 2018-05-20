<?php
    $csspath = 'other/404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header" title="圈子不存在"/>


<div class="wrong"><img src="<{$pcimgpath}>/images/public/404-3.png">
      <p>
          <span>抱歉！该圈子已被解散</span>
          <span>请返回<a href="<{$main_domain}>">首页</a>查看</span>
      </p>
</div>

<include file="Home@Public:footer" />