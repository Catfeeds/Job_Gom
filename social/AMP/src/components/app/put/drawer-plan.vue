<template>
	<div class="amp-form">
		<div class="form-column">
			<el-form :model="formData" :rules="rules" ref="formData" label-width="140px">
				<el-form-item label="投放计划名称：" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="起止时间：">
					<el-radio-group v-model="formData.isContinuous">
						<el-radio :label="1">连续投放</el-radio>
						<el-radio :label="0">不连续投放</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="" v-if="formData.isContinuous">
					<el-radio-group v-model="formData.isUnlimited">
						<el-radio :label="0">设定结束时间</el-radio>
						<el-radio :label="1">不限结束时间</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="" v-if="formData.isContinuous" prop="startTime">
					<el-col :span="11">
						<el-row>
							<el-col :span="7">
								<span>开始时间:</span>
							</el-col>
							<el-col :span="17">
								<el-date-picker :picker-options="pickerOptions" :editable="false" :clearable="false" type="date" placeholder="开始时间" v-model="startTime" style="width: 100%;"></el-date-picker>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="2" style="text-align: center;">-</el-col>
					<el-col :span="11" v-if="!formData.isUnlimited">
						<el-row>
							<el-col :span="7">
								<span>结束时间:</span>
							</el-col>
							<el-col :span="17">
								<el-date-picker :picker-options="pickerOptions" :editable="false" :clearable="false" type="date" placeholder="结束时间" v-model="endTime" style="width: 100%;"></el-date-picker>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="11" v-else>
						<span>本计划将长期有效</span>
					</el-col>
				</el-form-item>
				<el-form-item label="" v-if="formData.isContinuous === 0" style="margin-top: -15px;">
					<div class="time-setting">
						<div class="setting-header">
							<span class="header-day">共 {{daysLen}} 天</span>
							<span class="header-del" @click.prevent="formData.schedule = []"><em class="icon icon-delete"></em>全部删除</span>
							<span class="header-calendar" style="position: relative;">
								<em class="icon icon-calendar"></em>
								<el-date-picker :picker-options="pickerOptions" type="daterange" placeholder="请选择时间" size="mini" :editable="false" v-model="noContinuousDate" style="width: 14px;height: 14px;position: absolute;left: 0;top: 13px;opacity: 0;"></el-date-picker>
							</span>
						</div>
						<div class="setting-list">
							<ul>
								<li v-for="(item, index) in scheduleList" :class="{'error': dayErrorIndex.indexOf(index) !== -1}">
									<span>{{item}}</span>
									<i @click="delSchedule(index)" style="cursor: pointer;font-size: 12px;margin-left: 80px;" class="el-icon-close"></i>
								</li>
							</ul>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="计费方式：">
					<el-radio-group v-model="formData.saleMode">
						<!-- <el-radio :label="1">CPM</el-radio> -->
						<!-- <el-radio :label="2">CPD</el-radio> -->
						<el-radio :label="3">CPC</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="广告日预算：" prop="dailyAdBudget">
					<el-row>
						<el-col :span="7">
							<el-radio-group style="vertical-align: middle;" v-model="formData.adLimited">
								<el-radio :label="0">不限</el-radio>
								<el-radio :label="1">自定义</el-radio>
							</el-radio-group>
						</el-col>
						<el-col :span="14">
							<el-input :disabled="formData.adLimited === 0" :placeholder="formData.adLimited === 0 ? '不限预算' : ''" v-model.number="formData.adLimited === 0 ? '' : formData.dailyAdBudget" style="widht: 100%"></el-input>
						</el-col>
						<el-col :span="2">
							<span style="margin-left: 6px;">元/天</span>
						</el-col>
						<el-col :span="1">
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
				<el-form-item label="返利活动：">
					<el-switch on-text="" off-text="" v-model="isRebate" @change="customIsRebate"></el-switch>
				</el-form-item>
				<el-form-item label="返利日预算：" prop="dailyRebateBudget" v-show="isRebate">
					<el-row>
						<el-col :span="7">
							<el-radio-group style="vertical-align: middle;" v-model="formData.rebateLimited">
								<el-radio :label="0">不限</el-radio>
								<el-radio :label="1">自定义</el-radio>
							</el-radio-group>
						</el-col>
						<el-col :span="14">
							<el-input :disabled="formData.rebateLimited === 0" :placeholder="formData.rebateLimited === 0 ? '不限预算' : ''" v-model.number="formData.rebateLimited === 0 ? '' : formData.dailyRebateBudget" style="widht: 100%"></el-input>
						</el-col>
						<el-col :span="2">
							<span style="margin-left: 6px;">元/天</span>
						</el-col>
						<el-col :span="1">
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
			</el-form>
		</div>
	</div>
