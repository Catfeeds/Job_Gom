<?php
   $csspath='/css/module/usercenter.css';
   $jspath  = '/js/conf/store.js';
?>
<include file="Public:header" />
  <body class="opg lg-bg">
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美</a></h1>
      </div>
    </div>
    <div class="lg-main">
      <!--步骤 开始-->
      <ul class="lg-steps clearfix">
        <li class="active"><em>1</em>填写门店信息</li>
        <li><em>2</em>重置完成</li>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form">
        <ul class="lg-form-list" data-node="storeList">
          <div class="lg-error-tip hide clearfix" data-node="errorTip"><em class="iconn-12"></em><span></span></div>
          <li class="clearfix lg-form-it">
            <label>门店会员账号</label>
            <div class="lg-form-cont">
              <em class="lg-allright" data-node="okTip"></em>
              <input type="text" placeholder="请输入门店会员账号" class="lg-input-it" data-node="storeName">
            </div><span class="lg-warm" data-node="nameTip"></span>
          </li>
          <li class="clearfix lg-form-it">
            <label>手机号</label>
            <div class="lg-form-cont">
              <em class="lg-allright" data-node="okTip"></em>
              <input type="text" placeholder="请输入与门店匹配手机号" class="lg-input-it" data-node="phone">
            </div><span class="lg-warm" data-node="phoneTip"></span>
          </li>
        </ul><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" data-action="reset">重置</a>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
