<div class="pluspc-qualityLife " data-small="pluspc-qualityLifeS" tpl-cms-node="gomequalitylife" id="gomequalitylife">
    <div class="pluspc-qualityLife-cont" >
        <h3 class="qualityLife-title"><notempty name="data.slot.name" ><{$data.slot.name}><else />品质生活</notempty></h3>
        <div class="qualityLife-list">
            <ul class="list clearfix">
                <volist name="data.qualityLife" id="qualityLife" key="k" offset="0" length="4">
                <li>
                    <div class="list-li-box">
                        <a class="list-img" href="<{$qualityLife.topic_id|topicDetailUrlGen}>" data-code="index01003-<{$k}>" target="_blank">
                            <img src="<{$qualityLife.cmsIcon|filterProtocol}>">
                            <span class="list-bg"></span>
                            <div class="list-cont">
                                <p class="cont-item"><span><{$qualityLife.category_name}></span></p>
                                <p class="cont-tile"><{$qualityLife.cmsName}></p>
                                <p class="cont-info"><{$qualityLife.description}></p>
                            </div>
                        </a>
                    </div>
                    <ul class="list-ul  clearfix">
                        <volist name="qualityLife.cmsComponents" id="item_Components" key="item_key" offset="0" length='3'>
                        <li>
                            <a class="list-img" href="<{$item_Components['shopId'],$item_Components['id']|productDetailUrlGen}>" data-code="index01003-<{$k}>_<{$item_key}>" target="_blank">
                                <img  src="<?php if( is_array($item_Components['image']) ){ echo filterProtocol($item_Components['image'][0]);}else{ echo filterProtocol($item_Components['image']);}?>" width="100%">
                            </a>
                        </li>
                        </volist>
                    </ul>
                </li>
                </volist>
            </ul>
        </div>
    </div>
</div>