<template>
	<div id="reportrange{{index || 0}}" class="pull-left" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 250px">
		<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
		<span>{{range[0].val}} - {{range[1]?range[1].val:''}} </span> <b class="caret"></b>
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
		const start = moment().subtract(29, 'days').format('YYYY-MM-DD');
		const end = moment().format('YYYY-MM-DD');
		const _this = this;
		// this.cb(start, end);
		this.index = this.index || 0;
		let id = `reportrange${this.index}`;
		$(`#${id}`).daterangepicker(
			{
				'format': 'YYYY-MM-DD',
				'startDate': start,
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
				},
				'ranges': {
					'今天': [moment(), moment()],
					'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'最近七天': [moment().subtract(6, 'days'), moment()],
					'最近30天': [moment().subtract(29, 'days'), moment()],
					'本月': [moment().startOf('month'), moment().endOf('month')],
					'上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				}
			},
			function(start, end, label) {
				const startTime = {
					val: start.format('YYYY-MM-DD'),
					name: start.format('YYYY-MM-DD')
				};
				const endTime = {
					val: end.format('YYYY-MM-DD'),
					name: end.format('YYYY-MM-DD')
				};
				_this.cb(start, end);
				_this.range = [startTime, endTime];
				_this.componentreply.datePicker[0] = startTime;
				_this.componentreply.datePicker[1] = endTime;
				_this.$dispatch('componentreplyC', 'changed');
			}
		);
	},
	methods: {
		cb(start, end) {
			$(`#reportrange${this.index} span`).html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
		}
	}
};
</script>
