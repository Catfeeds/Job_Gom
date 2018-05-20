<template>
	<list-item-page type="platform" :map="map" :api="api" :tablink="tablink" route-name="listRegisterPlatforms"></list-item-page>
</template>
<script type="text/babel">
import listItemPage from './common/list-page.vue';
import {getUrlsCount, findUrls, regCancelUrl, checkReg} from '../api/urls';
import store from 'store';
import actions from 'actions';
export default {
	data() {
		return {
			map: {
				id: '_id',
				name: 'url',
				platName: 'platName',
				userInfo: 'platName',
				updatetime: '_updatedAt',
				avatar: ''
			},
			tablink: {
				key: 'groupBy',
				currentType: 'mine',
				list: [
					{
						tab: 'mine',
						msg: '我的'
					},
					{
						tab: 'all',
						msg: '所有'
					}],
				onChange: () => {}
			},
			api: {
				reg: {
					fn: async (urlId) => {
						let flag = await checkReg({urlId: urlId, userId: store.state.userInfo.ID});
						if (flag) {
							actions.alert(store, {
								show: true,
								msg: '您已经订阅过了',
								type: 'danger',
								delay: 1000
							});
						} else {
							let ret = await regCancelUrl({
								op: 'reg',
								urlId: urlId,
								userId: store.state.userInfo.ID || 0
							}).then(() => {
								actions.alert(store, {
									show: true,
									msg: '订阅成功',
									type: 'success',
									delay: 1000
								});
							});
							return ret;
						}
					},
					param: {
						'filter': ''
					}
				},
				cancelReg: {
					fn: async (urlId) => {
						let ret = await regCancelUrl({
							op: 'cancel',
							urlId: urlId,
							userId: store.state.userInfo.ID || 0
						});
						return ret;
					},
					param: {
						'filter': ''
					}
				},
				count: {
					fn: async () => {
						let ret = await getUrlsCount({
							userId: store.state.userInfo.ID || 0
						});
						return ret;
					},
					param: {
						'filter': ''
					}
				},
				pagination: {
					fn: async (param) => {
						if (!store.state.userInfo.ID) {
							this.$route.router.go('/login');
						} else {
							if (param.orderBy && param.sortBy) {
								param.sort = {};
								param.sort[this.map[param.sortBy]] = param.orderBy === 'asc' ? 1 : -1;
								delete param.orderBy;
								delete param.sortBy;
							}
							if (param.groupBy === 'all') {
								param.op = 'all';
							} else {
								param.op = 'mine';
								param.userId = store.state.userInfo.ID || 0;
							}
							let ret = await findUrls(param);
							return ret.data;
						}
					},
					param: {
						'select': 'url _id platName _updatedAt',
						'sort': {'_updatedAt': -1},
						'limit': 10,
						'page': 1,
						'filter': ''
					}
				}
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
