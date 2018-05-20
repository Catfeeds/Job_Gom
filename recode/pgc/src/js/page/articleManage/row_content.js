/**
 * [图文列表项目内容]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {v4} from 'uuid';
import Dialog from 'components/Dialog';
import Confirm from 'components/Confirm';
import SubscribeAdd from './subscribe_add';
import formatDate from 'util/formatDate';
import ArticleService from 'api/article';
import {history} from 'store';
import {Link} from 'react-router-dom';
import debounce from 'lodash/debounce';

const ArticleDetail = (props) =>{
    return (
        <div className="article-detail">
            <div className="name">{props.name}</div>
            <div className="build-time">创建于：<span>{formatDate(props.create_time*1000, 'yyyy-MM-dd')}</span></div>
        </div>
    )
}

const ArticleMsg = (props)=>{
    return(
        <td className="text-left article-msg">
            <ArticleDetail
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

    switch (status) {
        case 0:
            style = {
                color: '#ff7a0d'
            }
            text = '审核中';
            title = text;
            break;
        case -1:
            style = {
                color: '#eb4747'
            }
            text = item.receipt;
            title = '审核失败';
            let info = (<p>{text}</p>);
            return Pop(title, style, info);
            
            break;
        case 1:
            style = {
                color: '#55c40d'
            }
            text = '审核成功';
            title = text;
            break;
        default:
            // nothing
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

const ModifyBtn = ({style = {}, item, onModify})=> {
    return (<Link 
        style={style} 
        to={"/portal/articleManage/update/"+item.article_id} 
        className="position-left">修改</Link>);
}

const DeleteBtn = ({style = {}, item, onDelete})=> {
    return (<span style={style} onClick={()=>{onDelete(item.article_id)}} className="position-right">删除</span>);
}

const AddSubBtn = ({item, onAddSub})=>{
    return (
        <span className="vm-sub"
              onClick={(e)=>{onAddSub(e,item)}}><span id={"addSubBtn"+item.article_id}>添加到美号</span>
                        <div className="vm-tips-wrap" id={"addSub"+item.article_id}></div>
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
            article_id: -1
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
                ArticleService.delete(id).then(ret=>{
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
            msg="删除后相关美号中该图文将一并删除"
            title="确定删除该图文吗？"
        ></Confirm>);
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

        ArticleService.add({
            subscribe_id: this.state.subscribe_id,
            article_ids: [this.state.article_id]
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
    _setArticleId=(item)=> {
        this.setState({
            article_id: item.article_id
        })
    }
    componentWillUnmount() {
       // ReactDOM.unmountComponentAtNode(this.refs['row'+this.props.item.article_id]);
    }
    onAddSub=(e, item)=> {

        // 设置当前article_id
        this._setArticleId(item);

        // TODO,查询是否有订阅号
        // 如果有，则打开添加到订阅号，否则，提示
        ArticleService.listSubscribers(item.article_id).then(ret=>{
            if (ret.data.data.list.length > 0) {
                showModal(<Dialog
                    visible={true}
                    title="将该图文添加到美号"
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
                let id = item.article_id;
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
    operateButtons=(item, status)=> {
        let buttons = [],
            style = {},
            oneBtnStyle = {
                position: 'static'
            }
        let mStyle = {
                left: 0
            },
            delStyle = {
                right: 0
            },
            preStyle = {
                right: -10
            };

        if(status === -1){
            buttons = [
                <ModifyBtn key={v4()} style={mStyle} onModify={this.onModify} item={item} />,
                <DeleteBtn key={v4()} style={delStyle} onDelete={this.onDelete} item={item}/>,
            ];
        } else {
            buttons = [
                <ModifyBtn key={v4()} style={mStyle} onModify={this.onModify} item={item} />,
                <DeleteBtn key={v4()} style={delStyle} onDelete={this.onDelete} item={item}/>,
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

    render() {
        let {item} = this.props;
        let status = parseInt(item.approve_status);

        // -1：审核未通过 0：待审核 1：审核通过
        return (
            <tr ref={"row"+item.article_id}>
                <ArticleMsg
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