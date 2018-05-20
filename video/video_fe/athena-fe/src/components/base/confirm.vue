<template>
	<div class="confirm-con" v-show="confirmConfig.show" transition="fade">
		<div class="panel" :class="[confirmType]">
			<div class="panel-heading">{{confirmConfig.title}}</div>
			<div class="panel-body">
				<p class="confirm-msg">{{confirmConfig.msg}}</p>
			</div>
			<div class="panel-footer">
				<div class="func-list">
					<button class="btn btn-default btn-sm" @click="cancelFunc()">{{confirmConfig.cancelStr}}</button>
					<button class="btn btn-success btn-sm" @click="applyFunc()">{{confirmConfig.applyStr}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.confirm-con {
	min-width: 150px;
	position: fixed;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
	min-width: 400px;
}

.panel-body {
	position: relative;
	min-height: 150px;
}

.confirm-msg {
	text-align: center;
	width: 100%;
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	padding: 0 20px;
}
.func-list {
	text-align: right;
}
.func-list button {
	display: inline-block;
	margin: 0 5px;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'confirm',
	vuex: {
		getters: {
			confirmConfig: () => store.state.confirmConfig
		}
	},
	computed: {
		confirmType: function() {
			return 'panel-' + this.confirmConfig.type;
		}
	},
	methods: {
		applyFunc() {
			if (typeof this.confirmConfig.applyFunc !== 'function') {
				throw new Error('ApplyFunc must be a function!');
			}
			this.confirmConfig.applyFunc && this.confirmConfig.applyFunc();
			this.hide();
		},
		cancelFunc() {
			if (typeof this.confirmConfig.cancelFunc !== 'function') {
				throw new Error('CancelFunc must be a function!');
			}
			this.confirmConfig.cancelFunc && this.confirmConfig.cancelFunc();
			this.hide();
		},
		hide() {
			actions.hideConfirm(store);
		}
	}
};
</script>
