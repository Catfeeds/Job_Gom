<template>
	<div class="">
		<div class="cover-block" style="text-align: center; padding:50px;">
			<div class="detailAvatar" v-echarts="ChartOption.gauge.total"></div>
			<div class="">
				<h3>{{taskinfo.url}}</h3>
			</div>
			<div class="proj-desc">
				<p>{{siteinfo.documentTitle}}</p>
			</div>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">详情</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<legend>基本信息：</legend>
					
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							创建者：
						</label>
						<div class="col-sm-10">
							<input class="form-control" readonly value="{{taskinfo.user?taskinfo.user.TN:'匿名'}}">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建时间：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="taskinfo._createdAt | Date 'yyyy-MM-dd'">
						</div>
					</div>



					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							更新时间：
						</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="taskinfo._updatedAt | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							设备类型：
						</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{taskinfo.deviceType===0?'手机':'PC'}}">
							</div>
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							连接方式：
						</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{taskinfo.connectivity===0?'本地':info.connectivity}}">
							</div>
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							状态：
						</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{taskinfo.state===1?'存在报告':'无报告'}}">
							</div>
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							描述：
						</label>
						<div>
							<div class="col-sm-10">
								<textarea class="form-control" rows="3" readonly value="">{{taskinfo.description}}</textarea>
							</div>
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							截图：
						</label>
						<div>
							<div class="col-sm-10">
								<img class="screenshot" v-for="item in screenshots" src="{{item}}" />
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>插件详情：</legend>
					<div>
					  <table class="table plugtable">
						<tr v-for="subArray in plugArray">
							<th v-for="item in subArray" class="{{item.value?'th-highlight':'th-normal'}}">{{item.key}}
								</th>
						</tr>
					   </table>
					</div>
				</fieldset>


			<template v-if="taskinfo.state===1">
				<fieldset>
					<legend>站点信息：</legend>
					<div>
						<table class="table infotable">
							<tr>
								<th colspan="8" class="title">
								总体结构
								</th>
							</tr>
							<tr>
								<th>文档宽度</th>
								<td>{{siteinfo.documentWidth}}</td>
								<th>文档高度</th>
								<td>{{siteinfo.documentHeight}}</td>
								<th>DOM元素数</th>
								<td>{{siteinfo.domElements}}</td>
								<th>iframes数</th>
								<td>{{siteinfo.iframes}}</td>
							</tr>
							<tr>
								<th>dom平均深度</th>
								<td>{{siteinfo.domDepth.avg}}</td>
								<th>dom最大深度</th>
								<td>{{siteinfo.domDepth.max}}</td>
								<th>响应式</th>
								<td>{{siteinfo.responsive}}</td>
								<th>窗口尺寸</th>
								<td>{{siteinfo.windowSize}}</td>
							</tr>
							
							<tr>
								<th colspan="8" class="title">
								请求情况
								</th>
							</tr>
							<tr>
								<th>连接类型</th>
								<td>{{siteinfo.connectionType}}</td>
								<th>浏览器</th>
								<td>{{siteinfo.browser}}</td>
								<th>请求数</th>
								<td>{{siteinfo.pageRequests}}</td>
							</tr>
							<tr>
								<th colspan="8" class="title">
								页面大小
								</th>
							</tr>
							<tr>
								<th>内容大小</th>
								<td>{{siteinfo.pageContentSize}}</td>
								<th>传输大小</th>
								<td>{{siteinfo.pageTransferSize}}</td>
								<th>localStorage大小</th>
								<td>{{siteinfo.localStorageSize | toKB}}</td>
							</tr>
							<tr>
								<th colspan="8" class="title">
								内容分类
								</th>
							</tr>
							<tr>
								<th>类型</th>
								<th>请求数</th>
								<th colspan="2">内容大小</th>
								<th colspan="2">头部大小</th>
								<th colspan="2">传输大小</th>
							</tr>
							<tr v-for="(key, value) in siteinfo.pageContentTypes">
								<td>{{key}}</td>
								<td>{{value.requests}}</td>
								<td colspan="2">{{value.contentSize | toKB}}</td>
								<td colspan="2">{{value.headerSize | toKB}}</td>
								<td colspan="2">{{value.transferSize | toKB}}</td>
							</tr>
							<tr>
								<th colspan="8" class="title">
								头部
								</th>
							</tr>
							<tr v-if="siteinfo.head.css.length>0">
								<th rowspan={{siteinfo.head.css.length}}>css</th>
								<td colspan="7">{{siteinfo.head.css[0]}}</td>
								<tr v-for="ci in siteinfo.head.css.slice(1)"> 
									<td colspan="7">{{ci}}</td>
								</tr>
							</tr>
							<tr v-if="siteinfo.head.jssync.length>0">
								<th rowspan={{siteinfo.head.jssync.length}}>同步js</th>
								<td colspan="7">{{siteinfo.head.jssync[0]}}</td>
								<tr v-for="ci in siteinfo.head.jssync.slice(1)"> 
									<td colspan="7">{{ci}}</td>
								</tr>
							</tr>
							<tr v-if="siteinfo.head.jsasync.length>0">
								<th rowspan={{siteinfo.head.jsasync.length}}>异步js</th>
								<td colspan="7">{{siteinfo.head.jsasync[0]}}</td>
								<tr v-for="ci in siteinfo.head.jsasync.slice(1)"> 
									<td colspan="7">{{ci}}</td>
								</tr>
							</tr>
						</table>
					</div>
				</fieldset>
				<fieldset>
				<legend>瀑布图</legend>
					<div class="waterfall" v-waterfall="browsertime.har"></div>
				</fieldset>
				<fieldset>
					<legend>可用性：</legend>
					<div class="gauge-chart" v-echarts="ChartOption.gauge.accessibility"></div>
					<div class="pie-chart" v-echarts="ChartOption.pie.accessibility"></div>
					<table class="table infotable advicetable" v-if="accessibility | isNotEmptyAdvice">
							<tr>
								<th colspan="8" class="title">
								具体项目
								</th>
							</tr>
							<template v-for="(index, item) in accessibility">
								<tr v-if="item.offending.length>0">
									<th colspan="1" rowspan={{item.offending.length}}>{{item.title}}(共{{item.offending.length}}条)</th>
									<td colspan="1">1</td>
									<td colspan="8">{{item.offending[0]}}</td>

								</tr>
								<tr v-for="(i,ci) in item.offending.slice(1)"> 
										<td colspan="1">{{i+2}}</td>
										<td colspan="8">{{ci}}</td>
									</tr>
							</template>
					</table>
				</fieldset>
				<fieldset>
					<legend>性能：</legend>
					<div class="gauge-chart" v-echarts="ChartOption.gauge.performance"></div>
					<div class="pie-chart" v-echarts="ChartOption.pie.performance"></div>
					<table class="table infotable advicetable" v-if="performance | isNotEmptyAdvice">
							<tr>
								<th colspan="8" class="title">
								具体项目
								</th>
							</tr>
							<template v-for="(index, item) in performance">
								<tr v-if="item.offending.length>0">
									<th colspan="1" rowspan={{item.offending.length}}>{{item.title}}(共{{item.offending.length}}条)</th>
									<td colspan="1">1</td>
									<td colspan="8">{{item.offending[0]}}</td>

								</tr>
								<tr v-for="(i,ci) in item.offending.slice(1)"> 
										<td colspan="1">{{i+2}}</td>
										<td colspan="8">{{ci}}</td>
									</tr>
							</template>
					</table>
				</fieldset>

				<fieldset>
					<legend>最佳实践：</legend>
					<div class="gauge-chart" v-echarts="ChartOption.gauge.bestpractice"></div>
					<div class="pie-chart" v-echarts="ChartOption.pie.bestpractice"></div>
					<table class="table infotable" v-if="bestpractice | isNotEmptyAdvice">
							<tr>
								<th colspan="8" class="title">
								具体项目
								</th>
							</tr>
							<template v-for="(index, item) in bestpractice">
								<tr v-if="item.offending.length>0">
									<th colspan="1" rowspan={{item.offending.length}}>{{item.title}}(共{{item.offending.length}}条)</th>
									<td colspan="1">1</td>
									<td colspan="8">{{item.offending[0]}}</td>

								</tr>
								<tr v-for="(i,ci) in item.offending.slice(1)"> 
										<td colspan="1">{{i+2}}</td>
										<td colspan="8">{{ci}}</td>
									</tr>
							</template>
					</table>
				</fieldset>

			</template>

				<div class="form-actions">
					<button type="button" class="btn btn-sm btn-success" v-link="{name: 'newTask', query: {url: taskinfo.url}}">重新运行</button>
					<button type="button" class="btn btn-sm btn-danger" @click="deleteTask">删除任务</button>
				</div>

			</form>
		</div>
	</div>

