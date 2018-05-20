<template>
	<div class="top-area">
		<top-tab :route-name="routeName" :tab-link="tabLink"></top-tab>
		<div class="nav-controls">
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
					<li><a href="javascript:void(0)" @click="selectChange({sortBy: 'time', orderBy: 'asc'})">时间顺序</a></li>
					<li><a href="javascript:void(0)" @click="selectChange({sortBy: 'time', orderBy: 'desc'})">时间倒序</a></li>
				</ul>
			</div>
			<a v-if="this.type === 'project'" class="btn btn-sm btn-success" v-link="{name: 'newProject'}"><i class="fa fa-plus"></i>新建项目</a>
			<a v-if="this.type === 'report'" class="btn btn-sm btn-success" v-link="{name: 'newReport'}"><i class="fa fa-plus"></i>新建报表</a>
			<a v-if="this.type === 'component'" class="btn btn-sm btn-success" v-link="{name: 'newComponent'}"><i class="fa fa-plus"></i>新建组件</a>
			<a v-if="this.type === 'data'" class="btn btn-sm btn-success" v-link="{name: 'newData'}"><i class="fa fa-plus"></i>新建数据</a>
		</div>
	</div>
	<ul class="list-ul content-list">
		<li v-for="item in listData" track-by="$index">
			<div class="btn-group" v-show="tabLink.currentType !== 'deleted'">
				<button type="button" class="btn btn-sm btn-info" @click="itemDetail(item)">详情</button>
				<button type="button" class="btn btn-sm btn-success" @click="editItem(item)">编辑</button>
				<button type="button" class="btn btn-sm btn-danger" @click="deleteItem(item)">删除</button>
			</div>
			<div class="title">
				<a href="javascript:void(0)" @click="itemDetail(item)">
					<div class="list-item-avatar-con" v-if="isHttp(item[map.avatar])">
						<img alt="" class="list-item-avatar" :src="item[map.avatar]">
					</div>
					<div class="list-item-avatar-con" style="background-color: #FBE9E7; color: #555" v-else>{{getFirstCharAndNoSpaceAndUp(item[map.name])}}</div>
					<span>{{item[map.parentProjectName] ? item[map.parentProjectName]+' / ' : ''}}{{item[map.name]}}</span>
				</a>
			</div>
			<div class="description">
				<p>{{item[map.desc]}}</p>
			</div>
		</li>
	</ul>
	<v-pagination :pagination-config.sync="paginationConf" v-show="listData"></v-pagination>
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
			tabLink: {
				key: 'groupBy',
				currentType: 'mine',
				list: [{
					tab: 'mine',
					msg: '我的'
				}, {
					tab: 'all',
					msg: '所有'
				}, {
					tab: 'recent',
					msg: '近期打开'
				}, {
					tab: 'deleted',
					msg: '已删除'
				}],
				onChange: () => {}
			},
			showSortDropDown: false,
			paginationConf: {
				currentPage: 1,
				itemsPerPage: 20,
				pagesLength: 5,
				totalItems: 0,
				onChange() {}
			},
			sortText: '时间倒序',
			listData: [],
			selectedParams: {},
			defaultSelectedParams: {
				'groupBy': 'mine',
				'sortBy': 'time',
				'orderBy': 'desc',
				'page': 1,
				'filter': ''
			},
			reset: false,
			keyword: '',
			operaInfo: {}
		};
	},
	props: ['type', 'map', 'routeName'],
	components: {
		'top-tab': TopTab
	},
	ready() {
		$('html')[0].on('click', (e) => {
			if (!e.target.classList.contains('dropdown-toggle') && !e.target.classList.contains('light') && !e.target.classList.contains('caret')) {
				this.showSortDropDown = false;
			};
		});
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
		this.tabLink.onChange = (item) => {
			this.paginationConf.currentPage = 1;
			this.tabLink.currentType = item.tab;
		};
		this.parseQuery();
		this.setUi(this.selectedParams);
	},
	methods: {
		/**
		 * 查询项目列表（默认：我的）
		 * 以下参数依次为
		 * @param limit 每页条数
		 * @param page 第几页
		 * @param groupBy 分组mine/all/recent/deleted 默认mine
		 * @param sortBy 排序（name/time） 默认时间
		 * @param orderBy 排序方式（desc/asc）默认倒叙desc
		 * @private
		 */
		filter() {
			this.$route.query.filter = this.keyword;
			if (this.paginationConf.currentPage !== 1) {
				this.paginationConf.currentPage = 1;
				return;
			}
			this.$router.go({
				query: this.$route.query
			});
		},
		fetchData() {
			this.$http({
				url: this.type,
				method: 'get',
				params: this.selectedParams,
				loading: true
			}).then((res) => {
				return res.json();
			}).then((res) => {
				this.listData = res.data.result;
				this.paginationConf.totalItems = res.data.total;
			});
		},
		parseQuery() {
			this.selectedParams = Object.assign({}, this.defaultSelectedParams, this.$route.query);
			if (this.selectedParams.page) {
				this.selectedParams.page = parseInt(this.selectedParams.page);
			}
			this.fetchData();
		},
		setUi(params) {
			this.paginationConf.currentPage = params.page;
			this.keyword = this.$route.query.filter;
			if (params.sortBy === 'name') {
				this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
			} else if (params.sortBy === 'time') {
				this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
			}
			this.tabLink.currentType = params.groupBy;
		},
		selectChange(params) {
			this.$route.query.sortBy = params.sortBy;
			this.$route.query.orderBy = params.orderBy;
			this.paginationConf.currentPage = 1;
			if (params.sortBy === 'name') {
				this.sortText = (params.orderBy === 'desc' ? '名称倒序' : '名称顺序');
			} else if (params.sortBy === 'time') {
				this.sortText = (params.orderBy === 'desc' ? '时间倒序' : '时间顺序');
			}
			this.$router.go({
				query: this.$route.query
			});
		},
		operateMsg(operate) {
			if (operate === 'detail') {
				switch (this.type) {
				case 'project':
					this.operaInfo.name = 'detailProject';
					break;
				case 'report':
					this.operaInfo.name = 'detailReport';
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
				case 'project':
					this.operaInfo.name = 'editProject';
					break;
				case 'report':
					this.operaInfo.name = 'editReport';
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
				case 'project':
					this.operaInfo.msg = '项目';
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
			if (!checkPermission(this.type, item[this.map.id], 3)) {
				return;
			}
			this.operateMsg('detail');
			this.$router.go({
				name: this.operaInfo.name,
				params: {
					id: item[this.map.id]
				}
			});
		},
		editItem(item) {
			if (!checkPermission(this.type, item[this.map.id], 2)) {
				return;
			}
			this.operateMsg('edit');
			this.$router.go({
				name: this.operaInfo.name,
				params: {
					id: item[this.map.id]
				}
			});
		},
		deleteItem(item) {
			if (!checkPermission(this.type, item[this.map.id], 1)) {
				return;
			}
			this.operateMsg('delete');
			actions.confirm(store, {
				show: true,
				title: '删除' + this.operaInfo.msg,
				msg: '您确定要删除此' + this.operaInfo.msg + '吗？',
				applyStr: '确认',
				cancelStr: '取消',
				applyFunc: () => {
					this.$http({
						url: this.type,
						method: 'DELETE',
						params: {
							id: item[this.map.id]
						}
					}).then((res) => {
						return res.json();
					}).then((res) => {
						this.parseQuery();
						// this.listData.$remove(item);
					});
				}
			});
		},
		isHttp: isHttp,
		getFirstCharAndNoSpaceAndUp(str) {
			if (!str) {
				return false;
			}
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
					this.selectedParams = this.defaultSelectedParams;
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
