
import React, {Component} from 'react';
import SubCreat from "./SubCreat";
import {Link} from 'react-router-dom';
import fetch from 'io/fetch';

class SubOption extends Component{
    constructor(props){
        super(props);
        this.id = this.props.match.params.id;
        this.type = this.props.match.params.type;
        this.state={}

    }
    _fetchData(id,threeLevel){
        fetch.get('subscribe/detail',{
            params : {
                subscribe_id : id
            },
            loading : true
        }).then((data) => {

            if(data.data.message == 'success'){
                var item = data.data.data;
                this.setState({
                    data :{
                        parentNav: "subscriber",
                        title: '修改美号',
                        subscribe_id: item.subscribe_id,
                        fetch: 'subscribe/edit',
                        threeLevel: threeLevel,
                        param: {
                            subscribe_id : item.subscribe_id,
                            name : item.name,
                            image : item.image,
                            description : item.description,
                            type : 1
                        }
                    }
                });
            }
        })
    }

    getProps(){
        var data = {};
        if(this.type == "N"){
            this.setState({
                data : {
                    parentNav: "subscriber",
                    title: '新建美号',
                    fetch: 'subscribe/add',
                    threeLevel: false,
                    param: {
                        subscribe_id: '',
                        name: '',
                        image: '',
                        description: '',
                        type: 0
                    }
                }
            });

        }else if(this.type == "C"){
            this._fetchData(this.id,false);
        }else{
            this._fetchData(this.id,true);
        }
    }
    componentDidMount(){
        this.getProps();
    }

    render(){
        var data = this.state.data;
        if(data){
            return (
                <div className="subCreat">
                    <Crumbs
                        title={data.title}
                        threeLevel={data.threeLevel}
                        subscribe_id={data.subscribe_id}
                    />
                    <SubCreat
                        title= {data.title}
                        param= {data.param}
                        //onSubmit={this.createSub.bind(this)}
                        fetch= {data.fetch}
                        parentNav={data.parentNav}
                    />
                </div>
            )
        }else{
            return(<div></div>);
        }




    }
}

function Crumbs(props){
    var LinkMrg = null;
    if(props.threeLevel){

        LinkMrg = (
            <li className="fl">
                <Link className="mySub-link" id="subMgr"  to={{
                    pathname : '/portal/subscriber/subMgr/'+props.subscribe_id
                }}>管理美号</Link>
                <span> &gt; </span>
            </li>
        );
    }
    return (
        <div className="navBar">
            <ul className="clearfix">
                <li className="fl">
                    <Link id="subscriber" className="mySub-link" to={"/portal/subscriber"}>我的美号</Link>
                    <span> &gt; </span>
                </li>
                {LinkMrg}
                <li className="fl current"><a> {props.title}</a></li>
            </ul>
        </div>
    )
}

export default SubOption;

