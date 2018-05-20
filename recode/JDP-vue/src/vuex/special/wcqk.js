/*
@desc:完成情况module
*/
import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';
import foldChart from '@/utils/foldChart';

const state = {
	showNum:0,//时间段(0为全部，1为过去三个月，2为过去一个月)
	tableTitles:['人员','已完成','未完成','总数'],
	tableLists:[],//table表格数据
	doneChartsOpts: {//饼图数据
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
	        data: ['未完成','已完成'],
	        textStyle: {
		        fontSize: 12,
		        fontFamily: 'PingFangSC-Regular'
	        }
	    },
	    series : [
	        {	
	        	name:'完成情况',
	            type: 'pie',
	            hoverAnimation:false,
	            radius : '70%',
	            center: ['50%', '42%'],
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
	    color:['#F5A623','#5B9CD6']
	},
	everyChartsOpts: {//折叠图数据
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
	        data: ['未完成', '已完成']
	    },
	    grid: {
	        top:0,
	        left:70,
	        right:70
	    },
	    xAxis:  {
	        type: 'value',
	        max:0,
   	        nameTextStyle:{
	        	fontSize:8
	        },
	        name:'专项数',
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
	            name: '未完成',
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
	            name: '已完成',
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
	    color:['#F5A623','#5B9CD6']
	}
}
const mutations = {
	getProStatus(state,data){
        state.tableLists = data.list;
        //饼图数据
		var doneData = [
		{value:data.projectStatus.unfinish, name: '未完成'},
        {value:data.projectStatus.finish, name: '已完成'}];
        state.doneChartsOpts.series[0].data = doneData;
        var done = document.querySelector('#doneCharts');
	    var doneEharts = echarts.init(done);
	    doneEharts.setOption(state.doneChartsOpts);
        // 折叠图数据
        var foldData = foldChart(data.list)
        console.log(foldData)
        state.everyChartsOpts.yAxis.data = foldData.arrY;
        state.everyChartsOpts.series[0].data = foldData.arrUndone;
        state.everyChartsOpts.series[1].data = foldData.arrDone;
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
	getProStatus(context,n){
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
		Vue.$http.get(getApis('proStatus'),{params:{type:dateType}}).then(function(data){
			if(data.data.success){
				context.commit('getProStatus',data.data.data);
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
