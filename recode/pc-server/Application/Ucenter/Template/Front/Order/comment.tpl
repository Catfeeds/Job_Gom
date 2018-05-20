<?php
    $csspath = 'postcomment.css';
    $jspath = '/js/conf/orderDiscuss.js';
?>
<include file="Home@Front/Public:header" />
    <div class="crumbs-box"><a href="javascript:;">我的订单</a><em>></em><a href="javascript:;">待评论</a><em>></em><span class="crnmb-activ">发布评论</span></div>
    <div class="wrap-box">
      <div class="bg-white">
        <table class="post-comment-table" data-node="orderDisTable">
          <tr>
            <th class="borb">
              <h2 class="comment-title">评价订单</h2>
            </th>
            <th class="borb">
              <div class="order-num"><span class="font-grey-normal">订单号</span><span><{$order_info.order_id}></span></div>
            </th>
          </tr>
          <foreach name="good_info" item = "vo" key = "key">
            <tr>
              <td class="borr">
                <div class="product-info borb">
                  <a href="<{$vo['good_id']|productDetailUrlGen=$vo['shop_id'],###}>?skuid=<{$vo['skuid']}>" target="_blank">
                    <img src="<{$vo.image|getResizeImg=###,80,80}>" class="product-img" onerror="imgError(this)" />
                  </a>
                  <a href="<{$vo['good_id']|productDetailUrlGen=$vo['shop_id'],###}>?skuid=<{$vo['skuid']}>" target="_blank" class="prod-title"><{$vo.good_name|htmlspecialchars}></a>
                  <foreach name="vo.attributes" item = "attr" key = "k">
                    <p><{$attr.name}>：<{$attr.value}></p>
                  </foreach>
                </div>
              </td> 

              <td>
                <div class="comment-box borb" data-productId="<{$vo.orderitem}>" data-node="orderDiscuss">
                  <ul class="comment-post">
                    <li><span class="feature-title">描述相符：</span>
                      <div class="star-box" data-node="orderStar">
                        <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                        <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                        <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                        <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                        <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                        <span class="zero"><span data-node="proScore">5</span>分</span>
                      </div>
                    </li>
                    <li><span class="feature-title">评价商品：</span>
                      <div class="textarea">
                        <textarea placeholder="评价商品" data-node="commentContent"></textarea>
                        <p class="txt-count"><span data-node="discussNum">0</span>/200</p>
                      </div>
                    </li>
                    <li>
                      <span class="feature-title">我要晒图：</span>
                      <div class="pics-list-wrap clearfix"  data-node="uploadBox">
                        <ul class="pics-list clearfix" data-node="uploadList">
                          <li data-defaultaddfile="picker">
                           <!--  <input type="file"><a href="javascript:;" class="icon icon-add"></a> -->
                          </li>
                        </ul>
                        <div class="num-pics">您可以添加 <span class="link-hover-red" data-node="addNum">5</span><span class="deep-gray">/5 </span>张图片</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </foreach>
          <tr>
            
            <td class="borr">&nbsp;</td>
            <td>
              <div class="service-score"><span class="feature-title">服务态度</span>
                <div class="star-box" data-node="orderStar">
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <span class="star-num active"><em class="icon-left"></em><span data-node="serviceGrade">5</span>分满意</span></div><span class="feature-title">物流态度</span>
                <div class="star-box" data-node="orderStar">
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <a href="javascript:;" class="iconn-43 active" data-node="star"></a>
                  <span class="star-num active"><em class="icon-left"></em><span data-node="expressService">5</span>分满意</span></div><a href="javascript:;" class="submit-comment" data-action="discussSubmit">提交评论</a>
              </div>
            </td>



          </tr>
        </table>
      </div>
    </div>
<include file="Home@Front/Public:footer" />
