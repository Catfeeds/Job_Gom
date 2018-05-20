<h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
<div class="tra-circle-box">
    <div class="tra-cir-tags clearfix">

        <div class="tags-box" data-node="videoTabsBox">
            <div class="tags-item-container" data-node="videoTab">
                <div class="tags-box-item">
                    <ul class="circle-item clearfix">
                        <?php
                                    foreach( $datalists as $k => $v ):
                        if( $k > 3 ) break;

                        $md_loop_num = $k+1;
                        $source_code = "{$md_pageid}PGPH0080-{$md_loop_num}";
                        $md_uri = maidian_uri( topicDetailUrlGen( $v['topic_id'] ), $source_code );
                        ?>
                        <li>
                            <div class="rec-circle-top">
                                <div class="backgroundImg" style="width:390px;height:255px">
                                    <a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['name']?>">
                                        <img src="<?php echo $v['icon']?>">
                                    </a>
                                </div>
                                <div class="r-c-t-block overflow-one">
                                    <a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['name']?>"> <?php echo $v['name']?></a>
                                </div>
                                <span class="zhibo-label">视频</span>
                            </div>
                        </li>
                        <?php endforeach;?>
                    </ul>
                </div>
            </div>
        </div>


        <div class="video-circle-right" tpl-cms-node="groupvideoactivity">
            <div class="video-cir-act-box">
                <ul class="clearfix">
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/592f932b80b7f80facd17973.html?intcmp=group-PGPH0081-1" target="_blank" title="【凿音】认领你的童年！十大红白机游戏BGM">
                                <img data-original="https://i8.meixincdn.com/v1/img/T1m5hvBvVT1RXrhCrK.jpg" src="https://i8.meixincdn.com/v1/img/T1m5hvBvVT1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/592f932b80b7f80facd17973.html?intcmp=group-PGPH0081-1" target="_blank" title="【凿音】认领你的童年！十大红白机游戏BGM"><p class="overflow-one">【凿音】认领你的童年！十大红白机游戏BGM</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/592e8d4e800e22168b94ae69.html?intcmp=group-PGPH0081-2" target="_blank" title="有颜有才真女神，看美丽小姐姐的闺房有多美！">
                                <img data-original="https://i4.meixincdn.com/v1/img/T1vELvBmh_1RXrhCrK.jpg" src="https://i4.meixincdn.com/v1/img/T1vELvBmh_1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/592e8d4e800e22168b94ae69.html?intcmp=group-PGPH0081-2" target="_blank" title="有颜有才真女神，看美丽小姐姐的闺房有多美！"><p class="overflow-one">有颜有才真女神，看美丽小姐姐的闺房有多美！</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/592e911d34e0ea54714b89e3.html?intcmp=group-PGPH0081-3" target="_blank" title="学做这款小点心配饰，让它来守护你的糕点吧！">
                                <img data-original="https://i0.meixincdn.com/v1/img/T1c5EvBgEv1RXrhCrK.jpg" src="https://i0.meixincdn.com/v1/img/T1c5EvBgEv1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/592e911d34e0ea54714b89e3.html?intcmp=group-PGPH0081-3" target="_blank" title="学做这款小点心配饰，让它来守护你的糕点吧！"><p class="overflow-one">学做这款小点心配饰，让它来守护你的糕点吧！</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/592fb23e1ed431750148a845.html?intcmp=group-PGPH0081-4" target="_blank" title="贵德国家地质公园旅行记，地貌多姿多彩秀丽壮美">
                                <img data-original="https://i7.meixincdn.com/v1/img/T12.hvBsbT1RXrhCrK.jpg" src="https://i7.meixincdn.com/v1/img/T12.hvBsbT1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/592fb23e1ed431750148a845.html?intcmp=group-PGPH0081-4" target="_blank" title="贵德国家地质公园旅行记，地貌多姿多彩秀丽壮美"><p class="overflow-one">贵德国家地质公园旅行记，地貌多姿多彩秀丽壮美</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/59251b52800e2253bdf2cf15.html?intcmp=group-PGPH0081-5" target="_blank" title="【小辣厨房】番茄龙利鱼，宝宝放心吃的鱼">
                                <img data-original="https://i7.meixincdn.com/v1/img/T12V_vByZg1RXrhCrK.jpg" src="https://i7.meixincdn.com/v1/img/T12V_vByZg1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/59251b52800e2253bdf2cf15.html?intcmp=group-PGPH0081-5" target="_blank" title="【小辣厨房】番茄龙利鱼，宝宝放心吃的鱼"><p class="overflow-one">【小辣厨房】番茄龙利鱼，宝宝放心吃的鱼</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/592a84351ed431750148a18b.html?intcmp=group-PGPH0081-6" target="_blank" title="边化妆边聊天∶自然妆容教程~放松自己学学化妆哦">
                                <img data-original="https://i3.meixincdn.com/v1/img/T1KC_vBsA_1RXrhCrK.jpg" src="https://i3.meixincdn.com/v1/img/T1KC_vBsA_1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/592a84351ed431750148a18b.html?intcmp=group-PGPH0081-6" target="_blank" title="边化妆边聊天∶自然妆容教程~放松自己学学化妆哦"><p class="overflow-one">边化妆边聊天∶自然妆容教程~放松自己学学化妆哦</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/5927d03680b7f80facd16cbb.html?intcmp=group-PGPH0081-7" target="_blank" title="手把手教你，不信你学不会？！">
                                <img data-original="https://i2.meixincdn.com/v1/img/T13oJvB4YT1RXrhCrK.jpg" src="https://i2.meixincdn.com/v1/img/T13oJvB4YT1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/5927d03680b7f80facd16cbb.html?intcmp=group-PGPH0081-7" target="_blank" title="手把手教你，不信你学不会？！"><p class="overflow-one">手把手教你，不信你学不会？！</p></a>
                        <span class="icon-video"></span>
                    </li>
                    <li>

                        <div class="backgroundImg-lit" style="width:160px;height:100px;">
                            <a href="https://group.gomeplus.com/topic/5927a36880b7f80facd16c9a.html?intcmp=group-PGPH0081-8" target="_blank" title="技能满分666~头一次看见这么彪悍的滑板女汉子">
                                <img data-original="https://i7.meixincdn.com/v1/img/T1DZAvBTdv1RXrhCrK.jpg" src="https://i7.meixincdn.com/v1/img/T1DZAvBTdv1RXrhCrK.jpg"></a>
                        </div>
                        <a href="https://group.gomeplus.com/topic/5927a36880b7f80facd16c9a.html?intcmp=group-PGPH0081-8" target="_blank" title="技能满分666~头一次看见这么彪悍的滑板女汉子"><p class="overflow-one">技能满分666~头一次看见这么彪悍的滑板女汉子</p></a>
                        <span class="icon-video"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>