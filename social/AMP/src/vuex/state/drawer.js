/*
 * 抽屉相关的属性
 */
import CONST from '../../help/CONST.js';
export default {
	drawerCtrl: { // 控制抽屉的显示与否
		show: false,
		type: 'plan',
		action: 'new', // new/copy/modify
		config: {}, // 配置信息 默认数据，修改或者拷贝时请求具体数据塞入，否则用 CONST.js 内相应字段
		isRebate: 0 // 是否返利，从上一级传递下去 单元和创意的时候需要
	},
	drawerPlanState: CONST.DRAWERPLAN,
	drawerUnitState: CONST.DRAWERUNIT,
	drawerIdeaState: CONST.DRAWERIDEA
};
