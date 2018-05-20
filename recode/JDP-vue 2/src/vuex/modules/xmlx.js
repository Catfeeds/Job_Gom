import Vue from 'vue';
import echarts from 'echarts';
import router from '@/router'

import getTabData from '@/utils/getTabData.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';

const state = {
  //echarts图数据
  lxOption: {
	    grid: {
	      left: 60,
	      bottom: 140
	    },
	    tooltip: {
	      trigger: 'axis'
	    },
	    legend: {
	      data: ['在建工程','战略项目','部门级项目'],
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
  fxOption: {
	    grid: {
	      left: 60,
	      bottom: 140
	    },
	    tooltip: {
	      trigger: 'axis'
	    },
	    legend: {
	      data: ['沟通风险','资源风险','硬件风险','依赖风险','无风险'],
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
  lxTableConfigs:{
    showDMW:true,//是否展示图表的月/周/日
    topTitles:['部门','在建工程','战略项目','部门级项目'],//表格上面头部
    daLists:[]  
  },
  fxTableConfigs:{
    showDMW:true,//是否展示图表的月/周/日
    topTitles:['部门','沟通风险','资源风险','硬件风险','依赖风险','无风险'],//表格上面头部
    daLists:[]  
  }
};

const mutations = {
  //获取echarts数据
  getXmlxEchartsData(state, option) {
  	var param = option.param;
  	var date = option.date;
  	if(param == 'lxfx'){
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
  	      state.lxOption.xAxis.data = getXscale(scaleDa);
	      state.lxOption.yAxis.max = getYscale(listsDa).max;
	      state.lxOption.yAxis.interval = getYscale(listsDa).interval;
	      state.lxOption.series = handleSeries(da.lists);
	      var lxEharts = echarts.init(document.querySelector('#echarts'));
    	  lxEharts.setOption(state.lxOption)
	    })
  	}else{
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
  	      state.fxOption.xAxis.data = getXscale(scaleDa);
	      state.fxOption.yAxis.max = getYscale(listsDa).max;
	      state.fxOption.yAxis.interval = getYscale(listsDa).interval;
	      state.fxOption.series = handleSeries(da.lists);
	      var fxEharts = echarts.init(document.querySelector('#echarts'));
    	  fxEharts.setOption(state.fxOption)
	    })
  	}
    
  },
  //获取表格数据
  getXmlxTableData(state, data) {
  	if(data == 'lxfx'){
  		Vue.$http.get('tasktypetab').then(function(data) {
	       var da = data.data.data;
		   var totleData = {
		   	title:"总数",
		   	data:[0,0,0]
		   }
	      var tableData = getTabData(da,totleData);
	      state.lxTableConfigs.daLists = tableData;
	    })
  	}else{
	    Vue.$http.get('taskrisktypetab').then(function(data) {
	       var da = data.data.data;
		   var totleData = {
			   	title:"总数",
			   	data:[0,0,0,0,0]
			   }
	      var tableData = getTabData(da,totleData);
	      state.fxTableConfigs.daLists = tableData;
	    })
  	}
  }
};

const actions = {
  getXmlxEchartsData(store, date) {
    store.commit('getXmlxEchartsData', date);
  },
  getXmlxTableData(store,data) {
    store.commit('getXmlxTableData',data)
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
