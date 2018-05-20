<?php
    $csspath = 'editInfo.css';
    $jspath = '/js/conf/editInfo.js';
?>
<include file="Public:mshop_header" />
    <div class="editBox clearfix">
      <div class="nav-box">
      <include file="Front/Public/left_new" />
      </div>
      <div class="open-shop">
        <div class="edit-title-box clearfix">
          <div class="edit-title">编辑资料</div>
          <div class="back-btn"> <a href="/admin/index" data-node="backBtn">返回</a></div>
        </div>
        <div class="info-box">
          <div class="open-name"><span class="title">美店名称：</span>
            <input class="text-color" placeholder="请输入美店名称" data-node="nameIpt" value="<{$shopInfo['name']}>" maxLength="15"><span class="error-tip none" data-node="nameErr">错误提示区域</span>
          </div>
          <div class="open-logo clearfix">
            <div class="title fl">美店LOGO：</div><img class="fl" src="<{$shopInfo['icon']|getResizeImg=###,130,130}>" data-node="avatar" onerror="imgError(this, 'h')">
            <div class="logo-right fl">
              <div data-node="uploadAvatar" data-flag="<{$mshopHeadimg}>">
                  <a href="javascript:void(0)">
                      <empty name="mshopHeadimg">
                          点击上传
                          <else />
                          重新上传
                      </empty>
                  </a>
              </div><span>仅支持JPG、JPEG、PNG图片文件，且文件小于2M。</span>
            </div>
          </div>
          <div class="open-des">
            <div class="des-raw clearfix">
              <span class="title fl">描述文字：</span>
              <textarea class="fl text-color" placeholder="给小店一个描述吧~" data-node="desIpt" value="<{$shopInfo['description']}>" maxLength="100"><{$shopInfo['description']}></textarea>
              <span class="text-num" data-node="textNum"><{$shopInfo['description']|mb_strlen}>/100</span>
            </div>
            <div class="des-err none" data-node="desErr">错误提示</div>
          </div>
          <div class="open-type clearfix">
            <div class="title fl">主营类目：</div>
            <div class="type-box fl clearfix" data-node="typeBox">
              <notempty name="shopInfo.mainCategoryNames">
                <foreach name="shopInfo.mainCategoryNames" item="item" key="key">
                <span data-node="typeItem"><p><{$item}></p><em class="none" data-node="delBtn"></em></span>
                </foreach>
              <else />
              <span class="no-type">无类目</span>
              </notempty>
            </div>
          </div>
          <div class="open-btn"><a class="create" href="javascript:void(0);" data-node="saveBtn">保存</a></div>
        </div>
      </div>
    </div>
<include file="Home@Public:footer" />