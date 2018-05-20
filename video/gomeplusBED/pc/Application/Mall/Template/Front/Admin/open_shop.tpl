<?php
    $csspath = 'openShop.css';
    $jspath = '/js/conf/openShop.js';
?>
<include file="Public:mshop_header" />
<div class="open-shop">
  <div class="open-img"><img src="<{$pcimgpath}>/images/meidian/open.png"><span>开美店,赚佣金！</span></div>
  <div class="open-name"><span class="title">美店名称：</span>
    <input placeholder="<{$userinfos['nickName']}>的美店" data-node="nameIpt"  maxLength="15"><span class="error-tip none" data-node="nameErr">错误提示区域</span>
  </div>
  <div class="open-logo clearfix">
    <div class="title fl">美店LOGO：</div>
      <?php if(!empty($userIcon)){ ?>
        <img class="fl" onerror="imgError(this, 'h')" src="<{$userIcon|getResizeImg=###,130,130}>" data-node="avatar">
      <?php }else{ ?>
        <img class="fl" onerror="imgError(this, 'h')" src="" data-node="avatar">
      <?php }?>
    <div class="logo-right fl" >
      <div data-node="uploadAvatar" data-flag="<{$mshopHeadimg}>" >
        <a href="javascript:void(0)">
          <empty name="mshopHeadimg">
            点击上传
          <else />
            重新上传
          </empty>
        </a>
      </div>
      <span>仅支持JPG、JPEG、PNG图片文件，且文件小于2M。</span>
    </div>
  </div>
  <div class="open-des">
    <div class="des-raw clearfix">
      <span class="title fl">描述文字：</span>
      <textarea class="fl" placeholder="给小店一个描述吧~" data-node="desIpt" maxLength="100"></textarea>
      <span class="text-num" data-node="textNum">0/100</span>
    </div>
    <div class="des-err none" data-node="desErr">错误提示</div>
  </div>
  <div class="open-btn">
    <a class="create" href="javascript:void(0);" data-node="create">创建美店</a>
    <a class="jump" href="<{$meidian_domain}>admin/skipMshop" data-node="jump">跳过</a>
  </div>
</div>
<include file="Home@Public:footer" />