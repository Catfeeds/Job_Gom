<?php
//V2接口列表
return array(
    //话题列表 wiki编号:26
    "topic"        => 'ext/social/topics?',

    //话题详情 wiki编号:42
    'topic_detail' => 'ext/social/topic?',

    //圈子信息
    'group_infos' => '/ext/social/group',

    //2 圈子信息combo 带会员的圈子信息
    'group_member_infos' => 'combo/groupInfo',

    //我的圈子+推荐圈子列表
    'postingCandidateGroups' => $d.'combo/postingCandidateGroups'
);
