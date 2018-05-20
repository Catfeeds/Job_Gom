<template>
	<div class="content-new">
		<h3>新建项目</h3>
		<hr>
		<form class="form-horizontal">
		  	<div class="form-group">
		    	<label for="name" class="control-label">项目名称</label>
			    <div class="group-col">
			      	<input type="text" class="form-control" id="name" v-model="projectInfo.name" placeholder="请填写项目名称">
			    </div>
		  	</div>
			<div class="form-group">
			    <label for="description" class="control-label">项目描述</label>
			    <div class="group-col">
			      	<textarea class="form-control" rows="4" id="description" v-model="projectInfo.desc"></textarea>
			    </div>
			</div>
			<upload :upload-title="uploadTitle"></upload>
		</form>
		<div class="bottom-form">
			<input type="submit" value="创建项目" class="btn btn-success" @click="creatProject()" :class="{disabled: !projectInfo.name || !projectInfo.desc}" :disabled="(!projectInfo.name || !projectInfo.desc)">
			<a class="btn btn-default cancel" v-link="{name: 'listProject'}">取消</a>
		</div>
	</div>
</template>
<script>
import actions from 'actions';
import store from 'store';
import upload from '../base/upload.vue';

export default {
	name: 'projectNew',
	data() {
		return {
			projectInfo: {},
			projectData: {},
			uploadTitle: '项目头像'
		};
	},
	vuex: {
		getters: {
			avatar: () => store.state.avatar
		}
	},
	components: {
		'upload': upload
	},
	methods: {
		creatProject() {
			if (this.avatar) {
				this.projectInfo.avatar = this.avatar;
			}
			let map = ['name', 'desc', 'avatar'];
			for (let i of map) {
				if (this.projectInfo[i]) {
					this.projectData[i] = this.projectInfo[i];
				}
			}
			this.$http({
				url: 'project',
				method: 'POST',
				emulateJSON: true,
				body: this.projectData
			}).then((res) => {
				actions.upload(store, '');
				this.projectInfo = {};
				this.$router.go({
					name: 'listProject'
				});
				actions.alert(store, {
					show: true,
					msg: '创建项目成功',
					type: 'success',
					dismissible: true,
					delay: 2000
				});
			});
		}
	}
};
</script>
