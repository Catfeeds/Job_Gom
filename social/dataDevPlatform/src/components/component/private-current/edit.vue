<template>
	<tab :list="tabList" :val.sync="tabVal"></tab>
	<div class="panel panel-default" v-show="tabVal">
		<div class="panel-heading">组件详情</div>
		<div class="panel-body">
			<div>
				<fieldset>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt" style="padding-bottom: 20px;">组件名称：</label>
						<div class="col-sm-10">
							<input class="form-control" value="{{info.name}}" v-model="info.name">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">组件简介：</label>
						<div class="col-sm-10">
							<textarea class="form-control" maxlength="250" rows="3" style="width:100%; resize:vertical" v-model="info.desc">{{info.desc}}</textarea>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>基础详情：</legend>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建时间：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.createtime | Date 'yyyy-MM-dd'">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建者：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly value="{{info.username}}">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">更新时间：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.updatetime | Date 'yyyy-MM-dd'">
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
				<fieldset class="features">
					<legend>组件头像：</legend>
					<div class="form-group">
						<div class="col-sm-2">
							<div v-if="info.images !== ''">
								<img id="preview" style="padding-top:30px;" class="avatar project-avatar" :src="info.images">
							</div>
							<div v-else>
								<div class="list-item-avatar-con lg-avatar" style="background-color: #cce7ff; color: #555">{{info.name.substring(0,1).toUpperCase()}}</div>
							</div>
						</div>
						<div class="col-sm-10">
							<p class="light">您可以在这里修改组件头像</p>
							<a class="btn btn-sm">
								<button type="button" class="btn btn-sm btn-default" onclick="document.querySelector('#project_avatar').click()">打开文件 ...</button>
							</a>
							&nbsp;
							<span id="fileNameAvatar">{{fileName}}</span>
							<input style="display:none" type="file" id="project_avatar" accept="image/jpeg, image/png, image/jpg" @change="uploadAvatar($event)">
							<div class="light">头像最大不可超过 200KB.</div>
							<hr>
							<button type="button" @click="delAvatar" class="btn btn-sm btn-danger">恢复默认头像</button>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>
	<div v-show="!tabVal" class="panel panel-default">
		<div class="panel-heading">
			组件的选择与配置
		</div>
		<div class="panel-body">
			<div>
				<chip :info.sync="info" :rowdatakeyarr="rowDataKeyArrE"></chip>
				<div class="form-actions">
					<input type="button" @click="save($route.params.id)" value="保存" class="btn btn-success" style="width:10%;" :class="{disabled: !info.type}" :disabled="(!info.type)">
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.lg-avatar {
		font-size: 36px;
		line-height: 90px;
		width: 90px;
		height: 90px;
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
	.align-rt {
		text-align: right;
	}
	.form-actions {
		margin:-15px;
		padding:16px;
		background-color:#f5f5f5;
	}
	.data + div{
		float: left;
	}
</style>
<script>
	import $ from 'jquery';
	import { upload } from 'utils/user.js';
	import actions from 'actions';
	import store from 'store';
	import { dropdown } from 'vue-strap';
	import chip from './chip-content.vue';
	import tab from '../../base/tab';

	export default {
		name: 'report-edit-common',
		data() {
			return {
				info: {},
				fileName: '',
				chipChoosed: false,
				tabList: ['组件编辑', '组件基本信息编辑'],
				tabVal: 0,
				rowDataKeyArrE: []
			};
		},
		components: {
			dropdown,
			chip,
			tab
		},
		ready() {
			this.componentDetail();
		},
		events: {
			'chip-content': function(msg) {
				this.$set('info', msg);
				// this.info = msg;
			}
		},
		methods: {
			componentDetail() {
				this.$http({
					url: 'componentdetail',
					params: {
						id: this.$route.params.id
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					if (!res.data) {
						return false;
					}
					let result = res.data.result;
					result.status = (result.status === 'T' ? '正常' : '已删除');
					if (!result.chartconfig || result.chartconfig === '' || result.chartconfig.length === 0) {
						result.chartconfig = {
							xAxle: 'x轴单位',
							yAxle: 'y轴单位',
							zAxle: '数据条件',
							dataname: '选择数据源',
							dataid: 3344,
							legend: {
								name: '影响值',
								value: []
							},
							columns: []
						};
					}
					if (!result.formconfig || result.formconfig === '' || result.formconfig.length === 0) {
						result.formconfig = {
							dataname: '选择数据源',
							dataid: 3344,
							legend: {
								name: 'form',
								value: []
							}
						};
					}
					if (!result.formcontent || result.formcontent === '' || result.formcontent.length === 0) {
						result.formcontent = {
							dataname: '选择数据源',
							datanamec: '选择数据源',
							dataid: 3344,
							dataidc: 3344,
							id: parseInt(this.$route.params.id),
							legend: {
								name: 'formContent',
								value: [],
								valuec: [],
								relation: []
							}
						};
					}
					if (result.type === 'line' || result.type === 'bar') {
						result.chartconfig.zAxle = '数据条件';
					}
					if (result.type === 'pie') {
						result.chartconfig.xAxle = 'x轴单位';
						result.chartconfig.zAxle = 'y轴单位';
					}
					if (['scatter'].includes[result.tpye]) {
						result.chartconfig.rowDataKeyArr = [];
					}
					if (!result.config || result.config === '' || result.config.length === 0) {
						result.config = [{
							val: '初始数据',
							name: '初始数据'
						}];
					}
					this.info = result;
					return res;
				}).then((res) => {
					console.log('res.data.result.dataId', res.data.result.dataid);
					this.$http({
						url: 'meta/column',
						method: 'GET',
						params: {
							id: res.data.result.dataid
						}
					}).then((res) => {
						return res.json();
					}).then((res) => {
						if (res.data.result.fields) {
							this.rowDataKeyArrE = res.data.result.fields.map(x => {
								return {
									name: x,
									checked: false,
									val: ''
								};
							});
							this.info.chartconfig.rowDataKeyArr = JSON.parse(JSON.stringify(this.rowDataKeyArrE));
						}
					});
				});
			},
			delAvatar() {
				this.info.images = '';
			},
			uploadAvatar(e) {
				let file = e.target.files[0];
				upload(file, (res) => {
					this.fileName = file.name;
					this.info.images = res.data.result;
				});
			},
			save(id) {
				let saveData = {};
				let startTime, endTime;
				const _this = this;
				saveData.id = parseInt(id);
				if (!this.info.type || !this.chipChoosed) {
					actions.alert(store, {
						show: true,
						msg: '请选择组件类型',
						type: 'warning',
						dismissible: true,
						delay: 2000
					});
					return;
				} else {
					saveData.type = this.info.type;
				}
				let map;
				let type = this.info.type.trim();
				if (type === 'datePicker') {
					let content = $('#reportrange0 span').html();
					let contentArr = content.split(' ');
					this.info.config = [{
						val: contentArr[0],
						name: contentArr[0]
					}, {
						val: contentArr[2],
						name: contentArr[2]
					}];
				}
				if (type === 'datePickerSingle') {
					let content = $('#reportsingle0 span').html();
					this.info.config = [{
						val: content,
						name: content
					}, {
						val: '',
						name: ''
					}];
				}
				if (['line', 'bar', 'pie', 'map', 'scatter', 'radar', 'sankey'].includes(type)) {
					map = ['name', 'desc', 'images', 'chartconfig', 'dataid'];
				} else if (type === 'form') {
					map = ['name', 'desc', 'images', 'formconfig', 'dataid'];
				} else if (type === 'formContent') {
					map = ['name', 'desc', 'images', 'formcontent', 'dataid'];
				} else {
					map = ['name', 'desc', 'images', 'config'];
				}
				for (let i of map) {
					saveData[i] = this.info[i];
				}
				if (['line', 'bar', 'pie', 'form', 'formSingle', 'map', 'scatter', 'radar', 'sankey'].includes(type)) {
					saveData['iscontrol'] = false;
				} else {
					saveData['iscontrol'] = true;
				}
				if (['line', 'bar', 'map', 'scatter'].includes(type)) {
					delete saveData.chartconfig.zAxle;
					if (saveData.chartconfig.xAxle === 'x轴单位' || saveData.chartconfig.yAxle === 'y轴单位') {
						actions.alert(store, {
							show: true,
							msg: '请完善x轴y轴信息并预览后提交',
							type: 'warning',
							dismissible: true,
							delay: 2000
						});
						return false;
					}
				} else if (type === 'pie') {
					delete saveData.chartconfig.xAxle;
					delete saveData.chartconfig.yAxle;
					if (saveData.chartconfig.zAxle === '数据条件') {
						actions.alert(store, {
							show: true,
							msg: '请完善z轴信息并预览后提交',
							type: 'warning',
							dismissible: true,
							delay: 2000
						});
						return false;
					}
				} else if (type === 'sankey') {
					delete saveData.chartconfig.columns;
					delete saveData.chartconfig.rowDataKeyArr;
					if (saveData.chartconfig.xAxle === 'x轴单位' || saveData.chartconfig.yAxle === 'y轴单位' || saveData.chartconfig.zAxle === '数据条件') {
						actions.alert(store, {
							show: true,
							msg: '请完善x轴y轴、数据条件信息并预览后提交',
							type: 'warning',
							dismissible: true,
							delay: 2000
						});
						return false;
					}
					if (saveData.chartconfig.xName === saveData.chartconfig.yName || saveData.chartconfig.xName === saveData.chartconfig.zName || saveData.chartconfig.yName === saveData.chartconfig.zName) {
						actions.alert(store, {
							show: true,
							msg: 'X轴Y轴、数据条件不能选择相同的列',
							type: 'warning',
							dismissible: true,
							delay: 1500
						});
						return false;
					}
				}

				let saveDataStr = JSON.stringify(saveData);
				this.$http({
					url: 'component',
					method: 'put',
					params: {
						data: saveDataStr
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					this.$router.go({
						name: 'listComponent'
					});
					actions.alert(store, {
						show: true,
						msg: '编辑完成',
						type: 'success',
						dismissible: true,
						delay: 2000
					});
				});
			}
		}
	};
</script>
