<template>
	<div>
		<div class="amp-form amp-form02">
			<div class="form-column">
				<el-form :model="formData" :rules="rules" ref="formData" label-width="140px">
					<el-form-item label="投放单元名称：" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="设备类型：">
						<el-radio-group v-model="formData.platform">
							<el-radio :label="1">APP</el-radio>
							<el-radio :label="2">WAP</el-radio>
							<el-radio :label="3">PC</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="投放类型：">
						<el-radio-group v-model="formData.type">
							<el-radio :label="1">商品推广</el-radio>
							<el-radio :label="2">活动推广</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="投放广告位：">
						<span class="form-text">已选择<i class="group-tip">{{formData.advertisements.length}}</i>个广告位</span>
						<el-button @click="showAddAd = true">添加广告位</el-button>
						<div class="detail-row detail-row03" v-show="formData.advertisements.length">
							<table class="table">
								<tbody>
									<tr>
										<th><span>媒体名称</span></th>
										<th><span>广告位名称</span></th>
										<th width="90"><span>刊例价</span></th>
										<th width="120"><span>素材尺寸限制</span></th>
										<th width="120"><span>素材大小限制</span></th>
										<th width="58"><span>操作</span></th>
									</tr>
									<tr v-for="(item, index) in formData.advertisements">
										<td><span>{{item.publisherName}}</span></td>
										<td><span>{{item.advertisementName}}</span></td>
										<td><span>{{item.adBid/100}}</span></td>
										<td><span>{{item.width}} * {{item.height}}</span></td>
										<td><span>{{item.size}}</span></td>
										<td><span><em class="icon icon-delete" @click="delAd(index)"></em></span></td>
									</tr>
								</tbody>
							</table>
						</div>
					</el-form-item>
					<el-form-item label="返利金额：" v-show="isRebate" prop="rebateBid">
						<el-row>
							<el-col :span="8">
								<el-input placeholder="请输入返利金额" v-model.number="formData.rebateBid"></el-input>
							</el-col>
							<el-col :span="4">
								<span style="margin-left: 10px">元/次分享</span>
								<!-- <el-tooltip effect="light" placement="top-end">
									<div slot="content">
										<div class="dialog-white dialog-tip" style="font-size: 14px;">
											<p class="dialog-text"></p>
										</div>
									</div>
									<em class="icon icon-help"></em>
								</el-tooltip> -->
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="地域定向：">
						<el-radio-group v-model="formData.regionType">
							<el-radio :label="0">不限</el-radio>
							<el-radio :label="1">自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="" style="margin-top: -20px;" prop="region" v-show="formData.regionType">
						<el-checkbox v-model="regionCheck" @change="selectAllRegion">全选</el-checkbox>
						<div class="address-list">
							<div class="list-province">
								<ul>
									<li v-for="(item, index) in regionData" @click="applyInnerCity(index)">
										<el-checkbox v-model="item.checked" @change="selectProvince(item, index)"></el-checkbox>
										<span>{{item.name}}</span>
										<span class="tips-span">{{item.city.filter((each) => {return each.checked}).length}}/{{item.city.length}}</span>
									</li>
								</ul>
							</div>
							<div class="list-city">
								<ul>
									<li v-for="(item, index) in regionChildrenData">
										<el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>
									</li>
								</ul>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="时间段定向：">
						<el-radio-group v-model="formData.timeType">
							<el-radio :label="0">全时间段</el-radio>
							<el-radio :label="1">自定义时间段</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="" v-show="formData.timeType === 1" prop="time">
						<el-row>
							<el-col :span="2">
								<span>快速设定:</span>
							</el-col>
							<el-col :span="22">
								<el-radio-group v-model="showTimeSlot">
									<el-button @click="selectMultiDay(['1', '2', '3', '4', '5', '6', '7'])">整周展示</el-button>
									<el-button @click="selectMultiDay(['1', '2', '3', '4', '5'])">仅工作日展示</el-button>
									<el-button @click="selectMultiDay(['6', '7'])">仅休息日展示</el-button>
								</el-radio-group>
							</el-col>
						</el-row>
						<div class="time-space">
							<div class="space-cont">
								<div class="cont-tip"><i class="time-pointer green-module"> </i><span class="time-tip-text">投放时间段</span><i class="time-pointer"></i><span class="time-tip-text">暂停时间段</span></div>
								<div class="cont-header"><span class="span-row-1">日期</span><span class="span-row-2">复制到</span><span class="span-row-3">00:00-05:00</span><span class="span-row-3">06:00-11:00</span><span class="span-row-3">12:00-17:00</span><span class="span-row-3">18:00-23:00</span></div>
								<div class="cont-infor">
									<ul>
										<li class="actived" v-for="whichDay in ['1', '2', '3', '4', '5', '6', '7']">
											<div class="span-row-1">
												<el-checkbox v-model="timeAllDayCheck[whichDay]" @change="selectAllDay(whichDay)">星期{{numToCh(whichDay)}}</el-checkbox>
											</div>
											<div class="span-row-2"><a href="javascript:void(0)" @click="copyTime(whichDay, [...genContinuousNum(7)])" class="btn btn-gray-small">整周</a><a href="javascript:void(0)" @click="copyTime(whichDay, [...genContinuousNum(5)])" class="btn btn-gray-small">工作日</a><a href="javascript:void(0)" @click="copyTime(whichDay, [...genContinuousNum(5, 7)])" class="btn btn-gray-small">休息日</a></div>
											<div class="span-row-3"><i class="time-pointer" :class="{'gray-module': formData.time[whichDay].indexOf(item) === -1}" v-for="item in [0,1,2,3,4,5]" @click="selectOneDay(whichDay, item)">{{item}}</i></div>
											<div class="span-row-3"><i class="time-pointer" :class="{'gray-module': formData.time[whichDay].indexOf(item) === -1}" v-for="item in [6,7,8,9,10,11]" @click="selectOneDay(whichDay, item)">{{item}}</i></div>
											<div class="span-row-3"><i class="time-pointer" :class="{'gray-module': formData.time[whichDay].indexOf(item) === -1}" v-for="item in [12,13,14,15,16,17]" @click="selectOneDay(whichDay, item)">{{item}}</i></div>
											<div class="span-row-3"><i class="time-pointer" :class="{'gray-module': formData.time[whichDay].indexOf(item) === -1}" v-for="item in [18,19,20,21,22,23]" @click="selectOneDay(whichDay, item)">{{item}}</i></div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<transition name="drawer">
			<m-add-ad v-if="showAddAd" :form-data="formData"></m-add-ad>
		</transition>
	</div>
