/**
 *
 Created by zhangzhao on 2017/8/1.
 Email: zhangzhao@gomeplus.com
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import VideoManage from 'page/video_manage/index';

const mapStateToProps = (state) => {
    return {...state.reducers};
};

const VM = connect(
    mapStateToProps
)(VideoManage);

export default VM