<?php
    $csspath = 'shop/searchresultnone.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Front/Public/header" />
<div class="wrap-box">
    <div class="search-result top30">
        <div class="result-text clearfix"><em class="icon">&#xe960;</em>
            <p>抱歉，没有找到<if  condition="($researchWord neq '' )">“<span><{$researchWord}></span>”</if>相关的结果<br>建议您尝试其他关键词</p>
        </div>
    </div>
</div>
<include file="Home@Front/Public/footer" />