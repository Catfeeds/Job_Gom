<?php
$data_lists = $data_first = $data_activety = $data_slot = [];
switch( $tpl_type ) {
    case 'fashion'://时尚
        $cms_api_unique = "groupfashiongroup";
        $cms_api_unique_active = "groupfashionactivity";

        $class_type = "travel";
        $class_color = 'fen';
        $data_first = $fashion_first;
        $data_active = $fashion_active;
        $data_slot = $fashion_group_slot;
        $data_lists = $fashion_lists;
        //埋点
        $md_code = 'PGPH006#i#-';
        $md_active_code = 'PGPH0060-';

        $unique_floor = 'fashion';
        break;
    case 'live'://生活
        $cms_api_unique = "grouplivegroup";
        $cms_api_unique_active = "groupliveactivity";

        $class_type = 'beauty';
        $class_color = 'ju';
        $data_first = $live_first;
        $data_active = $live_active;
        $data_slot = $live_group_slot;
        $data_lists = $live_lists;
        //埋点
        $md_code = 'PGPH007#i#-';
        $md_code_first = 'PGPH0071-';
        $md_active_code = 'PGPH0070-';

        $unique_floor = 'live';
        break;
    default:
        $md_code = '';
}
?>

<div class="<?php echo $class_type?>-circle" floor-node="<?php echo $unique_floor;?>" data-node="circleFloor" tpl-cms-node="<?php echo $cms_api_unique;?>" id="<?php echo $cms_api_unique;?>">
    <h2 class="title-h2"><?php echo ( isset( $data_slot['name'] ) ) ? $data_slot['name'] : '' ;?></h2>
    <div class="tra-circle-box circle-color-<?php echo $class_color;?>">
        <div class="tra-cir-tags clearfix">
            <div class="tags-tab" data-node="<?php echo $class_type;?>TagsBox">
                <div class="tags-tab-container" data-node="travelTags">
                    <?php
                    $i = 0;
                    foreach( $data_lists as $k => $v):

                        $md_source_code = str_replace( '#i#', $i+1, $md_code );
                        $md_source_code = substr( $md_source_code, 0, strlen( $md_source_code )-1);
                    ?>
                        <?php if( !empty( $v['url'] ) ) continue;?>
                        <a dp-data="<?php echo $md_source_code;?>" href="javascript:void(0)" <?php if( empty( $i ) ):?>class="hoverCls"<?php endif;?>><?php echo $v['name'];?></a>
                    <?php
                        $i++;
                    endforeach;
                    ?>
                </div>

                <?php
                    $more = end( $data_lists );
                ?>
                <?php if( isset( $more['url'] ) && !empty( $more['url'] ) ):?>
                <div class="more" data-node="moreTags">
                    <a href="<?php echo $more['url'];?>" target="_blank"><?php echo $more['name'];?>						</a>
                </div>
                <?php endif;?>
            </div>
            <div class="tags-box" data-node="<?php echo $class_type?>TabsBox">
                <div class="tags-item-container" data-node="<?php echo $class_type?>Tab">
                    <div class="tags-box-item">
                        <ul class="circle-item clearfix" data-node="circleTab">

                            <?php
                                foreach( $data_first['groups'] as $k => $v ):
                                    $md_loop_num = $k+1;
                                    $md_source_code = str_replace( '#i#', '1'.$md_loop_num, $md_code );
                                    $md_uri = groupDetailUrlGen( $v['group_id'] );
                            ?>
                            <li data-node="circleData" data-id="<?php echo $v['group_id'];?>">
                                <div class="rec-circle-top">
									<span class="circle-img-item">
										<div class="backgroundImg" style="width:290px;height:190px;">
											<a target="_blank" href="<?php echo $md_uri;?>" data-code="<?php echo $md_source_code.'1'?>">
												<img data-original="<?php echo img_double_protocol( $v['cmsIcon'] )?>">
											</a>
										</div>
										<?php if( isset( $v['introduction'] ) && !empty( $v['introduction'] ) ):?>
										<div class="r-c-t-block overflow-one">  <?php echo $v['introduction']?></div>
                                        <?php endif;?>
									</span>
									<span class="babel overflow-one"><?php echo $v['category_name']?></span>
								</div>
                                <div class="rec-circle-bottom">
                                    <p class="r-c-b-p1 clearfix"> 
                                        <a href="<?php echo $md_uri;?>" target="_blank" data-code="<?php echo $md_source_code.'1'?>">
                                            <span class="r-c-b-title overflow-one"><?php echo $v['cmsName']?></span>
                                        </a>
                                        <span class="r-c-b-member last">话题<i class="r-c-b-i" data-node="circleTopic">0</i></span>

                                        <span class="r-c-b-member">成员<i class="r-c-b-i" data-node="circleMember">0</i></span>
                                    </p>
                                    <?php
                                    foreach( $v['topics'] as $tk => $tv ):
                                        $md_topic_loop = $tk+2;
                                        $md_topic_code = $md_source_code.$md_topic_loop;
                                        $md_topic_uri = topicDetailUrlGen( $tv['id'] );
                                    ?>
                                    <p class="r-c-b-p2">
                                        <a class="overflow-one" href="<?php echo $md_topic_uri;?>" target="_blank" data-code="<?php echo $md_topic_code;?>">
                                            <?php if( $tv['type'] == 1 ):?>
                                            [话题]
                                            <?php elseif( $tv['type'] == 2 ):?>
                                            [活动]
                                            <?php endif;?>

                                            <?php echo string_parse_face( $tv['name'], 16);?>
                                        </a>
                                    </p>
                                    <?php endforeach;?>

                                    <?php if( isset( $v['_group_ids']['joined'] ) && $v['_group_ids']['joined'] ):?>

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
                </div>
            </div>
            <div class="tra-cir-activity" tpl-cms-node="<?php echo $cms_api_unique_active;?>" id="<?php echo $cms_api_unique_active;?>">
                <div class="tra-cir-act-title">
                    <h3>热门活动</h3><span class="line-red"></span>
                </div>
                <div class="tra-cir-act-box">
                    <ul class="clearfix">
                        <?php
                            foreach( $data_active as $k => $v ):
                            if( $k > 7 ) break;
                                $md_loop_num = $k+1;
                                $md_code = $md_active_code.$md_loop_num;
                                $md_uri = topicDetailUrlGen( $v['topic_id'] );
                        ?>
                        <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;" >
									<a href="<?php echo $md_uri;?>" target="_blank" data-code="<?php echo $md_code;?>">
										<img data-original="<?php echo img_double_protocol( $v['cmsIcon'] );?>">
									</a>
								</div>
								<a href="<?php echo $md_uri;?>" target="_blank" data-code="<?php echo $md_code;?>">
									<p class="overflow-one"><?php echo string_parse_face( $v['cmsName'], 16 );?></p>
								</a>
							</span>
                        </li>
                        <?php endforeach;?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
