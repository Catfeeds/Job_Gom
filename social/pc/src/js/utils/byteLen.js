var byteLen = function (str) {
    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
}

module.exports = byteLen;
