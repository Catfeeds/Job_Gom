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
export default {
  name: 'app-sxjg',
  data () {
    return {
      configs: {
        type: 'listNav',
        list: []
      }
    }
  },
  components: {
    commonLists
  },
  mounted(){
    let _this = this;
    this.$http.get('/api/filterResult').then(function (data){
      if(data.data.success){
        let filterResult = data.data.data;
        //_this.configs.list = [];
        filterResult.forEach( (v, i) => {
          _this.configs.list.push({
            text: v.projectName,
            to: '/xmsx/xmxq?projectId='+ v.projectId
          });
        });
      }else{
        console.log('error');
      }
    },function (err){
      console.log(err);
    });
  }
}
</script>
