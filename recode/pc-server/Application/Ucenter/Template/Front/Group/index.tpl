  <!--已经改Kjs来改usercircle.html-->
<?php
    $csspath = 'usercenter.css';
    $jspath = '/js/conf/uc_group.js';
?>
<include file="Front/Public/header" />
  <script>
      var flag = 3;
  </script>
<div class="wrap-box mart10 clearfix">
    <include file="Front/Public/social_left" />
  <div class="user-right">
    <div class="crumbs">
      <{$crumbs}>
    </div>
    <div class="user-content-tops clearfix">
      <h4>我的圈子</h4>
      <a href="javascript:;" data-action="create-circle" target="_blank" data-href="<{$group_domain}>index/create">+ &nbsp;创建圈子</a>
    </div>
    <div class="user-content new-user-content clearfix">
      <div class="usershop-title">
        <div class="left-tab">
          <a data-action="tab-switch" class="active" href="javascript:;">我创建的圈子</a>
          <a data-action="tab-switch" href="javascript:;">我加入的圈子</a>
        </div>
      </div>
      <div class="content-tab">
        <div class="content-info">
          <div class="circle-index-list topic-list clearfix">

          </div>
        </div>
      </div>
      <div class="content-tab none">
        <div class="content-info">
          <div class="circle-index-list topic-list clearfix">

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<include file="Home@Front/Public/footer" />
