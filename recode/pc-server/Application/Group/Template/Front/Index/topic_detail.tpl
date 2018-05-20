<?php
    $csspath = 'topicdetails.css';
    $jspath = '/js/conf/topicDetails.js';
?>

<include file="Home@Public:header"/>
<script>
    $GLOBAL_CONFIG['groupid'] = '<{$group_infos['id']}>';
    $GLOBAL_CONFIG['topicid'] = '<{$tid}>';
    $GLOBAL_CONFIG['topic_title'] = '<?php echo ( isset($infos['name']) ) ? addslashes(str_replace(array("\r\n", "\r", "\n"), '', $infos['name'])) : '' ;?>';
    $GLOBAL_CONFIG['no_next'] = '<{$no_next}>';
    $GLOBAL_CONFIG['video_arr'] = [];//视频数组
    $GLOBAL_CONFIG['s_c'] = '<{$group_infos['category']['name']}>';
    $GLOBAL_CONFIG['isExpert'] = '<{$userinfos['isExpert']|_get}>';//是否为达人
    $GLOBAL_CONFIG['headface'] = '<{$userinfos['ext']['account']['imagePath']|_get}>';//头像


    $GLOBAL_CONFIG['htfxan'] = '<{$modelPage['htfxan']}>';  //分享按钮
    $GLOBAL_CONFIG['htxq'] = '<{$modelPage['htxq']}>';  //话题详情
    $GLOBAL_CONFIG['htcypl'] = '<{$modelPage['htcypl']}>';  //参与评论
    $GLOBAL_CONFIG['htpllb'] = '<{$modelPage['htpllb']}>';  //评论列表
    $GLOBAL_CONFIG['htqzxx'] = '<{$modelPage['htqzxx']}>';  //圈主信息
    $GLOBAL_CONFIG['htrmht'] = '<{$modelPage['htrmht']}>';  //热门话题
    $GLOBAL_CONFIG['htxyy'] = '<{$modelPage['htxyy']}>';  //下一篇
    $GLOBAL_CONFIG['share_ssid'] = "<?php echo isset($_COOKIE['ssid']) ? $_COOKIE['ssid'] : '';?>";//分享埋点用
    $GLOBAL_CONFIG['share_time'] = "<?php echo date('Ymd',time())?>";//分享埋点用
    $GLOBAL_CONFIG['share_env'] = "<?php echo APP_STATUS?>";//分享埋点用
</script>
<script>
//页面唯一id
var pageId = '<?php echo isset( $pageId ) ? $pageId : ''; ?>';
//二维码地址url参数|记得在拼接ajax/qrcode?后的url参数需要urlencode编码
var qrcodeUrlmodel = '<?php echo isset( $qrcodeUrlmodel ) ? $qrcodeUrlmodel : ''; ?>';
</script>
<div class="wrap-box">
    <div class="totop" data-node="top"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
    <div class="crumbs-box">
        <{$crumbs}>
    </div>
</div>

