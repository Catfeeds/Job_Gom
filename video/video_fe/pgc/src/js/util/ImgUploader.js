/**
 * 上传工具类:
 * 	因为只考虑IE10及以上的浏览器，所以，选择了html5 only的版本；
 *  官方1.1.7版,提供了不依赖jq的版本,但修改并不完整,所以,该模块的运行依赖jquery；
 * 
 * 此模块封装了webuploader的调用,分为上传图片和上传视频两种
 * 调用方法：
 *
 * 
 */

import WebUploader from 'vendor/webuploader.html5only.js';
import httpConfig from '../io/http.config.js';

const defaults = {
	// 因为要检测图片宽高比,不自动上传
    auto: false,

    // 文件接收服务端
    server: httpConfig[process.env.NODE_ENV] + '/api/upload/image', 
    // server: 'http://127.0.0.1/fileupload.php', 

    // 选择文件的按钮。可选
    pick: '',

    // 只允许选择文件，可选。
    accept: {
        title: 'Images',
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },

    // sendAsBinary: true,

    fileVal: 'image',

    /*formData: {
        img_type: 'cover'
    },*/

    // 图片总数量
    fileNumLimit: 1,

    // 图片大小: 4mb
    fileSizeLimit: 1024 * 1024 * 4,

    // 是否允许压缩图片
    compress: false
};

const Uploader = (opts = {}) => {
	return WebUploader.create(Object.assign({}, defaults, opts));
};

export default Uploader;