</template>
<script>
import store from 'store';
import {
	copyObj,
	objType,
	formatDate,
	mixin,
	formatTimeByUnit
} from 'utils/common';

import Event from 'event';
import Http from 'http';

export default {
	name: 'app-put-new-plan',
	data() {
		return {
			formData: {},
			pickerOptions: {
	          	disabledDate(time) {
	            	return time.getTime() < Date.now() - 8.64e7;
	          	}
	        },
			rules: {
				name: [{
					required: true,
					message: '请输入计划名称',
					trigger: 'blur'
				}, {
					max: 30,
					message: '最大长度不超过30个汉字',
					trigger: 'blur'
				}],
				dailyAdBudget: [{
					validator: function(rule, value, callback) {
						if (value === '') {
							callback(new Error('请填写广告日预算'));
						} else if (objType(value) !== 'Number') {
							callback(new Error('只能为数字'));
						} else if (value < 0) {
							callback(new Error('不能为负数'));
						} else if (value > 99999999) {
							callback(new Error('最大值不超过99,999,999.00'));
						} else if (/\.(.*)/.test(value.toString()) ? value.toString().match(/\.(.*)/)[1].length > 2 : false) {
							callback(new Error('只能两位小数'));
						} else {
							callback();
        				}
					},
					trigger: 'change'
				}],
				dailyRebateBudget: [{
					validator: function(rule, value, callback) {
						if (value === '') {
							callback(new Error('请填写返利日预算'));
						} else if (objType(value) !== 'Number') {
							callback(new Error('只能为数字'));
						} else if (value < 0) {
							callback(new Error('不能为负数'));
						} else if (value > 99999999) {
							callback(new Error('最大值不超过99,999,999.00'));
						}  else if (/\.(.*)/.test(value.toString()) ? value.toString().match(/\.(.*)/)[1].length > 2 : false) {
							callback(new Error('只能两位小数'));
						} else {
							callback();
						}
					},
					trigger: 'change'
				}],
				startTime: [{
					validator: (rule, value, callback) => {
						if (this.startTime.valueOf() > this.endTime.valueOf()) {
							callback(new Error('开始时间不得迟于结束时间'));
						} else {
							callback();
						}
					},
					trigger: 'change'
				}]
			},
			noContinuousDate: [null, null],
			startTime: '',
			endTime: '',
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
		isRebate: function() {
			return this.formData.isRebate === 1;
		},
		scheduleList: function() {
			if (this.formData.schedule[0] === null)  {
				return [];
			}
			let result = [];
			this.formData.schedule.forEach((item) => {
				let one = item[0];
				let two = item[1];
				if (one === two) {
					result.push(formatDate(one, 'yyyy-MM-dd'));
				} else {
					result.push(`${formatDate(one, 'yyyy-MM-dd')} 至 ${formatDate(two, 'yyyy-MM-dd')}`);
				}
			});
			return result;
		},
		daysLen: function() {
			let len = 0;
			this.formData.schedule.forEach((item) => {
//				let cur = item.split('-');
				let cur = item;
				let result = formatTimeByUnit(cur[0], cur[1], {
					day: true
				});
				len += result.day;
			});
			return len;
		},
		dayErrorIndex: function() {
			let timeObjArray = [];
			this.formData.schedule.forEach((item, index) => {
//				let cur = item.split('-');
				let cur = item;
				timeObjArray.push({
					start: cur[0],
					end: cur[1],
					index: index
				});
			});
			timeObjArray.sort(function(a, b) {
				return a.start - b.start;
			});
			for(let i = 1; i < timeObjArray.length; i++) {
				if (timeObjArray[i].start < timeObjArray[i -1].end) {
					this.$message({
						message: '存在重复时间段',
						type: 'error',
						duration: 3000
					});
					return [timeObjArray[i].index, timeObjArray[i - 1].index];
				}
			}
			return [];
		}
	},
	created() {
		this.formData = copyObj(this.drawerData);
		// 分转元
		this.formData.dailyRebateBudget = this.formData.dailyRebateBudget / 100;
		this.formData.dailyAdBudget = this.formData.dailyAdBudget / 100;
		this.startTime = this.formData.startTime || Date.now();
		this.endTime = this.formData.endTime || Date.now();
	},
	mounted() {
		Event.$off('put-save');
		Event.$on('put-save', () => {
			this.$refs.formData.validate((result) => {
				let schedule = null;
				if (!this.formData.isContinuous) {
					schedule = this.formData.schedule.map((item) => {
						return [item[0].toString(), item[1].toString()];
					});
				} else {
					schedule = [];
				}

				let params = {
					name: this.formData.name,
					isContinuous: this.formData.isContinuous,
					isUnlimited: this.formData.isUnlimited,
					startTime: this.formData.startTime,
					endTime: this.formData.endTime,
					schedule: schedule,
					saleMode: this.formData.saleMode,
					adLimited: this.formData.adLimited,
					dailyAdBudget: this.formData.adLimited ? this.formData.dailyAdBudget * 100 : 0,
					isRebate: this.formData.isRebate,
					rebateLimited: this.formData.isRebate ? this.formData.rebateLimited : 0,
					dailyRebateBudget: this.formData.rebateLimited ? this.formData.dailyRebateBudget * 100 : 0
				};
				if (result) {
					Http({
						url: 'api/campaign',
						method: this.httpMethodMap[this.drawerCtrlAction],
						data: this.drawerCtrlAction === 'modify' ? mixin({
							campaignId: this.formData.campaignId
						}, params) : params
					})
					.then((res) => {
						if (!res.data.iserror) {
							Event.$emit('put-save-result', {
								error: 0,
								res: res.data,
								isRebate: this.formData.isRebate
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
		customIsRebate(value) {
			// value -> true/false transform to 1/0
			this.formData.isRebate = Number(value);
		},
		delSchedule(index) {
			this.formData.schedule.splice(index, 1);
		}
	},
	watch: {
		'formData.adLimited': function() {
			if (!this.formData.adLimited) {
				this.formData.dailyAdBudget = 0;
			}
		},
		'formData.rebateLimited': function() {
			if (!this.formData.rebateLimited) {
				this.formData.dailyRebateBudget = 0;
			}
		},
		'formData.isContinuous': function() {
			this.formData.schedule = [];
		},
		noContinuousDate: function() {
			// 重置
			if (this.noContinuousDate[0] !== null) {
			    this.formData.schedule.push([this.noContinuousDate[0].valueOf(),this.noContinuousDate[1].valueOf()]);
//				this.formData.schedule.push(`${this.noContinuousDate[0].valueOf()}-${this.noContinuousDate[1].valueOf()}`);
				this.noContinuousDate[0] = this.noContinuousDate[1] = null;
			}
		},
		startTime: function() {
			if (this.startTime) {
				this.formData.startTime = new Date(this.startTime).valueOf();
			}
		},
		endTime: function() {
			if (this.endTime) {
				this.formData.endTime = new Date(this.endTime).valueOf();
			}
		}
	}
};
</script>
<style scoped>
.error {
	color: #ff5151;
}
</style>
