<?php
//需要验证的 模块_控制器_动作
return array(
    'AUTH_LIST'=> [
        'ajax_crop_crop_img',//上传图片
        'ajax_crop_crop_img_real_size',//上传封面图
        'ajax_group_circle',//加入圈子
        'ajax_group_quit_circle',//退出圈子
        'ajax_group_praised', //话题、店铺点赞(取消点赞)
        'ajax_group_topcollect',//收藏|取消 收藏
        'ajax_group_check',//检测用户创建圈子的上限
        'ajax_tag_create',//创建标签
        'ajax_tag_search',//搜索标签
        'ajax_topic_first_v2',//一级回复
        'ajax_topic_second_v2',//二级回复
        'ajax_topic_del',//删除话题

        //发布话题共用部分
        'ajax_topic_select_group',//选择圈子
        'ajax_topic_create',//点击发布话题
        'ajax_topic_my_item_collect',//我收藏的商品
        'ajax_topic_search_item',//搜索商品
        'ajax_topic_topicQrcode',//话题二维码展示
        'ajax_topic_checkInfo',//发布话题监测上传图片
        'ajax_topic_upload',//上传接口
        'ajax_topic_check',//发布话题过滤敏感次
        'ajax_topic_url',//替换外链图片
        'ajax_topic_handleImg',//图片旋转

        'group_topic_circle',//用户加群
        'group_topic_quit_circle',//用户退出圈子
        'group_index_create',//创建圈子页面
        'group_publiser_circle',//创建话题
        'group_topic_publiser',//发布话题
        'group_topic_del',//删除话题
        'ucenter_collect_topic',//我收藏的话
        'ucenter_topic_published',//我的话题列表
        'ucenter_topic_publishedtopic',//获取已发布的话题
        'ucenter_topic_collected',// 我收藏的话题
        'ucenter_topic_collectedtopic',//获取收藏的话题
        'ucenter_topic_deltopic',//删除我收藏的话题
        'ucenter_group_index',//我的圈子
        'ucenter_group_getmygroups',//获取我的圈子
        'ucenter_group_delgroupbygid',//解散圈子
        //达人平台：草稿箱
        'ucenter_platform_draftsIndex',//草稿箱页面
        'ucenter_platform_draftsList',//草稿箱列表接口
        'ucenter_platform_draftsDetail',//草稿箱详情接口
        'ucenter_platform_draftsDel',//草稿箱删除接口
        'ucenter_platform_draftsSave',//草稿箱保存接口
        'ucenter_platform_draftsError',//草稿箱错误页面
        //达人平台：已发话题
        'ucenter_platform_publish',//发布话题页面
        'ucenter_platform_topicList',//已发话题列表接口
        'ucenter_platform_topicDetail',//已发话题详情接口
        //达人平台：平台首页
        'ucenter_platform_home',//平台首页面
        'ucenter_platform_notifications',//系统通知接口
        'ucenter_platform_protocol',//用户协议页面
        'ucenter_platform_logocode',//二维码接口
        //达人招募
        'ucenter_expert_index',//达人招募页面
    ]
);
