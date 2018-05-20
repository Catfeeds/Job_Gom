<template>
<div></div>
</template>

<script>
import router from '@/router';
export default {
  //加载错误，点击重新加载的route中转页
  name: 'app-mid',
  created:function(){
    router.back();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>
