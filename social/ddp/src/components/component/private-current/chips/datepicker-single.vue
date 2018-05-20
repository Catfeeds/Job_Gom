<template>
	<div id="reportsingle{{index || 0}}" class="pull-left" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 250px">
		<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
		<span>{{range[0].val}}</span> <b class="caret"></b>
	</div>
</template>
<style scoped>
	@import '~daterangepicker/daterangepicker-bs3.css';
</style>
<script>
import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker';
export default {
	name: 'datePickerRange',
	components: {},
	props: [ 'range', 'componentreply', 'index' ],
	data() {
		return {};
	},
	ready() {
		const _this = this;
		const end = moment().format('MM/DD/YYYY');
		this.index = this.index || 0;
		let id = `reportsingle${this.index}`;
		let ran = {};
		$(`#${id}`).daterangepicker(
			{
				'singleDatePicker': true,
				'showISOWeekNumbers': true,
				'timePicker': true,
				'timePicker24Hour': true,
				'startDate': '01/01/2016',
				'endDate': end,
				'locale': {
					'format': 'YYYY-MM-DD',
					'separator': ' 至 ',
					'applyLabel': '确定',
					'cancelLabel': '取消',
					'customRangeLabel': '常规',
					'daysOfWeek': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
					'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
					'firstDay': 1
				}
			},
			function(start, end, label) {
				const startTime = {
					val: start.format('YYYY-MM-DD hh:mm:ss'),
					name: start.format('YYYY-MM-DD hh:mm:ss')
				};
				const endTime = {
					val: end.format('YYYY-MM-DD hh:mm:ss'),
					name: end.format('YYYY-MM-DD hh:mm:ss')
				};
				_this.cb(start, end);
				ran = [startTime, endTime];
				_this.componentreply.datePicker[0] = startTime;
				_this.componentreply.datePicker[1] = endTime;
				_this.$dispatch('componentreplyC', 'changed');
			}
		);
		if (ran.length > 0) {
			this.range = ran;
		}
		console.log('this.range', this.range);
	},
	methods: {
		cb(start, end) {
			$(`#reportsingle${this.index} span`).html(start.format('YYYY-MM-DD hh:mm:ss'));
		}
	}
};
</script>
