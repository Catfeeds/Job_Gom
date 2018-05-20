<h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
<div class="tra-circle-box circle-color-fen">
    <div class="tra-cir-tags clearfix">
        <div class="tags-tab" data-node="travelTagsBox">
            <div class="tags-tab-container" data-node="travelTags">
                <?php foreach( $datalists as $k => $v ):?>

                <?php if( !empty( $v['url'] ) ) continue;?>
                <a sequence-node="<?php echo $v['sequence'];?>" href="javascript:void(0)" <?php if( empty( $k ) ):?>class="hoverCls"<?php endif;?>><?php echo $v['name'];?></a>
                <?php endforeach;?>
            </div>
				<?php
                    $more = end( $datalists );
                ?>
                <?php if( isset( $more['url'] ) && !empty( $more['url'] ) ):?>
                <div class="more" data-node="moreTags">
                    <a href="<?php echo $more['url'];?>" target="_blank"><?php echo $more['name'];?>						</a>
                </div>
                <?php endif;?>

        </div>

        <div class="tags-box" data-node="travelTabsBox">
            <div class="tags-item-container" data-node="travelTab">
                <div class="tags-box-item">

                    <?php
                    foreach( $datalists as $k => $v ):
                    ?>
                    <ul class="circle-item clearfix <?php if($k > 0) echo "none";?>" data-node="circleTab" sequence-node="<?php echo $v['sequence']?>">
                        <?php
                        $num=0;
                        foreach( $v['groups'] as $gk => $gv ):
                        if( $num > 3 ) break;
                        ?>
                        <li data-node="circleData" data-id="<?php echo $gv['group_id'];?>">
                            <div class="rec-circle-top">
									<span class="circle-img-item">
										<div class="backgroundImg" style="width:290px;height:190px;">
                                            <a target="_blank" href="<?php echo groupDetailUrlGen( $gv['group_id'] );?>">
                                                <img src="<?php echo $gv['icon'];?>">
                                            </a>
                                        </div>
                                        <?php if( isset( $gv['introduction'] ) && !empty( $gv['introduction'] ) ):?>
										<div class="r-c-t-block overflow-one">  <?php echo $gv['introduction']?></div>
                                        <?php endif;?>
																			</span>
                                <span class="babel overflow-one"><?php echo $gv['category_name'];?></span>
                            </div>
                            <div class="rec-circle-bottom">
                                <p class="r-c-b-p1 clearfix">
                                    <a href="<?php echo groupDetailUrlGen( $gv['group_id'] );?>" target="_blank">
                                <span class="r-c-b-title overflow-one">
                                    <?php echo $gv['name'];?>
                                </span>
                                    </a>
                                    <span class="r-c-b-member last">话题<i class="r-c-b-i" data-node="circleTopic">0</i></span>

                                    <span class="r-c-b-member">成员<i class="r-c-b-i" data-node="circleMember">0</i></span>
                                </p>

                                <?php
                                foreach( $gv['selected_topics'] as $tk => $tv ):
                                if( $tk > 3 ) break;
                                ?>
                                <p class="r-c-b-p2">
                                    <a class="overflow-one" href="<?php echo topicDetailUrlGen( $tv['id'] )?>" target="_blank">
                                        <?php if( $tv['type'] == 1 ):?>
                                        [话题]
                                        <?php elseif( $tv['type'] == 2 ):?>
                                        [活动]
                                        <?php endif;?>
                                        <?php echo string_parse_face( $tv['name'], 16);?>

                                    </a>
                                </p>
                                <?php endforeach;?>


                                <a class="add-circle" href="javascript:void(0)" data-action="joinCircle" data-groupid="138183519351341060"> <em></em><span>加入圈子</span></a>
                            </div>
                        </li>
                        <?php

                        $num++;
                        endforeach;
                        ?>

                    </ul>
                    <?php
                    endforeach;
                    ?>
                </div>
            </div>
        </div>

        <div class="tra-cir-activity" tpl-cms-node="groupfashionactivity">
            <div class="tra-cir-act-title">
                <h3>热门活动</h3><span class="line-red"></span>
            </div>
            <div class="tra-cir-act-box">
                <ul class="clearfix">
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/592c2f0558e23505482425b3.html?intcmp=group-PGPH0060-1" target="_blank">
                                        <img data-original="https://i2.meixincdn.com/v1/img/T1K.hvBKVT1RXrhCrK.jpg" src="https://i2.meixincdn.com/v1/img/T1K.hvBKVT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/592c2f0558e23505482425b3.html?intcmp=group-PGPH0060-1" target="_blank">
                                    <p class="overflow-one">如何快速提升生活仪式感</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/592940c61ceb0817650b46ad.html?intcmp=group-PGPH0060-2" target="_blank">
                                        <img data-original="https://i1.meixincdn.com/v1/img/T1IEYvBjh_1RXrhCrK.jpg" src="https://i1.meixincdn.com/v1/img/T1IEYvBjh_1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/592940c61ceb0817650b46ad.html?intcmp=group-PGPH0060-2" target="_blank">
                                    <p class="overflow-one">证明自己还是个孩子</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/59254c07800e2253bdf2cf50.html?intcmp=group-PGPH0060-3" target="_blank">
                                        <img data-original="https://i8.meixincdn.com/v1/img/T18ZCvB5C_1RXrhCrK.jpg" src="https://i8.meixincdn.com/v1/img/T18ZCvB5C_1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/59254c07800e2253bdf2cf50.html?intcmp=group-PGPH0060-3" target="_blank">
                                    <p class="overflow-one">你支持甜粽还是咸粽</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/5926511a7b93ea0d3cd20087.html?intcmp=group-PGPH0060-4" target="_blank">
                                        <img data-original="https://i4.meixincdn.com/v1/img/T1TCbvBKhv1R4cSCrK.png" src="https://i4.meixincdn.com/v1/img/T1TCbvBKhv1R4cSCrK.png">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/5926511a7b93ea0d3cd20087.html?intcmp=group-PGPH0060-4" target="_blank">
                                    <p class="overflow-one">听说，匡威免费送？！！</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/5925423a1ed43121c5ac14d5.html?intcmp=group-PGPH0060-5" target="_blank">
                                        <img data-original="https://i1.meixincdn.com/v1/img/T1JCVvB4_v1RXrhCrK.jpg" src="https://i1.meixincdn.com/v1/img/T1JCVvB4_v1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/5925423a1ed43121c5ac14d5.html?intcmp=group-PGPH0060-5" target="_blank">
                                    <p class="overflow-one">谁动了William的日记本</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/5922c4dc800e2253bdf2ce25.html?intcmp=group-PGPH0060-6" target="_blank">
                                        <img data-original="https://i1.meixincdn.com/v1/img/T1tZWvB4_T1RXrhCrK.jpg" src="https://i1.meixincdn.com/v1/img/T1tZWvB4_T1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/5922c4dc800e2253bdf2ce25.html?intcmp=group-PGPH0060-6" target="_blank">
                                    <p class="overflow-one">浴巾免费测评 更送香囊哦</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/59224e3280b7f83ffa22aa28.html?intcmp=group-PGPH0060-7" target="_blank">
                                        <img data-original="https://i6.meixincdn.com/v1/img/T15ZKvBjVT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/59224e3280b7f83ffa22aa28.html?intcmp=group-PGPH0060-7" target="_blank">
                                    <p class="overflow-one">娇韵诗免费试用了</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="https://group.gomeplus.com/topic/591ed2e880b7f83ffa22a921.html?intcmp=group-PGPH0060-8" target="_blank">
                                        <img data-original="https://i1.meixincdn.com/v1/img/T1AZDvBCAv1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="https://group.gomeplus.com/topic/591ed2e880b7f83ffa22a921.html?intcmp=group-PGPH0060-8" target="_blank">
                                    <p class="overflow-one">鼓励你撒狗粮</p>
                                </a>
							</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
