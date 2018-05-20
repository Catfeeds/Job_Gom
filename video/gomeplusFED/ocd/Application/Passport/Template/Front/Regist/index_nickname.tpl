<?php
  $csspath = "/css/module/login/login.css";
  $jspath = '/js/conf/register_nickname.js';
?>
<include file="Public:header" />
<body class="opg lg-bg">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/cropper.css">
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美plus</a></h1>
      </div>
    </div>
    <div class="lg-main" data-node="lg-main">
      <!--步骤 开始-->
      <ul class="lg-steps clearfix">
          <?php if($isRegist==true){ ?>
            <li class="active"><em>1</em>设置帐号、密码</li>
            <li class="active"><em>2</em>完善个人信息</li>
            <li><em>3</em>注册完成</li>
          <?php }else{ ?>
            <li class="active">完善个人信息</li>
          <?php } ?>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form">
        <ul class="lg-form-list" data-node='list-content'>
            <div class="lg-error-tip none clearfix" data-node="publicErrBox"><em class="icon icon-error">&#xe983;</em><span data-node="publicErr"></span></div>
          <li class="clearfix lg-form-it" data-node="faceBox">
            <label class="lg-head-label">头像</label>
            <div class="lg-form-cont lg-user-head" data-action="faceBtn">
			<if condition="session('transmit_session.thirdPartyInfo')['thirdPartyUserFacePicUrl']">
				<img src="<?php echo session('transmit_session.thirdPartyInfo')['thirdPartyUserFacePicUrl']?>" data-node="faceImg">
			<else />
				<img src="<{$pcimgpath}>/images/public/head-default.png" data-node="faceImg">
			</if>
			<span class="change-img">更换头像</span></div>
          </li>
          <li class="clearfix lg-form-it">
            <label>昵称</label>
            <div class="lg-form-cont" data-node='nickname'>
              <em data-node = "nickname_allright" class="lg-allright" style="display:none"></em>
              <input type="text" data-node=nickname_input value="<{$nickName}>" class="lg-input-it" placeholder='请输入昵称' maxLength='20'>
              <div class="nick-name-list" data-node="nick-name-list" style="display:none"><p data-node = "nick-name-recommend"></p></div>
            </div>
            <span data-node = "nickname_span" class="lg-warm"></span>
          </li>
        </ul><a data-node = "code_complete" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" style="cursor:hand;cursor: pointer;">确定</a>
        <p class="lg-skip-more"> <a data-node = "code_skip" style="cursor:hand;cursor: pointer;">跳过&gt;&gt;</a></p>
      </div>
    </div>
    <script>
      $GLOBAL_CONFIG['isRegist'] = '<{$isRegist}>';
    </script>
<include file="Home@Front/Public/footer" />
