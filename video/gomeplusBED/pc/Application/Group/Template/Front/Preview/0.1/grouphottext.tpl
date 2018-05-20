
    <ul>
        <?php
                            foreach( $datalists as $k => $v ):
        if( $k > 3 ) break;

        $md_loop_num = $k+1;
        $source_code = "{$md_pageid}PGPH0020-{$md_loop_num}";
        $md_uri = maidian_uri( topicDetailUrlGen( $v['topic_id'] ), $source_code );

        ?>
        <li class="overflow-one">
            <a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['name']?>">
                <span class="overflow-one"><?php echo string_parse_face( $v['name'], 16 );?></span>
                <?php
                                    switch( $v['type'] ) {
                                        case '2':
                                            $hot_text_icon = 'active';
                                            break;
                                        case '3':
                                            $hot_text_icon = 'hot';
                                            break;
                                        case '5':
                                            $hot_text_icon = 'video';
                                            break;
                                        default:
                                            $hot_text_icon = '';
                                    }
                                ?>
                <?php if( !empty( $hot_text_icon ) ):?>
                <em class="<?php echo $hot_text_icon;?>"></em>
                <?php endif;?>
            </a>
        </li>
        <?php endforeach;?>
    </ul>
