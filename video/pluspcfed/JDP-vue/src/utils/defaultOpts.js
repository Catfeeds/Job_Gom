/*
@des:echarts图初始的option
*/
export default {
    grid: {
      left: 60,
      bottom: 140,
      top:60
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    legend: {
      data: [],
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap:25,
      icon: 'stack',
      left: 40,
      align: 'left',
      textStyle: {
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel:{
        interval:0,
        textStyle:{
          fontSize:12
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 2,
      axisLabel: {
        formatter: '{value}'
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: []
}