<template>
  <div class="main">
    <div class="nav-list">
      <div class="search-head">
        <span @click="tab(1)" :class="{filter:true, on:showFilter}">筛选</span>
        <span @click="tab(0)" :class="{search:true, on:showSearch}">搜索</span>
      </div>
      <div class="clips"></div>
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
              <em class="icon iconn-4"></em>
              <input type="text" placeholder="请输入项目名称" v-model="searchText" />
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
import commonLists from '../widget/commonLists';
import { mapState } from 'vuex';
import store from '../../vuex';
export default {
  name: 'xmsx',
  data () {
    return {
      showFilter: true,
      showSearch: false,
      searchText: '',
      filterData: '',
      configs: {
        type: 'listNav',
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
      }
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
      if(this.searchText){
        this.$router.push({path:'/xmsx/xmxq'});
      }
    },
    toFilter(){
      if(this.filterData){
        this.$router.push({path:'/xmsx/sxjg'});
      }
    }
  },
  computed: mapState([
    'visited'
  ]),
  components: {
    commonLists
  },
  mounted(){
    let isVisited = store._modules.root.state.visited,
        filter = store._modules.root.state.filter,
        {centerId, centerName, departId, departName, id, text, choiceId} = this.$route.query;
    // 访问过了
    if(isVisited){
      console.log('访问过了');
      // 根据选中选项给 vuex 赋值
      switch(parseInt(id)){
        case 1:
          store.commit('filterCenter', {
            centerName,
            centerId,
            departId,
            departName,
            filterCenter: true
          });
          break;
        case 2:
          store.commit('filterType', {
            typeId: choiceId,
            typeName: text,
            filterType: true
          });
          break;
        case 3:
          store.commit('filterState', {
            stateId: choiceId,
            stateName: text,
            filterState: true,
          });
          break;
        case 4:
          store.commit('filterRisk', {
            riskId: choiceId,
            riskName: text,
            filterRisk: true,
          });
          break;
        case 5:
          store.commit('filterProject', {
            projectId: choiceId,
            projectName: text,
            filterProject: true
          });
          break;
      }
      /*if(id == 1){

      }else{

      }*/
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
      ],
          _this = this;

      //_this.configs.list = [];
      filterMaps.forEach( (item, i) => {
        if(i == 0){
          if(filter[item.key]){
            _this.configs.list[i].choiceText = filter[item.value[0]] + '/' + filter[item.value[1]];
          }
        }else{
          if(filter[item.key]){
            _this.configs.list[i].choiceText = filter[item.value];
          }
        }
      });
      // 判断是否已经选中条件
      let flag = [filter.filterCenter, filter.filterCenter, filter.filterCenter, filter.filterCenter, filter.filterCenter].some(item => item);
      if(flag){
        this.filterData = true;
      }
    }else{
      this.$router.push({path:'/xmsx'});
      console.log('nonooooo');
      store.commit('changeVisited');
      this.$http.get('/api/filterType').then(function (data){
        if(data.data.success){
          store.commit('getXmsxData', data.data.data);
        }else{
          console.log('error');
        }
      },function (err){
        console.log(err);
      });
    }
  }
}
</script>
