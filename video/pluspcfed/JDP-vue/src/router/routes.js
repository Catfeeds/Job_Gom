import index from '@/components/app/index'
//普通项目
import main from '@/components/app/general/main'
import zl from '@/components/app/general/zl'
import xmjd from '@/components/app/general/xmjd'
import xmzt from '@/components/app/general/xmzt'
import xmlx from '@/components/app/general/xmlx'
import lxxq from '@/components/app/general/lxxq'
import gzl from '@/components/app/general/gzl'
import gzlxq from '@/components/app/general/gzlxq'
import xmsx from '@/components/app/general/xmsx'
import lxxx from '@/components/app/general/lxxx'
import bmsx from '@/components/app/general/bmsx'
import sxjg from '@/components/app/general/sxjg'
import ssjg from '@/components/app/general/ssjg'
import xmxq from '@/components/app/general/xmxq'
import xmcy from '@/components/app/general/xmcy'
import mid from '@/components/app/general/mid'
//专项
import zx from '@/components/app/special/zx'
import zxlb from '@/components/app/special/zxlb'
import zxxq from '@/components/app/special/zxxq'
import zxs from '@/components/app/special/zxs'
import wcqk from '@/components/app/special/wcqk'
import hfzt from '@/components/app/special/hfzt'
import yfzx from '@/components/app/special/yfzx'
import fj from '@/components/app/special/fj'

