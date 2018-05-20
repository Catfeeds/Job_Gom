<template>
	<div class="modal" role="dialog" v-show="modalConfig.show" transition="fade">
		<div class="modal-back" v-show="modalConfig.show" transition="fade"></div>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button @click="hide()" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">{{modalConfig.title || 'Modal title'}}</h4>
				</div>
				<div class="modal-body">
					<slot></slot>
				</div>
				<div class="modal-footer">
					<button @click="cancelFunc()" type="button" v-if="!modalConfig.isCloseBtnHide"  class="btn btn-default">{{modalConfig.cancelStr || 'Cancel'}}</button>
					<button @click="applyFunc()" type="button" class="btn btn-primary">{{modalConfig.applyStr || 'Apply'}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.modal-back {
	position: fixed;top: 0;left: 0;background-color: rgba(0,0,0,0.4);width: 100%;height: 100%;
}
</style>
<script>
/*
 * 引入 Modal 组件，传入 props modalConfig 示例如下
 * modalConfig example
 modalConfig: {
 	show: true,
 	title: '请选择时间',
 	applyStr: '确认',
 	cancelStr: '取消',
 	applyFunc: function() {
 		console.log(this);
 	},
 	cancelFunc: () => {
 		console.log(this);
 	}
 }
 */
export default {
	name: 'modal',
	props: ['modalConfig'],
	methods: {
		hide() {
			this.modalConfig.show = false;
		},
		applyFunc() {
			if (typeof this.modalConfig.applyFunc !== 'function') {
				throw new Error('ApplyFunc must be a function!');
			}
			this.modalConfig.applyFunc && this.modalConfig.applyFunc();
			// this.hide();
		},
		cancelFunc() {
			if (typeof this.modalConfig.cancelFunc !== 'function') {
				throw new Error('CancelFunc must be a function!');
			}
			this.modalConfig.cancelFunc && this.modalConfig.cancelFunc();
			this.hide();
		}
	},
	watch: {
		'modalConfig.show': {
			handler: function() {
				if (this.modalConfig.show && [...document.body.classList].indexOf('modal-open') === -1) {
					document.body.classList.add('modal-open');
				} else {
					document.body.classList.remove('modal-open');
				}
			},
			immediate: true
		}
	}
};
</script>
