<template>
	<div class="">
		<div class="cover-block" style="text-align: center; padding:50px;">
			<div class="">
				<h3>Coach</h3>
			</div>
			<div class="proj-desc">
				<p>配置</p>
			</div>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">详情</div>
		<div class="panel-body">
			<form>

				<fieldset>
					<legend>可用性：</legend>
					<div class="circle-chart" v-echarts="ChartOption.accessibility"></div>
				</fieldset>
				<fieldset>
					<legend>性能：</legend>
					<div class="circle-chart" v-echarts="ChartOption.performance"></div>
				</fieldset>
				<fieldset>
					<legend>最佳实践：</legend>
					<div class="circle-chart" v-echarts="ChartOption.bestpractice"></div>
				</fieldset>

				<div class="form-actions">
					<button type="button" class="btn btn-sm btn-success" v-link="{name: 'editProject', params: {id: $route.params.id}}">编辑项目</button>
					<button type="button" class="btn btn-sm btn-danger" @click="deleteProject">删除项目</button>
				</div>

			</form>
		</div>
	</div>

</template>

<style>
	fieldset {
		padding-bottom:30px;
	}

	label {
		padding-top:5px;
		padding-bottom:20px;
		font-weight: normal;
	}

	legend {
		color:#5c5c5c;
	}
	.hiddenForm {
		display: inline;
		border: 0px;
		padding: 0px;
	}
	.table td{
		text-align:center;
	}
	.circle-chart{
		width: 100%;
		height: 500px;
		float: left;
		margin-top: 35px; 
	}

	legend {
		padding-bottom:8px;
	}

	.proj-dtail {
		padding-top:10px;
		float:left;
	}
	.proj-icon {
		align:center;
	}

	.align-rt {
		text-align: right;

	}

	.del-pad {
		margin-left:-15px;
	}
	.pad-rt {
		padding-right:20px;
	}

	.form-actions {
		margin:-15px;
		padding:16px;
		background-color:#f5f5f5;
	}

</style>

<script type="text/babel">
	import { $ } from 'utils/dom.js';
	import {circleOption} from 'utils/echart.js';
	import pleaseWaitMe from 'utils/pleaseWaitMe.js';
	import actions from 'actions';
	import store from 'store';
	import {getConfsDetail} from '../../api/component';
	import _ from 'lodash';

	export default {
		name: 'task-detail',
		data() {
			return {
				taskinfo: {
					connectivity: 0
				},
				siteinfo: {
					domDepth: {},
					head: {
						jsasync: [],
						jssync: [],
						css: []
					}
				},
				plugArray: null,
				formInfo: [],
				userInfo: [],
				ChartOption: {
					accessibility: {},
					performance: {},
					bestpractice: {}
				},
				accessibility: {},
				performance: {},
				bestpractice: {},
				paginationConfigMembers: {
					currentPage: 1,
					itemsPerPage: 15,
					pagesLength: 3,
					totalItems: 0,
					onChange() {}
				},
				paginationConfig: {
					currentPage: 1,
					itemsPerPage: 15,
					pagesLength: 3,
					totalItems: 0,
					onChange() {}
				}
			};
		},
		components: {

		},
		ready() {
			const that = this;
			let id = this.$route.params.id;

			(async () => {
				pleaseWaitMe.wait();
				let result = await getConfsDetail(id);
				let setChart = (name) => {
					let tmp = _.cloneDeep(circleOption);
					let tmparray = result.filter(x => x.tags.includes(name));

					tmparray.forEach((x) => {
						let title = x.title;
						tmp.legend.data.push(title);
						tmp.series[0].data.push({
							value: x.weight,
							name: title
						});
						that.ChartOption[name] = tmp;
					});
				};
				setChart('accessibility');
				setChart('performance');
				setChart('bestpractice');
				pleaseWaitMe.finish();
			})();
		},
		methods: {
		}
	};
</script>
