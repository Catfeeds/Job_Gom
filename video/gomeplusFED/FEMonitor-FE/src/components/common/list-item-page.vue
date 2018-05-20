<template>
<div>
	<div class="top-area">
		<top-tab :route-name="routeName" :tab-link="tablink"></top-tab>
		<div class="nav-controls">
			<a href="javascript: void 0;" @click="createItem()" v-show="this.tablink.btn && this.tablink.btn.newBtn" class="btn btn-sm btn-success">新增</a>
			<form class="project-filter-form">
				<input type="search" @keyup="filter | debounce 500" v-model="keyword" placeholder="Filter by name..." class="form-control input-short input-sm">
			</form>
			<div class="dropdown">
				<button class="dropdown-toggle btn btn-sm btn-default" type="button" @click="showSortDropDown = !showSortDropDown">
					<span class="light">{{sortText}}</span>
					<b class="caret"></b>
				</button>
				<ul class="dropdown-menu dropdown-menu-align-right dropdown-menu-selectable" v-show="showSortDropDown">
					<li class="dropdown-header">排序</li>
					<li><a href="javascript:void(0)" @click="selectChange({sortBy: 'name', orderBy: 'asc'})">名称顺序</a></li>
					<li><a href="javascript:void(0)" @click="selectChange({sortBy: 'name', orderBy: 'desc'})">名称倒序</a></li>
					<li><a href="javascript:void(0)" @click="selectChange({sortBy: 'updatetime', orderBy: 'asc'})">时间顺序</a></li>
					<li><a href="javascript:void(0)" @click="selectChange({sortBy: 'updatetime', orderBy: 'desc'})">时间倒序</a></li>
				</ul>
			</div>
			<a v-if="this.type === 'project'" class="btn btn-sm btn-success" v-link="{name: 'newProject'}"><i class="fa fa-plus"></i>新建项目</a>
			<a v-if="this.type === 'report'" class="btn btn-sm btn-success" v-link="{name: 'newReport'}"><i class="fa fa-plus"></i>新建报表</a>
			<a v-if="this.type === 'component'" class="btn btn-sm btn-success" v-link="{name: 'newComponent'}"><i class="fa fa-plus"></i>新建组件</a>
			<a v-if="this.type === 'data'" class="btn btn-sm btn-success" v-link="{name: 'newData'}"><i class="fa fa-plus"></i>新建数据</a>
		</div>
	</div>
	<ul class="list-ul content-list">
		<li v-for="item in listData">
			<div class="btn-group" v-show="tablink.currentType !== 'deleted'">
				<button type="button" class="btn btn-sm btn-info" @click="itemDetail(item)">详情</button>
				<button type="button" class="btn btn-sm btn-success" @click="editItem(item)">编辑</button>
				<button type="button" class="btn btn-sm btn-danger" @click="deleteItem(item)">删除</button>
			</div>
			<div class="title">
				<a href="javascript:void(0)" @click="itemDetail(item)">
					<div class="list-item-avatar-con" v-if="isHttp(item[map.avatar])">
						<img alt="" class="list-item-avatar" :src="item[map.avatar]">
					</div>
					<div class="list-item-avatar-con" style="background-color: #31B0D5; color: #FFFFFF" v-else>{{$index+1+(paginationConf.currentPage-1)*paginationConf.itemsPerPage}}</div>
					<span>{{item[map.parentProjectName] ? item[map.parentProjectName]+' / ' : ''}}{{item[map.name]}}</span>
				</a>
			</div>
			<div class="description">
				<p>{{item[map.userInfo] | Object}} {{item[map.updatetime]?new Date(item[map.updatetime]).toLocaleString():'--'}}</p>
			</div>
		</li>
	</ul>
	<v-pagination :pagination-config.sync="paginationConf" v-if="paginationConf.totalItems > 10"></v-pagination>
</div>
</template>
<script>
import actions from 'actions';
import store from 'store';
import TopTab from '../common/top-tab.vue';
import { $ } from 'utils/dom.js';
import { isEmptyObject, isHttp } from 'utils';
import { checkPermission } from 'utils/user.js';

