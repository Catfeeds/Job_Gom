<?php
    $csspath = '404.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Public:header"/>

<div class="wrong"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}><{$images}>">
    <p>
        <span><{$message}></span>

        <?php if($flag == '500'){ ?>
            <span>请返回<a href="<{$main_domain}>">首页</a>查看</span>
        <?php }elseif($flag == '504'){ ?>

        <?php }else{ ?>
            <span>去<a href="<{$main_domain}>">圈子首页</a>逛逛吧</span>
        <?php } ?>
    </p>
</div>
<include file="Home@Public:footer" />