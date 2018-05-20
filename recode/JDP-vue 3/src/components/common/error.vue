<template>
  <div class="errBox">
    <em class="errorIcon"></em>
    <div class="errText">加载失败，请重新加载</div>
    <div>
      <a href="javascript:void(0)" class="retry" @click="retry">重新加载</a>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js';
  export default {
    name: "app-error",
    methods:{
      retry:function(){
        this.$store.dispatch('error',0);
        router.push('mid')
      }
    }
  }
</script>
<style lang='sass'>
@import '../../assets/sass/error.scss';
</style>