<div data-node="more-topic">
    <div class="mb30">
        <div class="wrap-box ovflow-hid wrap-reletive" data-node="wrap-box" id-node="<{$infos['id']}>">
            <div class="topic-lfet" data-left="<{$tid}>">
                <div modelid="<?php echo $modelPage['htxq']?>" class="bjfff" data-node="tiles">
                    <notempty name="infos.coverPic">
                    <div class="topic-cover"><img src="<{$infos['coverPic']}>"></div>
                    </notempty>
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
                            <span class="fr">
                                <!--9c2--><em class="icon-discuss"></em>
                                <span class="topic-count"><?php echo formatNum($infos['replyQuantity']+$infos['subReplyQuantity'])?></span>
                            </span>

                            <span class="fr">
                                <!--9c2--><em class="icon-like"></em>
                                <span class="topic-count"><present name="praise_infos['userQuantity']"><{$praise_infos['userQuantity']|formatNum=###}><else/>0</present></span>
                            </span>
						<if condition="($userId == $infos['user']['id']) AND ($userId != 0)">
                            <a href="<{$i_domain}>member/profileHome" target="_blank" >
                        <else />
                            <a href="<{$group_domain}>ta/<{$infos['user']['id']}>.html" target="_blank" >
                        </if>
                                <if condition="!empty($infos['user']['facePicUrl'])">
                                    <img onerror="imgError(this, 'h')" src="<{$infos['user']['facePicUrl']|getResizeImg=###,16,16}>" alt="" onerror="imgError(this)">
                                <else />
                                    <img onerror="imgError(this, 'h')" src="<{$pcimgpath}>/images/public/head-default.png|getResizeImg=###,16,16" alt="<{$group_infos['category']['name']}>">
                                </if>
                                <{$infos['user']['nickname']|_get}>
                            </a>
                            <span>来自圈子：</span><a  href="<{$infos['group']['id']|groupDetailUrlGen}>" target="_blank"><{$infos['group']['name']}></a>
                            <span><{$infos.lastReplyTime}></span>
                    </div>
                    <div class="topic-conter" data-conter-ul="<{$tid}>">
                        <ul class="source-lef-list" data-node='ulFloat' data-surl="<{$infos.id|topicDetailUrlGen}>" data-stitle="<{$infos['name']|htmlspecialchars}>" data-spic="<{$images_str}>" data-content="<{$share_text}>">
                            <li modelid="<?php echo $modelPage['htfxan'].'0001' ?>"><a href="#" data-node="wx"><em class="icon-weixin"></em><span>微信</span></a></li>
                            <li modelid="<?php echo $modelPage['htfxan'].'0002' ?>"><a href="#" data-node="wb"><em class="icon-weibo"></em><span>微博</span></a></li>
                            <li modelid="<?php echo $modelPage['htfxan'].'0003' ?>"><a href="#" data-node="qq"><em class="icon-qq"></em><span>QQ</span></a></li>
                            <li modelid="<?php echo $modelPage['htfxan'].'0004' ?>"><a href="#" data-node="qzone"><em class="icon-qzone"></em><span>QQ空间</span></a></li>
                            <li modelid="<?php echo $modelPage['htfxan'].'0005' ?>">
                                <a href="#" data-node="praiseClick" data-id="<{$infos['id']}>" data-praise="<{$praise_infos['is_status']}>" data-type="1" class="<if condition="$praise_infos['isLike']">active</if>">
                                    <em class="icon-like-big"></em>
                                    <if condition="$praise_infos['isLike']"><span>取消点赞</span><else /><span>点赞</span></if>

                                </a>
                            </li>
                            <li modelid="<?php echo $modelPage['htfxan'].'0006' ?>">
                                <a href="#" data-node="collect" data-status="<{$infos['userCollection']['result']}>" class="<if condition="$infos['userCollection']['result']">active</if>">
                                    <em class="icon-collect-big"></em>
                                    <span>收藏</span>
                                </a>
                            </li>
                            <li modelid="<?php echo $modelPage['htfxan'].'0007' ?>"><a data-action="goComment" href="javascript:;"><em class="icon-discuss-big"></em><span>评论</span></a></li>
                            <eq name="mshop_info.mshop_flag" value="1">
                            <li modelid="<?php echo $modelPage['htfxan'].'0008' ?>"><a href="<{$mshop_info['mshop_url']}>" target="_blank"><em class="icon-meidian-big"></em><span>美店</span></a></li>
                            </eq>

                        </ul>
                        <div class="source-right-box" data-node="topicContent">
						<{$topic_html}>
                        </div>
                    </div>

					<div class="topic-operate">
                        <if condition="isset($infos['user']['is_del']) && ($infos['user']['is_del'] == true)">
						<a data-node = "userTopic-del"  href="javascript:;">删除</a>
                        </if>
                        <if condition="isset($infos['user']['is_del']) && ($infos['user']['is_del'] == true) && ($infos['user']['id'] neq $userId)">
                        <em class="line"></em>
                        </if>
                        <if condition="($userinfos['loginStatus'] eq 3) && ($infos['user']['id'] neq $userId) ">
                        <a href="javascript:;" data-action="topic-report">举报</a>
                        </if>
					</div>

                 </div>

                  <div modelid="<?php echo $modelPage['htcypl']?>" data-node="commentBox" class="topic-review-box">
                        <h2 class="review-title">参与评论</h2>
                    <div class="bjfff margin-btom20" data-node="comment_FirDiv">
                        <div class="text-field-box  clearfix">
                            <div class="topic-user-head">
                                <if condition="isset($userinfos['isExpert']) && $userinfos['isExpert']">
                                    <em class="icon-daren"></em>
                                </if>
								<if condition="isset($userinfos['ext']['account']['imagePath']) && !empty($userinfos['ext']['account']['imagePath'])" >
							     <img src="<{$userinfos['ext']['account']['imagePath']}>"  onerror="imgError(this, 'g')">
								<else />	
								  <img src="<?php 
										$url="{$pcimgpath}/images/public/head-default.png";
										echo getResizeImg($url,120,120);
								  ?>">
								</if>
                            </div>
                            <div class="topic-publish-content" data-node="comment_Msg" data-nickname="<{$nickName}>" data-tid="<{$tid}>"  data-gid="<{$group_infos['id']}>" data-userid="<{$userId}>" data-headface="<{$userinfos['ext']['account']['imagePath']|_get}>">
                                    <textarea class="textarea-bx" placeholder="说点什么吧…"></textarea>
                                    <label class="textarea-tips hide" data-node="textareaTips">说点什么吧…</label>
                                <div data-node="addImgGoods" data-imgNum ="9">
                                    <ul data-node="imgUl" class="clearfix"></ul>
                                </div>
                                <div class="publish-face-bx" data-publish="<{$tid}>">
                                    <p class="icon-face cursor-pointer" data-node="smilies_Face"><em class="icon-emoji"></em> 表情</p>
                                    <p class="icon-face cursor-pointer" data-node="addImg_btn"><em class="icon-picture"></em>图片</p>
                                    <p class="icon-face cursor-pointer" data-node="addGoods_btn"><em class="icon-goods"></em>商品</p>
                                    <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105 pc-bj-fc8753" data-node="a_Submit">登录</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-title" data-node="hidDiv">
                    <div class="bd-bottom"><span class="red"><?php echo $infos['replyQuantity']+$infos['subReplyQuantity']?></span><span>条评论</span></div>
                </div>

                <div  class="bjfff" data-node="hidDiv" data-ComTopicId="<{$tid}>">
                    <div modelid="<?php echo $modelPage['htpllb']?>"  class="circle-comments" data-node="circleCom" data-circleCom="<{$tid}>">
                    </div>
                    <div modelid="<?php echo $modelPub['ggjzgd']?>"  class="more-comments" data-node="loadlist">
                        <a href="javascript:;" class="clearfix">
                            <span>
                                <img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">点击加载更多
                                <em class="iconn-9"></em>
                            </span>
                        </a>
                    </div>
                    <div class="more-comments" data-node="loading" style="display:none">
                        <a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a>
                    </div>
                    <div class="more-comments" data-node="noload" style="display:none">
                        <a href="javascript:;" class="disabled clearfix">
                            <span>没有可加载内容</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="topic-right topic-absolute">
                <div class="topic-r-t" modelid="<?php echo $modelPage['htqzxx']?>">
                    <div class="shop-list">
                        <div class="user-head">
                            <a href="<{$infos['group']['id']|groupDetailUrlGen}>" target="_blank">

                                <if condition="!empty($infos['group']['icon'])">
                                    <img onerror="imgError(this, 'g')" src="<{$infos['group']['icon']|getResizeImg=###,100,100}>" alt="<{$infos['group']['name']}>">
                                <else />
                                    <img onerror="imgError(this, 'g')" src="<?php echo getResizeImg($pcimgpath.'/images/public/circle-default.png',80,80);?>" alt="<{$group_infos['category']['name']}>">
                                </if>
                            </a></div>
                        <h3 class="user-name"><a target="_blank" href="<{$infos['group']['id']|groupDetailUrlGen}>" title="<{$infos['group']['name']}>"><{$infos['group']['name']}></a></h3>
                        <div><span class="pc-btn pc-bj-fc8753 circle-type"><{$group_infos['category']['name']}></span></div>
                        <div class="user-top-info">
                            <ul class="clearfix">
                                <li>成员<span><{$infos['group']['memberQuantity']|formatNum=###}></span></li>
                                <li>话题<span><{$infos['group']['topicQuantity']|formatNum=###}></span></li>
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

                <div class="topic-position" data-node="topic_xi">             
                    <div class="topic-r-b" data-node="hot_topics">
                        <h2 class="topic-r-title">热门话题</h2>
                        <ul class="clearfix">
                            <?php $m=1;?>
                            <foreach name="hot_data" item="v">
                                <li modelid="<?php echo $modelPage['htrmht'].str_pad($m,4,'0',STR_PAD_LEFT); ?>"><a target="_blank" title="<{$v['name']}>" href="<{$v.id|topicDetailUrlGen}>"><img src="<{$v.hot_image}>" alt="<{$v['name']}>" onerror="imgError(this, 'g')">
                                        <!--<p><?php echo msubstr($v['name'],0,16)?></p>-->
                                        <p><?php echo $v['name'];?></p>

                                        <div class="text-icon"><em class="icon-like"></em><span><present name="v['like']['userQuantity']"><{$v['like']['userQuantity']|formatNum=###}><else/>0</present></span><em class="icon-discuss"></em><span><{$v['replyQuantity']|formatNum=###}></span></div>
                                    </a>
                                </li>
                                <?php $m++;?>
                            </foreach>
                        </ul>
                    </div>
                    <?php if(isset($nextTopic_data['data']['id'])){?>
                    <div modelid="<?php echo $modelPage['htxyy']?>"  class="next-page" data-node="next-page" data-get-next-topic="<{$tid}>" >
                        <p><span class="f12" data-node="times"><{$nextTopic_data['data']['lastReplyTime']|formatDateTime=###}></span>下一篇</p>
                        <a href="<{$nextTopic_data['data']['id']|topicDetailUrlGen=###}>" title="<{$nextTopic_data['data']['name']}>"><{$nextTopic_data['data']['name']}></a>
                        
                    </div>
                    <?php }?>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?php echo C('VIDEO_URL')?>gvs-player/dist/vod/js/meixinplayer-min.js" ></script>
<include file="Home@Public:footer" />
