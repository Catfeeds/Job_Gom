<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
<meta http-equiv="Cache-Control" content="no-transform " />
<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/module/collectTopic.css?version=<?php echo C('CSS_VERSION'); ?>">
</head>
<body>
<script>
    var $GLOBAL_CONFIG = {};
    $GLOBAL_CONFIG['group_domain']= '<{$group_domain}>';//社交
    $GLOBAL_CONFIG['prefix'] = '<{$cookie_prefix}>';
    $GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
    window.imgError = function(img, type) {
        var imgs = {
            m: 'img-error.png',
            l: 'img-error-big.png',
            h: 'head-default.png',
            g: 'circle-default2.png'
        };
        var src = imgs[type];
        src = src ? src : imgs.m;
        img.onerror = '';
        img.src = $GLOBAL_CONFIG.pcimgpath + '/images/public/' + src;
    };
</script>
<!--[if lte IE 8]>
    <script src="<{$pcjspath}>/js/conf/es5-shim.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <script src="<{$pcjspath}>/js/conf/es5-sham.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <script src="<{$pcjspath}>/js/conf/json3.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <script src="<{$pcjspath}>/js/conf/es6-shim.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <script src="<{$pcjspath}>/js/conf/es6-sham.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<![endif]-->
<div id="topicList">
    <div class="circle-index-list clearfix">
        <div class="topic-del hide clearfix" data-node="batch-del">
            <div class="right-edit hide" data-node="showBatch">
                <a class="btn-batch" href="javascript:void(0);" data-action="batch">批量管理</a>
            </div>
            <div class="right-edit hide" data-node="hideBatch">
                <a class="btn-check" href="javascript:void(0);" data-action="selectAll">
                    <span class="checkbox"></span>全选
                </a>
                <a class="btn-del" href="javascript:void(0);" data-action="delAll">删除</a>
                <a class="btn-cancel" href="javascript:void(0);" data-action="cancelBatch">取消</a>
            </div>
        </div>
        <div class="topic-list"  data-node="collectList">
            <div data-node="tiles" class="clearfix" ></div>
        </div>
    </div>
    <div class="more-loading hide clearfix" data-action="loadMore">
        <a href="##"><img src="<{$pcimgpath}>/images/public/loading.gif"><span>正在加载更多话题…</span></a>
    </div>
</div>

<script src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/collectTopic.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script>
    var timerForStatus = null;
    var statusTime = 20;
    var topicList = document.getElementById('topicList');
    var initialHeight = 0;
    var getHeight = function(){           
       var newHeight = topicList.offsetHeight + 40;
       if(newHeight -initialHeight != 0){ 
            window.parent.postMessage(JSON.stringify({height:newHeight}),'*');
            initialHeight = newHeight;
       }
       setTimeout(getHeight, statusTime);  
    }
    getHeight();
    
</script>
</body>
</html>
