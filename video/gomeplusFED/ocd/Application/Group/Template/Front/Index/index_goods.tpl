<?php
    $csspath = 'circle/circleindex.css';
    $jspath = '/js/conf/topics.js';
?>
<include file="Home@Public:header"/>
<include file="Public:top"/>
<script>
$GLOBAL_CONFIG['s_c'] = '<{$group_member_infos['group']['category']['name']}>';
$GLOBAL_CONFIG['group_id'] = '<{$gid}>';
$GLOBAL_CONFIG['event_id'] = 'G000P012';
</script>

<div class="wrap-box">
    <div class="index-title clearfix">
        <h2>
            <a href="<{$gid|groupDetailUrlGen}>" bp-data='{"event_id": "B000P013", "group_id": "<{$gid}>", "circle_type": "<{$group_member_infos['group']['category']['name']}>"}' rel="nofollow">全部话题</a>
            <if condition="$goods_status == 1">
            <a href="<{$gid|groupDetailUrlGen}>?tid=1" class="active" bp-data='{"event_id": "B000P014", "group_id": "<{$gid}>", "circle_type": "<{$group_member_infos['group']['category']['name']}>"}'>精选话题</a>
            </if>

                <a target="_blank" href="/topic/publiser?gid=<{$gid}>" class="release-topic" <if condition="$member_type != 0">style="display:none;"</if> bp-data='{"event_id": "B000P012", "group_id": "<{$gid}>", "circle_type": "<{$group_member_infos['group']['category']['name']}>"}'>
                    <em class="icon-release"><img src="<{$pcimgpath}>/images/circle/circleIndexRel.png" alt=""></em>
                    <span class="txt-release" data-node="postTopic">发布话题</span>
                </a>

        </h2>
    </div>
    <div class="circle-index-list clearfix" data-node="tiles" data-gid="<{$gid}>" data-type="1">

    </div>
    <div class="more-comments" data-action="loadMore">
        <a href="#" class="clearfix">
            <span><img src="<{$pcimgpath}>/images/circle/small-logo.png">查看更多<em class="icon icon-right"></em></span>
        </a>
    </div>
    <div class="more-comments" data-node="loading" style="display: none;">
        <a href="#" class="clearfix">
            <span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span>
        </a>
    </div>
</div>

<include file="Home@Public:footer" />
