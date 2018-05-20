//index.js
var CONFIG = require('../../config.js');
let API = CONFIG.API;

let curPage = 1;
let limit = 20;

let isRequesting = false;

Page({
    data: {
        userInfo: {},
        dataList: [],
        nomore: false
    },
    onLoad: function() {
        var _this = this;
        wx.request({
            url: API.listUrl,
            success: function(res) {
                let data = res.data.data;
                _this.setData({
                    dataList: data
                });
            }
        })
    },
    onPullDownRefresh: function() {
        var _this = this;
        if (isRequesting) {
            return false;
        }
        isRequesting = true;
        wx.request({
            url: API.listUrl,
            success: function(res) {
                let data = res.data.data;
                let msg = res.data.message;
                if (data.length === 0) {
                    return false;
                }
                _this.setData({
                    dataList: data,
                    nomore: false
                });
                isRequesting = false;
                curPage = 1;
                wx.stopPullDownRefresh();
            }
        })
    },
    onReachBottom: function() {
        if (this.data.nomore) {
            return false;
        }

        if (isRequesting) {
            return false;
        }
        isRequesting = true;

        var _this = this;
        ++curPage;

        wx.showToast({
            title: '加载更多',
            icon: 'loading'
        })

        wx.request({
            url: API.listUrl,
            data: {
                page: curPage
            },
            success: function(res) {
                let data = res.data.data;
                let msg = res.data.message;

                if (data.length === 0) {
                    return false;
                }

                let dataList = _this.data.dataList.concat(data);
                let nomore = _this.data.nomore;

                if (data.length < limit) {
                    nomore = true;
                }
                isRequesting = false;
                _this.setData({
                    dataList,
                    nomore
                });
                wx.hideToast();
            }
        })

    }
})