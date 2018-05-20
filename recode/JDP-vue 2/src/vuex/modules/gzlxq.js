import Vue from 'vue';
import getTabData from '@/utils/getTabData.js';

//处理时间
function handleDate(date) {
  return date.replace(/\./, '\n');
}
//处理每条折线数据
function handleSeries(data) {
  var seriesDa = [];
  var seriesItem = {};
  for (var i = 0, len = data.length; i < len; i++) {
    var numAry = [];
    for (var j = 0, jLen = data[i].processData.length; j < jLen; j++) {
      numAry.push(data[i].processData.processValue)
    }
    series = {
      name: data[i].processName,
      type: 'line',
      data: numAry
    };
    seriesDa.push(series)
  }
  return seriesDa;
}
const state = {
  //echarts图数据
  option: {
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
	      data: ['2017\n07.12', '2017\n07.12', '2017\n07.12', '2017\n07.12', '2017\n07.12', '2017\n07.12']
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
	    series: [{
	        name: '需求阶段',
	        type: 'line',
	        data: [1, 2, 5, 3, 2, 10]
	      },
	      {
	        name: '设计阶段',
	        type: 'line',
	        data: [1, 6, 1, 5, 3, 2]
	      },
	      {
	        name: '开发阶段',
	        type: 'line',
	        data: [1, 1, 2, 5, 3, 2]
	      },
	      {
	        name: '测试阶段',
	        type: 'line',
	        data: [1, 2, 2, 5, 3, 2]
	      },
	      {
	        name: '上线阶段',
	        type: 'line',
	        data: [1, 3, 2, 5, 3, 2]
	      }
	    ]
  },
  //表格数据
  rtTableConfigs:{//人天数据
	  showDMW:true,//是否展示图表的月/周/日
	  topTitles:['部门','需求','设计','开发','测试','上线','总人天数'],//表格上面头部
	  daLists:[]  
	},
  rsTableConfigs:{//人数数据
      showDMW:true,//是否展示图表的月/周/日
      topTitles:['部门','需求','设计','开发','测试','上线','总人数'],//表格上面头部
      daLists:[]  
    },
  rwTableConfigs:{//任务数数据
      showDMW:true,//是否展示图表的月/周/日
      topTitles:['部门','需求','设计','开发','测试','上线','总任务数'],//表格上面头部
      daLists:[] 
    }
};

const mutations = {
  //获取echarts数据
  getEchartsData(state, date) {
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
	      var da = data.data;
	      //开始阶段的数据
	      var dateDa = da[0].processData;
	      //x轴数据
	      var xData = [];
	      for (var i = 0, len = dateDa.length; i < len; i++) {
	        //日期
	        var date = dateDa[i].processKey;
	        xData.push(handleDate(date));
	      }
	      //处理每条折线数据
	      var seriesData = handleSeries(da);
	      //重置echarts的option
	      state.option.xAxis = xData;
	      state.option.series = seriesData;
	    })
  },
  //获取表格数据
  getGzlTableData(state, data) {
  	if(data == 1){
  		Vue.$http.get('taskmandaytab').then(function(data) {
	       var da = data.data.data;
		   var totleData = {
		   	title:"人天数合计",
		   	data:[0,0,0,0,0,0]
		   }
	      var tableData = getTabData(da,totleData);
	      state.rtTableConfigs.daLists = tableData;
	    })
  	}else if(data == 2){
  		Vue.$http.get('taskmannumtab').then(function(data) {
	       var da = data.data.data;
		   var totleData = {
		   	title:"人数合计",
		   	data:[0,0,0,0,0,0]
		   }
	      var tableData = getTabData(da,totleData);
	      state.rsTableConfigs.daLists = tableData;
	    })
  	}else{
  		Vue.$http.get('tasknumbertab').then(function(data) {
	       var da = data.data.data;
		   var totleData = {
		   	title:"任务数合计",
		   	data:[0,0,0,0,0,0]
		   }
	      var tableData = getTabData(da,totleData);
	      state.rwTableConfigs.daLists = tableData;
	    })
  	}
  }
};

const actions = {
  getEchartsData(store, date) {
    store.commit('getEchartsData', date);
  },
  getGzlTableData(store,data) {
    store.commit('getGzlTableData',data)
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
