    <div class="pluspc-sale-title">
        <img src="<{$slot.banner}>"/>
    </div>
    <div class="clearfix pluspc-sale-box">
        <volist name="datalists" id="topic" key="topicKey" offset="0" length='2'>
        <div class="pluspc-sale-list">
            <div class="pluspc-sale-listtile">
                <a href="<{$topic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$topic.name}>" data-code="sale01001-<{$topicKey+1}>"><{$topic.name}></a>
            </div>
            <p><a href="<{$topic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$topic.description}>" data-code="sale01001-<{$topicKey+1}>"><{$topic.description}></a></p>
            <div class="clearfix pluspc-sale-imglist">
                <volist name="topic.components" id="goods" key="goodsKey" offset="0" length='3'>
                <if condition="$goods.checked eq 1 ">
                <a href="<{$goods.id|productDetailUrlGen=0,###}>" target="_blank" data-code="sale01001-<{$topicKey+1}>_<{$goodsKey+1}>">
                    <img src="<{$goods.image}>"/>
                </a>
                </if>
                </volist>
            </div>
            <div class="pluspc-sale-last clearfix">
                <div class="pluspc-sale-fl">
                    <a href="<{$topic.create_user_id|userInfoUrlGen=###,$userId}>" class="pluspc-sale-uimg" target="_blank" data-code="sale01001-<{$topicKey+1}>_4">
                        <img src="<{$topic.user_icon}>"/>
                    </a>
                    <a href="<{$topic.create_user_id|userInfoUrlGen=###,$userId}>" target="_blank" title="<{$topic.user_nickname}>" data-code="sale01001-<{$topicKey+1}>_4"><{$topic.user_nickname}></a>
                    <span>来自圈子：</span>
                    <a href="<{$topic.group_id|groupDetailUrlGen}>" target="_blank" title="<{$topic.group_name}>" data-code="sale01001-<{$topicKey+1}>_5"><{$topic.group_name}></a>
                </div>
                <div  class="pluspc-sale-fr">
                    <span>0</span>
                    <span class="pluspc-sale-discuss">0</span>
                </div>
            </div>
        </div>
        </volist>
    </div>
