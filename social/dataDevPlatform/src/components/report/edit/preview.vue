<template>
		<div class="preview" v-if="layout && layout.position && layout.position.length">
			<div class="layout"
			v-for="(index, item) in layout.position"
			:style="{'overflow-x': `${['form', 'formContent'].includes(item.component ? item.component.type : '')?'auto':'visible'}`, height: `calc(${item.height} - 12px)`, width: `calc(${item.width} - 12px)`}"
			>
			<chips
			v-if="item.component"
			:type="item.component.type"
			:config="item.component.config"
			:form="item.component.compEchart && item.component.compEchart.series.length && item.component.compEchart.series[0].data"
			:option="getOption(item.component)"
			:width="1200 * parseInt(item.width)  * 0.01 - 40",
			:height="1200 * parseInt(item.height) * 0.01 - 10",
			:componentreply="item.componentreply"
			:index="index"
			:pconfig.sync="item.component.config"
			:formcontentprops="item.component.formcontent"></chips>
			<div v-else class="mainContent" style="display:none"></div>
		</div>
</template>
<script>
	import chips from '../../component/private-current/chips/index';
	import componentFilters from '../../component/private-current/resData/componentFilters';

	export default {
		props: ['layout'],
		components: {chips},
		data() {
			return {
				config: ['A', 'B'],
				charTypes: ['line', 'bar', 'pie', 'map', 'scatter', 'radar', 'sankey']
			};
		},
		methods: {
			save() {

			},
			getOption(comp) {
				if (comp.compEchart && comp.compEchart.type && this.charTypes.includes(comp.compEchart.type)) {
					return componentFilters.getBarALinePieC(comp.compEchart);
				}
			},
			replay() {
				let val = this.layout.position;
				let map = {};

				// 获取要修改的值
				val.forEach(x => {
					if (x.component && x.component.compType === 'control') {
						if (x.ref && x.ref.length) {
							x.ref.forEach(r => {
								map[r.tagid] = map[r.tagid] || [];
								if (x.componentreply.radio) {
									map[r.tagid].push({
										type: 'value',
										val: [x.componentreply.radio],
										column: r.column
									});
								} else if (x.componentreply.checkBox.length) {
									map[r.tagid].push({
										type: 'array',
										val: x.componentreply.checkBox,
										column: r.column
									});
									// x.componentreply.checkBox.forEach(c => {
									// 	map[r.tagid].push(c);
									// });
								} else if (x.componentreply.datePicker.length) {
									map[r.tagid].push({
										type: 'date',
										val: x.componentreply.datePicker,
										column: r.column
									});
								}
							});
						}
					}
				});
				if (map) {
					let arr = [];
					for (let key in map) {
						let item = map[key];
						let pos = val.find(v => {
							return v.component && v.component.id === parseInt(key);
						});
						if (pos && pos.component) {
							pos = JSON.parse(JSON.stringify(pos));
							// pos.component.chartconfig.legend.value = [];
							// item.forEach(i => {
							// 	pos.component.chartconfig.legend.value.push({
							// 		checked: true,
							// 		key: i,
							// 		val: ''
							// 	});
							// });
							let param = {
								id: pos.component.id
							};
							let data = [];
							item.forEach(i => {
								data.push({
									column: i.column,
									val: i.val,
									type: i.type
								});
							});
							param.data = data;
							this.getcomponentdatabycontrl(param);
							arr.push(param);
						}
					}
					if (arr.length) {
						this.$dispatch('contrl', arr);
					}
				}
			},
			getcomponentdatabycontrl(param) {
				this.$http({
					url: 'getcomponentdatabycontrl',
					method: 'POST',
					emulateJSON: true,
					body: {
						data: JSON.stringify(param)
					}
				}).then(res => {
					return res.json();
				}).then(res => {
					let pos = this.layout.position.find(x => {
						return x.component && x.component.id === param.id;
					});
					pos.component.compEchart = res.data.result.compEchart;
					if (pos.component.type === 'form' || pos.component.type === 'formContent') {
						pos.component.config.currentPage = 1;
						pos.component.config.totalItems = res.data.result.config.totalItems;
						pos.component.config.itemsPerPage = res.data.result.config.itemsPerPage;
						pos.component.config.pagesLength = res.data.result.config.pagesLength;
					}
				});
			}
		},
		events: {
			componentreplyC() {
				this.replay();
			},
			'pagination-config': function(msg, index) {
				let position = this.layout.position[index];
				position.component.config = msg;

				// 获取条件
				let arr = [];
				let pos = this.layout.position.filter(x => {
					return x.component && x.ref.some(r => {
						return r.tagid === position.component.id;
					});
				});

				pos.forEach(x => {
					let column = x.ref.find(r => {
						return r.tagid === position.component.id;
					}).column;

					if (x.componentreply.radio) {
						arr.push({
							type: 'value',
							val: [x.componentreply.radio],
							column: column
						});
					} else if (x.componentreply.checkBox.length) {
						arr.push({
							type: 'array',
							val: x.componentreply.checkBox,
							column: column
						});
					} else if (x.componentreply.datePicker.length) {
						arr.push({
							type: 'date',
							val: x.componentreply.datePicker,
							column: column
						});
					}
				});

				let param;
				if (position.component.formconfig) {
					position.component.formconfig.legend.page_index = msg.currentPage;
					position.component.formconfig.legend.page_size = msg.itemsPerPage;
					param = {
						legend: position.component.formconfig.legend,
						dataid: position.component.dataid,
						id: position.component.id,
						type: 'form',
						data: arr
					};
				} else {
					position.component.formcontent.legend.page_index = msg.currentPage;
					position.component.formcontent.legend.page_size = msg.itemsPerPage;
					param = {
						id: position.component.formcontent.id,
						datanamec: position.component.formcontent.datanamec,
						legend: position.component.formcontent.legend,
						dataidc: position.component.formcontent.dataidc,
						dataid: position.component.formcontent.dataid,
						type: 'formContent',
						data: arr
					};
				}

				this.$http({
					url: 'getComponentData',
					method: 'POST',
					emulateJSON: true,
					body: {
						data: JSON.stringify(param)
					}
				}).then(res => {
					return res.json();
				}).then(res => {
					let pos = this.layout.position[index];
					pos.component.compEchart = res.data.result;
				});
			}
		},
		computed: {
			// isComponent() {
			// 	if (this.layout && this.layout.position && this.layout.position.length) {
			// 		return this.layout.position.some(x => {
			// 			return x.component;
			// 		});
			// 	}
			// 	return false;
			// }
		}
	};
</script>
<style scoped>
	.modal-body {
		width: 100%;
		/*height: 400px;*/
		/*height: calc(100% - 100px - 130px);*/
	}
	.preview {
		/*overflow: auto;*/
		/*padding: 5px;*/
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.preview>div {
		padding: 0;
		/*border: 1px solid #abc;*/
		position: relative;
		/*overflow-x: auto;*/
		margin: 5px;
		min-height: 20px;
	}
</style>
<style>
	.edit .modal-lg {
		/*width: 1200px;*/
	}
	.preview div div {
		/*padding: 3px;
		position: absolute;*/
		/*top: 50%;*/
		/*right: 50%;*/
	}
	.preview .mainContent {
		/*transform: scale(0.5);*/
	}
</style>
