<template>
	<button class="btn btn-default" @click="show()">show modal</button>
	<Modal :modal-config="modalConfig">
		<h1>asd</h1>
	</Modal>
</template>
<style>

</style>
<script>
import Modal from '../base/modal.vue';

export default {
	data() {
		return {
			modalConfig: {
				show: false,
				title: '请选择时间',
				applyStr: '确认',
				cancelStr: '取消',
				applyFunc: function() {
					console.log('apply');
				},
				cancelFunc: () => {
					console.log('cancel');
				}
			}
		};
	},
	methods: {
		show() {
			this.modalConfig.show = true;
		}
	},
	components: {
		Modal
	}
};
</script>
