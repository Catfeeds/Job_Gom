// pages/detail/detail.js
var utils = require('../../utils/util.js');
var CONFIG = require('../../config.js');

let API = CONFIG.API;

var app = getApp();
let curPage = 1;
let limit = 5;

Page({
    data: {
        userInfo: {},
        videoData: {},
        videoIsHide: false,
        hasVideo: true,
        videoMsg: '',
        videoRelated: [],
        relatedBoxWidth: '100%',
        comments: [],
        publishComment: false,
        nomore: false,
        isLoaded: false
    },
    likeRecomment: function(e) {
        var cid = e.target.dataset.cid;
        var isliked = e.target.dataset.isliked;
        var comments = this.data.comments;
        var curCom = utils.findItem(comments, 'id', cid);
        if (isliked == 1) {
            curCom.likes -= 1;
            curCom.isliked = 0;
        } else {
            curCom.likes += 1;
            curCom.isliked = 1;
        }
        this.setData({
            comments
        });
    },
    publishComment: function(e) {
        this.videoContext.pause();
        this.setData({
            publishComment: true,
            videoIsHide: true
        });
    },
    formSubmit: function() {
        let _this = this;
        let formValue = e.detail.value.comment.trim();

        if (formValue == '') {
            return;
        }

        wx.request({
            url: API.recommentUrl,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                userName: _this.data.userInfo.nickName,
                avatar: _this.data.userInfo.avatarUrl,
                content: formValue
            },
            method: 'POST',
            success: function(res) {
                _this.setData({
                    comments: res.data.data,
                    publishComment: false,
                    videoIsHide: false
                });
            }
        })

        this.videoContext.play();

    },
    formReset: function(e) {
        this.videoContext.play();
        this.setData({
            publishComment: false,
            videoIsHide: false
        });
    },
    upper: function() {
        var _this = this;
        wx.request({
            url: API.commentsUrl,
            success: function(res) {
                _this.setData({
                    comments: res.data.data,
                    nomore: false
                });
                curPage = 1;
            }
        })
    },
    lower: function() {
        if (this.data.nomore) {
            return false;
        }

        var _this = this;
        ++curPage;

        wx.showToast({
            title: '加载更多',
            icon: 'loading'
        })

        wx.request({
            url: API.commentsUrl,
            data: {
                p: curPage
            },
            success: function(res) {
                let newdata = res.data.data;
                let comments = _this.data.comments.concat(newdata);
                let nomore = _this.data.nomore;

                if (newdata.length < limit) {
                    nomore = true;
                }
                _this.setData({
                    comments,
                    nomore
                });
                wx.hideToast();
            }
        })
    },
    onLoad: function(options) {

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })

        var id = options.id;
        var type = options.type;
        var _this = this;

        app.getUserInfo(function(userInfo) {
            _this.setData({
                userInfo: userInfo
            })
        })

        // cur video info
        wx.request({
            url: API.videoUrl,
            data: {
                id,
                type
            },
            success: function(res) {
                let hasVideo = _this.data.hasVideo;
                let videoData = res.data.data;
                let msg = res.data.message;
                let hasDesc = true;
                let vDesc = videoData.description;
                if (typeof vDesc === 'undefined' || vDesc.trim() === '') {
                    hasDesc = false;
                }
                videoData.hasDesc = hasDesc;

                wx.hideToast();

                if (typeof videoData.video_id == 'undefined' && msg !== '') {
                    _this.setData({
                        hasVideo: false,
                        videoMsg: msg
                    });
                    return false;
                }

                _this.setData({
                    videoData,
                    isLoaded: true
                });

                wx.setNavigationBarTitle({
                    title: videoData.title
                });
            }
        });

        // 相关视频
        /*wx.request({
            url: API.relatedVideosUrl,
            data: {
                id
            },
            success: function(res) {
                let videoRelated = res.data.data;
                let relatedVideoWidth = 270;
                let relatedBoxWidth = videoRelated.length * relatedVideoWidth + 'rpx';
                _this.setData({
                    videoRelated,
                    relatedBoxWidth
                });
            }
        });*/

        // 评论列表
        /*wx.request({
            url: API.commentsUrl,
            success: function(res) {
                _this.setData({
                    comments: res.data.data
                });
            }
        });*/

    },
    onReady: function() {
        this.videoContext = wx.createVideoContext('myVideo');
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    onShareAppMessage: function() {
        return {
            title: this.data.videoData.videoName,
            path: '/pages/detail/detail?id=' + this.data.videoData.video_id
        }
    }
})