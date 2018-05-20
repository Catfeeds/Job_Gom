<?php
    $jspath = '/js/conf/publishTopic.js';
?>
<include file="Home@Public:header"/>

<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/circle/releasetopic1.css">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/pop.css">

<div class="totop" data-node="top" style="display:none;"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
<div class="wrap-box release-topic-wrap">
    <div class="crumbs-box"><{$crumbs}></div>
    <div class="edit-wrap">
        <div class="input-topic">
          <input autocomplete="off" data-node="topicTitle" id="topicTitle" type="text" class="input-txt">
          <label data-node="topicTitleTips" for="topicTitle" class="topic-txt">请输入话题标题<span>（必填）</span></label>
          <p class="content_discuss_tips"><span data-node="titleCharLen">0</span>/<span data-node="titleCharMaxLen">50</span></p>
        </div>
        <div data-node="editorFlag" class="nav-occupying">
          <div data-node="editorBar" class="changeable-nav">
            <div class="edit-nav">
              <a data-action="face" href="javascript:;"><em class="insert-imoj icon">&#xe95c;</em><span>表情</span></a>
              <a data-action="picture" data-maxlength="<if condition="($shinePicNum)"><{$shinePicNum}><else />9</if>" href="javascript:;"><em class="insert-pic icon">&#xe931;</em><span>图片</span></a>
              <a data-action="addGoods" data-maxlength="9" href="javascript:;"><em class="insert-merchant icon">&#xe96e;</em><span>商品</span></a>
            </div>
          </div>
        </div>
        <div class="edit-box">
          <textarea data-node="editor" data-action="textBox" class="textarea" placeholder="说点什么吧..."></textarea>
        </div>
    </div>
    <div class="wrap-box whtie-bg">
      <div data-node="picAndShop" class="zone-content"></div>
      <div class="publish-form">
        <span class="pub-for-title">发布的圈子：</span>
          <!--
            <em data-node="publishToGroup" data-groupid="<{$group_infos['id']}>" class="topic-cell"><{$group_infos['name']}></em>
            <em data-node="publishToGroup" data-groupid="" class="topic-cell"></em>
            -->
            <a data-action="selectGroup" data-groupid="<{$group_infos['id']}>" href="javascript:;" class="btn-or-md">
                <if condition="!empty($group_infos)">
                    <{$group_infos['name']}>
                <else />
                    选择圈子
                </if>
            </a>
        </if>
        <a data-action="publishTopic" href="javascript:;" class="btn-red-md">发布</a>
      </div>
    </div>
</div>

<script>
	$GLOBAL_CONFIG['itemJson'] = <{$item_json?$item_json|htmlspecialchars_decode=###:'""'}>;
</script>
<include file="Home@Public:footer" />
