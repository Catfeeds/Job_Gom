<template>
	<em :class="{'icon-check active':checked,'icon-check':!checked}" @click="choose"></em>
</template>
<style scoped>

</style>
<script>
import Vue from 'vue';

const Checkbox = Vue.extend({
	name: 'Checkbox',
	props: ['value', 'checked', 'change'],
	methods: {
		choose() {
			this.checked = !this.checked;
			this.change && this.change(this.checked);
		}
	}
})

Vue.component('v-checkbox', Checkbox);

export default Checkbox;
</script>