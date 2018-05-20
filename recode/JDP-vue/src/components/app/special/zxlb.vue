<template>
  <div class="main">
    <div class="nav-list">
      <div class="search-head" v-if="isTabShow">
        <span @click="tab(0)" :class="{filter:true, on:recordNum=='all'}">全部</span>
        <span @click="tab(1)" :class="{filter:true, on:recordNum=='threeMonths'}">过去3个月</span>
        <span @click="tab(2)" :class="{search:true, on:recordNum=='oneMonth'}">过去1个月</span>
      </div>
      <div class="clips" v-if="isTabShow"></div>
      <div class="content-box">
        <div class="switch-item" v-show="recordNum=='all'">
          <commonLists v-if="list1.length" :configs="configs1"></commonLists>
          <loadmore v-if="isLoadMoreShow1" :configs="loadConfigs1"></loadmore>
          <no-result :configs="resConfigs" v-if="noResult1"></no-result>
        </div>
        <div class="switch-item" v-show="recordNum=='threeMonths'">
          <commonLists v-if="list2.length" :configs="configs2"></commonLists>
          <loadmore v-if="isLoadMoreShow2" :configs="loadConfigs2"></loadmore>
          <no-result :configs="resConfigs" v-if="noResult2"></no-result>
        </div>
        <div class="switch-item" v-show="recordNum=='oneMonth'">
          <commonLists v-if="list3.length" :configs="configs3"></commonLists>
          <loadmore v-if="isLoadMoreShow3" :configs="loadConfigs3"></loadmore>
          <no-result :configs="resConfigs" v-if="noResult3"></no-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonLists from '../../widget/commonLists';
import { mapState } from 'vuex';
import store from '../../../vuex';
import API from '../../../utils/apis';
import noResult from '../../common/noResult';
import loadmore from '../../common/loadmore';
export default {
  name: 'zxlb',
  data () {
    return {
      showNum: 0,
      noResult1: false,
      noResult2: false,
      noResult3: false,
      /*configs: {
        type: 'zxlb',
        list: this.list1
      },*/
      resConfigs: {
        text: '暂无数据'
      }
    }
  },
   computed:{
    ...mapState({
      visited:state=>state.xmsxModule.visited,
      xmsxData:state=>state.xmsxModule.xmsxData,
      isVisited:state=>state.xmsxModule.visited,
      filter:state=>state.xmsxModule.filter,
      projectName:state=>state.curProject.curName,
      list1:state=>state.zxOptions.list1.list,
      list2:state=>state.zxOptions.list2.list,
      list3:state=>state.zxOptions.list3.list,
      canClick1:state=>state.zxOptions.canClick1,
      canClick2:state=>state.zxOptions.canClick2,
      canClick3:state=>state.zxOptions.canClick3,
      isLoadMoreShow1:state=>state.zxOptions.list1.isLoadMoreShow,
      isLoadMoreShow2:state=>state.zxOptions.list2.isLoadMoreShow,
      isLoadMoreShow3:state=>state.zxOptions.list3.isLoadMoreShow,
      isTabShow:state=>state.search.isTabShow,
      recordNum:state=>state.zxOptions.recordNum,
      configs1: function(state){
        return {
          type: state.zxOptions.type,
          list: state.zxOptions.list1.list,
          isCanLoad: false
        }
      },
      configs2: function(state){
        return {
          type: state.zxOptions.type,
          list: state.zxOptions.list2.list,
          isCanLoad: false
        }
      },
      configs3: function(state){
        return {
          type: state.zxOptions.type,
          list: state.zxOptions.list3.list,
          isCanLoad: false
        }
      },
      loadConfigs1: function (state){
        return {
          type: 'zxlb',
          descritText: state.zxOptions.list1.descritText
        }
      },
      loadConfigs2: function (state){
        return {
          type: 'zxlb',
          descritText: state.zxOptions.list2.descritText
        }
      },
      loadConfigs3: function (state){
        return {
          type: 'zxlb',
          descritText: state.zxOptions.list3.descritText
        }
      },
      null1(){
        this.noResult1 = !this.list1.length;
        return 1;
      },
      null2(){
        this.noResult2 = !this.list2.length;
        return 1;
      },
      null3(){
        console.log(this.noResult3);
        this.noResult3 = !this.list3.length;
        return 1;
      }
    })
  },
  methods: {
    tab(n){
      this.showNum = n;
        switch(n){
        case 0:
          this.$store.commit('setRecordNum', 'all');
          this.$store.commit('setMember', {type: 'all'});
          if(this.canClick1){
            this.$store.dispatch('getData', 'all');
            this.$store.commit('setState1', false);
          }else{
            // console.log('1加载过了');
          }
          break;
        case 1:
          this.$store.commit('setRecordNum', 'threeMonths');
          this.$store.commit('setMember', {type: 'threeMonths'});
          if(this.canClick2){
            this.$store.dispatch('getData', 'threeMonths');
            this.$store.commit('setState2', false);
          }else{
            // console.log('2加载过了');
          }
          break;
        case 2:
          this.$store.commit('setRecordNum', 'oneMonth');
          this.$store.commit('setMember', {type: 'oneMonth'});
          if(this.canClick3){
            this.$store.dispatch('getData', 'oneMonth');
            this.$store.commit('setState3', false);
          }
          break;
      }
    }
  },
 
  components: {
    commonLists,
    noResult,
    loadmore
  },
  mounted(){
    let _this = this;
    if(this.recordNum){
      this.$store.dispatch('getData', this.recordNum);
      this.$store.commit('setStates', this.recordNum);
    }else{
      this.$store.dispatch('getData', 'all');
    }
    window.onscroll = function (){
      if(_this.$route.name == 'zxlb'){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let docHeight = document.documentElement.scrollHeight;
        let winHeight = document.documentElement.offsetHeight;
        // console.log(`滚动距离是${scrollTop}，窗口高度是${winHeight}，文档高度是${docHeight}`);
        if(scrollTop + winHeight + 10 >= docHeight){
          if(_this.showNum == 0){
            _this.configs1.isCanLoad = true;
          }else if(_this.showNum == 1){
            _this.configs2.isCanLoad = true;
          }else if(_this.showNum == 2){
            _this.configs3.isCanLoad = true;
          }
        }else{
          if(_this.showNum == 0){
            _this.configs1.isCanLoad = false;
          }else if(_this.showNum == 1){
            _this.configs2.isCanLoad = false;
          }else if(_this.showNum == 2){
            _this.configs3.isCanLoad = false;
          }
        }
        if(window.localStorage){
          localStorage.setItem('scrolltop4', scrollTop);
        }
      }
    };
  }
}
</script>
