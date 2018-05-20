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
import {mapState} from 'vuex'
export default {
  name: 'header',
  data(){
    return {
      msg:'主页'
    }
  },
  computed:{
    ...mapState({
      error:state=>state.indexModule.error,
      noData:state=>state.indexModule.noData
    })
  },
  methods:{
    back:function(){
      if(this.error){this.$store.dispatch('error',0)};
      if(this.noData){this.$store.dispatch('noData',0)};
      if(this.$route.name == 'main'){
        window.location.href = this.$store.state.curProject.mainReffer;
      }else if(this.$route.name == 'bmsx'){
        this.$store.dispatch('initDepartState');
        router.back();
      }else if(this.$route.name == 'xmcy'){
        this.$store.dispatch('initMembersState');
        router.back();
      }else if(this.$route.name == 'sxjg'){
        this.$store.dispatch('initProjectState');
        router.back();
      }else if(this.$route.name == 'xmsx'){
        this.$store.dispatch('initFilterData');
        this.$store.dispatch('initDepartState');
        this.$router.replace({path:'/api/projectCnt'});
      }else if(/*this.$route.name == 'xmxq' || */this.$route.name =='ssjg'){
        this.$store.dispatch('initProjectState');
        router.back();
      }else if(this.$route.name == 'lxxx'){
        window.history.go(-1);
      }else{
        router.back();
      }
    }
  },
  created:function(){
    var _this = this;
    router.afterEach(function(route){
      _this.msg = route.meta.title;
      _this.$store.dispatch('setCurrentTitle', route.meta.title);
      document.title = route.meta.title;
    })
  }
}
</script>

<style lang="sass">
@import "../../assets/sass/Header.scss"
</style>
