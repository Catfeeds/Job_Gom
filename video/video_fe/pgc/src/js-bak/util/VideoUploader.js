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
	// 自动上传
    auto: false,

    // 文件接收服务端
    server: httpConfig[process.env.NODE_ENV] + '/api/video/upload', 
    // server: 'http://127.0.0.1/fileupload.php',

    // 选择文件的按钮。可选
    // 内部根据当前运行时创建，可能是input元素，也可能是flash.
    pick: '',

    // 只允许选择文件，可选。
    accept: {
        title: 'Videos',
        extensions: 'mp4,flv,avi,rmvb,wmv,mkv,mov,ts',
        mimeTypes: 'video/*'
    },

    // 不生成缩略图
    thumb: false,

    // 不压缩视频
    compress: false,

    // 开启分片上传
    chunked: true,

    // 分片大小 1mb
    chunkSize: 1024 * 1024 * 1,

    // 文件总数量
   	fileNumLimit: 1,

   	// 单个视频大小: 10G
   	fileSizeLimit: 1024 * 1024 * 1024 * 10,

    // 二进制形式上传文件
    sendAsBinary: true,

    // 上传并发数
    threads: 1
};

const Uploader = (opts = {}) => {
	let uploader = WebUploader.create(Object.assign({}, defaults, opts));
	return uploader;
};

export default Uploader;
