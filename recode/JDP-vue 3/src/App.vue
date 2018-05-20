<template>
  <div id="app">
    <comp-head></comp-head>
    <comp-loading v-show="loading"></comp-loading>
    <router-view v-show="!error"></router-view>
    <comp-error v-show="error"></comp-error>
    <div class="noData" v-show="noData"><span>暂无数据~</span></div>
  </div>
</template>

<script>

import compError from "./components/common/error";
import compLoading from "./components/common/loading";
import CompHeader from './components/widget/commonHeader.vue';
import {mapState} from "vuex";
import imgLoad from '@/utils/imgLoad';

export default {
  name: 'app',
  computed: {
    ...mapState({
      'loading': state => state.indexModule.loading,
      'error': state => state.indexModule.error,
      'noData': state => state.indexModule.noData
    }),
    showView:function(){
      return !this.error && !this.loading
    }
  },
  components: {
    "comp-error": compError,
    "comp-loading": compLoading,
    "comp-head": CompHeader
  }
}
</script>
<style lang="sass">
@import "./assets/sass/public.scss";
</style>
<style lang="scss">
#app{
  height: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
h1{
  font-size: .2rem
}
ul{
  li{
    border-radius: 1px
  }
}

a{
  font-size: .16rem
}
.noData{
  position: fixed;
  width: 100%;
  top:50%;
  text-align: center;
  font-size:20px;
}

</style>
