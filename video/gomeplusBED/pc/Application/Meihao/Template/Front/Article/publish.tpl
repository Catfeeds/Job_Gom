<?php
	$csspath = "meihaoPublishTopic.css";
	$jspath = '/js/conf/publishTopic.js';
?>

<include file="Front/Public/header" />
<script>
    var pageId = '<{$pageId}>';
    //二维码地址url参数|记得在拼接ajax/qrcode?后的url参数需要urlencode编码1
    var qrcodeUrlmodel = '<{$qrcodeUrlmodel}>';

</script>
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/releasetopic1.css?version=<?php echo C('JS_VERSION'); ?>">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/pop.css?version=<?php echo C('JS_VERSION'); ?>">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/talentPublishTopic.css?version=<?php echo C('JS_VERSION'); ?>">

<script type="text/javascript">
    $GLOBAL_CONFIG['isExpert'] = '<{$userinfos['isExpert']|_get}>';//是否为达人
    $GLOBAL_CONFIG['headface'] = '<{$userinfos['ext']['account']['imagePath']|_get}>';//头像
    $GLOBAL_CONFIG['itemJson'] = <{$item_json?$item_json|htmlspecialchars_decode=###:'""'}>;

    $GLOBAL_CONFIG['tid'] = '<{$tid}>';
    $GLOBAL_CONFIG['from'] = '<{$from}>';
    $GLOBAL_CONFIG['useVideo'] = '<{$mh_info['videoPermission']}>';
    $GLOBAL_CONFIG['tid'] = '<{$tid}>';
    $GLOBAL_CONFIG['channel'] = '<{$channel}>';
    $GLOBAL_CONFIG['businessId'] = '<{$mh_info['id']|default=''}>';
    $GLOBAL_CONFIG['imgLimitNUm'] = '50';
</script>
<div class="meihao clearfix">
    <include file="Front/Public/left" />
    <div class="meihao-publish-topic">
        <div class="nav"><a href="#">文章管理></a><span><{$crumbs}></span></div>
        <div class="wrap-box release-topic-wrap">
            <div class="edit-wrap">
                <div class="input-topic">
                    <input autocomplete="off" data-node="topicTitle" id="topicTitle" type="text" class="input-txt">
                    <label data-node="topicTitleTips" for="topicTitle" class="topic-txt">请输入话题标题<span>（必填）</span></label>
                    <p class="content_discuss_tips"><span data-node="titleCharLen">0</span>/<span data-node="titleCharMaxLen">50</span></p>
                </div>
                <script type="text/plain" id="editor"></script>
            </div>

            <div class="wrap-box whtie-bg">

                <div class="publish-label-created">
                    <ol class="label-crt-lists clearfix" data-node="crt-lists"></ol>
                </div>
                <div class="publish-label clearfix"><i class="pub-lab-icon"></i><div class="pub-label-hover" data-node="lab-title"><span class="label-hover-title">添加标签</span><span class="label-hover-choose">（必选）</span></div>
                    <input class="pub-lab-cont" type="text" maxlength="15" autocomplete="off" name="label" data-node="lab-cont">
                    <div class="pub-search-lenovo" id="wrapper" data-node="search-lenovo">
                        <ul class="label-lists clearfix" id="scroller" data-node="label-lists">
                            <li class="label-frist-items" data-node="frist-items"><span>创建新标签</span></li>
                            <ul class="label-list-search clearfix" data-node="list-search"></ul>
                        </ul>
                    </div>
                </div>

                <div class="publish-form">
                    <span class="pub-for-title">发布的圈子<span class="red">（必选）</span>：</span>

                    <a data-action="selectGroup" data-groupid="<{$mh_info['group']['id']|default=''}>" href="javascript:;" class="pub-for-title">

                        <empty name="mh_info['group']['id']">
                            选择圈子
                        <else />
                            <{$mh_info['group']['name']}>
                        </empty>
                    </a>
                    <a data-action="publishTopic" href="javascript:;" class="btn-red-md">发布</a>
                    <a class="btn-red-md btn-yl" data-action="publishPreview" href="javascript:;">预览</a>
                    <!-- <a class="btn-red-md btn-yl" data-action="save" href="javascript:;">保存</a> -->
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
            <div class="preview-publish clearfix">
                <div class="wraper clearfix">
                    <a class="btn-red-md" href="javascript:;" data-action="publishTopic">发布</a>
                    <a class="btn-edit" href="javascript:;">继续编辑</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?php echo C('VIDEO_URL')?>gvs-player/dist/vod/js/meixinplayer-min.js" ></script>
<include file="Home@Public:mh_footer"/>