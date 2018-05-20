<?php
    $csspath = 'other/404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header" title="抱歉！服务器君正在打盹"/>

<div class="wrong"><img src="<{$pcimgpath}>/images/public/404-2.png">
      <p>
          <if condition="empty($message)">
              <span>抱歉！服务器君正在打盹</span>
          <else />
              <span>嘤嘤嘤～<{$message}></span>
          </if>
          <span>请返回<a href="<{$main_domain}>">首页</a>查看</span>
      </p>
</div>
<include file="Home@Public:footer" />