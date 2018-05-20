<?php
    $csspath = 'usercenter/usercenter.css';
    $jspath = '/js/conf/uc_group.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
      <div data-node="content" class="user-right">
        <div data-node="createdCircle" class="circle-index-list clearfix" style="display:none" >
          <div data-node="createdTitle" class="usercircle-title">
            <h2>我创建的圈子</h2><a data-node="btnCreate" href="javascript:;" class="right">创建圈子</a>
          </div>
          <!-- content -->
        </div>
        <div data-node="joinedCircle" class="circle-index-list clearfix" style="display:none">
          <div class="usercircle-title">
            <h2>我加入的圈子</h2>
          </div>
          <!-- content -->
        </div>
        <div data-node="loadMore" class="more-comments" style="display:none"><a href="javascript:;" class="clearfix"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png">点击加载更多<em class="icon icon-right">&#xe98c;</em></span></a></div>
        <div data-node="loading" class="more-comments"><a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
        <div data-node="noMore" class="more-comments" style="display:none"><a href="javascript:;" class="disabled clearfix"><span>没有可加载内容</span></a></div>
        <!-- <div data-node="noCreated" class="circle-index-list clearfix" style="display:none">
          <div class="usercircle-title">
            <h2>我创建的圈子</h2><a href="javascript:;" class="right">创建圈子</a>
          </div>
          <div class="no-topic">
            <div class="txt clearfix"><em class="icon">&#xe94b;</em>
              <p> <span>您还没创建圈子，赶快 <a href="javascript:;">创建圈子 </a>吧！</span></p>
            </div>
          </div>
        </div>
        <div data-node="noJoined" class="circle-index-list clearfix" style="display:none">
          <div class="usercircle-title">
            <h2>我加入的圈子</h2>
          </div>
          <div class="no-topic">
            <div class="txt clearfix"><em class="icon">&#xe94b;</em>
              <p> <span>您还没有加入任何的圈子，赶快 <a href="javascript:;">加入圈子 </a>吧！</span></p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
<include file="Home@Front/Public:footer" />
