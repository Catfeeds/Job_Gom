import moment from '../util/date';

export default (Vue) => {
	Vue.filter('date', (val) => {
		return moment(val);
	});
};
