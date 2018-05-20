<template>
	<div class="alert-con" v-show="alertConfig.show" transition="fade">
		<div class="alert" :class="[alertType, {'alert-dismissible': alertConfig.dismissible}]" role="alert">
			<button @click="hide()" v-show="alertConfig.dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			{{{alertConfig.msg}}}
		</div>
	</div>
</template>
<style scoped>
.alert-con {
	position: fixed;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2000;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'alert',
	computed: {
		alertType: function() {
			return 'alert-' + this.alertConfig.type;
		}
	},
	vuex: {
		getters: {
			alertConfig: () => store.state.alertConfig
		}
	},
	methods: {
		hide: () => {
			actions.hideAlert(store);
		}
	}
};
</script>
