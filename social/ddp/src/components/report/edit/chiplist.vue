<template>
	<div class="chiplist">
		<!-- <div class="switch">
			<span class="glyphicon glyphicon-chevron-up"></span>
		</div> -->
		<ul>
			<li v-for="(index, item) in componentList" :title="item.name" @dragstart='dragstart($event, item)' draggable='true'>
				{{item.name}}
			</li>
		</ul>
		<!-- <div class="switch">
			<span class="glyphicon glyphicon-chevron-down"></span>
		</div> -->
	</div>
</template>
<script>
	import store from 'store';
	export default {
		data() {
			return {
				// list: [1, 2]
			};
		},
		vuex: {
			getters: {
				componentList: () => store.state.componentList
			}
		},
		methods: {
			dragstart(ev, item) {
				ev.dataTransfer.effectAllowed = 'move';
				ev.dataTransfer.setData('id', item.id);
				ev.dataTransfer.setData('name', item.name);
				// ev.dataTransfer.setDragImage(ev.currentTarget);
			}
		}
	};
</script>
<style scoped>
	.chiplist {
		width: 150px;
		position: fixed;
		height: calc(100% - 50px - 10px - 60px - 10px - 100px);
		overflow: auto;
	}
	.switch {
		text-align: center;
		background-color: #abc;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}
	ul {
		border: 1px solid #abc;
		margin: 0;
		padding: 0;
	}
	ul li {
		list-style: none;
		height: 50px;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #abc;
		text-overflow: ellipsis;
		white-space:nowrap;
		overflow:hidden;
		cursor: move;
	}
</style>
