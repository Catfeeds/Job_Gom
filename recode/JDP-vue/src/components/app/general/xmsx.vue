<template>
  <div class="main">
    <div class="nav-list">
      <!-- <div class="search-head">
        <span @click="tab(1)" :class="{filter:true, on:showFilter}">筛选</span>
        <span @click="tab(0)" :class="{search:true, on:showSearch}">搜索</span>
      </div> -->
      <!-- <div class="clips"></div> -->
      <div class="content-box">
        <div class="switch-item" v-show="showFilter">
          <commonLists :configs="configs"></commonLists>
          <div class="btn-box">
            <button :class="{filterBtn:true, on:filterData}" @click="toFilter">筛选</button>
          </div>
        </div>
        <div class="switch-item" v-show="showSearch">
          <ul>
            <li class="search-li">
              <label for="searchText"><em class="icon iconn-4"></em></label>
              <input type="text" placeholder="请输入项目名称" v-model="searchText" id="searchText" />
            </li>
          </ul>
          <div class="btn-box">
            <button :class="{searchBtn:true, on:searchText}" @click="toSearch">搜索</button>
          </div>
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
export default {
  name: 'xmsx',
  data () {
    return {
      showFilter: true,
      showSearch: false,
      searchText: '',
      filterData: false,
      configs: {
        type: 'xmsx',
        list: [
          {
            to: '/xmsx/option/1',
            text: '选择中心/部门'
          },
          {
            to: '/xmsx/option/2',
            text: '选择类型'
          },
          {
            to: '/xmsx/option/3',
            text: '选择阶段'
          },
          {
            to: '/xmsx/option/4',
            text: '选择风险类型'
          },
          {
            to: '/xmsx/option/5',
            text: '选择状态类型'
          },
        ]
      },
      isBackMain: false
    }
  },
  methods: {
    tab(n){
      if(n){
        this.showFilter = true;
        this.showSearch = false;
      }else{
        this.showFilter = false;
        this.showSearch = true;
      }
    },
    toSearch(){
      let _this = this;
      if(this.searchText){
        this.filterData = false;
        store.commit('setReffer', 'search');
        store.commit('setSearchText', _this.searchText);
        store.commit('initFilterData');
        store.commit('initProjectState');
        store.commit('setTurnToDetail', true);
        this.searchText = '';
        this.$router.push({path:'/xmsx/sxjg'});
      }
    },
    toFilter(){
      if(this.filterData){
        // store.commit('isSearchShow', 0);
        store.commit('setIsZxReferer', false);
        store.commit('initProjectState');
        store.commit('setReffer', 'filter');
        store.commit('setTurnToDetail', true);
        this.$router.push({path:'/xmsx/sxjg'});
      }
    }
  },
  computed:{
    ...mapState({
      visited:state=>state.xmsxModule.visited,
      xmsxData:state=>state.xmsxModule.xmsxData,
      isVisited:state=>state.xmsxModule.visited,
      filter:state=>state.xmsxModule.filter,
      projectName:state=>state.curProject.curName
    })
  },
  components: {
    commonLists
  },
  created(){
    let _this = this,
        {centerId, centerName, departId, departName, id, text, choiceId} = this.$route.query;
    // 访问过了
    if(this.isVisited){
      let filter = _this.filter;
      _this.configs.type = 'xmsxVisited';
      // console.log('访问过了, 这个日志请忽略 勿删');
      // 根据 vuex 的值 给页面填充选定文字
      let filterMaps = [
        {
          "key": "filterCenter",
          "value": ["centerName", "departName"],
        },
        {
          "key": "filterType",
          "value": "typeName"
        },
        {
          "key": "filterState",
          "value": "stateName"
        },
        {
          "key": "filterRisk",
          "value": "riskName"
        },
        {
          "key": "filterProject",
          "value": "projectName"
        }
      ];
      filterMaps.forEach( (item, i) => {
        if(i == 0){
          if(filter[item.key]){
            _this.configs.list[i].choiceCenter = filter[item.value[0]];
            _this.configs.list[i].choiceDepart = filter[item.value[1]];
          }
        }else{
          if(filter[item.key]){
            _this.configs.list[i].choiceText = filter[item.value];
          }
        }
      });
      // 判断是否已经选中条件
      let flag = [filter.filterCenter, filter.filterDepartment, filter.filterProject, filter.filterRisk, filter.filterState, filter.filterType].some(item => item);
      if(flag){
        _this.filterData = true;
      }
    }else{
      this.$router.replace({path:'/xmsx'});
      // console.log('第一次访问, 这个日志请忽略 勿删');
      store.commit('changeVisited');
      this.$http.get(API('filterType')).then(function (data){
        if(data.data.success){
          store.commit('getXmsxData', data.data.data);
        }else{
          console.log('error');
        }
      },function (err){
        console.log(err);
      });
    }
    window.onpopstate = function (){
      if(/xmsx\/option\/\d(\/\d+)?/.test(_this.$route.path)){
        if(_this.isBackIndex){
          window.location.href = _this.$store.state.curProject.mainReffer;
        }else if(_this.isBackMain){
          _this.$router.push({path:'/api/projectCnt'});
          _this.isBackIndex = true;
        }else{
          _this.isBackMain = true;
          _this.$router.push({path:'/main'});
        }
      }
    };
  }
}
</script>
