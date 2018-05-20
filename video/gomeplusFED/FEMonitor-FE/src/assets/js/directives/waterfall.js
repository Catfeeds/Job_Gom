var Vue = require('vue');
var  perfCascade = require('../perf-cascade.js');

  var options = {
    rowHeight: 20, //default: 23
    showAlignmentHelpers : true, //default: true
    showIndicatorIcons: false, //default: true
    leftColumnWith: 30 ,//default: 25
  };
module.exports = {
    deep: true,
    bind: function () {
    },
    update: function (val, oldVal) {
        var _this = this;

        Vue.nextTick(function () {
            var har = val.log;
            var perfCascadeSvg =  perfCascade.fromHar(har, options);
            _this.el.appendChild(perfCascadeSvg);
        });
    },
    unbind: function () {

    }
};