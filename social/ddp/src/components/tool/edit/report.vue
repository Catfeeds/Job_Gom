<template>
<modal :show.sync="show" effect="zoom" title="报表信息" :backdrop="false" ok-text="保存" cancel-text="取消" :callback="save">
	<div slot="modal-body" class="modal-body">
		<form>
			<fieldset>
				<div class="col-sm-12">
					<label class="col-sm-4 align-rt">所属项目：</label>
					<div class="col-sm-6">
						<v-select 
						:options="projects" 
						:value.sync="project_val" 
						close-on-select 
						placeholder="选择项目" 
						search></v-select>
					</div>
				</div>
				<div class="col-sm-12">
					<label class="col-sm-4 align-rt">报表名称：</label>
					<div class="col-sm-6">
						<input v-model="param.name" class="form-control">
					</div>
				</div>
				<div class="col-sm-12">
					<label class="col-sm-4 align-rt">报表描述：</label>
					<div class="col-sm-6">
						<textarea name="" v-model="param.desc" class="form-control" id="" rows="3"></textarea>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</modal>
</template>
<script>
import {modal, select as vSelect} from 'vue-strap';
import store from 'store';
import actions from 'actions';
export default {
	components: {modal, vSelect},
	props: ['show', 'dataid'],
	data() {
		return {
			param: {
				name: '',
				desc: '',
				parentProject: 0
			},
			projects: [],
			project_val: []
		};
	},
	methods: {
		save() {
			if (!this.param.name || !this.param.desc || !this.param.parentProject) {
				alert('请填写完整的报表信息');
				return false;
			}
			this.$http.post('createEasy', Object.assign({data_id: this.dataid}, this.param)).then(res => {
				return res.json();
			}).then(res => {
				if (res.iserror === '0') {
					this.$router.go('/report/list');
				}
			});
		}
	},
	ready() {
		this.$http({
			url: 'project',
			method: 'get',
			params: {
				limit: 0
			}
		}).then((res) => {
			return res.json();
		}).then((res) => {
			this.projects = res.data.result.map(x => {
				return {
					label: x.PN,
					value: x.ID.toString()
				};
			});
		});
	},
	watch: {
		project_val(val) {
			if (val.length) {
				this.param.parentProject = parseInt(val[0]);
			}
		}
	}
};
</script>