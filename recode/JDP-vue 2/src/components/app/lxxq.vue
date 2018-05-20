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
        configs:{},
        option:{}
      }
  },
  components:{commonCharts},
  created:function(){
    var params = this.$route.params.id;
    this.option = {
      grid:{
          left:60,
          bottom:140      
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
        data:['在建工程','战略项目','部门级项目'],
        bottom:0,
        itemWidth:18,
        itemHeight:18,
        icon:'stack',
        itemGap:20,
        align:'left',
        textStyle:{
          fontSize:20,
          fontFamily:'PingFangSC-Regular'
        }
      },
      xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['2017\n07.12','2017\n07.12','2017\n07.12','2017\n07.12','2017\n07.12','2017\n07.12']
      },
      yAxis: {
          type: 'value',
          min: 0,
          max: 10,
          interval: 2,
          axisLabel: {
              formatter: '{value}'
          },
          splitLine:{
              show:false
          },
          axisTick:{
            show:false
          }
      },
      series: [
          {
              name:'在建工程',
              type:'line',
              data:[1, 2, 5, 3, 2, 10]
          },
          {
              name:'战略项目',
              type:'line',
              data:[1, 6, 1, 5, 3, 9]
          },
          {
              name:'部门级项目',
              type:'line',
              data:[1, 1, 2, 5, 3, 8]
          }
      ]
    };
    if(params == 'lxfx'){
      this.configs = {
        showDMW:true,//是否展示图表的月/周/日
        topTitles:['部门','在建工程','战略项目','部门级项目'],//表格上面头部
        daLists:[{title:'大数据中心',data:[6,6,6]},//表格title为左侧头部
        {title:'技术中心',data:[6,6,6]},
        {title:'架构部',data:[6,6,6]},
        {title:'商城技术部',data:[6,6,6]},
        {title:'基础支持中心',data:[6,6,6]},
        {title:'总数',data:[6,6,6]}]  
      }
    }else{
      this.configs = {
        showDMW:true,//是否展示图表的月/周/日
        topTitles:['部门','沟通风险','资源风险','硬件风险','依赖风险','无风险'],//表格上面头部
        daLists:[{title:'大数据中心',data:[6,6,6,6,6]},//表格title为左侧头部
        {title:'技术中心',data:[6,6,6,6,6]},
        {title:'架构部',data:[6,6,6,6,6]},
        {title:'商城技术部',data:[6,6,6,6,6]},
        {title:'基础支持中心',data:[6,6,6,6,6]},
        {title:'总数',data:[6,6,6,6,6]}]  
      }
      let seriesFX = [
          {
              name:'沟通风险',
              type:'line',
              data:[1, 2, 5, 3, 2, 10]
          },
          {
              name:'资源风险',
              type:'line',
              data:[1, 6, 1, 5, 3, 9]
          },
          {
              name:'硬件风险',
              type:'line',
              data:[1, 1, 2, 5, 3, 8]
          },
          {
              name:'依赖风险',
              type:'line',
              data:[1, 6, 1, 5, 3, 9]
          },
          {
              name:'无风险',
              type:'line',
              data:[1, 1, 2, 5, 3, 8]
          }
      ]
      let titles = this.configs.topTitles.concat();
      titles.splice(0,1);
      this.option.legend.data = titles;
      this.option.series = seriesFX;
    }
  },
  mounted:function(){
    var lxEharts = echarts.init(document.querySelector('#echarts'));
    lxEharts.setOption(this.option)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>
