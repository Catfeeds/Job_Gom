<template>
	<m-main-con>
		<m-top>
			<p class="title">项目详情</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title">1 项目名称</p>
					<span class="main_p">{{projectDetail.name}}</span>
				</div>
				<div class="item">
					<p class="title">2 项目描述</p>
					<span class="main_p">{{projectDetail.descr}}</span>
				</div>
				<div class="item">
					<p class="title">3 创建人</p>
					<span class="main_p">{{projectDetail.creater}}</span>
				</div>
				<div class="item">
					<p class="title">4 创建时间</p>
					<span class="main_p">{{projectDetail.ctime | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
				</div>
				<div class="item">
					<p class="title">5 项目成员</p>
					<div class="member_con">
						<span v-for="item in projectDetail.members">{{item.userName}}</span>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" v-link="{name: 'projectEdit', params: {id: projectDetail.id}}">修改</a>
				<a href="javascript:void(0)" class="btn btn_default" @click="deleteProject()">删除</a>
			</div>
		</m-bottom>
	</m-main-con>
</template>

<style scoped>

.top a{
	position: absolute;
	right: 15px;
	top: 50%;
	margin-top: -19px;
}

</style>

<script>

import store from 'store';
import actions from 'actions';

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

import utils from 'utils';

export default {
	name: 'ProjectDetail',
	data() {
		return {
			projectDetail: {
				
			},
			test: {}
		}
	},
	vuex: {
		getters: {
			isLogin: () => {
				return store.state.isLogin;
			}
		},
		actions: actions
	},
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
	},
	methods: {
		getProjectDetail(id) {
			actions.loading(store, true);
			this.$http({
				url: '/api/collection',
				method: 'get',
				data: {
					id: id
				}
			}).then((res) => {
				if(this.isLogin){
					const resData = res.data;
					this.projectDetail = res.data.data[0];
					// for(var i = 0; i < this.projectDetail.members.length; i++){
					// 	const _curr = this.projectDetail.members[i];
					// 	this.projectDetail.members[i] = utils.formatUserInfo(_curr);
					// }
					actions.loading(store, false);
				}
			})
		},
		deleteProject() {
			const _this = this;
			actions.confirm(store, {
				show: true,
				msg: '是否删除本项目？',
				apply() {
					_this.$http({
						url: '/api/collection?id=' + _this.projectDetail.id,
						method: 'delete'
					}).then((res) => {
						actions.alert(store, {
							show: true,
							msg: '删除成功',
							type: 'success'
						})
						_this.$route.router.go('/main/project/list/mine');
					})
				}
			});
		}
	},
	route: {
		data(transtion) {
			const id = transtion.to.params.id;
			this.getProjectDetail(id);
		}
	}
}

</script>