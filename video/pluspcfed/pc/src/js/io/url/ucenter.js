/**
 * 用户中心相关接口
 */
module.exports = {

    //个人中心
    getJoinedCircle: '/group/sendgroupData', //我的圈子
    getTopic: '/topic/getTopicByAjax', //我发布的话题
    canCreate: '/group/check', //检测是否能创建新的圈子
    getRecommendGoods: '/index/recommend', //换一组商品

    //uc-重置密码
    ucSendMsgCode: '/modpwd/sendPsw', //发送手机验证码
    subNewPwd: '/modpwd/checkPsw', //提交新密码
    //uc-设置个人信息
    checkName: '/ajax/user/identifynickname', //校验昵称
    subName: '/personal/modPersonalInfo',

    //达人申请
    getMasterTypeList: '/expert/expertCtgy', //初始化达人类型列表
    subMaster: '/expert/postExpert', //首次发送达人请求
    subMasterAgain: '/expert/putExpert', //再次发送达人请求

    getAddress: '/ajax/address/regionDivisionV2?parentId=', // 收货地址四级联动
    getRedList: '/shop/getRedPacketList', //详情页优惠券列表
    shopCollect: '/ajax/shop/collectShopV2', //收藏店铺
    unShopCollect: '/ajax/shop/uncollectShopV2', //取消收藏店铺
    addShopCar: '/ajax/car/add', //添加购物车
    getMoreDiscuss: '/product/getEvaluate', //获取更多评论
    getProduct: '/product/candeliver', //是否有货
    moreGoods: '/shop/moreList', //商铺详情获取更多数据
    productUnCollect: '/ajax/shop/uncollectProductV2', //取消商品收藏
    productCollect: '/ajax/shop/collectProductV2', //商品收藏
    //getCollectItem: '/publiser/my_item_collect', //我收藏的商品
    getCollectItem: '/ajax/topic/my_item_collect', //我收藏的商品
    //getMoreItem: '/publiser/search_item', //圈子-获取更多商品
    getMoreItem: '/ajax/topic/search_item', //圈子-获取更多商品
    searchTopics: '/search/topics_more', //获取话题列表
    searchLabel: '/ajax/tag/topic', //获取标签列表
    //commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    //secondtopicV2: '/ajax/topic/second_v2', //
    //commentListUrlV2: '/api/reply_list_v2',
    //getRelyListV2: '/api/second_reply_list_v2',

    // 话题收藏/取消收藏
    collectTopic: '/ajax/group/topcollect',
    //删除收藏商品/店铺/话题
    delCollectGoods: '/collect/delGoods',
    delCollectShop: '/collect/delShop',
    delCollectTopic: '/topic/delTopic',
    //收藏-获取更多商品/店铺/话题
    getCollectGoods: '/collect/moreGoods',
    getCollectShop: '/collect/moreShop',
    getCollectTopic: '/topic/collectedTopic',
    //订单评价
    discussOrder: '/order/getCommentInfo',

    //退货换货
    getRefundInfo: '/order/getRefundInfo',
    // 收货地址
    addAddress: '/ajax/address/add', // 新增收货地址
    setDefaultAddr: '/ajax/address/setDefault', // 设置为默认收货地址
    editAddress: '/ajax/address/edit', // 修改收货地址
    delAddress: '/ajax/address/del', // 删除收货地址

    //售后服务
    afterServiceList: '/customerInfo/getBackData',
    logisticsList: '/customerInfo/getGoodsStreamInfo',
    sendGoods: '/customerInfo/sendGoods',
    buyCheckGoods: '/customerInfo/buyCheckGoods',
    //修改绑定手机号
    sendOldCode: '/bind/postVerifyCodeOld',
    checkOldCode: '/bind/checkVerifyCodeOld',
    sendNewCode: '/bind/postVerifyCodeNew',
    checkNewCode: '/bind/checkVerifyCodeNew',
    //意见反馈
    feedback: '/feed/info',
    //他人主页
    othersCircle: '/ta/circles',
    othersTopic: '/ta/topics',
    //个人中心首页确认收货
    confirmGoods: '/ajax/user/confirmRecv',
    //我发布的话题
    publishedTopic: '/topic/publishedTopic',
    hotTopic: '/topic/hotTopics',
    delPublishedTopic: '/ajax/topic/del',
    //我的圈子  退出圈子  解散圈子 查看是否能创建圈子
    getMyGroups: '/group/getMyGroups',
    quitCircle: '/ajax/group/quit_circle',
    delGroupByGid: '/group/delGroupByGid',
    groupCheck: '/ajax/group/check',
    //店铺管理  商品上下架  店铺管理页分页 好货推荐   获取kid
    soldInOut: '/ajax/Mshop/itemMangeInShop',
    shopMange: '/ajax/Mshop/index?pageNum=',
    hotGoods: '/ajax/Mshop/addItem?type=',
    getKid: '/ajax/Mshop/getKid',
    batchShelves: '/ajax/Mshop/itemMangeInShop'

    // groupCheck: '/ajax/group/check',

};
