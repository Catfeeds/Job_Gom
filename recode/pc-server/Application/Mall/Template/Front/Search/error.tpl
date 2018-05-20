<?php
    $csspath = 'searchresultnone.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Front/Public/header" />
<div class="wrap-box">
    <div class="search-result top30">
        <div class="result-text clearfix"><em class="iconn-25"></em>
            <?php if(isset($researchWord) && $researchWord != ''){ ?>
                <p>抱歉，没有找到“<span><{$researchWord}></span>”相关的结果<br>建议您尝试其他关键词</p>
            <?php }else{ ?>
                <p>抱歉，没有找到相关的结果<br>建议您尝试其他关键词</p>
            <?php }?>
        </div>
    </div>
</div>
<include file="Home@Front/Public/footer" />