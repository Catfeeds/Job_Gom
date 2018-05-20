<template>
  <div>
    <m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
    <m-idea-list></m-idea-list>
  </div>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
import unitList from "./idea-list";
export default {
  name: 'app-put-plan-idea-overview',
  data() {
    return {
      breadcrumbConfig: {
        data: [{
          msg: '投放管理',
          link: '/#/app/put/'
        }, {
          msg: '投放计划',
          link: '/#/app/put/plan'
        }, {
          msg: '投放单元',
          link: '/#' + this.$route.path
        }]
      }
    };
  },
  components: {
    'm-breadcrumb': Breadcrumb,
    'm-idea-list': unitList
  }
};
</script>
