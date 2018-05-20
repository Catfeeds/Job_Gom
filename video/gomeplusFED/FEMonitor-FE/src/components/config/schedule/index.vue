<template>
	<div class="opg">
		<p><a class="btn btn-blue" href="javascript:void 0;" @click="executeStart(1)">重启每日三次的执行计划</a></p>
		<p><a class="btn btn-blue" href="javascript:void 0;" @click="executeStart(2)">重启启每周五的执行计划</a></p>
		<p><a class="btn btn-blue" href="javascript:void 0;" @click="executeStart(4)">重启启每周五发邮件的执行计划</a></p>
		<p><a class="btn btn-blue" href="javascript:void 0;" @click="executeClose(1)">关闭每日三次的执行计划</a></p>
		<p><a class="btn btn-blue" href="javascript:void 0;" @click="executeClose(2)">关闭每周五的执行计划</a></p>
		<p><a class="btn btn-blue" href="javascript:void 0;" @click="executeClose(4)">关闭每周五发送邮件的执行计划</a></p>
	</div>

</template>

<script type="text/babel">
import {executeStartSchedule, executeCloseSchedule} from '../../../api/schedule';
import actions from 'actions';
import store from 'store';
export default{
	data() {
		return {

		};
	},
	methods: {
		async executeStart(val) {
			let ret = await executeStartSchedule({ruleType: val});
			if (ret.msg) {
				actions.alert(store, {
					show: true,
					msg: '重启成功'
				});
			} else {
				actions.alert(store, {
					show: true,
					msg: '重启失败'
				});
			}
		},
		async executeClose(val) {
			let ret = await executeCloseSchedule({ruleType: val});
			if (ret.msg) {
				actions.alert(store, {
					show: true,
					msg: '关闭成功'
				});
			} else {
				actions.alert(store, {
					show: true,
					msg: '关闭失败'
				});
			}
		}
	}
};
</script>
