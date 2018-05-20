<div class="circle-top">
	<if condition="abs($group_member_infos['category']['parent']['id']) elt 16">
		<img src="<{$pcimgpath}>/images/circle_bg/bg<{$group_member_infos['category']['parent']['id']}>.jpg" class="img" />
	<else />
		<img src="<{$pcimgpath}>/images/circle_bg/bg-default.jpg" class="img" />
	</if>
    <div class="head-title">
	<img onerror="imgError(this, 'g')" data-node="groupPic" src="<{$group_member_infos['icon']}>" alt="<{$group_member_infos['name']}>" />
      <div class="title-name">
        <h1><{$group_member_infos['name']}></h1><span class="color-<{$group_color}>"><{$group_member_infos['category']['parent']['name']}></span><span class="color-<{$group_color}>"><{$group_member_infos['category']['name']}></span>
      </div>
      <div class="title-text" modelid="<?php echo $modelPage['qzbt']?>">
      	<if condition="$userId neq $group_member_infos['createrId']" >
      		<!----<a href="javascript:;" class="pc-btn">加入圈子</a>-->
	      	<if condition="$member_type == 1">
	            <a href="javascript:void(0);" class="pc-btn " data-action="joinGroup" data-userid="<{$userId}>" data-groupid="<{$gid}>" data-approvalType="<{$group_member_infos['approvalType']}>" event-id="B000P010">加入圈子</a>
	        <elseif condition="$member_type == 2" />
	            <a data-verify="1" class="pc-btn" href="javascript:void(0);" style="background: rgb(204, 204, 204) none repeat scroll 0% 0%;">审核中</a>
	        <elseif condition="$member_type == 0" />
	            <a data-verify="1" class="pc-btn" href="javascript:void(0);" data-action="joinGroup" data-userid="<{$userId}>" data-groupid="<{$gid}>" data-approvalType="<{$group_member_infos['approvalType']}>" event-id="B000P010">退出圈子</a>
	        </if>
	    </if>
      	<span>成员：<em><{$group_member_infos['memberQuantity']}></em></span>
      	<span>话题：<em><{$group_member_infos['topicQuantity']}></em></span>
      </div>
    </div>
  </div>
