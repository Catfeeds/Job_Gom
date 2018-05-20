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
        'ajax_topic_first_v2_del',//删除话题一级回复
        'ajax_topic_second_v2',//二级回复
        'ajax_topic_second_v2_del',//删除话题二级回复
        'ajax_topic_del',//删除话题
        'ajax_topic_report',//举报话题评论

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
        'group_index_edit',//创建圈子页面
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


        //美号
        'meihao_account_type',//美号注册时类型选择
        'meihao_account_createcompany',//美号注册填企业认证
        'meihao_account_perfectcompany',//美号注册填完善美号
        'meihao_account_createprivate',//美号注册填个人信息
        'meihao_account_awaitprivate',//个人账号审核中
        'meihao_account_failprivate',//个人账号审核失败
        'meihao_account_failcompany',//企业账号审核失败
        'meihao_account_awaitcompany',//企业账号审核中
        'meihao_index_index',//美号首页
        'meihao_index_guide',//美号操作指南
        'meihao_index_articlelist',//首页文章列表
        'meihao_disabled_index',//账号封停
        'meihao_failure_index',//圈子失效
        'meihao_article_topiclist',//获取已发文章列表
        'meihao_article_publish',//修改文章
        'meihao_setting_index',//账号设置-账号信息
        'meihao_setting_modify',//账号设置-账号信息
        'ajax_meihao_namecheck',//美号名称校验
        'ajax_meihao_catelist',//圈子分类列表
        'ajax_meihao_taglist',//标签列表
        'ajax_meihao_createcompany',//完善企业信息
        'ajax_meihao_createmeihao',//填写美号信息
        'ajax_meihao_editcompany',//更新企业信息
        'ajax_meihao_editmeihao',//更新美号信息
        'ajax_meihao_grouprebind',//重新绑定圈子
        'ajax_meihao_getvideoinfo',//获取视频信息
        'ajax_meihao_topicinfo',//获取话题详情信息
        'ajax_meihao_cancelmodifysetting',//取消美号修改
        'ajax_meihao_modifysetting',//修改美众号设置
        
        //美店
        'mall_admin_index',  //我的美店
        'mall_admin_openmshop',  //开通美店
        'mall_admin_skipmshop',  //跳过美店
        'mall_admin_setmshop',   //编辑美店

        'ajax_mshop_savemshop',         //保存美店信息
        'ajax_mshop_editshop',          //编辑美店信息
        'ajax_mshop_itembatchmangeinshop',   //一键上架
        'ajax_mshop_itemmangeinshop',   //上下架商品

        //美店说
        'ajax_topic_actopic',//话题加精置顶
        'mall_admin_topics',//美店说
        'mall_admin_publiser',//发布美店说
    ]
);
