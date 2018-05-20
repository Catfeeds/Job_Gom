参考文档：
https://webpack.js.org/guides/caching/
https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95

#changelog

##开发环境
nodejs v8.0.0
npm 5.3.0

webpack 3.5.5

##2017-08-25
使用webpack时，不要使用hash作为文件名，所有输出资源的hash值都一样
用chunkhash来命名，这样，每个模块的名字都依赖当前模块的hash值；

```
在开发时，filename 可以不用 chunkhash, 这样会增加编译时长
development: [name].js
production:  [name].[chunkhash].js
```

##2017-08-23
初始化package.json
增加webpack
