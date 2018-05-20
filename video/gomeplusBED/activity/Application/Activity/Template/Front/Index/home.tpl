<include file="Front/Public/header" />
<div class="outer">
    <div class="present">
        <div class="bg">
            <div class="present-title"><span><{$userInfo['nick_name']}></span>内心的小火苗<br><{$warmInfo['warmDesc']}>：<span class="num"><{$warmInfo['warmValue']}></span></div>
            <div class="present-temp">
                <div class="temp"></div>
                <div class="current-box">
                    <div class="current" style="bottom:<{$warmInfo['warmHeight']}>%"></div>
                </div>
            </div>
            <div class="present-figure">
                <eq name="userInfo.sex" value="1">
                <div class="present-man"></div>
                <else/>
                <div class="present-woman"></div>
                </eq>
            </div>
        </div>
        <div class="common-btn clearfix">
            <div class="btn fl"><a class="numerical" href="<{$activity_domain}>warm/couponList"></a></div>
            <div class="btn fr"><a class="stroll" href="<{$mainUrl}>"></a></div>
        </div>
        <div class="common-hint">通过右上角分享，可继续求温暖哦</div>
    </div>
<include file="Front/Public/footer" />