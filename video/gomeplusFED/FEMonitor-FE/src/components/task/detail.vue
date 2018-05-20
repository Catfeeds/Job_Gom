<template>
	<record-detail :fetch="fetch" :id="id"></record-detail>
</template>

<script type="text/babel">
import recordDetail from '../common/record-detail.vue';
import {getTaskInfo, getRecordInfo, deleteTasks} from '../../api/task';
export default {
	data() {
		let id = this.$route.params.id;
		return {
			id,
			fetch: {
				taskInfo: getTaskInfo(id),
				recordInfo: getRecordInfo(id, ['coach.pageSummary', 'browsertime.har', 'browsertime.screenshot']),
				deleteTasks
			}
		};
	},
	components: {
		recordDetail
	}
};
</script>
