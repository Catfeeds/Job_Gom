<template>
	<div class="content-new">
		<h3>新建组件</h3>
		<hr>
		<form class="form-horizontal">
		  	<div class="form-group">
		    	<label for="name" class="control-label">组件名称</label>
			    <div class="group-col">
			      	<input type="text" class="form-control" id="name" v-model="componentInfo.name" placeholder="请填写组件名称">
			    </div>
		  	</div>
			<div class="form-group">
			    <label for="description" class="control-label">组件描述</label>
			    <div class="group-col">
			      	<textarea class="form-control" rows="4" id="description" v-model="componentInfo.desc"></textarea>
			    </div>
			</div>
			<!-- <div class="form-group">
			    <label for="description" class="control-label">组件描述</label>
			    <div class="group-col">
			    	<dropdown>
			    	    <button type="button" class="btn btn-default" data-toggle="dropdown">类型
			    		    <span class="caret"></span>
			    	    </button>
			    	    <ul slot="dropdown-menu" class="dropdown-menu">
			    		    <li><a>单选按钮</a></li>
			    		    <li><a>折线图</a></li>
			    		    <li><a>柱状图</a></li>
			    		    <li><a>饼状图</a></li>
			    		    <li><a>日期选择器</a></li>
			    		    <li><a>多选按钮</a></li>
			    	    </ul>
			    	</dropdown>
			    </div>
			</div> -->
			<upload :upload-title="uploadTitle"></upload>
		</form>
		<div class="bottom-form">
			<input type="submit" value="创建组件" class="btn btn-success" @click="creatComponent()" :class="{disabled: !componentInfo.name || !componentInfo.desc}" :disabled="(!componentInfo.name || !componentInfo.desc)">
			<a class="btn btn-default cancel" v-link="{name: 'listComponent'}">取消</a>
		</div>
	</div>
</template>
<script>
	import actions from 'actions';
	import store from 'store';
	import upload from '../../base/upload.vue';
	import { dropdown } from 'vue-strap';

	export default {
		name: 'projectNew',
		data() {
			return {
				componentInfo: {},
				componentData: {},
				uploadTitle: '组件头像'
			};
		},
		vuex: {
			getters: {
				avatar: () => store.state.avatar
			}
		},
		components: {
			'upload': upload,
			dropdown
		},
		methods: {
			creatComponent() {
				if (this.avatar) {
					this.componentInfo.images = this.avatar;
				}
				let map = ['name', 'desc', 'avatar'];
				for (let i of map) {
					if (this.componentInfo[i]) {
						this.componentData[i] = this.componentInfo[i];
					}
				}
				this.$http({
					url: 'component',
					method: 'POST',
					emulateJSON: true,
					body: this.componentData
				}).then((res) => {
					return res.json();
				}).then((res) => {
					actions.upload(store, '');
					this.componentInfo = {};
					this.$router.go({
						name: 'editComponent',
						params: {
							id: res.data.result
						}
					});
					actions.alert(store, {
						show: true,
						msg: '创建组件成功,请编辑',
						type: 'success',
						dismissible: true,
						delay: 2000
					});
				});
			}
		}
	};
</script>
