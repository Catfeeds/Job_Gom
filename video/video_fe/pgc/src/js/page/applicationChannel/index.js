/**
 * [申请渠道]
 * @Author: XXX
 * @Email:  xxx@gomeplus.com
 */
import 'css/page/applyVideo/index.scss';
import React, { Component } from 'react';
import Alert from 'components/Alert';
import { Switch, Route } from 'react-router-dom';
import MainChannel from './MainChannel';
import VideoApply from './VideoApply';
class ApplicationChannel extends Component{
    constructor(){
        super();
    }
    render(){
        return (
			<Switch>
				<Route exact path={'/portal/channel'}  component={MainChannel} />
				<Route path={'/portal/channel/videoApply/:id'} component={VideoApply} />
				{/*<Route path={'/portal/contentManage/articleUpdate/:id'} component={ArticleUpdate} />*/}
			</Switch>
        )
    }
}

export default ApplicationChannel;