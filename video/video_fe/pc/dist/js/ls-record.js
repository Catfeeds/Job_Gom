webpackJsonp([14],{FJ4y:function(e,t,a){"use strict";function n(e,t){return"string"!=typeof e&&(e=(0,u.default)(e)),t.substring(0,t.length-e.length)+e}Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),u=function(e){return e&&e.__esModule?e:{default:e}}(l);t.default=n},HY96:function(e,t,a){"use strict";a("QtMn")},MzmH:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a("Zx67"),u=n(l),r=a("Zrlr"),i=n(r),s=a("wxAW"),d=n(s),o=a("zwoO"),f=n(o),c=a("Pf15"),h=n(c);a("Ryvr"),a("bXnB"),a("HY96");var m=a("U7vG"),v=n(m),g=a("O27J"),p=n(g),_=a("v0nU"),y=n(_),E=a("r2+A"),M=n(E),D=a("uKk0"),k=n(D),b=function(e){function t(e){(0,i.default)(this,t);var a=(0,f.default)(this,(t.__proto__||(0,u.default)(t)).call(this,e));a.handleClick=function(e){e.preventDefault();var t=a.state.status;"finished"!==t&&"loading"!==t&&a.load()},a.handleDel=function(e){for(var t=a.state.list,n=0,l=t.length;n<l;n++)if(t[n].id===e){t.splice(n,1);break}a.setState({list:t},function(){this.videoRecord.remove(e)})},a.state={list:[],status:"loading"},a.videoRecord=M.default.getInstance();var n=a;return(0,k.default)("del-record").sub(function(e){n.handleDel(e)}),a}return(0,h.default)(t,e),(0,d.default)(t,[{key:"componentDidMount",value:function(){this.load()}},{key:"load",value:function(){var e=this;this.setState({status:"loading"},function(){this.videoRecord.get().then(function(t){var a="done",n=e.state.list.concat(t);n.length===t.total&&(a="finished"),e.setState({list:n,status:a})}).catch(function(t){e.setState({status:"fail"})})})}},{key:"_getText",value:function(){var e="点击加载更多",t=this.state.status;return"loading"===t?e="加载中...":"finished"===t&&(e="没有更多数据了"),e}},{key:"render",value:function(){var e=this.state.list,t=this.state.status,a=null,n=null,l=null,u=null;return e.length?(a=v.default.createElement(y.default,{list:e,onDel:this.handleDel}),n=v.default.createElement("h1",{className:"title"},"观看记录"),"finished"!==t&&(l=v.default.createElement("div",{className:"exchange"},v.default.createElement("a",{href:"#",onClick:this.handleClick},this._getText())))):"loading"!==t&&(u=v.default.createElement("div",{className:"no-data"},v.default.createElement("p",null,"你还没有观看记录"))),v.default.createElement("div",null,u,n,a,l)}}]),t}(v.default.Component);p.default.render(v.default.createElement(b,null),document.getElementById("record-container"))},QtMn:function(e,t){},Ryvr:function(e,t){},Vf7L:function(e,t,a){"use strict";function n(e,t){var a=e;return e.length>t&&(a=e.substr(0,t)+"..."),a}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"h/5q":function(e,t,a){"use strict";function n(e,t){var a=new Date(e),n={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length)));for(var l in n)new RegExp("("+l+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[l]:("00"+n[l]).substr((""+n[l]).length)));return t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},iadN:function(e,t,a){"use strict";function n(e){var t=0,a=0,n=0,l=0,r={},i=Math.floor;return e>0&&(t=i(e/1e3),t>=60&&(a=i(t/60),t%=60),a>=60&&(n=i(a/60),a%=60),n>=24&&(l=i(n/24),n%=24)),r.day=(0,u.default)(l,"00"),r.hour=(0,u.default)(n,"00"),r.min=(0,u.default)(a,"00"),r.sec=(0,u.default)(t,"00"),r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var l=a("FJ4y"),u=function(e){return e&&e.__esModule?e:{default:e}}(l)},v0nU:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){return"00"!==e.day?e.day+":"+e.hour+":"+e.min+":"+e.sec:"00"!==e.hour?e.hour+":"+e.min+":"+e.sec:e.min+":"+e.sec}Object.defineProperty(t,"__esModule",{value:!0});var u=a("Zx67"),r=n(u),i=a("Zrlr"),s=n(i),d=a("wxAW"),o=n(d),f=a("zwoO"),c=n(f),h=a("Pf15"),m=n(h),v=a("U7vG"),g=n(v),p=a("iadN"),_=n(p),y=a("Vf7L"),E=n(y),M=a("h/5q"),D=n(M),k=($CONFIG["domain-data"],function(e){function t(e){(0,s.default)(this,t);var a=(0,c.default)(this,(t.__proto__||(0,r.default)(t)).call(this,e));return a.handelDel=function(e){e.preventDefault();var t=a.props.data;a.props.onDel(t.id,t.website_id)},a}return(0,m.default)(t,e),(0,o.default)(t,[{key:"formatDate",value:function(e){return l((0,_.default)(e))}},{key:"render",value:function(){var e=this.props.data||{},t="/v/"+e.id+".html",a=null,n=null,l=null,u=null;return 1==e.video_type?(u=1e3*e.duration>e.length?e.length:1e3*e.duration,a=g.default.createElement("div",{className:"progress"},g.default.createElement("p",{style:{width:e.duration/Math.floor(e.length/1e3)*100+"%"}})),n=g.default.createElement("span",{className:"time"},this.formatDate(e.length)),l=g.default.createElement("div",{className:"list-time"},g.default.createElement("em",{className:"icon-29"}),g.default.createElement("span",null,"观看至",this.formatDate(u)))):(t="/s/"+e.id+".html",e.start_time&&(l=g.default.createElement("div",{className:"list-time"},g.default.createElement("span",null,"开始时间 ",(0,D.default)(1e3*e.start_time,"yyyy-MM-dd hh:mm"))))),g.default.createElement("li",{ref:"item"},g.default.createElement("div",{className:"img"},g.default.createElement("a",{href:t,target:"_blank"},g.default.createElement("img",{src:e.image}),g.default.createElement("em",{className:"icon-13",onClick:this.handelDel}),n,2!=e.online?g.default.createElement("span",{className:"offline"},"已下线"):null,a)),g.default.createElement("a",{href:t,className:"list-title",target:"_blank"},(0,E.default)(e.title,35)),l)}}]),t}(g.default.Component)),b=function(e){function t(e){(0,s.default)(this,t);var a=(0,c.default)(this,(t.__proto__||(0,r.default)(t)).call(this,e));return a.handleDel=function(e,t){a.props.onDel(e,t)},a}return(0,m.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this,t=this.props.list,a=t.map(function(t){var a=t.video_info;return a&&(t.image=a.image,t.length=a.length,t.title=a.title,t.id=a.id,t.status=a.status,t.online=a.online,t.video_type=a.video_type,t.start_time=a.start_time),g.default.createElement(k,{data:t,key:t.id,onDel:e.handleDel})});return g.default.createElement("ul",{className:"clearfix list-card"},a)}}]),t}(g.default.Component);t.default=b}},["MzmH"]);