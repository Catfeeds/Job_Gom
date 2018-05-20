/*
* 数据开发平台-数据模块-数据结构
* 1. 判断表之间的关联关系需要schemald + tablename
* 2. 暂不支持子查询
* 3. 筛选条件目前只有等于
*
* 0.1 2016-8-24
* 字段的表达式，例如concat(columnA, columnB)
* group by 表达式，例如max(columnA)
* 子查询
* 添加表别名 例如tableA as users √
* 添加总结果备注 √
* 
* 0.2 2016-8-26
* sql界面添加保存按钮 √
* 改为tab切换 √
* 保存输入name、desc，数据标识验证 √
* 画布缩放 √
* table结构展示部分... √
* table函数处理、case then
* 关联类型、字段 *
* 拖拽表生成sql
*/

// 表结构信息
var contentlist = [{
	// isedit: false,
	schemaid: "gomeo2o",
	tablecomment: "账户信息",
	tablename: "act_account_info",
	// x: 111,
	// y: 102,
	columns: [{
		tableschema: "gomeo2o",
		ordinalposition: 1,
		columncomment: "主键",
		columntype: "bigint(20)",
		alias: "", // 别名，如果isreturn = false 则该值无效
		isreturn: true, // 是否返回该字段
		columnname: "id",
		tablecomment: "账户信息",
		tablename: "act_account_info",
		value: "aasadsd", // 筛选值
		where: {
			gt: '',
			lt: '',

		}
	}]
}];

// 关联关系
var relatelist = [{
	a: "gomeo2o.act_account_info",
	b: "gomeo2o.act_advance_detail"
}];

// groupby字段列表
var groupList = [{
	label: "user_id", // columnname
	tablename: "act_account_info",
	tableschema: "gomeo2o",
	value: "2" // 对应ordinalposition
}];

// orderby字段列表
var orderbyList = [{
	label: "user_id", // columnname
	tablename: "act_account_info",
	tableschema: "gomeo2o",
	value: "2" // 对应ordinalposition
}];