<template>
	<div class="panel panel-default">
		<div class="panel-heading">修改基本详情</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">数据名称：</label>
						<div class="col-sm-10">
							<input class="form-control" v-model="info.DN">
						</div>
					</div>

					<div class="col-sm-12">
						<label for="dataFlag" class="col-sm-2 align-rt">数据标识:</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" v-model="info.DF" @input="checkDataFlag">
						</div>
					</div>

					<div class="col-sm-12" style="margin-bottom: 15px;">
						<label class="col-sm-2 align-rt">数据描述:</label>
						<div class="col-sm-10">
							<textarea class="form-control" v-model="info.DS"></textarea>
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
					<!-- <upload :upload-title="uploadTitle"></upload> -->
				</fieldset>
				<!-- <div class="form-actions">
					<button type="button" class="btn btn-sm btn-danger" @click="saveReportRevise()">保存修改</button>
					<button type="button" class="btn btn-sm btn-success" @click="reportLayout()">编辑布局</button>
				</div>
 -->			</form>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['info'],
		methods: {
			checkDataFlag() {
				this.$http.get('checkDataFlag?data_flag=' + this.info.DF).then(res => {
					return res.json();
				}).then(res => {
					if (res.iserror === '1') {
						this.msg = '该标识已存在，请重新输入';
					} else {
						this.msg = '';
					}
				});
			}
		}
	};
</script>
