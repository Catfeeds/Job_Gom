<?php
    $csspath = 'circlelist.css';
    $jspath = '/js/conf/categoryList.js';
?>
<include file="Home@Public:header"/>
<script>
  $GLOBAL_CONFIG['htlb'] = '<{$modelPage['qzlb']}>';  //圈子列表
</script>
    <div class="wrap-box">
      <div class="title-wrap">
        <h2 class="circle-list-title">精彩推荐<span>Popular recommendation</span></h2>
      </div>
      <div class="popular-recommendation clearfix">
      <?php $m=1;?>
      <volist name="lists" id="v">

        <dl class="recommendation-list" modelid="<?php echo $modelPage['jctj'].str_pad($m,4,'0',STR_PAD_LEFT); ?>">
          <dt class="list-img">
              <a target="_blank" href="<{$v.group_id|groupDetailUrlGen}>" title="<{$v['cmsName']}>">
                  <img onerror="imgError(this, 'l')" src="<?php echo getResizeImg( $v['cmsIcon'], 390, 250,'MEIXIN' );?>" alt="<{$v['cmsName']}>">
              </a>
          </dt>
          <dd class="list-txt">
            <div class="list-txt-t"><span class="tag"><{$v.category_name}></span><a target="_blank" href="<{$v.group_id|groupDetailUrlGen}>" title="<{$v['cmsName']}>"><{$v['cmsName']}></a>
              <p>成员<span><{$v.memberQuantity|default=0}></span>话题<span><{$v.topicQuantity|default=0}></span></p>
            </div>
              <volist name="v.topics" id="v1">
              <a href="<{$v1.id|topicDetailUrlGen}>" class="circle-topic-title" target="_blank" title="<{$v1.name}>"><{$v1.name}></a>
              </volist>
          </dd>
        </dl>

        <?php $m++;?>
      </volist>

      </div>
      <div class="title-wrap">
        <h2 class="circle-list-title discover">圈子广场<span>Discover</span></h2><a target="_blank" href="/index/create" class="create-circle" data-node="createCircle">创建圈子</a>
      </div>
      <div data-node="circleNav" class="circle-square-nav" modelid="<?php echo $modelPage['qzgc']?>">
        <a href="javascript:;" class="more" data-node="addMordList">

          <span>更多</span><em class="iconn-2"></em></a>
        <ul class="clearfix" data-node="categoryName">
        </ul>
      </div>
      <div class="circle-square-box clearfix" data-node="circleBox" model-prefix="<?php echo $modelPage['qzlb']?>">
      </div>

        <div class="more-comments" data-node ="load" modelid="<?php echo $modelPub['ggjzgd']?>"><a href="javascript:void(0);" class="clearfix"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">点击加载更多<em class="iconn-9"></em></span></a></div>
        <div class="more-comments" data-node ="loading"><a href="javascript:void(0);" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
        <div class="more-comments" data-node ="noLoad"><a href="javascript:void(0);" class="disabled clearfix"><span>没有可加载内容</span></a></div>
    </div>


<include file="Home@Public:footer" />
