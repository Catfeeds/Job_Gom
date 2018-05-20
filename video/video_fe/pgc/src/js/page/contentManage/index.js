import 'css/page/contentManage/index.scss';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainManage from './MainManage';
import VideoUpdate from './VideoUpdate';
import ArticleUpdate from './ArticleUpdate';

/*
*  1 视频修改
*  2 图文修改
*  3 视频预览
*  4 删除
*  5 导航组件
*  6
* */


class ContentManage extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<Switch>
				<Route exact path={'/portal/contentManage'}  component={MainManage} />
				<Route path={'/portal/contentManage/videoUpdate/:id'} component={VideoUpdate} />
				<Route path={'/portal/contentManage/articleUpdate/:id'} component={ArticleUpdate} />
			</Switch>
		)
	}
}

export default ContentManage;
