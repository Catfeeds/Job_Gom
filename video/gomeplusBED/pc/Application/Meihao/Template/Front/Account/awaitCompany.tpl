<?php
	$csspath = "awaitCompany.css";
?>
<include file="Account:header"/>
    <div class="company">
      <div class="company-tempo clearfix">
        <p>选择账号类型</p>
        <p class="tempo-approve">完善企业认证信息</p>
        <p class="tempo-perfect">完善账号信息</p>
        <p class="tempo-success">开通成功</p>
      </div>
      <div class="company-condition">
        <div class="condition-img"><img src="<{$pcimgpath}>/images/meihao/condition.jpg" alt=""></div>
        <p>您好，您的美号申请状态为审核中，请耐心等待</p>
      </div>
      <div class="company-info">
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
             <{$info['introduction']|htmlspecialchars_decode}>
          </div>
        </div>
        <div class="info clearfix">
          <p>绑定圈子</p>
          <div class="info-circle"><{$info['group']['name']}></div>
        </div>
        <h3>企业信息</h3>
        <div class="info clearfix">
          <p>企业名称</p>
          <div class="info-firm"><{$info['enterpriseName']}></div>
        </div>
        <div class="info clearfix">
          <p>营业执照注册号</p>
          <div class="info-register"><{$info['businessLicenseNumber']}></div>
        </div>
        <div class="info clearfix">
          <p>营业执照</p>
          <div class="info-license"> <img src="<{$info['businessLicenseImageUrl']}>" alt=""></div>
        </div>
        <div class="info clearfix">
          <p>运营者姓名</p>
          <div class="info-operate"><{$info['operatorName']}></div>
        </div>
        <div class="info clearfix">
          <p>运营者身份证号</p>
          <div class="info-identity"><{$info['operatorIDNumber']}></div>
        </div>
        <div class="info clearfix">
          <p>运营者手机号</p>
          <div class="info-phone"><{$info['operatorPhone']}></div>
        </div>
        <div class="info clearfix">
          <p>QQ/微信/邮箱</p>
          <div class="info-postbox"><{$info['operatorContactInfo']}></div>
        </div>
      </div>
    </div>
   <include file="Home@Public:mh_footer"/>