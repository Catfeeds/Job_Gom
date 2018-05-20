<template>
	<ul class="draggable" :style="positionStyle">
		<li :title="name">{{ tablename }}<span class="glyphicon glyphicon-remove remove" @click="remove"></span><span @click="edit" class="glyphicon glyphicon-pencil edit"></span></li>
		<li v-for="(index, item) in obj.columns | filterBy true in 'isreturn'" v-if="index < 5" :class="{'no-return': !item.isreturn}" :title="item.columnname">{{ item.columnname }}</li>
		<li v-if="obj.columns.length > 5">
			... ...
		</li>
	</ul>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import interact from 'interact.js';

	export default {
		props: ['obj'],
		vuex: {
			getters: {
				contentlist: () => store.state.contentList,
				relatelist: () => store.state.relateList
			}
		},
		computed: {
			positionStyle() {
				return {
					top: this.obj.y + 'px',
					left: this.obj.x + 'px'
				};
			},
			tablename() {
				return this.obj.schemaname + '.' + this.obj.tablename;
			}
		},
		ready() {
			this.$nextTick(() => {
				var content = document.getElementsByClassName('content')[0];
				interact('.draggable')
				.draggable({
					// enable inertial throwing
					inertia: true,
					// keep the element within the area of it's parent
					restrict: {
						restriction: 'parent',
						endOnly: true,
						// elementRect: { top: this.y, left: this.x, bottom: content.offsetHeight - this.y, right: content.offsetWidth - this.x }
						elementRect: { left: 0, right: 0, top: 0, bottom: 0 }
					},
					// enable autoScroll
					autoScroll: true,

					// call this function on every dragmove event
					onmove: dragMoveListener,
					// call this function on every dragend event
					onend: (event) => {
						var textEl = event.target.querySelector('p');

						textEl && (textEl.textContent =
							'moved a distance of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + 'px');
					}
				});
			});

			var dragMoveListener = (event) => {
				var target = event.target;
					// keep the dragged position in the data-x/data-y attributes
				var	x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
				var	y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.webkitTransform =
				target.style.transform =
				'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			};

			// this is used later in the resizing and gesture demos
			window.dragMoveListener = dragMoveListener;
		},
		methods: {
			dragstart(ev) {
				ev.dataTransfer.setData('schemaname', this.obj.schemaname);
				ev.dataTransfer.setData('tablename', this.obj.tablename);
				ev.dataTransfer.setData('DB', this.obj.dbid);
				// ev.dataTransfer.setDragImage(ev.currentTarget, 0, 0);
			},
			edit() {
				actions.SetContent(store, this.tablename, {isedit: true});
				actions.SetEditConfig(store, {show: true});
			},
			remove() {
				// 删除
				let temp = this.contentlist.find(x => x.schemaname.concat('.', x.tablename) === this.tablename);
				// let index = this.contentlist.indexOf(temp);
				actions.SpliceContent(store, temp);
			}
		}
	};
</script>
<style scoped>
	ul {
		padding: 10px;
		position: absolute;
		background: #fff;
		border-radius: 5px;
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
		border-radius: 2px;
		cursor: move;
	}

	ul>li:first-child {
		background-color: #6C9FD2;
	}

	ul>li>span.remove {
		position: absolute;
		right: 5px;
		top: 0px;
		cursor: pointer;
	}

	ul>li>span.edit {
		position: absolute;
		right: 25px;
		top: 0px;
		cursor: pointer;
	}

	.no-return {
		background-color: #abc;
	}
</style>