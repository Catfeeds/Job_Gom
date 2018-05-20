<?php
	$jspath = "/20171212/js/sendwarm.js";
?>
<include file="Front/Public/header" />
<script>
    $GLOBAL_CONFIG.totalScore = <{$userInfo['wh_value']}>;
    $GLOBAL_CONFIG.userStr = "<{$userStr}>";
</script>
<div class="outer">
    <div class="friend hide" id="page-index">
        <div class="bg">
            <div class="friend-text"> <span class="name"><{$userInfo['nick_name']}> </span><br>既然你点进来，就说明你心里还是有我的那你看我那么冷，还不快来暖暖我~</div>
            <div class="friend-head">
                <div class="pic"><img src="<{$userInfo['icon']}>" alt=""></div>
                <eq name="userInfo.sex" value="1">
                <div class="friend-man"></div>
                <else/>
                <div class="friend-woman"></div>
                </eq>
            </div>
        </div>
        <div class="btn" data-node="send-warm"><a href="javascript:;"></a></div>
    </div>
    <div class="flame hide" id="page-send-warm">
        <div class="bg">
            <div class="time"><span data-node="time">12</span>s</div>
            <div class="flame-temp">
                <div class="temp"></div>
                <div class="current-box">
                    <div class="current" data-node="thermograph"></div>
                </div>
            </div>
            <div class="flame-figure">
                <div class="figure" data-node="figure">
                    <div class="pic"><img src="<{$userInfo['icon']}>" alt=""></div>
                    <eq name="userInfo.sex" value="1">
                    <div class="flame-man"></div>
                    <else/>
                    <div class="flame-woman"></div>
                    </eq>
                </div>
                <div class="figure-gif hide" data-node="gif">
                    <eq name="userInfo.sex" value="1">
                    <img src="<{$pcimgpath}>/20171212/images/flameMan.gif" alt="">
                    <else/>
                    <img src="<{$pcimgpath}>/20171212/images/flameWoman.gif" alt="">
                    </eq>
                </div>
            </div>
        </div>
        <div class="flame-text">
            <div class="text-pic"></div>
            <div class="text">规定时间内搓动的次数越多朋友得到的温暖值越高</div>
        </div>
        <div class="flame-popup" data-node="send-warm"></div>
    </div>
    <div class="result hide" id="page-send-success">
        <div class="bg">
            <div class="result-text">
                <p>你已成功为好友送出温暖值<span class="send" data-node="rise-score">45</span></p>
                <p>好友当前温暖值为<span class="now" data-node="total-score">110</span></p>
                <p>可领取价值XX的优惠券</p>
            </div>
            <div class="result-figure">
                <eq name="userInfo.sex" value="1">
                <div class="result-man"></div>
                <else/>
                <div class="result-woman"></div>
                </eq>
            </div>
        </div>
        <div class="common-btn clearfix">
            <div class="btn fl"><a class="also" href="javascript:;"></a></div>
            <div class="btn fr"><a class="stroll" href="javascript:;"></a></div>
        </div>
    </div>
    <div class="cruel hide" id="page-send-fail">
        <div class="bg">
            <div class="cruel-cont">
                <div class="cont-title"> <span><{$userInfo['nick_name']}></span>：好狠的心<br>一点温暖都不给我~<br>哭唧唧</div>
                <div class="cont-head">
                    <div class="pic"><img src="<{$userInfo['icon']}>" alt=""></div>
                    <eq name="userInfo.sex" value="1">
                    <div class="cruel-man"></div>
                    <else/>
                    <div class="cruel-woman"></div>
                    </eq>
                </div>
            </div>
        </div>
        <div class="common-btn clearfix">
            <div class="btn fl"><a class="also" href="javascript:;"></a></div>
            <div class="btn fr"><a class="stroll" href="javascript:;"></a></div>
        </div>
    </div>
<script>
    (function(){
        var score = localStorage.getItem("score");
        if(score > 0){
            document.querySelector("#page-index").classList.add("hide");
            document.querySelector("#page-send-success").classList.remove("hide");
            document.querySelector('#page-send-success [data-node="rise-score"]').innerHTML = score;
            document.querySelector('#page-send-success [data-node="total-score"]').innerHTML = $GLOBAL_CONFIG.totalScore;
        }else{
            document.querySelector("#page-index").classList.remove("hide");
        }
    })();
</script>
<include file="Front/Public/footer" />