<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
    </div>
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
import { mapState } from 'vuex';
import store from '../../vuex';
export default {
  name: 'app-lxxx',
  data () {
    return {
      configs: {
        type: 'listNav',
        list: []
      }
    }
  },
  computed: mapState([
    'filterTypeList'
  ]),
  created(){
    let id = this.$route.params.id,
        filterTypeList = store._modules.root.state.xmsxData.filterTypeList,
        arr = [],
        keys = ['center', 'projectType', 'process', 'riskType', 'projectStatus'];
    arr = filterTypeList[keys[id - 1]];
    if(id == 1){
      arr = Object.keys(arr).map(function(item){
        return arr[item];
      });
      //this.configs.list = [];
      arr.forEach( (v, i) => {
        this.configs.list.push({
          text: v.centerName,
          to: '/xmsx/option/1/'+ v.centerId + '?centerName=' + v.centerName + '&id=' + id
        });
      });
    }else{
      this.configs.type = 'listNav2';
      arr = Object.keys(arr).map(function(item){
        return arr[item];
      });
      //this.configs.list = [];
      arr.forEach( (v, i) => {
        this.configs.list.push({
          text: v[Object.keys(v)[1]],
          to: '/xmsx?id=' + id + '&text='+ v[Object.keys(v)[1]] +'&choiceId=' + v[Object.keys(v)[0]]
        });
      });
    }
  },
  components: {
    commonLists
  }
}
/*
http://10.112.170.139:9090/mock/59880fce588f7c09fde7578b/api/filterResult
http://10.112.170.139:9090/mock/59880fce588f7c09fde7578b//filterresult

centerId
departmentId
projectTypeId
processId
riskTypeId
projectStatusId*/
</script>