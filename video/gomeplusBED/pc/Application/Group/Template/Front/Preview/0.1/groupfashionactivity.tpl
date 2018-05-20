
<div class="tra-cir-activity">
    <div class="tra-cir-act-title">
        <h3>热门活动</h3><span class="line-red"></span>
    </div>
    <div class="tra-cir-act-box">
        <ul class="clearfix">
            <?php
                            foreach( $datalists as $k => $v ):
            if( $k > 7 ) break;
            $md_loop_num = $k+1;
            $md_code = $md_active_code.$md_loop_num;
            $md_uri = maidian_uri( topicDetailUrlGen( $v['topic_id'] ), $md_code );
            ?>
            <li>
                            <span class="hot-img-item">
								<div class="backgroundImg-lit" style="width:160px;height:105px;" >
                                    <a href="<?php echo $md_uri;?>" target="_blank">
                                        <img src="<?php echo $v['icon'];?>">
                                    </a>
                                </div>
								<a href="<?php echo $md_uri;?>" target="_blank">
                                    <p class="overflow-one"><?php echo string_parse_face( $v['name'], 16 );?></p>
                                </a>
							</span>
            </li>
            <?php endforeach;?>
        </ul>
    </div>
</div>
