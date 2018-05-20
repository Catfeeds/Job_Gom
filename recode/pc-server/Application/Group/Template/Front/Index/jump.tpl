<?php
    $csspath = 'transit.css';
    $jspath = '/js/conf/transit.js';
?>
<include file="Home@Public:header"/>
<div class="transit">
    <div class="transit-explain">
        <p class="explain-visit">欢迎访问 www.gomeplus.com</p>
        <p class="explain-timer">
            由于国美品牌升级整合,将在 <span class="timer" data-node="timer">3 </span>秒后跳转至国美首页......</p>
    </div>
    <div><a class="transit-btn" href="https://www.gome.com.cn/" data-node="transit-btn">立即跳转</a></div>
    <div class="copyright">©2000-2017  国美在线电子商务有限公司版权所有</div>
</div>
<include file="Home@Public:footer"/>