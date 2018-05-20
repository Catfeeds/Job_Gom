    <h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
    <ul class="clearfix">
        <?php
                foreach( $datalists as $k => $v ):
        if( $k > 9 ) break;


        $md_loop_num = $k+1;
        $source_code = "{$md_pageid}PGPH0041-{$md_loop_num}";
        $md_uri = maidian_uri( topicDetailUrlGen( $v['topic_id'] ), $source_code );
        ?>
        <li data-node="topicData" data-id="<?php echo $v['topic_id'];?>">
            <div>

                <div class="topic-content-top backgroundImg" style="width:230px;height:150px">
                    <a href="<?php echo $md_uri;?>" title="<?php echo $v['name']?>" target="_blank">
                        <img src="<?php echo $v['icon']?>" >
                    </a>
                </div>
                <div class="topic-content-bottom">
                    <a href="<?php echo $md_uri;?>" title="<?php echo $v['name']?>" target="_blank">
                        <p class="t-c-b-tit overflow-one">

                            <?php
										$cms_name = strip_tags( $v['name'] );
										echo string_parse_face( $cms_name, 16 );
									?>

                        </p>
                    </a>
                    <a href="<?php echo $md_uri;?>" title="<?php echo $v['name']?>" target="_blank">
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
                    <em><img src="<?php echo $v['user_icon']?>"></em>
                    <span><?php echo $v['user_nickname']?></span>
                </a>
            </div>
        </li>
        <?php endforeach;?>
    </ul>