import store from '../vuex'
//普通项目路由
const generalRoutes =  [
  {
    path: '/api/projectCnt',
    name: 'index',
    component: index,
    meta:{
      title:'首页'
    },
    beforeEnter:function(to,from,next){
      let Url = '';
      if(from.name == 'sxjg'){
        store.dispatch('setInputType', 'search');
      }
      store.commit('setSearchText', '');
      store.commit('setIsShowText', true);
      store.commit('setIsZxReferer', false);
      switch(window.location.host){
        case 'jira-pluspc.gome.com.cn':
          Url = 'https://bigdataapp.gomeplus.com/';
          break;
        case 'jira-pluspc.atguat.com.cn':
          Url = 'http://splunkapp.atguat.com.cn/';
          break;
      }
      store.dispatch('setMainReffer', Url);
      next();
    }
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    meta:{
      title:'项目'
    }
  },
  {
    path: '/zl',
    name: 'zl',
    component: zl,
    meta:{
      title:'项目概览'
    }
  },
  {
    path: '/xmjd',
    name: 'xmjd',
    component: xmjd,
    meta:{
      title:'项目阶段分析'
    }
  },
  {
    path: '/xmzt',
    name: 'xmzt',
    component: xmzt,
    meta:{
      title:'项目状态分析'
    }
  },
  {
    path: '/xmlx',
    name: 'xmlx',
    component: xmlx,
    meta:{
      title:'项目类型'
    }
  },
  {
    path: '/xmlx/detail/:id',
    name: 'lxxq',
    component: lxxq,
    meta:{
      title:'项目类型分析' //根据id重新定义title
    },
    beforeEnter:function(to,from,next){
      if(to.params.id == 'xmfxlx'){
        to.meta.title = '项目风险类型分析'
      }else{
        to.meta.title = '项目类型分析'
      }
      next();
    }
  },
  {
    path: '/gzl',
    name: 'gzl',
    component: gzl,
    meta:{
      title:'工作量类型'
    }
  },
  {
    path: '/gzl/detail/:id',
    name: 'gzlxq',
    component: gzlxq,
    meta:{
      title:''  //根据id重新定义title
      
    },
    beforeEnter:function(to,from,next){
      if(to.params.id == 1){
        to.meta.title = '项目阶段人天分析'
      }else if(to.params.id == 2){
        to.meta.title = '项目阶段人数分析'
      }else{
        to.meta.title = '项目阶段任务数分析'
      }
      next();
    }
  },
  {
    path: '/xmsx',
    name: 'xmsx',
    component: xmsx,
    meta:{
      title:'筛选'
    },
    beforeEnter:function(to,from,next){
      store.dispatch('initDepartState');
      next();
    }
  },
  {
    path: '/xmsx/option/:id',
    name: 'lxxx',
    component: lxxx,
    meta:{
      title:''
    },
    beforeEnter:function(to,from,next){
      if(to.params.id == 1){
        to.meta.title = '选择中心'
      }else if(to.params.id == 2){
        to.meta.title = '选择类型'
      }else if(to.params.id == 3){
        to.meta.title = '选择阶段'
      }else if(to.params.id == 4){
        to.meta.title = '选择风险类型'
      }else{
        to.meta.title = '选择状态类型'
      }
      next();
    }
  },
  {
    path: '/xmsx/option/:id/:cid',
    name: 'bmsx',
    component: bmsx,
    meta:{
      title:'选择部门'
    }
  },
  {
    path: '/xmsx/sxjg',
    name: 'sxjg',
    component: sxjg,
    meta:{
      title:'筛选结果'
    },
    beforeEnter:function(to,from,next){
      store.dispatch('setInputType', 'header');
      store.dispatch('isSearchShow', 0);
      /*if(from.name =='xmsx'){
        store.dispatch('isSearchShow', 0);
      }else{
        store.dispatch('isSearchShow', 1);
      }*/
      switch(from.name){
        case 'index':
        case 'main':
        case 'zx':
          store.commit('setIsZxReferer', true);
          break;
        case 'xmsx':
        case 'zl':
        case 'xmjd':
        case 'xmzt':
        case 'lxxq':
        case 'gzlxq':
          store.commit('setIsZxReferer', false);
          store.commit('setInputShow', 0);
      }
      switch(store.state.curProject.reffer){
        case 'table':
          to.meta.title = store.state.filterByTable.tableText + '(' + store.state.filterByTable.tableMonth + ')';
        break;
        case 'search':
          to.meta.title = '搜索结果';
        break;
        default:
          to.meta.title = '筛选结果';
      }
      if(from.name == 'xmxq'){
        store.dispatch('isReset');
        store.dispatch('initProjectState');
      }else{
         localStorage.setItem('scrolltop2', 0);
      }
      next();
    }
  },
  {
    path: '/xmsx/ssjg',
    name: 'ssjg',
    component: ssjg,
    meta:{
      title:'搜索结果'
    }
  },
  {
    path: '/xmsx/xmxq',
    name: 'xmxq',
    component: xmxq,
    meta:{
      title:'项目详情页'
    }
  },
  {
    path: '/xmsx/xmxq/xmcy/:id',
    name: 'xmcy',
    component: xmcy,
    meta:{
      title:''
    },
    beforeEnter:function(to,from,next){
      if(to.params.id == 1){
        to.meta.title = '项目成员';
        store.dispatch('setMembersType', 'ptxm');
      }else if(to.params.id == 2){
        to.meta.title = '全部负责人';
        store.dispatch('setMembersType', 'zx');
      }
      next();
    }
  },
  {
    path: '/mid',
    name: 'mid',
    component: mid,
    meta:{
      title:'mid'
    }
  }
]
//专项路由
const specialRoutes = [
  {
    path: '/zx',//专项任务
    name: 'zx',
    component: zx,
    meta:{
      title:'专项任务'
    }
  },
  {
    path: '/yfzx',//专项任务
    name: 'yfzx',
    component: yfzx,
    meta:{
      title:'月份专项'
    },
    beforeEnter:function(to,from,next){
      store.dispatch('getYfData',to.query.date)
      to.meta.title = to.query.date+'月专项任务';
      next();
    }
  },
  {
    path: '/zxlb/:id',//专项列表（专项任务列表、个人、坐标）
    name: 'zxlb',
    component: zxlb,
    meta:{
      title:'专项任务列表'//（专项任务列表、个人、坐标）
    },
    beforeEnter:function(to,from,next){
      store.dispatch('initZxState');
      var query = to.query;
      switch(to.params.id){
        case 1://点击专项总数
          store.commit('setIsTabShow', true);
          to.meta.title = '专项任务列表';
        break;
        case 2://点击top5
          store.commit('setIsTabShow', true);
          to.meta.title = to.query.nameChn;
        break;
        case 3://点击表格坐标
          store.commit('setIsTabShow', true);
          to.meta.title = to.query.nameCHN+to.query.titleCHN
        break;
        case 4://点击月份专项列表
          store.commit('setIsTabShow', false);
          to.meta.title = to.query.month+"月"+to.query.nameChn;
        break;
        case 5://点击月份专项总数
          store.commit('setIsTabShow', false);
          to.meta.title = to.query.month+"月"
        break;
      }
      if(from.name != 'zxxq'){
        store.dispatch('setMember',query);
      }
      next();
    }
  },
  {
    path: '/zxxq',//专项详情
    name: 'zxxq',
    component: zxxq,
    meta:{
      title:'专项任务详情页'
    }
  },
  {
    path: '/zxs',//专项数
    name: 'zxs',
    component: zxs,
    meta:{
      title:'专项任务数'
    },
    beforeEnter:function(to,from,next){
      if(from.name == 'zx'){
        store.dispatch('changeDate',0)
      }
      next();
    }
  },
  {
    path: '/wcqk',//完成情况
    name: 'wcqk',
    component: wcqk,
    meta:{
      title:'完成情况'
    },
    beforeEnter:function(to,from,next){
      if(from.name == 'zx'){
        store.dispatch('changeDate',0)
      }
      next();
    }
  },
  {
    path: '/hfzt',//回复状态
    name: 'hfzt',
    component: hfzt,
    meta:{
      title:'回复状态'
    },
    beforeEnter:function(to,from,next){
      if(from.name == 'zx'){
        store.dispatch('changeDate',0)
      }
      next();
    }
  },
  {
    path: '/zx/fj',//附件
    name: 'fj',
    component: fj,
    meta:{
      title:'附件'
    },
    beforeEnter(to,from,next){
      to.meta.title = store.state.zxxqModule.attach[store.state.zxxqModule.fjIndex].file_name;
      next();
    }
  }
]

const routes = generalRoutes.concat(specialRoutes);

export default routes
