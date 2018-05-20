<template>
  <div class="searchInput">
    <form action="javascript:void(0)">
      <input type="search" @keydown="keyDown($event)" @blur="blur($event)" class="searchText" v-model="searchText" @input="input($event)" />
      <!-- <em class="clearText"></em> -->
    </form>
    <b @click="infoInput($event)" v-show="isShowText"><!-- <em class="icon iconn-4"></em> --><em></em><i>请输入项目名称</i></b>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import store from '../../vuex';
import API from '../../utils/apis';
export default {
  name: 'commonSearchInput',
  data(){
    return {

    }
  },
  props: ['configs'],
  computed:{
    ...mapState({
      searchText: state=>state.curProject.searchText,
      hasSearchHistory: state=>state.search.hasSearchHistory,
      isShowText: state=>state.search.isShowText,
      currentType: state=>state.search.currentType
    })
  },
  methods: {
    input(ev){
      this.$store.commit('setSearchText', ev.target.value);
    },
    keyDown(ev){
      let _this = this;
      if(ev.keyCode == 13){
          ev.preventDefault();
          ev.target.blur();
        if(_this.$route.name != 'sxjg'){
          this.$store.commit('setIsZxReferer', true);
          this.$store.commit('isSearchShow', 0);
          this.$store.commit('setReffer', 'search');
          this.$store.commit('setSearchText', document.getElementsByClassName('searchText')[0].value);
          this.$store.commit('initFilterData');
          this.$store.commit('initProjectState');
          this.$store.commit('setTurnToDetail', true);
          this.$router.push({path:'/xmsx/sxjg'});
        }else{
          this.$http.get(API('searchResult'), {
            params: {
              projectName: _this.searchText
            }
          }).then(function (data){
            if(data.data.success){
              _this.$store.commit('initFilterData');
              _this.$store.commit('initProjectState');
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
              _this.$store.commit('initFilterData');
              _this.$store.commit('initProjectState');
              store.dispatch('setIsShowList', false);
              store.dispatch('setIsShowNoData', true);
              console.log('error');
            }
          });
        }
      }
    },
    infoInput(ev){
      let ele;
      switch(ev.target.tagName.toLowerCase()){
        case 'b':
          ele = ev.target.parentNode.children[0].children[0];
          break;
        case 'em':
          ele = ev.target.parentNode.parentNode.children[0].children[0];
          break;
        case 'i':
          ele = ev.target.parentNode.parentNode.children[0].children[0];
          break;
      }
      ele.focus();
      // console.log(ev.target.parentNode.children[0]);
      // ev.target.parentNode.children[0].children[0].focus();
      // document.getElementsByClassName('searchText')[1].focus();
      this.$store.commit('setIsShowText', false);
    },
    blur(ev){
      // console.log(ev.target.value);
      if(!ev.target.value){
        this.$store.commit('setIsShowText', true);
      }else{
        this.$store.commit('setIsShowText', false);
        if(this.configs.type == 'header'){
          // this.$store.commit('setSearchText', '');
        }
      }
    }
  }
}
</script>
<style lang="sass" scope>
.searchBox .searchTop div em.clearText
  width: .28rem;
  height: .28rem;
  display: inline-block;
  background: url(/static/img/clear@3x.png) center center no-repeat yellow
.searchBox .searchTop div em
  background: url(../../assets/images/search3x.png) center center no-repeat
  background-size: cover
.searchInput
  position: fixed
  width: 5.9rem
  height: .6rem
  line-height: .6rem
  font-size: .4rem
  font-family: 'PingFangSC-Regular'
  text-align: center
  width: 5.9rem
  height: .6rem
  z-index: 5
  left: 1rem
  top: .2rem
  form
    width: 100%
    height: 100%
    position: relative
    .icon
      position: absolute
      right: 0
      top: 50%
      margin-top: -0.2rem!important
  .searchText
    box-sizing: border-box
    /*padding: 0 .2rem 0 .1rem*/
    padding: 0 .2rem
    width: 5.9rem
    height: .6rem
    border-radius: .14rem
    background-color: #fff
    position: absolute
    left: 0
    top: 0
  b
    width: 5.9rem
    height: .6rem
    position: absolute
    left: 0
    top: 0
    font-size: .28rem
    color: #999
    text-align: left
    /*background-color: rgba(0,0,0,.4)*/
    *
      vertical-align: middle
  em
    margin: 0 .2rem
    background: url(../../assets/images/search3x.png) center center no-repeat
    background-size: cover
    width: .28rem
    height: .28rem
    display: inline-block
  i
    font-weight: normal
    font-style: normal
.searchBox
  .searchInput
    left: 0
    top: 0
</style>