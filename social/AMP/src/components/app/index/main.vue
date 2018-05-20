<template>
	<div class="amp-content">
		<div class="amp-index">
			<m-dashboard></m-dashboard>
			<m-chart></m-chart>
		</div>
	</div>
</template>
<script>
import Dashboard from './dashboard.vue';
import Chart from './IChart.vue';
export default {
	name: 'app-main',
	components: {
		'm-dashboard': Dashboard,
		'm-chart': Chart
	}
};
</script>
