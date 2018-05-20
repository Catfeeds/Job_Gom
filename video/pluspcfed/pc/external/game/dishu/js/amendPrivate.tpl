<?php
	$csspath = "amendPrivate.css";
	$jspath = "/js/conf/amendPrivate.js";
?>
<include file="Account:header"/>
	<div class="amend-private">
		<div class="private-tempo clearfix">
			<p>选择账号类型</p>
			<p class="tempo-perfect">完善账号信息</p>
			<p class="tempo-success">开通成功</p>
		</div>
		<div class="private-info">
			<div class="info clearfix">
				<div class="info-left info-head">美号头像</div>
				<div class="info-right">
					<div class="info-head right-img" data-node="cropWrap">
						<div class="loading-img-progress" data-node="loadNotice">
							<p>头像加载中</p>
							<div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
						</div><img class="avatar-img" data-edit="editImg" src="<{$info['imageUrl']}>">
					</div>
					<div class="img-again"><a class="retry-upload" data-action="upload-edit" href="javascript:;">重新上传</a></div>
					<div class="right-term" data-node="noticeBox">大小不超过4M，支持.PNG .JPG  .JPEG格式</div>
				</div>
			</div>
			<div class="info clearfix">
				<div class="info-left">美号名称</div>
				<div class="info-right">
					<input class="right-name" data-edit="editName" type="text" minlength="2" maxlength="15" value="<{$info['name']}>">
					<div class="right-term" data-node="noticeName">名称长度为2-15个字，不含有特殊字符</div>
				</div>
			</div>
			<div class="info clearfix">
				<div class="info-left">美号标签</div>
				<div class="info-right">
					<div class="right-lable">
						<div class="lable-text" data-edit="editLabelDiv">
              <div class="text-checked" cate-id="<{$info['category']['id']}>"><{$info['category']['name']}></div><span></span>
            </div>
						<ul class="lable-list" data-edit="editLabelSearch"></ul>
					</div>
					<div class="right-term" data-node="noticeLabel">选择您擅长/感兴趣的领域</div>
				</div>
			</div>
			<div class="info clearfix">
				<div class="info-left">美号简介</div>
				<div class="info-right">
					<textarea class="right-text" data-edit="editDetail"><{$info['introduction']|htmlspecialchars_decode}></textarea>
					<div class="right-term" data-node="noticeDetail">简介长度为4-120个字，不含有特殊字符</div>
				</div>
			</div>
			<div class="info clearfix">
				<div class="info-left">绑定圈子</div>
				<div class="info-right info-circle" data-edit="editDivBind"><{$info['group']['name']}></div>
			</div>
		</div>
		<div class="consent">
			<div>
				<input data-edit="editCheck" type="checkbox">我已阅读并同意<a class="consent-deal" href="javascript:;" target="_blank">《美号注册协议》</a>
			</div>
			<div class="right-term" data-node="noticeCheck"></div>
		</div>
		<div class="choose-btn clearfix">
			<div class="continue"><a data-submit="editSubmit" href="javascript:;">继续</a></div>
			<if condition="$info.status neq -1"><div class="back"><a href="/account/type">返回</a></div></if>
		</div>
	</div>
	<div class="affirm-popup">
		<div class="popup-bg"></div>
		<div class="popup-info">
			<div class="info-title">请确认您填写的信息是否有误    </div>
			<div class="info pt26 clearfix">
				<p>美号头像</p>
				<div class="info-head"><img src="../../images/meihao/head.jpg" alt=""></div>
			</div>
			<div class="info clearfix">
				<p>美号名称</p>
				<div class="info-name">男人帮</div>
			</div>
			<div class="info clearfix">
				<p>美号标签</p>
				<div class="info-label">时尚男人</div>
			</div>
			<div class="info clearfix">
				<p>美号简介</p>
				<div class="info-intro">
					 提供网友最爱看的、服装搭配、理容、泡妞、社会新闻、娱乐八卦、搞笑图片、幽默笑话、旅游等丰富健康的内容，提供男性网网友最爱看的、服装搭配、理容、泡妞、社会新闻、娱乐八卦、搞笑图</div>
			</div>
			<div class="info clearfix">
				<p>绑定圈子
					<div>
						<div class="info-circle">时尚圈</div>
						<div class="info-notice">绑定圈子一经提交，不能修改</div>
					</div>
				</p>
			</div>
			<div class="choose-btn clearfix">
				<div class="" data-node="update"><a href="javascript:;">确认</a></div>
				<div class="back" data-node="close"><a href="javascript:;">返回修改</a></div>
			</div>
			<div class="popup-close" data-node="close"><a href="javascript:;"></a></div>
		</div>
	</div>
<include file="Home@Public:mh_footer"/>
