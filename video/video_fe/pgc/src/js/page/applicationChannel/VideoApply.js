import React, { Component } from 'react';

class VideoApply extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url1: '',
            url1Error: false,
            url1Msg:'',
            url2:'',
            url2Error: false,
            url2Msg:'',
            url3: '',
            url3Error: false,
            url3Msg:'',
        };
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    
    changeMsg(show,errorBox,errorText){
        switch(errorBox){
            case "url1":
                this.setState({
                    url1Msg: errorText,
                    url1Error: show
                });
            break;
            case "url2":
                this.setState({
                    url2Msg: errorText,
                    url2Error: show
                });
            break;
            case "url3":
                this.setState({
                    url3Msg: errorText,
                    url3Error: show
                });
            break;
            case "imgs":
                this.setState({
                    codeMsg: errorText,
                    codeError: show
                });
            break;
        }
    }
    
    handleBlur(event){
        const name = event.target.name;
        let url1 = this.state.url1;
        let url2 = this.state.url2;
        let url3 = this.state.url3;
        
        switch(name){
            case "url1":
                if(name==""){
                    
                }
            break;
        }
        
        
        
    }
    render(){
        return(
            <div className="av-form">
                <h2>视频渠道申请</h2>
                <div className="form-list">
                    <div className="form-group">
                        <label>
                            <span className="color-rad">*</span>
                            作品链接1：
                        </label>
                        <div className="form-input">
                            <input className="input-text" name="url1" type="text" placeholder="请输入链接地址" value={this.state.url1} onChange={this.handleChange.bind(this)}/>
                            <p className={this.state.url1Error ? "error show" : "error hide"} data-msg="url1">{this.state.url1Msg}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            作品链接2：
                        </label>
                        <div className="form-input">
                            <input className="input-text" name="url2" type="text" placeholder="请输入链接地址" value={this.state.url2} onChange={this.handleChange.bind(this)}/>
                            <p className={this.state.url2Error ? "error show" : "error hide"} data-msg="url2">{this.state.url2Msg}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            作品链接3：
                        </label>
                        <div className="form-input">
                            <input className="input-text" name="url3" type="text" placeholder="请输入链接地址" value={this.state.url3} onChange={this.handleChange.bind(this)}/>
                            <p className={this.state.url3Error ? "error show" : "error hide"} data-msg="url3">{this.state.url3Msg}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <span className="color-rad">*</span>
                            视频制作过程截图：
                        </label>
                        <div className="form-input upload-box">
                            <div className="upload-attention">仅支持JPG、JPEG、PNG图片文件，且文件小于4M</div>
                            <div className="clearfix">
                                <div className="upload-img img-apply">
                                    <div className="upload-add">
                                        <div className="add-item">
                                            <em className="icon-7"></em>
                                        </div>
                                        <input type="file" name="" value="" className="upload-btn" />
                                    </div>
                                    <div className="img-add">
                                        <div className="loading-bg">
                                            <span className="icon-20 indicator"></span>
                                        </div>
                                        <img src="//gfs10.gomein.net.cn/T1mfCjBgLT1RCvBVdK_c126_126.jpg" />
                                        <span className="icon-4 del"></span>
                                    </div>
                                </div>
                                <div className="upload-img img-apply">
                                    <div className="upload-add">
                                        <div className="add-item">
                                            <em className="icon-7"></em>
                                        </div>
                                        <input type="file" name="" value="" className="upload-btn" />
                                    </div>
                                </div>
                                <div className="upload-img img-apply">
                                    <div className="upload-add">
                                        <div className="add-item">
                                            <em className="icon-7"></em>
                                        </div>
                                        <input type="file" name="" value="" className="upload-btn" />
                                    </div>
                                </div>
                            </div>
                            <p className="error show">图片仅支持jpg、png、pneg格式</p>
                        </div>
                    </div>
                    <div className="btn-next2">
                        <input type="button" value="提交" className="btn submit" />
                        <input type="button" value="取消" className="btn change" />
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoApply;