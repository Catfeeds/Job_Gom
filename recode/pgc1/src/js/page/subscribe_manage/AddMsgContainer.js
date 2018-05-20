import React, {Component} from 'react';
import fetch from 'io/fetch';

class  AddVideoContainer extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state={
            data : [],
            nodata: null,
            chosedData : [],
            curPage : 0,
            tootlePage : 0
        }
        this.videoUrl='subscribe/needAddSubscribeVideoList?subscribe_id='+this.props.subscribe_id+'&page=';
        this.articleUrl ='article/needAddSubscribeArticleList?subscribe_id='+this.props.subscribe_id+'&page=';
    }

    _fetchData(page){
        var url = this.props.type =="video" ? this.videoUrl : this.articleUrl;
        fetch.get(url+page)
            .then((data) => {
                this.setState((prevState)=>({
                    data : prevState.data.concat(data.data.data.list),
                    tootlePage :  data.data.data.page.page_total,
                    curPage : page,
                    nodata : 'no'
                }));
            })
    }

    componentWillMount(){
        this._fetchData(1);
    }

    _getVideoList(page){
        var data =this.state.data;
        var li_style = '';
        switch (data.length){
            case 1 :  li_style = ' only'; break;
            case 2 : li_style = ' double-left'; break;
            default: break;
        }

        if(this.state.nodata && data.length == 0){
            return (
                <li  className ="markedWorld">
                    <div>您没有未添加美号的视频 </div>
                </li>
            );
        }else{
            return data.map((value,index)=>{
                var activeClass = value.active == undefined ? "" :value.active;
                var active = 'fl ' + activeClass + li_style;
                return (
                    <li className={active} key={index}  >
                        <div className="hover">
                            <div className="video-img" onClick={()=>{this.handleClick(index)}} data-imgId={index}>
                                <img width="170" height="96" src={value.image}/>
                                <span></span>
                                <div className="hoverStyle" data-stateId={index}></div>
                            </div>
                            <div className="video-title" title={value.title}>{value.title}</div>
                        </div>
                    </li>
                );
            });
        }
    }



    handleClick(elmId){
        this.setState((prevState)=>{
            var dataObj = prevState.data[elmId];
            var newChosed = prevState.chosedData;
            var id =this.props.type=="video" ? dataObj.video_id : dataObj.article_id;

            if(dataObj.active && dataObj.active == 'active'){
                dataObj.active = '';
                var deletId = newChosed.indexOf(id,0);
                if(deletId != -1){
                    newChosed.splice(deletId,1)
                }
            }else{
                dataObj.active = 'active';
                newChosed.push(id);
            }
            this.props.getChosedData(newChosed);

            return {
                data:this.state.data,
                chosedData: newChosed
            }
        });
    }

     _articleList(){
         var data = this.state.data;
          if(this.state.nodata && this.state.data.length == 0){
             return (
                 <li  className ="markedWorld">
                  <div>您没有未添加美号的图文 </div>
                 </li>
             );
          }else{
              return data.map((value,index)=>{
                  var activeClass = value.active == undefined? "" :value.active;
                  var className= "articleList " + activeClass;
                  return (
                        <li className= {className} key={index} onClick={()=>{this.handleClick(index)}}>
                            <div className="hover"><em ></em><span>{value.name}</span></div>
                        </li>
                  );
              });
          }
     }
     
    //鼠标滚动事件
    handleScroll(event){
        event.stopPropagation();
        event.preventDefault();
        var elm = event.target;
        let clientHeight = elm.clientHeight; //可视区域高度
        let scrollTop  = elm.scrollTop;  //滚动条滚动高度
        let scrollHeight = elm.scrollHeight; //滚动内容高度

        if((clientHeight+scrollTop)==(scrollHeight)) { //如果滚动到底部
            var newPage = parseInt(this.state.curPage)+ 1;
            if(newPage <= this.state.tootlePage){
                this._fetchData(newPage)
            }
        }
    }

    render(){
        var list = this.props.type=="video" ?  this._getVideoList(this.state.curPage)  : this._articleList();
        var ulClassName = this.props.type=="video"? "ul videoList clearfix" :"ul subList clearfix";
        return(
            <div className="messageContain" onScroll={this.handleScroll}
                 style={{width: 590 + 'px',maxHeight: 270+'px',minHeight: 130 +'px'}}>
                <ul className={ulClassName}>
                    {list}
                </ul>
            </div>
        );
    }
}
export  default  AddVideoContainer