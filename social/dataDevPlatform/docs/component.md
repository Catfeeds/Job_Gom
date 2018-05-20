组件部分开发文档
=====================
### 目录结构

```
.
├── common
│   ├── datepicker.vue   时间控件单选（旧版本引入）
│   └── pagination.vue   分页组件
├── detail.vue           组件详情
├── edit.vue             组件编辑
├── index.vue            index
├── list.vue             组件列表
├── new.vue              新建组件
└── private-current              组件部分的私有组件
    ├── chip-content.vue         组件选择与配置组件
    ├── chip
    │   ├── chart.vue                图表类组件 info.chartconfig
    │   ├── checkbox.vue             多选组件  info.config
    │   ├── datepicker-range.vue     时间范围组件  info.config
    │   ├── datepicker-single.vue    时间单选组件  info.config
    │   ├── datepicker.vue           时间范围组件（旧版本） info.config
    │   ├── dropdown.vue             下拉组件     info.config
    │   ├── from.vue                 表格组件     info.formconfig
    │   ├── index.vue                index
    │   ├── newForm.vue              内容表格组件(包含分页组件，内容组件)  info.formcontent
    │   ├── newFormContent.vue       内容表格内容组件(子表格组件，子表格分页组件)
    │   ├── radio.vue                单选组件     info.config
    │   └── search.vue               搜索组件
    ├── edit.vue                     编辑（由于项目开始考虑到报表也能编辑组件，所以提取出来）
    ├── new.vue                      新建（由于项目开始考虑到报表也能编辑组件，所以提取出来）
    └── resData
        ├── bars.js                  柱状图配置文件
        ├── china.js                 中国地图组件需要引入
        ├── componentFilters.js      处理配置文件的公共方法
        ├── line.js                  折线图配置文件
        ├── map.js                   地图配置文件
        ├── pie.js                   饼图配置文件
        ├── radar.js                 雷达图配置文件
        ├── sankey.js                桑基图配置文件
        └── scatter.js               散点图配置文件

```
### 注意事项

1. 配置信息尽量通用格式，新增类型配置需要默认初始值，否则切换会有展示问题。
#### config格式
```
info.config = [{
					val: '初始数据',
					name: '初始数据'
				}];
```
#### chartconfig格式
```
info.chartconfig = {
						xAxle: 'x轴单位',
						yAxle: 'y轴单位',
						zAxle: '数据条件',
						dataname: '选择数据源',
						dataid: 3344,
						legend: {
							name: '影响值',
							value: []
						}
					};
```
#### formconfig格式
```
info.formconfig = {
						dataname: '选择数据源',
						dataid: 3344,
						legend: {
							name: 'form',
							value: []
						}
					};
```
#### formcontent格式
```
info.formcontent = {
							dataname: '选择数据源',
							datanamec: '选择数据源',
							dataid: 3344,
							dataidc: 3344,
							id: parseInt(this.$route.params.id),
							legend: {
								name: 'formContent',
								value: [],
								valuec: [],
								relation: []
							}
						};
```

2. 如遇新图表类型组件可以通过修改componentFilters.js公共方法来对`private-current/resData`下的配置文件进行处理，返回处理后的配置文件，用此文件通过createItem方法对图标组件进行设置
3. 不同类型组件，所需条件不同，按需添加。