</template>
<script>
import Vue from 'vue';
import store from 'store';
import {
	copyObj,
	objType,
	formatDate,
	mixin
} from 'utils/common';

import AREA_DATA from '../../../help/CITY.js';

import Event from 'event';
import Http from 'http';

import addAd from './drawer-add-ad.vue';
export default {
	name: 'app-put-new-unit',
	data() {
		return {
			formData: {},
			rules: {
				name: [{
					required: true,
					message: '请输入投放单元名称',
					trigger: 'blur'
				}, {
					max: 30,
					message: '最大长度不超过30个汉字',
					trigger: 'blur'
				}],
				rebateBid: [{
					validator: function(rule, value, callback) {
						if (value === '') {
							callback(new Error('请输入返利出价'));
						} else if (objType(value) !== 'Number') {
							callback(new Error('只能为数字'));
						} else if (value < 0.01) {
							callback(new Error('返利出价最低为0.01元/次'));
						} else if (value > 100) {
							callback(new Error('返利出价最高不超过100元/次'));
						} else if (/\.(.*)/.test(value.toString()) ? value.toString().match(/\.(.*)/)[1].length >2 : 0) {
							callback(new Error('只能两位小数'));
						} else {
							callback();
						}
					},
					trigger: 'change'
				}],
				region: [{
					validator: (rule, value, callback) => {
						if (this.formData.region.length === 0 && this.formData.regionType) {
							callback(new Error('投放地域不能为空'));
						} else {
							callback();
						}
					}
				}],
				time: [{
					validator: (rule, value, callback) => {
						let len = 0;
						Object.keys(this.formData.time).forEach((item) => {
							len += this.formData.time[item].length;
						});
						if (len === 0 && this.formData.timeType === 1) {
							callback(new Error('投放时间段不能为空'));
						} else {
							callback();
						}
					}
				}]
			},
			regionCheck: false,
			regionData: AREA_DATA,
			regionChildrenData: [],
			showTimeSlot: 0,
			timeAllDayCheck: {
				'1': false,
				'2': false,
				'3': false,
				'4': false,
				'5': false,
				'6': false,
				'7': false
			},
			showAddAd: false,
			httpMethodMap: {
				new: 'post',
				copy: 'post',
				modify: 'put'
			}
		};
	},
	computed: {
		drawerData: () => store.state.drawerCtrl.config, // from store
		drawerCtrlAction: () => store.state.drawerCtrl.action,
		isRebate: () => store.state.drawerCtrl.isRebate // 是否返利，从 state 中来 如果被复写掉了为 false 达到知晓上一级是否返利的目的
	},
	components: {
		'm-add-ad': addAd
	},
	created() {
		this.formData = copyObj(this.drawerData);

		this.formData.time = this.formData.time ? this.formData.time : { // 时间定向 默认参数
			'1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			'2': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			'3': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			'4': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			'5': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			'6': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			'7': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
		};
		// 分转元
		this.formData.rebateBid = this.formData.rebateBid / 100;
	},
	mounted() {
		this.regionData.forEach((item) => {
			Vue.set(item, 'checked', false);
			item.city.forEach((each) => {
				if (this.formData.region.indexOf(each.zip) !== -1) {
					Vue.set(each, 'checked', true);
				} else {
					Vue.set(each, 'checked', false);
				}
			});
		});
		// 隐藏添加广告位
		Event.$off('drawer-hide-add-ad');
		Event.$on('drawer-hide-add-ad', () => {
			this.showAddAd = false;
		});
		// 保存广告位
		Event.$off('drawer-save-add-ad');
		Event.$on('drawer-save-add-ad', (result) => {
			this.formData.advertisements = result;
			this.showAddAd = false;
		});
		// 保存
		Event.$off('put-save');
		Event.$on('put-save', () => {
			this.$refs.formData.validate((result) => {
				let params = {
					name: this.formData.name,
					platform: this.formData.platform,
					type: this.formData.type,
					timeType: this.formData.timeType,
					time: this.formData.time,
					regionType: this.formData.regionType,
					region: this.formData.regionType ? this.formData.region : [],
					rebateBid: this.isRebate ? this.formData.rebateBid * 100: 0,
					advertisements: this.formData.advertisements
				};
				if (result) {
					Http({
						url: 'api/flight',
						method: this.httpMethodMap[this.drawerCtrlAction],
						data: this.drawerCtrlAction === 'modify' ? mixin({
							flightId: this.formData.flightId
						}, params) : mixin({
							campaignId: this.formData.campaignId
						}, params)
					})
					.then((res) => {
						if (!res.data.iserror) {
							Event.$emit('put-save-result', {
								error: 0,
								res: res.data,
								isRebate: this.isRebate
							});
						} else {
							Event.$emit('put-save-result', {
								error: 1,
								res: null
							});
						}
					})
					.catch((e) => {
						Event.$emit('put-save-result', {
							error: 1,
							res: null
						});
					});
				} else {
					Event.$emit('put-save-result', {
						error: 1,
						res: null
					});
				}
			});
		});
	},
	methods: {
		delAd(index) {
			this.formData.advertisements.splice(index, 1);
		},
		selectProvince(item, index) {
			this.regionData[index].city.forEach((each) => {
				if (this.formData.region.indexOf(each) === -1) {
					each.checked = item.checked;
				}
			});
		},
		applyInnerCity(index) {
			this.regionChildrenData = [...this.regionData[index].city];
		},
		selectAllRegion() {
			this.regionData.forEach((item) => {
				item.city.forEach((each) => {
					each.checked = this.regionCheck;
				});
			});
		},
		selectOneDay(day, hour) {
			this.formData.time[day].reverse();
			let index = this.formData.time[day].indexOf(hour);
			index !== -1 ? this.formData.time[day].splice(index, 1) : this.formData.time[day].push(hour);
		},
		selectAllDay(day) {
			if (!this.timeAllDayCheck[day]) {
				this.formData.time[day] = [];
			} else {
				this.formData.time[day] = [...this.genContinuousNum(23)];
			}
		},
		selectMultiDay(days) {
			this.formData.time = {
				'1': [],
				'2': [],
				'3': [],
				'4': [],
				'5': [],
				'6': [],
				'7': []
			};
			days.forEach((item) => {
				this.formData.time[item] = [...this.genContinuousNum(23)];
			});
		},
		copyTime(from, array) {
			array.forEach((item) => {
				this.formData.time[JSON.stringify(item)] = [...this.formData.time[from]];
			});
		},
		genContinuousNum(from, to) {
			let realFrom = 0;
			let realTo = 0;
			if (to) {
				realTo = to;
				realFrom = from;
			} else {
				realTo = from;
			}
			let result = [];
			while (realTo >= realFrom) {
				result.push(realTo);
				realTo--;
			}
			return result.reverse();
		},
		numToCh(num) {
			let map = {
				0: '零',
				1: '一',
				2: '二',
				3: '三',
				4: '四',
				5: '五',
				6: '六',
				7: '日',
				8: '八',
				9: '九'
			};
			return map[num];
		}
	},
	watch: {
		'formData.time': {
			handler: function() {
				Object.keys(this.formData.time).forEach((item) => {
					if (this.formData.time[item].length === 24) {
						this.timeAllDayCheck[item] = true;
					} else {
						this.timeAllDayCheck[item] = false;
					}
				});
			},
			deep: true
		},
		'regionData': {
			handler: function() {
				this.formData.region = [];
				let allLen = 0;
				let allCheckLen = 0;
				this.regionData.forEach((item) => {
					let cur = 0;
					item.city.forEach((each) => {
						allLen++;
						let index = this.formData.region.indexOf(each);
						if (each.checked && index === -1) {
							this.formData.region.push(each.zip);
							cur++;
						}
					});
					if (cur === item.city.length) {
						item.checked = true;
					} else {
						item.checked = false;
					}
					allCheckLen = cur + allCheckLen;
				});
				if (allCheckLen === allLen) {
					this.regionCheck = true;
				}
			},
			deep: true
		}
	}
};
</script>
<style>
.tips-span {
	position: absolute;
	background: #14a3ff;
	color: #fff;
	border-radius: 5px;
	font-size: 12px;
	line-height: 12px;
	padding: 2px 5px;
	right: 25px;
	top: 5px;
}
</style>
