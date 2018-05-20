import main from '@/components/app/main'
import zl from '@/components/app/zl'
import xmjd from '@/components/app/xmjd'
import xmzt from '@/components/app/xmzt'
import xmlx from '@/components/app/xmlx'
import lxxq from '@/components/app/lxxq'
import xmfxlx from '@/components/app/xmfxlx'
import gzl from '@/components/app/gzl'
import gzlxq from '@/components/app/gzlxq'
import xmsx from '@/components/app/xmsx'
import lxxx from '@/components/app/lxxx'
import bmsx from '@/components/app/bmsx'
import sxjg from '@/components/app/sxjg'
import xmxq from '@/components/app/xmxq'
import xmcy from '@/components/app/xmcy'

const routes =  [
  {
    path: '/',
    name: 'main',
    component: main,
    meta:{
      title:'首页'
    },
  },
  {
    path: '/zl',
    name: 'zl',
    component: zl,
    meta:{
      title:'总览'
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
      title:'筛选/搜索'
    }
  },
  {
    path: '/xmsx/option/:id',
    name: 'lxxx',
    component: lxxx,
    meta:{
      title:'请选择中心'
    },
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
    }
  },
  {
    path: '/xmsx/xmxq',
    name: 'xmxq',
    component: xmxq,
    meta:{
      title:'项目详情页'
    },
  },
  {
    path: '/xmsx/xmxq/xmcy',
    name: 'xmcy',
    component: xmcy,
    meta:{
      title:'项目成员'
    }
  }
]

export default routes
