import { 
	VIDEO_PENDING,
	VIDEO_SELECTED,
	CANCEL_UPLOAD_VIDEO, 
	UPLOAD_PROGRESS_UPDATE,
	VIDEO_UPLOAD_SUCCESS,
	VIDEO_UPLOAD_ERROR,
	UPLOAD_RESUME,
	SHOW_CANCEL_DIALOG,
	SHOW_RESELECT_DIALOG,
	SHOW_ERROR_DIALOG,
	VIDEO_ADD_SUCCESS,
	SHOW_TOAST
} from '../action/video_uploader.js';

let initialState = {
	status: VIDEO_PENDING,
	// 所选择的文件名
	name: '',
	// 上传百分比
	percentage: 0,
	// 文件大小
	size: 0,
	// 是否显示取消上传的dialog
	cancelDialogVisible: false,
	// 是否显示重新选择的dialog
	reselectDialogVisible: false,
	// toast提示
	toast: '',
	// 视频上传成功后获取到视频ID,默认值为0
	videoId: 0,
	errMsg: ''
};

/**
 * [视频上传的reducer]
 * @param  {Object} state  [当前所保存的视频数据 ]
 * @param  {Object} action [包含视频信息的JS对象, { name, progress, size, status } ]
 * @return {[type]}        [新的state]
 */
const videoUploader = (state = initialState, action) => {
	switch(action.type){
		case VIDEO_SELECTED:
			return {
				...state,
				...action.video
			}
		case UPLOAD_PROGRESS_UPDATE:
			return {
				...state,
				status: UPLOAD_PROGRESS_UPDATE,
				percentage: action.percentage
			}
		case VIDEO_UPLOAD_SUCCESS:
			return {
				...state,
				status: VIDEO_UPLOAD_SUCCESS
			}
		case VIDEO_UPLOAD_ERROR:
			return {
				...state,
				status: VIDEO_UPLOAD_ERROR,
				errMsg: action.errMsg
			}
		case CANCEL_UPLOAD_VIDEO:
			return Object.assign({}, initialState);
		case UPLOAD_RESUME:
			return {
				...state,
				status: UPLOAD_RESUME
			}
		case SHOW_RESELECT_DIALOG:
			return {
				...state,
				reselectDialogVisible: action.reselectDialogVisible
			}
		case SHOW_CANCEL_DIALOG:
			return {
				...state,
				cancelDialogVisible: action.cancelDialogVisible
			}
		case SHOW_ERROR_DIALOG:
			return {
				...state,
				errDialogVisible: action.errDialogVisible
			}
		case VIDEO_ADD_SUCCESS:
			return {
				...state,
				status: action.type
			}
		case SHOW_TOAST:
			return {
				...state,
				toast: action.toast
			}
		default:
			return state;
	}
}

export default videoUploader;
