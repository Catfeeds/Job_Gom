import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import formatData from 'util/formatDate';
import VideoPreview from 'components/VideoPreview';
import VideoService from 'api/video';
import Dialog from 'components/Dialog';
import ReactDOM from 'react-dom';
import toast from 'components/Toast';
import Confirm from 'components/Confirm';
import fetch from 'io/fetch';

function Thead (props){
    return(
        <thead>
            <tr>
                <th>标题</th>
                {props.type==2 ? null :  <th width="230">封面图</th>}
                <th width="235">状态</th>
                <th width="165">操作</th>
            </tr>
        </thead>
    );
}

function CheckState(props){
    let approve_status = props.data.approve_status;
    let td = null;
    switch (approve_status){
        case '-1':
            td = <td><span className="red">审核失败</span><p className="gray">标签问题标签问题标签问题</p></td>;
            break;
        case '0':
            td = <td><span className="orange">审核中</span></td>;
            break;
        default :
            td = <td><span className="green">审核通过</span></td>;
            break;
    }
    return td;
}

function Options(props){
    let data = props.data;
    if(data.type == 2){
        return (
            <td>
                <div className="a-btn">
                    <Link to={"/portal/contentManage/articleUpdate/"+data.content_id}>修改</Link>
                </div>
                <div className="a-btn">
                    <a href="javascript:;" onClick={()=>(props.remove(data.content_id,data.type))}>删除</a>
                </div>
            </td>
        );
    }
    // 预览只有审核成功的才可以预览？
    return (
        <td>
            <div className="a-btn">
                <Link to={"/portal/contentManage/videoUpdate/"+data.content_id}>修改</Link>
            </div>
            <div className="a-btn">
                <a href="javascript:;" onClick={()=>(props.remove(data.content_id,data.type))}>删除</a>
            </div>
            <div className="a-btn">
                <a href="javascript:;" onClick={()=>(props.preview(data.content_id,data.convert_status))}>预览</a>
            </div>
        </td>
    );
}

function Img(props){
    var imgTd = null;
    if(props.type != 2){
        imgTd = props.data.type == 1 ? <td><img src={props.data.image} /></td>: <td></td>;
    }
    return imgTd;
}


class ContentList extends Component{
    constructor(props){
        super(props);
        this.state={
            type: this.props.type
        }
    }

    componentWillReceiveProps(){
        this.setState({
            type: this.props.type
        });
    }

    removeOnOk(id,type) {
        var fetchSer = null;
        if(type == 1){
            fetchSer = fetch.post("/video/delete", {content_id:id});
        }else {
            fetchSer = fetch.get("article/delete?content_id="+id)
        }

        let that = this;
        fetchSer.then(function (data) {
            if(data.data.message === "success"){
                toast({
                    content : "删除成功"
                });
                that.props.resetTable();
            }
        });
    }


    remove(id,type){
        Confirm({
            content:"确定删除?",
            onOk:()=>{
                this.removeOnOk(id,type)
            }
        });

    }


    preview(id,convert_status){
        console.log(convert_status);
        if(convert_status == 1){
            VideoService.view(id).then(ret=>{
                if (ret.data.code === 1) {
                    ReactDOM.render(
                    <Dialog
                        visible={true}
                        style={{width: 1000,'minHeight':585}}
                    ><VideoPreview data={ret.data.data} /></Dialog>,
                        document.getElementById("video_view")
                    );
                } else {

                }
            });
        }else{
            toast({
                content: <span>{'视频正在处理，成功后可以预览...'}</span>
            });
        }
    }

    _html(){
        var data = this.props.data;
        var tr_html = [];
        if(data.length == 0){
            var type= this.props.type;
            var status = this.props.status;
            var p = "";
            var link = null;
            if(type == 0 && status == 0){
                p = <p>您还未发布过任何内容哦，快去发布吧</p>;
                link = <Link className="btn " to={"/portal/publishContent/"}>发布内容</Link>;
            }else if(type == 1 && status == 0){
                p = <p>您还未发布过任何视频哦，快去发布吧</p>;
                link = <Link className="btn " to={"/portal/publishContent/"}>发布视频</Link>;
            }else if(type == 2 && status == 0){
                p = <p>您还未发布过任何文章哦，快去发布吧</p>;
                link = <Link className="btn " to={"/portal/publishContent/"}>发布文章</Link>;
            }else{
                p = <p>没有数据</p>;
            }
             tr_html.push(
                 <tr key="1">
                    <th colSpan="4">
                        <div className="nodata">{p}{link}</div>
                    </th>
                </tr>);
            return tr_html;
        }

        data.map((value,index)=>{
            var list = value;
            tr_html.push(
                <tr key={index}>
                    <td>
                        <a href="javascript:;" className="title">{list.title}</a>
                        <p className="gray">创建于：{formatData(list.create_time*1000,'yyyy-MM-dd')}</p>
                    </td>
                    <Img type={this.state.type} data={list}/>
                    <CheckState data={list}  />
                    <Options data={list}
                             remove={this.remove.bind(this)}
                             preview={this.preview.bind(this)}
                    />
                </tr>
            );
        });
        return tr_html;
    }

    render(){
        return(
            <div>
                <table border="0" cellSpacing="0" cellPadding="0" className="list-table" width="100%">
                    <Thead type={this.state.type}/>
                    <tbody>
                        {this.props.valid ? this._html() : null}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default ContentList;