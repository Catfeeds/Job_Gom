<?php
	$csspath = "awaitPrivate.css";
?>
<include file="Account:header"/>
    <div class="private">
      <div class="private-tempo clearfix">
        <p>选择账号类型</p>
        <p class="tempo-perfect">完善账号信息</p>
        <p class="tempo-success">开通成功</p>
      </div>
      <div class="private-condition">
        <div class="condition-img"><img src="<{$pcimgpath}>/images/meihao/condition.jpg" alt=""></div>
        <p>您好，您的美号申请状态为审核中，请耐心等待</p>
      </div>
      <div class="private-info">
        <div class="info clearfix">
          <p>美号头像</p>
          <div class="info-head"><img src="<{$info['imageUrl']}>" alt=""></div>
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
    </div>
<include file="Home@Public:mh_footer"/>