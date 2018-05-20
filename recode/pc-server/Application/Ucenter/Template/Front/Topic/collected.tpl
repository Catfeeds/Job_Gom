<!--已经改完-->
<?php
    $csspath = 'usercenter.css';
    $jspath = '/js/conf/uc_collect.js';
?>
<include file="Front/Public/header" />
<script>
    var flag = 3;
</script>

<div class="wrap-box myTopic clearfix">
    <include file="Front/Public/social_left" />
    <div class="user-right">
        <div class="content-list">
            <div class="crumbs">
                <{$crumbs}>
            </div>
            <div class="user-content">
                <div class="usershop-title">
                    <div class="left-tab" data-node="tabList" data-type="myTopic">
                        <a href="/topic/published" data-type="published">我发布的话题</a>
                        <a class="active" href="/topic/collected" data-type="collect">我收藏的话题</a>
                    </div>
                </div>
                <div class="circle-index-list clearfix">
                    <div class="topic-del hide clearfix" data-node="batch-del">
                        <div class="right-edit hide" data-node="showBatch">
                            <a class="btn-batch" href="javascript:void(0);" data-action="batch">批量管理</a>
                        </div>
                        <div class="right-edit hide" data-node="hideBatch">
                            <a class="btn-check" href="javascript:void(0);" data-action="selectAll">
                                <span class="checkbox"></span>全选
                            </a>
                            <a class="btn-del" href="javascript:void(0);" data-action="delAll">删除</a>
                            <a class="btn-cancel" href="javascript:void(0);" data-action="cancelBatch">取消</a>
                        </div>
                    </div>
                    <div class="topic-list clearfix"  data-node="collectList">
                        <div data-node="tiles" class="clearfix"></div>
                    </div>
                </div>
                <div class="more-loading hide clearfix" data-action="loadMore">
                   <a href="##"><img src="<{$pcimgpath}>/images/public/loading.gif"><span>正在加载更多话题…</span></a>
                </div>
            </div>
        </div>
        <div class="circle-hot" data-node="hotTopic">
            <div class="hot-title">热门话题</div>
            <ul></ul>
            <div class="topic-loading hide" data-action="beforeLoad">
                <img src="<{$pcimgpath}>/images/public/loading2.gif"><span>加载中…</span>
            </div>
        </div>
    </div>
</div>

<include file="Home@Front/Public/footer" />