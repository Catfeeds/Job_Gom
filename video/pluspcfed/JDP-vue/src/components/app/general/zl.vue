<template>
  <commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../../widget/commonCharts';
import {mapState} from 'vuex';
export default {
  name: 'app-zl',
  computed:{
    ...mapState({
      configs:state=>state.zlModule.zlTableConfigs,
      option:state=>state.zlModule.zlOption,
    })
  },
  components:{commonCharts},
  created(){
    this.$store.dispatch('getZlTableData');
  },
  mounted(){
  }
}
</script>
