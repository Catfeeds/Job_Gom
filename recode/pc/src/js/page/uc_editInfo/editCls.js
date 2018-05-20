var remCls = function($node, cls) {
    if ($node.hasClass(cls)) {
        $node.removeClass(cls);
    }
    return $node;
};
var addCls = function($node, cls) {
    if (!$node.hasClass(cls)) {
        $node.addClass(cls);
    }
    return $node;
};
module.exports = {
    remCls: remCls,
    addCls: addCls
};
