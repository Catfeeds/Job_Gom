<template>
  <div>
    <div>项目详情</div>
    <router-link to="/xmsx/xmxq/xmcy">项目成员</router-link>
  </div>
</template>
<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
      <loadmore v-if="isLoadMoreShow" :configs="loadConfigs"></loadmore>
    </div>
  </div>
</template>
<script>
import commonLists from '../../widget/commonLists';
import { mapState } from 'vuex';
import loadmore from '../../common/loadmore';
import store from '../../../vuex';
import API from '../../../utils/apis';
export default {
  name: 'app-xmcy',
  components: {
    commonLists,
    loadmore
  },
  data(){
    return {
      isLoadMoreShow: true
    }
  },
  computed:{
    ...mapState({
      membersType:state=>state.zxOptions.membersType,
      members:state=>state.zxxqModule.members,
      configs:function(state){
        return {
          type: state.membersModule.type,
          list: state.membersModule.memberList,
          isCanLoad: false
        }
      },
      loadConfigs: function (state){
        return {
          type: state.membersModule.type,
          descritText: state.membersModule.descritText
        }
      },
      projectId:state=>state.xmxqModule.xmxqConfigs.curProjectId
    })
  },
  mounted(){
    let _this = this;
    if(_this.membersType == 'zx'){
      _this.isLoadMoreShow = this.members.length > 20 ? true : false;
      store.dispatch('initMembersState');
      store.dispatch('setMembersAllList', _this.members);
    }else if(_this.membersType == 'ptxm'){
      // 加载成员列表
      this.$http.get(API('members'),{
        params: {
          projectId: this.projectId
        }
      }).then(function (data){
        if(data.data.success){
          let lists = data.data.data;
          _this.isLoadMoreShow = lists.length > 20 ? true : false;
          store.dispatch('initMembersState');
          store.dispatch('setMembersAllList', lists);
        }else{
          console.log('error');
        }
      },function (err){
        console.log(err);
      });
    }
    
    window.onscroll = function (){
      if(_this.$route.name == 'xmcy'){
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
          localStorage.setItem('scrolltop1', scrollTop);
        }
      }
    }
    if(_this.$route.name == 'xmcy'){
      if(window.localStorage && localStorage.scrolltop1){
        setTimeout(function (){
          //document.body.scrollTop = parseInt(localStorage.getItem('scrolltop1'));
        }, 300);
      }
    }
  }
}
</script>
