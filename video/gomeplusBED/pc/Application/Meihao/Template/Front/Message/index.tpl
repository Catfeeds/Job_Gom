<?php
	$csspath = "meihaoNoticList.css";
?>
<include file="Front/Public/header" />
  <div class="content clearfix">
    <h2>系统公告</h2>
    <notempty name="message.notifications">
    <ul class="notic-list">
      <volist name="message.notifications" id="li" key="k">
      <li><a href="<{$li['landingPageUrl']}>" target="_blank">
          <div class="clearfix"><strong title="<{$li['title']}>"><{$li['short_title']}></strong><span><?=date('Y-m-d',(int)$li['effectiveTime']/1000)?></span></div>
          <p><span><{$li['description']}></span></p></a>
      </li>
      </volist>
    </ul>
    <div class="page" ><{$linkUrl}></div>
    </notempty>
  </div>
<include file="Home@Public:mh_footer"/>