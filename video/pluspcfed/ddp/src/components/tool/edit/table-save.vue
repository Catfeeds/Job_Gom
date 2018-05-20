<template>
	<modal :show.sync="show" effect="zoom" title="保存数据" :backdrop="false" ok-text="确认保存" cancel-text="取消" :callback="save">
		<div slot="modal-body" class="modal-body">
			<form class="form-horizontal">
				<div class="form-group">
					<label for="dataName" class="col-sm-2">数据名称:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" v-model="dataName">
					</div>
				</div>
				<div class="form-group">
					<label for="dataSynopsis" class="col-sm-2">数据描述:</label>
					<div class="col-sm-10">
						<textarea class="form-control" rows="3" v-model='dataSynopsis'></textarea>
					</div>
				</div>
				<div class="form-group">
					<label for="dataFlag" class="col-sm-2">数据标识:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" v-model="dataFlag" @blur="checkDataFlag">
					</div>
				</div>
				<div class="alert alert-danger col-sm-offset-2" v-show="msg">{{msg}}</div>
			</form>
		</div>
	</modal>
</template>
<script>
	import {modal} from 'vue-strap';

	export default {
		data() {
			return {
				dataName: '',
				dataSynopsis: '',
				dataFlag: '',
				msg: ''
			};
		},
		components: {modal},
		props: ['show'],
		methods: {
			checkDataFlag() {
				this.$http.get('checkDataFlag?data_flag=' + this.dataFlag).then(res => {
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
				if (!this.dataName) {
					this.msg = '数据名称不允许为空';
					return;
				}
				if (!this.dataFlag) {
					this.msg = '数据标识不允许为空';
					return;
				}
			}
		}
	};
</script>