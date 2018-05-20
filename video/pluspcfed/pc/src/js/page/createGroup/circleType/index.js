var Pubsub = require('io/pubsub');
function init() {
    var circleBox = $('[data-node=circleBox]');
    var ParentList = circleBox.find('[data-node=categoryList]');
    var aParentList = circleBox.find('[data-node=catList]');
    var aList = circleBox.find('[data-node=categoryList2]');
    var typeId;
    var listReset = function() {
        aList.removeClass('show').addClass('hide').children().removeClass('active');
        typeId = undefined;
        Pubsub('setItem').pub(typeId);
    };
    function parentListReset(node) {
        node.removeClass('active').children().remove();
    };
    function choseParentList(event) {
        var _node = $(event.target);
        var nodeId = _node.attr('node-id');
        if (_node.hasClass('active')) {
            parentListReset(_node);
            listReset();
            return;
        }
        aList.each(function() {
            var _this = $(this);
            if (_this.attr('node-parent') == nodeId) {
                listReset();
                _this.removeClass('hide').addClass('show');
                parentListReset(aParentList);
                _node.append('<em class="iconn-26"></em>').addClass('active');
                return;
            }
        });
    };
    function choseList(event) {
        var _node = $(event.target);
        aList.children().removeClass('active');
        _node.addClass('active');
        typeId = _node.attr('node-id');
        Pubsub('setItem').pub(typeId);
    };
    ParentList.on('click', 'a', choseParentList);
    aList.on('click', 'a', choseList);
};
module.exports = {
    init: init
};