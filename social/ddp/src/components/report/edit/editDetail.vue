<template>
	<div class="panel panel-default" v-if="reportRevise">
		<div class="panel-heading">修改基本详情</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">报表名称：</label>
						<div class="col-sm-10">
							<input class="form-control" v-model="info.RN">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">所属项目：</label>
						<div class="col-sm-10">
							<input class="form-control" v-model="info.PN">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建时间：</label>
						<div class="col-sm-10">
							<input class="form-control" disabled="" :value="info.CD | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							创建者：
						</label>
						<div class="col-sm-10">
							<input class="form-control" disabled value="{{info.CUN}}">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">项目描述：</label>
						<div class="col-sm-10">
							<textarea class="form-control" v-model="info.RS"></textarea>
						</div>
					</div>
					<upload :upload-title="uploadTitle"></upload>
				</fieldset>
				<div class="form-actions">
					<button type="button" class="btn btn-sm btn-danger" @click="saveReportRevise()">保存修改</button>
					<button type="button" class="btn btn-sm btn-success" @click="reportLayout()">编辑布局</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import upload from '../../base/upload.vue';
	export default {
		name: 'editDetail',
		data() {
			return {
				info: {},
				uploadTitle: '修改报表头像'
			};
		},
		props: ['reportRevise'],
		components: {
			upload
		},
		vuex: {
			getters: {
				avatar: () => store.state.avatar
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
					// console.log(res);
					_self.info = res.data.result;
				});
			},
			reportLayout() {
				this.reportRevise = false;
			},
			saveReportRevise() {
				const _self = this;
				let param = {
					id: this.$route.params.id,
					name: this.info.RN,
					desc: this.info.RS,
					avatar: this.avatar,
					isrelease: this.info.RE,
					layout: this.info.LY
				};
				this.$http.put('report', param, {
					emulateJSON: false
				}).then(res => {
					return res.json();
				}).then(res => {
					if (res.code === '200') {
						_self.$dispatch('report_revise', true);
						actions.alert(store, {
							show: true,
							msg: res.msg,
							type: 'success',
							dismissible: true,
							delay: 2000
						});
						_self.$router.go('/report/list');
					} else {
						_self.$dispatch('report_revise', false);
						actions.alert(store, {
							show: true,
							msg: res.msg || '修改失败',
							type: 'danger',
							dismissible: true,
							delay: 2000
						});
					}
				});
			}
		}
	};
</script>
<style scoped>

</style>
