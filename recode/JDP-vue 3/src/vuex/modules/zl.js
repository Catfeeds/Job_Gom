import Vue from 'vue';
import echarts from 'echarts';
import store from '../../vuex';

import getApis from '@/utils/apis.js';
import initTotle from '@/utils/initTotle.js';
import getTabData from '@/utils/getTabData.js';
import getTabTime from '@/utils/getTabTime.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';
import getLegend from '@/utils/getLegend.js';
import getTabTitle from '@/utils/tableTitle.js';

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
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
      },
      legend: {
          data:['规划项目数量','部门项目数量'],
          bottom:0,
          itemWidth: 12,
          itemHeight: 12,
          itemGap:40,
          icon: 'stack',
          left: 55,
          align:'left',
          textStyle: {
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular'
        }
      },
      xAxis: {
        type: 'category',
        data: ["monthData"],
        axisPointer: {
            type: 'shadow'
        },
        axisTick:{
          show:false
        },
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
          max: 100,
          interval: 20,
          axisTick:{
            show:false
          },
          splitLine:{
              show:false
          },
          axisLabel: {
              formatter: '{value}',
              textStyle:{
                fontSize:12
              }
          }
      },
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
              barWidth:10
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
              barWidth:10
          }
      ]
  },
  //表格数据
  zlTableConfigs: {
    showDMW:false,//是否展示图表的月/周/日
    noSlide:true,//表格是否可滑动
    topTitles:getTabTitle('zl'),//表格上面头部
    daLists:[]
  }
};

const mutations = {
  //获取echarts数据
  getZlEchartsData(state, data) {
      var resData = data.data;

      var monthData = [],
          planData = [],
          sectionData = [];

      let arr = resData.data.map((item, index) => {
         item.lists = [item.lists[0],item.lists[1]];
         return {lists: item.lists, name: item.name}
      }).forEach((item, index) => {
        monthData.push(item.name);
        planData.push(item.lists[0]);
        sectionData.push(item.lists[1]);
      })
      monthData.push(monthData);

     state.zlOption.xAxis.data = getXscale(monthData, ['.', '\n']);
     state.zlOption.yAxis.max = getYscale(resData.data, 'lists').max;
     state.zlOption.yAxis.interval = getYscale(resData.data, 'lists').interval;
     state.zlOption.series[0].data = planData;
     state.zlOption.series[1].data = sectionData;

     var zlEharts = echarts.init(document.querySelector('#echarts'));
     zlEharts.setOption(state.zlOption);
  },
  //获取表格数据
  getZlTableData(state, date) {
	    Vue.$http.get(getApis('total')).then(function(data) {
       var da = data.data.data;
		   var totleData = {
		   	title:"总数",
		   	data:initTotle(da)
		   }
	      var tableData = getTabData(da,totleData);

        tableData = getTabTime(tableData);

	      state.zlTableConfigs.daLists = tableData;

        store.dispatch('getZlEchartsData', data);
	    })
  }
};

const actions = {
  getZlEchartsData(store, data) {
    store.commit('getZlEchartsData', data);
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
