<?php
	$csspath = "failPrivate.css";
?>
<include file="Account:header"/>
    <div class="fail-private">
      <div class="tempo clearfix">
        <p>选择账号类型</p>
        <p class="tempo-perfect">完善账号信息</p>
        <p class="tempo-success">开通成功</p>
      </div>
      <div class="condition">
        <div class="condition-img"><img src="<{$pcimgpath}>/images/meihao/fail.jpg" alt=""></div>
        <p>您好，您的美号申请审核未通过。原因：<span class="cause"><{$info['auditFailReason']}></span></p>
      </div>
      <div class="info-cont">
        <div class="info clearfix">
          <p>美号头像</p>
          <div class="head-img"><img src="<{$info['imageUrl']}>" alt=""></div>
        </div>
        <div class="info clearfix">
          <p>美号名称</p>
          <div class="info-name"><{$info['name']}></div>
        </div>
        <div class="info clearfix">
          <p>美号标签</p>
          <div class="info-label"><{$info['category']['name']}></div>
        </div>
        <div class="info clearfix">
          <p>美号简介</p>
          <div class="info-intro">
            <{$info['introduction']}>
          </div>
        </div>
        <div class="info clearfix">
          <p>绑定圈子</p>
          <div class="info-circle"><{$info['group']['name']}></div>
        </div>
      </div>
      <div class="amend"><a class="amend-btn" href="/account/createPrivate">修改资料</a></div>
    </div>
 <include file="Home@Public:mh_footer"/>