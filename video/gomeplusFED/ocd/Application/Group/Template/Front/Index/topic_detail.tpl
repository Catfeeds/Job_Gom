<?php
    $csspath = 'circle/topicdetails.css';
    $jspath = '/js/conf/topicDetails.js';
?>
<include file="Home@Public:header"/>

<script>
    $GLOBAL_CONFIG['groupid'] = '<{$group_infos['id']}>';
    $GLOBAL_CONFIG['topicid'] = '<{$tid}>';
    $GLOBAL_CONFIG['video_arr'] = [];//视频数组
    $GLOBAL_CONFIG['s_c'] = '<{$group_infos['category']['name']}>';
    $GLOBAL_CONFIG['isExpert'] = '<{$userinfos['isExpert']|_get}>';//是否为达人
    $GLOBAL_CONFIG['headface'] = '<{$userinfos['imagePath']|_get}>';//头像

</script>

<div class="wrap-box">
    <div class="totop" data-node="top"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
    <div class="crumbs-box">
        <{$crumbs}>
    </div>
</div>

<div data-node="more-topic">
    <div>
        <div class="wrap-box ovflow-hid wrap-reletive" data-node="wrap-box" id-node="<{$infos['id']}>">
            <div class="topic-lfet">
                <div class="bjfff" data-node="tiles">
                    <div class="topic-title0">
                        <h1>
                            <if condition="$infos['isUpper']">
                                <em class="set-top">置顶</em>
                            </if>

                            <if condition="$infos['isEssence']">
                                <em class="set-spark">精品</em>
                            </if>
                            <if condition="$infos['style'] eq 1">
                                <em class="set-access">专访</em>
                            </if>
                            <{$infos['name']}></h1>
                        <p class="topic-source" data-node="likewrap">

                            <a href="javascript:;" class="cursor-default">
                                <if condition="!empty($infos['user']['facePicUrl'])">
                                    <img onerror="imgError(this, 'h')" src="<{$infos['user']['facePicUrl']}>" alt="" onerror="imgError(this)">
                                <else />
                                    <img onerror="imgError(this, 'h')" src="<{$pcimgpath}>/images/public/head-default.png" alt="<{$group_infos['category']['name']}>">
                                </if>
                                <{$infos['user']['nickname']|_get}>
                            </a>
                            <span>来自圈子：</span><a  href="<{$infos['group']['id']|groupDetailUrlGen}>" target="_blank"><{$infos['group']['name']}></a>
                            <span><{$infos.lastReplyTime}></span>

                            <span class="fr">
                                <!--9c2--><em class="icon icon-comment"></em>
                                <span class="topic-count"><?php echo $infos['replyQuantity']+$infos['subReplyQuantity']?></span>
                            </span>

                            <span class="fr">
                                <!--9c2--><em class="icon icon-collection"></em>
                                <span class="topic-count"><{$praise_infos['userQuantity']}></span>
                            </span>

                    </div>
                    <div class="topic-conter">
                        <ul class="source-lef-list" data-node='ulFloat' data-surl="<{$infos.id|topicDetailUrlGen}>" data-stitle="<{$infos['name']}>" data-spic="<{$images_str}>" data-content="<{$share_text}>">
                            <li><a href="#" data-node="wx"><em class="icon">&#xe937;</em><span>微信</span></a></li>
                            <li><a href="#" data-node="wb"><em class="icon">&#xe935;</em><span>微博</span></a></li>
                            <li><a href="#" data-node="qq"><em class="icon">&#xe900;</em><span>QQ</span></a></li>
                            <li><a href="#" data-node="qzone"><em class="icon">&#xe902;</em><span>QQ空间</span></a></li>
                            <li><a href="#" data-node="praiseClick" data-id="<{$infos['id']}>" data-praise="<{$praise_infos['is_status']}>" data-type="1"><em class="icon icon-zan <if condition="$praise_infos['isLike']">active</if>"></em><span>点赞</span></a></li>
                            <li>
                                <a href="#" data-node="collect" data-status="<{$infos['userCollection']['result']}>">
                                <em class="icon icon-save <if condition="$infos['userCollection']['result']">active</if>"></em><span>收藏</span></a></li>
                            <li><a data-action="goComment" href="javascript:;"><em class="icon">&#xeaa0;</em><span>评论</span></a></li>
                        </ul>
                        <div class="source-rig-box">
                               
        					<{$topic_html}>
                        </div>
                        </div>
                    </div>
                    <div data-node="commentBox" class="topic-review-box">
                        <h2 class="review-title">参与评论</h2>
                    <div class="bjfff margin-btom20" data-node="comment_FirDiv">
                        <div class="text-field-box">
                            <div class="topic-user-head">
                                <if condition="isset($userinfos['isExpert']) && $userinfos['isExpert']">
                                    <em class="icon-daren"></em>
                                </if>
                                <img src="<if condition="!empty($userinfos['imagePath'])"><{$userinfos['imagePath']}><else /><{$pcimgpath}>/images/public/head-default.png</if>">
                            </div>
                            <div class="topic-publish-content" data-node="comment_Msg" data-nickname="<{$nickName}>" data-tid="<{$tid}>"  data-gid="<{$group_infos['id']}>" data-userid="<{$userId}>" data-headface="<{$userinfos['imagePath']|_get}>">
                                <textarea placeholder="说点什么吧…" class="textarea-bx"></textarea>
                                <div class="publish-face-bx">
                                    <p class="icon-face cursor-pointer" data-node="smilies_Face"><em class="icon">&#Xe95c;</em> 表情</p>
                                    <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105 pc-bj-fc8753" data-node="a_Submit">登录</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-title" data-node="hidDiv">
                    <div class="bd-bottom"><span class="red"><?php echo $infos['replyQuantity']+$infos['subReplyQuantity']?></span><span>条评论</span></div>
                </div>
               
                <div class="bjfff" data-node="hidDiv">
                    <div class="circle-comments" data-node="circleCom" data-circleCom="<{$tid}>">
                    </div>
                    <div class="more-comments" data-node="loadlist" data-loadlist="<{$tid}>">
                        <a href="javascript:;" class="clearfix">
                            <span>
                                <img src="<{$pcimgpath}>/images/circle/small-logo.png">点击加载更多
                                <em class="icon icon-right">&#xe98c;</em>
                            </span>
                        </a>
                    </div>
                    <div class="more-comments" data-node="loading" data-loading="<{$tid}>" style="display:none">
                        <a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a>
                    </div>
                    <div class="more-comments" data-node="noload" data-noload="<{$tid}>" style="display:none">
                        <a href="javascript:;" class="disabled clearfix">
                            <span>没有可加载内容</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="topic-right topic-absolute">
            <!--
                <div class="shop-list">
                    <div class="user-head">
                        <a href="javascript:void(0);">
                            <if condition="!empty($infos['user']['facePicUrl'])">
                                <img src="<{$infos['user']['facePicUrl']}>" alt="">
                            <else />
                                <img src="<{$pcimgpath}>/images/public/head-default.png" alt="<{$group_infos['category']['name']}>">
                            </if>
                        </a>
                    </div>
                    <h3 class="user-name"><a href="javascript:void(0);"><{$infos['user']['nickname']}></a></h3>
                </div>
                <div class="btn-box clearfix" <if condition="isset($userinfos['userId']) && $userinfos['userId'] == $infos['user']['id']">style="display: none;"</if>>
                    <if condition="isset( $othermember_info['followStatus'] ) && $othermember_info['followStatus'] == 1">
                        <a data-node='follow' data-userid="<{$infos['user']['id']}>" href="javascript:void(0);" class="pc-btn pc-bj-fc8753 pc-btnw120 pc-btnh45" style="opacity: 0.7;">已关注</a>
                    <else />
                        <a data-node='follow' data-userid="<{$infos['user']['id']}>" href="javascript:void(0);" class="pc-btn pc-bj-fc8753 pc-btnw120 pc-btnh45">加关注</a>
                    </if>
                </div>-->
                <div class="topic-r-t">
                    <div class="shop-list">
                        <div class="user-head">
                            <a href="<{$infos['group']['id']|groupDetailUrlGen}>" target="_blank">

                                <if condition="!empty($infos['group']['icon'])">
                                    <img onerror="imgError(this, 'g')" src="<{$infos['group']['icon']}>" alt="<{$infos['group']['name']}>">
                                <else />
                                    <img onerror="imgError(this, 'g')" src="<{$pcimgpath}>/images/public/circle-default.png" alt="<{$group_infos['category']['name']}>">
                                </if>
                            </a></div>
                        <h3 class="user-name"><a target="_blank" href="<{$infos['group']['id']|groupDetailUrlGen}>" title="<{$infos['group']['name']}>"><{$infos['group']['name']}></a></h3>
                        <div><span class="pc-btn pc-bj-fc8753 circle-type"><{$group_infos['category']['name']}></span></div>
                        <div class="user-top-info">
                            <ul class="clearfix">
                                <li><span><{$infos['group']['memberQuantity']}></span>成员</li>
                                <li><span><{$infos['group']['topicQuantity']}></span>话题</li>
                            </ul>
                        </div>
                    </div>
                    <div class="btn-box clearfix">
                        <if condition="$member_type == 1">
                                <a data-node='circle' data-approvaltype="<{$group_infos['approvalType']}>" data-userid="<{$userId}>" data-groupid="<{$infos['group']['id']}>" event-id="B000P015" href="javascript:void(0);" class="pc-btn pc-btnw120 pc-btnh45">加入圈子</a>
                        <elseif condition="$member_type == 2" />
                            <a data-verify="1" class="pc-btn pc-bj-fc8753 pc-btnw120 pc-btnh45" href="#" style="background: rgb(204, 204, 204) none repeat scroll 0% 0%;">审核中</a>
                        <else />
                            <a href="/topic/publiser?gid=<{$group_infos['id']}>" bp-data='{"event_id": "G000P010", "group_id": "<{$group_infos['id']}>", "topic_id": "<{$tid}>"}' class="pc-btn pc-bj-fc8753 pc-btnw120 pc-btnh45">发布话题</a>
                        </if>
                    </div>
                </div>

                <h2 class="topic-r-title">热门话题</h2>
                <div class="topic-r-b" data-node="hot_topics">
                    <ul class="clearfix">
                    <foreach name="hot_data" item="v">
                          <li><a target="_blank" title="<{$v['name']}>" href="<{$v.id|topicDetailUrlGen}>"><img src="<{$v.hot_image}>" title="<{$v['name']}>" alt="<{$v['name']}>" onerror="imgError(this, 'g')">
                              <!--<p><?php echo msubstr($v['name'],0,16)?></p>-->
                              <p><?php echo $v['name'];?></p>

                              <div class="text-icon"><em class="icon">&#xeac9;</em><span><{$v['like']['userQuantity']}></span><em class="icon">&#xeaca;</em><span><{$v.replyQuantity}></span></div>
                                </a>
                              </li>
                    </foreach>
                    </ul>
                </div>
                <!--
                <div class="next-page" data-node="next-page">
                    <p>下一篇</p><a href="#"></a>
                    <p class="f12" data-node="times"></p>
                </div>
                -->
            </div>
        </div>
    </div>
</div>
<!--
<script src="https://js.meixincdn.com/gvs-player/dist/vod/js/meixinplayer-min.js"></script>
-->
<script src="<?php echo C('VIDEO_URL')?>gvs-player/dist/vod/js/meixinplayer-min.js"></script>
<script>

    for( var i=0; i<$GLOBAL_CONFIG['video_arr'].length; i++ ) {

        var _video = $GLOBAL_CONFIG['video_arr'][i];
        var video_id = _video.base.id;

        new MeixinPlayer().init(video_id, 'videoContainer_'+video_id, _video.config);
    }
</script>
<include file="Home@Public:footer" />
