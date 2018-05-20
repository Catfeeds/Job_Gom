import { connect } from 'react-redux';
import * as VideoUploaderAction from '../action/video_uploader';
import Uploader from 'page/video_uploader/index';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
    return {...state.reducers.videoUploader};
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(VideoUploaderAction, dispatch)
})

const VideoUploader = connect(
    mapStateToProps,
    mapDispatchToProps
)(Uploader)

export default VideoUploader;
