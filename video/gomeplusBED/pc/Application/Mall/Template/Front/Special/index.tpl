<?php
    $csspath = 'themetemplate.css';
    $jspath = '/js/conf/special.js';
?>
<include file="Home@Front/Public/header" />

<script>
    var userId = '<{$userId}>';
    var active_no = '<{$active_no}>';
    window._page_id = '<{$page_id}>';
    window._page_name_ = '<{$title}>';
    </script>
    <script src="<{$js_domain}>/m/public/gomeplusJS/dist/bp/buriedPoint.min.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>

<!-- 右侧导航-->
<?php if( !empty( $right_nav['peas'] ) ):?>

<div class="side-nav" data-node="sideNav" style="background:<{$right_nav.backgroundColor}>" data-active-id="<{$active_no}>">
    <?php
        $side_bg = ''; $side_move = '';
        foreach( $right_nav['peas'] as $rk => $rv ):
        $side_bg = $rv['topBackgroudColor'];
        $side_move = $rv['moveOnColor'];
    ?>

    <a href="javascript:void(0);" class="nav-normal" data-modelindex="<{$rv.modelIndex}>"><span><{$rv.topText}></span></a>
    <?php endforeach;?>
    <a href="javascript:void(0);" class="nav-normal" data-action="top"><span>TOP</span></a>

    <style>
        .side-nav a{background:<{$side_bg}>}
        .side-nav a:hover{background:<{$side_move}>}
    </style>

</div>

<?php endif;?>

<!-- 头图banner-->
<div style="background: url(<{$banner.bannerPic}>) #87ceeb no-repeat center center;height: 400px;" class="top-banner"></div>

