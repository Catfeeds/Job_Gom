<template>
	<div class="side-nav-con" :class="{'side-close': !sideNavShow}">
		<ul class="nav navbar-nav side-nav">
			<li :class="{'active': isActive === 'project'}">
				<a v-link="{name: 'listProject'}"><i class="fa fa-fw fa-cubes"></i>项目</a>
			</li>
			<li :class="{'active': isActive === 'report'}">
				<a v-link="{name: 'listReport'}"><i class="fa fa-fw fa-table"></i>报表</a>
			</li>
			<li :class="{'active': isActive === 'component'}">
				<a v-link="{name: 'listComponent'}"><i class="fa fa-fw fa-plug"></i>组件</a>
			</li>
			<li :class="{'active': isActive === 'data'}">
				<a v-link="{name: 'listData'}"><i class="fa fa-fw fa-bar-chart"></i>数据</a>
			</li>
			<li :class="{'active': isActive === 'tool'}">
				<a v-link="{name: 'tool'}"><i class="fa fa-fw fa-legal"></i>工具</a>
			</li>
			<li :class="{'active': isActive === 'user'}" v-if="userInfo.UD === '1'">
				<a v-link="{name: 'user'}"><i class="fa fa-fw fa-user"></i>用户</a>
			</li>
		</ul>
		<span class="ctl-nav" @click="controlSideNav()"><i class="fa" :class="{'fa-long-arrow-right': !sideNavShow, 'fa-long-arrow-left': sideNavShow}"></i></span>
	</div>
</template>
<style scoped>
.side-nav-con {
	position: relative;
	position: fixed;
	top: 51px;
	left: 180px;
	width: 180px;
	margin-left: -180px;
	bottom: 0;
	overflow-x: hidden;
	transition: all ease 0.2s;
	overflow: hidden;
}

.side-nav {
	height: 100%;
	border: none;
	border-radius: 0;
	overflow-y: auto;
	background-color: #272727;
	overflow-x: hidden;
	padding-bottom: 40px;
}

.side-nav>li>a {
	width: 180px;
}

.side-nav li a:hover,
.side-nav li a:focus {
	outline: none;
	background-color: #000 !important;
}

.side-nav>li>ul {
	padding: 0;
}

.side-nav>li>ul>li>a {
	display: block;
	padding: 10px 15px 10px 38px;
	text-decoration: none;
	color: #999;
}

.side-nav>li>ul>li>a:hover {
	color: #fff;
}

.side-close {
	width: 48px;
}

.ctl-nav {
	bottom: 0;
	width: 100%;
	background-color: #444;
	height: 40px;
	display: block;
	position: absolute;
	cursor: pointer;
	text-align: center;
}
.ctl-nav i {
	display: inline-block;vertical-align: middle;line-height: 40px;color: #eee;margin-right: 0;
}
</style>
<script>
import actions from 'actions';
import store from 'store';
export default {
	name: 'nav-slide',
	data() {
		return {
			isActive: ''
		};
	},
	vuex: {
		getters: {
			sideNavShow: () => store.state.sideNavShow,
			userInfo: () => store.state.userInfo
		}
	},
	methods: {
		controlSideNav() {
			actions.controlSideNav(store, !this.sideNavShow);
		}
	},
	watch: {
		'$route.path': {
			handler: function() {
				try {
					this.isActive = this.$route.path.match(/\/(\w+)\//)[1];
				} catch (e) {
					this.isActive = '';
				}
			},
			immediate: true
		}
	}
};
</script>
