webpackJsonp([15],[function(t,exports,a){(function($,t){"use strict";var a=$("[data-node=title]"),e=$("[data-node=title] a"),n=$("[data-node=content] img");a.on("click","a",function(a){var i=a.currentTarget;e.removeClass("active"),$(i).addClass("active");for(var c=0;c<n.length;c++)n[c].src=t.imgpath+"/images/other/"+i.innerHTML.split("-")[2].trim()+"-0"+(c+1)+".png"})}).call(exports,a(2),a(3))}]);
//# sourceMappingURL=playtogether.js.map