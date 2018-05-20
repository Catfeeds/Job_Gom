/* css */
import 'css/page/subscribe/index.scss';
import React, {Component} from 'react';
import NoAuth from 'components/BlankPage';
import InitSubscribe from "./InitSubscribe";
import SubscribeMgr from '../subscribe_manage/index';
import { Switch, Route } from 'react-router-dom';
import {page} from 'util/phpCommon';
import SubOption from '../subscribe_creat/index'

class Subscribe extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        if(page.approve_status != 1){
            return (
                <NoAuth tag={'noArticleVideo'} />
            )
        }else{
            return (
                <Switch>
                    <Route exact path={'/portal/subscriber'} component={InitSubscribe} />
                    <Route path={'/portal/subscriber/subOption/:type:id'} component={SubOption} />
                    <Route path={'/portal/subscriber/subMgr/:id'} component={SubscribeMgr} />
                </Switch>
            );
        }
    }
}

export default Subscribe;
