<?php
    $csspath = 'talentIndex.css';
    $jspath  = '/js/conf/talent_index.js';
?>
<include file="Platform/expert_header"/>
<div class="talent clearfix" data-referralCode="<{$pageData['user']['referralCode']}>">
    <include file="Platform/expert_left"/>
    <div class="talent-home">
        <div class="home-cont">
            <div class="content-info clearfix">
                <div class="content-info-leftArea fl">
                    <div class="person-box fl">
                        <a class="photo-box" target="_blank" href="<{$i_domain_gome}>member/profile"><img
                                    src="<{$userinfos['ext']['account']['imagePath']|_get}>"><i class="icon_t icon-talent"></i></a>
                        <div class="home-page"><i class="icon_t icon-home"></i><span>主页</span>
                            <div class="qr-code"><i class="icon_t icon-arrow"></i>
                                <div class="qr-code-img"><img src="<{$pageData['user']['facePicUrl']}>"></div>
                            </div>
                        </div>
                    </div>
                    <div class="person-title fl">
                        <if>
                            <span><{$pageData['user']['nickname']}></span>
                            <i class="icon_t <if condition="$pageData['user']['gender'] eq 1">icon-woman</if><if condition="$pageData['user']['gender'] eq 2">icon-man</if>"></i>
                        </h2>
                        <p><span>达人渠道：签约达人</span><span>达人类别：<{$pageData['expertInfo']['category']['name']}></span></p>
                    </div>
                </div>
                <if condition="$pageData.expertScore.totalScore">
                    <div class="content-info-rightArea fr">
                        <div class="score-count">
                            <div class="clearfix">
                                <span>达人总评分</span>
                                <a class="icon_t icon-quesion" >
                                    <div class="question-title">历史月度评分总加和</div>
                                </a>
                            </div>
                            <strong><{$pageData['expertScore']['totalScore']}></strong>
                        </div>
                    </div>
                    <else/>
                    <div class="content-info-rightArea fr">
                        <div class="no-score">
                            <div class="clearfix">
                                <span>暂无达人总评分</span>
                                <a class="icon_t icon-quesion" title="以月为统计周期的所有话题总评分">
                                    <div class="question-title">历史月度评分总加合</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </if>
            </div>

            <div class="common-block main-data comWidth">
                <h3 class="content-title">关键数据</h3>
                <div class="content-block-info clearfix">
                    <div class="main-data-item border-right fl">
                        <div class="home-page"><i class="icon_t icon-home"></i><span>主页</span></div>
                        <div class="main-data-item-info">
                            <span>
                                <em>UV</em>
                                <span>流量人数</span>
                            </span>
                            <a class="icon_t icon-quesion" >
                                <div class="question-title">
                                    <p>PC和APP个人主页（客态）当天总UV数据加和；</p>
                                    <p>更新频次：当日的00：00做数据更新；</p>
                                </div>
                            </a>
                            <p class="count">
                                <notempty name="pageData.statistics.uv">
                                    <{$pageData['statistics']['uv']}>
                                <else/>
                                    0
                                </notempty>
                            </p>
                            <p>近7天总UV：
                                <notempty name="pageData.statistics.uv7">
                                    <{$pageData['statistics']['uv7']}>
                                <else/>
                                    0
                                </notempty>
                            </p>
                        </div>
                    </div>
                    <div class="main-data-item fl">
                        <div class="home-page"><i class="icon_t icon-home"></i><span>主页</span></div>
                        <div class="main-data-item-info">
                            <span>
                                <em>PV</em>
                                <span>流量人数</span>
                            </span>
                            <a class="icon_t icon-quesion" >
                                <div class="question-title">
                                    <p>PC和APP个人主页（客态）当天总PV数据加和；</p>
                                    <p>更新频次：当日的00：00做数据更新；</p>
                                </div>
                            </a>
                            <p class="count">
                                <notempty name="pageData.statistics.pv">
                                    <{$pageData['statistics']['pv']}>
                                <else/>
                                    0
                                </notempty>
                            </p>
                            <p>近7天总PV：
                                <notempty name="pageData.statistics.pv7">
                                    <{$pageData['statistics']['pv7']}>
                                <else/>
                                    0
                                </notempty>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <notempty name="messageData.notifications">
                <div class="common-block system-report">
                    <h3 class="content-title">系统公告</h3>
                    <div class="report-list">
                        <ul>
                            <volist name="messageData.notifications" id="message" key="k">
                                <li>
                                    <a href="<{$message['landingPageUrl']}>" target="_blank" >
                                        <h3>
                                            <strong class="fl" title="<{$message['title']}>"><{$message['short_title']}></strong>
                                            <span class="fr"><i class="icon_t icon-time"></i>
                                                <span>
                                                    <?=date('m-d H:i',(int)$message['createTime']/1000)?>
                                                </span>
                                            </span>
                                        </h3>
                                        <div>
                                            <span title="<{$message['description']}>"><{$message['description']}></span>
                                        </div>
                                    </a>
                                </li>
                            </volist>
                        </ul>
                    </div>
                    <div class="page-container">
                        <div class="page-count fr"><span class="total-pre"> <span class="cur">1</span></span><span
                                    class="total-back">/<{$pageSum}></span><strong><span>到第</span>
                                <input type="text" name="pageNum"><span>页</span></strong>
                            <input class="btn" type="button" value="确定">
                        </div>
                        <div class="page-list fr">
                            <div class="page">
                                <{$linkUrl}>
                            </div>
                        </div>

                    </div>
                    <else/>
                    <div class="common-block system-report no-data">
                        <h3 class="content-title">系统公告</h3>
                        <div class="report-list"><i class="icon_t icon-text"></i>
                            <p>暂无系统公告哦～</p>
                        </div>
                    </div>
            </notempty>


        </div>
    </div>
</div>
<notempty name="topMessageData.topExpertNotifications">
    <div class="talent-notice">
        <div class="notice-title">达人公告</div>
        <notempty name="topMessageData.topExpertNotifications">
            <div class="notice-list">
                <ul>
                    <volist name="topMessageData.topExpertNotifications" id="topMessage" key="k">
                        <li <if condition="$k eq count($topMessageData['topExpertNotifications'])"> class="no-border"</if> >
                            <a href="<{$topMessage['landingPageUrl']}>" target="_blank" title="<{$topMessage['title']}>"><{$topMessage['short_title']}></a>
                        </li>
                    </volist>
                </ul>
            </div>
        </notempty>
        <img src="<{$pcimgpath}>/images/talent/person-photo.png">
    </div>
</notempty>
<include file="Platform/expert_footer"/>