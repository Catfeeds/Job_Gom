/**
 *
 Created by zhangzhao on 2017/8/3.
 Email: zhangzhao@gomeplus.com
 */
import React, {Component} from 'react';
import {env} from 'util/phpCommon';
class VidowPreview extends Component{
    constructor(props){
        super(props);
        this.state = {
            detail: null
        }
    }
    componentDidMount() {
        this.v1 = new MeixinPlayer();
        this.v1.init(this.props.data.video_id, 'videoContainer', {
            type: 'vod', // 直播：live，点播：vod
            poster: '', // 播放器封面图
            env: env, // dev, pre, dist
        });
    }
    componentWillUnmount() {
        this.v1.stopVideo();
    }
    renderTags() {
        let tags = this.props.data.tags.split[','];
        return tags ? tags.map(current=>{
            return <a href="javascript:void 0" >{current}</a>
        }) : null;
    }
    render(){
        let {title, description, subscribe} = this.props.data;
        return (
            <div className="vm-preview">
                <div>
                    <div className="video-container" id="videoContainer"></div>
                    <div className="vm-title">
                        <h1>{title}</h1>
                    </div>

                    { subscribe && subscribe.name ?
                    <div className="vm-header">
                        <div className="img"><img src={subscribe.image} /></div>
                        <div className="text">
                            <div>{subscribe.name}</div>
                        </div>
                    </div> : ""}
                    <div className="vm-content" dangerouslySetInnerHTML={{__html: description}}>
                    </div>


                    <div className="clearfix tag-share">
                        <div className="label fl">
                            {
                                this.renderTags()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export  default VidowPreview