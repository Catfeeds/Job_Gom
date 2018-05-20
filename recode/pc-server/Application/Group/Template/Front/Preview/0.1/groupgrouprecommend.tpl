
    <h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
    <ul class="circle-item clearfix">
        <?php
                foreach( $datalists as $k => $v ):
        if( $k > 3 ) break;

        $md_gp_loop_num = $k+1;
        $md_gp_code = $md_pageid.'PGPH003'.$md_gp_loop_num;
        $md_gp_uri = maidian_uri( groupDetailUrlGen( $v['group_id'] ), $md_gp_code ).'-1';
        ?>
        <li data-node="circleData" data-id="<?php echo $v['group_id'];?>">
            <div class="rec-circle-top">

                <div class="backgroundImg" style="width:290px;height:190px" >
                    <a href="<?php echo $md_gp_uri;?>" target="_blank">
                        <img src="<?php echo $v['icon'];?>">
                    </a>
                </div>
                <a href="<?php echo $md_gp_uri;?>" target="_blank">
                    <?php if( isset( $v['introduction'] ) && !empty( $v['introduction'] ) ):?>
                    <div class="r-c-t-block overflow-one"><?php echo $v['introduction'];?></div>
                    <?php endif;?>
                </a>
                <span class="babel overflow-one"><?php echo $v['category_name']?></span>
            </div>
            <div class="rec-circle-bottom">
                <p class="r-c-b-p1">
                    <a href="<?php echo $md_gp_uri;?>" target="_blank">
                        <span class="r-c-b-title overflow-one"><?php echo strip_tags( $v['name'] );?></span>
                    </a>

                    <span class="r-c-b-member last">话题<i class="r-c-b-i" data-node="circleTopic">0</i></span>

                    <span class="r-c-b-member">成员<i class="r-c-b-i" data-node="circleMember">0</i></span>
                </p>

                <?php
                        foreach( $v['selected_topics'] as $tk => $tv ):
                $md_topic_loop_num = $tk + 2;
                $md_topic_code = $md_gp_code.'-'.$md_topic_loop_num;
                $md_topic_uri = maidian_uri( topicDetailUrlGen( $tv['id'] ), $md_topic_code );
                ?>
                <p class="r-c-b-p2">
                    <a class="overflow-one" href="<?php echo $md_topic_uri;?>" title="<?php echo $tv['name'];?>" target="_blank">
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
                <a class="add-circle none" href="javascript:void(0)" data-action="joinCircle" data-groupid="<?php echo $v['group_id'];?>"> <em></em><span>加入圈子</span></a>
                <a class="ok-add-circle" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" target="_blank" data-node="joinCircleSuc"> <em> </em><span>已加入</span></a>
                <a class="add-circle check-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleChk" target="_blank"> <em> </em><span>审核中</span></a>
                <a class="add-circle refuse-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
                <?php else:?>
                <a class="add-circle" href="javascript:void(0)" data-action="joinCircle" data-groupid="<?php echo $v['group_id'];?>"> <em></em><span>加入圈子</span></a>
                <a class="ok-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" target="_blank" data-node="joinCircleSuc"> <em> </em><span>已加入</span></a>
                <a class="add-circle check-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleChk" target="_blank"> <em> </em><span>审核中</span></a>
                <a class="add-circle refuse-add-circle none" href="<?php echo groupDetailUrlGen( $v['group_id'] );?>" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
                <?php endif;?>
            </div>
        </li>
        <?php endforeach;?>
    </ul>
