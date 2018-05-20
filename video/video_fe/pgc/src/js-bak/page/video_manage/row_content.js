/**
 *
 Created by zhangzhao on 2017/8/1.
 Email: zhangzhao@gomeplus.com
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {v4} from 'uuid';
import Dialog from 'components/Dialog';
import Confirm from 'components/Confirm';
import ModifyVideoDialog from './video_modify_dialog';
import SubscribeAdd from './subscribe_add';
import VideoPreview from 'components/VideoPreview';
import formatDate from 'util/formatDate';
import VideoService from 'api/video';
import {history} from 'store';
import {Link} from 'react-router-dom';
import debounce from 'lodash/debounce';

const VideoImg = (props) => {
    return (
        <PreviewLink {...props} clsName="video-img" ><img width="170" height="96" src={props.image}/></PreviewLink>
    )
}

class PreviewLink extends Component {
    constructor(props){
        super(props)
    }
    onPreview=()=> {
        this.props.onPreview(this.props.id);
    }
    render() {
        return (
                <span className={this.props.clsName}>
                {this.props.children}
                <div className="shadeBox"></div>
                </span>
        )
    }
}

const VideoDetail = (props) =>{
    return (
        <div className="video-detail">
            <div className="name"><PreviewLink {...props} >{props.title}</PreviewLink></div>
            <div className="build-time">创建于：<span>{formatDate(props.create_time*1000, 'yyyy-MM-dd')}</span></div>
            {/*<div className="sub-targ">{props.tags}</div>*/}
        </div>
    )
}

const VideoMsg = (props)=>{
    return(
        <td className="text-left video-msg">
            <VideoImg
                image={props.image}
                {...props}
            />
            <VideoDetail
                {...props}
            />
        </td>
    )
}

const Pop = (title, style, info)=>{
    return <td className="stater">
        <span title={title} style={style}>{title}</span>
        <div className="video-review-fail">
            <a href="javascript:;">更多</a>
            <div className="fail-desc-box">
                <div className="fail-desc-content">
                    {info}
                </div>
            </div>
        </div>
    </td>;
}
const ApplyStatus = ({item, status})=> {
    let style = {},
        text,
        title;
    if (status.convertFail) {
        style = {
            color: '#eb4747'
        }
        text = '审核失败，视频转码失败';
        title = text;
    } else if (status.applyIngFail) {
        style = {
            color: '#eb4747'
        }
        text = [];
        if (status.videoFail) {
            text.push(item.video_receipt);
        }
        if (status.imgFail) {
            text.push(item.image_receipt);
        }
        if (status.textFail) {
            text.push(item.text_receipt);
        }
        title = '审核失败 ';
        let info = text.map((v,k)=>{
            return (<p key={k}>{k+1}. {v}</p>);
        });

        return Pop(title, style, info);
    } else if (status.allPass) {
        style = {
            color: '#55c40d'
        }
        text = '审核成功';
        title = text;
    } else {
        style = {
            color: '#ff7a0d'
        }
        text = '审核中';
        title = text;
    }

    return (
        <td className="stater">
            <span title={title} style={style}>{text}</span>
        </td>
    )
}

class NoSubscribe extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    onAddSub=()=> {
        this.props.history.push('/portal/subscriber');
    }
    onClose=()=> {
        this.setState({
            show: false
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        });
    }
    render() {
        return (
            this.state.show ?
            <div className="vm-tips" id={"sub"+this.props.id}>
                <div>
                    <button className="vm-tips-close" onClick={this.onClose}>
                        <span className="icon-19">
                        </span>
                    </button>
                </div>
                <div className="vm-tips-content">您尚未创建美号，去创建吧</div>
                <div className="vm-tips-footer"><button onClick={this.onAddSub}>+ 新建美号</button> </div>
            </div> : null
        )
    }
}

/*const ModifyBtn = ({style = {}, item, onModify})=> {
    return (<span style={style} onClick={()=>{onModify(item.id)}} className="position-left">修改</span>);
}*/

const ModifyBtn = ({style = {}, item, onModify})=> {
    return (<Link 
        style={style} 
        to={"/portal/videoManage/update/"+item.id} 
        className="position-left">修改</Link>);
}

