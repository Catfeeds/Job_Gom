
Page({
    data:{
      focus: false,
      inputValue: '',
    },
    onLoad:function(){

    },
    backToHome: function () {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    queryProduct: function (e) {
      var me = this
        me.setData({
            inputValue: e.detail.value
        })
        console.log(e.detail.value);
        //return 'hahah'
    },
    inputDone: function(e) {
        console.log('confirm:  ' + e.detail.value);
    },
})