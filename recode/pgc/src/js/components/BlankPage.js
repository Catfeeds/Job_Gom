import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {approve_status} from 'util/phpCommon';

/*
*
* 空白页
* 用法
* linkName  链接跳转地址，自己添加到该目录
*  <BlankPage  tag='noLimit'  />
*
* */

var describeJson = {
    noLimit: {
        desc: '由于您还未申请权限或申请未审核成功，所以其他功能不可用，申请权限后才可以上传视频哦！',
        btnName: '申请权限',
        route: approve_status != 1 ? '/portal/auth' : '/portal/userinfo'
    },
    noVideo: {
        desc: '您还未上传过任何视频哦，快去上传视频吧',
        btnName: '上传视频',
        route: '/portal/videoUploader'
    },
    noSub: {
        desc: '您还未创建过任何订阅号哦，快去创建吧！',
        btnName: '+新建订阅号',
        route: ''
    },
    noArticleAuthority: {
        desc: '由于您还未申请权限或申请未审核成功，所以其他功能不可用，申请权限后才可以发布图文内容哦！',
        btnName: '申请权限',
        route: approve_status != 1 ? '/portal/auth' : '/portal/userinfo'
    },
    noArticle: {
        desc: '您还未发布过任何图文哦，快去发布吧',
        btnName: '发布图文',
        route: '/portal/publishArticle'
    },
    noArticleVideo: {
        desc: '由于您还未申请权限或申请未审核成功，所以其他功能不可用，申请权限后才可以上传内容哦！',
        btnName: '申请权限',
        route: approve_status != 1 ? '/portal/auth' : '/portal/userinfo'
    }
}


class BlankPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var tag = describeJson[this.props.tag];
        return (
            <div className="video-Center-Container is-Table">
                <div className="Table-Cell">
                    <div className="Center-Block">
                        <p>{tag.desc}</p>
                        <div>
                            <NavLink exact to={tag.route}>
                                <span className="btn">{tag.btnName}</span>
                            </NavLink>
                            {/*<a href={linkName}>
                                <span className="btn" onClick={this.props.onClick}>{btnName}</span>
                            </a>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export  default  BlankPage