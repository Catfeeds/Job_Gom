<template>
	<m-main-con>
		<m-top>
			<p class="title">{{id === 'new' ? '新建项目' : '修改项目'}}</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title"># 项目名称</p>
					<div class="main_form">
						<span class="iconfont required">&#xe600;</span>
						<input type="text" placeholder="请输入项目名称" v-model="projectDetail.name"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># 项目描述</p>
					<div class="main_form">
						<textarea maxlength="200" placeholder="请输入项目描述" v-model="projectDetail.descr">{{projectDetail.descr}}</textarea>
						<div class="char_num">{{projectDetail.descr | length}}/200</div>
					</div>
				</div>
				<div class="item" v-show="id !== 'new'">
					<p class="title"># 创建人</p>
					<div class="main_form">
						<input type="text" disabled="disabled" :value="projectDetail.creater"></input>
					</div>
				</div>
				<div class="item" v-show="id !== 'new'">
					<p class="title"># 创建时间</p>
					<div class="main_form">
						<input type="text" disabled="disabled" :value="projectDetail.ctime | Date 'yyyy-MM-dd hh:mm:ss'"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># 成员</p>
					<div class="main_form">
						<input type="text" placeholder="请输入邮箱或姓名进行查询" v-model="memberQuery" debounce="300"></input>
						<ul class="member_query_list">
							<li class="no_one" v-show="showNoOne">无</li>
							<li v-for="item in members" @click="addMember(item)">{{item.name}}</li>
						</ul>
						<div class="memer_list">
							<div class="member_item" v-for="item in memberResult">
								<span>{{item.name}}</span>
								<a href="javascript:void(0)" class="iconfont close" @click="deleteMember($index, item.id)">&#xe609;</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" @click="save()">保存</a>
				<a href="javascript:void(0)" class="btn btn_default" @click="cancel()">取消</a>
			</div>
		</m-bottom>
	</m-main-con>
</template>

<style scoped>
.member_query_list{
	position: absolute;
	width: 350px;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 4px;
	margin-top: 3px;
	z-index: 9999;
	max-height: 168px;
	overflow: auto;
}
.member_query_list::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0, 0, 0, 0);
}
.member_query_list li{
	font-size: 14px;
	line-height: 28px;
	color: #333;
	text-shadow: none;
	padding: 0 10px;
	cursor: pointer;
	transition: all ease 0.2s;
}
.member_query_list li.no_one:hover{
	background-color: #fff;
	color: #333;
	border-radius: 4px;
}
.member_query_list li:hover{
	background-color: rgba(82,215,105,0.9);
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}
.memer_list{

}
.memer_list .member_item{
	display: inline-block;vertical-align: middle;padding: 8px 15px;background-color: #fff;color: #333;border: 1px solid #d9d9d9;border-radius: 15px;font-size: 14px;line-height: 12px;text-shadow: none;
	position: relative;margin-top: 15px;
}
.memer_list .member_item .iconfont.close{
	font-size: 14px;color: #111;text-decoration: none;font-weight: 600;transition: all ease 0.2s;text-shadow: 0 0 10px rgba(255,255,255,0.5);
}
.memer_list .member_item .iconfont.close:hover{
	color: #666;
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

export default {
	name: 'ProjectEdit',
	data() {
		return {
			id: null,
			projectDetail: {
				// name: '',
				// descr: '',
				// creater: '',
				// ctime: '',
				// member: []
			},
			memberQuery: '',
			members: [],
			memberResult: [],
			canQuit: false,
			showNoOne: false
		}
	},
	vuex: {
		getters: {
			isLogin: () => {
				return store.state.isLogin;
			},
			userInfo: () => {
				return store.state.userInfo;
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
	created() {
		const _this = this;
		this.$route.router.beforeEach((transition) => {
			if(!this.canQuit){
				transition.abort();
				actions.confirm(store, {
					show: true,
					msg: '是否放弃修改？',
					apply() {
						_this.canQuit = true;
						_this.$route.router.go(transition.to.path);
					}
				});
				return;
			}else{
				transition.next();
			}
		})
	},
	methods: {
		inputCheck() {
			// 错误检查
			if(this.projectDetail.name === '' || !this.projectDetail.name){
				actions.alert(store, {
					show: true,
					msg: '输入信息有误，请检查',
					type: 'danger'
				})
				return true;
			}
		},
		save() {
			const _this = this;
			if(this.inputCheck()){
				return;
			}

			const membersSend = [];
			for(let i = 0; i < this.memberResult.length; i++){
				const _curr = this.memberResult.length[i];
				membersSend.push(_curr.id);
			}

			this.$http({
				url: '/api/collection' + (this.id === 'new' ? '' : '?id=' + this.id),
				method: this.id === 'new' ? 'post' : 'put',
				data: {
					name: this.projectDetail.name,
					descr: this.projectDetail.descr,
					members: membersSend.join(',')
				}
			}).then((res) => {
				if(this.isLogin){
					const resData = res.data;
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: this.id === 'new' ? '新建成功' : '修改成功'
					})
					this.canQuit = true;
					this.id === 'new' ? this.$route.router.go('/main/project/detail/' + resData.data.id) : null;
				}
			})
		},
		cancel() {
			if(this.id === 'new'){
				this.$route.router.go('/main/project/list/mine');
			}else{
				this.$route.router.go('/main/project/detail/' + this.projectDetail.id);
			}
		},
		queryMember() {
			const _this = this;
			this.$http({
				url: '/api/users/search',
				method: 'get',
				data: {
					query: this.memberQuery
				}
			}).then((res) => {
				const resDate = res.data;
				_this.members = resDate.data;
				_this.showNoOne = false;
				if(_this.members.length === 0){
					_this.showNoOne = true;
				}
			})
		},
		addMember(member) {
			this.memberResult.push(member);
			this.memberQuery = '';
		},
		deleteMember(index, id) {
			this.memberResult.splice(index, 1);
		}
	},
	route: {
		data(transtion) {
			this.id = transtion.to.params.id;
			if(this.id !== 'new'){
				actions.loading(store, true);
				this.$http({
					url: '/api/collection',
					method: 'get',
					data: {
						id: this.id
					}
				}).then((res) => {
					if(this.isLogin){
						const resData = res.data;
						this.projectDetail = resData.data[0];
						this.memberResult =  resData.data[0].members;
						actions.loading(store, false);
					}
				})
			}
		}
	},
	watch: {
		memberQuery: {
			handler(val) {
				if(val === ''){
					this.members = [];
					this.showNoOne = false;
				}
				if(val !== ''){
					this.queryMember();
				}
			}
		}
	}
}

</script>
