
    <h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
    <ul class="clearfix">
        <?php
                foreach( $datalists as $k => $v ):
        if( $k > 3 ) break;


        $md_pz_loop_num = $k+1;
        $md_pz_code = $md_pageid.'PGPH005'.$md_pz_loop_num;
        $md_pz_uri = maidian_uri( topicDetailUrlGen( $v['topic_id'] ), $md_pz_code ).'-1';
        ?>
        <li data-node="topicData" data-id="<?php echo $v['topic_id'];?>">
            <div class="mg-negative">
                <div class="img">
                    <div class="backgroundImg" style="width:290px;height:190px">
                        <a href="<?php echo $md_pz_uri;?>" target="_blank">
                            <img class="img-img" src="<?php echo $v['icon'];?>">
                        </a>
                    </div>
                    <div class="avatar">
                        <a href="<?php echo userInfoUrlGen( $v['create_user_id'], $userid, $login_status );?>" target="_blank">
                            <em><img src="<?php echo $v['user_icon'];?>"></em>
                            <span><?php echo $v['user_nickname']?></span>
                        </a>
                    </div>
                </div>
                <div class="img-box clearfix">
                    <?php
                            foreach( $v['components'] as $ck => $cv ):
                    if( $ck > 3 ) break;

                    $md_pz_product_loop = $ck+2;
                    $md_pz_product_code = $md_pz_code.'-'.$md_pz_product_loop;
                    $md_pz_product_uri = maidian_uri( productDetailUrlGen($cv['shopId'],$cv['id']), $md_pz_product_code );
                    ?>

                        <span class="goods-item">
							<div class="backgroundImg-mini" style="width:60px;height:60px">
                                <a href="<?php echo $md_pz_product_uri;?>" title="<?php echo $cv['name']?>" target="_blank" data-node="goodsData" data-id="<?php echo $cv['id'];?>"> <!-- data-id="商品id" -->
                                    <img src="<?php echo ( isset( $cv['image'] ) ) ? $cv['image'] : '' ;?>" >
                                </a>
                            </div>
							<a href="<?php echo $md_pz_product_uri;?>" title="<?php echo $cv['name']?>" target="_blank" data-node="goodsData" data-id="<?php echo $cv['id'];?>"> <!-- data-id="商品id" -->
                                <p class="none" data-node="moneyBox">¥<span data-node="goodsPrice"><?php echo convert_price( $cv['_product_ids']['price'] );?></span></p>
                            </a>
						</span>
                    <?php endforeach;?>
                </div>
                <div class="text">
                    <a class="list-title overflow-one" href="<?php echo $md_pz_uri;?>" title="<?php echo $v['name'];?>" target="_blank">
                        <?php echo $v['name'];?>
                    </a>
                    <p class="gray"><?php echo msubstr( $v['description'],0, 42);?></p>
                    <div class="text-icon">

                        <a href="<?php echo topicDetailUrlGen( $v['topic_id'] );?>" target="_blank">
                            <span class="ticon-like"><i data-node="topicLike">0</i></span>
                        </a>


                        <a href="<?php echo topicDetailUrlGen( $v['topic_id'] );?>" target="_blank">
                            <span class="ticon-speak"><i data-node="topicSpeak">0</i></span>
                        </a>
                    </div>
                </div>
            </div>
        </li>
        <?php endforeach;?>

    </ul>
