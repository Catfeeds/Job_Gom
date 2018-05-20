/**
 * 圈子社交相关接口
 */
module.exports = {
    praise: '/ajax/group/praised', // 赞/取消赞
    searchGroup: '/api/search_more', // 圈子搜索

    groupFace: '/publiser/faces', // 圈子表情接口
    groupPublishTopic: '/ajax/topic/create', // 圈子发布话题
    groupSaveTopic: '/expert/draftsSave', //圈子保存话题
    topics: '/api/topic_more', // 话题接口
    joinCircle: '/api/circle', // 加入圈子
    joinCircle1: '/ajax/group/circle', //融合加入圈子
    joinCircle2: 'ajax/group/circle', //融合加入圈子
    getIndexData: '/ajax/topic/api_ids', //圈子首页获取动态数据

    createCircle: '/publiser/circle', //创建圈子
    editCircle:'/publiser/editCircle',//编辑创建圈子

    createCircle1: '/ajax/group/check', //融合加入圈子
    moreTopics: '/topic/more_topics', //最近话题加载更多
    follow: '/publiser/add_follow', //加关注
    unfollow: '/publiser/delete_follow', //取消关注
    commentFirst: '/ajax/topic/first', //一级回复  一级评论
    commentListUrl: '/api/reply_list',
    secondtopic: '/ajax/topic/second',
    getRelyList: '/api/second_reply_list',
    //commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    //secondtopicV2: '/ajax/topic/second_v2', //
    //commentListUrlV2: '/api/reply_list_v2',
    //getRelyListV2: '/api/second_reply_list_v2',
    detail_infos: '/topic/detail_infos',
    //selectGroup: '/publiser/select_group', // 选择圈子
    selectGroup: '/ajax/topic/select_group', // 选择圈子

    commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    secondtopicV2: '/ajax/topic/second_v2', //
    commentListUrlV2: '/ajax/api/reply_list_v2',
    getRelyListV2: '/api/second_reply_list_v2',

    getNextTopic: '/api/next_topic/', //下一个话题
    // handleimg: '/topic/handleimg ', //图片旋转
    handleimg: '/ajax/topic/handleimg ', //图片旋转
    pcStatus: '/topic/pcStatus',

    getNextTopic: '/api/next_topic/', //下一个话题
    topicDel: '/ajax/topic/del', //话题删除
    topicReport: '/ajax/topic/report', //话题举报
    //圈子列表
    categories: '/api/categories', //分类集合
    groupLists: '/api/group_lists', //列表信息
    recommendCircle: '/api/recommend',
    exitCircle: '/ajax/group/quit_circle', //退出圈子
    //话题图片处理
    // topicRotateImg: '/topic/handleImg', //旋转
    topicRotateImg: '/ajax/topic/handleImg', //旋转
    // topListenImg: '/topic/checkinfo', //上传监听
    topListenImg: '/ajax/topic/checkinfo', //上传监听
    //话题图片上传
    // topicUrlUpload: '/topic/url',
    topicBase64Upload: '/ajax/topic/path',
    // topicuploadMax: '/topic/putMaxNum',
    topicuploadMax: '/ajax/topic/putMaxNum',
    topicUrlUpload2: '/ajax/topic/url',
    //话题h5上传图片
    // h5TopicUpload: '/topic/upload', //h5上传图片
    h5TopicUpload: '/ajax/topic/upload', //h5上传图片
    h5QruploadStatus: '/qrupload/statreport', //h5二维码状态监听
    h5QruploadMaxNum: '/qrupload/maxNum', //h5获取最大上传图片

    //话题回复图片上传地址
    // topicUrlUpload: 'topic/url',
    //topicUrlUpload: 'ajax/topic/url',

    //标签
    tagSearch: '/ajax/tag/search', //标签搜索
    tagCreate: '/ajax/tag/create', //用户自定义标签

    //话题敏感词过滤
    // sensitiveWord: '/topic/check'
    sensitiveWord: '/ajax/topic/check',

    //读取话题数据（草稿箱/话题）
    readTopicData: '/expert/publishedDetail', //话题
    readTopicDraftsData: '/expert/draftsDetail', //草稿

    //增加话题浏览量
    addVisitTopic: '/ajax/api/otherMissing',
    //获取视频地址
    getVideoPath: '/ajax/meihao/getVideoInfo',
    //置顶、加精
    setTop: '/ajax/topic/actopic',
    //分享返利kid
    shareKid: '/ajax/Mshop/getmshopKid',
    //删除一级评论
    deleteDiscuss: '/ajax/topic/first_v2_del',
    //删除二级评论
    deleteSecondDiscuss: '/ajax/topic/second_v2_del',
    //获取话题的相关话题
    getTopicList: '/ajax/topic/relatedTopics',
    //美店说评论
    commentListMd: '/ajax/api/mshop_reply_list_v2',
    getRelyListMd: '/ajax/api/second_reply_list_v2',
    secondtopicMd: '/ajax/topic/mshop_second_v2'
};
