<template>
  <div id="app">
    <comp-head></comp-head>
    <comp-loading v-show="loading == 1"></comp-loading>
    <comp-error v-show="error == 1"></comp-error>
    <router-view v-show="error == 0 && loading == 0"></router-view>
  </div>
</template>

<script>

import compError from "./components/common/error";
import compLoading from "./components/common/loading";
import CompHeader from './components/widget/commonHeader.vue';
import {mapState} from "vuex";

export default {
  name: 'app',
  computed: {
    ...mapState({
      'loading': state => state.indexModule.loading,
      'error': state => state.indexModule.error
    })
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

</style>


