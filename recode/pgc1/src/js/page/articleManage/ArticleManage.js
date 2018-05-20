/**
 * [图文管理 列表]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import SearchArea from './SearchArea';
import ArticleList from './ArticleList';
import Pager from '../../components/Pager';
import ArticleService from 'api/article';
import NoAuth from 'components/BlankPage';
import {page} from 'util/phpCommon';


export default class ArticleManage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            status: "", // 全部
            page_total: -1,
            list: [],
            showNoArticle: false
        }
    }
    fetchData=(currentPage, status)=> {
        this.setState({
            currentPage: currentPage || 1,
            status: status || "0"
        }, ()=>{
            ArticleService.list({
                page: this.state.currentPage,
                page_size: 10,
                status: this.state.status
            }).then(data=>{
                if (data.data.code === 1) {
                    let total = data.data.data.page && data.data.data.page.page_total;
                    let showNoArticle = this.state.status === '0' && total === 0;
                    this.setState({
                        list: data.data.data.list,
                        page_total: total,
                        showNoArticle: showNoArticle
                    })
                }
            });
        });
    }
    componentDidMount() {
        if(page.approve_status == '1') {
            this.fetchData();
        }
    }
    render() {
        let {actions, history} = this.props;
        if(page.approve_status != '1'){
            return (
                <NoAuth tag={'noLimit'} />
            )
        } else {
            if (this.state.showNoArticle) {
               return <NoAuth tag={'noArticle'} />
            } else if (this.state.page_total >= 0) {
                return (
                    <div className="subscribe-manage">
                        <div className="subscribe-manage-box articleManage">
                            <SearchArea fetchData={this.fetchData}/>
                            <ArticleList
                                page_total={this.state.page_total}
                                actions={actions}
                                data={this.state.list}
                                fetchData={this.fetchData}
                                history={history}
                                status={this.state.status}
                                page={this.state.currentPage}
                            />
                            <div id="vm-dialog"></div>
                        </div>
                    </div>
                )
            } else{
                return <div></div>
            }
        }
    }
}
