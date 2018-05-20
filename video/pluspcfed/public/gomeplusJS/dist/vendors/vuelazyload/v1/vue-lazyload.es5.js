!function(n,e){define("vendors/vue-lazyload.es5.js",e)}(this,function(n){"use strict";var e=n("vendors/es6-promise").Promise,i=function(n,i){var t=i.preLoad,r=void 0===t?1.3:t,o=i.error,a=i.loading,d=i.attempt,l=void 0===d?3:d,u="2"===n.version.split(".")[0],s="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",f={preLoad:r,error:o||s,loading:a||s,hasbind:!1,"try":l},c=[],A=[],g=function(n,e){var i=null,t=0;return function(){if(!i){var r=+new Date-t,o=this,a=arguments,d=function(){t=+new Date,i=!1,n.apply(o,a)};r>=e?d():i=setTimeout(d,e)}}},v={on:function(n,e,i){n.addEventListener(e,i)},off:function(n,e,i){n.removeEventListener(e,i)}},h=g(function(){for(var n=0,e=c.length;n<e;++n)b(c[n])},300),p=function(n,e){e?(v.on(n,"scroll",h),v.on(n,"wheel",h),v.on(n,"mousewheel",h),v.on(n,"resize",h),v.on(n,"animationend",h),v.on(n,"transitionend",h)):(f.hasbind=!1,v.off(n,"scroll",h),v.off(n,"wheel",h),v.off(n,"mousewheel",h),v.off(n,"resize",h),v.off(n,"animationend",h),v.off(n,"transitionend",h))},b=function(n){if(A.indexOf(n.src)>-1)return w(n.el,n.bindType,n.src,"loaded");var e=n.el.getBoundingClientRect();e.top<window.innerHeight*f.preLoad&&e.bottom>0&&e.left<window.innerWidth*f.preLoad&&e.right>0&&m(n)},w=function(n,e,i,t){e?n.setAttribute("style",e+": url("+i+")"):n.setAttribute("src",i),n.setAttribute("lazy",t)},m=function(n){return!(n["try"]>=f["try"])&&(n["try"]++,void y(n).then(function(e){var i=c.indexOf(n);i!==-1&&c.splice(i,1),w(n.el,n.bindType,n.src,"loaded"),A.push(n.src)})["catch"](function(e){w(n.el,n.bindType,n.error,"error")}))},y=function(n){return new e(function(e,i){var t=new Image;t.src=n.src,t.onload=function(){e(n.src)},t.onerror=function(){i()}})},E=function(n,e,i,t){if(n){for(var r=0,o=c.length;r<o;r++)c[r]&&c[r].el===n&&c.splice(r,1);f.hasbind&&0==c.length&&p(window,!1)}},z=function(e){var i=!1;return c.forEach(function(n){n.el===e&&(i=!0)}),i?n.nextTick(function(){h()}):i},B=function(e,i,t){if("loaded"!==e.getAttribute("lazy")&&!z(e)){var r=null,o=i.value,a=f.loading,d=f.error;"string"!=typeof i.value&&(o=i.value.src,a=i.value.loading||f.loading,d=i.value.error||f.error),i.modifiers&&(r=window.document.getElementById(Object.keys(i.modifiers)[0])),w(e,i.arg,a,"loading"),n.nextTick(function(){c.push({bindType:i.arg,"try":0,parentEl:r,el:e,error:d,src:o}),h(),c.length>0&&!f.hasbind&&(f.hasbind=!0,p(window,!0)),r&&p(r,!0)})}};u?n.directive("lazy",{bind:B,update:B,componentUpdated:h,unbind:E}):n.directive("lazy",{bind:h,update:function(n,e){B(this.el,{modifiers:this.modifiers,arg:this.arg,value:n,oldValue:e})},unbind:function(){E(this.el)}})};return i});