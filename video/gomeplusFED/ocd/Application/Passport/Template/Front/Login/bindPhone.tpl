<?php
    $csspath='/css/module/login/login.css';
    $jspath = '/js/conf/bindTelNum.js';
?>
<include file="Public:header" />

<body class="opg lg-bg">
<script>
$GLOBAL_CONFIG['isMobileActivated'] = '<{$user_infos['ext']['user']['isMobileActivated']}>';

//统一登录相关
$GLOBAL_CONFIG['unified'] = '<?php if( isset( $_SESSION['unified'] ) && !empty( $_SESSION['unified'] ) ) echo 1;?>';
$GLOBAL_CONFIG['unified_url'] = '<?php echo $_SESSION['unified'];?>';
</script>
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美plus</a></h1>
      </div>
    </div>
    <div class="lg-main">
        <h4 class="lg-tip-title">绑定手机号<span>（使用国美在线账号登录需要绑定手机号）</span></h4>
      <div class="lg-form" data-node="bindPhoneForm">
        <ul class="lg-form-list">
          <div class="lg-error-tip none clearfix" data-node="publicErrBox"><em class="icon icon-error">&#xe983;</em><span data-node="publicErr"></span></div>
          <li class="clearfix lg-form-it" data-node="errorBorderTel">
            <label>手机号</label>
            <div class="lg-form-cont">
              <input type="text" placeholder="请输入11位有效手机号" class="lg-input-it" data-node="telNum">
            </div><span class="lg-warm" data-node="errorTel"></span>
          </li>
          <li class="clearfix lg-form-it" data-node="errorBorderCode">
            <label>短信验证码</label>
            <div class="lg-form-cont"><a href="javascript:;" class="lg-codes" data-action="sendMsgCode">获取验证码</a>
              <input type="text" placeholder="请输入短信验证码" class="lg-input-it" data-node="msgCode" disabled="disabled">
            </div><span class="lg-warm" data-node="errorMsgCode"> </span>
          </li>
          <li class="clearfix lg-form-it">
            <label> </label>
            <div class="lg-form-cont"></div>
          </li>
        </ul><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" data-action="sureBind">确认绑定</a>
      </div>
    </div>
    <script type="text/javascript">
      //var state = "<{$Think.session.state | base64_decode}>";
    </script>
<include file="Home@Front/Public/footer" />

