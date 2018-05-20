/**
 * 达人相关接口
 */
module.exports = {
    //删除已发话题
    delTopic: '/ajax/topic/del',
    //获取草稿列表
    draftsList:'/expert/draftsList',
    //删除草稿
    delDraft:'/expert/draftsDel',
    //草稿箱编辑
    draftsDetail:'/expert/draftsDetail',
    publishedDetail:'/expert/publishedDetail',
    
    //达人资料提交
    postExpert: '/expert/postExpert',
    //达人资料修改
    putExpert: '/expert/putExpert',
    //达人资料类别
    expertCtgy: '/expert/expertCtgy',
    //达人主页系统公告
    expertNotice: '/expert/notifications'
};
