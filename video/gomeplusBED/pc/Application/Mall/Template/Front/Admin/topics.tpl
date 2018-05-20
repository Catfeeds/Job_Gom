<?php
    $csspath = 'speakMange.css';
    $jspath = '/js/conf/setTop.js';
?>

<include file="Public:mshop_header" />
    <div class="wrap-box clearfix">
      <include file="Front/Public/left_new" />
      <div class="meidian-speak">
        <div class="speak-title clearfix"><a href="/admin/publiser" target="_blank"><em class="icon-edit"></em>发布美店说</a><span>我发布的美店说</span></div>
        <gt name="mshopList.totalTopicQuantity" value="0">
        <ul class="speak-list" data-node="speakList">
          <foreach name="mshopList.topics" item="li" >
          <li id-node="<{$li['id']}>">
            <div class="speak-list-title">
              <a  href="/sayinfo/<{$li['id']}>.html" target="_blank" >
                <span>
                  <eq name="li.isUpper" value="true"><em class="set-top">置顶</em></eq>
                  <eq name="li.isEssence" value="true"><em class="set-spark">精品</em></eq>
                </span>
                <{$li['name']|htmlspecialchars=###}></a>
            </div>
            <div class="speak-list-date">
              <em><{$li['time_str']}></em>
              <span>
                <eq name="li.isUpper" value="true">
                  <a href="javascript:;" data-action="top" data-status="1">[取消置顶]</a>
                  <else/>
                   <a href="javascript:;" data-action="top" data-status="0">[置顶]</a>
                </eq>

                <eq name="li.isEssence" value="true">
                  <a href="javascript:;" data-action="spark" data-status="1">[取消加精]</a>
                <else/>
                  <a href="javascript:;" data-action="spark" data-status="0">[加精]</a>
                </eq>
                <a href="javascript:;" data-action="del">[删除]</a>
              </span>
            </div>

            <div class="speak-list-content">
              <p><a href="/sayinfo/<{$li['id']}>.html" target="_blank"><{$li['content']|htmlspecialchars=###}></a></p>
              <notempty name="li['images_lst']" >

                <div class="content-img">
                  <volist name="li['images_lst']" id='img'>
                    <if condition="$img['type'] eq 'item'">
                      <a href="/sayinfo/<{$li['id']}>.html" target="_blank">
                      <img onerror="imgError(this, 'm')" src="<{$img['mainImage']}>">
                      <if condition="$img['salePrice']">
                        <gt name='img.rebateSummary.refRebateMoney' value="0">
                          <span><em class="icon-fan-o" >返利</em><em class="price">￥<{$img['salePrice']}></em></span>
                        <else/>
                          <span><em class="icon-goods" ></em><em class="price">￥<{$img['salePrice']}></em></span>
                        </gt>
                      <else />
                        <span><em class="icon-goods"></em><em class="price">暂无售价</em></span>
                      </if>
                      </a>
                    <else />
                      <a href="/sayinfo/<{$li['id']}>.html" target="_blank">
                      <img onerror="imgError(this, 'm')" src="<{$img['mainImage']}>">
                      </a>
                    </if>
                  </volist>
                </div>
              </notempty>
            </div>

            <div class="speak-list-state">
              <span><em class="icon-view"></em><{$li['pageviewText']}></span><span><em class="icon-like"></em><{$li['likeNumText']}></span><span><em class="icon-discuss"></em><{$li['replyTotalQuantityText']}></span>
            </div>
          </li>
          </foreach>
        </ul>
        <div class="page">
          <{$linkUrl}>
        </div>
        <else/>
          <div class="no-speak-box">
            <div class="no-speak">
              <img src="<{$pcimgpath}>/images/meidian/no-speak.png">
              <p><span>发表美店说，可以赚佣金，赶紧去<a href="/admin/publiser" target="_blank">写一篇</a>哟~</span></p>
            </div>
          </div>
        </gt>

      </div>
    </div>

<include file="Home@Public:footer" />