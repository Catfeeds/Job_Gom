import Vue from 'vue';
import echarts from 'echarts';

import getApi from '@/utils/apis.js'
import getTabData from '@/utils/getTabData.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';
import getLegend from '@/utils/getLegend.js';
import initTotle from '@/utils/initTotle.js';
import handleDate from '@/utils/handleDate.js';
import defaultOpts from '@/utils/defaultOpts.js';
import getTabTitle from '@/utils/tableTitle.js';

const state = {
  //echarts图数据
  lxOption: defaultOpts,
  fxOption: defaultOpts,
  //表格数据
  lxTableConfigs:{
  		noSlide:true,
	    showDMW:true,//是否展示图表的月/周/日
     	showTip:true,
     	tips:'半年内的各类型项目数统计',
	    topTitles:getTabTitle('xmlx_lx'),//表格上面头部
	    daLists:[]
  },
  fxTableConfigs:{
	    showDMW:true,//是否展示图表的月/周/日
     	showTip:true,
     	tips:'半年内的各风险类型项目数统计',
	    topTitles:getTabTitle('xmlx_fx'),//表格上面头部
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
	        api = getApi('typeDay');
	        break;
	      case 'week':
	        api = getApi('typeWeek');
	        break;
	      case 'month':
	        api = getApi('typeMonth');
	    };

	    Vue.$http.get(api).then(function(data) {
	    	if(!data.data.success) return;
	      var da = data.data.data;
	      var scaleDa = da.scale;
	      var listsDa = da.lists;
	      //重置echarts的option
	      state.lxOption.legend.itemGap = 30;

	      scaleDa = handleDate(scaleDa,date);
	      state.lxOption.xAxis.data = getXscale(scaleDa);
	      state.lxOption.yAxis.max = getYscale(listsDa).max;
	      state.lxOption.yAxis.interval = getYscale(listsDa).interval;
	      state.lxOption.series = handleSeries(listsDa);
	      state.lxOption.legend.data = getLegend(listsDa);
	      var lxEharts = echarts.init(document.querySelector('#echarts'));
    	  lxEharts.setOption(state.lxOption)
	    })
  	}else{
  		var api = '';
	    //判断日、周、月，请求不同接口
	    switch (date) {
	      case 'day':
	        api = getApi('riskDay');
	        break;
	      case 'week':
	        api = getApi('riskWeek');
	        break;
	      case 'month':
	        api = getApi('riskMonth');
	    };

	    Vue.$http.get(api).then(function(data) {
	    	if(!data.data.success) return;
	      var da = data.data.data;
	      var scaleDa = da.scale;
	      var listsDa = da.lists;
	      //重置echarts的option
	      scaleDa = handleDate(scaleDa,date);
  	      state.fxOption.xAxis.data = getXscale(scaleDa);
	      state.fxOption.yAxis.max = getYscale(listsDa).max;
	      state.fxOption.yAxis.interval = getYscale(listsDa).interval;
	      state.fxOption.series = handleSeries(listsDa);
	      state.fxOption.legend.data = getLegend(listsDa);

	      //设置echarts的legend参数
	      state.fxOption.legend.itemGap = 20;

	      var fxEharts = echarts.init(document.querySelector('#echarts'));
    	  fxEharts.setOption(state.fxOption)
	    })
  	}
  },
  //获取表格数据
  getXmlxTableData(state, data) {
  	if(data == 'lxfx'){
  		Vue.$http.get(getApi('typetab')).then(function(data) {
  			if(!data || !data.data || !data.data.success) return;
       		var da = data.data.data;
		   var totleData = {
		   	title:"总数",
		   	data:initTotle(da)
		   }
	      var tableData = getTabData(da,totleData);
	      state.lxTableConfigs.daLists = tableData;
	    })
  	}else{
	    Vue.$http.get(getApi('risktab')).then(function(data) {
	    	if(!data || !data.data || !data.data.success) return;
        	var da = data.data.data;
		    var totleData = {
			   	title:"总数",
			   	data:initTotle(da)
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
