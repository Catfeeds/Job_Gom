<?php



    $userid = ( isset( $userinfos['userId'] ) ) ? $userinfos['userId'] : 0 ;
    $login_status= ( isset( $userinfos['loginStatus'] ) ) ? $userinfos['loginStatus'] : 0 ;

?>
<div class="container-box">
<div class="container" data-node="container">
    <div class="top-list">
        <div class="banner banner-top" data-node="bannerBox" tpl-cms-node="groupbanner" id="groupbanner">
            <ul data-node="bannerImg">
                <?php foreach( $banner as $bk => $v ):?>
                <li>
                    <?php
                    switch( $v['type'] ) {
                        case 0:
                            $banner_url = productDetailUrlGen('',$v['id']);
                            break;
                        case 2:
                            $banner_url = $v['url'];
                            break;
                        case 7:
                            $banner_url = topicDetailUrlGen( $v['id'] );
                            break;
                        case 8:
                            $banner_url = groupDetailUrlGen( $v['id'] );
                            break;
                        default:
                            $banner_url = 'default';
                    }

                    $pos = $bk + 1;
                    ?>
                    <a data-code="<?php echo 'PGPH0011-'.$pos;?>" href="<?php echo $banner_url;?>" target="_blank">
				<div class="backgroundImg" style="width:700px;height:400px">
					<img src="<?php echo img_double_protocol( $v['cmsIcon'] )?>">
				</div>
				<span><?php echo $v['cmsName']?></span></a></li>
                <?php endforeach;?>
            </ul>
        </div>

        <div class="hot-content" >
            <h2><?php echo ( isset( $hot_image_slot['name'] ) ) ? $hot_image_slot['name'] : '' ;?></h2>
            <div class="tab-control" tpl-cms-node="grouphotimage" id="grouphotimage">
                <div class="tab-tags">
                    <ul data-node="hotConTagsBox">
                        <?php foreach( $hot_image as $k => $v ):?>
                        <li <?php if( empty($k) ):?>class="tab-li"<?php endif;?>><?php echo $v['name']?></li>
                        <?php endforeach;?>
                    </ul>
                </div>
                <div class="tab-contents" data-node="tabConBox" tpl-cms-node="grouphotimage_content" id="grouphotimage_content">
                    <?php
                        foreach( $hot_image as $k => $v ):
                        $md_tab_loop_num = $k+1;
                    ?>
                    <div class="tab-contents-item <?php if( $k != 0 ):?>none<?php endif;?>" data-node="topicTag" >
                        <div class="tab-top clearfix" data-node="topicTab">
                            <?php
                                foreach( $v['images'] as $sk => $sv ):
                                if( $sk > 2 ) break;

                                $md_loop_num = $sk+1;
                                $source_code = "PGPH002{$md_tab_loop_num}-{$md_loop_num}";

                                $product_uri = ( isset( $sv['url'] ) && !empty( $sv['url'] ) ) ? $sv['url'] : productDetailUrlGen('',$sv['id']) ;
                                $topic_uri = ( isset( $sv['url'] ) && !empty( $sv['url'] ) ) ? $sv['url'] : topicDetailUrlGen( $sv['id'] ) ;
                            ?>
                            <div class="item-img-text">
                                
									<div class="backgroundImg-lit" style="width:140px;height:140px">
									<?php if( $sv['type'] == 0 ):?>
                                    <a data-code="<?php echo $source_code?>" href="<?php echo $product_uri;?>" target="_blank" title="<?php echo $sv['cmsName']?>">
										<?php else:?>
											<a data-code="<?php echo $source_code?>" href="<?php echo $topic_uri;?>" target="_blank" title="<?php echo $sv['cmsName']?>">
										<?php endif;?>
										<img src="<?php echo img_double_protocol( $sv['cmsIcon'] )?>">
									</a>
									</div>
									<?php if( $sv['type'] == 0 ):?>
										<a data-code="<?php echo $source_code?>" href="<?php echo $product_uri;?>" target="_blank" title="<?php echo $sv['cmsName']?>">
									<?php else:?>
										<a data-code="<?php echo $source_code?>" href="<?php echo $topic_uri;?>" target="_blank" title="<?php echo $sv['cmsName']?>">
									<?php endif;?>
										<span class="hot-content-text overflow-one"><?php echo string_parse_face( $sv['cmsName'], 16 );?></span>
									</a>
                                <?php if( !empty( $sv['video'] ) ):?>
                                    <span class="icon-video"></span>
                                <?php endif;?>
                            </div>
                            <?php endforeach;?>
                        </div>
                    </div>
                    <?php endforeach;?>
                </div>
                <div class="tab-bottom" tpl-cms-node="grouphottext" id="grouphottext">
                    <ul>
                        <?php
                            foreach( $hot_text as $k => $v ):
                            if( $k > 3 ) break;

                            $md_loop_num = $k+1;
                            $source_code = "PGPH0020-{$md_loop_num}";
                            $md_uri = ( isset( $v['url'] ) && !empty( $v['url'] ) ) ? $v['url'] :  topicDetailUrlGen( $v['topic_id'] ) ;

                        ?>
                        <li class="overflow-one">
                            <a data-code="<?php echo $source_code;?>" href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['cmsName']?>">
								 <span class="overflow-one"><?php echo string_parse_face( $v['cmsName'], 16 );?></span>
                                <?php
                                    switch( $v['type'] ) {
                                        case '2':
                                            $hot_text_icon = 'active';
                                            break;
                                        case '3':
                                            $hot_text_icon = 'hot';
                                            break;
                                        case '5':
                                            $hot_text_icon = 'video';
                                            break;
                                        default:
                                            $hot_text_icon = '';
                                    }
                                ?>
                                <?php if( !empty( $hot_text_icon ) ):?>
                                <em class="<?php echo $hot_text_icon;?>"></em>
                                <?php endif;?>
                            </a>
                        </li>
                        <?php endforeach;?>
                    </ul>
                </div>
            </div>
        </div>

    </div>
    <div class="recommend-circle" tpl-cms-node="groupgrouprecommend" id="groupgrouprecommend">
        <h2 class="title-h2"><?php echo ( isset( $group_recommend_slot['name'] ) ) ? $group_recommend_slot['name'] : '' ;?></h2>
        <ul class="circle-item clearfix">
            <?php
                foreach( $group_recommend as $k => $v ):
                if( $k > 3 ) break;

                $md_gp_loop_num = $k+1;
                $md_gp_code = 'PGPH003'.$md_gp_loop_num;
                $md_gp_uri = groupDetailUrlGen( $v['group_id'] );
            ?>
            <li data-node="circleData" data-id="<?php echo $v['group_id'];?>">
                <div class="rec-circle-top">
                    
						<div class="backgroundImg img-box-size">
							<a data-code="<?php echo $md_gp_code.'-1'?>" href="<?php echo $md_gp_uri;?>" target="_blank">
								<img data-original="<?php echo img_double_protocol( $v['cmsIcon'] );?>">
							</a>
						</div>
					<a data-code="<?php echo $md_gp_code.'-1'?>" href="<?php echo $md_gp_uri;?>" target="_blank">	
                        <?php if( isset( $v['introduction'] ) && !empty( $v['introduction'] ) ):?>
                        <div class="r-c-t-block overflow-one"><?php echo $v['introduction'];?></div>
                        <?php endif;?>
                    </a>
					<span class="babel overflow-one"><?php echo $v['category_name']?></span>
                </div>
                <div class="rec-circle-bottom">
                    <p class="r-c-b-p1">
                        <a href="<?php echo $md_gp_uri;?>" target="_blank" data-code="<?php echo $md_gp_code.'-1'?>">
                            <span class="r-c-b-title overflow-one"><?php echo strip_tags( $v['cmsName'] );?></span>
                        </a>

                        <span class="r-c-b-member last">话题<i class="r-c-b-i" data-node="circleTopic">0</i></span>

                        <span class="r-c-b-member">成员<i class="r-c-b-i" data-node="circleMember">0</i></span>
                    </p>

                    <?php
                        foreach( $v['topics'] as $tk => $tv ):
                            $md_topic_loop_num = $tk + 2;
                            $md_topic_code = $md_gp_code.'-'.$md_topic_loop_num;
                            $md_topic_uri = topicDetailUrlGen( $tv['id'] );
                    ?>
                    <p class="r-c-b-p2">
                        <a data-code="<?php echo $md_topic_code?>" class="overflow-one" href="<?php echo $md_topic_uri;?>" title="<?php echo $tv['name'];?>" target="_blank">
                            <?php if( $tv['type'] == 1 ):?>	
                            [话题]
                            <?php else:?>
                            [活动]
                            <?php endif;?>
                            <?php
                                $tv_name = strip_tags( $tv['name'] );
                                echo string_parse_face( $tv_name, 16 );
                            ?>
                        </a>
                    </p>
                    <?php endforeach;?>

                    <?php if( isset( $group_recommend_ids[ $v['group_id'] ]['joined'] ) && $group_recommend_ids[ $v['group_id'] ]['joined'] ):?>
                    <a class="add-circle add-hover none" href="javascript:void(0)" data-action="joinCircle" data-groupid="<?php echo $v['group_id'];?>"> <em></em><span>加入圈子</span></a>
                    <a class="ok-add-circle" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" target="_blank" data-node="joinCircleSuc"> <em> </em><span>已加入</span></a>
					<a class="add-circle check-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleChk" target="_blank"> <em> </em><span>审核中</span></a>
                    <a class="add-circle refuse-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
					<?php else:?>
                    <a class="add-circle add-hover" href="javascript:void(0)" data-action="joinCircle" data-groupid="<?php echo $v['group_id'];?>"> <em></em><span>加入圈子</span></a>
                    <a class="ok-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" target="_blank" data-node="joinCircleSuc"> <em> </em><span>已加入</span></a>
                    <a class="add-circle check-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleChk" target="_blank"> <em> </em><span>审核中</span></a>
                    <a class="add-circle refuse-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
					<?php endif;?>
                </div>
            </li>
            <?php endforeach;?>
        </ul>
    </div>
    <div class="topic-content" tpl-cms-node="grouptopic" id="grouptopic">
        <h2 class="title-h2"><?php echo ( isset( $topic_slot['name'] ) ) ? $topic_slot['name'] : '' ;?></h2>
        <ul class="clearfix">
            <?php
                foreach( $topic as $k => $v ):
                if( $k > 9 ) break;


                $md_loop_num = $k+1;
                $source_code = "PGPH0041-{$md_loop_num}";
                $md_uri = topicDetailUrlGen( $v['topic_id'] );
            ?>
            <li data-node="topicData" data-id="<?php echo $v['topic_id'];?>">
                <div>
				
                        <div class="topic-content-top backgroundImg" style="width:230px;height:150px">
							<a href="<?php echo $md_uri;?>" title="<?php echo $v['cmsName']?>" target="_blank" data-code="<?php echo $source_code;?>">
								<img data-original="<?php echo img_double_protocol( $v['cmsIcon'] )?>" >
							</a>
						</div>
                        <div class="topic-content-bottom">
							<a href="<?php echo $md_uri;?>" title="<?php echo $v['cmsName']?>" target="_blank" data-code="<?php echo $source_code;?>">
								<p class="t-c-b-tit overflow-one">

									<?php
										$cms_name = strip_tags( $v['cmsName'] );
										echo string_parse_face( $cms_name, 16 );
									?>

								</p>
							</a>
							<a href="<?php echo $md_uri;?>" title="<?php echo $v['cmsName']?>" target="_blank" data-code="<?php echo $source_code;?>">
								<p class="t-c-b-icon">

									<span class="ticon-like">
										<i data-node="topicLike">
										<?php if( isset( $topic_ids[ $v['topic_id'] ]['likeQuantity'] ) ):?>
											<?php echo formatNum( $topic_ids[ $v['topic_id'] ]['likeQuantity'] );?>
										<?php else:?>
											0
										<?php endif;?>
										</i>
									</span>


									<span class="ticon-speak">
										<i data-node="topicSpeak">
										<?php if( isset( $topic_ids[ $v['topic_id'] ]['replyQuantity'] ) ):?>
											<?php echo formatNum( $topic_ids[ $v['topic_id'] ]['replyQuantity'] );?>
										<?php else:?>
											0
										<?php endif;?>
										</i>
									</span>
								</p>
							</a>
                        </div></div>
                <div class="avatar">

                    <a href="<?php echo userInfoUrlGen( $v['create_user_id'], $userid, $login_status );?>" target="_blank">
                        <em><img data-original="<?php echo img_double_protocol( $v['user_icon'] )?>"></em>
                        <span><?php echo $v['user_nickname']?></span>
                    </a>
                </div>
            </li>
            <?php endforeach;?>
        </ul>
    </div>

    <!--品质生活-->
    <div class="daren-recommend" tpl-cms-node="groupqualitylife" id="groupqualitylife">
        <h2 class="title-h2"><?php echo ( isset( $quality_lift_slot['name'] ) ) ? $quality_lift_slot['name'] : '' ;?></h2>
        <ul class="clearfix">
            <?php
                foreach( $quality_lift as $k => $v ):
                if( $k > 3 ) break;


                $md_pz_loop_num = $k+1;
                $md_pz_code = 'PGPH005'.$md_pz_loop_num;
                $md_pz_uri = topicDetailUrlGen( $v['topic_id'] );
            ?>
            <li data-node="topicData" data-id="<?php echo $v['topic_id'];?>">
                <div class="mg-negative">
                    <div class="img">
						<div class="backgroundImg img-box-size">
							<a href="<?php echo $md_pz_uri;?>" target="_blank" data-code="<?php echo $md_pz_code.'-1'?>">
								<img class="img-img" data-original="<?php echo img_double_protocol( $v['cmsIcon'] );?>">
							</a>
						</div>
                        <div class="avatar">
                            <a href="<?php echo userInfoUrlGen( $v['create_user_id'], $userid, $login_status );?>" target="_blank">
                                <em><img src="<?php echo img_double_protocol( $v['user_icon'] );?>" data-original="<?php echo img_double_protocol( $v['user_icon'] );?>"></em>
                                <span><?php echo $v['user_nickname']?></span>
                            </a>
                        </div>
                    </div>
                    <div class="img-box clearfix">
                        <?php
                            foreach( $v['cmsComponents'] as $ck => $cv ):
                            if( $ck > 3 ) break;

                            $md_pz_product_loop = $ck+2;
                            $md_pz_product_code = $md_pz_code.'-'.$md_pz_product_loop;
                            $md_pz_product_uri = productDetailUrlGen($cv['shopId'],$cv['id']);
                        ?>
	
                        <span class="goods-item">
							<div class="backgroundImg-mini" style="width:60px;height:60px">
								<a href="<?php echo $md_pz_product_uri;?>" title="<?php echo $cv['name']?>" target="_blank" data-node="goodsData" data-id="<?php echo $cv['id'];?>" data-code="<?php echo $md_pz_product_code;?>"> <!-- data-id="商品id" -->
									<img data-original="<?php echo ( isset( $cv['image'] ) ) ? img_double_protocol( $cv['image'] ) : '' ;?>" >
								</a>
							</div>

							<a href="<?php echo $md_pz_product_uri;?>" title="<?php echo $cv['name']?>" target="_blank" data-node="goodsData" data-id="<?php echo $cv['id'];?>" data-code="<?php echo $md_pz_product_code;?>"> <!-- data-id="商品id" -->

								<if condition="$cv['_product_ids']['salePrice']">
                                    <p class="" data-node="moneyBox">¥<span data-node="goodsPrice"><?php echo convert_price( $cv['_product_ids']['salePrice'] );?></span></p>
                                <else />
                                    <p class="" data-node="moneyBox">¥<span data-node="goodsPrice">暂无售价</span></p>
                                </if>
							</a>
						</span>
                        <?php endforeach;?>
                    </div>
                    <div class="text">
                        <a class="list-title overflow-one" href="<?php echo $md_pz_uri;?>" title="<?php echo $v['cmsName'];?>" target="_blank" data-code="<?php echo $md_pz_code.'-1'?>">
                            <?php echo $v['cmsName'];?>
                        </a>
                        <p class="gray"><?php echo msubstr( $v['description'],0, 42);?></p>
                        <div class="text-icon">

                            <a href="<?php echo topicDetailUrlGen( $v['topic_id'] );?>" target="_blank" data-code="<?php echo $md_pz_code.'-1'?>">
                            <span class="ticon-like"><i data-node="topicLike">0</i></span>
                            </a>


                            <a href="<?php echo topicDetailUrlGen( $v['topic_id'] );?>" target="_blank" data-code="<?php echo $md_pz_code.'-1'?>">
                            <span class="ticon-speak"><i data-node="topicSpeak">0</i></span>
							</a>
						</div>
                    </div>
                </div>
            </li>
            <?php endforeach;?>

        </ul>
    </div>

    <?php $tpl_type = "fashion";?>
    <include file="Group@Channel:floor" />


    <?php $tpl_type = "live";?>
    <include file="Group@Channel:floor" />

    <div class="video-circle" data-node="videoCricle" tpl-cms-node="groupvideotopic" id="groupvideotopic">
        <h2 class="title-h2"><?php echo ( isset( $video_topic_slot['name'] ) ) ? $video_topic_slot['name'] : '' ;?></h2>
        <div class="tra-circle-box">
            <div class="tra-cir-tags clearfix">
                <div class="tags-box" data-node="videoTabsBox">
                    <div class="tags-item-container" data-node="videoTab">
                        <div class="tags-box-item">
                            <ul class="circle-item clearfix">
                                <?php
                                    foreach( $video_lists as $k => $v ):
                                    if( $k > 3 ) break;

                                    $md_loop_num = $k+1;
                                    $source_code = "PGPH0080-{$md_loop_num}";
                                    $md_uri = topicDetailUrlGen( $v['topic_id'] );
                                ?>
                                <li>
                                    <div class="rec-circle-top">
											<div class="backgroundImg img-box-video-size">
												<a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['cmsName']?>" data-code="<?php echo $source_code;?>">
													<img data-original="<?php echo img_double_protocol( $v['cmsIcon'] )?>">
												</a>
											</div>
                                            <div class="r-c-t-block overflow-one"> 
												<a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['cmsName']?>" data-code="<?php echo $source_code;?>"> <?php echo $v['cmsName']?></a>
											</div>
                                        <span class="zhibo-label">视频</span>
                                    </div>
                                </li>
                                <?php endforeach;?>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="video-circle-right" tpl-cms-node="groupvideoactivity" id="groupvideoactivity">
                    <div class="video-cir-act-box">
                        <ul class="clearfix">
                            <?php
                                foreach( $video_active_lists as $k => $v ):
                                if( $k > 7 ) break;

                                $md_loop_num = $k+1;
                                $source_code = "PGPH0081-{$md_loop_num}";
                                $md_uri = topicDetailUrlGen( $v['topic_id'] );
                            ?>
                            <li>
                                
									<div class="backgroundImg-lit" style="width:160px;height:100px;">
									<a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['cmsName']?>" data-code="<?php echo $source_code;?>">
										<img data-original="<?php echo img_double_protocol( $v['cmsIcon'] )?>"></a>
									</div>
                                    <a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['cmsName']?>" data-code="<?php echo $source_code;?>"><p class="overflow-one"><?php echo string_parse_face( $v['cmsName'], 16 );?></p></a>
                                    <span class="icon-video"></span>
                            </li>
                            <?php endforeach;?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="money-circle" floor-node="stroll" data-node="moneyFloor" tpl-cms-node="groupstrollproduct" id="groupstrollproduct">
        <h2 class="title-h2"><?php echo ( isset( $stroll_product_slot['name'] ) ) ? $stroll_product_slot['name'] : '' ;?></h2>
        <div class="tra-circle-box circle-color-lan">
            <div class="tra-cir-tags clearfix">
                <div class="tags-tab" data-node="moneyTagsBox">
                    <div class="tags-tab-container" data-node="moneyTags">
                        <?php
                        $md_code_stroll = 'PGPH009';
                        $i=0;
                        foreach( $stroll_product_lists as $k => $v):
                        if( !empty( $v['url'] ) ) continue;
                        $p_loop_num = $i+1;
                        $md_code = $md_code_stroll.$p_loop_num;
                        ?>
                        <a dp-data="<?php echo $md_code;?>" href="javascript:void(0)" <?php if( empty( $i ) ):?>class="hoverCls"<?php endif;?>><?php echo $v['name'];?></a>
                        <?php
                        $i++;
                        endforeach;
                        ?>
                    </div>
                        <?php
                            $more = end( $stroll_product_lists );
                        ?>
                        <?php if( isset( $more['url'] ) && !empty( $more['url'] ) ):?>
                        <div class="more" data-node="moreTags">
                            <a href="<?php echo $more['url'];?>" target="_blank"><?php echo $more['name'];?>						</a>
                        </div>
                        <?php endif;?>
                </div>
                <div class="money-tags-box" data-node="moneyTabsBox">
                    <div class="money-tags-box-item" data-node="moneyTab">
                        <div class="banner item-big-one" data-node="goodsBannerBox">
                            <ul class="slider-container clearfix" data-node="goodsBannerImg">

                                <?php
                                foreach( $stroll_product_first['banners'] as $k => $v ):
                                    $md_banners_loop = $k+1;
                                    $md_banners_code = $md_code_stroll.'11-'.$md_banners_loop;
                                    $md_banners_uri = productDetailUrlGen('',$v['product_id']);
                                ?>
                                <li class="slider-item-container" data-node="goodsData" data-id="<?php echo $v['product_id'];?>"><!-- data-id="商品id" -->
                                    
										<div class="backgroundImg" style="width:600px;height:390px">
											<a href="<?php echo $md_banners_uri;?>" target="_blank" title="<?php echo $v['cmsName'];?>" data-code="<?php echo $md_banners_code;?>">
												<img src="<?php echo img_double_protocol( $v['cmsImage'] );?>">
											</a>
										</div>
                                    
                                    <div class="item-big-one-bottom clearfix">
                                        <p class="item-big-one-price">
                                            <a href="<?php echo $md_banners_uri;?>" target="_blank" data-code="<?php echo $md_banners_code;?>">
                                                <span class="item-b-o-title overflow-one"><?php echo $v['cmsName'];?></span>
                                            </a>
                                        </p>
                                        <p class="item-b-o-p clearfix none" data-node="moneyBox">
                                            <span class="item-b-o-rebate none" data-node="returnMoney"> <i>返利</i></span>
											<span class="item-b-o-price" data-node="goodsPrice">0</span>
											<em>¥</em>
                                        </p>
                                    </div>
                                </li>
                                <?php endforeach;?>

                            </ul>
                        </div>
                        <div class="item-small-four">
                            <ul class="clearfix" data-node="ggRight">
                                <?php
                                $i=0;
                                foreach( $stroll_product_first['products'] as $k => $v ):
                                    if( $i > 3) break;

                                    $md_product_loop = $k+1;
                                    $md_product_code = $md_code_stroll.'12-'.$md_product_loop;
                                    $md_product_uri = productDetailUrlGen('',$v['product_id']);
                                ?>

                                <li data-node="goodsData" data-id="<?php echo $v['product_id'];?>"><!-- data-id="商品id" -->
                                    
										<div class="backgroundImg-lit" style="width:160px;height:160px">
											<a href="<?php echo $md_product_uri;?>" target="_blank" data-code="<?php echo $md_product_code;?>">
												<img data-original="<?php echo img_double_protocol( $v['cmsImage'] );?>">
											</a>
										</div>
                                    
                                    <a class="item-s-f-a overflow-one" href="<?php echo $md_product_uri;?>" target="_blank" title="<?php echo $v['cmsName'];?>" data-code="<?php echo $md_product_code;?>">
                                        <?php echo $v['cmsName'];?>
                                    </a>
									<p class="item-b-o-p clearfix none" data-node="moneyBox">
										<span class="item-b-o-rebate none" data-node="returnMoney"> <i>返利</i></span>
										<em>¥</em>
										<span class="item-b-o-price" data-node="goodsPrice">0</span>
										
									</p>
                                </li>
                                <?php
                                    $i++;
                                    endforeach;
                                ?>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</div>
<div class="circle-pop">
    <div class="join-success" data-node="sucPop">
        <div class="j-s-suc"><em class="pop_cha" data-action="sucCha"></em>
            <p><img src="<{$img_d_proto}>/images/circle/index/icon_join_yes.png"><span class="suc-text" data-node="sucText">成功加入圈子</span></p>
        </div>
        <div class="mask"></div>
    </div>
    <div class="join-fail" data-node="failPop">
        <div class="j-s-fail"> <em class="pop_cha" data-action="failCha"></em>
            <p><img src="<{$img_d_proto}>/images/circle/index/icon_join-fail.png"><span class="fail-text" data-node="failText">出问题了，请重新加入圈子！</span></p>
        </div>
        <div class="mask"></div>
    </div>
</div>

