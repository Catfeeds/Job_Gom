<template>
	<div>
		<div class="cover-block" style="text-align: center; padding:50px;">
			<div>
				<div v-if="info.images !== ''">
					<img style="margin:0 auto;width:90px;height:90px;border-radius:100px;" id="preview" class="avatar project-avatar" :src="info.images">
				</div>
				<div v-else>
					<div class="detailAvatar" style="margin:0 auto; background-color: #cce7ff; color: #555">{{info.name.substring(0,1).toUpperCase()}}</div>
				</div>
			</div>
			<div class="">
				<h3>{{info.name}}</h3>
			</div>
			<div class="proj-desc">
				<p>{{info.desc}}</p>
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
						<label class="col-sm-2 align-rt">创建时间：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.createtime | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建者：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly value="{{info.creator}}">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">更新时间：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.updatetime | Date 'yyyy-MM-dd'">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">数据源：</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="数据源1">
							</div>
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">状态：</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{info.status}}">
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>组件配置信息：</legend>
					<p>类型：{{configType}}</p>
					<chip-app
					:type="type"
					:config="config"
					:form="formdata"
					:option="option"
					:componentreply.sync="componentreply"
					:pconfig.sync="pconfig"
					:formcontentprops="formcontentprop"></chip-app>
				</fieldset>
				<div class="form-actions">
					<button type="button" class="btn btn-sm btn-success" v-link="{name: 'editComponent', params: {id: $route.params.id}}">编辑组件</button>
					<button type="button" class="btn btn-sm btn-danger" @click="deleteComponent">删除组件</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	import actions from 'actions';
	import store from 'store';
	import chipApp from './private-current/chips/index.vue';

	import echarts from 'echarts';

	import componentFilters from './private-current/resData/componentFilters.js';

	export default {
		name: 'component-detail',
		data() {
			return {
				info: {},
				configsList: [],
				configType: '',
				config: ['数据源1', '数据源2', '数据源3'],
				formdata: [],
				componentreply: {
					radio: '',
					checkBox: [],
					datePicker: []
				},
				id: 0,
				type: '',
				pconfig: {
					currentPage: 1,
					itemsPerPage: 10,
					pagesLength: 7,
					totalItems: 0,
					onChange() {}
				},
				cfconfig: {},
				formcontentprop: {}
			};
		},
		components: {
			chipApp
		},
		ready() {
			this.componentDetail();
		},
		events: {
			'pagination-config': function(msg) {
				this.pconfig = msg;
				console.log(this.pconfig);
				this.getComponentData(this.cfconfig, this.type);
			}
		},
		methods: {
			componentDetail() {
				let _this = this;
				this.$http({
					url: 'componentdetail',
					params: {
						id: this.$route.params.id
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					let result = res.data.result;
					result.status = (result.status === 'T' ? '正常' : '已删除');
					_this.info = result;
					_this.type = result.type;
					if (_this.info.type && this.info.type === 'radio') {
						_this.configType = '单选按钮';
						_this.configsList = this.info.config;
					}
					switch (result.type) {
					case 'line':
						_this.configType = '折线图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'bar':
						_this.configType = '柱状图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'pie':
						_this.configType = '饼状图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'map':
						_this.configType = '地图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'scatter':
						_this.configType = '散点图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'radar':
						_this.configType = '雷达图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'sankey':
						_this.configType = '桑基图';
						this.getComponentData(result.chartconfig, result.type);
						break;
					case 'radio':
						_this.configType = '单选按钮';
						_this.config = result.config;
						break;
					case 'datePicker':
						_this.configType = '时间选择器';
						_this.config = result.config;
						break;
					case 'checkBox':
						_this.configType = '多选按钮';
						_this.config = result.config;
						break;
					case 'drop':
						_this.configType = '下拉单选';
						_this.config = result.config;
						break;
					case 'form':
						_this.configType = '表格';
						this.getComponentData(result.formconfig, result.type, []);
						break;
					case 'formContent':
						_this.configType = '内容表格';
						_this.formcontentprop = result.formcontent;
						this.getComponentData(result.formcontent, result.type, []);
						break;
					default :
					}
				});
			},
			deleteComponent: function() {
				actions.confirm(store, {
					show: true,
					title: '删除组件',
					msg: '确认删除该组件？',
					type: 'default',
					applyFunc: () => {
						this.$http({
							url: 'component',
							method: 'DELETE',
							params: {
								id: this.$route.params.id
							}
						}).then((res) => {
							return res.json();
						}).then((res) => {
							actions.alert(store, {
								show: true,
								msg: res.msg,
								dismissible: true
							});
							this.$router.go({
								name: 'listComponent'
							});
						});
					},
					applyStr: '确认删除',
					cancelStr: '取消删除'
				});
			},
			getComponentData(item, type, option) {
				if (!item) {
					return;
				}
				let _this = this;
				item.id = this.$route.params.id;
				item.type = type;
				delete item.dataname;
				this.cfconfig = item;
				if (type === 'form' || type === 'formContent') {
					item.legend.page_index = this.pconfig.currentPage;
					item.legend.page_size = this.pconfig.itemsPerPage;
				}
				var getParam = {
					'data': JSON.stringify(item)
				};
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
							_this.getBarALineAPie(res.data.result);
						} else if (['form', 'formContent'].includes(type)) {
							_this.formdata = res.data.result.series[0].data;
							_this.pconfig.totalItems = res.data.result.series[0].total;
						}
					}
				});
			},
			getBarALineAPie(rec) {
				let acq = componentFilters.getBarALinePieC(rec);
				if (acq) {
					this.option = acq;
					this.createItem(acq);
				}
			},
			createItem(option) {
				$('#echartMain0').remove();
				$('.mainContent').eq(0).append('<div  style="width: 1100px;height: 400px;" id="echartMain0"></div>');
				var myChart = echarts.init(document.getElementById('echartMain0'));
				myChart.setOption(option, false, true);
			}
		}
	};
</script>
<style>
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
	.align-rt {
		text-align: right;
	}
	.form-actions {
		margin:-15px;
		padding:16px;
		background-color:#f5f5f5;
	}
	.detailAvatar{
		font-size: 36px;
		line-height: 90px;
		width: 90px;
		height: 90px;
		border-radius:50%;
	}
	.config li{
		float: left;
		margin-right: 10px;
		padding: 4px;
		border: 1px solid #ddd;
	}
</style>
