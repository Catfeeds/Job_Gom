import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import Uploader from 'util/ImgUploader';
import Cropper from 'cropperjs';
import Dialog from 'components/Dialog';
import sampleIcon from '../../imgs/public/sample-icon.jpg';

var noop = function(){};
const STATUS_PENDING = 'pending';
const STATUS_SUCCESS = 'success';

class CropperDialog extends React.Component{
    constructor(props){
        super(props);
        this.cropper = null;
        this.state = {
            visible: props.visible
        }
    }

    close() {
        this.setState({
            visible: false
        });
    }

    destroyCropper(){
        let cropper = this.cropper;
        if(cropper){
            cropper.destroy();
        }
    }

    destroy(){
        this.destroyCropper();
        this.close();
        // 销毁裁剪组件
        ReactDom.unmountComponentAtNode(this.props.container);
    }

    componentDidMount(){
        var props = this.props;
        var {width, height} = props.size;

        var cropper = this.cropper = new Cropper(this.image, {
            aspectRatio: props.ratio,
            preview: '.crop-wrap .img_preview',
            viewMode: 1,
            dragMode: 'move',
            movable: false, // 不能移动图片
            toggleDragModeOnDblclick: false,
            zoomOnWheel: false,
            ready: function(){
                let options = cropper.options;
                let imageData = cropper.imageData;
                let ratio = imageData.width / imageData.naturalWidth;

                options.minCropBoxWidth = width * ratio;
                // ready后,设置宽高比,该方法内部会再次初始化CropBox
                // 这样就可以正确设置CropBox的最小宽、高
                cropper.setAspectRatio(props.ratio);
            }
        });
    }

    getCropper(){
        return this.cropper || {};
    }

    render(){
        let props = this.props;
        let width = '802px'; // 弹框宽度
        let clsName = '';
        let cropSection;
        let preview;

        if(props.ratio === 1){ // 头像裁剪模式
            width = '510px';
            clsName = ' avatar ';
            cropSection = (
                <div className="crop-section">
                    <h3>图片裁剪</h3>
                    <div className="cropper">
                        <img src={props.src} ref={(image) => { this.image = image; }} />
                    </div>
                </div>
            );
            preview = (
                <div className="preview">
                    <h3>封面预览</h3>
                    <div className="m img_preview"></div>
                    <p>65 * 65</p>
                    <div className="s img_preview"></div>
                    <p>20 * 20</p>
                </div>
            );
        } else { // 封面图裁剪
            let prevTitle = props.prevTitle;
            cropSection = (
                <div className="crop-section">
                    <h3>图片裁剪</h3>
                    <div className="cropper">
                        <img src={props.src} ref={(image) => { this.image = image; }} />
                    </div>
                </div>
            );
            preview = (
                <div className="preview">
                    <h3>封面预览</h3>
                    <div className="img-preview img_preview"></div>
                    <div className="sample">
                        <div className="title">
                            {prevTitle === '' ? '此处为标题' : prevTitle}
                        </div>
                        <img className="icon" src={sampleIcon} />
                    </div>
                </div>
            );
        }
        return (
            <Dialog
                visible={this.state.visible}
                title={props.title}
                style={
                    {width: width}
                }
                onClose={() => {
                    props.onCancel();
                    this.destroyCropper();
                    // 销毁裁剪组件
                    ReactDom.unmountComponentAtNode(this.props.container);
                }}
            >
                <div className={"crop-wrap clearfix" + clsName}>
                    {cropSection}
                    {preview}
                </div>
                <div className="dialog-footer">
                    <button className="btn sure-btn" onClick={() => {
                        let cropper = this.getCropper();
                        props.onCrop(cropper.getData(), props.src, cropper);
                        this.destroy();
                    }}>确定</button>
                    <button className="btn cancel-btn" onClick={() => {
                        props.onCancel();
                        this.destroy();
                    }}>取消</button>
                </div>
            </Dialog>
        )
    }
}

CropperDialog.defaultProps = {
    onCrop: noop, // 确认裁剪时触发
    onCancel: noop, // 取消裁剪时触发
    ratio: 16 / 9, // 宽高比
    title: '编辑封面图'
};

