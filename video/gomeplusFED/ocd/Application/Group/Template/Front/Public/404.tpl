<?php
    $csspath = 'notfound/f404.css';
?>
<include file="Public:header" />
<div class="page nofound">
     <img src="<?php echo $wapjspath; ?>/images/notfound.png" alt="">
     <a href="/">去首页</a>
</div>
<script crossorigin src="<?php echo $wapjspath; ?>/js/lithe.js"
 data-config-dynamic="true"
 data-config="config.js"
 data-debug="true"
 data-main="conf/notfound/f404.js">
 </script>
<include file="Public:footer" />
