<template>
	<ul :style="positionStyle" @dragstart='dragstart' draggable='true'>
		<li :title="name">{{ name }}<span @click="remove">x</span></li>
		<li v-for="item in list" :title="item.columnname">{{ item.columnname }}</li>
	</ul>
</template>
<script>
	export default {
		props: [ 'value', 'name', 'list', 'x', 'y' ],
		computed: {
			positionStyle() {
				return {
					top: this.y + 'px',
					left: this.x + 'px'
				};
			}
		},
		methods: {
			dragstart(ev) {
				ev.dataTransfer.setData('Value', this.value);
				ev.dataTransfer.setData('Text', this.name);
				ev.dataTransfer.setDragImage(ev.currentTarget, 0, 0);
			},
			remove() {
				let temp = this.$parent.list.find(x => x.tablename === this.name);
				let index = this.$parent.list.indexOf(temp);
				this.$parent.list.splice(index, 1);
			}
		}
	};
</script>
<style scoped>
	ul {
		padding: 10px;
		position: absolute;
		background: #fff;
	}

	ul>li {
		list-style: none;
		height: 20px;
		width: 150px;
		line-height: 20px;
		text-align: left;
		background-color: #eee;
		padding: 0 0 0 10px;
		margin: 5px 0;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}

	ul>li:first-child {
		background-color: #6C9FD2;
	}

	ul>li>span {
		position: absolute;
		right: 5px;
		top: -5px;
		cursor: pointer;
	}
</style>