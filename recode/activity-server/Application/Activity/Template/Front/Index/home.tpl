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
                <div class="present-woman"></div>
                <div class="present-man hide"></div>
            </div>
        </div>
        <div class="common-btn clearfix">
            <div class="btn fl"><a class="numerical" href="javascript:;"></a></div>
            <div class="btn fr"><a class="stroll" href="javascript:;"></a></div>
        </div>
        <div class="common-hint">通过右上角分享，可继续求温暖哦</div>
    </div>
<include file="Front/Public/footer" />