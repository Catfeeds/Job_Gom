<?php
    $csspath = 'notfound/error.css';
?>
<include file="Public:header" />
<div class="system-message">
    <h1>抱歉,出错啦!</h1>
    <p class="error"><?php echo($error); ?></p>
    <p class="detail"></p>
    <p class="jump">
    <b id="wait"><?php echo($waitSecond); ?></b> 秒后页面将自动跳转
    </p>
    <div>
        <a class="return_url" id="btn-now" href="<?php echo($jumpUrl); ?>">立即跳转</a>
        <a class="home"  id="btn-now" href="/">首页</a>
    </div>

</div>
<script crossorigin src="<?php echo $wapjspath; ?>/js/lithe.js"
 data-config-dynamic="true"
 data-config="config.js"
 data-debug="true"
 data-main="conf/notfound/error.js">
 </script>
<include file="Public:footer" />
