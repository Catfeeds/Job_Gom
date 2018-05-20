
    <ul data-node="bannerImg">
        <?php foreach( $datalists as $bk => $v ):?>
        <li>
            <?php
                    switch( $v['type'] ) {
                        case 0:
                            $banner_url = productDetailUrlGen('',$v['mix_id']);
                            break;
                        case 2:
                            $banner_url = $v['url'];
                            break;
                        case 7:
                            $banner_url = topicDetailUrlGen( $v['mix_id'] );
                            break;
                        case 8:
                            $banner_url = groupDetailUrlGen( $v['mix_id'] );
                            break;
                        default:
                            $banner_url = 'default';
                    }

                    $pos = $bk + 1;
                    ?>
            <a href="<?php echo maidian_uri( $banner_url, $md_pageid.'PGPH0011-'.$pos );?>" target="_blank">
                <div class="backgroundImg" style="width:700px;height:400px">
                    <img src="<?php echo $v['icon']?>">
                </div>
                <span><?php echo $v['name']?></span></a></li>
        <?php endforeach;?>
    </ul>
