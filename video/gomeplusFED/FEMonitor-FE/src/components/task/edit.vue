<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			项目详情
		</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt" style="padding-bottom: 20px;">项目名称：</label>
						<div class="col-sm-10">
							<input class="form-control" value="{{info.TN}}" v-model="info.TN">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">项目简介：</label>
						<div class="col-sm-10">
							<textarea class="form-control" maxlength="250" rows="3" style="width:100%; resize:vertical" v-model="info.TS">{{info.TS}}</textarea>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						基础详情：
					</legend>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							创建时间：
						</label>
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

				<fieldset class="features">
					<legend>
						项目头像：
					</legend>
					<div class="form-group">
						<div class="col-sm-2">
							<div v-if="info.HU !== ''">
								<img id="preview" style="padding-top:30px;" class="avatar project-avatar" :src="info.HU">
							</div>
							<div v-else>
								<div class="list-item-avatar-con lg-avatar" style="background-color: #cce7ff; color: #555">{{info.TN.substring(0,1).toUpperCase()}}</div>
							</div>
						</div>
						<div class="col-sm-10">
							<p class="light">
								您可以在这里修改项目头像
							</p>
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

				<div class="form-actions">
					<input type="button" @click="saveChanges($route.params.id)" value="保存修改" class="btn btn-success" style="width:10%;">
				</div>

			</form>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			报表与用户管理
		</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<legend>报表详情：
						<button type="button" class="btn btn-sm btn-success" style="float:right;" v-link="{ name: 'newReport', params: { projectID: $route.params.id }}">+ 新增报表</button>
					</legend>
					<div v-if="formInfo.length !== 0">
						<table class="table table-striped">
							<tr>
								<th>报表名</th><th>创建时间</th><th>创建者</th><th>所在项目</th><th>操作</th>
							</tr>
							<tr v-for="item in formInfo">
								<td v-link="{name: 'detailReport', params: {id: item.PI}}">{{item.RN}}</td>
								<td>{{item.CD | Date 'yyyy-MM-dd'}}</td>
								<td>{{item.CUN}}</td>
								<td>{{item.TN}}</td>
								<td>
									<button class="btn btn-sm btn-info" v-link="{name: 'editReport', params: {id: item.PI}}">编辑</button>
									<button class="btn btn-sm btn-danger" @click="showConfirm(item.PI)">删除</button>
								</td>
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

				<fieldset>
					<legend>用户详情：
						<button type="button" class="btn btn-sm btn-success" @click="addMember()" style="float:right;">+ 添加用户</button>
						<Modal :modal-config="modalConfig">
							<input placeholder="请输入用户姓名...">
						</Modal>
					</legend>
					<div v-if="userInfo.length !== 0">
						<table class="table table-striped">
							<tr>
								<th>用户名</th><th>创建时间</th><th>上次登录时间</th><th>状态</th><th>操作</th>
							</tr>
							<tr v-for="item in userInfo">
								<td>{{item.UN}}</td>
								<td>{{item.CD | Date 'yyyy-MM-dd'}}</td>
								<td>{{item.LLT | Date 'yyyy-MM-dd'}}</td>
								<td>
									<div v-if="item.ST === 0">离职</div>
									<div v-else>在职</div>
								</td>
								<td><button type="button" class="btn btn-sm btn-danger" @click="delMember($route.params.id, item.UI)">删除</button></td>
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
				</fieldset>
			</form>
		</div>
	</div>

</template>

<style>
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
</style>

<script type="text/babel">
	import { $ } from 'utils/dom.js';
	import { upload } from 'utils/user.js';
	import actions from 'actions';
	import store from 'store';
	import Modal from '../base/modal.vue';

	export default {
		name: 'project-edit',
		data() {
			return {
				info: {
					TN: '',
					TS: '',
					HU: ''
				},
				fileName: '',
				formInfo: [],
				userInfo: [],
				paginationConfig: {
					currentPage: 1,
					itemsPerPage: 15,
					pagesLength: 3,
					totalItems: 0,
					onChange() {}
				},
				paginationConfigMembers: {
					currentPage: 1,
					itemsPerPage: 15,
					pagesLength: 3,
					totalItems: 0,
					onChange() {}
				},
				modalConfig: {
					show: false,
					title: '请选择时间',
					applyStr: '确认',
					cancelStr: '取消',
					applyFunc: function() {
						console.log('apply');
					},
					cancelFunc: () => {
						console.log('cancel');
					}
				}
			};
		},
		components: {
			Modal
		},
		ready() {
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
			this.paginationConfigMembers.onChange = () => {
				this.getPagiMembers();
			};
			this.getPagi();
			this.getPagiMembers();
		},
		methods: {
			getPagi: function() {
				this.$http({
					url: 'report',
					params: {
						project_id: this.$route.params.id,
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
			delAvatar: function() {
				var _this = this;
				this.$http({
					url: 'projectDetail',
					method: 'get',
					params: {
						id: this.$route.params.id
					}
				}).then((res) => {
					_this.info.HU = '';
				});
			},
			uploadAvatar: function(e) {
				let _this = this;
				let file = e.target.files[0];
				upload(file, (res) => {
					this.fileName = file.name;
					_this.info.HU = res.data.result;
				});
			},
			saveChanges: function(id) {
				var _this = this;
				this.$http({
					url: 'project',
					method: 'put',
					params: {
						name: _this.info.TN,
						desc: _this.info.TS,
						avatar: _this.info.HU,
						id: id
					}
				}).then((res) => {
					return res.json();
				}).then((res) => {
					actions.alert(store, {
						show: true,
						msg: res.msg,
						dismissible: true
					});
				});
			},
			showConfirm: function(id) {
				actions.confirm(store, {
					show: true,
					title: '删除报表',
					msg: '确认删除该报表？',
					type: 'default', // default/primary/success/info/warning/danger
					applyFunc: () => {
						this.$http({
							url: 'report',
							method: 'delete',
							params: {
								id: id
							}
						}).then((res) => {
							return res.json();
						}).then((res) => {
							actions.alert(store, {
								show: true,
								msg: res.msg,
								dismissible: true
							});
						});
					},
					applyStr: '确认删除',
					cancelStr: '取消删除'
				});
			},
			delMember: (reportID, userID) => {
				actions.confirm(store, {
					show: true,
					title: '删除成员',
					msg: '确认取消该成员对此项目的权限？',
					type: 'default', // default/primary/success/info/warning/danger
					applyFunc: () => {
						this.$http({
							url: 'user',
							method: 'delete',
							params: {
								id: userID,
								typeId: reportID,
								type: 'report'
							}
						}).then((res) => {
							return res.json();
						}).then((res) => {
							actions.alert(store, {
								show: true,
								msg: res.msg,
								dismissible: true
							});
						});
					},
					applyStr: '确认删除',
					cancelStr: '取消删除'
				});
			},
			addMember: () => {
				this.modalConfig.show = true;
			}
		}
	};
</script>
