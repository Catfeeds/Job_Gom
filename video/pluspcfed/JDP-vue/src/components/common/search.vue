<template>
  <div class="searchBox">
    <div class="cover" @click="closeSearch"></div>
    <div class="searchContent">
      <div class="searchTop">
        <commonSearchInput :configs="searchConfigs"></commonSearchInput><a @click="closeSearch">取消</a>
      </div>
      <div class="main" v-if="hasSearchHistory">
        <div class="nav-list">
          <div class="content-box">
            <div class="searchList">
            <commonLists :configs="configs"></commonLists>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
import commonSearchInput from '../widget/commonSearchInput';
import {mapState} from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      isShowText: true,
      searchConfigs: {
        type: 'search'
      }
    }
  },
  methods: {
    closeSearch(){
      this.$store.dispatch('isSearchShow', 0);
      this.$store.commit('setHistory', []);
      this.$store.commit('setSearchText', '');
      this.isShowText = true;
    },
    infoInput(ev){
      document.getElementsByClassName('searchText')[0].focus();
      this.isShowText = false;
    },
    blur(){
      if(!this.searchText){
        this.isShowText = true;
      }
    }
  },
  computed:{
    ...mapState({
      'searchText': state=>state.curProject.searchText,
      'hasSearchHistory': state=>state.search.hasSearchHistory,
      'configs':function(state){
        return {
          type: state.search.type,
          list: state.search.historyList
        }
      },
    })
  },
  components: {
    commonLists,
    commonSearchInput
  }
}
</script>
<style lang="scss" scope>
.searchBox{
  z-index: 3;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  .main{
    margin-top: 0;
  }
  .cover{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.7);
  }
  .searchContent{
    position: relative;
    z-index: 4;
  }
  .searchTop{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
    font-family: 'PingFangSC-Regular';
    text-align: center;
    background-color: #e7001b;
    *{
      vertical-align: middle;
    }
    .searchText{
      box-sizing: border-box;
      /*padding: 0 .2rem 0 .1rem;*/
      padding: 0 .2rem;
      width: 5.9rem;
      height: .6rem;
      /*border-radius: .14rem;*/
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 0;
    }
    div{
      position: relative;
      display: inline-block;
      width: 5.9rem;
      height: .6rem;
      line-height: .6rem;
      /*border-radius: .3rem;
      overflow: hidden;*/
      b{
        width: 5.9rem;
        height: .6rem;
        position: absolute;
        left: 0;
        top: 0;
        font-size: .28rem;
        color: #999;
        text-align: left;
      }
      em{
        margin: 0 .2rem;
        width: .28rem;
        height: .28rem;
        display: inline-block;
        background: url(/static/img/search3x.png) center center no-repeat;
      }
      i{
        font-weight: normal;
        font-style: normal;
      }
    }
    a{
      font-size: .3rem;
      color: #fff;
      margin-left: .3rem;
    }
  }
  .searchList{
    background-color: #fff;
    padding: .1rem 0 .3rem;
  }
}
</style>