
<!--[if lte IE 8]>
<script src="<{$pcjspath}>/js/conf/es5-shim.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/es5-sham.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/json3.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/es6-shim.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<script src="<{$pcjspath}>/js/conf/es6-sham.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
<![endif]-->


    <div class="totop" data-node="top"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
    <script src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <if condition="!empty($jspath)">
        <script src="<{$pcjspath}><{$jspath}>?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    </if>
<script src="<!--#include virtual='/n/common/<{$pro_num}>/script.html'-->" ></script>
</body>

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
</html>
