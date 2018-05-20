import React, {Component} from 'react';
import Loadable from 'react-loadable';

import ResetPass from 'page/reset/index';
import Welcome from 'page/welcome/index';
import PublishContent from 'page/publishContent/index';
import ContentManage from 'page/contentManage/index';
import ApplicationChannel from 'page/applicationChannel/index';
import Userinfo from 'page/userinfo/index';
import Instructions from 'page/instructions/index';
import Icon from 'page/icon/index';

let loginRoutes = [{
    path: '/portal/reset',
    component: ResetPass,
    exact: true,
    strict: true
}];

let indexRoutes = [{
    path: '/portal',
    component: Welcome,
    navName: '首页',
    icon: 'icon-1',
    exact: true,
    show: false
}, {
    path: '/portal/publishContent',
    component: PublishContent,
    navName: '发布内容',
    icon: 'icon-25',
    show: true
}, {
    path: '/portal/contentManage',
    component: ContentManage,
    navName: '内容管理',
    icon: 'icon-15',
    show: true
}, {
    path: '/portal/channel',
    component: ApplicationChannel,
    navName: '申请渠道',
    icon: 'icon-24',
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
}, {
    path: '/icon',
    component: Icon,
    navName: '字体图标展示',
    show: false
}];

export  {
    loginRoutes, indexRoutes
}
