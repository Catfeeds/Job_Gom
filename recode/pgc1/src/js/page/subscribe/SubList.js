
import React, {Component} from 'react';
import formatData from 'util/formatDate';
import {Link} from 'react-router-dom';
/** 表头 **/

function Thead (){
    return (
        <thead className="thead">
            <tr>
                <th className="text-left">美号头像</th>
                <th className="stater">状态</th>
                <th className="operate">操作</th>
            </tr>
        </thead>
    );
}


function SubImg(props){
    var permission = props.value.add_video_permission == 0 && props.value.approve_status == -1  ? false : true;
    if (!permission ){
        return (
            <a className ={props.className} href="javascript:;">{props.children}</a>
        );
    } else {
        return (
            <Link
                className ={props.className}
                to={{
                    pathname : '/portal/subscriber/subMgr/'+props.value.subscribe_id
                }}
            >
                {props.children}
            </Link>
       );
    }

}

class  SubDetail extends Component{
    constructor(props){
        super(props)
    }

    render(){
         var value = this.props.value;
        return(
            <td className="text-left video-msg sub">
                <SubImg value= {value} className ={'video-img '}>
                        <img width="96" height="96" src={value.image}/>
                        <span className="video-num">
                            <em></em><span>{value.attach_total}个内容</span>
                        </span>
                        <div className="shadeBox"></div>
                </SubImg>
                <div className="video-detail">
                    <div className="name">
                        <SubImg value= {value} className = ''>{value.name}</SubImg>
                    </div>
                    <div className="build-time">创建于：<span>{formatData(value.create_time*1000,'yyyy-MM-dd')}</span></div>

                </div>
            </td>
        );
    }
}



function ApplyStater(props){
    var value = props.value;
    var approve_status = value.approve_status;
    var receipt = value.receipt;

    var _html = ''
    switch (parseInt(approve_status)){
        case -1:
            receipt = receipt.split(',');
            _html = receipt.map((val,index)=> {
                return <div className='state-audit-error' key={index}>{val}</div>
            });
            break;
        case 0:
            _html = <div className='state-auditing'>审核中</div>
            break;
        case 1 :
            _html = <div className='state-audited'>审核成功</div>
            break;
        default:  break;
    }

    return (
        <td className="stater">
            {_html}
        </td>
    );
}




class Operate extends Component{
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
    }


    // modefierSub(){
    //     return (
    //         <div><span  onClick={this.handleClick}>修改</span></div>
    //     );
    // }

    manageSub(){
        return (
            <div>
                {/*<Link to={`/portal/subscriber/subMgr:${this.props.value.subscribe_id}`}>管理订阅号</Link>*/}
                <Link to={{
                    pathname : '/portal/subscriber/subMgr/'+this.props.value.subscribe_id
                }}>管理美号</Link>
            </div>
        );
    }


    render(){
        var value = this.props.value;
        //var showModefierSub = value.approve_status == '0' ? false : true;
        var showManageSub = value.add_video_permission == 0 && value.approve_status == -1  ? false : true;
        return (
            <td className="operate">
                {/*<div><span  onClick={this.handleClick}>修改</span></div>*/}
                <div><Link to={{
                    pathname: '/portal/subscriber/SubOption/C'+this.props.value.subscribe_id
                }}><span>修改</span></Link></div>
                { showManageSub ? this.manageSub() : null }
            </td>
        );
    }
}


class TrList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <tr data-subscribe_id = {this.props.value.subscribe_id}>
                <SubDetail value={this.props.value}/>
                <ApplyStater value={this.props.value}/>
                <Operate value={this.props.value}  index={this.props.index}  onModefierSub = {this.props.onModefierSub}/>
            </tr>
        );
    }
}




class SubList extends Component{
    constructor(props){
        super(props);
    }

    changeSub(ok){
        this.props.changeSub(ok);
    }

    // onModefierSuCallBack(index){
    //     var item = this.props.data[index];
    //     var param = {
    //         subscribe_id : item.subscribe_id,
    //         name : item.name,
    //         image : item.image,
    //         description : item.description,
    //         type: 1
    //     }
    //
    //     ReactDOM.render(
    //         <AddORmodefierSub
    //             title="修改订阅号"
    //             param={param}
    //             onSubmit={this.changeSub.bind(this)}
    //             fetch={"subscribe/edit"}
    //             unClick=''
    //         />,
    //         document.getElementById('subModifier')
    //     );
    // }

    render(){
        var data = this.props.data;
        var getTrList = data.map((value,index)=>{
           return (
               <TrList
                   key={value.subscribe_id}
                   value={value}
                  // onModefierSub={this.onModefierSuCallBack.bind(this)}
                   index={index}/>
           );
        });

        return(
            <table className="video-list-table">
                <Thead />
                <tbody>
                    {getTrList}
                </tbody>
            </table>

        );
    }
}

export default SubList;