{{each data as v idx}}
 <li>
  <div class="rec-circle-top">
    <span class="circle-img-item">
      <div  class="backgroundImg" style="width: 290px;height: 190px">
        <a href="{{v._group_url}}" target="_blank" title="{{v.cmsName}}"><!-- 圈子链接 -->
         <img data-original="{{v.cmsIcon}}">
        </a>
      </div>
      {{if v.introduction}}
        <div class="r-c-t-block overflow-one"> {{v.introduction}}</div>
      {{/if}}
    <span class="babel overflow-one">{{v.category_name}}</span>
    </span>
  </div>
  <div class="rec-circle-bottom">
    <p class="r-c-b-p1">
      <a href="{{v._group_url}}" target="_blank"><!-- 圈子链接 -->
      <span class="r-c-b-title overflow-one">{{v.cmsName}}</span>
     </a>
     {{if v.topicQuantity}}
     <span class="r-c-b-member last">话题<i class="r-c-b-i">{{v.topicQuantity}}</i></span>
     {{/if}}
     {{if v.memberQuantity}}
     <span class="r-c-b-member">成员<i class="r-c-b-i">{{v.memberQuantity}}</i></span>
     {{/if}}
    </p>
      {{each v.topics as val}}
      <p class="r-c-b-p2">
        <a class="overflow-one" href="{{val.topic_url}}" data-id='{{val.id}}' target="_blank">
        {{if val.type==1}}
          [话题]
        {{else}}
          [活动]
        {{/if}}
        {{#val.name}}</a>
      </p>
      {{/each}}
      <!--已加入 -->
      {{if v.status == 0}}
        <a class="add-circle add-hover none" href="javascript:void(0)" data-action="joinCircle" data-groupid={{v.group_id}}>
          <em></em>
          <span>加入圈子</span>
        </a>
        <a class="ok-add-circle" href="{{v._group_url}}" data-node="joinCircleSuc" target="_blank"> <em></em>
          <span>已加入</span>
        </a>
        <a class="add-circle check-add-circle none" href="{{v._group_url}}" data-node="joinCircleChk" target="_blank"><em> </em><span>审核中</span></a>
        <a class="add-circle refuse-add-circle none" href="{{v._group_url}}" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
        <!--审核中 -->
        {{else if v.status == 2}}
         <a class="add-circle add-hover none" href="javascript:void(0)" data-action="joinCircle" data-groupid={{v.group_id}}>
          <em></em>
          <span>加入圈子</span>
        </a>
        <a class="ok-add-circle none" href="{{v._group_url}}"
        data-node="joinCircleSuc" target="_blank"> <em></em>
          <span>已加入</span>
        </a>
        <a class="add-circle check-add-circle" href="{{v._group_url}}" data-node="joinCircleChk" target="_blank"><em> </em><span>审核中</span></a>
        <a class="add-circle refuse-add-circle none" href="{{v._group_url}}" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
        <!--未加入 -->
      {{else}}
        <a class="add-circle add-hover" href="javascript:void(0)" data-action="joinCircle" data-groupid={{v.group_id}}>
          <em></em>
          <span>加入圈子</span>
        </a>
        <a class="ok-add-circle none" href="{{v._group_url}}"
        data-node="joinCircleSuc" target="_blank"> <em></em>
          <span>已加入</span>
        </a>
        <a class="add-circle check-add-circle none" href="{{v._group_url}}" data-node="joinCircleChk" target="_blank"><em> </em><span>审核中</span></a>
        <a class="add-circle refuse-add-circle none" href="{{v._group_url}}" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>
      {{/if}}
  </div>
</li>
{{/each}}