const DeleteBtn = ({style = {}, item, onDelete})=> {
    return (<span style={style} onClick={()=>{onDelete(item.id)}} className="position-right">删除</span>);
}
const PreviewBtn = ({style = {}, item, onPreview})=> {
    return (<span style={style} onClick={()=>{onPreview(item)}} className="position-right">预览</span>);
}
const AddSubBtn = ({item, onAddSub})=>{
    return (
        <span className="vm-sub"
              onClick={(e)=>{onAddSub(e,item)}}><span id={"addSubBtn"+item.id}>添加到美号</span>
                        <div className="vm-tips-wrap" id={"addSub"+item.id}></div>
        </span>
    );
}

const showModal=(App, delay)=>{
    setTimeout(()=>{
        ReactDOM.render(App,
            document.getElementById('vm-dialog'));
    }, delay || 0);
}

class Row extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            subscribe_id: 0,
            video_id: -1
        }
        this.notification = this.props.notification;
        this._notification = debounce(this.notification.notice, 1000, {
            'leading': true,
            'trailing': false
        });
    }
    onDelete=(id)=> {
        let that = this;
        showModal(<Confirm
            visible={true}
            onOk={(close)=>{
                VideoService.delete(id).then(ret=>{
                    if (ret.data.code === 1) {
                        close();
                        that.props.fetchData();
                        that.notification.notice({
                            content: '删除成功'
                        });
                    } else {
                        that.notification.notice({
                            content: '删除失败'
                        });
                    }
                });
            }}
            tips="删除后相关美号中该视频将一并删除"
            content="确定删除该视频吗？"
        ></Confirm>);
    }
    onModify=(id)=> {
        let that = this;
        VideoService.view(id).then(ret=>{
            let data = ret.data;
            if (data.code === 1) {
                let tags = data.data.tags.split(',');
                let title = data.data.title;
                let image = data.data.image;
                let description = data.data.description;
                showModal(<ModifyVideoDialog
                    fetchData={that.props.fetchData}
                    id={id}
                    description={description}
                    tags={tags}
                    title={title}
                    image={image} />);
            } else {
                that.notification.notice({
                    content: '请求失败'
                });
            }
        });
    }
    contains(root, n) {
        var node = n;
        while (node) {
            if (node === root) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }
    _addSub=(close)=> {
        var that = this;

        if (this.state.subscribe_id == 0) {
            that.notification.notice({
                content: '请选择美号'
            });
            return false;
        }

        VideoService.add({
            subscribe_id: this.state.subscribe_id,
            video_ids: [this.state.video_id]
        }).then(ret=>{
            if (ret.data.code === 1) {
                close();
                that.notification.notice({
                    content: '添加成功'
                });
            } else {
                that.notification.notice({
                    content: '添加失败'
                });
            }
        });
    }
    _selectSub=(subscribe_id)=> {
        this.setState({
            subscribe_id: subscribe_id
        });
    }
    _setVideoId=(item)=> {
        this.setState({
            video_id: item.video_id
        })
    }
    componentWillUnmount() {
       // ReactDOM.unmountComponentAtNode(this.refs['row'+this.props.item.id]);
    }
    onAddSub=(e, item)=> {
        // 设置当前video_id
        this._setVideoId(item);
        // TODO,查询是否有订阅号
        // 如果有，则打开添加到订阅号，否则，提示
        VideoService.listSubscribers(item.video_id).then(ret=>{
            if (ret.data.data.list.length > 0) {
                showModal(<Dialog
                    visible={true}
                    title="将该视频添加到美号"
                    onOk={this._addSub}
                    footer={
                        {
                            defaults: {
                                num:2
                            }
                        }
                    }

                ><SubscribeAdd onSelect={this._selectSub} result={ret.data.data.list} /></Dialog>);
            }else {
                if (this.state.show) {
                    return;
                }
                let id = item.id;
                this.setState({
                    show: true
                }, ()=>{
                    ReactDOM.render(<NoSubscribe history={this.props.history} show={this.state.show} id={id} />,
                        document.getElementById('addSub' + id), ()=>{
                            let pop = document.getElementById('addSub'+id);
                            let addSubBtn = document.getElementById('addSubBtn'+id);
                            pop.classList.add("mouse-enter");
                            addSubBtn.classList.add("mouse-enter");
                        });
                    this.currentId = id;
                });
                var that = this;
                document.addEventListener('mousedown', function MouseDown(e){
                    const target = e.target;
                    let currentId = that.currentId;
                    let popupNode  = document.getElementById('addSub' + currentId);
                    if (!that.contains(popupNode, target) && target) {
                        let subEle = document.getElementById('sub' + currentId);
                        let addSubBtn = document.getElementById('addSubBtn' + currentId);
                        addSubBtn ? addSubBtn.classList.remove("mouse-enter"): "";
                        subEle ? popupNode.removeChild(subEle): "";
                        if (popupNode) {
                            that.setState({
                                show: false
                            })
                        }

                        document.removeEventListener('mousedown', MouseDown);
                    }
                })
            }
        });
    }
    onPreview = (item)=>{
        if (item.convert_status != '1') { //转码不成功
            this._notification({
                content: '视频正在处理，成功后可以预览...'
            });
        } else {
            VideoService.view(item.id).then(ret=>{
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
        }
    }
    operateButtons=(item, status)=> {
        let buttons = [],
            style = {},
            oneBtnStyle = {
                position: 'static'
            }
        let mStyle = {
                left: -10
            },
            delStyle = {
                right: 28
            },
            preStyle = {
                right: -10
            }
        
        if (status.convertFail || status.videoFail) {
            buttons = [
                <DeleteBtn key={v4()} style={oneBtnStyle} onDelete={this.onDelete} item={item}/>
            ];
        }else if(status.applyIngFail){
            buttons = [
                <ModifyBtn key={v4()} style={mStyle} onModify={this.onModify} item={item} />,
                <DeleteBtn key={v4()} style={delStyle} onDelete={this.onDelete} item={item}/>,
                <PreviewBtn key={v4()} style={preStyle} onPreview={this.onPreview} item={item} />,
            ];
        } else {
            buttons = [
                <ModifyBtn key={v4()} style={mStyle} onModify={this.onModify} item={item} />,
                <DeleteBtn key={v4()} style={delStyle} onDelete={this.onDelete} item={item}/>,
                <PreviewBtn key={v4()} style={preStyle} onPreview={this.onPreview} item={item} />,
                <AddSubBtn key={v4()} onAddSub={this.onAddSub} item={item} />
            ];
        }

        let row_operate = <td key={v4()} className="operate">
            <div style={style}>
                {buttons}
            </div>
        </td>;
        return row_operate;
    }
    _getBoolean(status, convert_status){ // 顺序是视频状态、文本状态、图片状态
        let ret = {

        };
        ret.allPass = status.every(cur=>{
            return cur === 1
        });
        ret.applyIng = status.every(cur=>{
            return cur === 0
        });
        ret.applyIngFail = status.some(cur=>{
            return cur === -1
        });
        ret.videoFail = parseInt(status[0]) === -1;
        ret.videoPass  = parseInt(status[0]) === 1;
        ret.videoApplyIng  = parseInt(status[0]) === 0;
        ret.textFail = parseInt(status[1]) === -1;
        ret.textApplyIng = parseInt(status[1]) === 0;
        ret.textFailOrSuccess = parseInt(status[1]) !== 0;
        ret.imgFailOrSuccess = parseInt(status[2]) !== 0;
        ret.imgFail = parseInt(status[2]) === -1;
        ret.imgApplyIng = parseInt(status[2]) === 0;
        ret.convertFail = parseInt(convert_status) === -1;
        return ret;
    }
    render() {
        let {item} = this.props;
        let image_status = parseInt(item.image_status),
            text_status = parseInt(item.text_status),
            video_status = parseInt(item.video_status),
            convert_status = parseInt(item.convert_status);

        // -1：审核未通过 0：待审核 1：审核通过

        let status = this._getBoolean([video_status, text_status, image_status], convert_status);
        return (
            <tr ref={"row"+item.id}>
                <VideoMsg
                    {...item}
                    onPreview={this.onPreview}
                />
                <ApplyStatus item={item} status={status} />
                {this.operateButtons(item, status)}
            </tr>
        )
    }
}

export default class ContentRow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let arrays = [];
        let {list} = this.props;
        for (var i =0, len = list.length;i < len; i++) {
            arrays.push(<Row key={i} history={this.props.history} item={list[i]} notification={this.props.notification} fetchData={this.props.fetchData} />)
        }
        return (
            <tbody>{arrays.length === 0 ? <tr className="nodataItem">
                    <td colSpan="3" > 暂无数据</td>
                </tr> : arrays}</tbody>
        );
    }
}