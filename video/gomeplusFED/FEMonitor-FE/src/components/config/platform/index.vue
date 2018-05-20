<template>
	<div class="opg">
		<div class="btn-box"><a href="javascript:void(0)" class="btn btn-big btn-blue" @click="addPlat()">新增平台</a></div>
		<table class="table">
			<tr>
				<th width="52">序号</th>
				<th width="52">平台名称</th>
				<th width="70">URL列表</th>
				<th width="135">创建时间</th>
				<th width="70">备注</th>
				<th width="140">操作</th>
			</tr>
			<tr v-for="item in platList">
				<td>{{$index+1}}</td>
				<td>{{item.platName}}</td>
				<td><a href="javascript:void 0" @click="detailUrls(item)">URL列表</a></td>
				<td>{{item._createdAt}}</td>
				<td>{{item.platDesc}}</td>
				<td>
					<a href="javascript:void(0)" class="btn btn-red" @click="editPlat(item)">编辑</a>
					<a href="javascript:void(0)" class="btn btn-gray" @click="delPlat(item)">删除</a>
				</td>
			</tr>
		</table>
		<m-pagination :pagination-conf="paginationConf"></m-pagination>
		<m-modal :modal-config="modalConfig">
			<validator name="validation"
					   :classes="{ touched: 'touched-validator', dirty: 'dirty-validator' }">
				<form>
					<div class="modalForm">
						<div>
							<label>平台名</label>
							<input type="text" id="platName" v-model="platModel.platName" placeholder="输入平台名称" maxlength="20" v-validate:platname = "{ required: { rule: true, initial: 'off' }}" :classes="{ valid: 'valid-url', invalid: 'invalid-url' }"  class="form-control">
							<span v-show='$validation.platname.required'  style="color:red">请输入平台名称!</span>
						</div>
						<div class="form-group">
							<label for="deviceType" class="control-label">设备类型</label>
							<input type="radio" name="deviceType"  v-model="platModel.deviceType" value="0">手机
							<input name="deviceType" v-model="platModel.deviceType" type="radio" value="1">PC
						</div>
						<div>
							<div><label>监控URL</label><a href="javascript:void 0" style="margin-left: 0.5%;" class="btn btn-default" @click="addUrl()">增加</a></div>
							<div  v-for="item in urlsList">
								<label>{{$index+1}}</label>
								<input type="text" @touched="onTouched" placeholder="输入URL" id="url" class="form-control inputUrl" v-validate:url = "{
					url:{rule:true}
					}" v-model="item.url.url">
								<a href="javascript:void 0" @click="deleteUrl(item)"  class="btn btn-sm btn-red">删除</a>
							</div>
							<span v-show='$validation.url&&$validation.url.url===true' id="showError"  style="color:red">请输入正确的url!</span>
						</div>
						<div class="form-group">
							<label>备注</label>
							<textarea class="form-control" rows="3"></textarea>
						</div>
					</div>
				</form>
			</validator>
		</m-modal>
		<m-modal :modal-config="urlModalConfig">
			<table class="table">
				<tr>
					<th width="52">序号</th>
					<th width="70">URL名称</th>
				</tr>
				<tr v-for="item in urlsList">
					<td>{{$index+1}}</td>
					<td>{{item.url.url}}</td>
				</tr>
			</table>
		</m-modal>
	</div>
</template>

<script type="text/babel">
import modal from '../../base/modal.vue';
import pagination from '../../base/pagination.vue';
import Random from '../../../assets/js/random.min';
import {findPlatform, createPlatform, updatePlatform,
	findPlatformById, deletePlatform,
	findUrlsByPlatid} from '../../../api/platform';
