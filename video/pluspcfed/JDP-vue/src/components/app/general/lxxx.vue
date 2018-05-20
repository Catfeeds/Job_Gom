<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
    </div>
  </div>
</template>
<script>
import commonLists from '../../widget/commonLists';
import { mapState } from 'vuex';
import store from '../../../vuex';
export default {
  name: 'app-lxxx',
  data () {
    return {
      configs: {
        type: 'lxxx',
        list: []
      }
    }
  },
  computed:{
    ...mapState({
      filterTypeList:state=>state.xmsxModule.xmsxData.filterTypeList,
      xmsxData:state=>state.xmsxModule.xmsxData,
      isVisited:state=>state.xmsxModule.visited,
      filter:state=>state.xmsxModule.filter
    })
  },
  created(){
    let id = this.$route.params.id,
        filterTypeList = this.filterTypeList,
        keys = ['center', 'projectType', 'process', 'riskType', 'projectStatus'],
        arr = [];
    if(!filterTypeList['center']){
      console.log('没有中心啊');
      return;
    }
    arr = filterTypeList[keys[id - 1]];
    if(id == 1){
      arr = Object.keys(arr).map(function(item){
        return arr[item];
      });
      arr.forEach( (v, i) => {
        this.configs.list.push({
          text: v.centerName,
          to: '/xmsx/option/1/'+ v.centerId + '?centerName=' + v.centerName + '&id=' + id,
          optionsId: id,
          choiceId: v.centerId
        });
      });
    }else{
      arr = Object.keys(arr).map(function(item){
        return arr[item];
      });
      arr.forEach( (v, i) => {
        this.configs.list.push({
          text: v[Object.keys(v)[1]],
          optionsId: id,
          choiceId: v[Object.keys(v)[0]]
        });
      });
    }
  },
  components: {
    commonLists
  }
}
</script>
