import React, {Component} from 'react';
import Loadable from 'react-loadable';
import VideoManage from 'reduxs/container/VideoManage';
import VideoUploader from 'reduxs/container/VideoUploader';
import Subscribe from 'page/subscribe/index';
import SubscribeManage from 'page/subscribe_manage/index';

import Apply from 'page/apply/index';
import Instructions from 'page/instructions/index';
import UserInfo from 'page/apply/UserInfo';
import Icon from 'page/icon/index';
import Login from 'page/login/index';
import ResetPass from 'page/reset/index';
import Register from 'page/register/index';
import Welcome from 'page/welcome/index';
import PublishArticle from 'page/publishArticle/index';
import ArticleManage from 'page/articleManage/index';
// import ConcatUs from 'page/gomeIntr/concatUs';

let loginRoutes = [/*{
    path: '/portal/login',
    component: Login,
    exact: true,
    strict: true
}, {
    path: '/portal/main',
    component: Index,
    exact: true,
    strict: true
},*/ {
    path: '/portal/reset',
    component: ResetPass,
    exact: true,
    strict: true
}/*, {
    path: '/portal/register',
    component: Register,
    exact: true,
    strict: true

},{
    path: '/gomeIntr',
    component: GomeIntr,
    exact: true,
    strict: true
},{
    path: '/aboutUs',
    component: AboutUs,
    exact: true,
    strict: true
},{
    path: '/concatUs',
    component: ConcatUs,
    exact: true,
    strict: true
 }*/];

let indexRoutes = [{
    path: '/portal',
    component: Welcome,
    navName: '首页',
    icon: 'icon-1',
    exact: true,
    show: false
}, {
    path: '/portal/videoUploader',
    component: VideoUploader,
    navName: '上传视频',
    icon: 'icon-25',
    show: true
}, {
    path: '/portal/videoManage',
    component: VideoManage,
    navName: '视频管理',
    icon: 'icon-15',
    show: true
}, {
    path: '/portal/publishArticle',
    component: PublishArticle,
    navName: '发布图文',
    icon: 'icon-24',
    show: true
}, {
    path: '/portal/articleManage',
    component: ArticleManage,
    navName: '图文管理',
    icon: 'icon-26',
    show: true
}, {
    path: '/portal/subscriber',
    component: Subscribe,
    navName: '我的美号',
    icon: 'icon-16',
    show: true
}, {
    path: '/portal/auth',
    component: Apply,
    navName: '权限申请',
    icon: 'icon-13',
    show: true
}, {
    path: '/portal/userinfo',
    component: UserInfo,
    navName: '基本资料',
    icon: 'icon-13',
    show: true
}, {
    path: '/portal/instructions',
    component: Instructions,
    navName: '操作指南',
    icon: 'icon-23',
    show: true
}/*, {
    path: '/icon',
    component: Icon,
    navName: '字体图标展示',
    visible: false
}*/];

export  {
    loginRoutes, indexRoutes
}
