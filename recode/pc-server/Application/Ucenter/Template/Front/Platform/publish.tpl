<?php
    $jspath = '/js/conf/publishTopic.js';
?>
<include file="Home@Public:common_header"/>
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
</script>
<div class="header-talent clearfix">
  <div class="talent-title"></div>
  <div class="tatent-message"><a class="message clearfix" href="javascript:;" >
      <div class="message-pic"><img src="<{$userinfos['ext']['account']['imagePath']|_get}>"></div>
      <div class="message-name"><?php echo addslashes( $nickName );?></div></a></div>
</div>
    <div class="talent clearfix">
      <include file="Platform/expert_left" />
      <div class="talent-home">
        <div class="wrap-box release-topic-wrap">
          <div class="crumbs-box"><{$crumbs}></div>
          <div class="edit-wrap">
            <div class="input-topic">
              <input autocomplete="off" data-node="topicTitle" id="topicTitle" type="text" class="input-txt">
              <label data-node="topicTitleTips" for="topicTitle" class="topic-txt">请输入话题标题<span>（必填）</span></label>
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

              <a data-action="selectGroup" data-groupid="<?php if(isset($group_infos['id'])){ echo $group_infos['id']; }?>" href="javascript:;" class="btn-or-md">
                <if condition="!empty($group_infos)">
                  <?php if(isset($group_infos['name'])){ echo $group_infos['name']; }?>
                  <else />
                  选择圈子
                </if>
              </a>
              <a data-action="publishTopic" href="javascript:;" class="btn-red-md">发布</a>
              <a class="btn-red-md btn-yl" data-action="publishPreview" href="javascript:;">预览</a>
              <a class="btn-red-md btn-yl" data-action="save" href="javascript:;">保存</a>
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
      </div>
    </div>
<include file="Platform/expert_footer" />
