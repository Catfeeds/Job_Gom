<template>
<div class="userlist">
	<list-item-page type="user" :map="map"  :api="api" :tablink="tablink" route-name="listUsers"></list-item-page>
</div>

</template>
<style>
.userlist .title {
    height: 40px;
    line-height: 40px;
    background: white !important;
    font-size: 12px;
    color: #fff;
}
</style>
<script type="text/babel">
import listItemPage from '../../common/list-item-page.vue';
import {getUsersCount, getUsersPagination, deleteUsers} from '../../../api/user';
export default{
	data() {
		return {
			map: {
				id: '_id',
				name: 'name',
				desc: 'description',
				userInfo: 'user',
				updatetime: '_updatedAt',
				avatar: ''
			},
			tablink: {
				key: 'groupBy',
				currentType: 'all',
				btn: {
					newBtn: true
				},
				list: [{
					tab: 'all',
					msg: '所有'
				}, {
					tab: 'admin',
					msg: '管理员'
				}, {
					tab: 'no-email',
					msg: '无邮箱'
				}, {
					tab: 'disable',
					msg: '已禁用'
				}],
				onChange: () => {}
			},
			api: {
				count: {
					fn: getUsersCount,
					param: {
						'filter': ''
					}
				},
				pagination: {
					fn: async (param) => {
						if (param.orderBy && param.sortBy) {
							param.sort = {};
							param.sort[this.map[param.sortBy]] = param.orderBy === 'asc' ? 1 : -1;
							delete param.orderBy;
							delete param.sortBy;
						}
						return await getUsersPagination(param);
					},
					param: {
						'select': 'name description email phone _updatedAt',
						'sort': {'_updatedAt': -1},
						'limit': 5,
						'page': 1,
						'filter': ''
					}
				},
				delete: {
					fn: deleteUsers
				},
				create: {
					fn: null
				}
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
