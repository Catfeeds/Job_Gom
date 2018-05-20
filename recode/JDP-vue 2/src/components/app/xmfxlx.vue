<template>
<commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../widget/commonCharts';
export default {
  name: 'app-xmfxlx',
  data(){
    return{
      configs:{
        showDMW:false,//是否展示图表的月/周/日
        topTitles:['部门','沟通风险','资源风险','硬件风险','依赖风险','无风险'],//表格上面头部
        daLists:[{title:'大数据中心',data:[6,6,6,6,6]},//表格title为左侧头部
        {title:'技术中心',data:[6,6,6,6,6]},
        {title:'架构部',data:[6,6,6,6,6]},
        {title:'商城技术部',data:[6,6,6,6,6]},
        {title:'基础支持中心',data:[6,6,6,6,6]},
        {title:'总数',data:[6,6,6,6,6]}]
      }
    }
  },
  components:{commonCharts},
  mounted:function(){
    var fxlxEharts = echarts.init(document.querySelector('#echarts'));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        backgroundColor: 'rgba(255,245,245, 0.73)',

          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} °C'
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
                  name:'最高气温',
                  type:'line',
                  data:[11, 11, 15, 13, 12, 13, 10]
              },
              {
                  name:'最低气温',
                  type:'line',
                  data:[1, 6, 2, 5, 3, 2, 0]
              }
          ]
        };
    fxlxEharts.setOption(option)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>
