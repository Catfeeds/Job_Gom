/*
@desc:回复状态module
*/
import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';
import replyFoldChart from '@/utils/replyFoldChart.js';

const state = {
	showNum:0,//时间段(0为全部，1为过去三个月，2为过去一个月)
	tableTitles:['人员','已回复','未回复','无需回复','总数'],
	tableLists:[],//表格数据
	//饼图opts
	replyChartsOpts: {
	    tooltip : {
	        trigger: 'item',
	        backgroundColor:'rgba(0, 0, 0, 0.8)',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        bottom: 10,
	        left: 'center',
	        itemWidth:12,
	        itemHeight:12,
	        itemGap:25,
      		icon: 'stack',
	        data: ['已回复','未回复','无需回复'],
	        textStyle: {
		        fontSize: 12,
		        fontFamily: 'PingFangSC-Regular'
	        }
	    },
	    series : [
	        {	
	        	name:'回复状态',
	            type: 'pie',
	            hoverAnimation:false,
	            radius : '70%',
	            center: ['50%', '38%'],
	            label:{
	                normal:{
	                    position:'inner',
	                    formatter:'{d}%',
	                    fontSize:8
	                }  
	            },
	            data:[]
	        }
	    ],
	    color:['#674C84','#BF5A77','#F7DB88']
	},
	//堆叠图opts
	everyChartsOpts: {
	    tooltip : {
	        trigger: 'axis',
	        backgroundColor:'rgba(0, 0, 0, 0.8)',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	    	bottom:0,
	        height:10,
	        itemWidth:12,
	        itemHeight:12,
	        itemGap:25,
      		icon: 'stack',
      		textStyle:{
      			fontSize:8
      		},
	        data: ['已回复','未回复','无需回复'],
	    },
	     grid: {
	        top:10,
	        left:70,
	        right:70
	    },
	    xAxis:  {
	        type: 'value',
	        max:0,
	        name:'专项数',
	        nameTextStyle:{
	        	fontSize:8
	        },
	        nameLocation:'end',
	        splitLine: {
	         show: false
	        },
	         axisTick: {
	         show: false
	        }
	    },
	    yAxis: {
	        type: 'category',
	        axisLabel:{
	        	fontSize:8
	        },
	        splitLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        data: []
	    },
	    series: [
	        {
	            name: '已回复',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            barWidth:12,
	            data: []
	        },
	        {
	            name: '未回复',
	            type: 'bar',
	            stack: '总量',
	            barWidth:18,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data: []
	        },
	        {
	            name: '无需回复',
	            type: 'bar',
	            stack: '总量',
	            barWidth:12,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data: []
	        }
	    ],
	    color:['#674C84','#BF5A77','#F7DB88']
	}
}
const mutations = {
	getReplyStatus(state,data){
		state.tableLists = data.list;
		//回复状态饼图
		var replyData = [
            {value:data.pandect.replied, name: '已回复'},
            {value:data.pandect.noReply, name: '未回复'},
            {value:data.pandect.no, name: '无需回复'}
        ];
        state.replyChartsOpts.series[0].data = replyData;
        var reply = document.querySelector('#replyCharts');
	    var replyEharts = echarts.init(reply);
	    replyEharts.setOption(state.replyChartsOpts);
	    // 折叠图数据
        var foldData = replyFoldChart(data.list)
        state.everyChartsOpts.yAxis.data = foldData.arrY;
        state.everyChartsOpts.series[0].data = foldData.arrReplied;
        state.everyChartsOpts.series[1].data = foldData.arrNoreply;
        state.everyChartsOpts.series[2].data = foldData.arrNoneed;
        state.everyChartsOpts.xAxis.max = foldData.maxX;
        var every = document.querySelector('#everyCharts');
	    var everyCharts = echarts.init(every);
	    everyCharts.setOption(state.everyChartsOpts)
	},
	changeDate(state,n){
		state.showNum = n;
	}
};

const actions = {
	getReplyStatus(context,n){
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
		Vue.$http.get(getApis('replyStatus'),{params:{type:dateType}}).then(function(data){
			if(data.data.success){
				context.commit('getReplyStatus',data.data.data)
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
