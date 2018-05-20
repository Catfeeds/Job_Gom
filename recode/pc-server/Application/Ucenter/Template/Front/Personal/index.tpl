<?php
    $csspath = 'usercenter.css';
    $jspath = '/js/conf/uc_editInfo.js';	
?>
<include file="Home@Front/Public:header" />
<script>
$GLOBAL_CONFIG['curr_time'] = '<{:time()}>000';
</script>
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/cropper.css">
<div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
	<div class="order-right">
        <div class="set-personal-title" data-node="editTab">
		    <a href="javascript:;" <eq name="showType" value="1">class="active"</eq> >基本信息</a>
            <a href="javascript:;" <eq name="showType" value="2">class="active"</eq> >头像照片</a>
        </div>
        <div class="personal-info" data-node="editBox" <eq name="showType" value="2">style="display: none"</eq> >
            <p class="prompt hide" data-node="comErrTip">此昵称太受欢迎了，已经有人抢了</p>
            <ul>
                <li class="clearfix"><span class="info-label lh65">头像：</span>
                    <div class="head-img fl" data-action="editFaceImg"><img src="<?php echo getResizeImg($personalInfo['facePicUrl'], 75, 75) ? getResizeImg($personalInfo['facePicUrl'], 75, 75) : $pcimgpath.'/images/public/head-default.png'; ?>" data-node="faceImg" onerror="imgError(this,'h')"><span class="change-img">更换头像</span></div>
                </li>
                <li class="clearfix"><span class="info-label lh45">昵称：</span>
                    <div class="nickname fl" data-node="nameBorErr">
                        <input type="text" name="nickname" value="<{$personalInfo.nickname}>" data-node="nickname">
                        <p class="error hide" data-node="nameErr">请输入6-20位英文字母,数字或符号</p>
                    </div>
                </li>
                <li class="clearfix"><span class="info-label">性别：</span>
                    <div class="sex-radios fl" data-node="sexBox">
                        <label style="cursor: pointer;"><input type="radio" name="gender" value="2" <eq name="personalInfo.gender" value="2">checked</eq>>男</label>
                        <label style="cursor: pointer;"><input type="radio" name="gender" value="1" <eq name="personalInfo.gender" value="1">checked</eq>>女</label>
                        <label style="cursor: pointer;"><input type="radio" name="gender" value="0" <eq name="personalInfo.gender" value="0">checked</eq>>保密</label>
                    </div>
                </li>
                <li class="clearfix">
                    <span class="info-label lh45">生日：</span> 
                    <div class="nickname fl">
                        <input type="text" name="birthday" value="<{:isset($personalInfo['birthday']) ? $personalInfo['birthday'] : '请选择'}>" class="fl" readonly style="cursor: pointer;" data-default="<{:isset($personalInfo['birthday']) ? $personalInfo['birthday'] : ''}>" data-node="showDate">
						<p class="tip" data-node="birTip"><empty name="personalInfo.birthday">提示：生日只能修改一次！</empty></p>						                        
                    </div>
                </li>
                <li class="clearfix"><span class="info-label">二维码：</span>
                    <div class="qr-code fl">
                        <div class="code-box"><img src="<{$personalInfo.genQrcodeUrl}>" onerror="imgError(this)"></div>
                        <p>扫一扫  加好友  互关注</p>
                    </div>
                </li>
                <li class="clearfix"><span class="info-label">我的推荐码：</span>
                    <p class="fl"><{$personalInfo.referralCode}></p>
                </li>
                <li class="clearfix"><span class="info-label">推荐人：</span>
                    <p class="fl"><eq name="personalInfo.membershipRefereeId" value="0">无<else/><{$personalInfo.membershipRefereeId}></eq></p>
                </li>
            </ul>
            <a href="javascript:;" class="personal-save-btn active" data-action="subDate">保存</a>
        </div>
        <div class="upload-head" data-node="editBox" <eq name="showType" value="1">style="display: none"</eq> >
            <div class="upload-pic clearfix">
			    <a href="javascript:;" class="pc-btn pc-bj-fc8753 pc-btnw155 pc-btnh40 upload-picture" data-defaultAddFile=picker><span>+</span>上传头像
                    <input type="file">
				</a>
			    <span class="note">请上传JPG、PNG、JPEG格式的图片</span>
			</div>
            <div class="circle-head">
                <div class="upload-head-bx">
                    <div class="picture-bj-img ">
                      <!-- 提示类 -->
                        <div  class="position-abso" data-node="noticeBox">
                            <div class="picture-bx"></div>
                            <div class="load-failed-bx">
                                <span class="opacity-all"></span>
                                <span class="top-left"></span>
                                <span class="top-right"></span>
                                <span class="bottom-left"></span>
                                <span class="bottom-right"></span>
                            </div>
                            <div class="load-failed-txt failure"><span data-node="noticeInfo">图片上传失败！<span><em class="iconn-24"></em><a href="javascript:;" data-action="retry">重新上传</a></div>
                            <div class="load-failed-txt image-load">
                                <p data-node="loadNotice">图片加载中</p>
                                <div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
                                <!--img.img250(src="../../images/public/circle-default-head.jpg")-->
                            </div>
                        </div>
                        <!-- 默认 -->
                        <div class="circle-default-head" data-node="cropWrap" >
                            <img src="<eq name='defaultFlag' value='1'><{$pcimgpath}>/images/public/circle-default-head.jpg<else/><{$personalInfo['facePicUrl']|getResizeImg=###,230,230}></eq>" alt="" data-default="<{$pcimgpath}>/images/public/circle-default-head.jpg" onerror="imgError(this,'h')" />
                        </div>
                        <span class="error" data-node="error">＊ <span >图片格式有误</span> 请重新上传</span>
                    </div>                
                </div>
                <div class="head-preview-bx">
                    <p class="head-title">效果预览</p>
                    <p class="head-size">你上传的图片会自动生成2种尺寸，请注意小尺寸的头像是否清晰</p>
                    <div class="picture2-bx">
                        <div class="picture-bx2">
                            <div class="default-img1" data-node="avatrSelector"><img src="<eq name='defaultFlag' value='1'><{$pcimgpath}>/images/public/default-img1.jpg<else/><{$personalInfo['facePicUrl']|getResizeImg=###,230,230}></eq>" onerror="imgError(this,'h')"></div>
                            <p class="p-size">160*160px</p>
                        </div>
                        <div class="picture-bx3">
                            <div class="picture-bx4">
                                <div class="default-img2" data-node="avatrSelector"><img src="<eq name='defaultFlag' value='1'><{$pcimgpath}>/images/public/default-img2.jpg<else/><{$personalInfo['facePicUrl']|getResizeImg=###,75,75}></eq>" onerror="imgError(this,'h')"></div>
                                <p class="p-size">60*60px</p>
                            </div>
                            <div class="picture-bx5">
                                <div class="default-img3" data-node="avatrSelector"><img src="<eq name='defaultFlag' value='1'><{$pcimgpath}>/images/public/default-img3.jpg<else/><{$personalInfo['facePicUrl']|getResizeImg=###,32,32}></eq>" onerror="imgError(this,'h')"></div>
                                <p class="p-size">30*30px</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="javascript:;" class="personal-save-btn" data-action="avatarSave">保存</a>
        </div>
    </div>
</div>
<include file="Home@Public:footer" />