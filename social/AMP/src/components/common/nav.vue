<template>
	<div class="content-menu">
		<ul>
			<li v-for="(item, index) in routeConfig" @click="emitRoute(index)" :class="{'actived': item.checked}">
				<div class="menu-header"><a :href="item.link" title=""><em v-if="item.sub.length" class="icon icon-arrow"></em><em class="icon" :class="item.icon"></em><span class="header-text">{{item.msg}}</span></a></div>
				<div class="menu-second" v-bind:class="{'menu-second-new':item.msg == '用户协议'}">
					<a v-for="(subItem, subIndex) in item.sub" :class="{'actived': checkIsActive(subItem.link.replace('/#', ''))}" :href="subItem.link" title="">{{subItem.msg}}</a>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import {
	copyObj
} from 'utils/common';
export default {
	name: 'app-accout-nav',
	props: ['config'],
	data() {
		return {
			routeConfig: []
		};
	},
	mounted() {
		this.routeConfig = copyObj(this.config);
	},
	methods: {
		emitRoute(index) {
			this.routeConfig.forEach((item) => {
				item.checked = false;
			});
			this.routeConfig[index].checked = true;
		},
		checkIsActive(url) {
			let path = this.$route.matched[this.$route.matched.length - 1].path;

			Object.keys(this.$route.params).forEach((item) => {
				let regx = new RegExp(`/:${item}`, 'g');
				path = path.replace(regx, '');
			});
			return url === path;
		}
	}
};
</script>
