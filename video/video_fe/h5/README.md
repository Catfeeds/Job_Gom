# gome视频开发文档
## 一、移动端适配注意事项
1.通过window.devicePixelRatio的方法获取设备是几倍屏，设置
`<meta name="viewport" content="width=device-width,initial-scale=1.0/window.devicePixelRatio,minimum-scale=1.0/window.devicePixelRatio,maximum-scale=1.0/window.devicePixelRatio,user-scalable=no"/>` 
从而解决一像素边框显示问题。   

2.设计稿为750px的跨度，为了实现H5页面的终端适配，以100px字体为基准，屏幕宽度为7.5rem以这个比例为基准，即：（设计稿的宽高/100）rem。


### [开发文档](./docs/develop.md)