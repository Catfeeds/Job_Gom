/**
 * 定义所有的页面的pub/sub通道
 */

var channels = {
    postTopic: {
        selectCircle: 'done' // 圈子选择完毕
    },
    //发话题
    setPubliser: {
        changedItem: 'changeItem', //选择商品弹窗
        changeImage: 'uploadImg', //图片上传弹窗
        delItem: 'delItem', // 删除已插入的商品
        wordUploader: 'wordUploader' // word中粘贴img图片上传
    },
    comment: {
        enableEditor: 'enableEditor'
    }
};

module.exports = channels;
