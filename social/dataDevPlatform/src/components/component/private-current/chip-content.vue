<template>
	<fieldset>
		<legend>组件类型</legend>
		<div class="form-group">
			<label class="control-label">选择组件类型：</label>
			<div class="group-col">
				<dropdown>
					<button type="button" class="btn btn-default" id="btn-default" data-toggle="dropdown">
						{{info.type === 'datePicker'?'日期选择器':''}}
						{{info.type === 'datePickerSingle'?'日期单选选择器':''}}
						{{info.type === 'line'?'折线图':''}}
						{{info.type === 'pie'?'饼状图':''}}
						{{info.type === 'bar'?'柱状图':''}}
						{{info.type === 'radar'?'雷达图':''}}
						{{info.type === 'map'?'地图':''}}
						{{info.type === 'sankey'?'桑基图':''}}
						{{info.type === 'scatter'?'散点图':''}}
						{{info.type === 'radio'?'单选按钮':''}}
						{{info.type === 'checkBox'?'多选按钮':''}}
						{{info.type === 'form'?'表格':''}}
						{{info.type === 'formContent'?'内容表格':''}}
						{{info.type === 'drop'?'下拉单选':''}}
						{{info.type === 'search'?'搜索':''}}
						{{!info.type?'组件类型':''}}
						<span class="caret"></span>
					</button>
					<ul slot="dropdown-menu" class="dropdown-menu">
						<li v-for="item in typeList" @click="chooseType(item)"><a>{{item}}</a></li>
					</ul>
				</dropdown>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend>组件配置</legend>
		<div class="form-group">
			<div class="group-col" v-show="['radio', 'checkBox', 'drop'].includes(info.type)">
				<h5>配置options:</h5>
				<input class="form-control" placeholder="输入选项信息，回车添加" type="text" @keyup.enter="addConfig($event)">
				<div transition="fade" class="configCro" v-for="item in info.config">
					<div class="df">{{item.val}}</div>
					<input v-model="item.name" class="df"></input>
					<span class="btn btn-danger btn-xs df" @click="deleteConfig($index)">X</span>
				</div>
			</div>
			<div class="group-col clearfix" v-show="['pie', 'line', 'bar', 'map', 'scatter', 'radar', 'sankey', 'form', 'formContent'].includes(info.type)">
				<div class="group-col group-col-float">
					<div class="inB">
						<span>选择数据源:</span>
						<dropdown>
							<button type="button" class="btn btn-default" data-toggle="dropdown">{{dataName}}
								<span class="caret"></span>
							</button>
							<ul slot="dropdown-menu" class="dropdown-menu">
								<li v-for="item in dataList" @click="chooseData(item)"><a>{{item.DN}}</a></li>
							</ul>
						</dropdown>
					</div>
					<div class="inB" v-if="['line', 'bar', 'map', 'scatter', 'sankey'].includes(info.type)">
						<span>X轴坐标单位：</span>
						<dropdown>
							<button type="button" class="btn btn-default" data-toggle="dropdown">{{info.chartconfig?info.chartconfig.xAxle:xName}}
								<span class="caret"></span>
							</button>
							<ul slot="dropdown-menu" class="dropdown-menu">
								<li v-for="item in rowdatakeyarr" @click="chooseX(item.name)"><a>{{item.name}}</a></li>
							</ul>
						</dropdown>
					</div>
					<div class="inB" v-if="['line', 'bar', 'map', 'scatter', 'sankey'].includes(info.type)">
						<span>Y轴坐标单位：</span>
						<dropdown>
							<button type="button" class="btn btn-default" data-toggle="dropdown">{{info.chartconfig?info.chartconfig.yAxle:yName}}
								<span class="caret"></span>
							</button>
							<ul slot="dropdown-menu" class="dropdown-menu">
								<li v-for="item in rowdatakeyarr" @click="chooseY(item.name)"><a>{{item.name}}</a></li>
							</ul>
						</dropdown>
					</div>
					<div class="inB" v-if="['pie', 'sankey'].includes(info.type)">
						<span>选择数据条件：</span>
						<dropdown>
							<button type="button" class="btn btn-default" data-toggle="dropdown">{{info.chartconfig?info.chartconfig.zAxle:zName}}
								<span class="caret"></span>
							</button>
							<ul slot="dropdown-menu" class="dropdown-menu">
								<li v-for="item in rowdatakeyarr" @click="chooseZ(item.name)"><a>{{item.name}}</a></li>
							</ul>
						</dropdown>
					</div>
					<!-- legend start -->
					<div class="inB" v-if="!['form', 'formContent', 'sankey'].includes(info.type)" >
						<span>legend(图例)：</span>
						<dropdown>
							<button type="button" class="btn btn-default" data-toggle="dropdown">{{info.chartconfig?info.chartconfig.legend.name:infName}}
								<span class="caret"></span>
							</button>
							<ul slot="dropdown-menu" class="dropdown-menu">
								<li v-for="item in rowdatakeyarr" @click="chooseInf(item.name)"><a>{{item.name}}</a></li>
							</ul>
						</dropdown>
					</div>
					<div class="group-col clearfix legend" v-show="['pie', 'line', 'bar', 'map', 'scatter', 'radar'].includes(info.type)">
						<div class="checkBox" v-for="item in checkboxVal">
							<label>
								<input class="checkbox{{$index}}"
								type="checkbox" checked={{item.checked}}
								name="field" value={{item.key}}
								@click="getComponentData(item, $event)">
								{{item.key}}
							</label>
							<input class="form-control rename" style="width: 200px;" v-model="item.val"  placeholder="请输入关联名称" type="text">
						</div>
					</div>
					<!-- legend end -->
					<div class="group-col clearfix legend" v-if="['scatter', 'radar'].includes(info.type)">
						<span>schema(展示列)：</span>
						<div class="checkBox" v-for="item in info.chartconfig.columns">
							<label>
								<input class="checkbox{{$index}}"
								type="checkbox"
								checked={{item.checked}}
								name="field"
								@click="getComponentData(item, $event)">
								{{item.name}}
							</label>
							<input class="form-control rename" style="width: 200px;" v-model="item.val"  placeholder="请输入关联名称" type="text">
						</div>
					</div>
				</div>
			</div>
			<div  class="group-col clearfix legend" v-show="info.type === 'form' || info.type === 'formContent'">
				<div class="checkBox" v-for="item in columnDataKeyArr">
				<label>
					<input class="checkbox{{$index}}" type="checkbox" checked={{item.checked}} name="dataKey" value={{item.key}} @click="getComponentData(item,$event)">
					{{item.key}}
				</label>
					<input class="form-control rename" style="width: 200px;" v-model="item.val"  placeholder="请输入关联名称" type="text">
				</div>
			</div>
			<div v-show="info.type === 'formContent'">
				<legend class="mt">子组件配置</legend>
				<div class="inB">
					<span>选择子数据源:</span>
					<dropdown>
						<button type="button" class="btn btn-default" data-toggle="dropdown">{{dataCName}}
							<span class="caret"></span>
						</button>
						<ul slot="dropdown-menu" class="dropdown-menu">
							<li v-for="item in dataCList" @click="chooseData(item, 'child')"><a>{{item.DN}}</a></li>
						</ul>
					</dropdown>
				</div>
				<div  class="group-col clearfix legend">
					<div class="checkBox" v-for="item in columnDataKeyArrC">
					<label>
						<input class="checkbox{{$index}}"
						type="checkbox"
						checked={{item.checked}}
						name="dataKey"
						value={{item.key}}
						@click="getComponentData(item,$event)">
						{{item.key}}
					<label>
					<input class="form-control rename" v-model="item.val"  placeholder="请输入关联名" type="text">
					</div>
				</div>
				<legend class="mt">父子组件对应关系</legend>
				<input class="form-control" placeholder="输入父组件字段名称" type="text" @keyup.enter="addConfig($event, 'child')">
				<div transition="fade" class="configCro" v-for="item in relation">
					<div class="df">{{item.val}}</div>
					<input v-model="item.name" class="df"  placeholder="输入对应子组件字段名称" ></input>
					<span class="btn btn-danger btn-xs df" @click="deleteConfig($index, 'child')">X</span>
				</div>
			</div>
			<button type="button" class="btn btn-success" @click="getComponentData()">组件预览</button>
		</div>
		<div class="form-group">
			<div class="group-col" :style="{ overflow: info.type === 'drop'? '' : 'auto'}">
				<h5 class="preview">组件预览</h5>
				<chip-app
				:type="info.type"
				:config="info.config"
				:form="formdata"
				:option="option"
				:componentreply.sync="componentreply"
				:pconfig.sync="pageconfig"
				:formcontentprops.sync="info.formcontent"></chip-app>
			</div>
		</div>
	</fieldset>
