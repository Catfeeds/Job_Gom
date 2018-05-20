<template>
	<div>
		<tab :list="tabList" :val.sync="tabVal"></tab>
		<div v-if="!tabVal">
			<preview :layout="layoutDetail"></preview>
			<div class="form-actions">
				<button type="button" class="btn btn-sm btn-success" @click="editReport()">编辑报表</button>
				<button type="button" class="btn btn-sm btn-danger" @click="deleteReport()">删除报表</button>
			</div>
		</div>
		<template v-else>
			<div class="">
				<div class="cover-block" style="text-align: center; padding:50px;">
					<div>
						<div v-if="info.HU !== ''">
							<img style="margin:0 auto;width:90px;height:90px;border-radius:100px;" id="preview" class="avatar project-avatar" :src="info.HU">
						</div>
						<div v-else>
							<div class="detailAvatar" style="margin:0 auto; background-color: #cce7ff; color: #555">{{info.PN.substring(0,1).toUpperCase()}}</div>
						</div>
					</div>
					<div class="">
						<h3>{{info.PN}}</h3>
					</div>
					<div class="proj-desc">
						<p>{{info.PS}}</p>
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
								<label class="col-sm-2 align-rt">报表名称：</label>
								<div class="col-sm-10">
									<input class="form-control" readonly :value="info.RN">
								</div>
							</div>

							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">所属项目：</label>
								<div class="col-sm-10">
									<input class="form-control" readonly :value="info.PN">
								</div>
							</div>

							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">创建时间：</label>
								<div class="col-sm-10">
									<input class="form-control" readonly :value="info.CD | Date 'yyyy-MM-dd'">
								</div>
							</div>

							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">
									创建者：
								</label>
								<div class="col-sm-10">
									<input class="form-control" readonly value="{{info.CUN}}">
								</div>
							</div>

							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">布局：</label>
								<div class="col-sm-10">
									<input class="form-control" readonly :value="info.LN">
								</div>
							</div>
						</fieldset>
					</form>

					<fieldset>
						<legend>报表简介：</legend>
						<div>
							<textarea disabled class="form-control" maxlength="250" rows="3" style="width:100%; resize:vertical" v-model="info.PS">{{info.RS}}</textarea>
						</div>
					</fieldset>

					<fieldset>
						<legend>组件列表：</legend>
						<div>
							<table class="table table-striped">
								<tr>
									<th>组件名</th><th>数据源</th><th>创建者</th><th>创建时间</th><th>最近修改时间</th>
								</tr>
								<tr v-for="item in compinentList">
									<td>{{item.name}}</td><td>{{item.chartconfig.dataname}}{{item.formconfig.dataname}}</td><td>{{item.username}}</td><td>{{item.createtime | Date 'yyyy-MM-dd'}}</td><td>{{item.updatetime | Date 'yyyy-MM-dd'}}</td>
								</tr>
							</table>
						</div>
					</fieldset>
					<div class="form-actions">
						<button type="button" class="btn btn-sm btn-success" @click="editReport()">编辑报表</button>
						<button type="button" class="btn btn-sm btn-danger" @click="deleteReport()">删除报表</button>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<style>
</style>
<script>
	import Vue from 'vue';
	import store from 'store';
	import actions from 'actions';
	import preview from './edit/preview';
	import {layouts} from './edit/layouts';
	import tab from '../base/tab';
	import { checkPermission } from 'utils/user.js';

	export default {
		name: 'reportDetail',
		components: {preview, tab},
		data() {
			return {
				info: {},
				layoutDetail: {},
				tabList: ['报表预览', '报表详情'],
				tabVal: 0
			};
		},
		vuex: {
			getters: {
				avatar: () => store.state.avatar,
				componentList: () => store.state.componentList
			}
		},
		ready() {
			this.getDetailInfo();
		},
		methods: {
			getDetailInfo() {
				const _self = this;
				this.$http({
					url: 'reportDetail',
					method: 'GET',
					emulateJSON: true,
					params: {
						id: this.$route.params.id
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					_self.info = res.data.result;

					let data = res.data.result;
					// 获取组件信息并获取当前报表信息
					// this.$http.get('component/forReport').then(res2 => {
					// 	return res2.json();
					// }).then(res2 => {
					// 	actions.setComponents(store, res2.data.result);

					// });

					// 组件列表
					_self.$http({
						url: 'showComp',
						method: 'GET',
						emulateJSON: true,
						params: {
							id: this.$route.params.id
						}
					}).then((res) => {
						return res.json();
					}).then((res) => {
						_self.compinentList = res.data.result;

						this.layoutDetail = layouts.find(x => {
							return x.id === data.LI;
						});
						let componentList = this.compinentList;
						if (this.layoutDetail && this.layoutDetail.position) {
							this.layoutDetail.position.forEach((x, index) => {
								let temp = data.LY.position[index];
								let component = temp.component.id ? componentList.find(x => {
									return x.id === temp.component.id;
								}) : {};
								x.component = Object.assign({}, JSON.parse(JSON.stringify(component)));
								x.ref = temp.ref;
								x.compName = x.component ? x.component.name : '';
							});
						}
					});
				});
			},
			deleteReport() {
				if (!checkPermission('report', parseInt(this.$route.params.id), 1)) {
					return;
				}
				this.$http({
					url: 'report',
					method: 'DELETE',
					emulateJSON: true,
					params: {
						id: this.$route.params.id
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					if (res.code === '200') {
						this.$router.go({
							name: 'listReport'
						});
						actions.alert(store, {
							show: true,
							msg: res.msg,
							type: 'success',
							dismissible: true,
							delay: 2000
						});
					}
				});
			},
			editReport(item) {
				if (!checkPermission('report', parseInt(this.$route.params.id), 2)) {
					return;
				}
				this.$router.go({
					name: 'editReport',
					params: {
						id: this.$route.params.id
					}
				});
			}
		}
	};
</script>
