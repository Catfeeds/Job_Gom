
/**
 分页组件

 ReactDom.render(
 <Page page = '1' size = '20'  callbackFn = {callbackFn}/>,
 document.getElementById('root')
 );
 page ：默认第一页
 size： 必传，数值大于1
 callbackFn(page) page回调


 **/

import React from 'react';
function pageArr(page, size){
    page = parseInt(page);
    size = parseInt(size);
    const num = [1,2,3,4,5,6,7,8,9];
    var  arr = [];
    var  s = [];
    if(size < 0){
        throw  Error('size is error');
    }else if(size < 10 && size > 0){
        num.length = size;
        arr = num;
    }else{

        var index = null;
        var dist = '...';
        if(page < 4){
            for(let i = 0; i < 5 ; i++){
                s.push(i+1);
            }
            arr = arr.concat(s,dist,size);
        }else if(page + 4 > size){

            for(let i = 0; i < 5 ; i++){
                s.push(size - 4 + i);
            }
            arr = arr.concat(1,dist,s);

        }else{
            for(let i = 0; i < 5 ; i++){
                s.push(page - 2 + i);
            }
            if(s[0]==2){
                arr = arr.concat(1,s,dist,size);
            }else if(s[s.length-1] == size-2){
                arr = arr.concat(1,dist,s,size -1,size);
            }else{
                arr = arr.concat(1,dist,s,dist,size);
            }
        }
    }
    return arr;
}


class Pager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page : parseInt(this.props.page) || 1,
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    getArr(){
        return pageArr(this.state.page,parseInt(this.props.size));
    }

    toFirstPage(page){
        this.setState({
            page : page
        });
    }

    getHtmlLi(pageNum){
        var arr = this.getArr();


        const listItem = arr.map((value,index)=>{
            var active = parseInt(pageNum) == value ? 'active' :'';
            var handleToPgeEvent = value === '...' ? ()=>{} : ()=>{this.handleToPageEvent(value)};
            var noClickClass = value==="..." ? "noClickClass" : "";
            var className = active +" " + noClickClass;
            return <li onClick={handleToPgeEvent} key={index}  className={className }><span >{value}</span></li>
        });



        return listItem;
    }

    handleToPageEvent(value ){
        var pageId = value;
        if(pageId != this.state.page){
            this.setState({page : pageId});
            this.props.callbackFn(pageId);
        }
    }

    // 上一页
    handlePrevClick(){
        var curPage = this.state.page;
        if (curPage == 1) {
            return ;
        } ;
        this.setState({page : curPage - 1});
        this.props.callbackFn(curPage - 1);
    }
    // 下一页
    handleNextClick(event){
        var curPage = this.state.page;
        if (curPage >= this.props.size) return ;
        this.setState({page : curPage + 1});
        this.props.callbackFn(curPage + 1);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.page || this.state.page
        })
    }

    render(){
        var hide = this.props.size <=1 ? 'hide' : '';
        var pageNum = this.state.page;
        var arr = this.getArr();
        var isFirstClass = pageNum ==1 ? 'hide' : '';
        var isLastClass = pageNum == arr[arr.length-1] ? 'hide' : '';
        return (
            <ul className={"pager clearfix " + hide}>
                <li className={isFirstClass} onClick={this.handlePrevClick}><span>&lt;</span></li>
                {this.getHtmlLi(this.state.page)}
                <li className={isLastClass} onClick={this.handleNextClick}><span>&gt;</span></li>
            </ul>
        );
    }
}
export default Pager;


