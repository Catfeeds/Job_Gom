# amp

> AMP-广告投放系统


抽屉部分实现逻辑

新建修改在同一种组件中完成 | 抽屉类型包括：plan/unit/idea

1 修改 state 中的值，新建的时候是默认值，修改的时候请求接口返回值
2 显示对应的抽屉类型，并传入操作类型和相关的数据（state/config）
3 拷贝 state，双向绑定操作表单
4 点击保存按钮，向下传递事件，获取当前操作抽屉中的值（如果表单检验不合格就返回 error）
5 根据操作类型，请求相关接口
6 接口调用完成后，下一步或者


### 部署流程

* 执行 `npm run build`

* 不选择发布新版本直接打包在 dist 目录，上测试服务器拉代码即可

* 选择发布新版本需要输入新的版本号，请遵循语义化版本规则

* 发布新版本会修改 `package.json` 的版本号，并新建一个 `tag`，并在完成打包后推送到 `relase` 分支，线上发布时拉取 `relase` 分支代码即可