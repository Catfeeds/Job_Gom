webpackJsonp([32],[function(t,exports,n){(function($){"use strict";function t(){var t=$("[data-node=timer]"),n=$("[data-node=transit-btn]"),a=$GLOBAL_CONFIG.protocol+":"+$GLOBAL_CONFIG.staSite;n.attr("href",a);var e=t.html(),o=setInterval(function(){e--,0==e&&(location.href=a,clearInterval(o)),t.html(e)},1e3)}t()}).call(exports,n(2))}]);
//# sourceMappingURL=transit.js.map