<?php
    $csspath = 'merchant.css';
?>
<include file="Public:header" />
<div class="wrap-box">
<?php $main_domain_gome = str_replace("https","http",$main_domain_gome); ?>
  <div class="merchant-join"><a href="<{$main_domain_gome}>join/" target="_blank">我要入驻	</a></div>
</div>
<include file="Public:footer" />