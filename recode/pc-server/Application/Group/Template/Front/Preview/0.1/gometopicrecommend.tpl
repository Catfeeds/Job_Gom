 <div class="pluspc-topicRecommend-cont" >
        <h3 class="topicRecommend-title"><notempty name="slot.show_name" ><{$slot.show_name}><else />主题推荐</notempty></h3>
        <div class="topicRecommend-list">
            <ul class="list clearfix">
                <volist name="datalists" id="topicRecommend" key="k" offset="0" length="4">
                <li>
                    <div class="list-li-box">
                        <a class="list-img" href="<{$topicRecommend.topic_id|topicDetailUrlGen}>" data-code="index01004-<{$k}>" target="_blank">
                            <img src="<{$topicRecommend.icon}>">
                            <span class="list-bg"></span>
                            <div class="list-cont">
                                <p class="cont-item"><span><{$topicRecommend.category_name}></span></p>
                                <p class="cont-tile"><{$topicRecommend.name}></p>
                                <p class="cont-info"><{$topicRecommend.description}></p>
                            </div>
                        </a>
                    </div>
                    <ul class="list-ul  clearfix">
                        <volist name="topicRecommend.components" id="item_Components" key="item_key" offset="0" length='3'>
                            <li>
                                <a class="list-img" href="<{$item_Components['shopId'],$item_Components['id']|productDetailUrlGen}>" data-code="index01004-<{$k}>_<{$item_key}>" target="_blank">
                                    <img  src="<?php if( is_array($item_Components['image'][0]) ){ echo $item_Components['image'][0];}else{ echo $item_Components['image']; }?>" width="100%">
                                </a>
                            </li>
                        </volist>
                    </ul>
                </li>
                </volist>
            </ul>
        </div>
    </div>