<div class="pluspc-sale-wrap " data-small="pluspc-sale-small" tpl-cms-node="salebuylist" id="salebuylist">
    <div class="pluspc-sale-title">
        <img src="<{$saleSlot.image|filterProtocol}>"/>
    </div>
    <div class="clearfix pluspc-sale-box">
        <foreach name="saleBuyList" item="topic" key="topicKey">
        <div class="pluspc-sale-list">
            <div class="pluspc-sale-listtile">
                <a href="<{$topic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$topic.cmsName}>" data-code="sale01001-<{$topicKey+1}>"><{$topic.cmsName}></a>
            </div>
            <p><a href="<{$topic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$topic.description}>" data-code="sale01001-<{$topicKey+1}>"><{$topic.description}></a></p>
            <div class="clearfix pluspc-sale-imglist">
                <foreach name="topic.cmsComponents" item="goods" key="goodsKey">
                <a href="<{$goods.id|productDetailUrlGen=0,###}>" target="_blank" data-code="sale01001-<{$topicKey+1}>_<{$goodsKey+1}>">
                    <img src="<{$goods.image|filterProtocol}>"/>
                </a>
                </foreach>
            </div>
            <div class="pluspc-sale-last clearfix">
                <div class="pluspc-sale-fl">
                    <a href="<{$topic.create_user_id|userInfoUrlGen=###,$userId}>" class="pluspc-sale-uimg" target="_blank" data-code="sale01001-<{$topicKey+1}>_4">
                        <img src="<{$topic.user_icon|filterProtocol}>"/>
                    </a>
                    <a href="<{$topic.create_user_id|userInfoUrlGen=###,$userId}>" target="_blank" title="<{$topic.user_nickname}>" data-code="sale01001-<{$topicKey+1}>_4"><{$topic.user_nickname_slice}></a>
                    <span>来自圈子：</span>
                    <a href="<{$topic.group_id|groupDetailUrlGen}>" target="_blank" title="<{$topic.group_name}>" data-code="sale01001-<{$topicKey+1}>_5"><{$topic.group_name_slice}></a>
                </div>
                <div  class="pluspc-sale-fr">
                    <span><{$topic.likeQuantity|num_format}></span>
                    <span class="pluspc-sale-discuss"><{$topic.replyQuantity|num_format}></span>
                </div>
            </div>
        </div>
        </foreach>
    </div>
</div>
