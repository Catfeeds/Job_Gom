开发部署流程
==================

* 正常开发在 `dev` 分支下  

* 某个功能完成后准备提测，检出一个新的待测代码分支，如 ` git checkout -b pre-release`  

* 切换到 `release` 分支，`git checkout release`  

* 合并 `pre-release` 分支下的部分代码，`git checkout pre-release ./src package.json gulpfile.js index.html`  

* 执行打包命令，四个不同环境对应构建命令为：  

    * `npm run development`
    * `npm run test`
    * `npm run pre-production`
    * `npm run production`

    四个环境同时构建的命令为：`npm run buildall`  

* 提交代码，`git commit -am '...'` `git push origin release`  

* 进 `Jenkins` 部署不同环境的代码  

* 测试发现bug，在 `pre-release` 下修改完成，重新进行打包部署  

* 测试通过后合并代码到 `master` 分支，完成发版，删除 `pre-release` 分支，`git branch -D pre-release`  

* 合并 `master` 分支下的代码到 `dev` 下，继续开发新功能  
