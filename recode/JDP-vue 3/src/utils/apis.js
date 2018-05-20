/*
@des:调用方法：
		import getApi from '@/utils/apis.js'
		getApi('typetab')
*/

var apiObj = {
	//总览
	total: '/total/pandectTab',//总览表图接口
	//项目类型分析
	typetab:'/Analysis/typetab',//表格
	typeMonth:'/Analysis/typeMonth',//月图
	typeWeek:'/Analysis/typeWeek',//周图
	typeDay:'/Analysis/typeDay',//日图

	//项目类型分析  风险类型
	risktab:'/Analysis/risktab',//表格
	riskMonth:'/Analysis/riskMonth',//月图
	riskWeek:'/Analysis/riskWeek',//周图
	riskDay:'/Analysis/riskDay',//日图

	//项目阶段分析
	phaseTab:'/total/phaseTab',//表格
	phaseMonth:'/total/phaseMonth',//月图
	phaseWeek:'/total/phaseWeek',//周图
	phaseDay:'/total/phaseDay',//日图

	//项目状态分析
	statusTab:'/total/statusTab',
	statusMonth:'/total/statusMonth',
	statusWeek:'/total/statusWeek',
	statusDay:'/total/statusDay',

	//工作量分析
	workDayTab:'/Analysis/workDayTab',//人天-表格
	workDayImgMonth:'/Analysis/workDayImgMonth',//人天-月图
	workDayImgWeek:'/Analysis/workDayImgWeek',//人天-周图
	workDayImgDay:'/Analysis/workDayImgDay',//人天-日图

	processTab:'/api/processTab',//任务数-表格
	processDay:'/api/processDay',//任务数-日图
	processWeek:'/api/processWeek',//任务数-周图
	processMonth:'/api/processMonth',//任务数-月图

	workManCntTab:'/Analysis/workManCntTab',//人数-表格
	workManCntImgMonth:'/Analysis/workManCntImgMonth',//人数-月图
	workManCntImgWeek:'/Analysis/workManCntImgWeek',//人数-周图
	workManCntImgDay:'/Analysis/workManCntImgDay',//人数-日图

	// 筛选条件
	filterType: '/api/filterType', // 筛选条件
	searchResult: '/api/projectList', // 搜索条件
	filterResult: '/api/filterResult', // 筛选结果
	members: '/api/projectMember', // 获取项目成员列表
	filterByTable: '/api/numDetail', // 数据详情接口

	//项目详情
	projectDetail: '/api/projectDetail'//包括燃尽图传递项目名称
};


function get(name){
	var api = ''
	for(var k in apiObj){
		if(name == k){
			api = apiObj[k];
			break;
		}
	}
	return api;
}

export default get;
