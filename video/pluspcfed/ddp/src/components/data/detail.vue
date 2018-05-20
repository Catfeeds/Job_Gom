<template>
	<div>
		<div class="cover-block" style="text-align: center; padding:50px;">
			<div>
				<div v-if="info.AR">
					<img style="margin:0 auto;width:90px;height:90px;border-radius:100px;" id="preview" class="avatar project-avatar" :src="info.AR">
				</div>
				<div v-else>
					<div class="detailAvatar" style="margin:0 auto; background-color: #cce7ff; color: #555">{{info.DN && info.DN.substring(0,1).toUpperCase()}}</div>
				</div>
			</div>
			<div class="">
				<h3>{{info.DN}}</h3>
			</div>
			<div class="proj-desc">
				<p>{{info.DS}}</p>
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
								<input class="form-control" readonly value="{{info.CUN}}">
							</div>
						</div>

						<div class="col-sm-12">
							<label class="col-sm-2 align-rt">
								数据标识：
							</label>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{info.DF}}">
							</div>
						</div>

						<div class="col-sm-12">
							<label class="col-sm-2 align-rt">
								数据描述：
							</label>
							<div class="col-sm-10">
								<input class="form-control" readonly value="{{info.DS}}">
							</div>
						</div>
					</fieldset>
					<div class="form-actions">
						<button type="button" class="btn btn-sm btn-success" v-link="{name: 'editData', params: {id: $route.params.id}}">编辑数据</button>
						<button type="button" class="btn btn-sm btn-danger" @click="deleteProject">删除数据</button>
					</div>
				</form>
			</div>
		</div>
	</div>

</template>

<script>
	import { $ } from 'utils/dom.js';
	import actions from 'actions';
	import store from 'store';

	export default {
		name: 'data-detail',
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
				url: 'dataDetail',
				params: {
					data_id: this.$route.params.id
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
			// this.getPagiMembers();
		},
		methods: {
			getPagi: function() {
				this.$http({
					url: 'data',
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
			deleteProject: function() {
				actions.confirm(store, {
					show: true,
					title: '删除项目',
					msg: '确认删除该项目？',
					type: 'default', // default/primary/success/info/warning/danger
					applyFunc: () => {
						this.$http({
							url: 'data',
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
								name: 'listData'
							});
						});
					},
					applyStr: '确认删除',
					cancelStr: '取消删除'
				});
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

