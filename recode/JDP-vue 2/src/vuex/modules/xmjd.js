import Vue from 'vue';

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
//处理table表格数据
function handleTable(data) {
  var daLists = [];
  for (var i = 0, len = data.length; i < len; i++) {
  	//单行表格渲染数据格式
  	var listItem = {title:data[i].centerName,data:[0,0,0,0,0,0]};
  	var processAry = data[i].process
  	//处理单行数据的排序问题
  	for(var j = 0,jLen = processAry;j < jLen; j++){
  		var num = processAry[j].processData;
  		switch (processAry[j].processName){
  			case '需求':
  			listItem.data[0] = num;
  			break;
  			case '设计':
  			listItem.data[1] = num;
  			break;
  			case '开发':
  			listItem.data[2] = num;
  			break;
  			case '测试':
  			listItem.data[3] = num;
  			break;
  			case '上线':
  			listItem.data[4] = num;
  			break;
  			case '项目总数':
  			listItem.data[5] = num;
  			break;
  		}
  	}
  	daLists.push(listItem)
  }
  return daLists;
}
const state = {
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
  tableConfigs: {
        showDMW:true,//是否展示图表的月/周/日
        topTitles:['部门','需求','设计','开发','测试','上线','项目总数'],//表格上面头部
        daLists:[{title:'大数据中心',data:[6,6,6,6,6,6]},//表格title为左侧头部
        {title:'技术中心',data:[6,6,6,6,6,6]},
        {title:'架构部',data:[6,6,6,6,6,6]},
        {title:'商城技术部',data:[6,6,6,6,6,6]},
        {title:'基础支持中心',data:[6,6,6,6,6,6]},
        {title:'总数',data:[6,6,6,6,6,6]}]  
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
  getTableData(state, date) {
	    Vue.$http.get('url').then(function(data) {
	      var da = data.data;
	      var tableData = handleTable(da);
	      state.tableConfigs.daLists = tableData;
	    })
  }
};

const actions = {
  getEchartsData(store, date) {
    store.commit('getEchartsData', date);
  },
  getTableData(store) {
    store.commit('getTableData')
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
