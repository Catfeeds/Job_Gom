<template>
	<li v-if="isRoot" class="root" >
		<ul>
			<Item v-for="model in model.children"
				  :model="model">
			</Item>
		</ul>
	</li>
	<li v-else class="child" >
		<div id="itemContent" @click="selectNode"  @dragover.prevent @drop="onDropNode" :class="{active : isActive}"
			 @dragstart="onDragStartNode" draggable="{{isDrag && isRealNode}}" title="{{model.title}}">
			<em id="plusIcon" @click="toggle" :class="[isFolder ? (open ? minusClass : addClass) : '']"></em><span id="item" >{{model.title}}</span>
		</div>
		<ul v-show="open" v-if="isFolder">
			<Item v-for="model in model.children"
				  :model="model">
			</Item>
		</ul>
	</li>
</template>

<script type="text/babel">
	import Vue from 'vue'
	import actions from 'actions'
	import store from 'store'

	var TreeCache = {
		root: null,
		pre: null,
		url: null,
		isDrag: false
	}

	export default{
		name: 'item',
		replace: true,
		props: {
			model: Object
		},
		data () {
			return {
				consts: {
					NEW_TITLE: '新增常用语标题',
					NEW_DESC: '新增常用语内容',
					ADDCOMMONMSG: 'MSG',
					ADDSUBCAT: 'SUB',
					ADDCAT: 'CAT',
					MSGLEVEL: 4,
					PLUSICON: 'plusIcon',
					ITEMTEXT: 'item'
				},
				open: false,
				isParent: false,
				count: 0,
				addClass: 'icon-jia',
				minusClass: 'icon-jia icon-jian',
				isActive: false,
				isDrag: false
			}
		},
		created () {
			// console.log(this.model.id)
			if (TreeCache.url == null && this.$parent.treeConfig) {
				// console.log('treeconfig...', this.model.treeConfig)
				TreeCache.url = this.$parent.treeConfig.url
				TreeCache.isDrag = this.$parent.treeConfig.drag
				// console.log("created....", this)
				TreeCache.root = this
			}
		},
		ready () {
			this.isDrag = TreeCache.isDrag;
		},
		computed: {
			isFolder () {
				return this.model && this.model.isParent
			},
			isRoot () {
				return this.model.id === 0
			},
			isRealNode () {
				return this.model.id > 0
			}
		},
		events: {
			'parent-msg': function (msg, cb) {
				var thisItem, self = this

				// console.log("msg...", msg)

				/**
				 * 以下参数依次为
				 * @param thisItem 当前组件
				 * @param isParent 是否为分类
				 * @param type 节点级别
				 * @param desc 常用语内容
				 * @param handlType 操作类型
				 * @private
				 */
				var _addModel = function (...value) {
					let params = Object.create({}, {
						id: {
							value: -1,
							writable: true,
							enumerable: true,
							configurable: true
						},
						title: {
							value: self.consts.NEW_TITLE,
							writable: true,
							enumerable: true,
							configurable: true
						},
						isParent: {
							value: value[1],
							writable: true,
							enumerable: true,
							configurable: true
						},
						type: {
							value: value[2],
							writable: true,
							enumerable: true,
							configurable: true
						}
					});
					if (value[3]) {
						params.desc = self.consts.NEW_DESC
					}
					if (value[4] === self.consts.ADDCAT) {
						value[0].$parent.model.children.push(params)
					} else {
						value[0].model.children.push(params)
					}
				};

				var _doHandler = function (msg, thisItem) {
					// args参数依次为: 当前组件, isParent 是否为分类, type 节点级别, desc 常用语内容, handlType 操作类型
					let args = []
					if (msg.handleType === self.consts.ADDCOMMONMSG) {
						args = [thisItem, false, self.consts.MSGLEVEL, self.consts.NEW_DESC, self.consts.ADDCOMMONMSG]
						_addModel(...args)
					} else if (msg.handleType === self.consts.ADDSUBCAT) {
						args = [thisItem, true, thisItem.model.type + 1, null, self.consts.ADDSUBCAT]
						_addModel(...args)
					} else if (msg.handleType === self.consts.ADDCAT) {
						args = [thisItem, true, thisItem.model.type, null, self.consts.ADDCAT]
						_addModel(...args)
					}
				}

				// TODO 改为TreeCache.pre

				//thisItem = this.findItem(this, msg.id, msg.type)
				thisItem = TreeCache.pre

				if (!thisItem.model.children) {
					Vue.set(thisItem.model, 'children', [])
				}

				// console.log("thisMod...", thisItem, this);

				_doHandler(msg, thisItem)

				if (cb) {
					if (msg.handleType === self.consts.ADDCAT) {
						this.$nextTick(() => {
							var lastModelIndex = thisItem.$parent.model.children.length -1
							var parentChildrenModelItem = thisItem.$parent.model.children
							var lastItemIndex = thisItem.$parent.$children.length - 1
							var parentChildItem = thisItem.$parent.$children
							parentChildItem[lastItemIndex].isActive = true
							TreeCache.pre.isActive = false
							cb(parentChildrenModelItem[lastModelIndex], parentChildItem[lastItemIndex], TreeCache.pre)
							TreeCache.pre = parentChildItem[lastItemIndex]
						})
					}else {
						thisItem.open = true
						this.$nextTick(() => {
							var activeModelItem = thisItem.model.children[thisItem.model.children.length -1]
							thisItem.$children[thisItem.$children.length - 1].isActive = true
							var activeItem = thisItem.$children[thisItem.$children.length - 1]
							TreeCache.pre.isActive = false
							cb(activeModelItem, activeItem, activeItem.$parent)
							TreeCache.pre = activeItem
						})
					}
				}
			},
			'refresh-msg': function (msg, cb) {
				//console.log('refresh-msg', msg.id);
				// TODO 改为TreeCache.pre

				// var item = this.findItem(this, msg.id, msg.type)
				var item = TreeCache.pre
				// console.log('refresh-msg', item)
				var parentItem = item.$parent
				this.fetchTree({
					id: parentItem.model.id,
					type: parentItem.model.type
				}, () => {
					// console.log("refresh by id,type...");
					if (cb) {
						cb(parentItem)
						parentItem.open = true
					}
				})
			},
			'remove-msg': function (msg, cb) {
				// TODO 改为TreeCache.pre

				// var item = this.findItem(this, msg.id, msg.type)
				var item = TreeCache.pre
				// console.log('remove...', item)
				if (item) {
					item.$destroy(true)
					if (cb){
						cb()
					}
				}
			}
		},
		methods: {
			onDropNode (ev) {
				ev.preventDefault();
				var dragModel = JSON.parse(ev.dataTransfer.getData('data'))
				//console.log("testdrag.....", dragModel.id, this.model.id)
				if (dragModel.id === this.model.id) {
					return
				}
				this.selectNode();
				this.$dispatch('drag-msg',dragModel, this.model, TreeCache.drag, this)
				//console.log("src:",JSON.parse(ev.dataTransfer.getData('data')),"dest:",this.model)
			},
			onDragStartNode (ev) {
				TreeCache.drag = this
				ev.dataTransfer.setData('data', JSON.stringify(this.model));
				//console.log('drag it...', this)
			},
			findItem (thisItem, id) {
				var retMod
				var _findItem = function (item, id) {
					if (item.model.id === id) {
						return item
					}

					if (item.$children) {
						item.$children.forEach((current) => {
							if (current.model.id === id ) {
								retMod = current;
								return
							} else {
								_findItem(current, id)
							}
						});
					}
					return retMod
				};
				return _findItem(thisItem, id)
			},
			fetchParent (arg, cb) {
				TreeCache.root = this
				var item = this.findItem(TreeCache.root, arg.pid)
				item.toggle(null, cb)
				//console.log('fetchparent.....', item)
			},
			fetchTree (args, cb) {
				var self = this
				this.$http({
					url: TreeCache.url,
					params: args,
					method: 'get',
				}).then((res)=>{
					if (!res.data.result) {
						actions.alert(store, {
							show: true,
							msg: res.data.message
						})
						return false
					}
					Vue.set(self.model, 'children', [])
					res.data.data.children.forEach(function (cur) {
						self.model.children.push(cur)
					});
					if (cb) {
						cb()
					}
				})
			},
			resetSelected (thisItem) {
				if (TreeCache.pre != null) {
					if ((TreeCache.pre.model.id != thisItem.model.id ) ||
							(TreeCache.pre.model.id === thisItem.model.id &&
							TreeCache.pre.model.type != thisItem.model.type)) {
						TreeCache.pre.isActive = false
					}
				}
			},
			selectNode (e) {
				this.isParent = this.model.isParent
				this.isActive = true
				this.resetSelected(this)
				this.model.isSelected = this.isActive
				this.$dispatch('child-msg', this.model, this)
				TreeCache.pre = this
			},
			toggle (e, cb) {
				if (e && e.target.id === this.consts.PLUSICON) {
					this.open = !this.open
				}
				this.isParent = this.model.isParent
				this.isActive = true
				this.resetSelected(this)
				var self = this
				self.model.isSelected = this.isActive
				if ((this.open && this.model.id > 0) ||
					this.model.id === 0) {
					this.fetchTree({
						id: this.model.id,
						type: this.model.type
					}, () => {
						TreeCache.pre = self
						self.$dispatch('child-msg', self.model, this)
						if (cb) {
							this.$nextTick(() => {
								cb()
							})
						}
					})
				}else{
					this.$dispatch('child-msg', this.model, this)
				}
			}
		}
	}
</script>
