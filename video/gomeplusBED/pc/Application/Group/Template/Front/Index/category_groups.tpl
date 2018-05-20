<?php
    $csspath = 'circle-list.css';
?>
<!--<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/module/topicStyle.css?version=<?php echo C('CSS_VERSION'); ?>"-->
<include file="Home@Public:header"/>

<div class="container">
    <div class="page-tags">
        <div class="circle-classify">圈子分类</div>
        <div class="tags-container">
            <volist name="cat_lists" id='cat'>
                <a <present name="cat.active"> class="tagHover" </present> href="<{$cat['id']|groupCatUrlGen=###}>"><{$cat['name']}></a>
            </volist>
        </div>
    </div>
    <div class="page-tab">
        <div class="tab-container">
            <notempty name="groups">
            <ul class="tab-item">
                <volist name="groups.resultList" id='group_info'>
                <li>
                    <div class="mg-negative">
                        <div class="img scale-small">
                            <a target="_blank" href="<{$group_info['group']['id']|groupDetailUrlGen=###}>">
                                <img onerror="imgError(this, 'm')" src="<{$group_info['group']['icon']}>">
                            </a>
                            <span class="tag overflow-one"><{$group_info['group']['category']['name']}></span>
                        </div>
                        <div class="text"><a class="list-title overflow-one" target="_blank" href="<{$group_info['group']['id']|groupDetailUrlGen}>"><{$group_info['group']['name']}></a>
                            <div class="text-icon"><span class="fl"><em>成员：</em><{$group_info['group']['memberQuantity']|formatNum=###}></span><span class="fl"><em>话题：</em><{$group_info['group']['topicQuantity']|formatNum=###}></span></div>

                        </div>
                    </div>
                </li>
                </volist>
            </ul>
            </notempty>
        </div>

            <div class="page" modelid="<?php echo $modelPub['ggfy']?>"><{$page}></div>
    </div>
</div>

<include file="Home@Public:footer" />
