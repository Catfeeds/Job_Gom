<div class="lg-land-main" data-node="userForm">
        <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button>
        <a href="javascript:;" class="lg-saoma-pop"  data-action="qrCodeBtn"></a>
          <h4 class="lg-land-tl-pop">欢迎登录</h4>
          <div class="lg-error-tip none clearfix"  data-node="error">
            <em class="iconn-12"></em>
            <span  data-node='error-message'>您已三次输入错误，请输入验证码</span>
          </div>

          <div class="land-form">
            <div class="land-form-it">
              <em class="iconn-13 none" data-node="emptyUser"></em>
              <label class="iconn-14"></label>
              <input type="text" placeholder="手机号 / 国美在线账号" class="land-input-md" data-node="userNum">
            </div>
            <div class="land-form-it">
              <em class="iconn-13 none" data-node="emptyPwd"></em>
              <label class="iconn-15"></label>
              <input type="password" placeholder="密码" class="land-input-md" data-node="userPwd">
            </div>
            <div class="land-form-cell none" data-node="identifyplace">
              <input type="text" placeholder="请输入验证码" data-node="code" class="land-input-short"><img src="" class="code-img"><a href="javascript:;" class="chage-code" data-node="change-code">换一张</a>
            </div>
          </div>

          <div class="land-forget-txt">
            <a href={{forget}}forgetpwd class="forget-ps-word">忘记密码</a><a href={{regist}}regist class="rapid-log">立即注册</a>
          </div>

          <a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45" data-node="userLogin">登 录</a>
          <a href={{regist}}protocol/authorize class="oac-btn">升级国美一账通账户</a>
			<p class="land-types" data-node="oauth">
				<span>第三方登录：</span>
				<a href="{{qq}}" class="iconn-16" data-node='openid' title="QQ"></a>
				<a href="{{wx}}" class="iconn-17" data-node='openid' title="微信"></a>
				<a href="{{wb}}" class="iconn-18" data-node='openid' title="微博"></a>
        <a href="{{gm}}" class="icon icon-gm" data-node='openid' title="美付宝"></a>
        <a href="{{jx}}" class="icon icon-gj" data-node='openid' title="极信通信"></a>
			</p>

          <div style="display:none" class="lg-code-main" data-node="qrCodeBox">
               <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button>
              <a href="javascript:;" class="lg-saoma-pop" data-action="accLoginBtn"></a>
              <h5 class="land-title-pop">手机扫码，安全登录</h5>
              <div class="land-code-img">
                <img src="" data-node="qrCodeImg">
                <div style="display:none" class="sm-failed" data-node="qrCodeFailBox">
                  <span data-node="qrCodeTip">二维码已失效</span>
                  <a href="javascript:;" data-action="refQrCode">点击刷新</a>
                </div>
              </div>
              <div class="land-bottom clearfix"><em class="iconn-19"></em>
                <p>打开 <span>国美Plus App<br></span>扫一扫登录</p>
              </div>
          </div>

          


          <!--
          <div style="display:none" class="lg-code-main" data-node="qrCodeSucBox">
              <a href="javascript:;" class="lg-saoma" data-action="accLoginBtn"></a>
              <h5 class="land-title">手机扫码，安全登录</h5>
              <div class="sm-success">
                <img src="https://js.meixincdn.com/m/pc/dist/images/login/sm-success.jpg" class="sm-succes-img">
                <span>扫描成功</span>
                <p>请在手机上确认登录</p>
                <!-- <a href="javascript:;" data-action="backToQrCode">返回二维码登录</a> ->
              </div>
          </div>
          -->
          <div style="display:none" class="lg-code-main" data-node="qrCodeSucBox">
               <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button>
              <a href="javascript:;" class="lg-saoma-pop" data-action="accLoginBtn"></a>
              <h5 class="land-title-pop">手机扫码，安全登录</h5>
              <div class="sm-success">
                <img src="https://js.meixincdn.com/m/pc/dist/images/login/sm-success.jpg" class="sm-succes-img">
                <span>扫描成功</span>
                <p>请在手机上确认登录</p>
                <!-- <a href="javascript:;" data-action="backToQrCode">返回二维码登录</a> -->
              </div>
          </div>

          <!--
        <div style="display:none" class="lg-code-main">
          <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button>
          <a href="javascript:;" class="lg-saoma-pop"></a>
          <h5 class="land-title-pop">手机扫码，安全登录</h5>
          <div class="sm-success">
            <img src="../../images/login/sm-success.jpg" class="sm-succes-img"><span>扫描成功</span>
            <p>请在手机上确认登录</p><a href="javascript:;">返回二维码登录</a>
          </div>
        </div>
        -->

        </div>