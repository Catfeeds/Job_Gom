<template>
<commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../widget/commonCharts';
export default {
  name: 'app-lxxq',
  data(){
    return{
      configs:{}
    }
  },
  components:{commonCharts},
  created:function(){
    var params = this.$route.params.id;
    this.$store.dispatch('getXmlxTableData',params);
    if(params == 'lxfx'){
      this.configs = this.$store.state.xmlxModule.lxTableConfigs;
    }else{
      this.configs = this.$store.state.xmlxModule.fxTableConfigs;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>
