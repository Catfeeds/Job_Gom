<template>
	<div class="amp-drawer">
		<div class="drawer-part">
			<h2 class="part-header"><span class="header-text">添加广告位</span><span class="header-fn"><em @click="hide()" class="icon icon-close"></em></span></h2>
			<div class="amp-form amp-form02-1">
				<div class="set-fn">
					<el-form :model="anices" label-position="left">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="广告位名称：" label-width="96px">
									<el-input @click="anices.keyword = ''" ref="nameInput" v-model="anices.keyword" placeholder="请输入" icon="circle-close"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="7">
								<el-form-item label="媒体：" label-width="54px">
									<el-select v-model="anices.checkedPublisher" clearable placeholder="请选择">
										<el-option v-for="item in anices.publishersList" :label="item.name" :value="item.publisherId"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="7">
								<el-form-item label="创意尺寸：" label-width="82px">
									<el-select v-model="anices.checkedIdeaSize" clearable placeholder="请选择">
										<el-option v-for="item in anices.ideaSizeList" :label="item.width + ' * ' + item.height" :value="item.width + '-' + item.height"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="2">
								<el-form-item label="">
									<el-button @click="getAnicesList()">查询</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<div class="add-show">
					<table class="table">
						<tbody>
							<tr>
								<th width="47"><span><el-checkbox v-model="checkAllSelect" @change="selectAll()"></el-checkbox></span></th>
								<th><span>媒体名称</span></th>
								<th><span>广告位名称</span></th>
								<th width="140"><span>刊例价</span></th>
								<th width="140"><span>创意尺寸限制</span></th>
								<th width="140"><span>创意大小限制</span></th>
							</tr>
							<tr :class="{'actived': item.checked}" v-for="(item, index) in anices.list">
								<td><span><el-checkbox v-model="item.checked"></el-checkbox></span></td>
								<td><span>{{item.publisherName}}</span></td>
								<td><span>{{item.advertisementName}}</span></td>
								<td><span>{{item.adBid/100}}</span></td>
								<td><span>{{item.width}} * {{item.height}}</span></td>
								<td><span>{{item.size}}</span></td>
							</tr>
						</tbody>
					</table>
					<div style="text-align: center;margin-top:18px;">
						<el-pagination layout="prev, pager, next" :total="anices.total" :page-size="anices.number" :current-page="anices.page" @current-change="pageChange"></el-pagination>
					</div>
				</div>
			</div>
		</div>
		<div class="drawer-btn">
			<button class="btn btn-primary" @click="save()">保存</button>
			<button class="btn btn-gray" @click="hide()">取消</button>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import store from 'store';
import {
	copyObj
} from 'utils/common';
import Event from 'event';
import Http from 'http';
export default {
	name: 'app-put-new-add-ad',
	data() {
		return {
			anices: {
				keyword: '',
				checkedPublisher: '',
				publishersList: [],
				checkedIdeaSize: '',
				ideaSizeList: [],
				page: 1,
				total: 0,
				list: []
			},
			checkAllSelect: false
		};
	},
	props: ['formData'],
	computed: {
		drawerData: () => store.state.drawerCtrl.config, // from store
		formDataCopy: function() {
			return this.formData;
		}
	},
	created() {
		this.getPublishersList();
		this.getIdeaSizeList();
		this.getAnicesList();
	},
	methods: {
		getPublishersList() {
			Http.get('api/publishers', {
				params: {
					platform: this.formDataCopy.platform
				}
			})
				.then(res => {
					this.anices.publishersList = res.data.data.list;
				})
				.catch(e => {

				});
		},
		getIdeaSizeList() {
			Http.get('api/sizes', {
				params: {
					platform: this.formDataCopy.platform
				}
			})
				.then(res => {
					this.anices.ideaSizeList = res.data.data.sizes;
				})
				.catch(e => {

				});
		},
		getAnicesList() {
			let cur = this.anices.checkedIdeaSize.split('-');
			Http.get('/api/anices', {
				params: {
					keyword: this.anices.keyword,
					publisherId: this.anices.checkedPublisher,
					width: cur[0] ? cur[0] : '',
					height: cur[1] ? cur[1] : '',
					page: this.anices.page,
					number: 10,
					platform: this.formDataCopy.platform
				}
			})
			.then(res => {
				this.anices.list = res.data.data.list;
				this.anices.total = res.data.data.totalCount;
				let cur = this.formDataCopy.advertisements.map((item) => {
					return item.advertisementId;
				});
				this.anices.list.forEach((item) => {
					if (cur.indexOf(item.advertisementId) !== -1) {
						Vue.set(item, 'checked', true);
					} else {
						Vue.set(item, 'checked', false);
					}
				});
			})
			.catch(e => {

			});
		},
		pageChange(page) {
			this.anices.page = page;
			this.getAnicesList();
		},
		checkAllSelectFunc() {
			this.checkAllSelect = true;
			this.anices.list.forEach((item) => {
				if (!item.checked) {
					this.checkAllSelect = false;
				}
			});
		},
		selectAll() {
			this.anices.list.forEach((item) => {
				item.checked = this.checkAllSelect;
			});
		},
		save() {
			let result = [];
			this.anices.list.forEach((item) => {
				if (item.checked) {
					let cur = copyObj(item);
					delete cur.checked;
					result.push(cur);
				}
			});
			Event.$emit('drawer-save-add-ad', result);
		},
		hide() {
			Event.$emit('drawer-hide-add-ad');
		}
	},
	watch: {
		'anices.list': {
			handler: function() {
				this.checkAllSelectFunc();
			},
			deep: true
		}
	}
};
</script>
