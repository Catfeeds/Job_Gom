<template>
	<div class="content-new">
		<h3>新建数据</h3>
		<hr>
		<div class="form-horizontal">
			<div class="form-group">
				<label for="dataName" class="control-label">数据名称:</label>
				<div class="group-col">
					<input type="text" class="form-control" v-model="dataInfo.dataName">
				</div>
			</div>
			<div class="form-group">
				<label for="dataSynopsis" class="control-label">数据描述:</label>
				<div class="group-col">
					<textarea class="form-control" rows="3" v-model='dataInfo.dataSynopsis'></textarea>
				</div>
			</div>
			<div class="form-group">
				<label for="dataFlag" class="control-label">数据标识:</label>
				<div class="group-col">
					<input type="text" class="form-control" v-model="dataInfo.dataFlag" @input="checkDataFlag">
				</div>
			</div>
			<upload upload-title="数据头像"></upload>
			<div class="alert alert-danger" v-show="msg">{{msg}}</div>
			<hr>
			<button class="btn btn-success" :disabled="!valid || !!msg" @click="save">创建数据</button>
			<button  v-link="{name: 'listData'}" class="btn btn-default">取消</button>
		</form>
	</div>
</template>
<script>
	import actions from 'actions';
	import store from 'store';
	import upload from '../base/upload.vue';

	export default {
		components: {upload},
		data() {
			return {
				dataInfo: {
					dataName: '',
					dataSynopsis: '',
					dataFlag: '',
					avatar: ''
				},
				msg: ''
			};
		},
		computed: {
			valid() {
				return this.dataInfo.dataName && this.dataInfo.dataSynopsis && this.dataInfo.dataFlag;
			}
		},
		methods: {
			checkDataFlag() {
				this.$http.get('checkDataFlag?data_flag=' + this.dataInfo.dataFlag).then(res => {
					return res.json();
				}).then(res => {
					if (res.iserror === '1') {
						this.msg = '该标识已存在，请重新输入';
					} else {
						this.msg = '';
					}
				});
			},
			save() {
				if (!this.valid || !!this.msg) {
					return false;
				}

				this.dataInfo.avatar = store.state.avatar;
				this.$http.post('data', JSON.parse(JSON.stringify(this.dataInfo))).then(res => {
					return res.json();
				}).then(res => {
					if (res.iserror === '0') {
						this.$router.go({
							name: 'editData',
							params: {
								id: res.data.result
							}
						});

						actions.alert(store, {
							show: true,
							msg: '创建成功',
							type: 'success',
							dismissible: true,
							delay: 2000
						});
					} else {
						actions.alert(store, {
							show: true,
							msg: '创建失败' + res.msg,
							type: 'error',
							dismissible: true,
							delay: 2000
						});
					}
				});
			}
		}
	};
</script>
<style>

</style>
