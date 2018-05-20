<template>
  <div class="amp-content">
    <m-nav :config="navMenu"></m-nav>
    <div class="content-main">
      <div class="amp-account">
        <m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
import Nav from '../../common/nav.vue';

export default {
  name: 'app-report-main-overview',
  data() {
    return {
      breadcrumbConfig: {
        data: [{
          msg: '我的账户',
          link: '/#/app/account/'
        }, {
          msg: '账户明细',
          link: '/#' + this.$route.path
        }]
      },
      navMenu: [{
        msg: '广告报表',
        link: '/#/app/report/ads/1/1',
        icon: 'icon-computer',
        checked: true,
        sub: []
      },{
        msg: '返利报表',
        link: '/#/app/report/rebate/1',
        icon: 'icon-manifest',
        checked: false,
        sub: []
      }]
      
    };
  },
  components: {
    'm-breadcrumb': Breadcrumb,
    'm-nav': Nav,
  }
};
</script>
