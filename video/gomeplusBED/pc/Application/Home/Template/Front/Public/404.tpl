<?php
    $csspath = '404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header" title="抱歉！服务器君正在打盹"/>

<div class="wrong"><img src="<{$pcimgpath}>/images/public/500.png">
    <p><span>抱歉！服务器君正在打盹</span><span>请返回<a href="<{$main_domain}>">首页</a>查看</span></p>
</div>

<include file="Home@Public:footer" />