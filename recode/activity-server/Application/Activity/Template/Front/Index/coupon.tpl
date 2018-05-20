
<?php
	$jspath = "/20171212/js/getcoupon.js";
?>

<include file="Front/Public/header" />
<div class="outer">
    <div id="page-coupon" class="exchange">
        <div class="bg">
            <div class="back" node-data="back" ><a href="javascript:;"></a></div>
            <ul>
                <li class="title">
                    <div class="name"><{$userInfo['nick_name']}></div>
                    <div class="exchange-num clearfix">
                        <p class="fl">当前暖心值：</p>
                        <p class="num fl"><{$userInfo['wh_value']|default="0"}></p>
                    </div>
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
            <div class="hint">每种优惠券只可限领一次哦~<br>数量有限，先到先得</div>
            <a href="<{$more_link}>">
                <div class="more-btn"></div>
            </a>
        </div>
    </div>

    <div id="page-coupon-success" class="successful hide">
        <div class="bg">
            <div class="back"><a href="javascript:;"></a></div>
            <div class="title">
                <div class="successful-title">您已成功兑换礼券</div>
                <div class="successful-num clearfix">
                    <p class="fl">当前暖心值：</p>
                    <p class="num fl">110</p>
                </div>
            </div>
            <div class="successful-coupon">
                <foreach name="list" item="val">
                    <div class="coupon<{$val['money']}>" data-conponid="<{$val['couponId']}>"></div>
                </foreach>
            </div>
        </div>
        <div class="common-btn clearfix">
            <div class="btn fl"><a class="continue" href="javascript:;"></a></div>
            <div class="btn fr"><a class="vsenue" href="javascript:;"></a></div>
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