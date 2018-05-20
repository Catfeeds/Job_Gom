<?php
    $csspath = '404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header" title=""/>

<div class="wrong"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}><{$images}>">
    <p>
        <span><{$message}></span>
        <notempty name="jumpUrl"><span>请返回<{$jumpUrl}>查看</span></notempty>
    </p>
</div>
<include file="Home@Public:footer" />
