//限制输入框输入长度
var maxlength = function (node, maxlength) {
    node.on("input", function () {
        var val = this.value;
        if (val.length > maxlength) {
            this.value = val.substring(0, maxlength);
        }
    })
};
module.exports = maxlength;