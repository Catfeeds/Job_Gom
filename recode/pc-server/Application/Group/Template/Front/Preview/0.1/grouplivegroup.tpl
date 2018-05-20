<h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
<div class="tra-circle-box circle-color-ju">
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
                    if( $k > 3 ) break;
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
                    <?php endforeach;?>
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
                                    <a href="http://group.pre.gomeplus.com/topic/590acb8cd15f8c7ac1e2f52a.html?intcmp=group-PGPH0060-1" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T18FETBsWT1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T18FETBsWT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590acb8cd15f8c7ac1e2f52a.html?intcmp=group-PGPH0060-1" target="_blank">
                                    <p class="overflow-one">标题<img src="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/qinqin.png" class="imoji" style="height:16px; width:16px" data-original="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/qinqin.png"><img src="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/qinqin.png" class="imoji" style="height:16px; width:16px" data-original="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/qinqin.png"><img src="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/qinqin.png" class="imoji" style="height:16px; width:16px" data-original="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/qinqin.png"><img src="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/deyi.png" class="imoji" style="height:16px; width:16px" data-original="http://js.dev.meixincdn.com:1314/CDN8053/dist/images/emoji/deyi.png"></p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590acb8cd15f8c7ac1e2f52a.html?intcmp=group-PGPH0060-2" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T1nzxTBvEv1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T1nzxTBvEv1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590acb8cd15f8c7ac1e2f52a.html?intcmp=group-PGPH0060-2" target="_blank">
                                    <p class="overflow-one">我是大美女</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-3" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T11abTBQWT1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T11abTBQWT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-3" target="_blank">
                                    <p class="overflow-one">陈小春陈小春陈小春陈小春陈小春</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590acb8cd15f8c7ac1e2f52a.html?intcmp=group-PGPH0060-4" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T1LRATBQLT1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T1LRATBQLT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590acb8cd15f8c7ac1e2f52a.html?intcmp=group-PGPH0060-4" target="_blank">
                                    <p class="overflow-one">韦小宝韦小宝韦小宝韦小宝韦小宝韦小宝韦小宝韦小宝韦小宝</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-5" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T1jFETB_DT1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T1jFETB_DT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-5" target="_blank">
                                    <p class="overflow-one">很好玩啊啊啊很好玩啊啊啊很好玩啊啊啊很好玩啊啊啊很好玩啊啊啊</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-6" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T1aNETB_LT1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T1aNETB_LT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-6" target="_blank">
                                    <p class="overflow-one">大老婆大老婆大老婆大老婆大老婆大老婆大老婆大老婆大老婆大老婆</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-7" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T1xNdTBKJv1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T1xNdTBKJv1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-7" target="_blank">
                                    <p class="overflow-one">小老婆小老婆小老婆小老婆小老婆小老婆小老婆小老婆小老婆</p>
                                </a>
							</span>
                    </li>
                    <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;">
                                    <a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-8" target="_blank">
                                        <img data-original="https://i-pre.meixincdn.com/v1/img/T1OybTB5CT1RXrhCrK.jpg" src="https://i-pre.meixincdn.com/v1/img/T1OybTB5CT1RXrhCrK.jpg">
                                    </a>
                                </div>
								<a href="http://group.pre.gomeplus.com/topic/590ae2c8d15f8c7ac1e2f54e.html?intcmp=group-PGPH0060-8" target="_blank">
                                    <p class="overflow-one">大小老婆大小老婆大小老婆大小老婆</p>
                                </a>
							</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
