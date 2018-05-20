部署上线流程
==================

## 环境要求
* node@4.2.4
* npm@latest
* git@latest

## 首次部署
* `npm install gulp webpack -g`
* `git clone http://gitlab.intra.gomeplus.com/gomeplusFED/CSP.git ./CSP`
* `cd CSP`
* `npm install`
* `npm run build`
* `git add .`
* `git commit -m 'build rev control'`

## 版本更新
* `git pull origin master`
* `npm install`
* `npm run build`
* `git add .`
* `git commit -m 'build rev control'`

## 备注
* `npm` 安装时使用的是国外源，安装较慢，使用 `npm config set registry https://registry.npm.taobao.org` 设置为国内源
