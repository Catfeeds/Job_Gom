<template>
 <commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../../widget/commonCharts';
import {mapState} from 'vuex';
export default {
  name:'app-xmzt',
  data(){
  	return{
  	}
  },
  computed:{
    ...mapState({
      configs:state=>state.xmztModule.xmztTableConfigs
    })
  },
  created:function(){
    this.$store.dispatch('getXmztTableData');
  },
  components:{commonCharts}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>
