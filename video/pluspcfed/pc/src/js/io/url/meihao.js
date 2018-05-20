/**
 * 美号相关接口
 */
module.exports = {
    createCompany: '/ajax/meihao/createCompany',   //创建企业资质信息
    editCompany: '/ajax/meihao/editCompany',       //编辑企业资质信息
    createPrivate: '/ajax/meihao/createMeihao',
    editPrivate: '/ajax/meihao/editMeihao',
    privateTag: '/ajax/meihao/taglist',
    privateCateList : '/ajax/meihao/cateList',
    privateNameCheck : '/ajax/meihao/nameCheck',
    readMeihaoTopicData:'/ajax/meihao/topicinfo',
    cancelModifySetting: '/ajax/meihao/cancelModifySetting',
    modifySetting: '/ajax/meihao/modifySetting',

    meihaoTitle: '/ajax/topic/check',
    meihaoName: '/ajax/meihao/nameCheck',

    groupRebind: '/ajax/meihao/groupRebind',
    articleList:'/index/articleList',	//首页读取文章列表
};
