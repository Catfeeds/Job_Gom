/**
 *
 Created by zhangzhao on 2017/2/28.
 Email: zhangzhao@gomeplus.com
 */
/***
 * php页面中存在的数据
 *
 * loginFlag true:登录，false:未登录
 *
 * user: {
 *      userId: 0, //为0代表没有登录
 *      nickName: "", //昵称
 *      avatar: ""  // 头像
 * }
 *
 * page: {
 *  topicId: "19", // 话题ID
 *  link: "",
 *  imageUrl: "",
 *  title: "直播标题",
 *  shareDesc: "副标题"
 * }
 */


var page = window.$CONFIG || {};
var loginFlag = page.userId ? true : false;

export {loginFlag, page};
