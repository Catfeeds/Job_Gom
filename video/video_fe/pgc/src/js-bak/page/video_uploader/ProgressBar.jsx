import React from 'react';
import ReactDOM from 'react-dom';
import {
	VIDEO_PENDING,
	VIDEO_UPLOAD_SUCCESS,
	VIDEO_UPLOAD_ERROR
} from '../../redux/action/video_uploader';
import Confirm from 'components/Confirm';

class ProgressBar extends React.Component{
	constructor(props){
		super(props);
	}

	// 准备取消上传
	handleCancel = () => {
		this.props.onPause();
		this.props.actions.showCancelDialog(true);
	}

	// 取消上传
	cancelUpload = () => {
		let props = this.props;
		props.onCancel();
		props.actions.resetUpload();
	}

	// 继续上传
	resume = () => {
		let props = this.props;
		props.onResume();
		props.actions.showCancelDialog(false);
	}

	closeReselectDialog = () => {
		this.props.actions.showReselectDialog(false);
	}

	handleReselect = () => {
		this.props.actions.showReselectDialog(true);
	}

	render() {
		let video = this.props;
		let status = video.status;
		let className = 'progress-bar ' + (video.visible ? 'show' : 'hide');
		let progress = video.percentage + '%';

		let statusText = '正在上传';
		let statusActionText = '取消上传'; // 点击弹出确认对话框
		let statusActionIcon = 'icon-4 cancel';
		let statusActionHandler = this.handleCancel;

		if(status === VIDEO_UPLOAD_SUCCESS){
			statusText = '上传成功，正在进行转码和审核';
			statusActionText = '重新选择视频';
			statusActionIcon = 'icon-3 reselect';
			statusActionHandler = this.handleReselect;
		} else if(status === VIDEO_UPLOAD_ERROR){
			statusText = video.errMsg || '上传失败，请重试';
			statusActionText = '重新选择视频';
			statusActionIcon = 'icon-3 reselect';
			statusActionHandler = this.handleReselect;
		}

		let confirmDialog = null;
		if(video.cancelDialogVisible){
			confirmDialog = (
				<Confirm 
					visible={true}
					title={"确定取消当前视频上传吗？"} 
					onClose={this.resume} 
					cancelValue={'继续上传'} 
					onCancel={this.resume} 
					okValue={'确定'} 
					onOk={this.cancelUpload} 
			/>);
		} else if(video.reselectDialogVisible){
			confirmDialog = (
				<Confirm 
					visible={true} 
					title={"确定重新选择视频吗？"} 
					onClose={this.closeReselectDialog} 
					onCancel={this.closeReselectDialog} 
					onOk={this.cancelUpload} 
			/>);
		}
		return (
			<div className={className}>
	            <div className="title">
	                <span className="name">{video.name}</span>
	            </div>
	            <div className="progress-wrap">
	                <div className="progress">
	                    <div className="percent" style={{width: progress}}></div>
	                    <span className="num">{progress}</span>
	                    <div className="action" onClick={statusActionHandler}>
	                        <em className={statusActionIcon}></em>
	                        <span>{statusActionText}</span>
	                    </div>
	                </div>
	                <div className="status">{statusText}</div>
	            </div>
	            {confirmDialog}
	        </div>
        )
	}
}

export default ProgressBar;
