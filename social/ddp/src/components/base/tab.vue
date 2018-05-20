<template>
	<ul class="nav nav-tabs" style="margin-bottom: 10px;">
		<li role="presentation" v-for="(index, item) in list" :class="{'active': index === val}" @click="check(index)">
			<a href="javascript:void(0)">{{item}}</a>
		</li>
	</ul>
</template>
<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			'list': {
				type: Array
			},
			'val': {
				type: Number,
				default: 0
			},
			'iscallback': {
				type: Boolean,
				default: true
			}
		},
		methods: {
			check(index) {
				this.val = index;
				if (this.iscallback) {
					return this.$dispatch('tab', index);
				}
			}
		}
	};
</script>
