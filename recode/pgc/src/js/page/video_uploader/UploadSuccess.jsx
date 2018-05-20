import React from 'react';
import { Link } from 'react-router-dom';

const UploadSuccess = (props) => {
	return (
		<div className="upload-success">
			<div className="icon-2 icon-suc"></div>
			<div className="title">上传成功</div>
			<div className="tip">视频正在转码审核阶段，请耐心等待...</div>
			<div className="action">
				<button className="btn continue" onClick={props.reset}>继续上传</button>
				<Link to='/portal/videoManage' className="btn mgr">前往视频管理</Link>
			</div>
		</div>
	);
}

export default UploadSuccess;