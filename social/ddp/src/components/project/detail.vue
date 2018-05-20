<template>
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
							<input class="form-control" readonly value="{{info.CU}}">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							更新时间：
						</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.MD | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							报表数量：
						</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="10">
							</div>
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							状态：
						</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{info.DE}}">
							</div>
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							用户数量：
						</label>
						<div>
							<div class="col-sm-10">
								<input class="form-control" readonly value="2">
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>报表详情：</legend>
					<div v-if="formInfo.length">
						<table class="table table-striped">
							<tr>
								<th>报表名</th><th>创建时间</th><th>创建者</th><th>所在项目</th>
							</tr>
							<tr v-for="item in formInfo">
								<td><a href="javascript:void(0)" v-link="{name: 'detailReport', params: {id: item.ID}}">{{item.RN}}</a></td>
								<td>{{item.CD | Date 'yyyy-MM-dd'}}</td>
								<td>{{item.CUN}}</td>
								<td>{{item.PN}}</td>
							</tr>
						</table>
						<v-pagination :pagination-config.sync="paginationConfig"></v-pagination>
					</div>
					<div v-else>
						<div style="text-align: center; padding:50px;">
							<i class="fa fa-exclamation-triangle" aria-hidden="true" style="padding-left:5px; font-size:3em;"></i>
							<h3>暂无数据</h3>
						</div>
					</div>
				</fieldset>

				<!-- <fieldset>
					<legend>用户详情：</legend>
					<div v-if="userInfo.length !== 0">
						<table class="table table-striped">
							<tr>
								<th>用户名</th><th>创建时间</th><th>上次登录时间</th><th>状态</th>
							</tr>
							<tr v-for="item in userInfo">
								<td>{{item.UN}}</td>
								<td>{{item.CD | Date 'yyyy-MM-dd'}}</td>
								<td>{{item.LLT | Date 'yyyy-MM-dd'}}</td>
								<td>
									<div v-if="item.ST === 0">离职</div>
									<div v-else>在职</div>
								</td>
							</tr>
						</table>
						<v-pagination :pagination-config.sync="paginationConfigMembers"></v-pagination>
					</div>
					<div v-else>
						<div style="text-align: center; padding:50px;">
							<i class="fa fa-exclamation-triangle" aria-hidden="true" style="padding-left:5px; font-size:3em;"></i>
							<h3>暂无数据</h3>
						</div>
					</div>
				</fieldset> -->

				<div class="form-actions">
					<button type="button" class="btn btn-sm btn-success" @click="editProject()">编辑项目</button>
					<button type="button" class="btn btn-sm btn-danger" @click="deleteProject">删除项目</button>
				</div>

			</form>
		</div>
	</div>

</template>

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
	}
	.hiddenForm {
		display: inline;
		border: 0px;
		padding: 0px;
	}
	.table td{
		text-align:center;
	}
	.table th{
		text-align:center;
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
		line-height: 90px;
		width: 90px;
		height: 90px;
		border-radius:50%;
	}
</style>

<script>
	import { $ } from 'utils/dom.js';
	import actions from 'actions';
	import store from 'store';
	import { checkPermission } from 'utils/user.js';

	export default {
		name: 'project-detail',
		data() {
			return {
				info: {},
				formInfo: [],
				userInfo: [],
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
			const _this = this;
			this.$http({
				url: 'projectDetail',
				params: {
					id: this.$route.params.id
				}
			}).then((res) => {
				return res.json();
			}).then((res) => {
				var result = res.data.result;
				result.DE = '1' ? '正常' : '已删除';
				this.info = result;
			});
			this.paginationConfig.onChange = () => {
				this.getPagi();
			};
			// this.paginationConfigMembers.onChange = () => {
			// 	this.getPagiMembers();
			// };
			this.getPagi();
			// this.getPagiMembers();
		},
		methods: {
			getPagi: function() {
				this.$http({
					url: 'report',
					params: {
						parentProject: this.$route.params.id,
						limit: this.paginationConfig.itemsPerPage,
						page: this.paginationConfig.currentPage
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					var result = res.data.result;
					this.formInfo = result;
					this.paginationConfig.totalItems = res.data.total;
				});
			},
			getPagiMembers: function() {
				this.$http({
					url: 'user',
					params: {
						typeId: this.$route.params.id,
						type: 'report',
						limit: this.paginationConfigMembers.itemsPerPage,
						page: this.paginationConfigMembers.currentPage
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					var result = res.data.result;
					this.userInfo = result;
					this.paginationConfigMembers.totalItems = res.data.total;
				});
			},
			deleteProject: function() {
				if (!checkPermission('project', parseInt(this.$route.params.id), 1)) {
					return;
				}
				actions.confirm(store, {
					show: true,
					title: '删除项目',
					msg: '确认删除该项目？',
					type: 'default', // default/primary/success/info/warning/danger
					applyFunc: () => {
						this.$http({
							url: 'project',
							method: 'delete',
							param: {
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
								name: 'listProject'
							});
						});
					},
					applyStr: '确认删除',
					cancelStr: '取消删除'
				});
			},
			editProject(item) {
				if (!checkPermission('project', parseInt(this.$route.params.id), 2)) {
					return;
				}
				this.$router.go({
					name: 'editProject',
					params: {
						id: this.$route.params.id
					}
				});
			}
		}
	};
</script>
