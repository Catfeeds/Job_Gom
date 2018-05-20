
import React, {Component} from 'react';
import VideoSubDialog from 'components/VideoSubDialog';
import  ReactDOM from 'react-dom';
//import VideoList from './AddVideoContainer';
import fetch from 'io/fetch';
import Notification from 'components/Notification';
import AddMsgContainer from './AddMsgContainer';

class AddMsgDailog extends Component{
    constructor(props){
        super(props);
        this.state = {
            getChosedData : [],
            unClick:""
        };
        this.notification = null; // toast实例
    }

    getChosedData(arr){
        this.setState({
            getChosedData: arr
        });
    }


    componentDidMount(){
        this.notification = Notification();
    }


    componentWillReceiveProps(){
        this.setState({
            getChosedData : []
        });
    }

    handleOnOk(){
        this.props.onOk("ok");

        if(this.state.getChosedData.length == 0){
            return ;
        }else{
            var video = {
                "subscribe_id" : this.props.subscribe_id ,
                "video_ids" : this.state.getChosedData
            }
            var article ={
                "subscribe_id" : this.props.subscribe_id ,
                "article_ids" : this.state.getChosedData
            }
            var url = this.props.type=="video" ? 'subscribe/createSubscribeVideoRelation' :"article/createSubscribeArticleRelation" ;
            var option = this.props.type=="video" ? video : article;
            fetch.post(url,option)
                .then((data) => {
                    if(data.data.message === 'success' && data.data.code == 1){
                        // TOAST
                        this.props.onOk(true);
                        this.notification.notice({
                            content: <span>{'添加成功'}</span>,
                            onClose: function(){
                                console.log('close 2')
                            }
                        });
                    }else{
                        this.props.onOk(false);
                        this.notification.notice({
                            content: <span>{'添加失败'}</span>,
                            onClose: function(){
                                console.log('close 2')
                            }
                        });
                    }
                })
        }
        return true;
    }

    render(){
        var title = this.props.type=="video" ? "添加视频" :"添加图文";
        return (
            <VideoSubDialog
                onOk = {this.handleOnOk.bind(this)}
                title={title}
                visible ={true}
                ok="确定"
                off="取消"
                footer="defaultFooter"
                width="590"
                unClick={this.state.unClick}
            >
                <AddMsgContainer
                    getChosedData={this.getChosedData.bind(this)}
                    type={this.props.type}
                    subscribe_id={this.props.subscribe_id}

                />
            </VideoSubDialog>
        );
    }
}

export default AddMsgDailog;