export default {
	name: 'project-list',
	data() {
		return {

			showSortDropDown: false,
			paginationConf: {
				currentPage: 1,
				itemsPerPage: 10,
				pagesLength: 5,
				totalItems: 0,
				onChange() {}
			},
			sortText: '时间倒序',
			listData: [],
			selectedParams: {},
			reset: false,
			keyword: '',
			operaInfo: {}
		};
	},
	props: ['type', 'map', 'tablink', 'api', 'routeName'],
	components: {
		'top-tab': TopTab
	},
	ready() {
		$('html')[0].on('click', (e) => {
			if (!e.target.classList.contains('dropdown-toggle') && !e.target.classList.contains('light') && !e.target.classList.contains('caret')) {
				this.showSortDropDown = false;
			};
		});
		this.paginationConf.itemsPerPage = this.api.pagination.param.limit;
		this.selectedParams = this.api.pagination.param;
		this.paginationConf.onChange = () => {
			if (this.reset && this.paginationConf.currentPage === 1) {
				this.reset = false;
				return;
			}
			this.$route.query.page = this.paginationConf.currentPage;
			this.$router.go({
				query: this.$route.query
			});
		};
		this.tablink.onChange = (item) => {
			this.paginationConf.currentPage = 1;
			this.tablink.currentType = item.tab;
		};
		this.parseQuery();
		this.setUi(this.selectedParams);
	},
	methods: {
		filter() {
			this.$route.query.keyword = this.keyword;
			if (this.paginationConf.currentPage !== 1) {
				this.paginationConf.currentPage = 1;
				return;
			}
			this.$router.go({
				query: this.$route.query
			});
		},
		fetchData() {
			(async () => {
				let res = await this.api.pagination.fn(this.selectedParams);
				this.listData = res;
			})();
			(async () => {
				let res = await this.api.count.fn(this.selectedParams);
				this.paginationConf.totalItems = res;
			})();
		},
		parseQuery() {
			Object.assign(this.selectedParams, this.$route.query);
			if (this.selectedParams.page) {
				this.selectedParams.page = parseInt(this.selectedParams.page);
			}
			this.fetchData();
		},
		setUi(params) {
			this.paginationConf.currentPage = params.page;
			this.keyword = this.$route.query.keyword;
			if (params.sortBy === 'name') {
				this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
			} else if (params.sortBy === 'time') {
				this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
			}
			this.tablink.currentType = params.groupBy;
		},
		selectChange(params) {
			this.$route.query.sortBy = params.sortBy;
			this.$route.query.orderBy = params.orderBy;
			this.paginationConf.currentPage = 1;
			if (params.sortBy === 'name') {
				this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
			} else if (params.sortBy === 'updatetime') {
				this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
			}
			this.$router.go({
				query: this.$route.query
			});
		},
		operateMsg(operate) {
			if (operate === 'detail') {
				switch (this.type) {
				case 'task':
					this.operaInfo.name = 'detailTask';
					break;
				case 'user':
					this.operaInfo.name = 'detailUser';
					break;
				case 'component':
					this.operaInfo.name = 'detailComponent';
					break;
				case 'data':
					this.operaInfo.name = 'detailData';
					break;
				default:
					this.operaInfo.name = '';
					break;
				}
			} else if (operate === 'edit') {
				switch (this.type) {
				case 'task':
					this.operaInfo.name = 'editTask';
					break;
				case 'user':
					this.operaInfo.name = 'editUser';
					break;
				case 'component':
					this.operaInfo.name = 'editComponent';
					break;
				case 'data':
					this.operaInfo.name = 'editData';
					break;
				default:
					this.operaInfo.name = '';
					break;
				}
			} else {
				switch (this.type) {
				case 'task':
					this.operaInfo.msg = '任务';
					break;
				case 'report':
					this.operaInfo.msg = '报表';
					break;
				case 'component':
					this.operaInfo.msg = '组件';
					break;
				case 'data':
					this.operaInfo.msg = '数据';
					break;
				default:
					this.operaInfo.msg = 'XX';
					break;
				}
			}
		},
		itemDetail(item) {
			this.operateMsg('detail');
			this.$router.go({
				name: this.operaInfo.name,
				params: {
					id: item[this.map.id]
				}
			});
		},
		editItem(item) {
			/* if (!checkPermission(this.type, item[this.map.id], 2)) {
				return;
			}*/
			this.operateMsg('edit');
			console.info('this.operaInfo.name', this.operaInfo.name);
			this.$router.go({
				name: this.operaInfo.name,
				params: {
					id: item[this.map.id]
				}
			});
		},
		deleteItem(item) {
			/* if (!checkPermission(this.type, item[this.map.id], 1)) {
				return;
			}*/
			let that = this;
			this.operateMsg('delete');
			actions.confirm(store, {
				show: true,
				title: '删除' + this.operaInfo.msg,
				msg: '您确定要删除此' + this.operaInfo.msg + '吗？',
				applyStr: '确认',
				cancelStr: '取消',
				applyFunc: async () => {
					let res = await this.api.delete.fn([item._id]);
					this.parseQuery();
				}
			});
		},
		createItem() {
			this.$router.go({
				name: 'addUser'
			});
		},
		isHttp: isHttp,
		getFirstCharAndNoSpaceAndUp(str) {
			let len = str.length;
			let i = 0;
			while (i < len) {
				if (str.substring(i, 1) !== ' ') {
					return str.substr(i, 1).toUpperCase();
				}
				i++;
			}
		}
	},
	watch: {
		'$route.query': {
			handler() {
				if (isEmptyObject(this.$route.query)) {
					this.reset = true;
					this.selectedParams = this.api.pagination.param;
					this.setUi(this.selectedParams);
					this.fetchData();
					return;
				};
				this.parseQuery();
			},
			deep: true
		}
	}
};
</script>
