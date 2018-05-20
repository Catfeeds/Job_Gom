/**
 * 圈子社交相关接口
 */
module.exports = {
    praise: '/ajax/group/praised', // 赞/取消赞
    searchGroup: '/api/search_more', // 圈子搜索

    groupFace: '/publiser/faces', // 圈子表情接口
    groupPublishTopic: '/publiser/create', // 圈子发布话题

    // 话题接口
    topics: '/api/topic_more',
    joinCircle: '/api/circle', // 加入圈子
    createCircle: '/publiser/circle', //创建圈子
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
    selectGroup: '/publiser/select_group', // 选择圈子

    commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    secondtopicV2: '/ajax/topic/second_v2', //
    commentListUrlV2: '/api/reply_list_v2',
    getRelyListV2: '/api/second_reply_list_v2',

    //圈子列表
    categories: '/api/categories', //分类集合
    groupLists: '/api/group_lists', //列表信息
    recommendCircle: '/api/recommend'
};
