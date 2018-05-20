<template>
	<div>
		<transition name="fade">
			<div style="z-index:1200;" class="master" v-show="config.show" @click="closeDrawer()"></div>
		</transition>
		<transition name="drawer">
			<div class="amp-drawer" v-if="config.show">
				<div class="drawer-part">
					<h2 class="part-header"><span class="header-text">{{actionMap[config.action] + typeMap[config.type]}}</span><span class="header-fn"><em @click="closeDrawer()" class="icon icon-close"></em></span></h2>
					<div class="part-guide" :class="'part-guide0' + (orderKey.indexOf(config.type) + 1)" v-show="config.action === 'new'">
						<span class="guide-step guide-step01">
							<b class="step-text">新建投放计划</b>
							<b class="step-number">1</b>
							<b class="step-icon">
								<em class="icon icon-right"></em>
							</b>
						</span>
						<span class="guide-step guide-step02">
							<b class="step-text">新建投放单元</b>
							<b class="step-number">2</b>
							<b class="step-icon">
								<em class="icon icon-right"></em>
							</b>
						</span>
						<span class="guide-step guide-step03">
							<b class="step-text">新建创意</b>
							<b class="step-number">3</b>
							<b class="step-icon">
								<em class="icon icon-right"></em>
							</b>
						</span>
						<span class="guide-percent"></span>
					</div>
					<!-- <transition-group name="drawer-inner"> -->
						<m-newplan key="1" v-if="config.show && config.type === 'plan'"></m-newplan>
						<m-newunit key="2" v-if="config.show && config.type === 'unit'"></m-newunit>
						<m-newidea key="3" v-if="config.show && config.type === 'idea'"></m-newidea>
					<!-- </transition-group> -->
				</div>
				<div class="drawer-btn">
					<button class="btn btn-primary" @click="save">保存</button>
					<button class="btn btn-primary" v-show="config.type !== 'idea' && config.action === 'new'" @click="saveAndNext()">保存并下一步</button>
					<button @click="closeDrawer()" class="btn btn-gray">取消</button>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
/*
 * 抽屉调用方法：调用 actions 的 controlDrawer 方法
 * 传入一个对象
 * 具体可看 vuex/state/drawer.js 列出的 key
 */
import store from 'store';
import actions from 'actions';

import Event from 'event';
import {
	objType,
	mixin,
	copyObj
} from 'utils/common';

import CONST from '../../../help/CONST.js';

import DrawerPlan from './drawer-plan.vue';
import DrawerUnit from './drawer-unit.vue';
import DrawerIdea from './drawer-idea.vue';
export default {
	name: 'app-put-new',
	data() {
		return {
			typeMap: {
				plan: '投放计划',
				unit: '投放单元',
				idea: '创意'
			},
			orderKey: ['plan', 'unit', 'idea'],
			orderMsg: ['投放计划', '投放单元', '创意'],
			actionMap: {
				new: '新建',
				copy: '复制',
				modify: '修改'
			},
			campaignId: 0
		};
	},
	computed: {
		config: () => store.state.drawerCtrl
	},
	components: {
		'm-newplan': DrawerPlan,
		'm-newunit': DrawerUnit,
		'm-newidea': DrawerIdea
	},
	methods: {
		closeDrawer() {
			actions.controlDrawer(this.$store, {
				show: false,
				config:{}
			});
		},
		save(cb) {
			// 通知下一层将要保存，校验
			Event.$off('put-save-result');
			Event.$once('put-save-result', (argv) => {
				if (argv.error) {
					return;
				}
				Event.$emit('put-save-success');
				if (cb && objType(cb) === 'Function') {
					cb(argv);
				} else {
					actions.controlDrawer(store, {
						show: false
					});
				}
				this.$message({
					message: '保存成功',
					type: 'success',
					duration: 3000
				});
			});
			Event.$emit('put-save');
		},
		saveAndNext() {
			this.save((other) => {
				let index = this.orderKey.indexOf(this.config.type);
				actions.controlDrawer(this.$store, {
					show: true,
					type: this.orderKey[index + 1],
					action: this.config.action,
					config: copyObj(mixin(CONST[Object.keys(CONST)[index + 1]], other.res.data)),
					isRebate: other.isRebate ? other.isRebate : undefined
				});
			});
		}
	},
	watch: {
		'config.type': {
			handler() {
				// 置顶
				let ele = document.querySelector('.drawer-part');
				if (ele) ele.scrollTop = 0;
			},
			deep: true
		}
	}
};
</script>
