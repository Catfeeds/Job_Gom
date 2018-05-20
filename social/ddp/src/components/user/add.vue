<template>
	<modal :show.sync="show" effect="zoom" :title="`${model.id?'编辑':'新增'}权限`" :backdrop="true" ok-text="保存" cancel-text="取消" :callback="save">
		<div slot="modal-body" class="modal-body">
			<form class="form-horizontal" role="form">
				<div class="form-group">
					<label class="col-sm-2 control-label">资源类型:</label>
					<div class="col-sm-7">
						<v-select  :disabled="!!model.id" :value.sync="typeValue" :options="typeOption"  close-on-select></v-select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">资源名称:</label>
					<div class="col-sm-7 btn-group" :class="{'open': isOpen && resources.length}">
						<input type="text" class="form-control"
						@focus="isOpen = true"
						@keyup="getResource"
						v-model="model.name">
						<ul class="dropdown-menu" style="margin-left: 15px;">
							<li v-for="item in resources" style="position:relative">
								<a style="cursor:pointer" @click="setResource(item)">
									{{item.name}}
									<span v-show="model.name === item.name" class="glyphicon glyphicon-ok check-mark"></span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="margin-top: 5px;">权限:</label>
					<div class="col-sm-10">
						<div class="col-sm-2">
							<div class="checkbox">
								<label>
									<input type="checkbox" v-model="pre[0]"> 新增
								</label>
							</div>
						</div>
						<div class="col-sm-2">
							<div class="checkbox">
								<label>
									<input type="checkbox" v-model="pre[1]"> 编辑
								</label>
							</div>
						</div>
						<div class="col-sm-2">
							<div class="checkbox">
								<label>
									<input type="checkbox" v-model="pre[2]"> 删除
								</label>
							</div>
						</div>
						<div class="col-sm-2">
							<div class="checkbox">
								<label>
									<input type="checkbox" v-model="pre[3]"> 查看
								</label>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</modal>
</template>
<script>
import actions from 'actions';
import store from 'store';
import { modal, select as vSelect } from 'vue-strap';
export default {
	components: {modal, vSelect},
	props: {
		show: {
			type: Boolean,
			required: true,
			twoWay: true
		},
		model: {
			type: Object,
			required: true
		},
		callback: {
			type: Function
		}
	},
	data() {
		return {
			typeValue: ['project'],
			typeOption: [
				{
					label: '项目',
					value: 'project'
				},
				{
					label: '报表',
					value: 'report'
				}
			],
			pre: [false, false, false, false],
			resources: [],
			isOpen: false,
			resourceModel: {}
		};
	},
	methods: {
		getResource() {
			if (!this.model.name) {
				this.resources = [];
				return;
			}
			this.$http.get(`resource?name=${this.model.name}&type=${this.model.type}`).then(res => res.json()).then(res => {
				this.resources = res.data.result;
			});
		},
		setResource(item) {
			this.isOpen = false;
			this.resources = [];

			this.model.resource = item.id;
			this.model.name = item.name;
		},
		save() {
			if (!this.model.resource) {
				alert('请选择正确的资源');
				return;
			}
			this.callback && this.callback(this.model);
			this.show = false;
		}
	},
	watch: {
		'model.type': function(val) {
			this.typeValue = [val];
		},
		'model.permission': function(val) {
			this.pre = val.split('').map(x => !!parseInt(x));
		},
		// model: {
		// 	handler(val) {
		// 		if (val) {
		// 			this.typeValue = [this.model.type];
		// 			this.pre = this.model.permission.split('').map(x => !!parseInt(x));
		// 		}
		// 	},
		// 	deep: true
		// },
		pre(val) {
			this.model.permission = this.pre.map(x => x ? 1 : 0).join('');
		},
		typeValue(val) {
			this.model.type = val[0];
		}
	}
};
</script>
