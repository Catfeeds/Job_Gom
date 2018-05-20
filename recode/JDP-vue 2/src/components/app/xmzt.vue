<template>
 <commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../widget/commonCharts';
export default {
  name:'app-xmzt',
  data(){
  	return{
      configs:{
      	isZT:true,//是不是项目状态页
        showDMW:true,//是否展示图表的月/周/日
        topTitles:['部门','未启动','正常进行','已延期','部分上线','暂停/取消','已上线'],//表格上面头部
        daLists:[{title:'大数据中心',data:[6,6,6,6,6,6]},//表格title为左侧头部
        {title:'技术中心',data:[6,6,6,6,6,6]},
        {title:'架构部',data:[6,6,6,6,6,6]},
        {title:'商城技术部',data:[6,6,6,6,6,6]},
        {title:'基础支持中心',data:[6,6,6,6,6,6]},
        {title:'总数',data:[6,6,6,6,6,6]}]  
      }
  	}
  },
  components:{commonCharts},
   mounted:function(){
    var ztEharts = echarts.init(document.querySelector('#echarts'));
    var option = {
      grid:{
          left:60,
          bottom:170      
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
        data:['未启动   ','正常进行 ','已延期','部分上线','暂停/取消','已上线'],
        bottom:0,
        itemWidth:18,
        itemHeight:18,
        icon:'stack',
        left:40,
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
              name:'未启动   ',
              type:'line',
              data:[1, 2, 5, 3, 2, 10]
          },
          {
              name:'正常进行 ',
              type:'line',
              data:[1, 6, 1, 5, 3, 9]
          },
          {
              name:'已延期',
              type:'line',
              data:[1, 1, 2, 5, 3, 8]
          },
          {
              name:'部分上线',
              type:'line',
              data:[1, 2, 2, 5, 3, 7]
          },
          {
              name:'暂停/取消',
              type:'line',
              data:[1, 3, 2, 5, 3, 6]
          },
          {
              name:'已上线',
              type:'line',
              data:[1, 3, 2, 5, 3, 5]
          }
      ]
    };
    ztEharts.setOption(option)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
/*@import '../../assets/sass/xmjd.scss';*/
</style>

