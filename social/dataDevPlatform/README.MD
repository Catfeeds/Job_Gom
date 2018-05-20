美信数据开发平台
=====================

### AMP 项目地址

[美信数据开发平台AMP](http://10.69.205.26:9090/#!/main/project/detail/5791c11bfeb79ca5509a99d4)

### 开发流程

`npm run localdev` 本地开发，连接AMP Mock Server

### 部署流程

`git clone http://gitlab.intra.gomeplus.com/gomeplusFED/dataDevPlatform.git` 将项目克隆到本地

`git checkout release` 切换到release分支

`git pull origin release` 拉去远程release分支内容

该项目下的dist目录下及为打包后的所有静态资源

### 目录结构

```
.
├── build 		打包后的静态文件（html,js,css,font,image）
├── config 		1.路径配置 2.环境变量提取 3.webpack基本配置 4.webpack.server配置 5.webpack.build配置
├── docs        1.数据部分数据结构 2.报表布局数据结构 3.报表总体数据结构 4.表相关数据结构
├── src 		(项目整体)
│   ├── api 	1.获取数据库，schemas，表，字段
│   ├── assets 		(静态资源)
│   │   ├── font 	字体
│   │   ├── img 	图片
│   │   └── less 	样式（less）
│   ├── components 	（vue组件部分）
│   │   ├── base 		1.提示框 2.确认框 3.分隔线 4.loading 5.确认模板（可插入组件）6.输入框 7.tab键 8.transition 9.图片上传
│   │   ├── common 		（共用部分 1.收发事件 2.列表头 3.logo 4.header又导航栏 5.左侧导航栏 6.列表头选项）
│   │   ├── component 	（组件部分）
│   │   │   ├── common 				1.时间控件 2.分页组件
│   │   │   └── private-current 	（组件部分私有）
│   │   │       ├── chips 			1.图表组件 2.多选组件 3.单项时间组件 4.范围时间组件 5.下拉单选组件 6.表格组件 7.index 8.新表格组件 9.新表格组件内容 10.单选组件
│   │   │       └── resData
│   │   ├── data 		（数据部分）
│   │   │   └── edit 	（数据编辑部分）
│   │   ├── demo
│   │   ├── login 		（登录部分）
│   │   ├── project 	（项目部分）
│   │   ├── report 		（报表部分）
│   │   │   └── edit 	（报表编辑部分）
│   │   └── tool 		（数据部分工具）
│   │       └── edit 	（数据编辑部分工具）
│   ├── config 			1.http请求地址配置 2.vue-router配置
│   ├── filter 			1.时间格式化过滤器
│   ├── util 			1.selecter 2.http响应状态处理 3.权限查询、上传图片处理
│   └── vuex
│       ├── actions 	vuex的动作
│       ├── mutations 	vuex的转化
│       ├── plugins 	browser logger of vuex
│       └── state 		vuex常量
├── static
│   └── login
│       ├── css
│       └── images
├── support 			1.html格式化中间件 2.webpack热刷新 3.webpack vue部分处理
└── views 				（原模板）
    ├── component
    ├── css
    ├── dist
    ├── src
    └── temp
```

