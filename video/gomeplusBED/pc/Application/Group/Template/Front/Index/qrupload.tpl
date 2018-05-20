<!DOCTYPE html>
<script type="text/javascript" >
    var $GLOBAL_CONFIG = {};
    $GLOBAL_CONFIG['current_url']= '<?php echo $current_url; ?>';//当前url
    $GLOBAL_CONFIG['islogin']= '<?php echo ($userinfos['loginStatus'] == 3) ? 1 : 0;?>';//是否登录
    $GLOBAL_CONFIG['userId'] = '<{$userId}>';
    $GLOBAL_CONFIG['nickName'] = '<{$nickName}>';
    $GLOBAL_CONFIG['main_domain']= '<{$main_domain}>';//主域名
    $GLOBAL_CONFIG['passport_domain']= '<{$passport_domain}>';//登录注册域名
    $GLOBAL_CONFIG['order_domain']= '<{$order_domain}>';//订单域名
    $GLOBAL_CONFIG['group_domain']= '<{$group_domain}>';//社交
    $GLOBAL_CONFIG['i_domain']= '<{$i_domain}>';//用户中心
    $GLOBAL_CONFIG['mall_domain']= '<{$mall_domain}>';//商城
    $GLOBAL_CONFIG['js_domain'] = '<{$js_domain}>';
    $GLOBAL_CONFIG['pcjspath'] = '<{$pcjspath}>';
    $GLOBAL_CONFIG['pccsspath'] = '<{$pccsspath}>';
    $GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
    $GLOBAL_CONFIG['wap_url'] = '<{$wap_url}>';
    $GLOBAL_CONFIG['prefix'] = '<{$cookie_prefix}>';
    $GLOBAL_CONFIG['csrf_token'] = '';
    $GLOBAL_CONFIG['ss_service_gome'] = '<{$ss_gome}>';
    var userId = '<{$userId}>';
    $GLOBAL_CONFIG['dynSite']='<{$secure_gome}>';
    $GLOBAL_CONFIG['staSite']='<?php echo str_replace(APP_HTTP,"//",$main_domain_gome)?>';
    $GLOBAL_CONFIG['contextPath']='<{$context_path_gome}>';
    $GLOBAL_CONFIG['secureURL']='<{$secure_gome}>';
    $GLOBAL_CONFIG['cookieDomain']='<{$cookie_domain_gome}>';
    $GLOBAL_CONFIG['stageImageServer']= '//<{$stage_image_server}>';
    $GLOBAL_CONFIG['imgServer']='//<{$img_domain_gome}>/images';
    $GLOBAL_CONFIG['pictureserver']='//<{$img_domain_gome}>/image';
    $GLOBAL_CONFIG['stageCssServer']='//<{$css_domain_gome}>';
    $GLOBAL_CONFIG['cssserver']='//<{$css_domain_gome}>/css';
    $GLOBAL_CONFIG['stageJsServer']='//<{$js_domain_gome}>';
    $GLOBAL_CONFIG['jsserver']='//<{$js_domain_gome}>/js';
    $GLOBAL_CONFIG['js_net_server']='<{$js_net_domain_gome}>';
    $GLOBAL_CONFIG['protocol']='<?php echo str_replace("://","",APP_HTTP); ?>';
    $GLOBAL_CONFIG['versionData']='<?php echo C('JS_VERSION'); ?>';
    $GLOBAL_CONFIG['product_search_gome']='<{$product_search_gome}>';
    $GLOBAL_CONFIG['shop_search_gome']='<{$product_search_gome}>';
    $GLOBAL_CONFIG['product_item_gome']='<{$product_item_gome}>';
    $GLOBAL_CONFIG['ggckgd'] = '<{$modelPub['ggckgd']}>';  //埋点查看更多标示
    $GLOBAL_CONFIG['ggjzgd'] = '<{$modelPub['ggjzgd']}>';  //埋点加载更多标示
    $GLOBAL_CONFIG['cart_service_gome'] = '<{$cart_service_gome}>';
    window.page_id = "<?php echo isset($page_id) ? $page_id : ''?>";
