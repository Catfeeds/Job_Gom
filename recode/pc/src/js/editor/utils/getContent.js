var getContent = function(range) {

    range.select();

    var fragment = range.cloneContents();

    var node = document.createElement("div");

    if (fragment) {
        node.appendChild(fragment);
    } else {
        return '';
    }

    return node.innerHTML;
}

module.exports = getContent;
