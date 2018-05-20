function setNavTitle(title) {
    wx.setNavigationBarTitle({
      title: title,
      success: function(res) {
        console.log('set navigation bar title success.')
      }
    })
}

module.exports = {
    setNavTitle : setNavTitle
}