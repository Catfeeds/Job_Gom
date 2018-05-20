{{each list as value}}
  <li class="circle-list">
      <div class="img"><a href="{{list.groupDomain}}circle/{{value.id}}.html" target="_blank"><img src="{{value.icon | showPic:'circle-default2.png'}}" onerror="imgError(this,'g')"></a></div>
      <a href="{{list.groupDomain}}circle/{{value.id}}.html" class="text-hide" target="_blank">{{value.name | substrLen:5}}</a>
      <div class="side-circle-pop clearfix">
          <div class="popbg"><img src="{{value.icon | showPic:'circle-default2.png'}}" onerror="imgError(this,'g')"><div class="bg"></div></div>
          <div class="triangle"></div>
          <div class="userhead"><a href="{{list.groupDomain}}circle/{{value.id}}.html" target="_blank"><img src="{{value.icon | showPic:'circle-default2.png'}}" onerror="imgError(this,'g')"></a></div>
          <div class="userinfo">
              <h3 class="username"><a href="{{list.groupDomain}}circle/{{value.id}}.html" target="_blank">{{value.name | substrLen:5}}</a></h3>
              <div class="tagbox"><span class="tag">{{value.cat}}</span></div>
              <p class="usernums"><span>成员：</span><span class="num">{{value.memberQuantity}}</span><span>话题：</span><span class="num">{{value.topicQuantity}}</span></p>
          </div>
     </div>
  </li> 
{{/each}}