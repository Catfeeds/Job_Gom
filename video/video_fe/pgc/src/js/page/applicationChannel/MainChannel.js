import React, { Component } from 'react';
import fetch from 'io/fetch';
import {Link} from 'react-router-dom';

function VideoApply(props) {
    var obj = props.data;
    var td_html=null;
    var button = null;
    switch (obj.approve_status){
        case "1":
            td_html=  <td>
                        <div className="state">
                            <span className="red">审核失败</span>
                        </div>
                        <div className={"state-text" }>
                            <p>{obj.receipt}</p>
                            <div className="text-all">
                                {obj.receipt}
                            </div>
                        </div>
                    </td>;
            button =  <Link className="btn" to={"/portal/channel/videoApply/"+obj.channel_id}>修改</Link>;
            break;
        case "0":
            td_html=  <td>
                        <div className="state">
                            <span className="orange">审核中</span>
                        </div>
                        </td>;
            button =  <a href="#" className="btn disable">已申请</a>;
            break;
        case "1":
            td_html=  <td>
                        <div className="state">
                            <span className="green">审核通过</span>
                        </div>
                    </td>;
            button = <Link className="btn " to={"/portal/publishContent/publishVideo"}>发布视频</Link>;
            break;
    }
    return(
        <tr>
            <td>
                <h3>视频渠道</h3>
                <p className="gray">申请视频渠道后才可以发布视频，视频内容将展示在您的美号主页中</p>
            </td>
            {td_html}
            <td>
                {button}
            </td>
        </tr>
    );
}

class MainChannel extends Component{
    constructor(){
        super();
        this.state= {
            data: []
        }
    }

    getFetch() {
        var that = this;
        fetch.get('/channel/getChannelStatus', )
            .then(function (data) {
//              console.log(data.data);
                if(data.data.message == "success"){
                    that.setState({
                        data : data.data.data
                    });
                }
            })
    }

    _html(){
        var data = this.state.data;
        var optionState = "";
        if(data.length !=0 ){
            // 本该用data.type 判断渠道类型，目前只有一个渠道，因此不用判断
            var videoApply = data[0];
            return(
                <VideoApply  data={videoApply}/>
            );
        }else{
            return(
                <tr>
                    <td>
                        <h3>视频渠道</h3>
                        <p className="gray">申请视频渠道后才可以发布视频，视频内容将展示在您的美号主页中</p>
                    </td>
                    <td>
                        <Link className="btn " to={"/portal/channel/videoApply/new"}>申请</Link>
                    </td>
                </tr>
            )
        }

    }
    componentDidMount(){
        this.getFetch();
        // Alert({
        // 	content:'info',
        // 	showMask:false
        // });
    }
    render(){
        return (
            <React.Fragment>
                <div className="av-wrap ">
                    <table border="0" cellSpacing="0" cellPadding="0" adding="0" width="100%" className="av-bar">
                        <tbody>
                        {this._html()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default MainChannel;