</template>
<script>
	import $ from 'jquery';
	import { upload } from 'utils/user.js';
	import actions from 'actions';
	import store from 'store';
	import { dropdown, checkbox } from 'vue-strap';
	import chipApp from './chips/index.vue';
	import echarts from 'echarts';
	import './resData/china.js';

	import resPie from './resData/pie.js';
	import resLine from './resData/line.js';
	import resBar from './resData/bars.js';
	import radar from './resData/radar.js';
	import sankey from './resData/sankey.js';
	import scatter from './resData/scatter.js';
	import map from './resData/map.js';

	import componentFilters from './resData/componentFilters.js';

	export default {
		name: 'chip',
		data() {
			return {
				fileName: '',
				componentType: '类型',
				saveData: {},
				dataList: [],
				dataCList: [],
				dataName: '选择数据源',
				dataCName: '选择数据源',
				typeList: ['表格', '内容表格', '折线图', '柱状图', '饼状图', '散点图', '桑基图', '地图', '雷达图', '下拉单选', '单选按钮', '多选按钮', '日期选择器', '日期单选选择器', '搜索'],
				// rowDataKeyArr: [],
				columnDataKeyArr: [],
				columnDataKeyArrC: [],
				relation: [],
				formdata: [],
				pageconfig: {
					currentPage: 1,
					itemsPerPage: 10,
					pagesLength: 10,
					totalItems: 10,
					onChange() {}
				},
				// formcontentprops: {
				// 	type: this.info.type,
				// 	dataid: this.dataId,
				// 	dataidc: this.dataIdC,
				// 	indexval: '',
				// 	id: parseInt(this.$route.params.id),
				// 	legend: this.info.formcontent.legend
				// },
				xName: 'x轴单位',
				yName: 'y轴单位',
				zName: '数据条件',
				infName: '影响值',
				dataId: 1,
				dataIdC: 1,
				option: {},
				legends: {
					name: 'radio',
					value: []
				},
				checkboxVal: [],
				watchInfo: 0,
				componentreply: {
					radio: {},
					drop: {},
					checkBox: [],
					datePicker: [],
					search: ''
				}
			};
		},
		components: {
			dropdown,
			chipApp
		},
		props: [ 'info', 'rowdatakeyarr' ],
		events: {
			'componentreply': function(msg) {},
			'pagination-config': function(msg, index) {
				if (index === 'parent') {
					this.pageconfig = msg;
					this.getComponentData();
				} else {
					// this.getComponentData('child', index, msg);
				}
			}
		},
		ready() {
			this.getData();
			this.$watch('info', function(newVal, oldVal) {
				if (this.watchInfo > 1) {
					return;
				} else {
					this.watchInfo += 1;
				}
				if (newVal && newVal.chartconfig) {
					this.checkboxVal = newVal.chartconfig.legend.value;
					this.infName = newVal.chartconfig.legend.name;
					if (newVal.chartconfig.dataid !== 3344) {
						this.dataId = newVal.chartconfig.dataid;
						this.info.dataid = this.dataId;
					}
					this.xName = newVal.chartconfig.xAxle;
					this.yName = newVal.chartconfig.yAxle;
					this.zName = newVal.chartconfig.zAxle;
					if (newVal.chartconfig.dataname !== '选择数据源') {
						this.dataName = newVal.chartconfig.dataname;
					}
					this.$parent.chipChoosed = true;
				}
				if (newVal && newVal.formconfig) {
					this.columnDataKeyArr = newVal.formconfig.legend.value;
					if (newVal.formconfig.dataid !== 3344) {
						this.dataId = newVal.formconfig.dataid;
						this.info.dataid = this.dataId;
					}
					this.$parent.chipChoosed = true;
					if (newVal.formconfig.dataname !== '选择数据源') {
						this.dataName = newVal.formconfig.dataname;
					}
				}
				if (newVal && newVal.formcontent) {
					this.columnDataKeyArr = newVal.formcontent.legend.value;
					this.columnDataKeyArrC = newVal.formcontent.legend.valuec;
					if (newVal.formcontent.dataid !== 3344) {
						this.dataId = newVal.formcontent.dataid;
						this.dataIdC = newVal.formcontent.dataidc;
						this.info.dataid = this.dataId;
					}
					this.relation = newVal.formcontent.legend.relation;
					this.$parent.chipChoosed = true;
					if (newVal.formconfig.dataname !== '选择数据源') {
						this.dataName = newVal.formconfig.dataname;
					}
				}
				switch (newVal.type) {
				case 'line':
					this.$set('option', resLine);
					this.createItem(this.option);
					break;
				case 'bar':
					this.$set('option', resBar);
					this.createItem(this.option);
					break;
				case 'pie':
					this.$set('option', resPie);
					this.createItem(this.option);
					break;
				case 'radar':
					this.$set('option', radar);
					this.createItem(this.option);
					break;
				case 'sankey':
					this.$set('option', sankey);
					this.createItem(this.option);
					break;
				case 'map':
					this.$set('option', map);
					this.createItem(this.option);
					break;
				case 'scatter':
					this.$set('option', scatter);
					this.createItem(this.option);
					break;
				default :
				}
				this.getComponentData(this.option);
			}, {
				deep: true,
				immediate: true
			});
		},
		methods: {
			createItem(option) {
				$('#echartMain0').remove();
				$('.mainContent').eq(0).append('<div style="width: 1100px;height: 450px;" id="echartMain0"></div>');
				var myChart = echarts.init(document.getElementById('echartMain0'));
				myChart.setOption(option, false, true);
			},
			chooseType(item) {
				this.$parent.chipChoosed = true;
				this.componentType = item.trim();
				this.formdata = [];
				switch (item.trim()) {

				case '表格':
					this.infoCro('form');
					break;
				case '内容表格':
					this.infoCro('formContent');
					break;
				case '单选按钮':
					this.infoCro('radio');
					break;
				case '折线图':
					this.$set('option', resLine);
					this.infoCro('line');
					this.getData();
					break;
				case '柱状图':
					this.$set('option', resBar);
					this.infoCro('bar');
					this.getData();
					break;
				case '饼状图':
					this.$set('option', resPie);
					this.infoCro('pie');
					this.getData();
					break;
				case '雷达图':
					this.$set('option', radar);
					this.infoCro('radar');
					this.getData();
					break;
				case '散点图':
					this.$set('option', scatter);
					this.infoCro('scatter');
					this.getData();
					break;
				case '地图':
					this.$set('option', map);
					this.infoCro('map');
					this.getData();
					break;
				case '桑基图':
					this.$set('option', sankey);
					this.infoCro('sankey');
					this.getData();
					break;
				case '日期选择器':
					this.infoCro('datePicker');
					break;
				case '日期单选选择器':
					this.infoCro('datePickerSingle');
					break;
				case '多选按钮':
					this.infoCro('checkBox');
					break;
				case '下拉单选':
					this.infoCro('drop');
					break;
				case '搜索':
					this.infoCro('search');
					break;
				default :
					return false;
				}
			},
			chooseData(item, child) {
				if (child && child !== 'undefined') {
					this.dataCName = item.DN;
					this.info.formcontent.datanamec = this.dataCName;
					this.dataIdC = item.ID;
					this.info.formcontent.dataidc = this.dataIdC;
				} else {
					this.dataName = item.DN;
					this.info.chartconfig.dataname = this.dataName;
					this.info.formconfig.dataname = this.dataName;
					this.info.formcontent.dataname = this.dataName;
					this.dataId = item.ID;
					this.info.chartconfig.dataid = this.dataId;
					this.info.dataid = this.dataId;
					this.info.formconfig.dataid = this.dataId;
					this.info.formcontent.dataid = this.dataId;
				}

				this.info.chartconfig.xAxle = 'x轴单位';
				this.info.chartconfig.yAxle = 'y轴单位';
				this.info.chartconfig.zAxle = '数据条件';
				this.info.chartconfig.legend.name = '影响值';
				this.checkboxVal = [];
				this.$http({
					url: 'meta/column',
					method: 'GET',
					params: {
						id: !child ? this.dataId : this.dataIdC
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					if (!res.data.result) {
						actions.alert(store, {
							show: true,
							msg: '该数据源为空，请选择其它数据源',
							type: 'warning',
							dismissible: true,
							delay: 1000
						});
						this.rowdatakeyarr = [];
						if (child) {
							this.info.formcontent.legend.valuec = [];
						} else {
							this.info.formconfig.legend.value = [];
							this.info.formcontent.legend.value = [];
						}
						return false;
					}
					this.rowdatakeyarr = res.data.result.fields.map(x => {
						return {
							name: x,
							checked: false,
							val: ''
						};
					});
					this.info.chartconfig.columns = JSON.parse(JSON.stringify(this.rowdatakeyarr));
					this.$dispatch('chip-content', this.info);
					if (child) {
						this.columnDataKeyArrC = [];
					} else {
						this.columnDataKeyArr = [];
					}
					this.formdata = [];
					if (res.data.result.fields) {
						res.data.result.fields.forEach((item) => {
							let arr = {};
							arr.val = '';
							arr.key = item;
							arr.checked = true;
							if (child) {
								this.columnDataKeyArrC.push(arr);
								this.info.formcontent.legend.valuec = this.columnDataKeyArrC;
							} else {
								this.columnDataKeyArr.push(arr);
								this.info.formconfig.legend.value = this.columnDataKeyArr;
								this.info.formcontent.legend.value = this.columnDataKeyArr;
							}
						});
					}
				});
			},
			chooseX(item) {
				this.xName = item;
				this.info.chartconfig.xAxle = this.xName;
				this.$dispatch('chip-content', this.info);
			},
			chooseY(item) {
				this.yName = item;
				this.info.chartconfig.yAxle = this.yName;
				this.$dispatch('chip-content', this.info);
			},
			chooseZ(item) {
				this.zName = item;
				this.info.chartconfig.zAxle = this.zName;
				this.$dispatch('chip-content', this.info);
			},
			chooseInf(item) {
				this.infName = item;
				this.info.chartconfig.legend.name = this.infName;
				this.$dispatch('chip-content', this.info);
				this.$http({
					url: 'val/column',
					method: 'get',
					params: {
						id: this.dataId,
						fieldName: item
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					this.checkboxVal = res.data.result;
					// todo 根据字段获取值;
				});
			},
			getData(data) {
				this.$http({
					url: 'data',
					method: 'get',
					params: {
						limit: 0,
						filter: data
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					this.dataList = res.data.result;
					this.dataCList = res.data.result;
					// this.getRowDataKeyArr(this.info.dataId);
				});
			},
			getRowDataKeyArr(id) {
				this.$http({
					url: 'meta/column',
					method: 'GET',
					params: {
						id: id
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					this.rowdatakeyarr = res.data.result.fields.map(x => {
						return {
							name: x,
							checked: false,
							val: ''
						};
					});
					// todo 可能会在detail里面设置这部分就会被去掉;
				});
			},
			addConfig(e, child) {
				const val = e.target.value;
				let num = 0;
				if (child) {
					this.info.formcontent.legend.relation.forEach(function(item) {
						if (val === item.val) {
							num += 1;
						}
					});
				} else {
					this.info.config.forEach(function(item) {
						if (val === item.val) {
							num += 1;
						}
					});
				}
				if (val !== '' && num === 0) {
					if (child) {
						this.info.formcontent.legend.relation.push({
							val: e.target.value,
							name: e.target.value
						});
						this.relation = this.info.formcontent.legend.relation;
						this.$parent.info.formcontent.legend.relation = this.info.formcontent.legend.relation;
					} else {
						this.info.config.push({
							val: e.target.value,
							name: e.target.value
						});
						this.$parent.info.config = this.info.config;
					}
					e.target.value = '';
				} else if (val === '') {
					actions.alert(store, {
						show: true,
						msg: '选项不能为空',
						type: 'warning',
						dismissible: true,
						delay: 1000
					});
				} else if (num !== 0) {
					actions.alert(store, {
						show: true,
						msg: '不能输入重复选项',
						type: 'warning',
						dismissible: true,
						delay: 2000
					});
				}
			},
			deleteConfig(index, child) {
				if (child) {
					this.info.formcontent.legend.relation.splice(index, 1);
				} else {
					this.info.config.splice(index, 1);
				}
			},
			infoCro(type, newVal) {
				if (newVal && newVal.chartconfig) {
					const chartconfig = newVal.chartconfig;
					this.xName = chartconfig.xAxle;
					this.yName = chartconfig.yAxle;
					this.infName = this.chartconfig.legend ? this.chartconfig.legend.name : '影响值';
				}
				this.info.type = type;
				this.$dispatch('chip-content', this.info);
			},
			getComponentData(item, e, child, index, paginationConfig) {
				const _this = this;
				const type = this.info.type;
				let isChart = ['line', 'bar', 'pie', 'map', 'scatter', 'radar', 'sankey'].includes(type);
				let isform = type === 'form';
				let getParams = {};
				// this.columnDataKeyArr
				if (e) {
					const dom = e.target;
					const input = $(dom).next().next();
					const check = dom.checked;
					this.legends.name = this.infName === '影响值' ? '' : this.infName;
					item.checked = check;
					if (isChart) {
						this.info.chartconfig.legend['value'] = this.checkboxVal;
						this.info.chartconfig.legend.name = this.infName;
					} else if (isform) {
						this.columnDataKeyArr.$remove(item);
						this.columnDataKeyArr.push(item);
						this.info.formconfig.legend['value'] = this.columnDataKeyArr;
					}
					this.$dispatch('chip-content', this.info);
				} else if (item && this.type === 'formContent') {
					return false;
				}
				if (['line', 'bar', 'map', 'scatter'].includes(type)) {
					if (this.xName === 'x轴单位' || this.yName === 'y轴单位') {
						actions.alert(store, {
							show: true,
							msg: 'X轴Y轴必须全部选择',
							type: 'warning',
							dismissible: true,
							delay: 1000
						});
						return false;
					}
					getParams = {
						'type': this.info.type,
						'xAxle': this.xName,
						'yAxle': this.yName,
						'dataid': this.dataId,
						'id': parseInt(this.$route.params.id),
						'legend': this.info.chartconfig.legend
					};
				} else if (['pie', 'radar'].includes(type)) {
					if (type === 'pie' && this.zName === '数据条件') {
						actions.alert(store, {
							show: true,
							msg: '必须选择数据条件',
							type: 'warning',
							dismissible: true,
							delay: 1000
						});
						return false;
					}
					getParams = {
						'type': this.info.type,
						'zAxle': this.zName,
						'dataid': this.dataId,
						'id': parseInt(this.$route.params.id),
						'legend': this.info.chartconfig.legend
					};
				} else if (type === 'form') {
					getParams = {
						'type': this.info.type,
						'dataid': this.dataId,
						'id': parseInt(this.$route.params.id),
						'legend': this.info.formconfig.legend
					};
					getParams.legend.page_index = this.pageconfig.currentPage;
					getParams.legend.page_size = this.pageconfig.itemsPerPage;
				} else if (type === 'formContent' && !child) {
					getParams = {
						'type': this.info.type,
						'dataid': this.dataId,
						'dataidc': this.dataIdC,
						'id': parseInt(this.$route.params.id),
						'legend': this.info.formcontent.legend
					};
					getParams.legend.page_index = this.pageconfig.currentPage;
					getParams.legend.page_size = this.pageconfig.itemsPerPage;
				} else if (type === 'sankey') {
					if (this.xName === 'x轴单位' || this.yName === 'y轴单位') {
						actions.alert(store, {
							show: true,
							msg: 'X轴Y轴必须全部选择',
							type: 'warning',
							dismissible: true,
							delay: 1000
						});
						return false;
					}
					if (this.zName === '数据条件') {
						actions.alert(store, {
							show: true,
							msg: '必须选择数据条件',
							type: 'warning',
							dismissible: true,
							delay: 1000
						});
						return false;
					}

					if (this.xName === this.yName || this.xName === this.zName || this.yName === this.zName) {
						actions.alert(store, {
							show: true,
							msg: 'X轴Y轴、数据条件不能选择相同的列',
							type: 'warning',
							dismissible: true,
							delay: 1500
						});
						return false;
					}

					getParams = {
						'type': this.info.type,
						'xAxle': this.xName,
						'yAxle': this.yName,
						'zAxle': this.zName,
						'dataid': this.dataId,
						'id': parseInt(this.$route.params.id)
					};
				}

				if (['scatter', 'radar'].includes(type)) {
					let columns = this.info.chartconfig.columns.filter(x => {
						return x.checked;
					});
					if (!columns.length || !getParams.legend.value.length) {
						return;
					}
					getParams.columns = JSON.parse(JSON.stringify(columns));
				}

				var getParam = {
					'data': JSON.stringify(getParams)
				};
				if (getParam.data === '{}') {
					return false;
				}
				this.$http({
					url: 'getComponentData',
					method: 'POST',
					emulateJSON: true,
					body: getParam
				}).then((res) => {
					return res.json();
				}).then((res) => {
					if (res.data && res.data.result) {
						let type = res.data.result.type;
						if (['line', 'bar', 'pie', 'map', 'scatter', 'radar', 'sankey'].includes(type)) {
							_this.getBarALineAPie(_this.option, res.data.result);
						} else if (type === 'form') {
							_this.formdata = res.data.result.series[0].data;
							_this.pageconfig.totalItems = res.data.result.series[0].total || 0;
						} else if (type === 'formContent' && !child) {
							_this.formdata = res.data.result.series[0].data;
							_this.pageconfig.totalItems = res.data.result.series[0].total || 0;
						}
					} else {
						actions.alert(store, {
							show: true,
							msg: '无内容！请选择其它字段或其它数据源',
							type: 'warning',
							dismissible: true,
							delay: 1000
						});
					}
				});
			},
			getBarALineAPie(option, rec) {
				let acq = componentFilters.getBarALinePieC(rec);
				if (acq) {
					this.option = acq;
					this.createItem(acq);
					this.$set('option', acq);
				}
			}
		}
	};
</script>
<style scoped>
	ul.dropdown-menu {
		max-height: 200px;
		overflow-y: auto;
	}
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
		padding-bottom:8px;
	}
	.data + div{
		float: left;
	}
	.configCro{
		margin: 10px 0;
		font-size: 16px;
		overflow: hidden;
		width:50%;
	}
	.configCro span{
		color:white;
		margin: 0 0 0 10px;
		float: right;
	}
	.configCro div{
		margin:3px 10px 0 0;
		width: 20%
	}
	.configCro input{
		width:50%;
		border-radius: 4px;
		font-size: 14px;
    	line-height: 1.5;
    	color: #555555;
    	background-color: #fff;
    	background-image: none;
    	border: 1px solid #ccc;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    	-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
		padding:3px 8px;
	}
	.preview{
		border-bottom: 1px solid #e5e5e5;
		line-height: 40px;
	}
	.group-col-float{
		/*float: left;*/
	}
	.group-col {
		margin-bottom: 10px;
	}
	.rename{
		width: 80%;
		display: inline-block;
	}
	.checkbox{
		position: relative;
		top:24px;
		margin-right: 8px;
	}
	.name{
		display: inline-block;
		margin:0 10px 0 20px;
	}
	.inB{
		display: inline-block;
		margin:10px 10px 0 0;
	}
	.df{
		display: block;
		float:left;
	}
	.mt{
		margin:40px 0 20px 0;
	}
</style>
