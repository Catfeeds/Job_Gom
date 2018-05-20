<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
    </div>
  </div>
</template>

<script>
import commonLists from '../widget/commonLists';
import { mapState } from 'vuex'
import store from '../../vuex'
export default {
  name: 'main',
  data () {
    return {
      configs: {
        type: 'main',
        list: [
          {
              to: '/zl',
              iconClass: 'icon iconn-10',
              text: '总览'
            },
            {
              to: '/xmjd',
              iconClass: 'icon iconn-6',
              text: '项目阶段分析'
            },
            {
              to: '/xmzt',
              iconClass: 'icon iconn-9',
              text: '项目状态分析'
            },
            {
              to: '/xmlx',
              iconClass: 'icon iconn-7',
              text: '项目类型分析'
            },
            {
              to: '/gzl',
              iconClass: 'icon iconn-2',
              text: '工作量分析'
            },
            {
              to: '/xmsx',
              iconClass: 'icon iconn-8',
              text: '项目筛选/搜索'
            }
        ]
      }
    }
  },
  components: {
    commonLists
  }
  /*computed: mapState([
    'mainConfigs'
  ]),
  methods: {
    addList: function () {
      store.commit('pushMainList');
    }
  },
  created(){
    this.$http.get('/list/main').then(function (data){
      store.commit('getInitMainList', data.data);
    },function (err){
      console.log(err);
    });
  }*/
}
</script>
<style>
/*.main{
  padding-bottom: 30px;
  background-color: #eee;
}*/
</style>
