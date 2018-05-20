<template>
	<header style="background-color: rgb(32, 160, 255);">
        <div class="header-logo">前端持续集成平台</div>
		<div class="header-operations">
			<li>{{username}}</li>
			<li><el-button type="primary" v-on:click="handleSyncData">数据同步</el-button></li>
			<li>
				<el-button type="primary" v-on:click="handleLogout">退出</el-button>
			</li>
		</div>
	</header>
</template>
<style>
    .header-logo {
        font-size: 24px;
        color: #fff;
        margin-left: 20px;
    }
</style>
<script>
    import {syncData, logout} from '../../api/user';
    import {deleteCookie} from '../../util/cookie';
    import store from 'store';
    export default{
        vuex: {
            getters:{
                user_name() {
                    console.log(store.state.userInfo.username);
                    return store.state.userInfo.username;
                }
            }
        },
        data(){
            return {
                msg: 'hello vue'
            }
        },
        computed: {
            username() {
                let userInfo = JSON.parse(store.state.user_info);
                return userInfo.username;
            }
        },
		methods: {
            handleSyncData() {
                syncData().then(data=>{
                    if (data.code === 200) {
                        this.$message.success({
                            showClose: true,
                            message: '数据同步成功'
                        });
                    } else{
                        this.$message.error({
                            showClose: true,
                            message: '数据同步失败'
                        });
                    }
                });
            },
            handleLogout() {
                // 需要删除session
                logout().then(data=>{
                    deleteCookie('user_info');
                    this.$router.replace('/login');
				});
            }
		}
    }
</script>
