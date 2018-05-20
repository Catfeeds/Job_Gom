<?php
	$csspath = "meihao_type.css";
?>
<include file="Account:header"/>
<div class="beauty-band">
    <h2 class="beauty-b-title">请选择开通的账号类型</h2>
    <div class="beauty-aboard clearfix">
        <a class="beauty-personal cube" href="/account/createPrivate">
            <div>
                <div class="beauty-p-avator"></div>
                <div class="beauty-c-name">个人号</div>
                <div class="beauty-c-detail">为媒体和个人提供一种新的信息传播方式，主要功能是在国美侧给用户传达资讯；（功能类似报纸杂志，提供新闻信息或娱乐趣事）；</br>适用于个人或组织（自媒体，达人等）</div>
                <div class="beauty-c-btn">
                    <div class="beauty-c-btn-a">选择并继续</div>
                </div>
            </div>
        </a>
        <a class="beauty-company cube" href="/account/createCompany">
            <div>
                <div class="beauty-c-avator"> </div>
                <div class="beauty-c-name">企业号</div>
                <div class="beauty-c-detail">为企业或组织打造移动资讯平台，帮助企业建立与员工、用户间的连接；</br>适用于企业、政府、事业单位或其他组织</div>
                <div class="beauty-c-btn">
                    <div class="beauty-c-btn-a">选择并继续</div>
                </div>
            </div>
        </a>
    </div>
    <div class="beauty-footer"><i class="beauty-f-font">若无法选择类型请查阅<a class="beauty-f-link" target="_blank" href="/guide/index">帐号类型区别</a></i></div>
</div>
<include file="Home@Public:mh_footer"/>