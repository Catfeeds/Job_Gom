<?php
    $csspath = 'circle/circleindex.css';
    $jspath = '/js/conf/groupSearch.js';
?>
<include file="Home@Public:header"/>

<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/circle/searchcircle.css">
    
<div class="wrap-box" data-node="wrap-box">
    <div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
    <div class="crumbs-box">
        <{$crumbs}>
    </div>
    <if condition="empty($lists)">

        <div class="search-result">
            <div class="result-text clearfix"><em class="icon">&#xe960;</em>
                <p>没有找到相关内容，换其它关键词试试吧</p>
            </div>
        </div>

    <else />
        <div class="circle-index-list clearfix" data-node="groupWrap" data-keyword="<{$q}>">
            <foreach name="lists" item="v">
            <div class="shop-list" data-node='groupList' data-id='<{$v.id}>'>
                <!--
                <a data-node="share" data-surl="topic/index?gid=<{$v.id}>" data-stitle="<{$v.name}>" data-spic="<{$v.icon}>" href="javascript:;" class="a-share search-circle-share">
                    <em class="icon icon-share"></em>分享到
                </a>
                -->
                <div class="user-head">
                    <a target="_blank" href="<{$v.id|groupDetailUrlGen}>" bp-data='{"event_id": "G000P006", "s_word": "<{$q}>", "group_id": "<{$v.id}>", "s_type": "group"}'>
                        <if condition="!empty($v['icon'])">
                            <img src="<{$v.icon}>" alt="<{$v.name}>">
                        <else />
                            <img src="<{$pcimgpath}>/images/public/circle-default.png" alt="<{$v.name}>">
                        </if>
                    </a>
                </div>
                <h3 class="user-name"><{$v.name}></h3>
                <div><span class="pc-btn pc-bj-fc8753 circle-type"><{$v.category.name}></span></div>
                <div class="user-top-info">
                    <ul class="clearfix">
                        <li>成员：<span><{$v.memberQuantity}></span></li>
                        <li>话题：<span><{$v.topicQuantity}></span></li>
                    </ul>
                </div>
            </div>
            </foreach>
        </div>

        <?php $lists_total = count($lists)?>
        <div class="more-comments" data-action="loadMore" <if condition="$lists_total lt 20">style="display:none;"</if>>
            <a href="javascript:;" class="clearfix">
                <span><img src="<{$pcimgpath}>/images/circle/small-logo.png">查看更多<em class="icon icon-right"></em></span>
            </a>
        </div>

        <div class="more-comments" data-node="loading" style="display: none;">
            <a href="javascript:;" class="clearfix">
                <span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span>
            </a>
        </div>

    </if>
</div>

<include file="Home@Public:footer" />
