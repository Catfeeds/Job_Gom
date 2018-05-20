import {Link} from 'react-router-dom';
import React, {Component} from 'react';
//import AddORmodefierSub from '../../components/SubDailog';
//import  ReactDOM from 'react-dom';
import formatData from 'util/formatDate';
class SubDetail extends Component{
    constructor(props){
        super(props);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            data :this.props.subData,
            approve_status : this.props.subData.approve_status
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data : nextProps.subData,
            approve_status : nextProps.subData.approve_status
        });
    }

    // handleClick(event){
    //     event.preventDefault();
    //     var data = this.state.data;
    //     var param = {
    //         subscribe_id : data.subscribe_id,
    //         name : data.name,
    //         image : data.image,
    //         description : data.description,
    //         type : 1
    //     }
    //
    //     ReactDOM.render(
    //         <AddORmodefierSub  title="修改订阅号"
    //                            param={param}
    //                            onSubmit={this.submitCallbackFn.bind(this)}
    //                            fetch={"subscribe/edit"}
    //                            unClick=''
    //         />,
    //         document.getElementById('subModifier')
    //     );
    // }

    submitCallbackFn(success){
        var value = {};
        if(success) {
            this.setState({approve_status: 0});
        }
    }


    render (){
        var data = this.state.data;
        var sub_targ = '';

        // if(this.state.approve_status == 0){
        //     sub_targ= <div className="sub-targ state-auditing"  data-subId={data}>审核中</div>
        // }else{
        //     // sub_targ= (
        //     //     <div className="sub-targ changeBtn" onClick={this.handleClick} data-subId={data.subscribe_id}>修改</div>
        //     // )
        //     sub_targ= (
        //         <div className="sub-targ changeBtn" >
        //             <Link to={{
        //                 pathname: '/subscribe/SubOption',
        //                 data: {
        //                     title: '修改订阅号',
        //                     subscribe_id: data.subscribe_id,
        //                     fetch: 'subscribe/edit',
        //                     threeLevel: true,
        //                     param: {
        //                         subscribe_id : data.subscribe_id,
        //                         name : data.name,
        //                         image : data.image,
        //                         description : data.description,
        //                         type : 1
        //                     }
        //                 }
        //             }}>修改</Link>
        //         </div>
        //     )
        // }
        return(
            <div>
                <table className=" sub-detail-manage">
                    <tbody>
                        <tr className="hoverC">
                            <td className="text-left video-msg sub">
                                <a className="video-img" href="javascript:void(0)">
                                    <img width="96" height="96" src={data.image}/>
                                </a>
                                <div className="video-detail video-detail-manage">
                                    <div className="name"><a href="javascript:void(0)">{data.name}</a></div>
                                    <div className="description">简介：<span>{data.description}</span></div>
                                    <div className="build-time">创建于：<span>{formatData(data.create_time*1000,'yyyy-MM-dd')}</span></div>
                                    <div className="sub-targ changeBtn" >
                                        <Link to={{
                                            pathname: '/portal/subscriber/SubOption/T'+data.subscribe_id,
                                            data: {
                                                title: '修改美号',
                                                parentNav:"subMgr",
                                                subscribe_id: data.subscribe_id,
                                                fetch: 'subscribe/edit',
                                                threeLevel: true,
                                                param: {
                                                    subscribe_id : data.subscribe_id,
                                                    name : data.name,
                                                    image : data.image,
                                                    description : data.description,
                                                    type : 1
                                                }
                                            }
                                        }}>修改</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}
export  default  SubDetail