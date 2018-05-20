<template>
	<div class="content-new">
		<h3>新建任务</h3>
		<hr>
		<validator name="validation">
			<form class="form-horizontal">
				<div class="form-group">
					<label for="name" class="control-label">URL</label>
					<div  :class="{'group-col':true,'has-error': (touchState.url&&$validation.name.url===true),'has-success':(touchState.url&&$validation.name.url===false)}">
						<input
						type="text"
						class="form-control"
						id="name"
						v-model="taskInfo.url"
						v-validate:name = "['url']"
						@touched =  "touchState.url = true"
						placeholder="请填写URL,以http或https开头">
						<span v-show='touchState.url&&$validation.name.url===true'  style="color:red">请输入正确的URL!</span>
					</div>

				</div>
				<div class="form-group">
					<label for="deviceType" class="control-label">设备类型</label>
					<div class="group-col">
						<em :class="{selected: taskInfo.deviceType===0}" @click="taskInfo.deviceType=0;">手机</em>
						<em :class="{selected: taskInfo.deviceType===1}" @click="taskInfo.deviceType=1;">PC</em>
					</div>
				</div>
				<div class="form-group">
					<label for="description" class="control-label">任务描述</label>
					<div class="group-col">
						<textarea class="form-control" rows="4" id="description" v-model="taskInfo.description"></textarea>
					</div>
				</div>
			</form>
		</validator>
		<div class="bottom-form">
			<input type="submit" value="创建任务" class="btn btn-success" @click="creatTask()" :class="{disabled: !(taskInfo.url)}" :disabled="(!taskInfo.url)">
			<a class="btn btn-default cancel" v-link="{name: 'listTask'}">取消</a>
		</div>
	</div>
	<fieldset  v-if="showDetail">
	<legend>coach报告</legend>
		<record-detail :fetch="fetch" :id="id"></record-detail>
	</fieldset>
</template>
<style>
	.btn-avatar{
		background-color: #fff;
		border-color: #e5e5e5;
		color: #5c5c5c;
		padding: 4px 10px;
		font-size: 13px;
		line-height: 18px;
	}
	.group-col em{
		border-radius: 4px;
		cursor: pointer;
		border: 1px solid #ccc;
		font-style: normal;
		display: inline-block;
		height: 22px;
		width: 50px;
		padding: 0 6px;
		text-align: center;
		margin-top: 5px;
		margin-right: 10px;
	}
	em.selected {
		border: 1px solid #449D44;
	}
</style>
<script>
import actions from 'actions';
import {createTask as _createTask, deleteTasks} from '../../api/task';
import recordDetail from '../common/record-detail.vue';
import store from 'store';
import { upload } from 'utils/user.js';
export default {
	name: 'projectNew',
	data() {
		return {
			id: null,
			taskInfo: {
				url: '',
				deviceType: 0
			},
			touchState: {
				url: false
			},
			reportData: {},
			fetch: {deleteTasks},
			showDetail: false
		};
	},
	components: {
		recordDetail
	},
	ready() {
		let purl = this.$route.query.url;
		if (purl) {
			this.taskInfo.url = purl;
		}
	},
	methods: {
		async creatTask() {
			if (this.$validation.valid === true) {
				this.showDetail = false;
				this.taskInfo.user = store.state.userInfo;
				let res = await _createTask(this.taskInfo);
				let result = res;
				if (res.code === 200) {
					res = res.data;
					if (res === true) {
						actions.alert(store, {
							show: true,
							msg: result.msg,
							type: 'danger',
							dismissible: true,
							delay: 2000
						});
					} else {
						this.id = res.taskRecord._id;
						let flag = false;
						let taskUrl = this.taskInfo.url.replace(/\./g, '-') + '/';
						res.result.forEach(c => {
							if (c.source === 'assets') {
								flag = Object.keys(c.data).some(k => {
									return taskUrl.indexOf(k) !== -1;
								});
							}
						});
						if (flag) {
							this.fetch.taskInfo = res.taskRecord;
							this.fetch.recordInfo = res.result;
							this.showDetail = true;
						} else {
							actions.alert(store, {
								show: true,
								msg: '任务运行失败,请确保url可以访问',
								type: 'danger',
								dismissible: true,
								delay: 2000
							});
						}
					}
				} else {
					this.showDetail = false;
					actions.alert(store, {
						show: true,
						msg: '创建任务失败',
						type: 'danger',
						dismissible: true,
						delay: 2000
					});
				}
			}
		}
	},
	validators: {
		url: function(val) {
			return (/^(http:\/\/|https:\/\/)(.{4,})$/).test(val);
		}
	}
};
</script>
