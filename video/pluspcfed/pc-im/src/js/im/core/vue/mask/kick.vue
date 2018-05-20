<template>
  <div>
     <div class="im-mask" :class="{show:!!kickShowFlag}"></div>
    <div class="im-state" :class="{show:!!kickShowFlag}">
          <div class="state-icon"><em class="im-icon"></em></div>
          <div class="state-txt">
            <h3>您已在其他的页面发起了咨询</h3>
            <p>如需要请在此页面重新发起咨询</p>
          </div>
          <div class="state-btn"><a href="javascript:;" class="btn-b" @click="reLogin">重新发起</a></div>
         
    </div>
  </div>
 </template>
<script> 
  import { mapState, mapActions} from 'vuex';
  export default {
      computed: {
          ...mapState({kickShowFlag: state=>state.maskModule.kickShowFlag })
      },
      methods: {
          reLogin () {
              window.location.href=window.location.href;
              this.$store.dispatch('closeMask');
          }
      }
  }
</script> 
<style> 
  @import '../../../../../css/core/kick.css';

</style>
