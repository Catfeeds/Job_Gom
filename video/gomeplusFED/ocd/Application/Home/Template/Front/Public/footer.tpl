    <div class="footer">
      <div class="wrap-box clearfix">
        <!--
        <dl class="link-list">
          <dt>国美控股</dt>
          <dd><a target="_blank" href="http://igome.com/">国美集团</a></dd>
          <dd><a target="_blank" href="http://www.gomehome.com/">国美家装</a></dd>
          <dd><a target="_blank" href="http://jr.gome.com.cn/">国美金融</a></dd>
          <dd><a target="_blank" href="http://www.guomeiliquor.cn/pc.php/Index/Index">国美酒业</a></dd>
          <dd><a target="_blank" href="http://www.gome.com.cn/">国美在线</a></dd>
        </dl>
        -->
        <dl class="link-list">
          <dt>商家服务</dt>
          <dd><a target="_blank" href="<{$main_domain}>others/process.html">商家入驻</a></dd>
          <dd><a target="_blank" href="http://xpop.gomeplus.com/login">商家管理中心</a></dd>
          <dd><a target="_blank" href="<{$main_domain}>others/help.html">帮助中心</a></dd>
          <dd><a target="_blank" href="<{$main_domain}>others/content.html">联系我们</a></dd>
        </dl>
        <dl class="link-list">
          <dt>关于我们</dt>
          <dd><a target="_blank" href="<{$main_domain}>others/join-list.html">社会招聘</a></dd>
          <dd><a target="_blank" href="http://gomeplus.zhaopin.com">校园招聘</a></dd>
          <dd><a target="_blank" href="<{$main_domain}>others/siteMapHtml/siteMap.html">站点地图</a></dd>
        </dl>
        <div class="ma">
          <p><img src="<{$pcimgpath}>/images/public/ma1.jpg">国美+APP</p>
          <p><img src="<{$pcimgpath}>/images/public/ma2.jpg">国美+微信服务号</p>
        </div>
      </div>
      <div class="copyright">
         <div class="wrap-box">
          <p>出版物经营许可证：渝北-500112122号 | 食品流通许可证：SP5001121610159782号</p>
          <p>Copyright © 2015-2016 美信网络技术有限公司版权所有 渝ICP备15012739号 增值电信业务经营许可证：<a href="http://www.miibeian.gov.cn/state/outPortal/loginPortal.action" target="_blank">渝B2-20160039</a></p>
        </div>
      </div>
      </div>
    </div>

    <div class="totop" data-node="top"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
    <?php if($_SERVER['HTTP_HOST'].'/'!=C('PASSPORT_URL') && $feed_btn_status===1 ){ ?>
    <div class="totop totop-link"><a href="<{$i_domain}>feed/index" target="_blank" data-action="feedback" ><em class="icon">&#xea78;</em><span>意见反馈</span></a></div>
    <?php } ?>
    <script src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>"></script>
	<if condition="!empty($jspath)">
		<script src="<{$pcjspath}><{$jspath}>?version=<?php echo C('JS_VERSION'); ?>" ></script>
	</if>
  </body>
</html>    
 
