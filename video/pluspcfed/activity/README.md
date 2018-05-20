## 说明

### 项目说明
本项目是PC站活动项目，每个活动在此项目下单独建立一个子项目

### 目录说明
1. build: 构建工具目录
2. debug: 构建后生成的调试目录
3. dist：构建后生成的部署目录
4. src: 开发目录
    - src/application: 应用目录，放置活动子项目
    - src/public: 公用目录，有公用的模块可以放到此目录，如：登录，分享等
    - src/utils：工具类目录，如时间，字符串等方法处理等工具函数

### 开发说明
1. sass说明 
    - sass入口文件必须放置到项目目录下的page目录下，如：xxx/sass/page/
    - module目录放置被引用的模块文件
    - 如果需要其它目录自行增加
2. js说明
    - js入口文件必须放置到项目目录下的page目录下，如：xxx/js/page/
    - module目录放置被引用的模块文件
    - 如果需要其它目录自行增加
    - 因项目是活动项目未做vue、react、angular等支持，如果需要请自行外引

### 使用说明
* npm run dev: 调试开发、测试环境，绑host：127.0.0.1 js.dev.meixincdn.com
* npm run pre: 调试仿真环境，绑host：127.0.0.1 js-pre.meixincdn.com
* npm run prd: 调试生产环境，绑host：127.0.0.1 js.meixincdn.com css.meixincdn.com
* npm run dist: 构建部署测试、仿真环境的代码
* npm run build: 构建上线代码
