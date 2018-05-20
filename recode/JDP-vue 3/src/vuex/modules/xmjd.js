import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';

import initTotle from '@/utils/initTotle.js';
import getTabData from '@/utils/getTabData.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';
import getLegend from '@/utils/getLegend.js';
import handleDate from '@/utils/handleDate.js';
import defaultOpts from '@/utils/defaultOpts.js';
import getTabTitle from '@/utils/tableTitle.js';

const state = {
  //echarts图数据
  xmjdOption: defaultOpts,
  //表格数据
  tableConfigs: {
	    showDMW: true, //是否展示图表的月/周/日
     	tbSty:true,//表格调样式
	    topTitles: getTabTitle('xmjd'), //表格上面头部
	    daLists: []
  }
};

const mutations = {
  //获取echarts数据
  getXmjdEchartsData(state, date) {
	    var api = '';
	    //判断日、周、月，请求不同接口
	    switch (date) {
	      case 'day':
	        api = getApis('phaseDay');
	        break;
	      case 'week':
	        api = getApis('phaseWeek');
	        break;
	      case 'month':
	        api = getApis('phaseMonth');
	    };

	    Vue.$http.get(api).then(function(data) {
	    	if(!data.data.success) return;
	      var da = data.data.data;
	      var scaleDa = da.scale;
	      var listsDa = da.lists;
	      //重置echarts的option
	      scaleDa = handleDate(scaleDa,date);
	      state.xmjdOption.xAxis.data = getXscale(scaleDa);
	      state.xmjdOption.yAxis.max = getYscale(listsDa).max;
	      state.xmjdOption.yAxis.interval = getYscale(listsDa).interval;
	      state.xmjdOption.series = handleSeries(listsDa);
	      state.xmjdOption.legend.data = getLegend(listsDa);
	      var jdEharts = echarts.init(document.querySelector('#echarts'));
    	  jdEharts.setOption(state.xmjdOption)
	    })
  },
  //获取表格数据
  getXmjdTableData(state, date) {
	    Vue.$http.get(getApis('phaseTab')).then(function(data) {
	    	if(!data || !data.data || !data.data.success) return;
	       var da = data.data.data;
		   var totleData = {
		   	title:"总数",
		   	data:initTotle(da)
		   }
	      var tableData = getTabData(da,totleData);
	      state.tableConfigs.daLists = tableData;
	    })
  }
};

const actions = {
  getXmjdEchartsData(store, date) {
    store.commit('getXmjdEchartsData', date);
  },
  getXmjdTableData(store) {
    store.commit('getXmjdTableData');
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
