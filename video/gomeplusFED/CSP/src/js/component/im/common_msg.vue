<template>
	<div class="im-right" style="height: 600px;">
		<div id="drag_area" style="position: relative;height: 47px;">
			<div class="link-a" style="margin-bottom: 8px;">
				<a href="javascript:;" @click="noUseTip()">客户信息</a>
				<a href="javascript:;" @click="noUseTip()">圈子推荐</a>
				<a href="javascript:;" @click="noUseTip()">话题推荐</a>
			</div>
			<div class="icon-dian" style="position: absolute;bottom:0;left: 0;width: 100%;cursor: s-resize"></div>
		</div>
		<div id="behind" style="overflow: hidden">
			<div class="left-tab">
				<a href="javascript:;" class="active">常用语<em class="icon-tab"></em></a>
				<a href="javascript:;" @click="noUseTip()">用户订单<em class="icon-tab"></em></a>
				<a href="javascript:;" @click="noUseTip()">跟进管理<em class="icon-tab"></em></a>
			</div>
			<div class="right-search">
				<input @keyup.enter="commonMsgF($event)" class="common" v-model="key_word" type="text" placeholder="搜索常用语">
				<em @click="clearSearch()" class="icon-clear"></em>
				<a href="javascript:void(0)" @click="commonMsgF($event)" class="btn-search"></a>
			</div>
			<div class="im-phrase-list">
				<div class="phrase-list">
					<!--循环开始-->
					<div class="list-bg" v-for="one in treeData">
						<div class="list-title first_level"  v-if="one.type == 1" data-show="show" @click="toggle(one,$event)">{{one.title}}<em class="icon-down icon-close"></em></div>
						<li style="margin-left: 10px;cursor: pointer" v-if="one.type == 4" @dblclick="commonMsgAdd($event,one.desc)"><span>{{one.title}}</span></li>
						<!--ul上class="none"为隐藏block为显示-->
						<div v-for="two in one.children">
							<li v-if="two.type == 2" class="second_level" data-show="show" style="cursor: pointer;" @click="toggle(two,$event)"><em class="icon-jia icon-po"></em><span>{{two.title}}</span></li>
							<li v-if="two.type == 4" style="margin-left: 10px;" class="multiline-overflow" @dblclick="commonMsgAdd($event,two.desc)"><span>{{two.title}}</span></li>
							<div v-if="two.children" v-for="three in two.children">
								<div v-if="three.type == 4" @dblclick="commonMsgAdd($event,three.desc)" style="margin-left: 34px;cursor: pointer" data-type={{three.type}}>{{three.title | json}}</div>
								<div v-if="three.type == 3" style="margin-left: 18px;cursor: pointer" class="third_level multiline-overflow" data-show="show" @click="toggle(three,$event)"><em class="icon-jia icon-po" data-type={{three.type}}></em><span>{{three.title}}</span></div>
								<div v-if="three.children" v-for="four in three.children">
									<div v-if="four.type == 4" style="margin-left: 54px;cursor: pointer;"  @dblclick="commonMsgAdd($event,four.desc)">{{four.title}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.icon-po {
	position: relative;
	top: 5px;
	margin: 0 5px;
}

.icon-down {
	transition: all ease 0.2s;
}

.icon-close {
	transform: rotate(-90deg);
}

</style>
<script type="text/ecmascript-6">
import $ from 'jquery';
import Vue from 'vue';
import actions from 'actions';
import store from 'store';
export default {
	name: 'common_msg',
	vuex: {
		getters: {

		},
		actions: actions
	},
	data() {
		return {
			treeData: [],
			key_word: ''
		}
	},
	ready() {
		this.commonMsgF();
	},
	methods: {
		fetchTree(item, cb) {
			var _self = this;
			var id = item.id;
			var type = item.type;
			this.$http({
				url: 'commonLanguage/getItemTree',
				method: 'get',
				params: {
					id: id,
					type: type,
					searchval: _self.key_word
				}
			}).then((res) => {
				if (res.data.result !== true) {
					actions.alert(store, {
						show: true,
						msg: res.data.message,
						type: 'info',
						delay: 2500
					})
					return
				}
				Vue.set(item, 'children', res.data.data.children);
				cb && cb();
			})
		},
		toggle(item, e) {
			var id = item.id;
			var type = item.type;
			const dom = event.currentTarget;
			const show = dom.dataset.show;
			if (show == 'show') {
				this.fetchTree(item, function() {
					dom.dataset.show = 'hide'
				})
			}
			switch (type) {
				case 1:
					$(dom).nextAll().slideToggle();
					$(dom).find('em').toggleClass('icon-close');
					break;
				case 2:
					$(dom).nextAll().slideToggle();
					$(dom).find('em').toggleClass('icon-jian');
					break;
				case 3:
					$(dom).nextAll().slideToggle();
					$(dom).find('em').toggleClass('icon-jian');
					break;
				default:
					actions.alert(store, {
						show: true,
						msg: '修改状态提交异常',
						type: 'info',
						delay: 2500
					})
			}
		},
		commonMsgAdd(e, desc) {
			const _self = this;
			if (desc.trim()) {
				_self.$dispatch('common-msg', desc)
			}
		},
		commonMsgF(e) {
			var self = this;
			const data = {
				id: 0,
				type: 0,
				searchval: self.key_word
			}
			this.$http({
				url: 'commonLanguage/getItemTree',
				method: 'get',
				params: data
			}).then((res) => {
				if (res.data.result !== true) {
					actions.alert(store, {
						show: true,
						msg: res.data.message,
						type: 'info',
						delay: 2500
					})
					return
				}
				self.treeData = res.data.data.children;
			})
		},
		clearSearch() {
			this.key_word = '';
			const self = this;
			this.$http({
				url: 'commonLanguage/getItemTree',
				method: 'get',
				params: {
					id: 0,
					type: 0,
					searchval: this.key_word
				}
			}).then((res) => {
				if (res.data.result !== true) {
					actions.alert(store, {
						show: true,
						msg: res.data.message,
						type: 'info',
						delay: 2500
					})
					return
				}
				self.treeData = res.data.data.children;
			})
		},
		bindResize(el, ok, max, min) {
			var els = el.style,
				oks = ok.style;
			var x, y;
			x = y = 0;
			$(el).mousedown(function(e) {
				x = e.clientX - el.offsetWidth,
					y = e.clientY - el.offsetHeight;
				el.setCapture ? (
					el.setCapture(),
					el.onmousemove = function(ev) {
						mouseMove(ev || event)
					},
					el.onmouseup = mouseUp
				) : (
					$(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
				);
				e.preventDefault()
			});

			function mouseMove(e) {
				var h = 0;
				if ((e.clientY - y) <= max && (e.clientY - y) >= min) {
					h = (e.clientY - y)
				} else if ((e.clientY - y) > max) {
					h = max
				} else if ((e.clientY - y) < min) {
					h = min
				}
				els.height = h + 'px';
				oks.height = (max - (h)) + 'px';
			}

			function mouseUp() {
				el.releaseCapture ? (
					el.releaseCapture(),
					el.onmousemove = el.onmouseup = null
				) : (
					$(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
				)
			}
		},
		noUseTip() {
			actions.alert(store, {
				show: true,
				msg: '该功能正在建设中，敬请期待'
			})
			return;
		}
	}
}
</script>
