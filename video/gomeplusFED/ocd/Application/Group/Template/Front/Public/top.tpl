<div class="circle-top" data-node="circle-top" style="background: url('<{$pcimgpath}>/images/circle_bg/bg<{$group_member_infos['group']['category']['parent']['id']}>.jpg') no-repeat center">
    <div class="user-head">
            <if condition="!empty($group_member_infos['group']['icon'])">
                <img onerror="imgError(this, 'g')" data-node="groupPic" src="<{$group_member_infos['group']['icon']}>" alt="<{$group_member_infos['group']['name']}>">
            <else />
                <img onerror="imgError(this, 'g')" data-node="groupPic" src="<{$pcimgpath}>/images/public/circle-default.png" alt="<{$group_member_infos['group']['name']}>">
            </if>
       </div>
    <h1 data-node="groupName" class="user-name"><{$group_member_infos['group']['name']}></h1>
    <div class="user-top-info">
        <ul class="clearfix">
            <li>分类：<span><{$group_member_infos['group']['category']['parent']['name']}>/<{$group_member_infos['group']['category']['name']}></span></li>
            <li>成员：<span><{$group_member_infos['group']['memberQuantity']}></span></li>
            <li>话题：<span><{$group_member_infos['group']['topicQuantity']}></span></li>
        </ul>
    </div>

    <div class="user-top-btns" data-node="share_btn">
        <if condition="$member_type == 1">
            <a href="javascript:void(0);" class="pc-btn join-circle-btn" data-action="joinGroup" data-userid="<{$userId}>" data-groupid="<{$gid}>" data-approvalType="<{$group_member_infos['group']['approvalType']}>" event-id="B000P010">加入圈子</a>

        <elseif condition="$member_type == 2" />
            <a data-verify="1" class="pc-btn pc-bj-fc8753 pc-btnw120 pc-btnh45" href="javascript:void(0);" style="background: rgb(204, 204, 204) none repeat scroll 0% 0%;">审核中</a>
        </if>
        <a href="javascript:void(0);" data-action="shareto" data-node="bannerShare" class="pc-btn pc-bj-fc8753 share-circle-btn">分享圈子</a> 
    </div>

</div>


