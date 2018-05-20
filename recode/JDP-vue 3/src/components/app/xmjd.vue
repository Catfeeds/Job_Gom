<template>
<commonCharts :configs="configs"></commonCharts>
</template>

<script>
import commonCharts from '../widget/commonCharts';
import {mapState} from 'vuex';
export default {
  name: 'app-xmjd',
  computed:{
    ...mapState({
      configs:state=>state.xmjdModule.tableConfigs
    })
  },
  created:function(){
    this.$store.dispatch('getXmjdTableData');
  },
  components:{commonCharts}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>
