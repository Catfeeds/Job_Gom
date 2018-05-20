<?php
    $csspath = 'mix_circlelist.css';
    $jspath = '/js/conf/topics.js';
?>
<include file="Home@Public:header"/>

<script>
$GLOBAL_CONFIG['s_c'] = '<{$group_member_infos['category']['name']}>';
$GLOBAL_CONFIG['group_id'] = '<{$gid}>';
$GLOBAL_CONFIG['event_id'] = 'G000P011';
$GLOBAL_CONFIG['member_type'] = '<{$member_type}>';//用户是否属于该圈子
$GLOBAL_CONFIG['share_ssid'] = "<?php echo isset($_COOKIE['ssid']) ? $_COOKIE['ssid'] : '';?>";//分享埋点用
$GLOBAL_CONFIG['share_time'] = "<?php echo date('Ymd',time())?>";//分享埋点用
$GLOBAL_CONFIG['share_env'] = "<?php echo APP_STATUS?>";//分享埋点用

</script>


<div class="wrap-box">
	<div class="circle-top clearfix">
		<div class="circle-content">
			<div class="circle-title clearfix">
				<div class="circle-title-left">
					<div class="circle-t-l-cover"><img class="c-t-l-cover" onerror="imgError(this, 'g')" src="<{$group_member_infos['icon']}>" alt=""></div>
					<div class="circle-t-l-join clearfix">
						<if condition="$userId neq $group_member_infos['createrId']" >
							<if condition="$member_type eq 1">
								<a href="javascript:void(0);" class="c-t-l-join common-join" data-action="joinGroup" data-userid="<{$userId}>" data-groupid="<{$gid}>" data-approvalType="<{$group_member_infos['approvalType']}>" data-memberType="<{$member_type}>">加入圈子</a>
							<elseif condition="$member_type eq 2" />
								<a data-verify="1" class="common-join c-t-l-limit" href="javascript:void(0);"  data-memberType="<{$member_type}>">审核中</a>
							<elseif condition="$member_type eq 0" />
								<a data-verify="1" class="c-t-l-join common-join" href="javascript:void(0);" data-action="joinGroup" data-userid="<{$userId}>" data-groupid="<{$gid}>" data-approvalType="<{$group_member_infos['approvalType']}>"  data-memberType="<{$member_type}>">退出圈子</a>
							<elseif condition="$member_type eq 1000" />
								<a href="javascript:void(0);" class="common-join c-t-l-limit" title="圈子成员数已达上线">加入圈子</a>
							</if>
							<a target="_blank" class="c-t-l-create common-join " href="/index/create"  bp-data='{"create_group_url":"index/create"}' data-node="createCircle">创建圈子</a></div>
					<else/>
						<a target="_blank" class="c-t-l-create common-join common-join-middle" href="/index/create"  bp-data='{"create_group_url":"index/create"}' data-node="createCircle">创建圈子</a></div>
					</if>
				</div>
				<div class="circle-title-right">
					<div class="circle-t-r-title clearfix">
						<h1 class="c-t-r-title"><{$group_member_infos['name']}></h1>
						<if condition="$is_myself == true">
						    <div class="c-t-r-compile">
								<a href="<{$group_domain}>index/edit?group_id=<{$gid}>">编辑</a>
							</div>
						</if>
					</div>
					<div class="circle-t-r-time clearfix">
						<div class="circle-t-r-t-timedetail">
							<p class="c-t-r-t-time">创建于<{$group_member_infos['createTime']	}></p>
						</div>
						<!--
						<div class="circle-t-r-t-ownerdetail"><span class="c-t-r-t-owner">圈主：</span><a target="_blank" href="<{$group_member_infos['createrId']|userInfoUrlGen=$userId,$userinfos['loginStatus']}>"><span class="c-t-r-t-user"><{$group_member_infos['user']['nickname']|default=''}></span></a></div>
						-->
					</div>
					<div class="circle-t-r-type">
						<div class="circle-t-r-t-typedetail clearfix"><span class="c-t-r-t-type">分类：</span><i class="c-t-r-t-typelist"><{$group_member_infos['category']['parent']['name']}></i><i class="c-t-r-t-typelist"><{$group_member_infos['category']['name']}></i></div>
					</div>
					<div class="circle-t-r-countdetail clearfix">
						<div class="circle-t-r-c-memberdetail"><span class="c-t-r-c-member">成员：</span><span class="c-t-r-c-membercount"><{$group_member_infos['memberQuantity']|formatNum=###}></span></div>
						<div class="circle-t-r-c-topicdetail"><span class="c-t-r-c-topic">话题：</span><span class="c-t-r-c-topiccount"><{$group_member_infos['topicQuantity']|formatNum=###}></span></div>
					</div>
					<div class="circle-t-r-circledetail">
						<notempty name="group_member_infos.introduction">
							<span class="c-t-r-c-detail">圈子简介：</span><span class="c-t-r-c-detailcontent"><{$group_member_infos['introduction']|msubstr=###,0,140}></span>
						</notempty>
					</div>
				</div>
			</div>
			<div class="circle-lists">
				<div class="circle-lists-labalbar clearfix">
					<div class="circle-l-l-tab" data-topnum="<{$top_num}>" data-page="<{$page_num}>" data-pagesize="<{$page_size}>" data-gid="<{$gid}>">
						<if condition="$tid eq 1">
							<div class="circle-l-l-t-topic"><a href="<{$gid|groupDetailUrlGen}>" data-type="0">最近话题</a></div>
							<div class="circle-l-l-t-topic tabtopic-active"><a href="javascript:void(0)" data-type="1">精选话题</a></div>
						<else />
							<div class="circle-l-l-t-topic tabtopic-active"><a href="javascript:void(0)"  data-type="0">最近话题</a></div>
							<div class="circle-l-l-t-topic"><a href="<{$gid|groupDetailUrlGen=1}>" data-type="1">精选话题</a></div>
						</if>

					</div>
					<div class="circle-l-l-submit"><a href="javascript:void(0);" data-node="postTopic"  data-memberType="<{$member_type}>" bp-data='{"publish_url":"topic/publiser?gid=<{$gid}>"}'><em class="iconn-76-a"></em><span>发布话题</span></a></div>
				</div>


			<div data-node="content">
				<!--圈子无话题时-->
				<if condition="$tid eq 1">
					<if condition="!$list['topics']">
						<div class="circle-nonequality">
							<div class="circle-nq-center">
								<div class="circle-nq-c-left"></div>
								<div class="circle-nq-c-right"><span>还没有精选话题</span></div>
							</div>
						</div>
					</if>
					<else />
					<if condition="!$list['topTopics'] AND !$list['topics']">
						<div class="circle-nonetopic">
							<div class="circle-nt-center">
								<div class="circle-nt-c-left"></div>
								<div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span><a href="javascript:void(0);" data-node="postTopic" data-memberType="<{$member_type}>" bp-data='{"publish_url":"topic/publiser?gid=<{$gid}>"}'>发布话题</a><span>&nbsp;吧！</span></div>
							</div>
						</div>
					</if>
				</if>
				<div class="circle-lists-cell">
					<ul class="circle-l-c-wrap clearfix">
						<!--置顶话题-->
						<?php $modelType = $tid == 1 ? $modelPage['qzjxht'] : $modelPage['qzqbht'];?>
						<?php $m = 1;?>
						<volist name="list.topTopics" id='tp'>
							<include file="Index:circle_topic_info"/>
							<?php $m++;?>
						</volist>



						<!--普通话题-->
						<?php $modelType = $tid == 1 ? $modelPage['qzjxht'] : $modelPage['qzqbht'];?>
						<?php $m = ($page_num - 1) * $page_size +1 + count($list['topTopics']);?>
						<volist name="list.topics" id='tp'>
							<include file="Index:circle_topic_info"/>
							<?php $m++;?>
						</volist>
					</ul>
				</div>
			</div>
		</div>

			<div class="page" modelid="<?php echo $modelPub['ggfy']?>"><{$link_url}></div>

		</div>
		<div class="circle-user">
			<div class="circle-self clearfix">
				<div class="circle-self-top">
					<div class="circle-s-t-avatwarp">
						<a href="<{$group_member_infos['createrId']|userInfoUrlGen=$userId,$userinfos['loginStatus']}>" target="_blank"><img onerror="imgError(this, 'h')" src="<{$group_member_infos['user']['facePicUrl']}>" alt="">
							<if condition="$group_member_infos['expertInfo']['isExpert'] === true AND $group_member_infos['expertInfo']['auditStatus'] == 1"><div class="circle-s-t-fans"></div></if>
						</a>
					</div>
				</div>
				<div class="circle-self-down"  modelid="<?php echo $modelPage['qzqzxx']?>">
					<div class="circle-s-d-loader clearfix"><i class="circle-s-d-l-icon">圈主</i><a class="circle-s-d-l-name" target="_blank" href="<{$group_member_infos['createrId']|userInfoUrlGen=$userId,$userinfos['loginStatus']}>"><span><{$group_member_infos['user']['nickname']|default=''}></span></a>

						<if condition="$group_member_infos['user']['gender'] == 2">
							<div class="circle-s-d-l-gender circle-s-d-l-gender-man"></div>
						<elseif condition="$group_member_infos['user']['gender'] == 1" />
							<div class="circle-s-d-l-gender circle-s-d-l-gender-woman"></div>
						</if>
					</div>
					<div class="circle-s-d-count clearfix">
						<span class="circle-s-d-c-t-name">话题</span><span class="circle-s-d-c-t-topiccount"><if condition="isset($group_member_infos['userOwnedTopicQuantity']['ownedTopicQuantity'])"> <{$group_member_infos['userOwnedTopicQuantity']['ownedTopicQuantity']|formatNum=###}><else/>0</if></span>
						<span class="circle-s-d-c-throughline">|</span>
						<span class="circle-s-d-c-c-name">圈子</span><span class="circle-s-d-c-c-circlecount"><if condition="isset($group_member_infos['userOwnedGroupQuantity']['ownedGroupQuantity'])"><{$group_member_infos['userOwnedGroupQuantity']['ownedGroupQuantity']|formatNum=###}><else/>0</if></span>
					</div>
					<div class="circle-s-d-lookhost"><a class="circle-s-d-l-hostbutton"  target="_blank" href="<{$group_member_infos['createrId']|userInfoUrlGen=$userId,$userinfos['loginStatus']}>">查看TA的主页</a></div>
				</div>
			</div>
			<div class="circle-sameclass">
				<notempty name="group_lists">
				<div class="circle-sameclass-title clearfix">
					<div class="circle-s-t-word">同类别值得加入</div>
					<if condition="count($group_lists) gt 6">
						<div class="circle-s-t-change"><div class="circle-s-t-changeicon"></div><span>换一换</span></div>
					</if>
				</div>
				</notempty>
					<volist name="group_lists" id='group_info'>
						<if condition="$key%6 == 0"><ul class="circle-sameclass-list clearfix"  data-node="groupList" <if condition="$key != 0">style="display:none;"</if> ></if>
						<li class="circle-s-l-cell">
							<a class="circle-s-l-c-wrap" target="_blank" href="<{$group_info['group']['id']|groupDetailUrlGen}>">
								<div class="circle-s-l-c-avater"><img onerror="imgError(this, 'm')" src="<{$group_info['group']['icon']}>" alt="<{$group_info['group']['name']}>"></div>
								<p class="circle-s-l-c-name"><{$group_info['group']['name']}></p>
								<p class="circle-s-l-c-member"><span class="circle-s-l-c-membername">成员：</span><span class="circle-s-l-c-count"><{$group_info['group']['memberQuantity']|formatNum=###}></span></p>
							</a>
							<if condition="$group_info['group']['join_status'] eq 0">
								<a href="<{$group_info['group']['id']|groupDetailUrlGen}>" target="_blank" class="circle-s-l-c-button circle-s-l-c-button-joined" data-action="joinCircle"  data-memberType="<{$group_info['group']['join_status']}>" data-userid="<{$userId}>" data-groupid="<{$group_info['group']['id']}>" data-approvalType="0"  >&radic; 已加入</a>
							<elseif condition="$group_info['group']['join_status'] eq 1" />
								<a href="javascript:void(0)" target="_blank" class="circle-s-l-c-button" data-action="joinCircle"  data-userid="<{$userId}>" data-memberType="<{$group_info['group']['join_status']}>" data-groupid="<{$group_info['group']['id']}>" data-approvalType="0" data-href="<{$group_info['group']['id']|groupDetailUrlGen}>">+ 加入圈子</a>
							<elseif condition="$group_info['group']['join_status'] eq 1000" />
								<a href="javascript:void(0)" class="circle-s-l-c-button circle-s-l-c-button-joined" title="圈子成员数已达上线">+ 加入圈子</a>
							<elseif condition="$group_info['group']['join_status'] eq 2" />
								<a href="javascript:void(0)" class="circle-s-l-c-button circle-s-l-c-button-joined"  >审核中</a>
							</if>
						</li>
						<if condition="($key%6 eq 5) || ($key eq count( $group_lists)-1 )"></ul></if>
					</volist>
			</div>
			<div class="circle-hottopic">
				<div class="circle-hottopic-title">
					<div class="circle-t-t-word">热门话题</div>
					<if condition="count($hot_topics) gt 6"><a href="javascript:void(0);"><div class="circle-t-t-change "><div class="circle-s-t-changeicon"></div><span>换一换</span></div></a></if>
				</div>

					<?php $h=1;?>
					<volist name="hot_topics" id='ht'>
						<if condition="$key%6 == 0"><ol class="circle-hottopic-list"  data-node="topicsList" <if condition="$key != 0">style="display:none;"</if> ></if>
						<li class="circle-h-l-cell clearfix" modelid="<?php echo $modelPage['qzrmht'] . str_pad($h,4,'0',STR_PAD_LEFT); ?>">
							<div class="circle-h-l-cellleft">
								<a target="_blank" href="<{$ht.id|topicDetailUrlGen=###}>" title="<{$ht['name']}>"><img onerror="imgError(this, 'm')" src="<{$ht['hot_image']}>" title="<{$ht['name']}>" alt="<{$ht['name']}>" /></a>
							</div>
							<div class="circle-h-l-cellright">
								<div class="circle-h-l-c-name"><a target="_blank" href="<{$ht.id|topicDetailUrlGen=###}>" title="<{$ht['name']}>"><?php echo msubstr( $ht['name'], 0,27 );?></a></div>
								<ul class="circle-h-l-c-tool clearfix">
									<li><em class="icon iconn-11"></em><span class="circle-h-l-c-t-iscommetcount"><{$ht['replyQuantity']|formatNum=###}></span></li>
									<li><em class="icon iconn-10"></em><span class="circle-h-l-c-t-islikecount"><{$ht['like']['userQuantity']|formatNum=###}></span></li>
								</ul>
							</div>
						</li>
						<if condition="($key%6 eq 5) || ($key eq count( $hot_topics)-1 )"></ol></if>

						<?php $h++;?>
					</volist>
			</div>
		</div>
	</div>
</div>


<!--快捷入口-->
<div class="fixed-tool">
	<a href="javascript:void(0);" modelid="<?php echo $modelPage['qzfxan'].'0001' ?>" class="tool-1"  ><em class="iconn-76"></em><span class="hover-txt" data-node="postTopic" bp-data='{"publish_url":"topic/publiser?gid=<{$gid}>"}'  data-memberType="<{$member_type}>" >发布话题</span></a>
	<a href="javascript:void(0);" modelid="<?php echo $modelPage['qzfxan'].'0002' ?>" class="line1" data-node="wx"><em class="iconn-30"></em><span class="hover-txt">微信</span></a>
	<a href="javascript:void(0);" modelid="<?php echo $modelPage['qzfxan'].'0003' ?>" class="line1" data-node="wb"><em class="iconn-31"></em><span class="hover-txt">微博</span></a>
	<a href="javascript:void(0);" modelid="<?php echo $modelPage['qzfxan'].'0004' ?>" class="line1" data-node="qq"><em class="iconn-32"></em><span class="hover-txt">QQ</span></a>
	<a href="javascript:void(0);" modelid="<?php echo $modelPage['qzfxan'].'0005' ?>" class="tool-1" data-node="qzone"><em class="iconn-33"></em><span class="hover-txt">QQ空间</span></a>
</div>


<include file="Home@Public:footer" />
