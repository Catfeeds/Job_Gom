/**
 * [图文管理]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import 'css/page/article_manage/index.scss';
import React, {Component} from 'react';
import NoAuth from 'components/BlankPage';
import { Switch, Route } from 'react-router-dom';
import {page} from 'util/phpCommon';
import ArticleManage from './ArticleManage';
import ArticleUpdate from './ArticleUpdate';

class ArticleIndex extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        if(page.approve_status != 1) {
            return (
				<NoAuth tag={'noArticleAuthority'} />
            )
        } else {
            return (
				<Switch>
					<Route exact path={'/portal/articleManage'} component={ArticleManage} />
					{<Route path={'/portal/articleManage/update/:id'} component={ArticleUpdate} />}
				</Switch>
            )
        }
    }
}

export default ArticleIndex;