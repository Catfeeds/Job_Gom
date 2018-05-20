<template>
<div class="panel panel-default">
		<div class="panel-heading">修改基本详情</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">调度时间:</label>
						<div class="col-sm-10">
							<input type="text" v-model="info.SC.scheduledate" class="form-control" id="datetimepicker2" />
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">周期:</label>
						<div class="col-sm-10"> 
							<div class="col-sm-3">
								<div class="checkbox">
									<label>
										<input v-model="info.SC.isrecurring" type="checkbox"> 是否循环
									</label>
								</div>
							</div>
							<div class="col-sm-3">
								<input type="text" v-model="info.SC.period" class="form-control" placeholder="1">
							</div>
							<div class="col-sm-4">
								<v-select :value.sync="type_value" :options="type_opt" placeholder="关联类型" close-on-select>
								</v-select>
							</div>
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">状态:</label>
						<div class="col-sm-10"> 
							<div class="checkbox">
								<label>
									<input v-model="info.SC.isactivity" type="checkbox"> 是否激活
								</label>
							</div>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</template>
<script>
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'eonasdan-bootstrap-datetimepicker';
import {select as vSelect, option as vOption} from 'vue-strap';
import eventBus from '../../common/event-bus';

export default {
	components: {
		vSelect, vOption
	},
	props: ['info'],
	data() {
		return {
			type_value: [],
			type_opt: [
				{
					label: '月',
					value: 'M'
				},
				{
					label: '周',
					value: 'w'
				},
				{
					label: '天',
					value: 'd'
				},
				{
					label: '时',
					value: 'h'
				},
				{
					label: '分',
					value: 'm'
				},
				{
					label: '秒',
					value: 's'
				}
			]
		};
	},
	ready() {
		$('#datetimepicker2').datetimepicker({
			locale: 'zh-cn',
			format: 'YYYY-MM-DD HH:mm',
			sideBySide: true,
			showClear: true
		});
		eventBus.$off('clearDispatch');
		eventBus.$on('clearDispatch', () => {
			this.info.SC.scheduledate = '';
			this.info.SC.isrecurring = false;
			this.info.SC.period = 0;
			this.info.SC.isactivity = false;
			this.type_value = [];
		});
		if (this.info.SC.periodtype) {
			this.type_value = [this.info.SC.periodtype];
		}
	},
	watch: {
		type_value(val) {
			if (val.length) {
				this.info.SC.periodtype = val[0];
			} else {
				this.info.SC.periodtype = '';
			}
		}
	}
};
</script>
<style>
.checkbox {
	margin-top: 0;
}
</style>