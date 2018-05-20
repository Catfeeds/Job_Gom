<template>
	<div>
		<table class="table">
			<tr>
				<th>序号</th>
				<th>配置项名称</th>
				<th width="150">配置项说明</th>
				<th width="180">配置值</th>
				<th>单位</th>
				<!-- <th>状态</th> -->
				<th>操作</th>
			</tr>
			<tr v-for="item in config">
				<td>{{$index + 1}}</td>
				<td>{{item.title}}</td>
				<td>{{item.about}}</td>
				<td v-if="item.type === 'range'">{{item.val.join('-')}}</td>
				<td v-if="item.type === 'num'">{{item.val}}</td>
				<td v-if="item.type === 'txt'">{{item.val}}</td>
				<td>{{item.unit}}</td>
				<!-- <td>{{item.status ? '启用' : '停用'}}</td> -->
				<td><a href="javascript:void(0)" class="btn btn-red" @click="saveEdit(item,$index)">编辑</a></td>
			</tr>
		</table>
		<m-modal :modal-config="modalConfigEdit">
			<div class="welcome-txt">
				<div class="input clearfix">
					<label>配置名称：</label>
					<p>{{currentEditConfig.title}}</p>
				</div>
				<div class="input clearfix">
					<label>配置说明：</label>
					<p>{{currentEditConfig.about}}</p>
				</div>
				<div class="input">
					<label>配置值：</label>
					<textarea v-if="currentEditConfig.type === 'txt'" @blur="validTxt(currentEditConfig.val, $index)" v-model="currentEditConfig.val" required type="text"></textarea>
					<div v-if="currentEditConfig.type === 'range'">
						<input @blur="validTime(currentEditConfig.val[0], $index, 0)" v-model="currentEditConfig.val[0]" required type="text" class="time" size="5"> ~
						<input @blur="validTime(currentEditConfig.val[1],$index,1)" v-model="currentEditConfig.val[1]" required type="text" class="time" size="5">
					</div>
					<div v-if="currentEditConfig.type === 'num'">
						<input @blur="validNum(currentEditConfig.val, $index)" v-model="currentEditConfig.val" required type="text">
					</div>
				</div>
			</div>
		</m-modal>
	</div>
</template>
<script>
import actions from 'actions';
import store from 'store';

import Modal_Con from '../common/modal-con.vue';

function clone(o) {
	return JSON.parse(JSON.stringify(o));
}

var typeHash = {
	1: 'range',
	2: 'num',
	3: 'txt',
	4: 'txt',
	5: 'txt',
	6: 'txt',
	7: 'txt',
	8: 'txt',
	9: 'txt',
	10:'txt',
	11:'txt',
	12:'txt',
	13:'txt',
	14:'txt',
	15:'txt'
};

var statHash = { // 0 停用； 1 启用
	0: '停用',
	1: '启用'
};

export default {
	name: 'Configuration',
	data() {
		return {
			txtMaxLen: 20,
			config: [],
			oldConfig: [],
			modalConfigEdit: {
				show: false,
				title: '配置管理',
				cancel_str: '取消 ',
				apply_str: '保存',
				cancel_func: () => {

				},
				apply_func: () => {
					this.saveConfig(this.currentEditConfig.typeTo, this.currentEditConfig.val);
					this.modalConfigEdit.show = false;
				}
			},
			currentEditConfig: {}
		};
	},
	vuex: {
		getters: {
			user_info() {
				return store.state.user_info;
			}
		}
	},
	ready() {
		this.getData();
	},
	components: {
		'm-modal': Modal_Con
	},
	methods: {
		getData() {
			this.$http({
				url: 'dictionary/getConfig',
				method: 'get'
			}).then((response) => {
				var data = response.data.data;
				this.config = data.configuration.map(function(item) {
					item.typeTo = item.type;
					item.type = typeHash[item.type];
					return item;
				});
				this.oldConfig = clone(this.config);
			});
		},
		validTime(val, index, s) {
			if (!/^((0\d{1}|1|)\d{1}|2[0-3]):([0-5]\d{1})$/.test(val)) {
				if (s === 0) {
					this.config[index].val = ['00:00', this.config[index].val[1]];
				} else if (s === 1) {
					this.config[index].val = [this.config[index].val[0], '00:00'];
				}
				actions.alert(store, {
					show: true,
					msg: '不合法的时间表示'
				});
			}
		},
		validNum(val, i) {
			if (!/^[0-9]+$/.test(val)) {
				this.$set('config[' + i + ']', clone(this.oldConfig[i]));
				actions.alert(store, {
					show: true,
					msg: '不合法的数字表示'
				});
			}
		},
		validTxt(val, i) {
			if (/^(\s|)$/.test(val)) {
				this.$set('config[' + i + ']', clone(this.oldConfig[i]));
				actions.alert(store, {
					show: true,
					msg: '输入不能为空'
				});
			}
		},
		saveEdit(item, i) {
			this.modalConfigEdit.show = true;
			this.currentEditConfig = Object.assign({}, item);
		},
		saveConfig(type, val) {
			if (val instanceof Array) {
				val = val.join('-');
			}
			this.$http({
				url: 'dictionary/updateConfig',
				method: 'post',
				body: {
					type: type,
					val: val,
					operator_id: this.user_info.operator_id
				}
			}).then((res) => {
				var msg = '修改失败';
				if (res.data.result) {
					msg = '修改成功';
					this.oldConfig = clone(this.config);
				}
				this.getData();
				actions.alert(store, {
					show: true,
					msg: msg
				});
			});
		}
	}
}
</script>
