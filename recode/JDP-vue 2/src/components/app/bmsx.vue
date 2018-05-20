<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
import { mapState } from 'vuex';
import store from '../../vuex';
export default {
  name: 'app-zl',
  data () {
    return {
      departments: [],
      configs: {
        type: 'memberList',
        list: []
      }
    }
  },
  components: {
    commonLists
  },
  computed: mapState([
    'filterTypeList'
  ]),
  created(){
    let cid = this.$route.params.cid,
      {centerName, id} = this.$route.query,
      centerList = store._modules.root.state.xmsxData.filterTypeList.center,
      curCenter = centerList.find( v => v.centerId == cid);
    //this.configs.list = [];
    curCenter.departmentData.forEach( (v, i) => {
      this.configs.list.push({
        text: v.departmentName,
        to: '/xmsx?centerId='+ cid +'&departId='+ v.departmentId + '&centerName='+ centerName + '&departName=' + v.departmentName + '&id=' + id
      });
    });
  }
}
</script>
