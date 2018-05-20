var codeTpl = require('./upload.tpl');
var imgPath = $GLOBAL_CONFIG['pcimgpath'];

$('body').append(codeTpl({
    imgPath: imgPath
}));

var fetch = require('io/fetch');
var url = require('io/url');
var qrTips = require('module/i18n');
var alert = require('module/popup/alert');
var config = require('editor/config');
var imgReplace = require('utils/imgReplace');
var domain = $_CONFIG['group_domain'];

var pageId = window.pageId;
var maxLen = config.imgLimitNUm;
var pageId = window.pageId;
function Scans(o) {
    this.qid = o.qid || 'single'; //是否创建实例的唯一标示
    this.topicQrId = "";
    this.$parent = o.$parent; //用于寻找插入图片的节点
    this.uploadMaxNum = o.maxNum || 20; //上传图片限制
    //this.currentMaxNum = 0; //当前能够上传图片
    this.useNewCode = 0; //二维码是否过期的判断
    this.interval = 0;
    this.type = o.type || 'pubsliser'; //扫码来源  评论页？发布话题页？等
    this.$showBox = o.$showBox; //二维码弹层
    this.time = o.time || 2000; //轮询请求间隔
    this.customInit = o.customInit || "";
    this.customCb = o.customCb; //用户自定义回调函数
    this.isLoad = 0;
    // this.$insertDom = o.$insertDom; //插入图片的节点
    this.imgArr = []; //存储二维码未过期时，获得的的图片总数
    this.editor = o.editor || ""; //用于编辑器
    this.$cover = o.$showBox.find('[data-node="cover"]'); //是否上传中
    this.$localBtn = o.$showBox.find('[data-node="upLocal"]'); //是否上传中
    this.$target = o.$target;
    this.code = "";
    this.btn = o.btn;

}

