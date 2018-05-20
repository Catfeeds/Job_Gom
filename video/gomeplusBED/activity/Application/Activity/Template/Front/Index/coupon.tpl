
<?php
	$jspath = "/20171212/js/getcoupon.js";
?>

<include file="Front/Public/header" />
<div class="outer">
    <div id="page-coupon" class="exchange">
        <div class="bg">
            <ul>
                <li class="title">
                    <div class="name"><{$userInfo['nick_name']}></div>
                    <div class="exchange-num">当前暖心值：<span class="num"><{$wh_value|default="0"}></span></div>
                </li>
                <foreach name="list" item="val" key="key">
                    <li class="clearfix">
                        <div class="ticket fl">
                            <p>暖心值满<{$key}>可领取</p>
                            <div class="ticket-money">
                                <span><{$val['money']}>元</span>优惠券
                            </div>
                        </div>
                        <div class="btn fr">
                            <?php if($val['isReceive']){ ?>
                                <a class="already" href="javascript:;"></a>
                            <?php }else{ ?>
                                <a data-node="coupon" data-couponid="<{$val['couponId']}>"  data-money="<{$val['money']}>"
                                   data-couponparam="<{$val['couponParam']}>" href="javascript:;"></a>
                            <?php } ?>
                        </div>
                    </li>
                </foreach>

            </ul>
            <div class="hint">优惠券每日0点定量发放。<br>点击右上角分享增加暖心值！</div>
            <a href="<{$more_link}>">
                <div class="more-btn"></div>
            </a>
        </div>
    </div>

    <div id="page-coupon-success" class="successful hide">
        <div class="bg">
            <div class="back"><a id="goback" href="javascript:;"></a></div>
            <div class="title">
                <div class="successful-title">您已成功兑换礼券</div>
                <div class="exchange-num">当前暖心值：<span class="num"><{$wh_value|default="0"}></span></div>
            </div>
            <div class="successful-coupon">
                <?php $i=1;?>
                <foreach name="list" item="val" key="key">
                    <div class="coupon<?php echo $i;?>" data-conponid="<{$val['couponId']}>"></div>
                    <?php $i++;?>
                </foreach>
            </div>
        </div>
        <div class="common-btn clearfix">
            <div class="btn fl"><a class="continue" href="<{$coupon_url}>"></a></div>
            <div class="btn fr"><a class="vsenue" href="<{$main_link}>"></a></div>
        </div>
    </div>

    <div class="hint hide" id="vericode">
        <div class="hint-bg"></div>
        <div class="hint-cont">
            <div class="import clearfix">
                <div class="fl import-text">
                    <input id="curitytext" type="text">
                </div>
                <div class="fr import-img">
                    <img id="curityimg" src="" height="45" width="154" alt="">
                </div>
            </div>
            <div class="hint-btn clearfix">
                <div class="btn fl">
                    <a class="hint-off" data-node="cancel" href="javascript:;"></a>
                </div>
                <div class="btn fr">
                    <a class="hint-ok" data-node="confirm" href="javascript:;"></a>
                </div>
            </div>
        </div>
    </div>


<include file="Front/Public/footer" />