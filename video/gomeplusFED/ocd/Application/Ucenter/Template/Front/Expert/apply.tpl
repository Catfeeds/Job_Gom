<?php
    $csspath = 'usercenter/usercenter.css';
    $jspath = '/js/conf/masterApply.js';
?>
<include file="header" />
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/cropper.css">
<a href="<{$main_domain}>" class="back-to-index" target="_blank"></a>
<ul class="info-steps">
	<li class="bar"><span></span><span></span></li>
	<li class="active step1"><span class="step-num"><em>1</em></span><span class="step-txt">填写资料</span></li>
	<li class="step2"><span class="step-num"><em>2</em></span><span class="step-txt">审核</span></li>
	<li class="step3"><span class="step-num"><em>3</em></span><span class="step-txt">审核结果</span></li>
</ul>
<ul class="dr-form" data-node=form><!-- dr-form-error -->
	<div class="error-tip hide" data-node="tipError">此昵称太受欢迎了，已经有人抢了</div>
	<li class="clearfix" data-node="liName">
		<label class="label-input">真实姓名</label><em class="icon input-ok hide" data-node="markerName">&#xea52;</em>
		<input type="text" placeholder="请输入您的真实姓名" class="txt-input" data-node="inputName"><span class="error-txt" data-node=tipTxt>请填写2-20位真实姓名</span>
	</li>
	<li class="clearfix" data-node="liId">
		<label class="label-input">身份证号</label><em class="icon input-ok hide" data-node="markerId">&#xea52;</em>
		<input type="text" placeholder="请输入身份证号" class="txt-input" data-node=inputId><span class="error-txt" data-node="tipId">请填写18位有效身份证号</span>
	</li>
	<li class="clearfix">
		<label class="label-verify">实名认证</label>
		<div class="verify-pics fl">
			<p>（身份证正反面照，手持身份证件照）</p>
			<ul class="upload-box" data-node="uploadBox">
				<li data-node="uli">
					<a href="javascript:;" class="upload-btn" data-node="uploader"></a>
					<span class="card-txt">身份证正面</span>
					<span class="error-txt"></span>
				</li>
				<li data-node="uli"> <!-- class=dr-form-error -->
					<a href="javascript:;" class="upload-btn" data-node="uploader"></a>
					<span class="card-txt">身份证反面</span>
					<span class="error-txt"></span>
				</li>
				<li data-node="uli">
					<a href="javascript:;" class="upload-btn" data-node="uploader"></a>
					<span class="card-txt">手持身份证</span>
					<span class="error-txt"></span>
				</li>
			</ul>
		</div>
	</li>
	<li class="clearfix category" data-node="categoryLi">
		<label class="label-input">达人类别</label>
		<div class="dr-type-select fl" data-node='categoryForm'>
			<div class="dr-select" data-node="categoryActive">
				<span class="select-txt" data-node=categoryTxt data-id="false">请选择</span><em class="icon">&#xea57;</em>
			</div>
			<div class="select-list" data-node=categoryList>
				<a href="javascript:;">时尚达人</a>
				<a href="javascript:;">户外达人</a>
				<a href="javascript:;">美食达人</a>
				<a href="javascript:;">健身达人</a>
				<a href="javascript:;">健身达人</a>
				<a href="javascript:;">健身达人</a>
				<a href="javascript:;">健身达人</a>
			</div>
		</div>
		<span class="error-txt" data-node="categoryTip"></span>
	</li>
	<li class="clearfix" data-node='liSummary'>
		<label class="self-intro">个人介绍</label>
		<div class="textarea fl">
			<textarea data-node="inputSummary" placeholder="请填写简单的文字介绍，包括您的微博、微信等其他平台的个人账号，是否与其他品牌有过合作等"></textarea>
			<p class="rest-txt"><span data-node="numSummary">0</span>/100</p>
			<span class="error-txt" data-node='tipSummary'>请输入自我介绍，2-100个字符</span>
		</div>
	</li>
</ul>
<a href="javascript:;" class="pc-btn pc-btnh45 dr-btn dr-form-btn" data-node="btnSubmit">申请达人</a>
<script>
	$GLOBAL_CONFIG['applyFlag'] = <{$applyFlag}>;
	$GLOBAL_CONFIG['expertInfo'] = <{$expertInfoJson}>;
</script>
<include file="footer" />