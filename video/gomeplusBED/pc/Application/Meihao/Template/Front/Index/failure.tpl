<?php
	$csspath = "failure.css";
	$jspath = "/js/conf/meihaofailure.js";
?>
<include file="Front/Public/header" />
    <div class="failure">
      <h3>您的美号绑定圈子已失效，请重新绑定</h3>
      <div class="failure-info">
        <div class="info pd28 clearfix">
          <p>美号头像</p>
          <div class="head-img"><img src="<{$mh_info['imageUrl']}>" alt=""></div>
        </div>
        <div class="info pd28 clearfix">
          <p>美号名称</p>
          <div class="info-name"><{$mh_info['name']}></div>
        </div>
        <div class="info pd28 clearfix">
          <p>美号标签</p>
          <div class="info-label"><{$mh_info['category']['name']}></div>
        </div>
        <div class="info pd28 clearfix">
          <p>美号简介</p>
          <div class="info-intro">
            <{$mh_info['introduction']}>
          </div>
        </div>
        <div class="info clearfix">
          <p class="info-left">创建绑定圈子</p>
					<div class="info-right">
						<input class="right-found" data-edit="editBinding" type="text" maxlength="15">
						<div class="right-term" data-node="noticeBinding">15个字以内，您发的内容可在绑定的圈子中展示</div>
					</div>
        </div>
				<div class="info clearfix">
          <div class="info-left">选择圈子分类</div>
          <div class="info-right">
            <div class="right-lable mr10">
              <div class="lable-text" data-edit="editCircleFriDiv">
								<div class="text-checked"></div><span></span>
              </div>
              <ul class="lable-list" data-edit="editCircleFriSearch">
              </ul>
            </div>
            <div class="right-lable">
              <div class="lable-text" data-edit="editCircleSecDiv">
								<div class="text-checked"></div><span></span>
              </div>
              <ul class="lable-list" data-edit="editCircleSecSearch">
              </ul>
            </div>
            <div class="right-term" data-node="noticeCircle">选择圈子分类</div>
          </div>
        </div>
        </div>
        <div class="confirm"><a data-submit="editSubmit" href="javascript:;">确认</a></div>
      </div>
    </div>
<include file="Home@Public:mh_footer"/>