import moment from 'moment';
import store from 'store';
import actions from 'actions';
export default{
	data() {
		return {
			platList: [
			],
			urlsList: [],
			platModel: {
				platName: '',
				urls: [],
				deviceType: 0
			},
			opType: 'new', // edit
			urlModalConfig: {
				show: false,
				isCloseBtnHide: true,
				title: '平台',
				applyStr: '关闭',
				applyFunc: () => {
					this.urlModalConfig.show = false;
				}
			},
			modalConfig: {
				show: false,
				title: '平台',
				cancelStr: '放弃',
				applyStr: '保存',
				cancelFunc: () => {
				},
				applyFunc: () => {
					if (this.$validation && this.$validation.valid) {
						if (this.opType === 'new') {
							if (this.compositeUrl()) {
								this.platModel.urls = this.urlsList;
								createPlatform(this.platModel).then(data => {
									this.modalConfig.show = false;
									actions.alert(store, {
										show: true,
										msg: '新增成功',
										type: 'success',
										delay: 1000
									});
									this.getPlatformList();
								});
							}
						} else if (this.opType === 'edit') {
							if (this.compositeUrl()) {
								let params = {
									_id: this.platModel._id,
									urls: this.urlsList,
									platName: this.platModel.platName,
									platDesc: this.platDesc,
									deviceType: this.platModel.deviceType
								};
								updatePlatform(params).then(data => {
									actions.alert(store, {
										show: true,
										msg: '修改成功',
										type: 'success',
										delay: 1000
									});
									this.modalConfig.show = false;
									this.getPlatformList();
								});
							}
						}
					}
				}
			},
			paginationConf: {
				currentPage: 1,
				totalItems: 0,
				itemsPerPage: 10,
				pagesLength: 10,
				onChange: () => {
					this.getPlatformList();
				}
			}
		};
	},
	ready() {
		this.getPlatformList();
	},
	methods: {
		detailUrls(item) {
			findUrlsByPlatid(item._id).then(data => {
				this.urlModalConfig.show = true;
				this.urlsList = data.data;
			});
		},
		compositeUrl() {
			let right = this.onTouched();
			if (right) {
				document.querySelector('#showError').style.display = '';
				return false;
			} else {
				let set = new Set();
				[...document.querySelectorAll('.inputUrl')].forEach(current => {
					if (current.value.trim() !== '') {
						set.add(current.value);
					}
				});
				this.urlsList = [];
				set.forEach(current => {
					this.urlsList.push({
						id: Random().hex(15),
						url: current
					});
				});
				return true;
			}
		},
		platFormAutoFocus() {
			document.getElementById('platName').focus();
		},
		onTouched() {
			//  console.log(this, this.$validation.url, this.$validation.url.url);
			let flag = false;
			for (let input of [...document.querySelectorAll('.inputUrl')]) {
				if (!(/^(http:\/\/|https:\/\/)(.{4,})$/).test(input.value.trim())) {
					flag = true;
					break;
				}
			}
			if (flag) {
				// this.$validation.url.url = true;
			}
			return flag;
		},
		resetModel() {
			this.platModel = {
				platName: '',
				urls: [],
				deviceType: 0
			};
			this.urlsList = [];
		},
		addPlat() {
			this.modalConfig.title = '新增平台';
			this.modalConfig.show = true;
			this.opType = 'new';
			this.resetModel();
			this.$resetValidation();
			setTimeout(() => {
				this.platFormAutoFocus();
			}, 0);
		},
		editPlat(item) {
			let p = {
				params: {
					id: item._id
				}
			};
			findPlatformById(p).then(data => {
				this.platModel = data.data;
				this.urlsList = data.data.urls;
				this.modalConfig.title = '修改平台';
				this.modalConfig.show = true;
				this.opType = 'edit';
			});
		},
		addUrl() {
			if (this.$validation && this.$validation.valid) {
				this.urlsList.push({url: {
					id: Random().hex(15),
					url: ''
				}});
			}
		},
		deleteUrl(item) {
			this.urlsList = this.urlsList.filter(current => {
				if (current.url.id !== item.url.id) {
					return true;
				} else {
					return false;
				}
			});
		},
		delPlat(item) {
			actions.confirm(store, {
				show: true,
				title: '删除平台',
				msg: '您确定要删除此记录吗？',
				applyStr: '确认',
				cancelStr: '取消',
				applyFunc: async () => {
					deletePlatform(item._id).then(data => {
						actions.alert(store, {
							show: true,
							msg: '删除成功',
							type: 'success',
							delay: 1000
						});
						this.getPlatformList();
					});
				}
			});
		},
		getPlatformList() {
			let params = {
				params: {
					'select': '_id urls _createdAt platName platDesc',
					'sort': {'_createdAt': -1},
					'limit': 10,
					'page': this.paginationConf.currentPage
				}
			};
			findPlatform(params).then(data => {
				this.platList = data.data;
				this.paginationConf.totalItems = data.totalCount;
			});
		}
	},
	components: {
		'm-modal': modal,
		'm-pagination': pagination
	},
	validators: {
		url: function(val) {
			return (/^(http:\/\/|https:\/\/)(.{4,})$/).test(val);
		}
	}
};
</script>
