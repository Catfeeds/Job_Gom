<template>
	<div class="confirm transition" transition="fade" v-show="confirmConfig.show">
		<div class="pop-box">
			<div class="ui-dialog-title">{{confirmConfig.title}}</div>
			<div class="ui-dialog-body">
				<p class="confirm-txt">{{confirmConfig.msg}}</p>
			</div>
			<div class="ui-dialog-footer clearfix">
				<div class="ui-dialog-button">
					<a href="javascript:void(0)" @click="cancel(),hide()" class="btn">取消</a>
					<a href="javascript:void(0)" @click="apply(),hide()" class="btn btn-blue mgl19">确认</a>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.confirm {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
}
.pop-box{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Confirm',
	vuex: {
		getters: {
			confirmConfig() {
				return store.state.confirmConfig;
			}
		}
	},
	methods: {
		apply() {
			this.confirmConfig.apply && this.confirmConfig.apply();
		},
		cancel() {
			this.confirmConfig.cancle && this.confirmConfig.cancle();
		},
		hide() {
			actions.confirm(store, {
				show: false
			})
		}
	}
}
</script>