</script>
<script type="text/javascript">
var uploadUrl = '<{$group_domain}>';
var pageId = '<{$pageId}>';
var qrcodeId = '<{$qrcodeId}>';
var maxNum = '<{$maxNum}>';
var qrcodeFrom = '<{$qrcodeFrom}>';
</script>
<html lang="zh-CN">
  <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=8">
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-control" content="no-cache">
  <meta http-equiv="Cache" content="no-cache">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="black" name="apple-mobile-web-app-status-bar-style">
  <meta content="telephone=no" name="format-detection">
  <script type="text/javascript">(function(win,lib){var doc=win.document;var docEl=doc.documentElement;var metaEl=doc.querySelector('meta[name="viewport"]');var flexibleEl=doc.querySelector('meta[name="flexible"]');var dpr=0;var scale=0;var tid;var flexible=lib.flexible||(lib.flexible={});if(metaEl){console.warn('将根据已有的meta标签来设置缩放比例');var match=metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);if(match){scale=parseFloat(match[1]);dpr=parseInt(1/scale)}}else if(flexibleEl){var content=flexibleEl.getAttribute('content');if(content){var initialDpr=content.match(/initial\-dpr=([\d\.]+)/);var maximumDpr=content.match(/maximum\-dpr=([\d\.]+)/);if(initialDpr){dpr=parseFloat(initialDpr[1]);scale=parseFloat((1/dpr).toFixed(2))}if(maximumDpr){dpr=parseFloat(maximumDpr[1]);scale=parseFloat((1/dpr).toFixed(2))}}}if(!dpr&&!scale){var isAndroid=win.navigator.appVersion.match(/android/gi);var isIPhone=win.navigator.appVersion.match(/iphone/gi);var devicePixelRatio=win.devicePixelRatio;if(isIPhone){if(devicePixelRatio>=3&&(!dpr||dpr>=3)){dpr=3}else if(devicePixelRatio>=2&&(!dpr||dpr>=2)){dpr=2}else{dpr=1}}else{dpr=1}scale=1/dpr}docEl.setAttribute('data-dpr',dpr);if(!metaEl){metaEl=doc.createElement('meta');metaEl.setAttribute('name','viewport');metaEl.setAttribute('content','initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no');if(docEl.firstElementChild){docEl.firstElementChild.appendChild(metaEl)}else{var wrap=doc.createElement('div');wrap.appendChild(metaEl);doc.write(wrap.innerHTML)}}var docEl=doc.documentElement;var width=docEl.getBoundingClientRect().width;var rem=width/18.75;docEl.style.fontSize=rem+'px';flexible.rem=win.rem=rem})(window,window['lib']||(window['lib']={}));</script>
  <link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/uploader.css?version=<?php echo C('CSS_VERSION'); ?>">
  <body class="opg">
    <div class="wrap-mobox">
      <div class="box-topic"><a href="javascript:"><img class="home-icon" src="<{$pcimgpath}>/images/uploader/home-icon.png"></a><span class="gome-plus title">国美</span></div>
      <div class="box-main">
        <div class="main-topic clearfix">
          <ol class="main-list clearfix"></ol>
          <div class="main-touch-btn">
            <div class="touch-btn-icon"><img class="touch-pic-icon" src="<{$pcimgpath}>/images/uploader/up-icon.png">
              <input class="touch-input-icon" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/JPEG" id="up_icon">
            </div>
            <p class="touch-btn-cell">上传手机图片</p>
            <p class="touch-btn-lit">最多可同时上传<{$typeNum}>张照片</p>
          </div>
        </div>
        <div class="main-down"><div class="main-toast"></div></div>
      </div>
    </div>
    <div class="wrap-down"><span class="main-prompt">您本次还可以上传</span><i class="main-photo-number">9</i><span class="main-prompt">张</span></div>
  </body>
  <script type="text/javascript" src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>"></script>
  <script type="text/javascript" src="<{$pcjspath}>/js/conf/uploader.js?version=<?php echo C('JS_VERSION'); ?>"></script>
</html>