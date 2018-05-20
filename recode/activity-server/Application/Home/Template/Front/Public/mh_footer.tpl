
<!--[if lte IE 8]>
<script src="<{$pcjspath}>/js/conf/es5-shim.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/es5-sham.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/json3.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/es6-shim.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/es6-sham.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<![endif]-->


    <div class="totop" data-node="top"><a href="javascript:;"><em class="icon-totop"></em><span>返回顶部</span></a></div>
    <?php if( getBrowser() == 'ie' && in_array(getBrowserVer() ,array(7,8,9)) ): ?>
    <script src="<{$pcjspath}>/js/conf/vendor-ltie9.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <?php else:?>
    <script src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <?php endif;?>
    <if condition="!empty($jspath)">
        <script src="<{$pcjspath}><{$jspath}>?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    </if>
    <script>
        (function(){
            var bp = document.createElement('script');
            var curProtocol = window.location.protocol.split(':')[0];
            if (curProtocol === 'https') {
                bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            }
            else {
                bp.src = 'http://push.zhanzhang.baidu.com/push.js';
            }
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(bp, s);
        })();
    </script>
</body>
</html>
