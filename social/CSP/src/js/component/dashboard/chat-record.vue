<template>
	<div class="title" :class="{'other': searchType == 1}">
		<h2 v-show="searchType == 1">{{searchList[0].txt}}</h2>
		<h2>{{searchList[1].txt}}</h2>
		<div class="search-box">
			<v-select :change="toggleSearchType" :default-value="searchType">
				<v-option v-for="item in searchList" :value="item.type">{{item.txt}}</v-option>
			</v-select>
			<input @keyup.enter="search" v-model="searchText" type="text" placeholder="输入关键词搜索">
			<a v-on:click="search" href="javascript:;" class="btn-search"></a>
		</div>
	</div>
	<div class="chatrecord" :class="{'other': searchType == 1}">
		<div v-show="searchType == 1" class="phrase-list">
			<div class="text-empty" v-show="operatorList.length === 0">无结果</div>
			<div class="list-bg">
				<ul>
					<li v-for="item in operatorList" v-on:click="getCustomerList(item, $event)">
						<span>{{item.nickname}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="left-list">
			<div class="text-empty" v-show="customerList.length === 0">空</div>
			<ul>
				<li v-for="user in customerList">
					<v-checkbox :checked="false" :value="user.customerId+','+user.customerName" :change="chooseExportUser.bind(this, user.customerId+','+user.customerName)"></v-checkbox>
					<img v-bind:src="user.icon" alt="{{user.customerName}}">
					<span v-on:click="getChatRecord(user,$event)">{{user.customerName}}</span>
					<span class="fr">{{user.recentVisitTime | Date 'yy-MM-dd hh:mm'}}</span>
				</li>
			</ul>
			<div class="list-btn">
				<a v-on:click="openExportModal" href="javascript:void(0);" class="btn btn-blue">导出</a>
			</div>
		</div>
		<div class="right-chat">
			<div class="text-empty" v-show="operatorMessage.length === 0">空</div>
			<div class="chat-scroll">
				<div v-for="item in operatorMessage">
					<dl class="clearfix" v-bind:class="{'clearfix':item.personnelType == 1,'cleafix right':item.personnelType != 1}">
						<dt><img v-bind:src="item.sessionIcon"></dt>
						<dd>
							<p class="gray">{{item.sessionName}} {{item.sessionTime}}</p>
							<div class="text" @click="contactPlay($event)">
								<em class="icon-san"></em>
								<p v-if="item.sessionContent.type.trim() == 'text'">{{{item.sessionContent.content | faceShow}}}</p>
								<p v-if="item.sessionContent.type.trim() == 'img'"><img style="max-width: 299px;" :src="item.sessionContent.content"></p>
								<div v-if="item.sessionContent.type.trim() == 'video'" class="im-video">
									<video id="crm" width="130" height="190">
										<source :src="item.sessionContent.content" type="video/ogg">您的浏览器不支持 video 标签。
										<!--<source src="http://v.xiaohongchun.com/19F626CD80BC65C2" type="video/ogg">您的浏览器不支持 video 标签。-->
									</video><em class="icon-play"></em>
								</div>
								<div v-if="item.sessionContent.type.trim() == 'audio'" :style="{'width':item.sessionContent.playtime/1000+'px','max-width':'250px'}" class="im-audio im-audio-new">
									<div class="fl">{{item.sessionContent.imgHeight}}s'</div>
									<div class="fr"></div>
									<a class="audio-con" :href="item.sessionContent.content" style="display:none">audio</a>
								</div>
							</div>
						</dd>
					</dl>
				</div>
			</div>
			<m-pagination :pagination-conf="paginationConf"></m-pagination>
		</div>
	</div>
	<m-modal :modal-config="modalConfig">
		<div class="export-chat-records">
			<div class="chat-date clearfix">
				<label>时间</label>
				<div class="date-box">
					<div class="all-records clearfix">
						<v-radio :value="'all'" :checked="exportType === 'all' ? true : false" :change="chooseExportType"></v-radio>
						<label>全部聊天记录</label>
					</div>
					<div class="choose-date">
						<v-radio :value="'time'" :checked="exportType === 'time' ? true : false" :change="chooseExportType"></v-radio>
						<div class="date-nav clearfix">
							<a href="javascript:;">
								<m-datetimepicker :model.sync="ExportStartTime" :onshow="startShow"></m-datetimepicker><span class="date">{{ExportStartTime | ISODate}}</span>
							</a>
							<em class="line"></em>
							<a href="javascript:;">
								<m-datetimepicker :model.sync="ExportEndTime" :onshow="endShow"></m-datetimepicker><span class="date">{{ExportEndTime | ISODate}}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="input">
				<label>文件名</label>
				<input type="text" readonly v-model="exportFileName">
			</div>
			<!--             
			<div class="input clearfix">
			  <label>文件位置</label>
			  <div class="file"><em class="icon-file"><img src="/dist/img/ui/icon-file.png"></em>
				<input type="text">
			  </div><a href="##" class="btn btn-blue read-btn">浏览</a>
			</div>
			 -->
		</div>
	</m-modal>
</template>
<style scoped>
.wrap-right .title .search-box .search-list .list-s {
	display: block;
}

.span-active {
	background-color: rgba(55, 134, 199, 0.6)!important;
	color: #fff!important;
}

.left-list ul li span {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
}

.left-list ul li span:nth-child(3) {
	max-width: 60px;
}
</style>
<script type="text/ecmascript-6">
import Vue from 'vue';
import actions from 'actions';
import store from 'store';
import Pagination from '../base/pagination.vue';
import modalCon from '../common/modal-con.vue';
import Datepacker from '../common/datepacker.vue';
import $ from 'jquery';
import utils from 'utils';
const durTime = 1000 * 60 * 60 * 24 * 7;
const today = new Date().valueOf();
export default {
	name: 'chatRecord',
	data() {
		return {
			exportType: 'time',
			exportFileName: '',
			ExportStartTime: today - durTime,
			ExportEndTime: today,
			modalConfig: {
				fixcls: 'check-chat',
				show: false,
				title: '导出聊天记录',
				cancel_str: '取消',
				apply_str: '导出',
				cancel_func() {},
				apply_func() {}
			},
			exportsUserIds: [],
			searchText: '',
			paginationConf: {
				currentPage: 1,
				itemsPerPage: 50,
				pagesLength: 5,
				totalItems: 0,
				onChange() {}
			},
			searchType: 1,
			searchList: [{
				type: 1,
				txt: '客服人员'
			}, {
				type: 2,
				txt: '来访顾客'
			}],
			operatorMessage: [],
			operatorList: [],
			customerList: [],
			currentCustomerId: null,
			operatorId: null
		};
	},
	ready() {
		this.paginationConf.onChange = () => {
			this.operatorMessage = [];
			this.getChatRecord();
		};
		this.modalConfig.apply_func = () => {
			this.modalConfig.show = false;
			this.exportMsg(this.ExportStartTime, this.ExportEndTime);
		};
		this.getOperatorList();
	},
	components: {
		'm-pagination': Pagination,
		'm-modal': modalCon,
		'm-datetimepicker': Datepacker
	},
	methods: {
		getOperatorList() {
			this.$http({
				url: 'operator/getOperatorList',
				method: 'get'
			}).then((response) => {
				this.operatorList = response.data.data.operatorList || [];
			});
		},
		getCustomerList(operator, e) {
			$(e.currentTarget).parents('.list-bg').find('ul>li').removeClass('span-active');
			$(e.currentTarget).addClass('span-active');
			this.operatorMessage = [];
			this.operatorId = operator.id;
			this.$http({
				url: 'message/getMessageList',
				method: 'get',
				params: {
					operatorId: operator.id
				}
			}).then((response) => {
				this.customerList = response.data.data.customerList || [];
			});
		},
		getChatRecord(user, e) {
			if (e) {
				$(e.target).parents('.left-list').find('ul>li').removeClass('span-active');
				$(e.target).parent().addClass('span-active');
				this.paginationConf.currentPage = 1;
			}
			this.currentCustomerId = user ? user.customerId : this.currentCustomerId;
			this.$http({
				url: 'message/getOperatorMessageList',
				method: 'get',
				params: {
					customerId: this.currentCustomerId,
					pageIndex: this.paginationConf.currentPage,
					pageSize: this.paginationConf.itemsPerPage,
					operatorId: this.operatorId
				}
			}).then((response) => {
				var data = response.data.data;
				this.paginationConf.totalItems = data.total || 0;
				if (e) {
					setTimeout(() => {
						this.paginationConf.currentPage = this.paginationConf.numberOfPages;
					}, 1);
				}
				this.operatorMessage = data.sessionList || [];
			});
		},
		startShow(ct, datepicker) {
			var end = new Date(this.ExportEndTime);
			datepicker.setOptions({
				maxDate: end || false
			});
		},
		endShow(ct, datepicker) {
			var start = new Date(this.ExportStartTime);
			datepicker.setOptions({
				minDate: start || false
			});
		},
		search(e) {
			var txt = this.searchText.trim();
			if (!txt.length) {
				this.customerList = [];
				this.operatorMessage = [];
				this.getOperatorList();
				return;
			}
			this._search('message/searchMessageList', txt, (data) => {
				this.paginationConf.currentPage = 1;
				this.paginationConf.totalItems = data.total || 0;
				if (this.searchType == '1') {
					this.customerList = [];
					this.operatorMessage = [];
				}
				if (this.searchType == '2') {
					this.operatorMessage = [];
				}
				if (data.customerList) {
					this.operatorMessage = data.sessionList || [];
					this.customerList = data.customerList || [];
				} else {
					this.operatorList = data.operatorList || [];
				}
			});
			this.operatorId = null;
		},
		_search(url, txt, cb) {
			this.$http({
				url: url,
				method: 'get',
				params: {
					customerKeyWord: txt,
					searchType: this.searchType
				}
			}).then((res) => {
				cb(res.data.data);
			});
		},
		chooseExportUser(value, checked) {
			var data = value.split(',');
			var userData = {
				id: data[0],
				name: data[1]
			};
			if (checked) {
				this.exportsUserIds.push(userData);
			} else {
				this.exportsUserIds.forEach((item, index) => {
					if (item.id === userData.id) {
						this.exportsUserIds.splice(index, 1);
					}
				});
			}
		},
		openExportModal(e) {
			if (this.exportsUserIds.length) {
				var names = this.exportsUserIds.map(function(user) {
					return user.name;
				});
				this.exportFileName = names.join('与') + '的聊天记录.zip';
				this.modalConfig.show = true;
			} else {
				actions.alert(store, {
					show: true,
					msg: '请选择导出的用户'
				});
			}
		},
		exportMsg(startTime, endTime) {
			// var download = window.open('about:blank');
			var customerId = this.exportsUserIds.map(function(user) {
				return user.id;
			}).join(',');
			var start, end;
			if (typeof startTime === 'string') {
				start = Date.parse(startTime);
			} else {
				start = startTime;
			}
			if (typeof endTime === 'string') {
				end = Date.parse(endTime);
			} else {

				end = endTime;
			}
			let operator = this.operatorId;
			if(this.exportType == 'time'){
				window.open(`${Vue.http.options.root}/message/exportPDFMessageList?customerId=${customerId}&startTime=${start}&endTime=${end}&operatorId=${operator}`);
			}else{
				window.open(`${Vue.http.options.root}/message/exportPDFMessageList?customerId=${customerId}&operatorId=${operator}`);
			}
			// this.$http({
			// 	url: 'message/exportMessageList',
			// 	method: 'get',
			// 	params: {
			// 		customerId: customerId,
			// 		startTime: startTime,
			// 		endTime: endTime
			// 	}
			// }).then((res) => {
			// 	download.location.href = res.data.data.file;
			// 	download.focus();
			// }, () => {
			// 	download.close();
			// });
		},
		toggleSearchType(val) {
			this.searchType = val;
		},
		chooseExportType(value) {
			console.log(this.exportType);
			this.exportType = value;
		},
		contactPlay(event) { // 控制音频视频播放暂停
			const dom = event.currentTarget;
			const hasChildv = $(dom).find('video');
			const iconPlay = $(dom).find('.icon-play');
			$('video').stop();

			//			$('video').pause();
			iconPlay.show();
			if (hasChildv.length > 0) {
				hasChildv[0].play();
				hasChildv[0].addEventListener('ended', function() {
					iconPlay.show();
				});
				iconPlay.hide();
			}

			const im_audio = $(dom).find('.im-audio');
			im_audio.removeClass('im-audio-new');

			const audioHref = $(dom).find('.audio-con').attr('href');

			if (audioHref) {
				fetch(audioHref)
					.then((response) => {
						return response.blob();
					})
					.then((blob) => {
						utils.readBlob(blob, (data) => {
							utils.playAmrArray(data);
						});
					});
			}
		}
	}
};
</script>
