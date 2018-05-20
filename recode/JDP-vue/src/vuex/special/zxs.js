/*
@desc:专项数module
*/

import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';
import getZxsCharts from '@/utils/getZxsCharts'

const state = {
	showNum:0,//时间段(0为全部，1为过去三个月，2为过去一个月)
	tableLists:[],
	chartsOpts:{
	    backgroundColor: '#fff',
	    color: ['#7BA7A4', '#674C84','#BF5A77', '#D18078','#F7DB88','#86E2E9','#B8E986','#6EABF1'],
	    tooltip : {
	        show: true,
	        backgroundColor:'rgba(0, 0, 0, 0.8)',
	        formatter:function(params){
	        	if(params.name != 'invisible'){
	        		return params.seriesName + "<br/>" + params.name + " : " + params.data.value + "(" + params.percent + "%)"; 
	        	}
	        }
	    },
	    grid:{
	    	top:10
	    },
	    legend: {
	        top:'83%',
	        left: 20,
	        height:10,
	        itemWidth:12,
	        itemHeight:12,
	        itemGap:23,
	        textStyle:{
	        	fontSize:8
	        },
	        formatter: '{name}',
      		icon: 'stack',
	        data:[]
	    },
	    series : []
	}
};

const mutations = {
	getZxData(state,data){
		//table表格数据
		state.tableLists = data;
		//echarts数据
		state.chartsOpts.legend.data = getZxsCharts.getLegend(data);
		state.chartsOpts.series = getZxsCharts.getSeries(data)
		var zxsCharts = document.querySelector('#zxsCharts');
	    var clipsEharts = echarts.init(zxsCharts);
	    clipsEharts.setOption(state.chartsOpts);
	},
	changeDate(state,n){
		state.showNum = n;
	}
};

const actions = {
	getZxData(context,n){
		context.commit('changeDate',n);
		var dateType = 'all';
		switch(n){
	        case 0:
	           dateType = 'all';
	           break;
	        case 1:
	           dateType = 'threeMonths';
	          break;
	        case 2:
	          dateType = 'oneMonth';
	          break;
	     }
		Vue.$http.get(getApis('wholeNum'),{params:{type:dateType}}).then(function(data){
			if(data.data.success){
				context.commit('getZxData',data.data.data)
			}
		})
	}
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
