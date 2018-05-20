
var navOpt = require('../../mods/common/navigatorOpt.js');

Page({
  data: {
  },
  onLoad: function(options) {
    //navOpt.setNavTitle('国美Go');
  },
  searchProduct: function() {
      wx.navigateTo({
        url: '../product/search/search'
      })
  }

})

