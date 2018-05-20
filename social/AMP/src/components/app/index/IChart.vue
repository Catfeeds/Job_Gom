<template>
	<div class="index-map">
		<h2 class="map-title"><span>整体情况</span><i>（以下数据有近三十分钟的统计延迟）</i>
			<el-select v-model="timeScopeType" placeholder="请选择">
				<el-option :label="formatChartTypeDateToday" value="0"></el-option>
				<el-option :label="formatChartTypeDateYesterday" value="1"></el-option>
				<el-option label="过去7天" value="2"></el-option>
				<el-option label="过去30天" value="3"></el-option>
			</el-select>
		</h2>
		<div class="map-data">
			<ul>
				<li><strong>曝光量（次）</strong><span>{{ overAll.impression }}</span></li>
				<li><strong>点击量（次）</strong><span>{{ overAll.click }}</span></li>
				<li><strong>花费（元）</strong><span>{{ overAll.cost }}</span></li>
				<li><strong>平均点击率</strong><span>{{ ctr }}%</span></li>
			</ul>
		</div>
		<div class="map-select">
			<el-select v-model="dataOptions.oneSelected" placeholder="请选择" @change="firstSelectedChanged">
				<el-option v-for="item in dataOptions.one" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="dataOptions.twoSelected" placeholder="请选择">
				<el-option v-for="item in secondOptions" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<div class="map-direct"><span class="direct-view" v-show="isItemShow.impression">曝光量</span><span class="direct-click" v-show="isItemShow.click">点击量</span><span class="direct-cost" v-show="isItemShow.cost">花费</span><span class="direct-ctr" v-show="isItemShow.ctr">平均点击率</span></div>
		</div>
		<div class="map-show">
			<i-chart :lineChartOption="lineChartOption"></i-chart>
		</div>
	</div>
