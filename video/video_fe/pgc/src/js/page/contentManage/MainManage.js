import React, { Component } from 'react';
import ContentList from './ContentList';
import DropDown from "../../components/DropDown";
import fetch from 'io/fetch';
import Pager from "../../components/Pager";
class MainManage extends Component{
    constructor(){
        super();
        this.state={
            type: 0,
            status:0,
            curPage:1,
            totalPage:0,
            data: [],
            curDateLength:0,
            valid:false
        };
        this.contentSelect = [
            {
                text: '全部',
                value:'0'
            },
            {
                text: '视频',
                value:'1'
            },
            {
                text: '文章',
                value: '2'
            }
        ];
    }
    componentDidMount(){
        this.getFetch(1)
    }
    contentOnChange(value){
        this.setState({
            type:value.val
        },()=>( this.getFetch(1)))

    }

    stateOnChange(value){
        this.setState({
            status:value.val
        },()=>( this.getFetch(1)));
    }

    getFetch(page){
        var status = this.state.status;
        var type = this.state.type;
        fetch.get('/content/list?size=20&page='+page+'&status='+status+"&type="+type ,{loading: true})
            .then((data) => {
                var result = data.data;
                if(result.message == "success"){
                   this.setState({
                       totalPage :result.data.page.page_total,
                       data : result.data.list,
                       curPage:page,
                       curDateLength:result.data.list.length,
                       valid: true
                   });
                }
            });
    }

    changePager(page){
        if(page != this.state.curPage){
            this.getFetch(page);
        }
    }
    resetTable(){
        if(this.state.curDateLength <= 1 && this.state.curPage >1){
            this.getFetch(this.state.curPage-1);
            return false;
        }
        this.getFetch(this.state.curPage);
    }
    render(){
        return(
            <div className="contentManage">
                <div className="selectNav">
                    <div className="selectorBox">
                        <em>内容类型:</em>
                        <DropDown
                            name="contentType"
                            onChange={this.contentOnChange.bind(this)}
                            options={this.contentSelect}
                        />
                    </div>
                    <div className="selectorBox">
                        <em>审核状态:</em>
                        <DropDown
                            name="contentState"
                            onChange={this.stateOnChange.bind(this)}
                        />
                    </div>

                </div>
                <div>
                    <ContentList
                        valid={this.state.valid}
                        data={this.state.data}
                        type={this.state.type}
                        status={this.state.status}
                        resetTable={this.resetTable.bind(this)}/>
                    <Pager
                        page={this.state.curPage}
                        size= {this.state.totalPage}
                        ref={(pager) => {this.pager = pager;}}
                        callbackFn={this.changePager.bind(this)}
                    />
                    <div id="video_view"></div>
                </div>
            </div>
        );
    }
}

export default MainManage;