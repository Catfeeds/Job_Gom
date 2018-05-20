var fetch = require('io/fetch');
var url = require('io/url');
var qrTips = require('module/i18n');
var alert = require('module/popup/alert');
var config = require('editor/config');
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
    this.$showBox = o.$showBox; //二维码弹层
    this.time = o.time || 2000; //轮询请求间隔
    this.type = o.type || 'pubsliser'; //扫码来源  评论页？发布话题页？等
    //this.getCb:o.getCb,
    this.customCb = o.customCb; //用户自定义回调函数
    this.isLoad = 0;
    // this.$insertDom = o.$insertDom; //插入图片的节点
    this.imgArr = []; //存储二维码未过期时，获得的的图片总数
    this.editor = o.editor || ""; //用于编辑器
    this.$cover = o.$showBox.find('[data-node="cover"]'); //是否上传中
    this.$localBtn = o.$showBox.find('[data-node="upLocal"]'); //是否上传中
    this.target = o.target;
    this.code = "";

}
Scans.prototype = {
    constructor: Scans,
    init: function() {
        var _this = this;
        if (_this.editor) {
            $(_this.editor.body).on('click', function(e) {
                _this.hide();
                e.preventDefault();
            })
        }

        $('body').on('click', this.$showBox, function(e) {
            e.stopPropagation();
        });

        /*$('body').on('click', function() {

        })*/
        _this.start();
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
    //获取二维码
    getCode: function() {
        var _this = this;
        var len = this.editor ? $(this.$parent.getContent()).find("img").length : this.$parent.find("img").length;
        var datas = {
            pageId: pageId,
            maxNum: this.uploadMaxNum - len
        }
        var qid = _this.qid;
        var qidArr = window.topicQrId; //检测window变量是否有此变量 格式为：
        this.show()
            //topicQrId:{
            //  qid1:s1111,
            //  qid2:s2222
            // }
        //console.log(qidArr)
        if (qidArr[qid].qrcodeId) {
            datas.qrcodeId = _this.topicQrId;
        }
        fetch
            .get(url.get('getUploadQrCode'), {
                data: datas
            })

        /* $.ajax({
                 url: 'img.json',
                 data: datas,
                 cache: false
             })*/
        .done(function(data) {
                if (data.success == true) {

                    if (data.code == 200) {

                        _this.useNewCode = 1;

                        var _data = data.data

                        if (!window.topicQrId[qid].qrcodeId) {
                            window.topicQrId[qid].qrcodeId = _this.topicQrId = _data.qrcodeId; //把data的值赋予 window [qid].qrcodeId
                        }

                        var str = domain + 'qrupload/index?pageId=' + _data.pageId + '&qrcodeId=' + _data.qrcodeId + '&type=' + _this.type;
                        str = domain + 'ajax/qrcode/urlcode?url=' + encodeURIComponent(str);

                        _this.code = str; //把二维码的值放入
                        _this.getCodeCb();
                        _this.interval = setInterval(function() {
                            _this.monitor();
                        }, _this.time)

                    }
                } else {
                    alert(data.message);
                    clear(o);
                }
            })
            .fail(function(e, s) {
            })

    },
    //扫码轮询
    monitor: function() {
        var _this = this;
        var len = this.editor ? $(this.$parent.getContent()).find("img").length : this.$parent.find("img").length;
        //var insertedImgLen = $(this.$parent.getContent()).find('img').length;
        var maxNum = this.uploadMaxNum - len;
        fetch
            .post(url.get('topListenImg'), {
                data: {
                    code: pageId,
                    groupkey: window.topicQrId[_this.qid].qrcodeId,
                    num: maxNum
                }

            })
            .done(function(data) {

                if (data.success == true) { //ok
                    if (typeof customCb == 'function') {
                        _this.customCb(data, _this)
                    } else {
                        _this.scanCb(data);
                    }
                } else {
                    _this.hide();
                }
            }).fail(function(e, m) {
                clearInterval(_this.interval)
                _this.hide();
                // alert(e);
            })
    },
    //插入图片
    insertPic: function(data) {
        for (var i = 0, len = data.length; i < len; i++) {
            var str = '<p><img src="' + data[i] + '" _src="' + data[i] + '" data-type="insertImg"/></p>'
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
    //显示弹层
    show: function() {
        this.$showBox.show();
    },
    //隐藏弹层
    hide: function() {
        if (this.isLoad != 1) {
            this.$showBox.hide();
        }
    },
    //获得二维码回调
    getCodeCb: function() {

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
                            _this.insertPic(tempArr);

                        }, _this.time)
                    }
                    break;
                case 10000:
                    this.imgArr = [];
                    this.loading = 0;
                    this.useNewCode = 0; //useNewCode 为0 意味着二维码过期
                    clearInterval(this.interval);
                    this.hide();
                    break;
            }
        }
        //prototype end
}

module.exports = Scans;