</template>
<script>
	import Axios from 'utils/http';
	import IndexChart from './IndexChart.vue';
	import echarts from 'echarts/lib/echarts';
	import 'echarts/lib/chart/line';
	import 'echarts/lib/component/tooltip';
	export default {
		name:'app-index-chart',
		components: {
			'i-chart': IndexChart
		},
		data() {
			return {
				lineChartOption: null,
				isTimeScopeType: false,
				isImpression:false,
				chartTypeFormat: new Date(),
				timeScopeType: "0",
				overAll: {
					impression: 0,
					click: 0,
					ctr: 0,
					cost:0
				},
				time:{
					starttime:0,
					endtime:0
				},
				charts:{
					xAxis:{
						data:[]
					},
					series:[]
				},
				dataOptions:{
				    oneSelected:'impression',
					twoSelected:'click',
				    one:[{
					value: 'impression',
					label: '曝光量'
				},{
					value: 'click',
					label: '点击量'
				},{
					value: 'ctr',
					label: '平均点击率'
				},{
					value: 'cost',
					label: '花费'
				}]
				}
			};
		},
		created: function() {
			let vm = this;
			vm.lineChartOption = {
				tooltip: {
					trigger: 'axis',
					formatter:function(params){
						let str = params[0].name + "<br/>";
						for(let i = 0;i<params.length;i++){
							if(params[i].seriesName == '点击率'){
								str += params[i].seriesName + ":" + parseFloat(params[i].value * 100).toFixed(2) + "%<br/>";
							}else if(params[i].seriesName == '花费'){
								str += params[i].seriesName + ":" + params[i].value + "元<br/>";
							}else{
								str += params[i].seriesName + ":" + params[i].value + "<br/>";
							}
						}
						return str;
					}
				},
				legend: {
					data:['曝光量','点击量','点击率','花费'],
					show:false,
					selected:{
						'曝光量':true,
						'点击量':true,
						'点击率':false,
						'花费':false
					}
				},
				animation:true,
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: []
				},
				yAxis: [{
					name:'',
					type:'value',
					splitLine: {
						show: false
					}
				},{
					name:'点击率',
					type:'value',
					splitLine: {
						show: false
					}
				}],
				series: [{
					name: '曝光量',
					type: 'line',
					smooth:true,
					lineStyle: {
						normal: {
							color: '#01a9f4'
						}
					},
					itemStyle: {
						normal: {
							color: '#01a9f4'
						}
					},
					data: []
				},{
					name: '点击量',
					type: 'line',
					smooth:true,
					lineStyle: {
						normal: {
							color: '#ffc931'
						}
					},
					itemStyle: {
						normal: {
							color: '#ffc931'
						}
					},
					data: []
				},{
					name: '点击率',
					type: 'line',
					smooth:true,
					yAxisIndex:1,
					lineStyle: {
						normal: {
							color: '#DCA8FF'
						}
					},
					itemStyle: {
						normal: {
							color: '#DCA8FF'
						}
					},
					areaStyle:{
						normal:{
							color: '#DCA8FF',
							opacity:0.5
						}
					},
					data: []
				},{
					name: '花费',
					type: 'line',
					smooth:true,
					lineStyle: {
						normal: {
							color: '#9EFFB9'
						}
					},
					itemStyle: {
						normal: {
							color: '#9EFFB9'
						}
					},
					data: []
				}]
			};
			vm.calcTime();
//			vm.loadReport();
		},
		computed: {
		    secondOptions:function() {
		        return this.dataOptions.one.filter((item) => item.value != this.dataOptions.oneSelected);
		},
			formatChartTypeDateToday: function() {
				let date = this.chartTypeFormat;
				return '今天 ' + date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate();
			},
			formatChartTypeDateYesterday: function() {
				let date = this.chartTypeFormat;
				return '昨天 ' + date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + (date.getDate() - 1);
			},
			cost:function() {
				return this.overAll.cost / 100;
			},
			ctr:function() {
				return (this.overAll.ctr * 100).toFixed(2);
			},
			isItemShow:function() {
				let lineItemShow = {
					impression:this.dataOptions.oneSelected == 'impression' || this.dataOptions.oneSelected == '曝光量' || this.dataOptions.twoSelected == 'impression' || this.dataOptions.twoSelected == '曝光量',
					click:this.dataOptions.oneSelected == 'click' || this.dataOptions.oneSelected == '点击量' || this.dataOptions.twoSelected == 'click' || this.dataOptions.twoSelected == '点击量',
					ctr:this.dataOptions.oneSelected == 'ctr' || this.dataOptions.oneSelected == '点击率' || this.dataOptions.twoSelected == 'ctr' || this.dataOptions.twoSelected == '点击率',
					cost:this.dataOptions.oneSelected == 'cost' || this.dataOptions.oneSelected == '花费' || this.dataOptions.twoSelected == 'cost' || this.dataOptions.twoSelected == '花费'
				};
				return lineItemShow;
			}
		},
		methods: {
			loadReport: function() {
				let vm = this;
				Axios.get('/api/home/report',{params:{starttime:vm.time.starttime,endtime:vm.time.endtime}})
					.then(function(response) {
						let data = response.data;
						if(response.status === 200 && data.code === 200){
							vm.overAll = data.data.overall;
							vm.lineChartOption.xAxis.data = data.data.chart.xAxis.data;
							let series = data.data.chart.series;
							vm.setSeries(series);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			setSeries:function(series) {
				let vm = this;
				for(let i = 0;i<series.length;i++){
					switch (series[i].name){
						case 'impression':{
							vm.lineChartOption.series[0].data = series[i].data;
							break;
						}
						case 'click':{
							vm.lineChartOption.series[1].data = series[i].data;
							break;
						}
						case 'ctr':{
							vm.lineChartOption.series[2].data = series[i].data;
							break;
						}
						case 'cost':{
							vm.lineChartOption.series[3].data = series[i].data;
							break;
						}
					}
				}
			},
			calcTime:function() {
				let startDate = new Date(),endDate = new Date();
				let vm = this;
				startDate.setHours(0);
				startDate.setMinutes(0);
				startDate.setSeconds(0);
				startDate.setMilliseconds(0);
				endDate.setHours(23);
				endDate.setMinutes(59);
				endDate.setSeconds(59);
				endDate.setMilliseconds(999);
				switch (parseInt(vm.timeScopeType)){
				case 0:
					vm.time.starttime = startDate.getTime();
					break;
				case 1:
					startDate.setDate(startDate.getDate() - 1);
					endDate.setDate(endDate.getDate() - 1);
					vm.time.starttime = startDate.getTime();
					break;
				case 2:
					startDate.setDate(startDate.getDate() - 7);
					vm.time.starttime = startDate.getTime();
					break;
				case 3:
					startDate.setDate(startDate.getDate() - 30);
					vm.time.starttime = startDate.getTime();
					break;
				}
				vm.time.endtime = endDate.getTime();
			},
			firstSelectedChanged:function() {
			    let secondSelectOpt = this.secondOptions;
				this.dataOptions.twoSelected = secondSelectOpt[0].label;
				console.log(this.secondOptions);
			}
		},
		watch: {
			'timeScopeType': 'calcTime',
			'time':{
				handler:'loadReport',
				deep:true
			},
			'isItemShow':{
			    handler:function(newItem) {
					this.lineChartOption.legend.selected = {
						'曝光量':newItem.impression,
						'点击量':newItem.click,
						'点击率':newItem.ctr,
						'花费':newItem.cost
					};
				},
				deep:true
			}
		}
	};
</script>
<style scoped>
	.el-select{display:inline-block;width: 200px;margin-right: 20px;}
	.map-title .el-select{float: right}
	.amp-index .index-map .map-select .map-direct span.direct-cost:before {background: #9EFFB9;}
	.amp-index .index-map .map-select .map-direct span.direct-ctr:before {background: #DCA8FF;}
</style>
