<template> 
  <dl class="im-myinfo"> 
    <dt class="im-face">
      <img v-lazy="userInfo.myAvatar">
    </dt>
    <dd class="im-name"> 
      <h3>{{userInfo.myName}}</h3>
      <a href="javascript:;" title="关闭声音" class="im-close-sound" @click="changeRemind">
        <em :class="bellCls" class="im-icon"></em>
      </a> 
      <audio controls="controls" class="hide" id="infotip">
        <source :src="infotipOgg" type="audio/ogg">
        <source :src="infotipMp3" type="audio/mpeg">
      </audio>
    </dd> 
  </dl> 
</template> 
<script> 
import { mapState, mapActions} from 'vuex';
export default {
    data:function(){
        return {
            infotipOgg:this.$store.state.initModule.imIconUrl+'/src/images/infotip.ogg',
            infotipMp3:this.$store.state.initModule.imIconUrl+'/src/images/infotip.mp3',
            infotip:this.$refs.infotip
        }
    },
    computed: {
        ...mapState({
            userInfo: state=>state.initModule.userInfo,
            bellRemind:state=>state.listModule.bellRemind
        }),
        bellCls () {
            return {
                "im-icon-hover":!this.bellRemind
            }
        }
    },
    methods: {
        ...mapActions(['changeRemind'])
    }
}
</script>
<style>
@import '../../../../../css/core/info.css';
</style>