</template>

<style scoped>
	fieldset {
		padding-bottom:30px;
	}

	label {
		padding-top:5px;
		padding-bottom:20px;
		font-weight: normal;
	}

	legend {
		color:#5c5c5c;
	}
	img.screenshot {
		max-width: 100%;
		max-height: 422px;
	}
	.hiddenForm {
		display: inline;
		border: 0px;
		padding: 0px;
	}
	.table td{
		text-align:center;
		max-width: 500px;
	}
	.plugtable th{
		border: 0;
		width: 25%
	}
	.plugtable .th-highlight{
		background: #5cb85c;
		color: white;
		border: 3px solid #ddd;
	}
	.plugtable .th-normal{
		border: 0;
	}
	.waterfall {
		width: 100%;
	}
	.infotable th{
		width: 12.5%;
		background: #eee;
		border: 2px solid #ddd;
		vertical-align: middle!important;
	}
	.infotable td{
		width: 12.5%;
		border: 2px solid #ddd;
	}
	.infotable .title{
		background-color: white;
		font-size: 15px;
		color: #666;
	}
	.advicetable th{
		width: 5%;
	}
	.advicetable td{
		width: 5%;
		max-width: 700px;
		word-wrap: break-word;
	}
	.gauge-chart{
		width: 40%;
		height: 450px;
		float: left;
		margin-top: 35px; 
	}
	.pie-chart{
		width: 60%;
		height: 500px;
		float: left;
	}
	legend {
		padding-bottom:8px;
	}

	.proj-dtail {
		padding-top:10px;
		float:left;
	}
	.proj-icon {
		align:center;
	}

	.align-rt {
		text-align: right;

	}

	.del-pad {
		margin-left:-15px;
	}
	.pad-rt {
		padding-right:20px;
	}

	.form-actions {
		margin:-15px;
		padding:16px;
		background-color:#f5f5f5;
	}
	.detailAvatar{
		font-size: 36px;
		width: 300px;
		height: 300px;
		margin: 0 auto;
	}
