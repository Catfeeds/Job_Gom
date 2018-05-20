
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DeleteDailog from './DeleteDailog';
import formatData from 'util/formatDate';
import VideoService from 'api/video';
import Dialog from 'components/Dialog';
import VideoPreview from 'components/VideoPreview';
import Notification from 'components/Notification';

function Thead (props){
    return (
        <thead className="thead">
        <tr>
            <th className="text-left">{props.type=="video" ? "封面" : "标题"}</th>
            <th className="operate">操作</th>
        </tr>
        </thead>
    );
}

const showModal=(App)=>{
    ReactDOM.render(App,
        document.getElementById('share_video'));
}

/* 列表信息 */
class Table extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.notification = null; // toast实例

    }


    handleDelete(event){
        var index = event.target.getAttribute('data-index');
        var video  = {
            'subscribe_id' : this.props.data[index].subscribe_id,
            'video_id' : this.props.data[index].video_id
        }
        var article={
            'subscribe_id' : this.props.data[index].subscribe_id,
            'article_id' : this.props.data[index].article_id
        }
        var option = this.props.type=="video" ? video : article;
        var url = this.props.type=="video" ? "subscribe/removeSubscribeVideoRelation" :"article/removeSubscribeArticleRelation"
        ReactDOM.render(
            <DeleteDailog  option = {option}
                           url={url}
                           deleteCallback={this.props.deleteCallback}
                           toastShow = {this.props.toastShow}
                           type={this.props.type}
            />,
            document.getElementById('video-option')
        )
    }
    
    handleOnClick(id,convert_status){
        if(convert_status == 1){
            VideoService.view(id).then(ret=>{
                if (ret.data.code === 1) {
                    showModal(<Dialog
                        visible={true}
                        style={
                            {
                                width: 1000
                            }
                        }
                    ><VideoPreview data={ret.data.data} /></Dialog>);
                } else {

                }
            });
        }else{
            this.notification.notice({
                content: <span>{'视频正在处理，成功后可以预览...'}</span>
            });
        }

    }
    componentDidMount(){
        this.notification = Notification();
    }

    TrMap(){
        var data = this.props.data;
        return data.map((value, index)=>{
            return(
                <tr key={index}>
                    <td className="text-left video-msg">
                        <a className="video-img" href='javascript:;' >
                            <img width="170" height="96" src={value.image}/>
                            <div className="shadeBox"></div>
                        </a>
                        <div className="video-detail">
                            <div className="name"><a href='javascript:;' >{value.title}</a></div>
                            <div className="build-time">创建于：<span>{formatData(value.create_time*1000,'yyyy-MM-dd')}</span></div>

                        </div>
                    </td>
                    <td className="operate">
                        <div>
                            <span className="position-left" onClick={()=>(this.handleOnClick(value.id,value.convert_status))}>预览</span>

                            <span className="position-right" data-index={index} onClick={this.handleDelete} >移除</span>
                        </div>
                    </td>
                </tr>
            );
        });

    }

    articleTrMap(){
        var data = this.props.data;
        return data.map((value,index)=>{
            return(
                <tr className="article" key={index}>
                    <td>
                        <div className="video-detail">
                            <div className="name"><a href='javascript:;' >{value.name}</a></div>
                            <div className="build-time">创建于：<span>{formatData(value.create_time*1000,'yyyy-MM-dd')}</span></div>

                        </div>
                    </td>
                    <td>
                        <span className="position-right" data-index={index} onClick={this.handleDelete} >移除</span>
                    </td>
                </tr>
            );
        });
    }

    render(){
        var trMap = '';
        if(this.props.data.length > 0){
            trMap = this.props.type=="video" ? this.TrMap() : this.articleTrMap();
        }else{
            trMap = <tr className="nodataItem hoverC" ><td colSpan="2" > 暂无数据</td></tr>;
        }
        return(
            <div>
                <table className="video-list-table">
                    <Thead type={this.props.type}/>
                    <tbody>
                        {trMap}
                    </tbody>
                </table>
                <div id="video-option">
                </div>
            </div>
        );
    }
}

export  default  Table
