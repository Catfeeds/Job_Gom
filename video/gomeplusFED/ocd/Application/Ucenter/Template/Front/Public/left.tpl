      <div class="order-side-bar">
        <h3><a href="/index">我的主页</a></h3>
        <h3>社交</h3>
        <ul>
          <li><a href="/group"  <?php if ($activeUrl== '/group/index'){?> class="active" <?php } ?> >我的圈子</a></li>
          <li><a href="/topic" <?php if ($activeUrl== '/topic/index'){?> class="active" <?php } ?> >我的话题</a></li>
        </ul>
        <h3>购物</h3>
        <ul>
          <li><a href="<{$i_domain}>order" <?php if($activeUrl == $i_domain.'order/index'){ ?> class="active" <?php } ?> >我的订单</a></li>
          <li><a href="/coupon" <?php if ($activeUrl== '/coupon/index'){?> class="active" <?php } ?>>我的优惠券</a></li>
        </ul>
        <h3>收藏</h3>
        <ul>
          <li><a href="<{$i_domain}>collect" <?php if($activeUrl == $i_domain.'collect/index'){ ?> class="active" <?php } ?>>我的收藏</a></li>
        </ul>
        <h3>设置</h3>
        <ul>
          <li><a href="<{$i_domain}>personal" <?php if($activeUrl == $i_domain.'personal/index'){ ?> class="active" <?php } ?>>个人信息</a></li>
          <li><a href="<{$i_domain}>modpwd" <?php if($activeUrl == $i_domain.'modpwd/index'){ ?> class="active" <?php } ?>>登录密码修改</a></li>
		  <li><a href="<{$i_domain}>bind" <?php if($activeUrl == $i_domain.'bind/index'){ ?> class="active" <?php } ?>>修改绑定手机号</a></li>
          <li><a href="<{$i_domain}>address" <?php if($activeUrl == $i_domain.'address/index'){ ?> class="active" <?php } ?> >收货地址管理</a></li>
        </ul>
        <h3>售后服务</h3>
        <ul>
          <li><a href="/customerInfo" <?php if ($activeUrl== '/customerInfo/index'){?> class="active" <?php } ?> >退款/售后</a></li>
        </ul>
      </div>
