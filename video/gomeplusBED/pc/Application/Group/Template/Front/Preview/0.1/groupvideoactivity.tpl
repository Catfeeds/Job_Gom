
<div class="video-cir-act-box">
    <ul class="clearfix">
        <?php
                                foreach( $datalists as $k => $v ):
        if( $k > 7 ) break;

        $md_loop_num = $k+1;
        $source_code = "{$md_pageid}PGPH0081-{$md_loop_num}";
        $md_uri = maidian_uri( topicDetailUrlGen( $v['topic_id'] ), $source_code );
        ?>
        <li>

            <div class="backgroundImg-lit" style="width:160px;height:100px;">
                <a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['name']?>">
                    <img src="<?php echo $v['icon']?>"></a>
            </div>
            <a href="<?php echo $md_uri;?>" target="_blank" title="<?php echo $v['name']?>"><p class="overflow-one"><?php echo string_parse_face( $v['name'], 16 );?></p></a>
            <span class="icon-video"></span>
        </li>
        <?php endforeach;?>
    </ul>
</div>
