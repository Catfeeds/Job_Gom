<?php
	$csspath = 'issuePreview.css';
    $jspath = '/js/conf/publishTopic.js';
?>
<include file="Public:mshop_header"/>
<script>
    $GLOBAL_CONFIG['isExpert'] = '<{$userinfos['isExpert']|_get}>';//是否为达人
    $GLOBAL_CONFIG['headface'] = '<{$userinfos['ext']['account']['imagePath']|_get}>';//头像
    $GLOBAL_CONFIG['channel'] = '<{$channel}>';//美店说发布的功能来源
    $GLOBAL_CONFIG['shopName'] = '<{$mshop_infos['name']}>';//美店名称
    $GLOBAL_CONFIG['trId'] = '<{$mshop_infos['trId']}>';//门店员工id
</script>
<script>
//页面唯一id
var pageId = '<{$pageId}>';
//二维码地址url参数|记得在拼接ajax/qrcode?后的url参数需要urlencode编码
var qrcodeUrlmodel = '<{$qrcodeUrlmodel}>';

</script>
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/releasetopic1.css?version=<?php echo C('JS_VERSION'); ?>">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/pop.css?version=<?php echo C('JS_VERSION'); ?>">
<div class="totop" data-node="top" style="display:none;"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
<div class="wrap-box release-topic-wrap">
    <div class="crumbs-box"><{$crumbs}></div>
    <div class="edit-wrap">
        <div class="pop-box-backdrop">
            <div class="preview-layer">
								<div class="preview-title-topic-wapper clearfix">
                	<p class="preview-title-topic">上传封面</p>
									<a class="preview-title-cancel" data-action="cancel" href="javascript:;">×</a>
								</div>
                <div class="preview-content-topic">
                    <div class="position-abso load-ing" data-node="noticeBox" style="display: none;">
                        <div class="picture-bx"></div>
                        <div class="load-failed-bx"><span class="opacity-all"></span><span class="top-left"></span><span class="top-right"></span><span class="bottom-left"></span><span class="bottom-right"></span></div>
                        <div class="load-failed-txt failure"><span data-node="noticeInfo">图片上传失败！</span><em class="icon iconn-24"></em><a class="active" href="javascript:;" data-action="retry">重新上传</a><span></span></div>
                        <div class="load-failed-txt image-load loading-img-progress">
                            <div class="progress-bar-bx">
															<span data-node="uploadProgress" style="width: 100%;"></span>
														</div>
                            <p data-node="loadNotice">正在上传...</p>
                        </div>
                    </div><img src="<{$pcimgpath}>/images/public/circle-default-head.jpg" alt="" data-default="<{$pcimgpath}>/images/public/circle-default-head.jpg" data-edit="btn">
                </div>
                <div class="preview-btns"><a class="preview-btns-submit" data-action="avatarSave" href="javascript:;">确定</a><a class="preview-btns-cancel" data-action="cancel" href="javascript:;">取消</a></div>
            </div>
        </div>
        <div data-node="upload-img" class="upload-img">
            <div class="picker" data-defaultAddFile="topic-picker"><img src="" style="display: none;"></div>
            <p class="topic-limit">图片尺寸建议不小于750x375像素，支持jpg、jpeg、png格式</p>
        </div>
        <div class="upload-success" style="display: none;">
					<div data-node="upload-success-wrap" class="upload-success-wrap">
						<img data-node="upload-success-img" class="upload-success-img" src="" alt="" style="display: none;">
						<a href="javascript:;" data-node="upload-success-close" class="upload-success-close"></a>
					</div>
				</div>
        <div class="input-topic">
          <input autocomplete="off" data-node="topicTitle" id="topicTitle" type="text" class="input-txt">
          <label data-node="topicTitleTips" for="topicTitle" class="topic-txt">请输入美店说标题<span>（必填）</span></label>
          <p class="content_discuss_tips"><span data-node="titleCharLen">0</span>/<span data-node="titleCharMaxLen">50</span></p>
        </div>
        <!-- <div data-node="editorFlag" class="nav-occupying">
          <div data-node="editorBar" class="changeable-nav">
            <div class="edit-nav">
              <a data-action="face" href="javascript:;"><em class="iconn-27"></em><span>表情</span></a>
              <a data-action="picture" data-maxlength="<if condition="($shinePicNum)"><{$shinePicNum}><else />9</if>" href="javascript:;"><em class="iconn-28"></em><span>图片</span></a>
              <a data-action="addGoods" data-maxlength="9" href="javascript:;"><em class="iconn-29"></em><span>商品</span></a>
            </div>
          </div>
        </div> -->
        <!-- <div class="edit-box">
          <textarea data-node="editor" id="editor" class="textarea" placeholder="说点什么吧..."></textarea>
        </div> -->
        <!-- <textarea id="editor" placeholder="说点什么吧..."></textarea> -->
        <script type="text/plain" id="editor" class="meidian"></script>
    </div>

	<div class="wrap-box whtie-bg">

        <div class="publish-form clearfix">
        <a data-action="publishTopic" href="javascript:;" class="btn-red-md">发布</a>
        <a class="btn-red-md btn-yl" data-action="publishPreview" href="javascript:;">预览</a>
        </div>
    </div>
</div>


<div class="more-preview">
      <div class="preview-title0">
      </div>
      <div class="preview-content">
      </div>
      <ul class="preview-label clearfix">
      </ul>
      <div class="preview-publish clearfix"><a class="btn-red-md" href="javascript:;" data-action="publishTopic">发布</a><a class="btn-edit" href="javascript:;">继续编辑</a></div>
</div>

<script>
	$GLOBAL_CONFIG['itemJson'] = <{$item_json?$item_json|htmlspecialchars_decode=###:'""'}>;
</script>
<include file="Home@Public:footer" />