const withUploader = (WrappedComponent) => {

    class WithUploader extends React.Component {
        constructor(props) {
            super(props);

            this.uploader = null;
            this.pickEle = null; // 图片选择按钮的DOM节点

            var imgUrl = this.props.imgUrl;
            this.state = {
                // pending, selected, success, error
                status: imgUrl ? STATUS_SUCCESS : STATUS_PENDING,
                msg: '',
                thumb: '', // 预览图的src
                imgUrl: imgUrl // 图片上传成功后,服务端返回的图片地址
            };
            // 裁剪器的容器
            this.cropperContainer = null;
            this.defaultBodyCls = '';
        }

        setPicker = (ele) => {
            this.pickEle = ele;
        }

        handleChange() {
            this.props.onChange({...this.state});
        }

        error(msg) {
            this.setState({
                status: 'error',
                msg: msg
            }, this.handleChange);
        }

        update(status) {
            this.setState(status, this.handleChange);
        }

        setMsg(msg) {
            this.setState({
                msg: msg
            });
        }

        validateError = (error) => {
            let msg = '';
            // 校验格式, 大小
            if(error === 'Q_TYPE_DENIED'){
                msg = '图片仅支持JPG、PNG、JPEG格式';
            } else if(error === 'Q_EXCEED_SIZE_LIMIT'){
                msg = '图片大小不能超过4M';
            }
            // this.error(msg);
            this.setMsg(msg);
        }

        beforeFileQueued = (file) => {
            // 清除之前的error提示
            this.setMsg('');
        }

        fileQueued = (file) => {
            var uploader = this.uploader;
            var props = this.props;
            var {width, height} = props.size;
            var ratio = props.ratio || 1.78; // 16:9
            // var checkRatio = props.checkRatio;
            var that = this;

            uploader.makeThumb(file, function( error, src ) {
                var info = file._info;
                var w = info.width;
                var h = info.height;
                if(w < width || h < height){
                    that.setMsg(`图片像素不能低于${width}*${height}`);
                    uploader.reset();
                }/* else if(checkRatio && (w / h).toFixed(2) != ratio){
                 that.error('图片比例必须为16:9');
                 uploader.reset();
                 }*/ else {
                    // 初始化裁剪对象
                    that.initCrop(src);
                }
            }, 1, 1);
        }

        uploadError = () => {
            this.error('error');
        }

        uploadSuccess = (WUFile, json) => {
            if(json && json.code === 1){
                this.update({
                    status: STATUS_SUCCESS,
                    imgUrl: json.data.url,
                    msg: ''
                });
            } else {
                this.error(json.message || '上传失败，请重新上传');
            }
        }

        reset() {
            this.uploader.reset();
            this.update({
                status: STATUS_PENDING,
                msg: '',
                thumb: '',
                imgUrl: ''
            });
        }

        handleCrop = (data, src, cropperIns) => {
            // 更新上传组件状态,显示缩略图
            let floor = Math.floor;
            let w = floor(data.width);
            let h = floor(data.height);
            this.update({
                status: 'selected',
                thumb: cropperIns.getCroppedCanvas({
                    width: w,
                    height: h,
                    maxWidth: 4096,
                    maxHeight: 4096
                }).toDataURL()
            });
            // 设置上传数据
            let uploader = this.uploader;
            let formData = uploader.option('formData');
            uploader.option('formData', Object.assign({}, formData, {
                x: data.x,
                y: data.y,
                w: w,
                h: h
            }));
            // 开始上传
            uploader.upload();
        }

        initCrop(src) {
            let uploader = this.uploader;
            let props = this.props;
            let ratio = 16 / 9;
            let title = '编辑封面图';
            let prevTitle = props.prevTitle;

            let div = this.cropperContainer;
            if(!div){
                div = this.cropperContainer = document.createElement('div');
                // IE10及以下不支持append,增加兼容处理
                var body = document.body;
                if(body.append){
                    body.append(div);
                } else {
                    body.appendChild(div);
                }
            }

            if(props.imgType === 'avatar'){ // cover,avatar
                ratio = 1;
                title = '编辑头像';
            }

            ReactDom.render(
                <CropperDialog
                    src={src}
                    visible={true}
                    onCrop={this.handleCrop}
                    title={title}
                    ratio={ratio}
                    onCancel={uploader.reset.bind(uploader)}
                    size={props.size}
                    prevTitle={prevTitle ? prevTitle() : ''}
                    container={div} />,
                div
            );
        }

        componentWillMount() {
            this.handleChange();
        }

        componentDidMount() {
            // body上添加class,覆盖dialog的弹窗样式
            let cls = this.defaultBodyCls = document.body.className;
            document.body.className += ' page-video-uploader ';

            let props = this.props;
            let opts = {
                pick: {
                    id: this.pickEle,
                    multiple: props.multiple
                },
                formData: {
                    img_type: props.imgType // cover 封面图, avatar 头像
                },
                fileSizeLimit: props.fileSizeLimit
            };
            let uploader = this.uploader = Uploader(opts);
            uploader.on('error', this.validateError);
            uploader.on('beforeFileQueued', this.beforeFileQueued);
            uploader.on('fileQueued', this.fileQueued);
            uploader.on('uploadError', this.uploadError);
            uploader.on('uploadSuccess', this.uploadSuccess);
        }

        componentWillUnmount(){
            document.body.className = this.defaultBodyCls;
        }

        render() {
            let state = this.state;
            const injectedProp = {
                status: state.status,
                msg: state.msg,
                pickRef: this.setPicker,
                reset: this.reset.bind(this),
                thumb: state.thumb,
                imgUrl: state.imgUrl
            };

            return (
                <WrappedComponent
                    uploader={injectedProp}
                    {...this.props}
                />
            )
        }
    }

    WithUploader.defaultProps = {
        imgUrl: '', // 默认图片地址
        size: {width: 702, height: 394}, // 图片宽高
        imgType: 'cover',
        multiple: false, // 是否可多选
        ratio: 1.78, // 宽高比,默认16:9
        checkRatio: true, // 是否校验宽高比
        fileSizeLimit: 1024 * 1024 * 4, // 图片文件大小
        onChange: noop,
        prevTitle: noop
    };

    const getDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    WithUploader.displayName = `WithUploader(${getDisplayName(WrappedComponent)})`;

    return WithUploader;
}

export default withUploader;
