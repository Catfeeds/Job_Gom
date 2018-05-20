//index.js
//获取应用实例
var app = getApp()
var navOpt = require('../../mods/common/navigatorOpt.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  queryOrder: function (e) {
      console.log(e.target)
      if(e.target.id === "") {

      }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //navOpt.setNavTitle('我的订单');
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
