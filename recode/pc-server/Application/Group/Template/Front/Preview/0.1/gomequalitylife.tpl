    <div class="pluspc-qualityLife-cont" >
        <h3 class="qualityLife-title"><notempty name="slot.show_name" ><{$slot.show_name}><else />品质生活</notempty></h3>
        <div class="qualityLife-list">
            <ul class="list clearfix">
                <volist name="datalists" id="qualityLife" key="k" offset="0" length="4">
                <li>
                    <div class="list-li-box">
                        <a class="list-img" href="<{$qualityLife.topic_id|topicDetailUrlGen}>" data-code="index01003-<{$k}>" target="_blank">
                            <img src="<{$qualityLife.icon}>">
                            <span class="list-bg"></span>
                            <div class="list-cont">
                                <p class="cont-item"><span><{$qualityLife.category_name}></span></p>
                                <p class="cont-tile"><{$qualityLife.name}></p>
                                <p class="cont-info"><{$qualityLife.description}></p>
                            </div>
                        </a>
                    </div>
                    <ul class="list-ul  clearfix">
                        <volist name="qualityLife.components" id="item_Components" key="item_key" offset="0" length='3'>
                        <li>
                            <a class="list-img" href="<{$item_Components['shopId'],$item_Components['id']|productDetailUrlGen}>" data-code="index01003-<{$k}>_<{$item_key}>" target="_blank">
                                <img  src="<?php if( is_array($item_Components['image']) ){ echo $item_Components['image'][0];}else{ echo $item_Components['image'];}?>" width="100%">
                            </a>
                        </li>
                        </volist>
                    </ul>
                </li>
                </volist>
            </ul>
        </div>
    </div>
