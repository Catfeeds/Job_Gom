/**
 * 视频上传的action
 */

// 未进行上传操作时
export const VIDEO_PENDING = 'VIDEO_PENDING';

// 在资源管理器中选中视频后
export const VIDEO_SELECTED = 'VIDEO_SELECTED';

// 开始上传视频
export const START_UPLOAD_VIDEO = 'START_UPLOAD_VIDEO';

// 取消上传
export const CANCEL_UPLOAD_VIDEO = 'CANCEL_UPLOAD_VIDEO';

// 上传进度更新
export const UPLOAD_PROGRESS_UPDATE = 'UPLOAD_PROGRESS_UPDATE';

// 重新上传
export const RE_UPLOAD_VIDEO = 'RE_UPLOAD_VIDEO';

// 视频上传成功
export const VIDEO_UPLOAD_SUCCESS = 'VIDEO_UPLOAD_SUCCESS';

// 视频上传失败
export const VIDEO_UPLOAD_ERROR = 'VIDEO_UPLOAD_ERROR';

// 显示取消上传的对话框
export const SHOW_CANCEL_DIALOG = 'SHOW_CANCEL_DIALOG';

// 显示重新选择的对话框
export const SHOW_RESELECT_DIALOG = 'SHOW_RESELECT_DIALOG';

// 显示错误提示信息
export const SHOW_ERROR_DIALOG = 'SHOW_ERROR_DIALOG';

// 视频添加成功
export const VIDEO_ADD_SUCCESS = 'VIDEO_ADD_SUCCESS';

// 是否显示toast提示
export const SHOW_TOAST = 'SHOW_TOAST';

// 文件选择完成后
export const videoSelected = (video) => {
	let { name, size, percentage } = video;
	return {
		type: VIDEO_SELECTED,
		video: {
			name: video.name,
			size: video.size,
			percentage: 0, 
			status: VIDEO_SELECTED,
			cancelDialogVisible: false,
			reselectDialogVisible: false,
			videoId: video.videoId
		}
	}
}

// 进度更新后
export const progressUpdate = (percentage) => {
	return {
		type: UPLOAD_PROGRESS_UPDATE,
		percentage: parseInt(percentage * 100, 10)
	}
}

// 上传成功
export const uploadSuccess = () => {
	return {
		type: VIDEO_UPLOAD_SUCCESS,
		status: VIDEO_UPLOAD_SUCCESS
	}
}

export const uploadError = (errMsg) => {
	return {
		type: VIDEO_UPLOAD_ERROR,
		status: VIDEO_UPLOAD_ERROR,
		errMsg: errMsg
	}
}

// 取消上传/重置上传
export const resetUpload = () => {
	return {
		type: CANCEL_UPLOAD_VIDEO,
		status: CANCEL_UPLOAD_VIDEO
	}
}

// 显示取消上传的对话框
export const showCancelDialog = (visible) => {
	return {
		type: SHOW_CANCEL_DIALOG,
		cancelDialogVisible: visible
	}
}

// 显示重新上传的对话框
export const showReselectDialog = (visible) => {
	return {
		type: SHOW_RESELECT_DIALOG,
		reselectDialogVisible: visible
	}
}

export const showErrMsg = (visible) => {
	return {
		type: SHOW_ERROR_DIALOG,
		errDialogVisible: visible
	}
}

// 视频添加成功
export const addSuccess = () => {
	return {
		type: VIDEO_ADD_SUCCESS
	}
}

export const showToast = (toast) => {
	return {
		type: SHOW_TOAST,
		toast: toast
	}
}
