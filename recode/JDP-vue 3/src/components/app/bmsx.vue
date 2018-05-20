<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
      <loadmore v-if="isLoadMoreShow" :configs="loadConfigs"></loadmore>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
import { mapState } from 'vuex';
import loadmore from '../common/loadmore';
import store from '../../vuex';
export default {
  name: 'app-zl',
  components: {
    commonLists,
    loadmore
  },
  data(){
    return {
      isLoadMoreShow: false
    }
  },
  computed:{
    ...mapState({
      filterTypeList:state=>state.xmsxModule.filterTypeList,
      centerList:state=>state.xmsxModule.xmsxData.filterTypeList.center,
      cid:state=>state.xmsxModule.filter.centerId,
      centerName:state=>state.xmsxModule.filter.centerName,
      configs:function(state){
        return {
          type: state.departmentsModule.type,
          list: state.departmentsModule.departList,
          isCanLoad: false
        }
      },
      loadConfigs: function (state){
        return {
          type: state.departmentsModule.type,
          descritText: state.departmentsModule.descritText
        }
      }
    })
  },
  created(){
    let cid = this.cid,
        centerList = this.centerList,
        centerName = this.centerName,
        curCenter = [],
        _this = this;
    if(this.centerList && this.centerList.length){
      for(var i = 0; i < this.centerList.length; i ++){
        let item = this.centerList[i];
        if(item.centerId == cid){
          curCenter = item;
          break;
        }
      }
    }
    if(curCenter.departmentData && curCenter.departmentData.length){
      this.isLoadMoreShow = curCenter.departmentData.length > 20 ? true : false;
    }
    store.dispatch('initDepartState');
    store.dispatch('setDepartAllList', {
      list: curCenter.departmentData,
      cid,
      centerName,
      optionsId: 6
    });
    window.onscroll = function (){
      if(_this.$route.name == 'bmsx'){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let docHeight = document.documentElement.scrollHeight;
        let winHeight = document.documentElement.offsetHeight;
        // console.log(`滚动距离是${scrollTop}，窗口高度是${winHeight}，文档高度是${docHeight}`);
        if(scrollTop + winHeight + 10 >= docHeight){
          _this.configs.isCanLoad = true;
        }else{
          _this.configs.isCanLoad = false;
        }
        if(window.localStorage){
          localStorage.setItem('scrolltop3', scrollTop);
        }
      }
    }
    if(_this.$route.name == 'bmsx'){
      if(window.localStorage && localStorage.scrolltop3){
        setTimeout(function (){
          //document.body.scrollTop = parseInt(localStorage.getItem('scrolltop3'));
        }, 300);
      }
    }
  }
}
</script>
