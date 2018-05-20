<?php
    $csspath = '30th.css';
    $jspath = '/js/conf/playtogether.js';
?>
<include file="Home@Public:header"/>
    <div class="top">
      <div class="w990">
        <div class="down-app"><img src="<{$pcimgpath}>/images/other/qrcode.jpg"></div>
        <div class="top-menu"><!--<span class="left"></span><span class="right"></span>-->
          <ul class="clearfix" data-node="title">
              <?php if( date('d', time()) != 13 ):?>
            <li>
                <a href="javascript:;" class="data<?php echo date('d', time());?> active">
                    <?php echo date('Y-m-d', time());?>
                </a>
            </li>
              <?php endif;?>
            <li>
                <a href="javascript:;" class="data<?php echo date("d", strtotime( "+1 day" ));?> <?php if( date('d', time()) == 13 ): ?>active<?php endif;?>">

                    <?php echo date("Y-m-d", strtotime( "+1 day" ));?>
                </a>
            </li>
              <li>
                <a href="javascript:;" class="data<?php echo date("d", strtotime( "+2 day" ));?> ">
                    <?php echo date("Y-m-d", strtotime( "+2 day" ));?>
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="goods">
      <div class="w990">
        <ul class="clearfix" data-node="content">
            <?php
                $box_img = date('d', time());
                if( $box_img == 13 ) $box_img = 14;
            ?>
          <li><img src="<{$pcimgpath}>/images/other/<?php echo $box_img;?>-01.png"></li>
          <li><img src="<{$pcimgpath}>/images/other/<?php echo $box_img;?>-02.png"></li>
          <li><img src="<{$pcimgpath}>/images/other/<?php echo $box_img;?>-03.png"></li>
        </ul>
      </div>
    </div>
    <div class="text">
      <div class="w990"></div>
    </div>
    <include file="Home@Public:footer"/>