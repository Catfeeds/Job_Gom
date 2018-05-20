/* css */

import 'css/page/subscribe_manage/index.scss';
import React, {Component} from 'react';
import VideoList from './video_list';
import SearchArea from './area_search';
import 'css/page/video_manage/index.scss';
import VideoService from 'api/video';
import NoAuth from 'components/BlankPage';
import {page} from 'util/phpCommon';
import {
    Route,
    Link
} from 'react-router-dom';

export default class VideoManage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            status: "", // 全部
            page_total: -1,
            list: [],
            showNoVideo: false
        }
    }
    fetchData=(currentPage, status)=> {
        this.setState({
            currentPage: currentPage || 1,
            status: status || "0"
        }, ()=>{
            VideoService.list({
                page: this.state.currentPage,
                status: this.state.status
            }).then(data=>{
                if (data.data.code === 1) {
                    let total = data.data.data.page && data.data.data.page.page_total;
                    let showNoVideo = this.state.status === '0' && total === 0;
                    this.setState({
                        list: data.data.data.list,
                        page_total: total,
                        showNoVideo: showNoVideo
                    })
                }
            });
        })
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
            if (this.state.showNoVideo) {
               return <NoAuth tag={'noVideo'} />
            } else if (this.state.page_total >= 0) {
                return (
                    <div className="subscribe-manage">
                        <div className="subscribe-manage-box">
                            <SearchArea fetchData={this.fetchData}/>
                            <VideoList
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
