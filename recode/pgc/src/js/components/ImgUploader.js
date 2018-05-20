import React from 'react';
import withUploader from 'components/Uploader';

class Thumbnail extends React.Component {
	constructor(props){
		super(props);
	}

	handleDel = () => {
		this.props.onDel();
	}

	render() {
		let props = this.props;
		let status = props.status;
		let indicator = null;
		if(status !== 'success' && status !== 'error'){
			indicator = <span className="icon-20 indicator"></span>;
		}
		return (
			<div className="thumb">
				{indicator}
				<img src={props.src} />
				<span className="icon-4 del" onClick={this.handleDel}></span>
			</div>
		)
	}
}

class ImgUploader extends React.Component{

	constructor(props){
		super(props);
	}

	// 上传成功后删除的事件处理
	handleDel = () => {
		this.props.uploader.reset();
	}

	render() {
		let props = this.props;
		let uploader = props.uploader;
		let label = props.label || '上传封面图：';
		let imgType = props.imgType;

		let status = uploader.status;
		let msg = uploader.msg;
		let thumb = uploader.thumb;
		let imgUrl = uploader.imgUrl;

		let remark = null; // 备注
		let thumbnail = null; // 缩略图
		let visibility = 'hidden'; // 是否展示选择器
		let imgSrc;
		if(imgUrl.length){
			imgSrc = imgUrl;
		} else if(thumb.length){
			imgSrc = thumb;
		}

		if(imgSrc){ // 预览
			thumbnail = <Thumbnail src={imgSrc} status={status} onDel={this.handleDel} />;
		} else {
			visibility = 'visible';
		}

		if(imgType === 'cover'){
			remark = (<span className="remark" style={{color: '#f55050', marginLeft: 0}}>702*394</span>);
		}

		let showErr = msg.length ? 'show' : 'hide';

		return (
			<div className="form-group">
			    <label className="picker-label">
			    	<span className="color-rad">*</span>
			    	{label}
			    </label>
			    <div className="form-input picker-box">
			    	<div className="picker-wrap" style={{visibility: visibility}} ref={uploader.pickRef}>
			        	<div className="cover-picker"></div>
			        </div>
			        {thumbnail}
			        <span className="remark">{props.remark || '仅支持JPG、JPEG、PNG图片文件，且文件小于4M，像素大于'}</span>
			        {remark}
			        <p className={'error picker-error ' + showErr}>{msg}</p>
			    </div>
			</div>
		)
	}
}

export default withUploader(ImgUploader);
