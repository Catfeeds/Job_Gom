<?php
    $csspath = 'usercenter-he-page.css';
    $jspath  = '/js/conf/other_index.js';
?>
<include file="Home@Front/Public:header" />
<script>
    $GLOBAL_CONFIG['ownerUserId'] = '<?php echo ($ownerUserId) ? $ownerUserId : 0 ;?>';
    $GLOBAL_CONFIG['tdqz'] = '<{$modelPage['tdqz']}>';  //他的圈子
    $GLOBAL_CONFIG['htlb'] = '<{$modelPage['htlb']}>';  //话题列表
    $GLOBAL_CONFIG['qzsl'] = '<?php echo isset($circles['data']['ownedGroupQuantity']) ? $circles['data']['ownedGroupQuantity'] : 0; ?>';  //圈子总数量
</script>


<div class="wrap-box clearfix">
	<div class="home-box">
		<div class="home-bg"></div>
		<div class="personal-home-block">
			<div class="black-bg"></div>
			<div class="personal-home-info clearfix">
				<img class="person-img" onerror="imgError(this,'h')" src="<{$userinfo['user']['facePicUrl']}>">
				<if condition="$userinfo['expert']['isExpert'] === true AND $userinfo['expert']['auditStatus'] == 1">
					<div class="expert"><{$userinfo['expert']['category']['name']}></div>
				</if>

				<div class="info-detail">
					<p>
						<span><{$userinfo['user']['nickname']}></span>
						<?php if(isset($userinfo['user']['gender'])){ ?>
						<if condition="$userinfo['user']['gender'] == 2">
							<em class="icon male"></em>
						<elseif condition="$userinfo['user']['gender'] == 1" />
							<em class="icon female"></em>
						</if>
						<?php } ?>
					</p>
					<span>话题：<{$ownedTopicQuantity|formatNum=###}></span><span>圈子：<{$ownedGroupQuantity|formatNum=###}></span>
				</div>
			</div>
		</div>
	</div>
	<div class="clearfix mart15">
		<div class="home-content-block fl">
			<div class="home-content">
				<h3 class="content-title"><{$userinfo['user']['nickname']}>的话题</h3>
				<div class="content-topic">
					<if condition="($topics['data']['ownedTopicQuantity'] gt 0) AND (!empty($topics['data']['topics']))">
						<ul class="topic-list">
						<volist name="topics.data.topics" id='tp'>
							<?php
									$str = ($pageNum -1) * 10 + ($key+1);
									$str = '0000'.$str;
								?>
							<li modelid="<{$modelPage['htlb']}><?php echo substr($str, strlen($str)-4,4)?>">
								<h4><a href="<{$tp.topid|topicDetailUrlGen=###}>" target="_blank" title="<{$tp.title}>"><{$tp.title}></a></h4>
								<p><a href="<{$tp.topid|topicDetailUrlGen=###}>" target="_blank" title="<{$tp.title}>"><{$tp.text}></a></p>
								<notempty name="tp.images">
									<dl class="clearfix">
										<volist name="tp['images']" id='img'>
											<dd>
												<a href="<{$tp.topid|topicDetailUrlGen=###}>" target="_blank" title="<?php if(!isset($img['item']['name'])){ echo $tp['title']; }?>">
													<img onerror="imgError(this,'m')" src="<{$img['url']}>"  alt="<?php if(isset($img['item']['name'])){ echo $img['item']['name']; }else{echo $tp['title'];}?>">
												</a>
												<if condition="$img.type eq 'video'">
													<div class="video-play"></div>
													<elseif  condition="$img.type eq 'item'" />
													<div class="list-layer">
														<if condition="$img['item']['salePrice']">
															<span class="list-price">¥<{$img['item']['salePrice']|convert_price=###}></span>
														<else />
															<span class="list-price">¥暂无售价</span>
														</if>
														<em class="icon icon-goods"></em></div>
													<div class="hover-show"><span><?php if(isset($img['item']['name'])){ echo $img['item']['name']; }else{echo $tp['title'];}?></span></div>

												</if>
											</dd>
										</volist>
									</dl>
								</notempty>
								<div class="clearfix">
									<div class="fl"><span class="marr18"><{$tp.time}></span><span>来自圈子：</span><a href="<{$tp.groupid|groupDetailUrlGen=###}>" target="_blank"  title="<{$tp.groupName}>"><{$tp.groupName}></a></div>
									<div class="fr"><span>
                        <!-- icon替换 .icon--><em class="iconn-10-1"></em><{$tp.likeQuantity|formatNum=###}></span><span>
                        <!-- icon替换 .icon--><em class="iconn-11"></em><{$tp.replyQuantity|formatNum=###}></span><span>
                        <!-- icon替换 .icon--><em class="iconn-57"></em><{$tp.topicCollectionQuantity|formatNum=###}></span></div>
								</div>
							</li>
						</volist>
						</ul>
					<else />
						<div class="no-topic">
							<div class="txt clearfix">
								<!-- icon替换 icon-->
								<p> <span>暂时还没有话题~</span></p>
							</div>
						</div>
					</if>
					<if condition="$topics['data']['ownedTopicQuantity'] gt 10">
						<div class="page" modelid="<?php echo $modelPub['ggfy']?>"><{$link_url}></div>
					</if>
				</div>

			</div>

		</div>
		<div class="home-side">
			<div class="side-circle">
				<div class="his">
					<h3><{$userinfo['user']['nickname']}>的圈子</h3><span>(</span><span class="num"><{$ownedGroupQuantity|formatNum=###}></span><span>)</span>
					<if condition="($circles['data']['ownedGroupQuantity'] gt 9) AND count($circles['data']['groups']) gt 9 ">
					<div class="arrow-box">
						<a class="disabled" href="javascript:;" data-action="pre"><!-- icon替换 .icon--><em class="iconn-8"></em></a>
						<a href="javascript:;" data-action="next"><!-- icon替换 --><em class="iconn-9"></em></a>
					</div>
					</if>
				</div>
				<div class="circle-box">
					<if condition="($circles['data']['ownedGroupQuantity'] gt 0) AND (!empty($circles['data']['groups']))">
						<volist name="circles.data.groups" id='g'>
							<if condition="$key%9 == 0"><ul class="circle-page clearfix" data-node="circleList" <if condition="$key != 0">style="display:none;"</if> ></if>
							<?php
								$str = $pageNum * $key + 1;
								$str = '0000'.$str;
							?>
							<li modelid="<{$modelPage['tdqz']}><?php echo substr($str, strlen($str)-4,4)?>"  class="circle-list clearfix">
							<div class="img fl">
								<a href="<{$g.id|groupDetailUrlGen=###}>" target="_blank"  title="<{$g['name']}>"><img src="<{$g.icon}>" onerror="imgError(this,'g')"></a>
								<div class="circle-style-block"><span class="circle-type"><{$g['cat']}></span></div>
							</div>
							<div class="circle-list-info fl">
								<p><a href="<{$g.id|groupDetailUrlGen=###}>" class="text-hide" target="_blank" title="<{$g['name']}>"><{$g['name']}></a></p>
								<div class="circle-details"><span class="marr10">成员：<{$g.memberQuantity|formatNum=###}></span><span>话题：<{$g.topicQuantity|formatNum=###}></span></div>
								<div class="circle-joins">
									<if condition="$g['join_status'] eq 0">
										<a class="joins-circle joined" data-userid="<{$userId}>" data-groupid="<{$g['id']}>" data-approvalType="0" data-memberType="0" href="<{$g.id|groupDetailUrlGen=###}>" target="_blank"><i></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已加入</a>
									<elseif condition="$g['join_status'] eq 1" />
										<a class="joins-circle"data-userid="<{$userId}>" data-groupid="<{$g['id']}>" data-approvalType="1" data-memberType="1" data-action="joinCircle"  href="javascript:;" target="_blank"  data-href="<{$g.id|groupDetailUrlGen=###}>">+&nbsp;加入圈子</a>
									<elseif condition="$g['join_status'] eq 1000" />
										<a class="joins-circle joined" data-userid="<{$userId}>" title="圈子成员数已达上线">+&nbsp;加入圈子</a>
									<elseif condition="$g['join_status'] eq 2" />
										<a class="joins-circle joined"  href="javascript:;">审核中</a>
									</if>
								</div>
							</div>
						</li>

						<if condition="($key%9 eq 8) || ($key eq count($circles['data']['groups'])-1)"></ul></if>
						</volist>
					<else />
						<div class="no-topic">
							<div class="txt clearfix">
								<!-- icon替换 icon-->
								<p><span>Ta还没有圈子呢～</span></p>
							</div>
						</div>
					</if>
				</div>
			</div>
		</div>
	</div>
</div>


<include file="Home@Front/Public:footer" />
