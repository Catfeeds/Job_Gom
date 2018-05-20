import React, {Component} from 'react';
import VideoSubDialog from "../../components/VideoSubDialog";
import fetch from 'io/fetch';
import Notification from 'components/Notification';
class DeleteDailog extends Component{
    constructor(props){
        super(props);
        this.onOk = this.onOk.bind(this);
        this.notification = null; // toast实例
    }
    componentDidMount(){
        this.notification = Notification();
    }

    onOk() {
        var value ={};
        fetch.post(this.props.url, this.props.option)
            .then((data) => {
                if (data.data.message == 'success' && data.data.code == 1) {
                    this.props.deleteCallback(true);
                    this.notification.notice({
                        content: <span>{'移除成功'}</span>,
                        onClose: function(){

                        }
                    });
                } else {
                    this.props.deleteCallback(false);
                    this.notification.notice({
                        content: <span>{'移除失败'}</span>,
                        onClose: function(){

                        }
                    });
                }
            });
        return true;
    }

    container() {
        return (
            <div className="messageContain deleteBox">
                <div className="deleteContainer">
                    {this.props.type== "video"? " 移除该视频吗":"移除该图文吗？"}
                </div>
                <div className="deleteItem">
                    {this.props.type== "video"? " 移除后仍可从视频管理中找到该视频":"移除后仍可从图文管理中找到该图文"}
                </div>
            </div>);
    }

    render(){

        return (
            <VideoSubDialog width="310" title="" visible ={true} footer='deletFooter' ok='确定' off="取消" onOk={this.onOk}>
                {this.container()}
            </VideoSubDialog>
        );
    }
}
export  default DeleteDailog