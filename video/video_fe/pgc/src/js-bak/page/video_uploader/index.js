/* css */
import 'css/page/video_uploader/index.scss';

import React from 'react';
import Uploader from 'util/VideoUploader';
import Alert from 'components/Alert';
import fetch from 'io/fetch';
import NoAuth from 'components/BlankPage';
import {page} from 'util/phpCommon';
import {Prompt} from 'react-router-dom';

import FileSelector from './FileSelector';
import ProgressBar from './ProgressBar';
import UploadForm from './UploadForm';
import UploadSuccess from './UploadSuccess';
import pubsub from 'io/pubsub';
import Confirm from 'components/Confirm';

class VideoUploader extends React.Component {
    constructor(props) {
    	super(props);
        this.uploader = null;
        this.errorMsg = ''; // 视频上传过程中的错误信息
    }

    validateError(errorMsg) {
        if(errorMsg === 'Q_TYPE_DENIED'){
            this.errMsg = '格式不支持';
        } else if(errorMsg === 'Q_EXCEED_SIZE_LIMIT'){
            this.errMsg = '文件大小超过限制';
        }
        this.props.actions.showErrMsg(true);
    }

    fileQueued(file) {
        var uploader = this.uploader;
        var that = this;
        // 发送请求获取视频id
        fetch.post('/video/generateVideo', {
            file_name: file.name
        }, {
            loading: false
        }).then(function(json){
            if(json && json.data && json.data.code === 1){
                file.videoId = json.data.data.video_id;
                that.props.actions.videoSelected(file);
                uploader.upload();
            } else {
                that.errMsg = '上传失败';
                this.props.actions.showErrMsg(true);
            }
        }).catch(function(err){
            // if(err && err.message){
                // that.errMsg = err.message;
                that.errMsg = '上传失败';
                that.props.actions.showErrMsg(true);
            // }
        });
    }

    uploadBeforeSend(chunk, data, headers) {
        data.video_id = this.props.videoId;
        data.file_name = chunk.file.name;
        headers['X-Content-Range'] = 'bytes '+ chunk.start + '-' + (chunk.end - 1) + '/'+ chunk.total;
        headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    progressUpdated(file, percentage) {
        this.props.actions.progressUpdate(percentage);
    }

    uploadError(file,reason) {
        let offLineStatus = 'abort';
        if (reason === offLineStatus) {
            this.errMsg = '网络异常，请稍后重试';
            this.props.actions.showErrMsg(true);
        }
    }

    uploadSuccess(WUFile, json) {
        var actions = this.props.actions;
        if(json && json.code === 1){
            actions.uploadSuccess();
        } else {
            var msg = '';
            if('视频重复，请选择其他视频' === json.message){
                msg = '该视频已存在，请重新选择视频';
            }
            actions.uploadError(msg);
        }
    }

    componentDidMount() {
        let uploader = this.uploader = Uploader({
            pick: {
                id: '.file-picker',
                multiple: false
            }
        });
        uploader.on('error', this.validateError.bind(this));
        uploader.on('fileQueued', this.fileQueued.bind(this));
        // 分片上传时,会触发多次,用来附加header参数
        uploader.on('uploadBeforeSend', this.uploadBeforeSend.bind(this));
        uploader.on('uploadProgress', this.progressUpdated.bind(this));
        uploader.on('uploadError', this.uploadError.bind(this));
        uploader.on('uploadSuccess', this.uploadSuccess.bind(this));
        // 监听该channel,然后reset到文件选择页
        pubsub('reset_uploader').sub(() => {
            this.reset();
        });
    }

    componentWillUnmount() {
        this.reset();
        page.isUploading = false;
    }

    onPause = () => {
        this.uploader.stop(true);
    }

    onResume = () => {
        this.uploader.upload();
    }

    onCancel = () => {
        var that = this;
        fetch.get('/video/cancelUpload?video_id=' + this.props.videoId).then(function(json){
            if(json && json.data && json.data.code === 1){
                that.reset();
                // that.uploader.reset();
            } else {
                // 取消上传失败,如何处理
                // that.props.actions.showErrMsg(true);
            }
        }).catch(function(err){
            if(err && err.message){
                that.errMsg = err.message;
                that.props.actions.showErrMsg(true);
            }
        });
    }

    onAlertClose = () => {
        this.props.actions.showErrMsg(false);
    }

    reset = () => {
        this.uploader.reset();
        this.props.actions.resetUpload();
    }

    render() {
        let props = this.props;
        let status = props.status;
        let uploadSuccess = null;
        // 进度条和表单页是否可见
        let detailVisible = status !== 'VIDEO_PENDING' && status !== 'VIDEO_ADD_SUCCESS';

        if (detailVisible) {
            page.isUploading = true;
        }

        if(status === 'VIDEO_ADD_SUCCESS'){
            uploadSuccess = <UploadSuccess reset={this.reset} />;
        }
        if(page.approve_status != '1'){
            return (
                <NoAuth tag={'noLimit'} />
            )
        } else {
    		return (
                <div className="video-uploader">
                    <FileSelector actions={props.actions} visible={status === 'VIDEO_PENDING'} />
                    <ProgressBar {...props} 
                        onPause={this.onPause} 
                        onResume={this.onResume} 
                        onCancel={this.onCancel} 
                        visible={detailVisible}
                    />
                    <UploadForm 
                        status={status} 
                        videoId={props.videoId} 
                        actions={props.actions} 
                        visible={detailVisible} 
                    />
                    {uploadSuccess}
                    <Alert 
                        visible={props.errDialogVisible} 
                        msg={this.errMsg} 
                        onClose={this.onAlertClose}
                    />
                    <Prompt 
                        message="确定离开此页面吗？" 
                        when={detailVisible}
                    />
                </div>
            )
    	}
    }
}

export default VideoUploader;
