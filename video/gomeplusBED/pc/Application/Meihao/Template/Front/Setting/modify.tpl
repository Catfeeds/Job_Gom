<?php
    $csspath = "amendSetup.css";
    $jspath = "/js/conf/amendSetup.js";
?>

<include file="Front/Public/header" />
    <div class="meihao clearfix">
    <include file="Front/Public/left" />
			<div class="setup-info">
				<h3>账号信息设置&gt; <span>修改资料 </span></h3>
				<div class="info pt20 clearfix">
					<div class="info-left">名称</div>
					<div class="info-right">
                                            <input class="right-name" data-edit="editName" type="text" minlength="2" maxlength="15" value="<{$info['name']}>">
						<div class="right-term" data-node="noticeName">名称长度为2-15个字，不含有特殊字符</div>
					</div>
				</div>
				<div class="info clearfix">
					<div class="info-left info-head">头像</div>
					<div class="info-right info-head">
						<div class="right-img head" data-node="cropWrap">
							<div class="loading-img-progress" data-node="loadNotice">
								<p>头像加载中</p>
								<div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
							</div><img class="avatar-img" data-edit="editImg" src="<{$info['imageUrl']}>">
							<div data-defaultAddFile="picker" type="file"></div>
						</div>
						<div class="img-again"><a class="retry-upload" data-action="upload-edit" href="javascript:;">重新上传</a></div>
						<div class="right-term" data-node="noticeBox">大小不超过4M，支持.PNG .JPG  .JPEG格式         </div>
					</div>
				</div>
				<div class="info clearfix">
					<div class="info-left">标签</div>
					<div class="info-right">
						<div class="right-lable">
							<div class="lable-text" data-edit="editLabelDiv">
								<div class="text-checked"><{$info['category']['name']}></div><span></span>
							</div>
							<ul class="lable-list" data-edit="editLabelSearch"></ul>
						</div>
						<div class="right-term" data-node="noticeLabel">选择您擅长/感兴趣的领域</div>
					</div>
				</div>
				<div class="info clearfix">
					<div class="info-left">简介</div>
					<div class="info-right">
						<textarea class="right-text" data-edit="editDetail"><{$info['introduction']|htmlspecialchars_decode}></textarea>
						<div class="right-term" data-node="noticeDetail">简介长度为4-120个字，不含有特殊字符</div>
					</div>
				</div>
				<div class="setup-continue"><a data-submit="editSubmit" href="javascript:;">确认       </a></div>
			</div>
    </div>
  <include file="Home@Public:mh_footer"/>
