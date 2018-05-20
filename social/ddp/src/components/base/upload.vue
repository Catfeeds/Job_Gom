<template>
	<div class="form-group">
		<p class="control-label">{{uploadTitle}}</p>
		<div class="group-col">
			<label  for="avatar">
				<a class="btn btn-avatar">
					<i class="fa fa-paperclip"></i>
					<span>选择文件</span>
				</a>
			</label>&nbsp;
			<input class="js-group-avatar-input hidden" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="group[avatar]" id="avatar" @change="upload($event)">
			<span class="file_name js-avatar-filename">{{fileName}}</span>
			<p>图片大小不能超过200KB</p>
		</div>
	</div>
</template>
<style scoped>
	.btn-avatar{
		background-color: #fff;
		border-color: #e5e5e5;
		color: #5c5c5c;
		padding: 4px 10px;
		font-size: 13px;
		line-height: 18px;
	}
	label{
		padding-bottom: 5px;
	}
</style>
<script>
import Vue from 'vue';
import store from 'store';
import actions from 'actions';

export default {
	name: 'upload',
	data() {
		return {
			fileName: ''
		};
	},
	props: ['uploadTitle'],
	methods: {
		upload(ev) {
			let file = ev.target.files[0];
			this.fileName = file.name;

			if (!/image\/.*/.test(file.type)) {
				actions.alert(store, {
					show: true,
					msg: '只能上传图片',
					type: 'danger'
				});
				return;
			}
			if (file.size / 1024 > 200) {
				actions.alert(store, {
					show: true,
					msg: '图片大小不能超过200KB',
					type: 'danger'
				});
				this.fileName = '';
				ev.target.files[0] = null;
				return;
			}
			let formData = new FormData();
			formData.append('file', file);
			Vue.http({
				url: 'upload',
				method: 'post',
				body: formData
			}).then((res) => {
				return res.json();
			}).then((res) => {
				actions.upload(store, res.data.result);
			}).catch((e) => {});
		}
	}
};
</script>
