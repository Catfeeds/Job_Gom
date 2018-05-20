webpack 简易构建项目（支持scss pug jsx）


-------------------功能&&目标-----------------------


	功能：
	    使用devserver编译，加快编译速度
		使用代理proxy对应不同开发环境，将js，css，images代理到本地
   目标：
       【文件夹】/index.js 转换为 【文件夹】.js
        scss文件 转换为css
        src/images 图片  复制到 dist/images
        pug文件  转换为html

		
---------------------------------------------


安装依赖
   cnpm install 
   
   
调试，开启devServer服务：

  开发环境
   npm run dev
  仿真环境
   npm run prd

   
发布：

   发布到开发环境，编译到dist
   npm run dist

   发布到生产环境（未添加压缩、代码优化等功能）
   npm run build