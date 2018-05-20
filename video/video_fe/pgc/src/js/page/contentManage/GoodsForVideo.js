import React, { Component } from 'react';
import TabSearch from 'config/bin/linfei.js';
import 'css/page/video_uploader/ueditor.css';

class GoodsForVideo extends Component{
    constructor(props){
        super(props);
        this.addGoods = this.addGoods.bind(this);
        this.state = {
            getCollectItem:'',
            env:'dev',
            pubName: 'Link'
        }
    }

    addGoods(){
        console.log(3);
        TabSearch.tabSearch({},9,this.state);
    }
    render(){
        return(
            <div className="form-input">

            <div className="shop-list clearfix">
                <a className="paste">
                    <em className="icon-4 del"></em>
                    <img src="http://js.dev.meixincdn.com/m/vpc/src/imgs/comment/paste-img.png"/>
                    <div className="paste-right">
                        <h6>红酒知识科普贴1</h6>
                        <p className="price">¥299</p>
                        <span>查看详情</span>
                    </div>
                </a>
                <a className="paste">
                    <em className="icon-4 del"></em>
                    <img src="http://js.dev.meixincdn.com/m/vpc/src/imgs/comment/paste-img.png"/>
                    <div className="paste-right">
                        <h6>红酒知识科普贴1</h6>
                        <p className="price">¥299</p>
                        <span>查看详情</span>
                    </div>
                </a>
            </div>
            <div className="add-shop" onClick={this.addGoods}><em className="icon-7"></em>添加</div>
        </div>);
    }
}

export default GoodsForVideo;