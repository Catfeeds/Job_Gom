import Vue from 'vue';
import echarts from 'echarts';

import getTabData from '@/utils/getTabData.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';

const state = {
  //echarts图数据
  zlOption: {
      grid:{
          left:60,
          bottom:140
      },
      borderWidth:0,
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              crossStyle: {
                  color: '#579DD1'
              }
          }
      },
      legend: {
          data:['规划项目数量','部门项目数量'],
          bottom:0,
          itemWidth:20,
          itemHeight:20,
          icon:'stack',
          left:40,
          itemGap:20,
          align:'left',
          textStyle:{
            fontSize:20
          }
      },
      xAxis: [
          {
              type: 'category',
              data: ["monthData"],
              axisPointer: {
                  type: 'shadow'
              },
              axisTick:{
                show:false
              }
          }
      ],
      yAxis: [
          {
              type: 'value',
              min: 0,
              max: 100,
              interval: 20,
              axisTick:{
                show:false
              },
              splitLine:{
                  show:false
              },
              axisLabel: {
                  formatter: '{value}'
              }
          }
      ],
      series: [
          {
              name:'规划项目数量',
              type:'bar',
              data:["planData"],
              itemStyle:{
                normal:{
                  color:'#579DD1'
                }
              },
              barWidth:14
          },
          {
              name:'部门项目数量',
              type:'bar',
              data:["sectionData"],
              itemStyle:{
                normal:{
                  color:'#EB7F31'
                }
              },
              barWidth:14
          }
      ]
  },
  //表格数据
  zlTableConfigs: {
    showDMW:false,//是否展示图表的月/周/日
    noSlide:true,
    topTitles:['月份','规划项目数量','部门内部项目数量','合计'],//表格上面头部
    daLists:[]
  }
};

const mutations = {
  //获取echarts数据
  getZlEchartsData(state, date) {
	    var api = '';
	    //判断日、周、月，请求不同接口
	    switch (date) {
	      case 'month':
	        api = 'jira/total/table';
	        break;
	    };

	    Vue.$http.get(api).then(function(data) {
        console.log(data)
	      var resData = data.data;
	      // //开始阶段的数据
	      // var dateDa = da[0].processData;
	      // //x轴数据
	      // var xData = [];
	      // for (var i = 0, len = dateDa.length; i < len; i++) {
	      //   //日期
	      //   var date = dateDa[i].processKey;
	      //   xData.push(handleDate(date));
	      // }
	      // //处理每条折线数据
	      // var seriesData = handleSeries(da);
	      // //重置echarts的option
	      // state.option.xAxis = xData;
	      // state.option.series = seriesData;
          console.log(resData);

          var monthData = [],
              planData = [],
              sectionData = [];

           resData.data.forEach((item, index) => {
             monthData.push(item.name);
             planData.push(item.lists[0]);
             sectionData.push(item.lists[1]);
           })

         console.log(monthData, planData, sectionData);

         state.zlOption.xAxis[0].data = getXscale(monthData, ['.', '\n']);
         state.zlOption.yAxis[0].max = getYscale(resData.data, 'lists').max;
         state.zlOption.yAxis[0].interval = getYscale(resData.data, 'lists').interval;
         state.zlOption.series[0].data = planData;
         state.zlOption.series[1].data = sectionData;

         var zlEharts = echarts.init(document.querySelector('#echarts'));
         zlEharts.setOption(state.zlOption)
          // var zlEharts = echarts.init(document.querySelector('#echarts'));
          // zlEharts.setOption(option)
	    })
  },
  //获取表格数据
  getZlTableData(state, date) {
	    Vue.$http.get('pandecttab').then(function(data) {
	    	console.log(data)
	       var da = data.data.data;
		   var totleData = {
		   	title:"总数",
		   	data:[0,0,0]
		   }
	      var tableData = getTabData(da,totleData);
	      state.zlTableConfigs.daLists = tableData;
	    })
  }
};

const actions = {
  getZlEchartsData(store, date) {
    store.commit('getZlEchartsData', date);
  },
  getZlTableData(store) {
    store.commit('getZlTableData')
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
