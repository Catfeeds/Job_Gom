/* css */
import 'css/page/subscribe_manage/index.scss';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Container from './Container';

class SubscribeManage extends Component {
    constructor(props) {
        super(props);
        this.state={
            id : this.props.match.params.id
        }
    }
    componentWillReceiveProps(id){
        this.setState({
            id : this.state
        });
    }
    render() {
        var id = this.state.id;

        return (
            <div className="subscribe-manage">
                <Crumbs />
                <div className="subscribe-manage-box">
                    <Container subscribe_id={id}  />
                </div>
                <div id="share_video"></div>
            </div>
        )
    }
}
// 导航跳转
function Crumbs(){
    return (
        <div className="navBar">
            <ul className="clearfix">
                <li className="fl">
                    <Link id="subscriber" className="mySub-link" to={"/portal/subscriber"}>我的美号</Link>
                    <span> &gt; </span>
                </li>
                <li className="fl current"><a>管理美号</a></li>
            </ul>
        </div>
    )
}

export default SubscribeManage;

