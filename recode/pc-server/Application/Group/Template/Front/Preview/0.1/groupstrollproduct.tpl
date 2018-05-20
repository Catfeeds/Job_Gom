<div class="money-circle" floor-node="stroll" data-node="moneyFloor" tpl-cms-node="groupstrollproduct">
    <h2 class="title-h2"><?php echo ( isset( $slot['show_name'] ) ) ? $slot['show_name'] : '' ;?></h2>
    <div class="tra-circle-box circle-color-lan">
        <div class="tra-cir-tags clearfix">
            <div class="tags-tab" data-node="moneyTagsBox">
                <div class="tags-tab-container" data-node="moneyTags">
                    <?php
                        $i=0;
                        foreach( $datalists as $k => $v):
                    if( !empty( $v['url'] ) ) continue;
                    ?>
                    <a sequence-node="<?php echo $v['sequence'];?>" href="javascript:void(0)" <?php if( empty( $i ) ):?>class="hoverCls"<?php endif;?>><?php echo $v['name'];?></a>
                    <?php
                        $i++;
                        endforeach;
                        ?>
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
            <div class="money-tags-box" data-node="moneyTabsBox">
                <div class="money-tags-box-item" data-node="moneyTab">
                    <?php foreach( $datalists as $dk => $dv ):?>
                    <div class="banner item-big-one <?php if($dk > 0) echo 'none';?>" data-node="goodsBannerBox" sequence-node="<?php echo $dv['sequence'];?>">
                        <ul class="slider-container clearfix" data-node="goodsBannerImg<?php echo $dv['sequence'];?>">

                            <?php
                                foreach( $dv['banners'] as $k => $v ):
                            $md_banners_loop = $k+1;
                            $md_banners_code = $md_code_stroll.'11-'.$md_banners_loop;
                            $md_banners_uri = maidian_uri( productDetailUrlGen('',$v['product_id']), $md_banners_code );
                            ?>
                            <li class="slider-item-container" data-node="goodsData" data-id="<?php echo $v['product_id'];?>"><!-- data-id="商品id" -->

                                <div class="backgroundImg" style="width:600px;height:390px">
                                    <a href="<?php echo $md_banners_uri;?>" target="_blank" title="<?php echo $v['name'];?>">
                                        <img src="<?php echo $v['image'];?>">
                                    </a>
                                </div>

                                <div class="item-big-one-bottom clearfix">
                                    <p class="item-big-one-price">
                                        <a href="<?php echo $md_banners_uri;?>" target="_blank">
                                            <span class="item-b-o-title overflow-one"><?php echo $v['name'];?></span>
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
                    <div class="item-small-four <?php if($dk > 0) echo 'none';?>" sequence-node="<?php echo $dv['sequence'];?>">
                        <ul class="clearfix" data-node="ggRight">
                            <?php
                                $i=0;
                                foreach( $dv['products'] as $k => $v ):
                            if( $i > 3) break;

                            $md_product_loop = $k+1;
                            $md_product_code = $md_code_stroll.'12-'.$md_product_loop;
                            $md_product_uri = maidian_uri( productDetailUrlGen('',$v['product_id']), $md_product_code );
                            ?>

                            <li data-node="goodsData" data-id="<?php echo $v['product_id'];?>"><!-- data-id="商品id" -->

                                <div class="backgroundImg-lit" style="width:160px;height:160px">
                                    <a href="<?php echo $md_product_uri;?>" target="_blank">
                                        <img src="<?php echo $v['image'];?>">
                                    </a>
                                </div>

                                <a class="item-s-f-a overflow-one" href="<?php echo $md_product_uri;?>" target="_blank" title="<?php echo $v['name'];?>">
                                    <?php echo $v['name'];?>
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
                    <?php endforeach;?>
                </div>
            </div>
        </div>
    </div>
</div>
