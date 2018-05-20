import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import main from '../Component/main'; //全部入口

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

const bmsx = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/bmsx').default)
    },'Bmsx')
}

const gzl = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/gzl').default)
    },'Gzl')
}

const gzlxq = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/gzlxq').default)
    },'Gzlxq')
}

const lxxq = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/lxxq').default)
    },'Lxxq')
}

const lxxx = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/lxxx').default)
    },'Lxxx')
}

const sxjg = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/sxjg').default)
    },'Sxjg')
}

const xmcy = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmcy').default)
    },'Xmcy')
}

const xmfxlx = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmfxlx').default)
    },'Xmfxlx')
}

const xmjd = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmjd').default)
    },'Xmjd')
}

const xmlx = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmlx').default)
    },'Xmlx')
}

const xmsx = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmsx').default)
    },'Xmsx')
}

const xmxq = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmxq').default)
    },'Xmxq')
}

const xmzt = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/xmzt').default)
    },'Xmzt')
}

const zl = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/zl').default)
    },'Zl')
}

const eventRes = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/eventRes').default)
    },'EventRes')
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={main} />//首页
            <Route path="index" component={main} />
              <Route path="event" getComponent={eventRes} />//事件传值
              <Route path="zl" getComponent={zl} />//总览
              <Route path="xmjd" getComponent={xmjd} />//项目阶段分析
              <Route path="xmzt" getComponent={xmzt} />//项目状态分析
              <Route path="xmlx" getComponent={xmlx} />//项目类型
                <Route path="xmlx/detail/:id" getComponent={lxxq} />//项目类型分析
              <Route path="gzl" getComponent={gzl} /> //工作量类型
                <Route path="gzl/detail/:id" getComponent={gzlxq} /> //工作量类型分析
              <Route path="xmsx" getComponent={xmsx} /> //筛选/搜索
                <Route path="xmsx/option/:id" getComponent={lxxx} /> // 请选择中心
                  <Route path="xmsx/option/:id/:id" getComponent={bmsx} /> //选择部门
                <Route path="xmsx/sxjg" getComponent={sxjg} /> //筛选结果
                <Route path="xmsx/xmxq" getComponent={xmxq} /> //项目详情页
                  <Route path="xmsx/xmxq/xmcy" getComponent={xmcy} /> //项目成员
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);

export default RouteConfig;
