
<div class="tab-tags">
    <ul data-node="hotConTagsBox">
        <?php foreach( $datalists as $k => $v ):?>
        <li <?php if( empty($k) ):?>class="tab-li"<?php endif;?>><?php echo $v['name']?></li>
        <?php endforeach;?>
    </ul>
</div>
<div class="tab-contents" data-node="tabConBox" tpl-cms-node="grouphotimage_content">
    <?php
                        foreach( $datalists as $k => $v ):
    $md_tab_loop_num = $k+1;
    ?>
    <div class="tab-contents-item <?php if( $k != 0 ):?>none<?php endif;?>" data-node="topicTag" >
        <div class="tab-top clearfix" data-node="topicTab">
            <?php
                                foreach( $v['images'] as $sk => $sv ):
            if( $sk > 2 ) break;

            $md_loop_num = $sk+1;
            $source_code = "{$md_pageid}PGPH002{$md_tab_loop_num}-{$md_loop_num}";

            $product_uri = maidian_uri( productDetailUrlGen('',$sv['mix_id']), $source_code );
            $topic_uri = maidian_uri( topicDetailUrlGen( $sv['mix_id'] ), $source_code );
            ?>
            <div class="item-img-text">

                <div class="backgroundImg-lit" style="width:140px;height:140px">
                    <?php if( $sv['type'] == 0 ):?>
                    <a href="<?php echo $product_uri;?>" target="_blank" title="<?php echo $sv['name']?>">
                        <?php else:?>
                        <a href="<?php echo $topic_uri;?>" target="_blank" title="<?php echo $sv['name']?>">
                            <?php endif;?>
                            <img src="<?php echo $sv['icon']?>">
                        </a>
                </div>
                <?php if( $sv['type'] == 0 ):?>
                <a href="<?php echo $product_uri;?>" target="_blank" title="<?php echo $sv['name']?>">
                    <?php else:?>
                    <a href="<?php echo $topic_uri;?>" target="_blank" title="<?php echo $sv['name']?>">
                        <?php endif;?>
                        <span class="hot-content-text overflow-one"><?php echo string_parse_face( $sv['name'], 16 );?></span>
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

<div class="tab-bottom" tpl-cms-node="grouphottext">
    <ul>
        <li class="overflow-one">
            <a href="https://group.gomeplus.com/topic/592f673e1ed431750148a7cf.html?intcmp=group-PGPH0020-1" target="_blank" title="『儿童节干货』如何设计一个完美的儿童房">
                <span class="overflow-one">『儿童节干货』如何设计一个完美的儿童房</span>
                <em class="hot"></em>
            </a>
        </li>
        <li class="overflow-one">
            <a href="https://group.gomeplus.com/topic/592ee86e800e22168b94af0a.html?intcmp=group-PGPH0020-2" target="_blank" title="郑爽、杨幂、刘诗诗。。大半个娱乐圈都在穿荷叶边！">
                <span class="overflow-one">郑爽、杨幂、刘诗诗。。大半个娱乐圈都在穿荷叶边！</span>
                <em class="hot"></em>
            </a>
        </li>
        <li class="overflow-one">
            <a href="https://group.gomeplus.com/topic/592e286380b7f80facd176fa.html?intcmp=group-PGPH0020-3" target="_blank" title="Get 这些生活小妙招，你就厉害了！">
                <span class="overflow-one">Get 这些生活小妙招，你就厉害了！</span>
            </a>
        </li>
        <li class="overflow-one">
            <a href="https://group.gomeplus.com/topic/592780ecc6f2230771cd8c0a.html?intcmp=group-PGPH0020-4" target="_blank" title="“一半性感&amp;一半俏皮”才是夏天最美的打开方式！">
                <span class="overflow-one">“一半性感&amp;一半俏皮”才是夏天最美的打开方式！</span>
            </a>
        </li>
    </ul>
</div>
