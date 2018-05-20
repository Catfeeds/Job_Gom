<template>
  <div class="main">
    <div class="nav-list">
      <commonLists v-if="isShowList" :configs="configs"></commonLists>
      <loadmore v-if="isShowList && isLoadMoreShow" :configs="loadConfigs"></loadmore>
    </div>
    <no-result :configs="resConfigs" v-if="isShowNoData"></no-result>
    <router-view></router-view>
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
import loadmore from '../common/loadmore';
import noResult from '../common/noResult';
import { mapState } from 'vuex';
import store from '../../vuex';
import API from '../../utils/apis';
import typeObject from '../../utils/typeObject';

export default {
  name: 'app-sxjg',
  components: {
    commonLists,
    loadmore,
    noResult
  },
  data(){
    return {
      isLoadMoreShow: false,
      isShowList: false,
      isShowNoData: false,
      resConfigs: {
        text: '当前筛选条件无结果'
      }
    }
  },
  computed:{
    ...mapState({
      filter:state=>state.xmsxModule.filter,
      searchText:state=>state.curProject.searchText,
      reffer:state=>state.curProject.reffer,
      tableTitle:state=>state.filterByTable.refferTitle,
      tableText:state=>state.filterByTable.tableText,
      tableMonth:state=>state.filterByTable.tableMonth,
      configs:function(state){
        return {
          type: state.filterProjectModule.type,
          list: state.filterProjectModule.projectList,
          isCanLoad: false
        }
      },
      loadConfigs: function (state){
        return {
          type: 'filterProject',
          descritText: state.filterProjectModule.descritText
        }
      },
      isback:state=>state.filterProjectModule.isback
    })
  },
  mounted(){

    let _this = this,
        {centerId, departId, projectId, stateId, riskId, typeId} = this.filter,
        URL,
        params;
    switch(this.reffer){
      case 'filter':
        URL = API('filterResult');
        params = {
          centerId,
          departmentId: departId,
          projectTypeId: typeId,
          processId: stateId,
          riskTypeId: riskId,
          projectStatusId:projectId
        };
        break;
      case 'search':
        URL = API('searchResult');
        params = {
          projectName: _this.searchText
        };
        break;
      case 'table':
        URL = API('filterByTable');
        let left  = _this.tableMonth.replace(/&amp;/g, '&');
        params = {
          type: typeObject[_this.tableTitle],
          top: _this.tableText,
          left
        };
        break;
    }
    this.$http.get(URL, {
      params
    }).then(function (data){
      if(data.data.success){
        let filterResult = data.data.data;
        if(!filterResult.length){
          _this.isShowList = false;
          _this.isShowNoData = true;
        }else{
          _this.isShowList = true;
          _this.isShowNoData = false;
          _this.isLoadMoreShow = filterResult.length > 20 ? true : false;
          if(_this.$route.name != 'xmxq' && !_this.isback){
            store.dispatch('initProjectState');
          }
          store.dispatch('setProjectAllList', filterResult);
        }
      }else{
        if(_this.reffer == 'filter'){
          _this.isShowList = false;
          _this.isShowNoData = true;
          _this.isLoadMoreShow = false;
        }else if(_this.reffer == 'search'){
          _this.$router.replace({path: '/xmsx/ssjg'});
        }else{
          console.log('应该不会走这里');
        }
      }
    });
    window.onscroll = function (){
      if(_this.$route.name == 'sxjg'){
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
          localStorage.setItem('scrolltop2', scrollTop);
        }
      }
    }
    if(_this.$route.name == 'sxjg'){
      if(window.localStorage && localStorage.scrolltop2){
        setTimeout(function (){
          document.body.scrollTop = parseInt(localStorage.getItem('scrolltop2'));
        }, 300);
      }
    }
  },
  beforeRouteLeave(to,from,next){
    next()
  }
}
</script>
