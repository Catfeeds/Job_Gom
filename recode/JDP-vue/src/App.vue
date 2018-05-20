<template>
  <div id="app">
    <comp-head></comp-head>
    <commonSearchInput v-show="isInputShow" :configs="searchConfigs"></commonSearchInput>
    <comp-search v-show="searchShow"></comp-search>
    <comp-loading v-show="loading"></comp-loading>
    <transition  name="fade">
        <router-view v-show="!error"></router-view>
    </transition>
    <comp-error v-show="error"></comp-error>
    <div class="noData" v-show="noData"><span>暂无数据~</span></div>
  </div>
</template>

<script>

import compError from "./components/common/error";
import compLoading from "./components/common/loading";
import CompSearch from "./components/common/search";
import CompHeader from './components/widget/commonHeader.vue';
import {mapState} from "vuex";
import imgLoad from '@/utils/imgLoad';
import commonSearchInput from './components/widget/commonSearchInput';

export default {
  name: 'app',
  data(){
    return {
      searchConfigs: {
        type: 'header'
      }
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.indexModule.loading,
      'error': state => state.indexModule.error,
      'noData': state => state.indexModule.noData,
      'searchShow': state => state.search.isShowSearch,
      'isInputShow': state => state.search.isInputShow
      
    }),
    showView:function(){
      return !this.error && !this.loading
    }
  },
  components: {
    "comp-error": compError,
    "comp-loading": compLoading,
    "comp-head": CompHeader,
    "comp-search": CompSearch,
    commonSearchInput
  }
}
</script>
<style lang="sass">
@import "./assets/sass/public.scss";
</style>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
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
