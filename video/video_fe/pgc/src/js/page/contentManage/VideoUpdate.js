/**
 * [视频信息修改]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {history} from 'store';

import 'css/page/video_uploader/index.scss';
import InputText from 'components/InputText';
import ImgUploader from 'components/ImgUploader';
import TitleField from 'components/TitleField';
import toast from 'components/Toast';
import Tag from 'components/Tag';
import VideoService from 'api/video';
//import GoodsForVideo from './GoodsForVideo';
// 面包屑导航
class Crumbs extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="crumbs">
                <Link to="/portal/contentManage">内容管理</Link>
                <span>&gt;</span>
                <b>修改视频资料</b>
            </div>
        );
    }
}

class UpdateForm extends Component {
    constructor(props) {
        super(props)
        this.form = {
            title : this.props.title,
            description: this.props.description,
            image :this.props.image,
            tags: this.props.tags
        }
        this.state={
            a: this.props.title,
            title : this.props.title,
            description: this.props.description,
            image :this.props.image,
            tags: this.props.tags,
            disabled: false
        }
        this.nameInput = null;
        this.desInput = null;
        this.imgUploader = null;

    }

    validate=()=> {
        var validate = true;

        var form = this.form;
        var title = form.title;
        var tags = form.tags;
        var image = form.image;
        var imgUploader = this.imgUploader;

        if(!title.length){
            this.titleInput.error('请填写标题');
            validate = false;
        }
        if(!tags.length){
            this.tagInstance.showError('请添加标签');
            validate = false;
        }

        if (image && image.status) {
            switch(image.status){
                case 'pending':
                    imgUploader.setMsg('请添加封面图');
                    validate = false;
                    break;
                case 'selected':
                    validate = false;
                    toast({
                        content: <span>{'封面图未上传完成，请耐心等待'}</span>,
                        onClose: function(){
                            console.log('close 2')
                        }
                    });
                    break;
                case 'error':
                    imgUploader.error('上传失败，请重新上传');
                    validate = false;
                    return;
            }
        }

        return validate;
    }

    modify=()=> {
        var that = this;
        if (this.validate()) {
            VideoService.update({
                content_id: this.props.id,
                title: this.form.title,
                tags: this.form.tags.join(','),
                image: this.form.image.imgUrl,
                description: this.form.description
            }).then(ret=>{
                let data = ret.data;
                if (data.code === 1) {
                    // close();
                    that.props.fetchData();
                    toast({
                        content: <span>{'修改成功'}</span>,
                        onClose: function(){
                            that.props.history.replace('/portal/contentManage');
                        }
                    });
                } else {
                    toast({
                        content: <span>{'修改失败'}</span>,
                        onClose: function(){
                            // console.log('close 2')
                        }
                    });
                }
            });
        }
    }

    cancel = ()=>{
        this.props.history.replace('/portal/contentManage');
    }

    onTitleChange = (title)=> {
        this.form.title = title;
        this.setDisabled();
    }

    onTagChange = (tags)=> {
        this.form.tags = tags;
        this.setDisabled();
    }

    onCoverChange = (img) => {
        this.form.image = img;
        this.setDisabled();
    }

    onDescChange = (desc) => {
        this.form.description = desc;
        //this.setDisabled();
    }

    initVal=(editor)=> {
        editor.setData(this.props.description);
    }

    setDisabled=()=> {
        if (this.form.title === '' ||
            this.form.tags.length ===0 || this.form.image.imgUrl === "") {
            this.setState({
                disabled: true
            });
        } else {
            this.setState({
                disabled: false
            });
        }
    }

    getTitle = () => {
        return this.form.title;
    }

    componentDidMount() {
       // this.notification = Notification();
    }

    componentWillReceiveProps(nextPrep){
        this.form = {
            title : nextPrep.title,
            description: nextPrep.description,
            image :nextPrep.image,
            tags: nextPrep.tags
        };
        this.setDisabled();
    }

    render () {
        let disabled = false;
        return (
            <div className="video-update">
                <div className="video-uploader">
                    <div className='upload-form'>
                        <div className="form">
                            <div className="form-group">
                                <label>
                                    <span className="color-rad">*</span>
                                    标题：
                                </label>
                                <TitleField
                                    ref={(input) => {this.titleInput = input}}
                                    value={this.form.title}
                                    onChange={(val)=>{this.onTitleChange(val)}}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    简介描述：
                                </label>
                                <div className="form-input">
                                    <InputText onChange={this.onDescChange} value={this.form.description} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    <span className="color-rad">*</span>
                                    标签：
                                </label>
                                <Tag
                                    ref={(tag) => {this.tagInstance = tag}}
                                    tags={this.form.tags}
                                    onChange={(val)=>{this.onTagChange(val)}}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <span className="color-rad"></span>
                                    添加商品：
                                </label>
                                {/*<GoodsForVideo />*/}
                            </div>
                            <ImgUploader
                                ref={(loader) => {this.imgUploader = loader}}
                                onChange={(val)=>{this.onCoverChange(val)}}
                                imgUrl={this.form.image}
                                prevTitle={this.getTitle}
                            />
                        </div>
                    </div>
                </div>
                <div className="video-update-btns">
                    <button onClick={this.modify} className="btn video-update-submit">提交</button>
                    <button onClick={this.cancel} className="btn video-update-cancel">取消</button>
                </div>
            </div>

        )
    }
}

// 视频资料修改
class VideoUpdate extends Component{
    constructor(props){
        super(props);
        this.params = this.props.match.params;
        this.state = {
            id: 0,
            tags: [],
            title: '',
            image: '',
            description: ''
        };
    }

    componentDidMount(){
        if (typeof this.params === 'undefined') {
            return false;
        }
        this.onModify(this.params.id);
    }

    onModify=(id)=> {
        let that = this;
        VideoService.view(id).then(ret=>{
            let data = ret.data;
            if (data.code === 1) {
                let id = this.props.match.params.id;
                let tags = data.data.tags.split(',');
                let title = data.data.title;
                let image = data.data.image;
                let description = data.data.description;

                that.setState({
                    id,
                    tags,
                    title,
                    image,
                    description
                });

            } else {
                toast({
                    content: '请求失败'
                });
            }
        });
    }

    render(){

        if (this.state.id) {
            return (
                <div className="video-update-wrap contentManage">
                    <Crumbs />
                    <UpdateForm
                        fetchData={()=>{}}
                        id={this.state.id}
                        description={this.state.description}
                        tags={this.state.tags}
                        title={this.state.title}
                        image={this.state.image}
                        history={this.props.history}
                    />
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default VideoUpdate;

