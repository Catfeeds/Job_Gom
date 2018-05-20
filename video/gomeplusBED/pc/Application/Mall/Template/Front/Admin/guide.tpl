<?php
    $csspath = 'toOpenShop.css';
?>
<include file="Public:mshop_header" />
<div class="open-shop">
  <a href="<{$openMshopUrl}>">
    <foreach name="imgArr" item="vo">
        <img src="<{$vo['imageUrl']}>">
    </foreach>
  </a>
</div>
<include file="Home@Public:footer" />