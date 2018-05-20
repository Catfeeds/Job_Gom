<?php
    $csspath = 'circle/circlelist.css';
    $jspath = '/js/conf/categoryList.js';
?>
<include file="Home@Public:header"/>

    <div class="wrap-box">
      <div class="title-wrap">
        <h2 class="circle-list-title">精彩推荐<span>Popular recommendation</span></h2>
      </div>
      <div class="popular-recommendation clearfix">
      <volist name="lists" id="v">
        <dl class="recommendation-list">
          <dt class="list-img">
              <a target="_blank" href="<{$v.group_id|groupDetailUrlGen}>">
                  <img src="<?php echo getResizeImg( $v['origin_img_url'], 390, 250 );?>" alt="<{$v['group_name']}>">
              </a>
          </dt>
          <dd class="list-txt">
            <div class="list-txt-t"><span class="tag"><{$v.category_name}></span><a target="_blank" href="<{$v.group_id|groupDetailUrlGen}>" title="<{$v['group_name']}>"><?php echo CHsubstr($v['group_name'],0,27)?></a>
              <p>成员<span><{$v.memberQuantity}></span>话题<span><{$v.topicQuantity}></span></p>
            </div>
              <volist name="v.topics_ids" id="v1">
              <a href="<{$v1.id|topicDetailUrlGen}>" class="circle-topic-title" target="_blank" title="<{$v1.name}>"><{$v1.name}></a>
              </volist>
          </dd>
        </dl>
      </volist>

      </div>
      <div class="title-wrap">
        <h2 class="circle-list-title discover">圈子广场<span>Discover</span></h2><a target="_blank" href="/index/create" class="create-circle" data-node="createCircle">创建圈子</a>
      </div>
      <div data-node="circleNav" class="circle-square-nav"><a href="javascript:;" class="more" data-node="addMordList">
           
          <span>更多</span><em class="icon icon-down"></em></a>
        <ul class="clearfix" data-node="categoryName">
        </ul>
      </div>
      <div class="circle-square-box clearfix" data-node="circleBox">
      </div>

        <div class="more-comments" data-node ="load"><a href="##" class="clearfix"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png">点击加载更多<em class="icon icon-right">&#xe98c;</em></span></a></div>
        <div class="more-comments" data-node ="loading"><a href="##" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
        <div class="more-comments" data-node ="noLoad"><a href="##" class="disabled clearfix"><span>没有可加载内容</span></a></div>
    </div>


<include file="Home@Public:footer" />
