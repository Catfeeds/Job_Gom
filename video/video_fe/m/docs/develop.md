开发文档
==================

* 克隆项目

    `git clone ssh://git@gitlab.intra.gomeplus.com:21987/video-fe/h5.git`  

* 安装依赖

    `cd h5 && yarn install`  

    Note: 推荐使用 `yarn` 安装依赖（可以使用 `npm` 安装 `yarn`，`npm install yarn -g`）  

* 开发中

    `npm run dev`  

    在 `8080` 端口启动 `webpack-dev-server`，并实时编译静态资源和模板文件  

* 新建模块

    `npm run new`  

    输入模块名称，可按预定好的规则新建相应的 `js` `css` `ejs` 文件，相关模版可以查看 `config/bin/new.js`  

* 构建

    `npm run build`  

    为不同环境打包静态资源，可用上下按键选择不同环境进行构建  

* 编译模版

    `npm run view`  

    独立编译 `ejs` 模板的命令  

* 技术相关

    ```
    js     ->   es6
    css    ->   sass
    html   ->   ejs
    ```
