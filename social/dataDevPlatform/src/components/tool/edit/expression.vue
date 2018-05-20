<template>
<modal :show.sync="show" ok-text="" cancel-text="" effect="zoom" title="变量列表（当前版本只在调度中被替换）" :backdrop="true">
	<div slot="modal-body" class="modal-body expression">
		<div align="center">示例：select * from dual where dt='<span style="color:red">${today}</span>'</div>
		<table class="table table-hover">
			<tr>
				<th>表达式</th>
				<th>说明</th>
			</tr>
			<tr v-for="item in list">
				<td>{{item.express}}</td>
				<td>{{item.explain}}</td>
			</tr>
		</table>
	</div>
</modal>
</template>
<script>
import {modal} from 'vue-strap';
export default {
	components: {modal},
	props: ['show'],
	data() {
		return {
			list: [{
				express: '${today}',
				explain: '表示当前的日期'
			},
			{
				express: '${yesterday}',
				explain: '表示昨天的日期'
			},
			{
				express: '${two_day_ago}',
				explain: '表示两天前的日期'
			},
			{
				express: '${three_day_ago}',
				explain: '表示三天前的日期'
			},
			{
				express: '${four_day_ago}',
				explain: '表示四天前的日期'
			},
			{
				express: '${five_day_ago}',
				explain: '表示五天前的日期'
			},
			{
				express: '${six_day_ago}',
				explain: '表示六天前的日期'
			},
			{
				express: '${six_day_ago}',
				explain: '表示六天前的日期'
			},
			{
				express: '${one_week_ago}',
				explain: '表示一周前的日期'
			},
			{
				express: '${two_week_ago}',
				explain: '表示两周前的日期'
			},
			{
				express: '${three_week_ago}',
				explain: '表示三周前的日期'
			},
			{
				express: '${one_month_ago}',
				explain: '表示一个月前的日期'
			},
			{
				express: '${two_month_ago}',
				explain: '表示两个月前的日期'
			},
			{
				express: '${three_month_ago}',
				explain: '表示三个月前的日期'
			},
			{
				express: '${half_year_ago}',
				explain: '表示半年前的日期'
			},
			{
				express: '${one_year_ago}',
				explain: '表示一年前的日期'
			}]
		};
	}
};
</script>
<style>
table {
	max-height: 500px;
}
.expression+.modal-footer {
	display: none;
}
</style>