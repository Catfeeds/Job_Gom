<template>
  <div class="header">
  <a href="javascript:void(0)" exact @click="back">
    <em class="header-backicon iconn-1"></em>
  </a>
  <span class="header-title">{{msg}}</span>
  <!-- <input type="text" value="aaa" /> -->
  <div class="searchInput" v-if="isZxReferer" >
    <b @click="infoInput($event)" v-show="isShowText"><em class="icon iconn-4"></em><i>请输入项目名称</i></b>
  </div>
  <a href="javascript:void(0)" class="search toSearch" @click="toSearch" v-if="isShowSearch">
    <label for="searchText">
      <!-- <em class="icon iconn-4"></em> -->
      <em></em>
    </label>
  </a>
  </div>
</template>

<script>
import router from '../../router'
import API from '../../utils/apis';
import {mapState} from 'vuex'
import store from '../../vuex';
export default {
  name: 'header',
  data(){
    return {
      msg:'首页',
      isShowText: false,
      resConfigs: {
        text: '当前筛选条件无结果'
      }
    }
  },
  computed:{
    ...mapState({
      error:state=>state.indexModule.error,
      noData:state=>state.indexModule.noData,
      isShowSearch:state=>state.search.isShowSearchBtn,
      isInputShow:state=>state.search.isInputShow,
      searchText:state=>state.curProject.searchText,
      isLoadMoreShow:state=>state.curProject.isLoadMoreShow,
      isShowList:state=>state.curProject.isShowList,
      isShowNoData:state=>state.curProject.isShowNoData,
      isZxReferer:state=>state.search.isZxReferer
    })
  },
  methods:{
    back:function(){
      this.$store.commit('setIsZxReferer', false);
      this.$store.commit('setIsFromXmxq', false);
      if(this.error){this.$store.dispatch('error',0)};
      if(this.noData){this.$store.dispatch('noData',0)};
      if(this.$route.name == 'index'){
        window.location.href = this.$store.state.curProject.mainReffer;
      }else if(this.$route.name == 'main'){
        this.$router.replace({path:'/api/projectCnt'});
      }else if(this.$route.name == 'bmsx'){
        this.$store.dispatch('initDepartState');
        router.back();
      }else if(this.$route.name == 'xmcy'){
        this.$store.dispatch('initMembersState');
        router.back();
      }else if(this.$route.name == 'sxjg'){
        this.$store.commit('setSearchText', '');
        this.$store.commit('setIsShowText', true);
        this.$store.dispatch('initProjectState');
        // this.$store.dispatch('isSearchShow', 0);
        this.$store.commit('setHistory', []);
        router.back();
      }else if(this.$route.name == 'xmsx'){
        this.$store.dispatch('initFilterData');
        this.$store.dispatch('initDepartState');
        this.$router.replace({path:'/main'});
      }/*else if(this.$route.name =='ssjg'){
        this.$store.dispatch('initProjectState');
        router.back();
      }*/else if(this.$route.name == 'lxxx'){
        window.history.go(-1);
      }else if(this.$route.name == 'xmxq'){
        this.$store.commit('setIsFromXmxq', true);
        this.$store.commit('setIsZxReferer', this.$store.state.search.recordFromXq);
        router.back();
      }else if(this.$route.name == 'zxlb'){
        this.$store.commit('setState2', true);
        this.$store.commit('setState3', true);
        router.back();
      }else if(this.$route.name == 'zxxq'){
        this.$store.dispatch('initZxState');
        this.$store.commit('setState2', true);
        this.$store.commit('setState3', true);
        router.back();
      }else{
        router.back();
      }
    },
    infoInput(ev){
      ev.target.parentNode.children[0].focus();
      this.isShowText = false;
    },
    keyDown(ev){
      let _this = this;
      if(ev.keyCode == 13){
        ev.preventDefault();
        this.$store.commit('setSearchText', document.getElementById('searchText').value);
        this.$store.commit('setReffer', 'search');
        this.$store.commit('setTurnToDetail', true);
        this.$store.commit('initProjectState');
        // this.$store.commit('isSearchShow', 0);
        let URL = API('searchResult');
        let params = {
          projectName: this.searchText
        };
        this.$http.get(URL, {
          params
        }).then(function (data){
          if(data.data.success){
            let result = data.data.data;
            if(!result.length){
              store.dispatch('setIsShowList', false);
              store.dispatch('setIsShowNoData', true);
            }else{
              store.dispatch('setIsShowList', true);
              store.dispatch('setIsShowNoData', false);
              store.dispatch('setIsLoadMoreShow', result.length > 20 ? true : false);
              /*if(_this.$route.name != 'xmxq' && !_this.isback){
                store.dispatch('initProjectState');
              }*/
              store.dispatch('setProjectAllList', result);
            }
          }else{
            console.log('应该不会走这里');
          }
        });
      }
    },
    toSearch(){
      this.$store.dispatch('isSearchShow', 1);
      this.$store.dispatch('setSearchText', '');
      this.$store.dispatch('getHistory', 5);
    },
    blur(){
      if(!this.searchText){
        this.isShowText = true;
      }
    },
    input(ev){
      if(ev.keyCode == 13){
        ev.preventDefault();
      }
    }
  },
  created:function(){
    var _this = this;
    router.afterEach(function(route){
      _this.msg = route.meta.title;
      _this.$store.dispatch('setCurrentTitle', route.meta.title);
      document.title = route.meta.title;
    });
    this.text = this.searchText;
  }
}
</script>

<style lang="sass" scope>
@import "../../assets/sass/Header.scss"
.toSearch
  position: absolute
  right: .5rem
  top: 0
  font-size: .14rem
  color: blue
  font-weight: normal
  em
    height: .44rem
    width: .44rem
    display: inline-block
    background: url(../../assets/images/search@3x.png) center center no-repeat
    background-size: cover
    position: relative
    top: .06rem
</style>