Scans.prototype = {
    constructor: Scans,
    init: function() {
        var _this = this;
        if (_this.editor) {
            //
            /*_this.editor.document.body.addEventListener('DOMNodeRemoved', function(evt) {
                var code = evt.keyCode || evt.which
                if (code == 8) {
                    var target = evt.target
                    debugger;
                    console.log(target.nodeName, target.previousSibling, target.previousSibling.nodeName)
                    if (target.nodeName == "#text") {
                        if (target.previousSibling && target.previousSibling.nodeName == "IMG") {
            console.log(333)
                        }
                    }
                }
            })*/

            /*$(_this.editor.document).on('DOMNodeRemoved DOMNodeInserted', 'img', function(e) {
                if (_this.interval) {
                    //console.log(666)
                    setTimeout(function() {
                        _this.sendNum();
                    }, 100)

                }
            })*/

            $(_this.editor.body).on('click', function(e) {
                //$webUpLoader.destroy();
                _this.hide();
                e.preventDefault();
            })
        }

        if (typeof _this.customInit == 'function') {
            this.customInit(this);
        }
        $('body').on('click', /* _this.$showBox*/ '[data-node="picPopBox"]', function(e) {
            var tagName = e.target.tagName;
            tagName = tagName == 'INPUT' || tagName == 'LABEL'
            if (!tagName) {
                e.stopPropagation();
            } else {
                _this.hide()
            }

        });

        this.start();
    },
    start: function() {
        if (!this.useNewCode) {
            this.getCode()
        } else {

            if (this.checkShow()) {
                this.hide()
            } else {
                this.show();
            }
        }
    },
    //获取图片数量
    imgLength: function() {
        if (this.editor) {
            return $(this.$parent.getContent()).find("img").not('[data-node="goodsPic"],[data-node="emoji"]').length;
        } else {
            return this.$parent.find("img").length;
        }
    },
    //获取二维码
    getCode: function() {
        var _this = this;
        var len = this.imgLength();
        var datas = {
            pageId: pageId,
            maxNum: this.uploadMaxNum - len
        }
        var qid = _this.qid;
        var qidArr = window.topicQrId; //检测window变量是否有此变量 格式为：
        _this.show();
        //topicQrId:{
        //  qid1:s1111,
        //  qid2:s2222
        // }
        if (qidArr[qid].qrcodeId) {
            datas.qrcodeId = _this.topicQrId;
        }
        fetch
            .get(url.get('getUploadQrCode'), {
                data: datas
            })
            .done(function(data) {
                if (data.success == true) {

                    if (data.code == 200) {

                        _this.useNewCode = 1;

                        var _data = data.data;

                        var str = domain + 'qrupload/index?pageId=' + _data.pageId + '&qrcodeId=' + _data.qrcodeId + '&type=' + _this.type;;
                        str = domain + 'ajax/qrcode/urlcode?url=' + encodeURIComponent(str);

                        window.topicQrId[qid].qrcodeId = _this.topicQrId = _data.qrcodeId; //把data的值赋予 window [qid].qrcodeId

                        _this.code = str; //把二维码的值放入
                        _this.getCodeCb();

                        _this.interval = setInterval(function() {
                            _this.monitor();
                        }, _this.time)

                    }
                } else {
                    alert(data.message);
                }
            })
            .fail(function(e, s) {})

    },
    //扫码轮询
    monitor: function() {
        var _this = this;
        fetch
            .post(url.get('topListenImg'), {
                data: {
                    code: pageId,
                    groupkey: window.topicQrId[_this.qid].qrcodeId
                }

            })
            .done(function(data) {

                if (data.success == true) { //ok
                    _this.scanCb(data);
                } else {
                    _this.hide();
                }
            }).fail(function(e, m) {
                clearInterval(_this.interval);
                _this.interval = 0;
                _this.hide();
                // alert(e);
            })
    },
    sendNum: function() {
        var _this = this;
        var len = this.imgLength();
        var maxNum = this.uploadMaxNum - len;
        fetch
            .get(url.get('topicuploadMax'), {
                data: {
                    qrcodeId: _this.topicQrId,
                    maxNum: maxNum
                }
            })
    },
    //插入图片
    insertPic: function(data) {
        for (var i = 0, len = data.length; i < len; i++) {
            var _data = data[i];
            var _img = imgReplace.imgReplace(_data);
            var _proto = imgReplace.imgProto(_data);
            var str = '<p><img src="' + _img + '" _src="' + _img + '" data-type="insertImg" proto="' + _proto + '"/></p>';
            this.editor.execCommand('inserthtml', str);
        }
    },
    //用户正在上传中
    loading: function() {
        this.isLoad = 1;
        this.$showBox.show();
        this.$cover.show();
        this.$localBtn.addClass('upload-unable');
        if (this.editor) {
            this.editor.setDisabled();
        }

    },
    //用户不在上传中
    unLoading: function() {
        this.isLoad = 0;
        this.$cover.hide();
        this.$cover.css("display", "none");
        this.$localBtn.removeClass('upload-unable');
        if (this.editor) {
            this.editor.setEnabled();
        }

    },
    //检查弹层状态
    checkShow: function() {
        if (this.$showBox.is(":visible")) {
            return true;
        }
        return false;
    },
    //调整弹窗位置
    fixPop: function() {
        var $btn = this.$target;
        var offset = $btn.offset();
        var x = offset.left;
        var y = offset.top / 1 + 30;

        return this.$showBox.css({
            'top': y + 'px',
            'left': x + 'px'
        });

    },
    //显示弹层
    show: function() {
        this.$showBox.removeClass('webuploader-element-invisible');
        this.$showBox.find("img").attr('src', this.code).css("display", "block");
        this.fixPop().show();
    },
    //隐藏弹层
    hide: function() {
        if (this.isLoad != 1) {
            this.$showBox.hide();
        }
    },
    //获得二维码回调
    getCodeCb: function() {
        this.sendNum(); //发送二维码数量
        this.$showBox.find("img").attr('src', this.code).css("display", "block");
        //this.show();
    },
    //扫码回调
    scanCb: function(data) {

            switch (data.isload) {
                case 1:
                    this.unLoading()
                    break;
                case 2: //上传中
                    this.loading()

                    break;
                case 3: //上传完成
                    var dataArr = data.data;
                    var tempArr = [];

                    var diffLen = dataArr.length - this.imgArr.length;

                    if (diffLen) {
                        this.loading()
                        this.imgArr = dataArr;
                        tempArr = dataArr.slice(-diffLen)
                        var _this = this;
                        setTimeout(function() {
                            _this.unLoading()
                            _this.hide();
                            if (typeof _this.customCb == 'function') {
                                _this.customCb(tempArr, _this)
                            } else {
                                _this.insertPic(tempArr);
                            }

                        }, 500)
                    }
                    break;
                case 10000:
                    this.imgArr = [];
                    this.isload = 0;
                    this.useNewCode = 0; //useNewCode 为0 意味着二维码过期
                    clearInterval(this.interval);
                    this.interval = 0;
                    this.hide();
                    break;
            }
        }
        //prototype end
}

module.exports = Scans;
