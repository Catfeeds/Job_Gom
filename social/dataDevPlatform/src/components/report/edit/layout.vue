<template>
	<div class="layout" v-if="layoutDetail && layoutDetail.position && layoutDetail.position.length">
		<div 
		v-for="(index, item) in layoutDetail.position"
		:class="{'dragenter': item.dragenter, 'comp':item.compName}"
		:style="{height: `calc(${item.height} - 12px)`, width: `calc(${item.width} - 12px)`}" 
		@drop="item.compName || drop($event, item)"
		@dragenter="item.compName || (item.dragenter = true)"
		@dragleave="item.compName || (item.dragenter = false)"
		@dragover.prevent>
		<p>{{ item.compName || `位置${index + 1}`}}</p>
		<span v-show="item.compName && item.component.compType === 'control'" @click="relate(item)" class="glyphicon glyphicon-plus"></span>
		<span @click="remove(item)" v-show="item.compName" class="glyphicon glyphicon-remove"></span>
	</div>
</div>
<div class="layout" v-else>
	<p style="text-align: center">暂无布局配置</p>
</div>
<relate v-if="isRelate" :show.sync="isRelate" :position="layoutDetail.position" :detail="detail"></relate>

<modal :show.sync="isPreview" effect="zoom" width="90%" title="预览" large :backdrop="true" ok-text="保存" cancel-text="取消" :callback="save">
	<div slot="modal-body" class="modal-body">
		<preview v-if="isPreview" :layout="layoutDetail"></preview>
	</div>
</modal>
</template>
<script>
	import {modal} from 'vue-strap';
	import store from 'store';
	import {layouts} from './layouts';
	import eventBus from '../../common/event-bus';
	import preview from './preview';
	import relate from './relate';

	export default {
		components: {preview, relate, modal},
		props: ['name'],
		data() {
			return {
				layouts: JSON.parse(JSON.stringify(layouts)),
				isPreview: false,
				isRelate: false,
				detail: 0
			};
		},
		vuex: {
			getters: {
				componentList: () => store.state.componentList,
				layoutId: () => store.state.layoutId
			}
		},
		ready() {
			eventBus.$off('preview');
			eventBus.$on('preview', () => {
				this.isPreview = true;
			});
			eventBus.$off('save');
			eventBus.$on('save', (isrelease) => {
				this.save(!!isrelease);
			});
			// clear
			layouts.forEach(layout => {
				layout.position.forEach(pos => {
					pos.dragenter = false;
					pos.compName = '';
					pos.component = null;
					pos.ref = [];
					pos.componentreply = {
						radio: '',
						checkBox: [],
						datePicker: []
					};
				});
			});
			this.layouts = JSON.parse(JSON.stringify(layouts));
		},
		methods: {
			drop(ev, item) {
				var id = ev.dataTransfer.getData('id');
				var name = ev.dataTransfer.getData('name');
				item.compName = name;
				item.dragenter = false;
				let component = this.componentList.find(x => {
					return x.id === parseInt(id);
				});
				item.component = Object.assign({}, JSON.parse(JSON.stringify(component)));
			},
			remove(item) {
				// 删除关联关系
				if (item.component.compType === 'show') {
					this.layoutDetail.position.forEach(x => {
						if (x.ref.length) {
							x.ref.forEach((r, index) => {
								if (r.tagid === item.component.id) {
									x.ref.splice(index, 1);
								}
							});
						}
					});
				}
				item.compName = '';
				item.component = null;
				item.ref = [];
			},
			relate(item) {
				this.isRelate = true;
				this.detail = item;
			},
			save(isrelease) {
				let position = [];
				if (!this.layoutDetail) {
					return;
				}
				this.layoutDetail.position.forEach(x => {
					let component = {};
					position.push({
						id: x.id,
						component: x.component ? {
							id: x.component.id,
							name: x.component.name
						} : {},
						ref: x.ref
					});
				});
				let param = {
					id: this.$route.params.id,
					name: this.name,
					desc: '',
					avatar: '',
					isrelease: !!isrelease,
					layout: {
						id: this.layoutDetail.id,
						name: this.layoutDetail.name,
						position: position
					}
				};
				this.$http.put('report', param, {
					emulateJSON: false
				}).then(res => {
					return res.json();
				}).then(res => {
					this.$router.go('/report/list');
				});
			}
		},
		computed: {
			layoutDetail() {
				let layout = this.layouts.find(x => {
					return x.id === this.layoutId;
				}) || [];
				let obj = {};
				for (let key in layout) {
					obj[key] = layout[key];
				}
				return obj;
			}
		}
	};
</script>
<style scoped>
	.layout {
		margin: 0 0 0 160px;
		/*padding: 10px;*/
		/*border: 1px solid #abc;*/
		position: fixed;
		overflow: auto;
		width: calc(100% - 390px + 130px);
		height: calc(100% - 130px - 100px);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.layout div {
		border: 1px dashed #abc;
		position: relative;
		margin: 5px;
	}
	.layout div.dragenter {
		background: #abc;
		border: 1px solid #eee;
	}
	.layout div.comp {
		border: 1px solid #abc;
	}
	.layout div.comp:hover {
		background: #abc;
		color: #fff;
	}
	.layout div.comp:hover span {
		background: #abc;
		color: #fff;
		display: block;
	}
	.layout div p {
		margin: auto;  
		position: absolute;  
		top: calc(50% - 20px/2);
		left: calc(50% - 36px/2);
	}
	.layout div span.glyphicon {
		position: absolute;
		top: 5px;
		display: none;
		cursor: pointer;
	}
	.layout div span.glyphicon-remove  {
		right: 5px;
	}
	.layout div span.glyphicon-plus {
		right: 25px;
	}
</style>