import Vue from 'vue';
import echarts from 'echarts';

import getTabData from '@/utils/getTabData.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';
const state = {
  //echarts图数据
  xmztOption: {
	    grid: {
	      left: 60,
	      bottom: 140
	    },
	    tooltip: {
	      trigger: 'axis'
	    },
	    legend: {
	      data: ['需求阶段', '设计阶段', '开发阶段', '测试阶段', '上线阶段'],
	      bottom: 0,
	      itemWidth: 18,
	      itemHeight: 18,
	      icon: 'stack',
	      left: 30,
	      itemGap: 20,
	      align: 'left',
	      textStyle: {
	        fontSize: 20,
	        fontFamily: 'PingFangSC-Regular'
	      }
	    },
	    xAxis: {
	      type: 'category',
	      boundaryGap: false,
	      data: []
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
  },
  //表格数据
  xmztTableConfigs: {
      	isZT:true,//是不是项目状态页
        showDMW:true,//是否展示图表的月/周/日
        topTitles:['部门','未启动','正常进行','已延期','部分上线','暂停/取消','已上线'],//表格上面头部
        daLists:[]  
      }
};

const mutations = {
  //获取echarts数据
  getXmztEchartsData(state, date) {
	    var api = '';
	    //判断日、周、月，请求不同接口
	    switch (date) {
	      case 'day':
	        api = 'processDay';
	        break;
	      case 'week':
	        api = 'processWeek';
	        break;
	      case 'month':
	        api = 'processMonth';
	    };

	    Vue.$http.get(api).then(function(data) {
	      var da = data.data.data;
	      var scaleDa = da.scale;
	      var listsDa = da.lists;
	      //重置echarts的option
  	      state.xmztOption.xAxis.data = getXscale(scaleDa);
	      state.xmztOption.yAxis.max = getYscale(listsDa).max;
	      state.xmztOption.yAxis.interval = getYscale(listsDa).interval;
	      state.xmztOption.series = handleSeries(da.lists);
	      var ztEharts = echarts.init(document.querySelector('#echarts'));
    	  ztEharts.setOption(state.xmztOption)
	    })
  },
  //获取表格数据
  getXmztTableData(state, date) {
	    Vue.$http.get('processTab').then(function(data) {
	       var da = data.data.data;
		   var totleData = {
		   	title:"总数",
		   	data:[0,0,0,0,0,0]
		   }
	      var tableData = getTabData(da,totleData);
	      state.xmztTableConfigs.daLists = tableData;
	    })
  }
};

const actions = {
  getXmztEchartsData(store, date) {
    store.commit('getXmztEchartsData', date);
  },
  getXmztTableData(store) {
    store.commit('getXmztTableData')
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
