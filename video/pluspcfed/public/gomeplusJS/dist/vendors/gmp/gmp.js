!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.GMP=n(),"function"==typeof define&&define("vendors/gmp.js",n)}(this,function(){"use strict";function t(t){t._assignPros({_init:function(t){t=t||{},this._uid="g"+l++,f(this,t),this.el=this.el||"body",this._eventsMapList={},this._initState(),this._initEvents(),this._initEls(),this._callHook("init")}})}function n(t){return function(n){return h.toString.call(n)==="[object "+t+"]"}}function e(t){t._assignPros({_initEvents:function(){r(this,this.events)},undelegateEvents:function(){return this.$el&&this.$el.off(".delegateEvents"+this._uid),this},delegateEvents:function(t){if(t||(t=this.events),!t)return this;this.undelegateEvents();for(var n in t)if(t.hasOwnProperty(n)){var e=t[n];if(p.isFunction(e)||(e=this[e]),!e)continue;var r=n.match(v);this.delegate(r[1],r[2],e.bind(this))}return this},undelegate:function(t,n,e){return this.$el.off(t+".delegateEvents"+this._uid,n,e),this},delegate:function(t,n,e){return this.$el.on(t+".delegateEvents"+this._uid,n,e),this},_setElement:function(n){this.$el=n instanceof t.$()?n:t.$()(n),this.el=this.$el[0]},_callHook:function(t){var n=this[t];t&&n&&n.call(this)},on:function(t,n){var e=this._uid+t;this._eventsMapList[e]?this._eventsMapList[e].push(n):this._eventsMapList[e]=[n]},off:function(t){var n=this._uid+t;this._eventsMapList[n]&&(this._eventsMapList[n]=[])},trigger:function(t,n){var e=this,r=this._uid+t,i=this._eventsMapList[r];i&&i.forEach(function(t){t.apply(e,[n])})},destroy:function(){this.undelegateEvents(),this.$el.empty()}})}function r(t,n){return t.undelegateEvents(),t._setElement(t.el),t.delegateEvents(n),t}function i(t){t._assignPros({_initState:function(){this._initData()},_initData:function(){var t=this;this._data=this.data||{};for(var n=Object.keys(this._data),e=this,r=function(){var r=n[i],o=t._data[n[i]];return u=Object.getOwnPropertyDescriptor(t._data,r),u&&u.configurable===!1?"continue":void Object.defineProperty(e._data,r,{enumerable:!0,configurable:!0,get:function(){return o},set:function(t){var n=o;p.equal(t,n)||(o=t,e.trigger("change:"+r))}})},i=0,o=n.length;i<o;i++){var u;r()}},_initEls:function(){var n=this;this.els&&Object.keys(this.els).forEach(function(e){n.els[e]=n.els[e]instanceof t.$()?n.els[e]:t.$()(n.els[e])})}})}function o(t){var n={},e=function(t,e,r){n[t]=n[t]||[],n[t].push({scope:r||this,handler:e})},r=function(t,e,r){var i=n[t];r=r||this,i&&(n[t]=n[t].filter(function(t){return!!(e&&e!==t.callback||r&&r!==t.scope)}))},i=function(t){var e,r,i,o=n[t];if(o){for(var u=arguments.length,s=Array(u>1?u-1:0),c=1;c<u;c++)s[c-1]=arguments[c];for(e=0,i=o.length;e<i;e++)r=o[e],r.handler.apply(r.scope,s||[])}};t.GMPEvents={on:e,off:r,trigger:i,_events:n}}function u(t){P=k.test(t)?t:document.getElementById(t).innerHTML||"";var n=RegExp([(j.escape||w).source,(j.interpolate||w).source,(j.evaluate||w).source].join("|")+"|$","g"),e=0,r="__p+='";P.replace(n,function(t,n,i,o,u){return r+=P.slice(e,u).replace(O,E),e=u+t.length,n?r+="'+\n((__t=("+n+"))==null?'':_t.escape(__t))+\n'":i?r+="'+\n((__t=("+i+"))==null?'':__t)+\n'":o&&(r+="';\n"+o+"\n__p+='"),t}),r+="';\n",r="with(obj||{}){\n"+r+"}\n",r="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+r+"return __p;\n";try{var i=new Function("obj",r)}catch(o){throw o.source=r,o}var u=function(t){return i.call(this,t)},s="obj";return u.source="function("+s+"){\n"+r+"}",u}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=(function(){function t(t){this.value=t}function n(n){function e(t,n){return new Promise(function(e,i){var s={key:t,arg:n,resolve:e,reject:i,next:null};u?u=u.next=s:(o=u=s,r(t,n))})}function r(e,o){try{var u=n[e](o),s=u.value;s instanceof t?Promise.resolve(s.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(c){i("throw",c)}}function i(t,n){switch(t){case"return":o.resolve({value:n,done:!0});break;case"throw":o.reject(n);break;default:o.resolve({value:n,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=e,"function"!=typeof n["return"]&&(this["return"]=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(t){return this._invoke("next",t)},n.prototype["throw"]=function(t){return this._invoke("throw",t)},n.prototype["return"]=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new n(t.apply(this,arguments))}},await:function(n){return new t(n)}}}(),function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}),a=function(){function t(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}(),f=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},l=0,h=Object.prototype,p={isFunction:function(t){return n("Function")(t)},isObject:function(t){return n("Object")(t)},has:function(t,n){return null!=t&&h.hasOwnProperty.call(t,n)},create:function(t,n){return this.isObject(n)&&Object.keys(n).forEach(function(e){t[e]=n[e]}),t},defaults:function(t,n){var e=Object.keys(n);return e.forEach(function(e){t[e]&&void 0!==t[e]||(t[e]=n[e])}),t},mergeData:function(t,n){var e=void 0,r=void 0,i=void 0;for(e in n)r=t[e],i=n[e],Object.hasOwnProperty(t,e)?this.isObject(r)&&this.isObject(i)&&this.mergeData(r,i):Object.defineProperty(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i})},equal:function(t,n,e,r){if(t===n)return 0!==t||1/t===1/n;if(null==t||null==n)return t===n;var i=h.toString,o=i.call(t);if(o!==i.call(n))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+t==""+n;case"[object Number]":return+t!==+t?+n!==+n:0===+t?1/+t===1/n:+t===+n;case"[object Date]":case"[object Boolean]":return+t===+n}var u="[object Array]"===o;if(!u){if("object"!=("undefined"==typeof t?"undefined":s(t))||"object"!=("undefined"==typeof n?"undefined":s(n)))return!1;var c=t.constructor,a=n.constructor;if(c!==a&&!(this.isFunction(c)&&c instanceof c&&this.isFunction(a)&&a instanceof a)&&"constructor"in t&&"constructor"in n)return!1}e=e||[],r=r||[];for(var f=e.length;f--;)if(e[f]===t)return r[f]===n;if(e.push(t),r.push(n),u){if(f=t.length,f!==n.length)return!1;for(;f--;)if(!this.equal(t[f],n[f],e,r))return!1}else{var l,p=Object.keys(t);if(f=p.length,Object.keys(n).length!==f)return!1;for(;f--;)if(l=p[f],!this.has(n,l)||!this.equal(t[l],n[l],e,r))return!1}return e.pop(),r.pop(),!0}},v=/^(\S+)\s*(.*)$/,y=function(){function t(n){c(this,t),this._init(n)}return a(t,[{key:"_init",value:function(t){var n=this;if(!t)return Object.create(null);var e=Object.keys(t);this.state=t;for(var r=this,i=function(){var t=e[o],i=n.state[e[o]];return s=Object.getOwnPropertyDescriptor(n.state,t),s&&s.configurable===!1?"continue":void Object.defineProperty(r.state,t,{enumerable:!0,configurable:!0,get:function(){return i},set:function(t){var n=i;t!==n&&(i=t)}})},o=0,u=e.length;o<u;o++){var s;i()}}}]),t}(),d=function(t,n){var e,r=this;return e=t&&p.has(t,"constructor")?t.constructor:function(){return r.apply(this,arguments)},f(e,r,n),e.prototype=p.create(r.prototype,t),e.prototype.constructor=e,e.__super__=r.prototype,e},_={},g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},b=function(t){var n=function(n){return t[n]},e="(?:"+Object.keys(t).join("|")+")",r=RegExp(e),i=RegExp(e,"g");return function(t){return t=null==t?"":""+t,r.test(t)?t.replace(i,n):t}};_.escape=b(g);var j={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},w=/(.)^/,m={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,E=function(t){return"\\"+m[t]},k=/<[^>]+>/g,P="",S=function(){function t(n){c(this,t),this._init(n)}return a(t,null,[{key:"$",value:function(t){function n(){return t.apply(this,arguments)}return n.toString=function(){return t.toString()},n}(function(){if(window.jQuery||window.$||$)return window.jQuery||window.$||$;throw new Error("GMP need jQuery or Zepto in window scope named $")})},{key:"_assignPros",value:function(n){f(t.prototype,n)}}]),t}();return t(S),e(S),i(S),o(S),S.GMPX=y,S.extend=d,S.template=u,S});