<?php foreach( $lists as $k_sort => $rs ):?>
    <?php if( $rs['name'] == 'coupon' && ( !empty( $rs['banner']['peas'] ) || !empty( $rs['subject']['peas'] )  ) ):?>
    <!------------------------------------------------------------ 优惠卷模块 -->
        <div style="background: <{$rs['subject']['backgroundColor']}>" class="coupon-wrapper" data-sort="<{$k_sort}>">
            <div class="center-wrap">
                <?php if( isset( $rs['banner']['peas'][0]['bannerPic'] ) && !empty( $rs['banner']['peas'][0]['bannerPic'] ) ):?>
                <!-- 优惠券banner-->
                <div class="coupon-banner">
                    <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ):?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                        <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                    </a>
                    <?php else:?>
                        <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                    <?php endif;?>
                </div>
                <?php endif;?>

                <?php foreach( $rs['subject']['peas'] as $k => $v ):?>
                    <?php
                        switch( count( $rs['subject']['peas'] ) ) {
                            case 1:
                                $num = [ 1=>'one' ];
                                break;
                            case 2:
                                $num = [ 1=>'two mgt', 2=>'three mgt10' ];
                                break;
                            default:
                                $num = [ 1=>'one', 2=>'two mgt10', 3=>'three mgt10' ];
                        }
                    ?>
                    <!-- 优惠券1-->
                    <div style="cursor: pointer;" data-action="ticket" data-id="<{$v['couponBatchSn']}>" class="coupon-<{$num[ $v['sn'] ]}> "><img src="<{$v['couponPic']}>" alt="<{$v['couponBatchName']}>"></div>
                <?php endforeach;?>

            </div>
        </div>
    <?php endif;?>

    <?php
        if( strstr( $rs['name'], 'item-1Row' ) && !empty( $rs['subject']['peas'] ) ):

        //根据名称显示几行几列的 css class前缀
        $line_type = (  strstr( $rs['name'], 'item-1Row4Column' )  ) ? 'four' : 'five' ;
    ?>

    <!------------------------------------------------------------ 1行(4|5)列模块 -->
        <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
            <div class="center-wrap pdb0">
            <!-- 1行(4|5)列-banner1-->
                <?php if( isset( $rs['banner']['peas'][0]['bannerPic'] ) && !empty( $rs['banner']['peas'][0]['bannerPic'] ) ):?>
                <div>
                    <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ):?>
                        <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                            <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                        </a>
                    <?php else:?>
                            <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                    <?php endif;?>
                </div>
                <?php endif;?>

            <!-- 1行(4|5)列- tab nav-->
            <?php if( isset( $rs['nav'] ) && !empty( $rs['nav'] ) )://tab导航开始?>

                <!--loop tab start-->
                <div class="item-nav" data-node="nav">



                    <?php $i=0;  foreach( $rs['nav'] as $nav_name => $nv ):?>
                        <style>
                            .item-nav .hover<{$nv['nav_id']}>:hover{background:<{$nv['move_oncolor']}>}
                            .item-nav .hover<{$nv['nav_id']}>{background:<{$nv['bg']}>}
                            .item-nav a.active<{$nv['nav_id']}>{background:<{$nv['move_oncolor']}>}
                        </style>

                        <a href="javascript:void(0);" data-rand="<{$nv['nav_id']}>" data-name="<{$nav_name}>" style="color:<{$nv['font_color']}>" <?php if( $i == 0 ):?>class="hover<{$nv['nav_id']}> active<{$nv['nav_id']}>" <?php else:?> class="hover<{$nv['nav_id']}>" <?php endif;?>><{$nav_name}></a>

                    <?php $i++;  endforeach;?>
                </div>
                <!--loop tab end-->

                <!--loop tab数据 start-->
                <?php $i=0;  foreach( $rs['nav'] as $nav_name => $nv ):?>
                    <?php if( isset( $rs['nav'][$nav_name]['data'] ) && !empty( $rs['nav'][$nav_name]['data'] ) ):?>
                        <!--HTML loop start-->

                        <!--这里动态切换 一行4列  和 一行5列-->
                        <div class="item-list <{$line_type}>-list mgt10" <?php if( $i != 0 ):?>style="display:none;"<?php endif;?> data-name="<{$nav_name}>">
                            <ul>

                                <?php foreach( $rs['nav'][$nav_name]['data'] as $sk => $sd )://loop item start?>

                                <li>
                                    <?php if( isset( $sd['id'] ) && !empty( $sd['id'] ) ){ ?>
                                        <a bp-data='{"event_id":"<{$nv['main_title']}>","shop_id":<{$sd['shopId']}>,"produce_id":<{$sd['id']}>}' title="<{$sd['shortName']}>" target="_blank" href="<{$sd['id']|productDetailUrlGen=$sd['shopId'],###,$sourceCode}>" class="list-img">
                                    <?php }else{ ?>
                                        <a bp-data='{"event_id":"<{$nv['main_title']}>","shop_id":<{$sd['shopId']}>,"produce_id":<{$sd['id']}>}' title="<{$sd['shortName']}>"  href="javascript:void(0);" class="list-img">
                                    <?php } ?>
                                            <img alt="<{$sd['shortName']}>" src="<{$sd['itemPromotionImg']}>">
                                        </a>
                                    <div class="list-txt">
                                        <?php if( isset( $sd['id'] ) && !empty( $sd['id'] ) ){ ?>
                                            <a bp-data='{"event_id":"<{$nv['main_title']}>","shop_id":<{$sd['shopId']}>,"produce_id":<{$sd['id']}>}' title="<{$sd['shortName']}>" target="_blank" href="<{$sd['id']|productDetailUrlGen=$sd['shopId'],###,$sourceCode}>">
                                        <?php }else{ ?>
                                            <a bp-data='{"event_id":"<{$nv['main_title']}>","shop_id":<{$sd['shopId']}>,"produce_id":<{$sd['id']}>}' title="<{$sd['shortName']}>" href="javascript:void(0);">
                                        <?php } ?>
                                            <?php echo CHsubstr( $sd['shortName'], 0, 107 );?>
                                        </a>
                                    </div>
                                    <div class="list-bottom">

                                        <!-- 返利 和 国美币 start-->
                                        <?php
                                            $fanli = ( isset( $sd['promotionMarks']['itemProspectiveRebateAmount'] ) ) ? $sd['promotionMarks']['itemProspectiveRebateAmount'] : '' ;

                                            if( !empty( $fanli ) ):
                                        ?>
                                        <p class="tag">
                                            <em class="icon-fan"></em>
                                            <span><{$fanli|convert_price=###}>国美币</span>
                                        </p>
                                        <?php endif;?>
                                        <!-- 返利 和 国美币 end-->
                                        <p class="price">
                                            <?php if( $sd['isDiscount'] ): //优惠商品?>
                                                <span class="red">
                                                    <em class="icon-rmb">￥</em>
                                                    <span><{$sd['salePrice']|convert_price=###}></span>
                                                </span>
                                                <span class="del">￥<{$sd['price']|convert_price=###}></span>
                                            <?php else : //非优惠商品?>

                                                <span class="red">
                                                    <em class="icon-rmb">￥</em>
                                                    <span><{$sd['salePrice']|convert_price=###}></span>
                                                </span>
                                            <?php endif;?>
                                        </p>
                                        <?php if( isset( $sd['id'] ) && !empty( $sd['id'] ) ){ ?>
                                            <a bp-data='{"event_id":"<{$nv['main_title']}>","shop_id":<{$sd['shopId']}>,"produce_id":<{$sd['id']}>}' target="_blank" href="<{$sd['id']|productDetailUrlGen=$sd['shopId'],###,$sourceCode}>" class="buy-btn">立即抢购</a>
                                        <?php }else{ ?>
                                            <a bp-data='{"event_id":"<{$nv['main_title']}>","shop_id":<{$sd['shopId']}>,"produce_id":<{$sd['id']}>}' href="javascript:void(0);" class="buy-btn">立即抢购</a>
                                        <?php } ?>
                                    </div>
                                </li>

                            <?php endforeach;//loop item end结束?>
                            </ul>
                        </div>

                        <!--HTML loop end-->
                    <?php endif;?>
                <?php $i++;  endforeach;?>
                <!--loop tab数据 end-->



            <?php endif;//tab导航结束?>

            <!--没有tab导航 显示正常数据    start-->

            <?php if(empty( $rs['nav'] ) && isset( $rs['subject']['peas'] ) && !empty( $rs['subject']['peas'] )  ):?>
            <div class="item-list <{$line_type}>-list mgt10">
                <ul>
                <?php foreach( $rs['subject']['peas'] as $sk => $sv ):?>
                    <li>
                        <?php if( isset( $sv['id'] ) && !empty( $sv['id'] ) ){ ?>
                            <a bp-data='{"event_id":"<{$rs['subject']['mainTitle']}>","shop_id":<{$sv['shopId']}>,"produce_id":<{$sv['id']}>}' title="<{$sv['shortName']}>" target="_blank" href="<{$sv['id']|productDetailUrlGen=$sv['shopId'],###,$sourceCode}>" class="list-img"><img alt="<{$sv['shortName']}>" src="<{$sv['itemPromotionImg']}>"></a>
                        <?php }else{ ?>
                            <a bp-data='{"event_id":"<{$rs['subject']['mainTitle']}>","shop_id":<{$sv['shopId']}>,"produce_id":<{$sv['id']}>}' title="<{$sv['shortName']}>"  href="javascript:void(0);" class="list-img"><img alt="<{$sv['shortName']}>" src="<{$sv['itemPromotionImg']}>"></a>
                        <?php } ?>
                        <div class="list-txt">
                            <?php if( isset( $sv['id'] ) && !empty( $sv['id'] ) ){ ?>
                                <a bp-data='{"event_id":"<{$rs['subject']['mainTitle']}>","shop_id":<{$sv['shopId']}>,"produce_id":<{$sv['id']}>}' title="<{$sv['shortName']}>" target="_blank" href="<{$sv['id']|productDetailUrlGen=$sv['shopId'],###,$sourceCode}>">
                            <?php }else{ ?>
                                <a bp-data='{"event_id":"<{$rs['subject']['mainTitle']}>","shop_id":<{$sv['shopId']}>,"produce_id":<{$sv['id']}>}' title="<{$sv['shortName']}>"  href="javascript:void(0);">
                            <?php } ?>
                                    <?php echo CHsubstr( $sv['shortName'], 0, 107 );?>
                            </a>
                        </div>
                        <div class="list-bottom">
                            <?php
                                $fanli = ( isset( $sv['promotionMarks']['itemProspectiveRebateAmount'] ) ) ? $sv['promotionMarks']['itemProspectiveRebateAmount'] : '' ;

                               if( !empty( $fanli ) ):
                               ?>
                               <p class="tag">
                                    <em class="icon-fan"></em>
                                    <span><{$fanli|convert_price=###}>国美币</span>
                                </p>
                            <?php endif;?>
                            <p class="price">
                                <?php if( $sv['isDiscount'] ): //优惠商品?>
                                    <span class="red">
                                        <em class="icon-rmb">￥</em>
                                        <span><{$sv['salePrice']|convert_price=###}></span>
                                    </span>
                                    <span class="del">￥<{$sv['price']|convert_price=###}></span>
                                <?php else : //非优惠商品?>

                                    <span class="red">
                                        <em class="icon-rmb">￥</em>
                                        <span><{$sv['salePrice']|convert_price=###}></span>
                                    </span>
                                <?php endif;?>
                            </p>
                            <?php if( isset( $sv['id'] ) && !empty( $sv['id'] ) ){ ?>
                                <a bp-data='{"event_id":"<{$rs['subject']['mainTitle']}>","shop_id":<{$sv['shopId']}>,"produce_id":<{$sv['id']}>}' target="_blank" href="<{$sv['id']|productDetailUrlGen=$sv['shopId'],###,$sourceCode}>" class="buy-btn">立即抢购
                            <?php }else{ ?>
                                <a bp-data='{"event_id":"<{$rs['subject']['mainTitle']}>","shop_id":<{$sv['shopId']}>,"produce_id":<{$sv['id']}>}'  href="javascript:void(0);" class="buy-btn">立即抢购
                            <?php } ?>
                                </a>
                        </div>
                    </li>
                <?php endforeach;?>
                </ul>
            </div>
            <?php endif;?>

            <!--没有tab导航 显示正常数据    end-->
        </div>
        </div>
    <?php endif;?>

    <?php if( $rs['name'] == 'picture-1Row1Column' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-1行1图- 横向-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <!-- 1行1图-banner-->
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>
                    <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
            <?php foreach( $rs['subject']['peas'] as $pic_k => $pic_v ):?>
            <div>
                <?php if( isset( $pic_v['redirectUrl'] ) && !empty( $pic_v['redirectUrl'] ) ){ ?>
                    <a href="<{$pic_v.redirectUrl}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>
                    <img src="<{$pic_v.showPic}>">
                </a>
            </div>
            <?php endforeach;?>
        </div>
    </div>
    <?php endif;?>

    <?php if( $rs['name'] == 'picture-1Row2Column' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-1行2图- 左右排列-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <!-- 1行1图-banner-->
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);">
                <?php } ?>
                    <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
            <?php foreach( $rs['subject']['peas'] as $pic_k => $pic_v ):?>
            <div class="fl two-pic">
                <?php if( isset( $pic_v['redirectUrl'] ) && !empty( $pic_v['redirectUrl'] ) ){ ?>
                    <a href="<{$pic_v.redirectUrl}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>
                    <img src="<{$pic_v.showPic}>">
                </a>
            </div>
            <?php endforeach;?>
        </div>
    </div>
    <?php endif;?>

    <?php if( $rs['name'] == 'picture-1Row3Column-left' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-1行3图- 左1 右2-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <!-- 1行1图-banner-->
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>
                    <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
			<foreach name="info" item="vo" key = "key">
			     <div class="fl two-pic">
                     <?php if( isset( $vo['first']['redirectUrl'] ) && !empty( $vo['first']['redirectUrl'] ) ){ ?>
                        <a href="<{$vo.first.redirectUrl}>" target="_blank">
                     <?php }else{ ?>
                        <a href="javascript:void(0);" >
                     <?php } ?>
                            <img src="<{$vo.first.showPic}>">
                        </a>
                    </div>

					<div class="fl two-pic">
					<foreach name="vo.end" item="arr" key = "k">
                        <?php if( isset( $arr['redirectUrl'] ) && !empty( $arr['redirectUrl'] ) ){ ?>
							<a href="<{$arr.redirectUrl}>" target="_blank">
                        <?php }else{ ?>
                            <a href="javascript:void(0);" >
                        <?php } ?>
								<img src="<{$arr.showPic}>">
							</a>
					</foreach>
                    </div>
			</foreach>
        </div>
    </div>
    <?php endif;?>


    <?php if( $rs['name'] == 'picture-1Row3Column-center' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-1行3图- 一行3列-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <!-- 1行3图(3列)-banner-->
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>
                        <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
            <?php foreach( $rs['subject']['peas'] as $pic_k => $pic_v ):?>
            <div class="fl three-pic">
                <?php if( isset( $pic_v['redirectUrl'] ) && !empty( $pic_v['redirectUrl'] ) ){ ?>
                    <a href="<{$pic_v.redirectUrl}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>

                    <img src="<{$pic_v.showPic}>">
                </a>
            </div>
            <?php endforeach;?>
        </div>
    </div>
    <?php endif;?>

    <?php if( $rs['name'] == 'picture-1Row3Column-right' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-1行3图- 左2 右1-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <!-- 1行1图-banner-->
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);" >
                <?php } ?>
                    <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
			<foreach name="rightData" item="vo" key = "key">
					<div class="fl two-pic">
					<foreach name="vo.end" item="arr" key = "k">
                        <?php if( isset( $arr['redirectUrl'] ) && !empty( $arr['redirectUrl'] ) ){ ?>
							<a href="<{$arr.redirectUrl}>" target="_blank">
                        <?php }else{ ?>
                            <a href="javascript:void(0);" >
                        <?php } ?>
								<img src="<{$arr.showPic}>">
							</a>
					</foreach>
                    </div>
			     <div class="fl two-pic">
                     <?php if( isset( $vo['first']['redirectUrl'] ) && !empty( $vo['first']['redirectUrl'] ) ){ ?>
                        <a href="<{$vo.first.redirectUrl}>" target="_blank">
                     <?php }else{ ?>
                        <a href="javascript:void(0);" >
                     <?php } ?>
                            <img src="<{$vo.first.showPic}>">
                        </a>
                    </div>
			</foreach>
        </div>
    </div>
    <?php endif;?>

    <?php if( $rs['name'] == 'picture-1Row4Column' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-1行4图- 一行4列-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <!-- 1行3图(3列)-banner-->
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                   <a href="javascript:void(0);" >
                <?php } ?>
                    <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
            <?php foreach( $rs['subject']['peas'] as $pic_k => $pic_v ):?>
            <div class="fl four-pic">
                <?php if( isset( $pic_v['redirectUrl'] ) && !empty( $pic_v['redirectUrl'] ) ){ ?>
                    <a href="<{$pic_v.redirectUrl}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);">
                <?php } ?>
                    <img src="<{$pic_v.showPic}>">
                </a>
            </div>
            <?php endforeach;?>
        </div>
    </div>
    <?php endif;?>

    <?php if( $rs['name'] == 'picture-2Row4Column' && !empty( $rs['subject']['peas'] ) ):?>
    <!------------------------------------------------------------ pc-2行4图- 2行4列-->
    <div style="background: <{$rs['subject']['backgroundColor']}>" data-sort="<{$k_sort}>">
        <div class="center-wrap">
            <div>
                <?php if( isset( $rs['banner']['peas'][0]['redirectUrl'] ) && !empty( $rs['banner']['peas'][0]['redirectUrl'] ) ){ ?>
                    <a href="<{$rs['banner']['peas'][0]['redirectUrl']}>" target="_blank">
                <?php }else{ ?>
                    <a href="javascript:void(0);">
                <?php } ?>
                    <img src="<{$rs['banner']['peas'][0]['bannerPic']}>">
                </a>
            </div>
			<foreach name="arrdata" item="vo" key ="key">
				<div>
                    <?php if( isset( $vo['first']['redirectUrl'] ) && !empty( $vo['first']['redirectUrl'] ) ){ ?>
					    <a href="<{$vo.fist.redirectUrl}>" target="_blank">
                    <?php }else{ ?>
                        <a href="javascript:void(0);" >
                    <?php } ?>
						<img src="<{$vo.first.showPic}>">
					 </a>
				</div>	
				<foreach name="vo.end" item="info" key="k">
					<div class="fl three-pic">
                        <?php if( isset( $info['redirectUrl'] ) && !empty( $info['redirectUrl'] ) ){ ?>
				            <a href="<{$info.redirectUrl}>" target="_blank">
                        <?php }else{ ?>
                            <a href="javascript:void(0);" >
                        <?php } ?>
						<img src="<{$info.showPic}>">
					 </a>
					</div>	
				</foreach>
			</foreach>
		</div>
    </div>
    <?php endif;?>


<?php endforeach;?>


<include file="Home@Front/Public/footer" />
