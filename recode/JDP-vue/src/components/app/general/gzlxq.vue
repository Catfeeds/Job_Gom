1<template>
<commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../../widget/commonCharts';
  export default {
    name: 'app-jdrws',
    data(){
      return {
        configs:{}
      }
    },
    components:{commonCharts},
    created() {
      //渲染工作量下级的三个表格
      var id = this.$route.params.id;
      this.$store.dispatch('getGzlTableData',id);
      if(id == 1){
        this.configs = this.$store.state.gzlxqModule.rtTableConfigs
      }else if(id == 2){
        this.configs = this.$store.state.gzlxqModule.rsTableConfigs
      }else{
        this.configs = this.$store.state.gzlxqModule.rwTableConfigs
      }
    }
  }
</script>
