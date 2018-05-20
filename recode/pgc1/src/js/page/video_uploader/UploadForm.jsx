import React from 'react';
import ImgUploader from 'components/ImgUploader';
import TitleField from 'components/TitleField';
import Notification from 'components/Notification';
import Tag from 'components/Tag';
import InputText from 'components/InputText';
import throttle from 'lodash/throttle'
import fetch from 'io/fetch';

class UploadForm extends React.Component{
	constructor(props){
		super(props);
        // 存储表单项的数据
        this.form = { // 视频标题
            title: '',
            tags: [],
            desc: '' // 视频简介
            /*image: { // 封面图
                status: 'pending',
                msg: '',
                thumb: null
            }*/
        };
        this.tagInstance = null; // 标签组件实例
        this.imgUploader = null; // 封面图组件实例
        this.titleInput = null; // 标题输入组件实例
	    this.notification = null; // toast实例
        this.throttleToast = null; // debouce过后的notification
    }

    onTitleChange = (title) => {
        this.form.title = title;
    }

    onDescChange = (desc) => {
        this.form.desc = desc;
    }

    onTagChange = (tags) => {
        this.form.tags = tags;
    }

    onCoverChange = (img) => {
        this.form.image = img;
    }

    validate() {
        var validate = true;
        var props = this.props;

        var form = this.form;
        var title = form.title;
        var tags = form.tags;
        var image = form.image;
        var imgUploader = this.imgUploader;
        var notification = this.throttleToast;

        if(props.status === 'UPLOAD_PROGRESS_UPDATE'){
            validate = false;
            notification({
                content: <span>视频未上传完成，请耐心等待</span>
            });
        } else if(props.status === 'VIDEO_UPLOAD_ERROR'){
            validate = false;
            notification({
                content: <span>视频上传失败，请重新上传</span>
            });
        }


        if(!title.length){
            this.titleInput.error('请填写标题');
            validate = false;
        }
        if(!tags.length){
            this.tagInstance.showError('请添加标签');
            validate = false;
        }

        switch(image.status){
            case 'pending':
                imgUploader.setMsg('请添加封面图');
                validate = false;
                break;
            case 'selected':
                validate = false;
                notification({
                    content: <span>封面图未上传完成，请耐心等待</span>
                });
                break;
            case 'error':
                imgUploader.error('上传失败，请重新上传');
                validate = false;
                return;
        }

        return validate;
    }

    submit = () => {
        if(this.validate()){
            var that = this;
            var form = this.form;

            var params = {
                title: form.title,
                description: form.desc,
                tags: form.tags.join(','),
                image: form.image.imgUrl,
                video_id: this.props.videoId // 视频id
            };
            fetch.post('/video/add', params).then(function(json){
                if(json && json.data && json.data.code === 1){
                    // 视频添加成功
                    that.props.actions.addSuccess();
                } else {
                    // 视频添加失败
                    
                }
            }).catch(function(err){
                if(err && err.message){
                    
                }
            });
        }
    }

    getTitle = () => {
        return this.form.title;
    }

    componentDidMount(){
        this.notification = Notification();
        this.throttleToast = throttle(this.notification.notice, 2000, {
            leading: true,
            trailing: false
        });
    }

    componentWillUnmount(){
        this.notification.destroy();
    }

	render() {
        let props = this.props;
        if(props.visible){
    		return (
    			<div className='upload-form'>
                    <div className="line"></div>
                    <div className="form">
                        <div className="form-group">
                            <label>
                                <span className="color-rad">*</span>
                                标题：
                            </label>
                            <TitleField 
                                ref={(input) => {this.titleInput = input}} 
                                onChange={this.onTitleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                简介描述：
                            </label>
                            <div className="form-input">
                                <InputText onChange={this.onDescChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                <span className="color-rad">*</span>
                                标签：
                            </label>
                            <Tag 
                                ref={(tag) => {this.tagInstance = tag}} 
                                tags={props.tags} 
                                onChange={this.onTagChange} 
                            />
                        </div>
                        <ImgUploader 
                            ref={(loader) => {this.imgUploader = loader}}
                            onChange={this.onCoverChange} 
                            prevTitle={this.getTitle}
                        />
                        <button className="btn submit" onClick={this.submit}>提交</button>
                    </div>
                </div>
            )
        } else {
            return null;
        }
	}
}

export default UploadForm;
