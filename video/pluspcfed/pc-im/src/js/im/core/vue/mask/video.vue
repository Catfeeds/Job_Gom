<template>
  <div>
    <div class="im-mask" :class="{show:!!videoShowFlag}" @click="closeMask"></div>
    <div class="im-video" :class="{show:!!videoShowFlag}">
      <a href="javascript:;" title="关闭" class="im-close" @click="closeMask">
        <em class="im-icon"></em>
      </a>
      <video width="900" height="546"  controls preload style="background:#000" ref="video" class="videoPlay" :src='videoSrc'>
                  <!-- 兼容 Firefox --> 
          <source :src="videoSrc" type="video/ogg" /> 
          <!-- 兼容 Safari/Chrome--> 
          <source :src="videoSrc" type="video/mp4" /> 
      </video>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed:{
    ...mapState({
        videoShowFlag:state =>state.maskModule.videoShowFlag,
        videoSrc:state=>state.maskModule.videoSrc
      })
    },
    methods:{
      closeMask (){
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
        this.$store.dispatch('closeMask');
      }
    }
}
</script>

<style>
   @import '../../../../../css/core/video.css';
</style>

   