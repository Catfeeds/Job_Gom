<template>
  <div class="header">
  <a href="javascript:void(0)" exact @click="back">
    <em class="header-backicon iconn-1"></em>
  </a>
    <span class="header-title">
      {{msg}}
    </span>
  </div>
</template>

<script>
import router from '../../router'
export default {
  name: 'header',
  data () {
    return {
      msg: '主页'
    }
  },
  methods:{
    back:function(){
      router.back()
    }
  },
  created:function(){
    var _this = this;
    router.afterEach(function(route){
      _this.msg = route.meta.title;
      document.title = route.meta.title;
    })  
  }
}
</script>

<style lang="sass">
@import "../../assets/sass/Header.scss"
</style>
