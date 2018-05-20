{
	id : 报表ID,
	name : 报表名称,
	layout_id : 布局id,
	layout: [
		{
			position : 位置1id
			compoment : 组件1id
			ref [
				{
					tag : 目标组件1ID
					column : 组件1id
					exp ：关联表达式1
				},
				{
					tag : 目标组件2ID
					column : 组件2id
					exp ：关联表达式2
				}
			]
		},
		{
			position : 位置2id
			compoment : 组件2id
			ref:[]
		},
		{
			position : 位置3id
			compoment : 组件3id
			ref:[]
		}
	]
}
