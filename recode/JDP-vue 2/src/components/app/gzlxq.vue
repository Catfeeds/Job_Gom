1<template>
<commonCharts :configs="configs"></commonCharts>
</template>

<script>
import echarts from 'echarts';
import commonCharts from '../widget/commonCharts';
  export default {
    name: 'app-jdrws',
    data(){
      return {
        configs:{}
      }
    },
    components:{commonCharts},
    created() {
      var id = this.$route.params.id;
      if(id == 1){
        this.configs = {
          showDMW:true,//是否展示图表的月/周/日
          topTitles:['部门','需求','设计','开发','测试','上线','总人天数'],//表格上面头部
          daLists:[{title:'大数据中心',data:[6,6,6,6,6,6]},//表格title为左侧头部
          {title:'技术中心',data:[6,6,6,6,6,6]},
          {title:'架构部',data:[6,6,6,6,6,6]},
          {title:'商城技术部',data:[6,6,6,6,6,6]},
          {title:'基础支持中心',data:[6,6,6,6,6,6]},
          {title:'人天数合计',data:[6,6,6,6,6,6]}]  
        }
      }else if(id == 2){
        this.configs = {
          showDMW:false,//是否展示图表的月/周/日
          topTitles:['部门','需求','设计','开发','测试','上线','总人数'],//表格上面头部
          daLists:[{title:'大数据中心',data:[6,6,6,6,6,6]},//表格title为左侧头部
          {title:'技术中心',data:[6,6,6,6,6,6]},
          {title:'架构部',data:[6,6,6,6,6,6]},
          {title:'商城技术部',data:[6,6,6,6,6,6]},
          {title:'基础支持中心',data:[6,6,6,6,6,6]},
          {title:'人数合计',data:[6,6,6,6,6,6]}]  
        }
      }else{
        this.configs = {
          showDMW:false,//是否展示图表的月/周/日
          topTitles:['部门','需求','设计','开发','测试','上线','总任务数'],//表格上面头部
          daLists:[{title:'大数据中心',data:[6,6,6,6,6,6]},//表格title为左侧头部
          {title:'技术中心',data:[6,6,6,6,6,6]},
          {title:'架构部',data:[6,6,6,6,6,6]},
          {title:'商城技术部',data:[6,6,6,6,6,6]},
          {title:'基础支持中心',data:[6,6,6,6,6,6]},
          {title:'任务数合计',data:[6,6,6,6,6,6]}] 
        }
      }
    },
    mounted:function(){
      var gzlEharts = echarts.init(document.querySelector('#echarts'));
      var option = {
        grid:{
          left:60,
          bottom:140      
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['需求阶段','设计阶段','开发阶段','测试阶段','上线阶段'],
          bottom:0,
          itemWidth:18,
          itemHeight:18,
          icon:'stack',
          left:30,
          itemGap:20,
          align:'left',
          textStyle:{
            fontSize:20,
            fontFamily:'PingFangSC-Regular'
          }
        },
        xAxis: {
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
                name:'需求阶段',
                type:'line',
                data:[1, 2, 5, 3, 2, 10]
            },
            {
                name:'设计阶段',
                type:'line',
                data:[1, 6, 1, 5, 3, 2]
            },
            {
                name:'开发阶段',
                type:'line',
                data:[1, 1, 2, 5, 3, 2]
            },
            {
                name:'测试阶段',
                type:'line',
                data:[1, 2, 2, 5, 3, 2]
            },
            {
                name:'上线阶段',
                type:'line',
                data:[1, 3, 2, 5, 3, 2]
            }
        ]
      };
      gzlEharts.setOption(option)
    }
  }
</script>