</style>

<script type="text/babel">
	import { $ } from 'utils/dom.js';
	import {gaugeOption, pieOption} from 'utils/echart.js';
	import actions from 'actions';
	import store from 'store';
	import {getScreenshotUrl} from '../../api/static';
	import _ from 'lodash';

	export default {
		name: 'task-detail',
		props: ['id', 'fetch'],
		data() {
			return {
				taskinfo: {
					connectivity: 0
				},
				siteinfo: {
					domDepth: {},
					head: {
						jsasync: [],
						jssync: [],
						css: []
					}
				},
				screenshots: [],
				plugArray: [],
				formInfo: [],
				userInfo: [],
				ChartOption: {
					gauge: {
						total: {},
						accessibility: {},
						performance: {},
						bestpractice: {}
					},
					pie: {
						accessibility: {},
						performance: {},
						bestpractice: {}
					}
				},
				browsertime: {
					har: {}
				},
				accessibility: {},
				performance: {},
				bestpractice: {},
				paginationConfigMembers: {
					currentPage: 1,
					itemsPerPage: 15,
					pagesLength: 3,
					totalItems: 0,
					onChange() {}
				},
				paginationConfig: {
					currentPage: 1,
					itemsPerPage: 15,
					pagesLength: 3,
					totalItems: 0,
					onChange() {}
				}
			};
		},
		components: {

		},
		ready() {
			const that = this;
			(async () => {
				let result = await this.fetch.taskInfo;
				that.taskinfo = result;
				// 处理插件
				let allPlug = [
					'analysisStorer',
					'assets',
					'browsertime',
					'coach',
					'crawler',
					'domains',
					'eventemitter',
					'gpsi',
					'graphite',
					'html',
					'influxdb',
					'mongo',
					'gome-screenshot',
					'slack',
					'webpagetest'
				];
				that.plugArray = _.chunk(allPlug, 4).map((row) => {
					return row.map((p) => {
						return {
							key: p,
							value: result.pluginNames.includes(p)
						};
					});
				});
			})();

			(async () => {
				let result = await this.fetch.recordInfo;
				// 处理截图
				let screenshotData = result.find(x => x.type === 'browsertime.screenshot');
				if (screenshotData) {
					that.screenshots = (screenshotData.data || []).map(x => getScreenshotUrl(this.id, x));
				}
				let pageSummary = result.find(x => x.type === 'coach.pageSummary').data;
				that.siteinfo = pageSummary.advice.info;
				that.accessibility = pageSummary.advice.accessibility.adviceList;
				that.performance = pageSummary.advice.performance.adviceList;
				that.bestpractice = pageSummary.advice.bestpractice.adviceList;
				function chunkStr(str) {
					return str.match(/.{1,30}/g).join('<br/>');
				}
				let setGauge = (name, score) => {
					let tmp = _.cloneDeep(gaugeOption);
					tmp.series[0].data[0].value = score;
					tmp.series[0].data[0].name = name;
					tmp.series[0].name = name;
					that.ChartOption.gauge[name] = tmp;
				};
				let setChart = (name) => {
					let score = pageSummary.advice[name].score;
					setGauge(name, score);
					// pie
					let tmp = _.cloneDeep(pieOption);
					let tmparray = _.toPairs(pageSummary.advice[name].adviceList);
					let toolkitobj = {};
					let sum = 0;
					tmparray.forEach((x) => {
						// tmp.legend.data.push(x[0]);
						if (x[1].score !== 100) {
							let title = x[1].title;
							let value = x[1].weight * (100 - x[1].score);
							sum += value;
							tmp.series[1].data.push({
								value,
								name: title
							});
							tmp.series[0].data.push({
								value: x[1].weight,
								name: title
							});
							toolkitobj[title] = x[1];
						}
					});
					tmp.series[1].data.forEach((x) => {
						x.value = (x.value / sum * (100 - score)).toFixed(2);
					});

					tmp.tooltip.formatter = (params, ticket, callback) => {
						let desc = chunkStr(toolkitobj[params.name].description);
						// let offending = toolkitobj[params.name].offending.join('<br />');
						if (params.seriesIndex === 0) {
							return `权重：${params.data.value}<br />所占比例：${params.percent}%<br />描述：${desc}`;
						} else {
							let advice = chunkStr(toolkitobj[params.name].advice);
							return `因为此项扣分：${params.data.value}<br />所占比例：${params.percent}%<br />描述：${desc}<br />建议：${advice}`;
						}
					};
					that.ChartOption.pie[name] = tmp;
				};
				let har = result.find(x => x.type === 'browsertime.har').data;
				that.browsertime.har = har;
				// console.log(pageSummary);
				setGauge('total', pageSummary.advice.score);
				setChart('accessibility');
				setChart('performance');
				setChart('bestpractice');
			})();
		},
		methods: {
			deleteTask: function() {
				let that = this;
				actions.confirm(store, {
					show: true,
					title: '删除任务',
					msg: '确认删除该任务？',
					type: 'default', // default/primary/success/info/warning/danger
					applyFunc: async () => {
						let res = await that.fetch.deleteTasks([that.id]);
						if (res.code === 200) {
							this.$route.router.go({name: 'listTask'});
						} else {
							actions.alert(store, {
								show: true,
								type: 'danger',
								msg: `删除失败,详细信息:<br>${JSON.stringify(res.data, null, 4)}`,
								dismissible: true
							});
						}
					},
					applyStr: '确认删除',
					cancelStr: '取消删除'
				});
			}
		}
	};
</script>
