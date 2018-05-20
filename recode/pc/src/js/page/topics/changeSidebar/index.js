var init = function() {
	var elementNode = {
		sameClassChange : {
			ele : '.circle-s-t-change',
			num : 0
		},
		groupList : '[data-node=groupList]',
		hotTopicChange : {
			ele : '.circle-t-t-change',
			num : 0
		},
		topicsList : '[data-node=topicsList]'
 	}
 	var changeLogic = clickEle => changeEle => {
		$(clickEle.ele).on("click", function() {
			if(clickEle.num < $(changeEle).length - 1) {
				clickEle.num++;
			} else {
				clickEle.num = 0;
			}
			$(changeEle).each(function(index, ele) {
				if(clickEle.num == index) {
					$(ele).show().siblings(changeEle).hide();
				}
			})
		})
 	}
 	changeLogic(elementNode.sameClassChange)(elementNode.groupList);
 	changeLogic(elementNode.hotTopicChange)(elementNode.topicsList);
}

module.exports = {
	init: init
}
