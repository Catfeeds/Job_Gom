webpackJsonp([10],{FJ4y:function(e,t,n){"use strict";function a(e,t){return"string"!=typeof e&&(e=(0,u.default)(e)),t.substring(0,t.length-e.length)+e}Object.defineProperty(t,"__esModule",{value:!0});var l=n("mvHQ"),u=function(e){return e&&e.__esModule?e:{default:e}}(l);t.default=a},HY96:function(e,t,n){"use strict";n("QtMn")},O7yE:function(e,t,n){"use strict";(function(e){function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=n("Zrlr"),u=a(l),i=n("wxAW"),o=a(i),r=n("ioS7"),s=function(){function t(n){var a=this;(0,u.default)(this,t),this.options=n||{},this.minHeight=this.options.minHeight||window.screen.height/2;e("body").append('<div class="back-top" title="返回顶部" style="display: block;opacity: 0;" id="back-top"><em class="icon-19"></em></div>'),e("#back-top").on("click",function(){a.scrollToTop(500)}),setTimeout(function(){e("#back-top").css({opacity:1})},0);var l=(0,r.throttle)(this.controlButton.bind(this),100);e(window).on("scroll",l),e(window).on("load",l)}return(0,o.default)(t,[{key:"controlButton",value:function(){e(window).scrollTop()>this.minHeight?e("#back-top").show():e("#back-top").hide()}},{key:"scrollToTop",value:function(e){var t=window.pageYOffset,n=Math.PI/Math.floor(e/15),a=t/2,l=0,u=void 0,i=setInterval(function(){0!=window.pageYOffset?(l+=1,u=a-a*Math.cos(l*n),window.scrollTo(0,t-u)):clearInterval(i)},15)}}]),t}();t.default=s}).call(t,n("7t+N"))},QOuX:function(e,t){},QtMn:function(e,t){},Uqn7:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var l=n("Zx67"),u=a(l),i=n("Zrlr"),o=a(i),r=n("wxAW"),s=a(r),d=n("zwoO"),c=a(d),f=n("Pf15"),h=a(f);n("QOuX"),n("bXnB"),n("HY96");var m=n("U7vG"),v=a(m),p=n("O27J"),g=a(p),y=n("v0nU"),_=a(y),E=n("r2+A"),b=a(E),k=n("O7yE"),w=(a(k),n("uKk0")),M=a(w),D=n("Y8sP"),N=a(D),O=function(e){function t(e){(0,o.default)(this,t);var n=(0,c.default)(this,(t.__proto__||(0,u.default)(t)).call(this,e));n.handleClick=function(e){e.preventDefault();var t=n.state.status;"finished"!==t&&"loading"!==t&&n.load()},n.handleDel=function(e,t){var a=n.state.today,l=n.state.before,u=0,i=0;for(i=a.length;u<i;u++)if(a[u].id===e){a.splice(u,1);break}for(u=0,i=l.length;u<i;u++)if(l[u].id===e){l.splice(u,1);break}n.setState({today:a,before:l},function(){this.videoRecord.remove(t)})},n.state={today:[],before:[],status:""},n.list=[],n.videoRecord=b.default.getInstance();var a=n;return(0,M.default)("del-record").sub(function(e,t){a.handleDel(e,t)}),n}return(0,h.default)(t,e),(0,s.default)(t,[{key:"parseList",value:function(e){var t=[],n=[];return e.forEach(function(e){(0,N.default)(new Date(1e3*e.create_time))?t.push(e):n.push(e)}),{today:t,before:n}}},{key:"componentDidMount",value:function(){this.load(!0)}},{key:"load",value:function(e){var t=this;this.setState({status:"loading"},function(){this.videoRecord.get().then(function(n){var a="done";n.length||(a=e?"nodata":"finished");var l=t.state,u=t.parseList(n);t.setState({before:l.before.concat(u.before),today:l.today.concat(u.today),status:a})}).catch(function(e){t.setState({status:"fail"})})})}},{key:"_getText",value:function(){var e="点击加载更多",t=this.state.status;return"loading"===t?e="加载中...":"finished"===t&&(e="没有更多数据了"),e}},{key:"render",value:function(){var e=this.state,t=e.before,n=e.today,a=null,l=null,u=null,i=null,o=!1;return n.length&&(o=!0,u=v.default.createElement("div",null,v.default.createElement("h1",{className:"title"},"今天"),v.default.createElement(_.default,{list:n,onDel:this.handleDel}))),t.length&&(o=!0,i=v.default.createElement("div",null,v.default.createElement("h1",{className:"title"},"更早"),v.default.createElement(_.default,{list:t,onDel:this.handleDel}))),o&&(a=v.default.createElement("div",{className:"exchange"},v.default.createElement("a",{href:"#",onClick:this.handleClick},this._getText()))),"nodata"===this.state.status&&(l=v.default.createElement("div",{className:"no-data record"},v.default.createElement("p",null,"你还没有观看记录"))),v.default.createElement("div",null,l,u,i,a)}}]),t}(v.default.Component);g.default.render(v.default.createElement(O,null),document.getElementById("record-container"))},Vf7L:function(e,t,n){"use strict";function a(e,t){var n=e;return e.length>t&&(n=e.substr(0,t)+"..."),n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},"h/5q":function(e,t,n){"use strict";function a(e,t){var n=new Date(e),a={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds(),"q+":Math.floor((n.getMonth()+3)/3),S:n.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length)));for(var l in a)new RegExp("("+l+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},iadN:function(e,t,n){"use strict";function a(e){var t=0,n=0,a=0,l=0,i={},o=Math.floor;return e>0&&(t=o(e/1e3),t>=60&&(n=o(t/60),t%=60),n>=60&&(a=o(n/60),n%=60),a>=24&&(l=o(a/24),a%=24)),i.day=(0,u.default)(l,"00"),i.hour=(0,u.default)(a,"00"),i.min=(0,u.default)(n,"00"),i.sec=(0,u.default)(t,"00"),i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var l=n("FJ4y"),u=function(e){return e&&e.__esModule?e:{default:e}}(l)},ioS7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.debounce=function(e,t,n){var a=void 0;return function(){function l(){a=null,n||e.apply(u,i)}var u=this,i=arguments,o=n&&!a;clearTimeout(a),a=setTimeout(l,t),o&&e.apply(u,i)}},t.throttle=function(e,t){var n=void 0,a=void 0,l=0;return function(){function u(){l=Date.now(),n=null,e.apply(i,o)}a=Date.now()-l,n&&clearTimeout(n);var i=this,o=arguments;a>t?u():n=setTimeout(u,t-a)}}},v0nU:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e){return"00"!==e.day?e.day+":"+e.hour+":"+e.min+":"+e.sec:"00"!==e.hour?e.hour+":"+e.min+":"+e.sec:e.min+":"+e.sec}Object.defineProperty(t,"__esModule",{value:!0});var u=n("Zx67"),i=a(u),o=n("Zrlr"),r=a(o),s=n("wxAW"),d=a(s),c=n("zwoO"),f=a(c),h=n("Pf15"),m=a(h),v=n("U7vG"),p=a(v),g=n("iadN"),y=a(g),_=n("Vf7L"),E=a(_),b=n("h/5q"),k=a(b),w=($CONFIG["domain-data"],function(e){function t(e){(0,r.default)(this,t);var n=(0,f.default)(this,(t.__proto__||(0,i.default)(t)).call(this,e));return n.handelDel=function(e){e.preventDefault();var t=n.props.data;n.props.onDel(t.id,t.website_id)},n}return(0,m.default)(t,e),(0,d.default)(t,[{key:"formatDate",value:function(e){return l((0,y.default)(e))}},{key:"render",value:function(){var e=this.props.data||{},t="/v/"+e.id+".html",n=null,a=null,l=null,u=null;return 1==e.video_type?(u=1e3*e.duration>e.length?e.length:1e3*e.duration,n=p.default.createElement("div",{className:"progress"},p.default.createElement("p",{style:{width:e.duration/Math.floor(e.length/1e3)*100+"%"}})),a=p.default.createElement("span",{className:"time"},this.formatDate(e.length)),l=p.default.createElement("div",{className:"list-time"},p.default.createElement("em",{className:"icon-29"}),p.default.createElement("span",null,"观看至",this.formatDate(u)))):(t="/s/"+e.id+".html",e.start_time&&(l=p.default.createElement("div",{className:"list-time"},p.default.createElement("span",null,"开始时间 ",(0,k.default)(1e3*e.start_time,"yyyy-MM-dd hh:mm"))))),p.default.createElement("li",{ref:"item"},p.default.createElement("div",{className:"img"},p.default.createElement("a",{href:t,target:"_blank"},p.default.createElement("img",{src:e.image}),p.default.createElement("em",{className:"icon-13",onClick:this.handelDel}),a,2!=e.online?p.default.createElement("span",{className:"offline"},"已下线"):null,n)),p.default.createElement("a",{href:t,className:"list-title",target:"_blank"},(0,E.default)(e.title,35)),l)}}]),t}(p.default.Component)),M=function(e){function t(e){(0,r.default)(this,t);var n=(0,f.default)(this,(t.__proto__||(0,i.default)(t)).call(this,e));return n.handleDel=function(e,t){n.props.onDel(e,t)},n}return(0,m.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){var e=this,t=this.props.list,n=t.map(function(t){var n=t.video_info;return n&&(t.image=n.image,t.length=n.length,t.title=n.title,t.id=n.id,t.status=n.status,t.online=n.online,t.video_type=n.video_type,t.start_time=n.start_time),p.default.createElement(w,{data:t,key:t.id,onDel:e.handleDel})});return p.default.createElement("ul",{className:"clearfix list-card"},n)}}]),t}(p.default.Component);t.default=M}},["Uqn7"]);