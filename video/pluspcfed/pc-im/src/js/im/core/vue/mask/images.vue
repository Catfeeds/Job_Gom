<template>
  <div>
    <div class="im-pic" :class="{show:!!imgShowFlag}">
      <a href="javascript:;" title="关闭" class="im-close" @click="closeMask"><em class="im-icon"></em></a>
      <img :src="imgSrc">
    </div>
    <div class="im-mask" :class="{show:!!imgShowFlag}" @click="closeMask"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {

  computed:{
    ...mapState({
      imgShowFlag:state =>state.maskModule.imgShowFlag,
      imgSrc:state =>state.maskModule.imgSrc,
      imgStyle:state =>state.maskModule.imgStyle
    })
  },
  methods:{
    ...mapActions(['closeMask'])
  }
}

</script>

<style>

@import '../../../../../css/core/images.css';
 
</style>

   