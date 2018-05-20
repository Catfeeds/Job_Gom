<template>
	<drop>
		<button type="button" class="btn btn-default dropChip" data-toggle="dropdown">
			<b>{{configc[0].name || '请添加'}}</b>
			<span class="caret"></span>
		</button>
		<ul slot="dropdown-menu" class="dropdown-menu">
			<li v-for="item in configc" @click="componentReplyFunc(item)"><a>{{item.name}}</a></li>
		</ul>
	</drop>
</template>
<style scoped>
</style>
<script>
	import { dropdown } from 'vue-strap';
	import $ from 'jquery';
	export default {
		name: 'dropdown',
		props: ['configc', 'componentreply'],
		ready() {},
		components: {
			drop: dropdown
		},
		methods: {
			componentReplyFunc(item) {
				$('.dropChip').find('b').text(item.name);
				this.componentreply.drop = item;
				this.$dispatch('componentreplyC', 'changed');
			}
		},
		watch: {
			configc: {
				handler() {
					const b = $('.dropChip').find('b');
					if (this.configc.length > 0) {
						b.text(this.configc[0].name);
					} else {
						b.text('请添加');
					}
				}
			}
		}
	};
</script>
