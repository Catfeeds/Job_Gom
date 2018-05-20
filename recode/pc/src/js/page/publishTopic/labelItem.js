var fetch = require('io/fetch');
var url = require('io/url');
var checkLabelHtml = require('utils/unHtml');
var sensitiveLabel = require('./sensitiveLabel');
var alert = require('module/popup/alert');
var tplLenovo = require('./searchLenovo.tpl');

/**
 * 判断是否低于ie8
 */
var lessThenIE8 = function () {
    var UA = navigator.userAgent.toLowerCase(),
        isIE = UA.indexOf('msie') != -1,
        v = 500;
        if(isIE)v = /\d+/.exec(UA.split(';')[1]);
    return parseInt(v);
}

/**
 * 滚动条
 */
 if(lessThenIE8() < 10) {
 	if (!document.getElementsByClassName) {
	    document.getElementsByClassName = function (className, element) {
	        var children = (element || document).getElementsByTagName('*');
	        var elements = new Array();
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            var classNames = child.className.split(' ');
	            for (var j = 0; j < classNames.length; j++) {
	                if (classNames[j] == className) {
	                    elements.push(child);
	                    break;
	                }
	            }
	        }
	        return elements;
	    };
	}
 	$('[data-node=label-lists]').css({'height': '240px', 'overflow-y': 'scroll'});
 } else {
	var IScroll = require('./iscroll/iscroll');
	var scroll = new IScroll('#wrapper', {
	    mouseWheel: true,
	    scrollbars: true,
	    bounce: false
	});
 }

const tag_max_num = 10;
const inp_max_num = 15;
var tag_fri_num = 0;
var init = {
	timer : 0,
	// map : ["123123", "555", "111", "4444", "555555", "999", "555", "111", "4444", "555555", "999"],
	itemsArray : [],
	onOff : false,
	elementNode : {
		labCont : '[data-node=lab-cont]',
		searchLenovo : '[data-node=search-lenovo]',
		listSearch : '[data-node=list-search]',
		labelLists : '[data-node=label-lists]',
		fristItems : '[data-node=frist-items]',
		crtLists : '[data-node=crt-lists]',
		crtClose : '[data-node=crt-close]',
		labAlert : '[data-node=lab-alert]',
		senLabel : '[data-node=sen-label]',
		litFrist : '[data-node=list-frist]',
 		labTitle : '[data-node=lab-title]'
  	},
  	clickInput() {
  		var _this = this;
  		$(_this.elementNode.labTitle).on('click', function() {
  			$(this).hide();
  			$(_this.elementNode.labCont).focus();
  		})

  		$(_this.elementNode.labCont).on('focus', function() {
  			$(_this.elementNode.labTitle).hide();
  		})

  		$(_this.elementNode.labCont).on('blur', function() {
  			if(!$(_this.elementNode.labCont).val().length)$(_this.elementNode.labTitle).show();
  		})
  	},
	searchLenovo() {
		var _this = this;
		var text = '';
 		_this.clickInput();
		// $('[data-node="publishLabel"]')
		_this.closeLabel($(_this.elementNode.fristItems).attr('data-id'));
		$(document).on('click', function(event) {
			// event.stopPropagation();
			// console.log($(event.target)[0] != $(_this.elementNode.fristItems)[0])
			// if(($(event.target)[0].getAttribute('data-node') != _this.elementNode.fristItems) && ($(event.target)[0].getAttribute('data-node') != _this.elementNode.labCont) && ($(event.target)[0].getAttribute('data-node') != _this.elementNode.senLabel)[0]) {
				// console.log('document');
				$(_this.elementNode.searchLenovo).hide();
			// }
		});

		$(_this.elementNode.fristItems).on('mouseover', function() {
			if( lessThenIE8() > 7 ) {
				$(this).addClass('label-active');
				$(_this.elementNode.litFrist).removeClass('label-active');
			}
		}).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
			_this.LenovoAddLabel();
		}).on('mouseout', function() {
			$(this).removeClass('label-active');
		});

		$(_this.elementNode.labCont).on('focus', () => {
			if($(_this.elementNode.labCont).val().length == 0) {
				$(_this.elementNode.fristItems).hide();
			} else {
				$(_this.elementNode.searchLenovo).show();
			}
		}).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
			if($(_this.elementNode.labCont).val().length == 0) {
				$(_this.elementNode.fristItems).hide();
			} else {
				$(_this.elementNode.searchLenovo).show();
			}
		}).on('keyup', (event) => {
			// _this.timer = setInterval(() => {
				if($(_this.elementNode.labCont).val().length == 0) {
					$(_this.elementNode.fristItems).hide();
					$(_this.elementNode.listSearch).html('');
					$(_this.elementNode.searchLenovo).hide();
					scroll&&scroll.refresh();
				} else {
					$(_this.elementNode.searchLenovo).show();
					if($(_this.elementNode.labCont).val().length <= inp_max_num) {
			        _this.LenovoBandShow($(_this.elementNode.labCont).val());
					} else {
						/*
						    输入值为15个字符IE兼容模式
						*/
						// text = $(_this.elementNode.labCont).val().substring(0, inp_max_num);
						// $(_this.elementNode.labCont).val(text);
						if(!_this.onOff){
							_this.onOff=!_this.onOff;
							// alert("添加的标签最多为15个汉字");
						}
					}
				}

			// }, 1000);
		})
	},
	LenovoBandShow(req) {
		var _this = this;
		// console.log(req);
		req = req.replace(/^\s+|\s+$/g, '');
		_this.LenovoListShow();
		$(_this.elementNode.fristItems).show();
		fetch.get(url.get('tagSearch'), {
            data : {
            	keyword : req
            }
        }).done(function(res) {
            if (res && res.code === 200 && res.success) {
              // console.log(res)
              req = $(_this.elementNode.labCont).val().replace(/^\s+|\s+$/g, '');
              // console.log(res.data.keyword ,req)
              if(res.data.keyword === req)_this.LenovoListShow(res);
            } else {

            	// console.log(res);
            }
        }).fail(function(res) {
			$('.pub-lab-cont').val('');
			$(_this.elementNode.listSearch).html('');
			return false;
        }).always(function(res) {
			// console.log(res);
        });
	},
	LenovoListShow(res) {
    var _this = this;
    var htmlString = '';
    $(_this.elementNode.listSearch).find('li').remove();
    $(_this.elementNode.listSearch).html('');
    if(res && res.code === 200 && res.success){
      res.data.tags.forEach(function(item, index) {
      // console.log(item);
      // $('.label-lists').append(tplLenovo(
      // 	{ data : item }
      // ));
      if(item.name == $('.pub-lab-cont').val().replace(/^\s+|\s+$/g, '')){
        if( lessThenIE8() > 7 ) { $(_this.elementNode.fristItems).hide(); }
      }
      if(index == 0) {
        htmlString += `<li class="list-data label-active" data-node="list-frist" title="${item.name}" data-id="${item.id}"><span>${item.name}</span></li>`;

      } else {
        htmlString += `<li class="list-data" title="${item.name}" data-id="${item.id}"><span>${item.name}</span></li>`;
      }
      // $('.pub-search-lenovo').find('li span').html(req);
    })
      // console.log(htmlString)
        $(_this.elementNode.listSearch).append(htmlString);
        scroll&&scroll.refresh();
    }
		$(_this.elementNode.listSearch).find('li').each(function(index) {
			$(this).on('mouseover', function() {
				if(index != 0)$(_this.elementNode.litFrist).removeClass('label-active');
				$(this).addClass('label-active');
			}).on('click', function(event) {
				if(event&&event.stopPropagation)event.stopPropagation();
				if(window.event)window.event.cancelBubble = true;
				_this.othersAddLabel($(this), event);
			}).on('mouseout', function() {
				$(this).removeClass('label-active');
			});
		});
	},
	LenovoAddLabel() {
		var _this = this;
		// $(_this.elementNode.fristItems).find('span').on('click', function(event) {
		// 	event.stopPropagation();event.stopImmediatePropagation();
		// 	if(_this.itemsArray.length < tag_max_num) {
		// 		$(_this.elementNode.searchLenovo).hide();

		// 		if(!$('.pub-lab-cont').val() && !/\s+/g.test($('.pub-lab-cont').val())) {
		// 			alert("标签空白")
		// 			return false;
		// 		}
		// 		if(/\s+/g.test($('.pub-lab-cont').val())){
		// 			alert("标签不包含空格")
		// 			return false;
		// 		}
		// 		if(!_this.arrayInItems($('.pub-lab-cont').val(), _this.itemsArray)){
		// 			tag_fri_num++;

		// 			$(_this.elementNode.crtLists).append(`<li class="label-crt-items" id="crt-${tag_fri_num}"><span class="crt-items-md">${$('.pub-lab-cont').val()}</span><i class="crt-items-close" data-node="crt-close">×</i></li>`);
		// 			_this.closeLabel($(_this.elementNode.fristItems).attr('data-id'));

		// 			_this.addFristLabelFetch($('.pub-lab-cont').val(), tag_fri_num);
		// 		} else {
		// 			alert("标签重复")
		// 			return false;
		// 		}
		// 	} else {
		// 		alert(`标签最多展示${tag_max_num}个`)
		// 			return false;
		// 	}
		// 	// _this.itemsArray.push(`${$('.pub-lab-cont').val()}`);
		// });

		// $(_this.elementNode.fristItems).on('click', function(event) {
			// event.stopPropagation();event.stopImmediatePropagation();
			if(_this.itemsArray.length < tag_max_num) {
				$(_this.elementNode.searchLenovo).hide();
				if(!$('.pub-lab-cont').val() && !/\s+/g.test($('.pub-lab-cont').val())) {
					alert("标签空白")
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
					return false;
				}
				if(/\s+/g.test($('.pub-lab-cont').val())){
					alert("标签不能包含空格")
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
					return false;
				}
				if(sensitiveLabel($('.pub-lab-cont')[0], $('.pub-lab-cont').val(), init)){
					alert('标签中含有敏感词');
      		$(_this.elementNode.labTitle).hide();
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
       		return false;
				}
				if(!_this.arrayInNames($('.pub-lab-cont').val(), _this.itemsArray)){
					var tempStr = $('.pub-lab-cont').val().replace(/^\s+|\s+$/g, '');

		            // var result = tempStr.replace(/(<|>|\")/gi, function(match) {
		            // 	switch(match) {
	            	// 		case "<":
	            	// 		return "&lt;";
	            	// 		case ">":
	            	// 		return "&gt;";
	            	// 		case "\"":
	            	// 		return "&quot;";
		            // 	}
		            // });

		            // if(tempStr.match(/(<|>|\")/gi)) {
		            // 	alert('您编辑的内容中含有敏感词');
		            // 	return false;
		            // }
		            var result = checkLabelHtml.unhtml(tempStr);

					tag_fri_num++;

					_this.addFristLabelFetch(result,  tag_fri_num);
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
				} else {
					alert("标签重复")
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
					return false;
				}
			} else {
				alert(`标签最多展示${tag_max_num}个`);
				$('.pub-lab-cont').val('');
				$(_this.elementNode.listSearch).html('');
				return false;
			}
		// });
	},
	addFristLabelFetch(req, id) {
		var _this = this;
		fetch.post(url.get('tagCreate'), {
            data : {
            	name : req
            }
        }).done(function(res) {
            if (res && res.code === 200 && res.success) {
            	// data-id="${res.data.id}" title="${res.data.name}"
            	// console.log(res);
            	if(!_this.arrayInItems(res.data.id, _this.itemsArray)) {
					$(_this.elementNode.crtLists).append(`<li class="label-crt-items" id="crt-${tag_fri_num}" title=${res.data.name} data-id=${res.data.id}><span class="crt-items-md">${req}</span><i class="crt-items-close" data-node="crt-close">×</i></li>`);
	            	// $('#crt-'+ id).attr({
	            	// 	"data-id" : res.data.id,
	            	// 	"title" : res.data.name
	            	// });
		            _this.closeLabel($(_this.elementNode.fristItems).attr('data-id'));
	            	_this.closeArray();
            	} else {
        			alert("标签重复")
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
					return false;
            	}
            } else {

            	// console.log(res);
            }
        }).fail(function(res) {
			console.log(res);
			$('.pub-lab-cont').val('');
			$(_this.elementNode.listSearch).html('');
			return false;
        }).always(function(res) {
			// console.log(res);
        });
	},
	othersAddLabel(ele, event) {
		var _this = this;
		if(!/label-frist-items/ig.test(ele.attr('class'))){
			// ele.find('span').one('click', function(event) {
			// 	// console.log('ele handles');
			// 	ele.find('span').off('click');
			// 	if(_this.itemsArray.length < tag_max_num) {
			// 		$(_this.elementNode.searchLenovo).hide();
			// 		if(!_this.arrayInItems(ele.text(), _this.itemsArray)){
			// 			$(_this.elementNode.crtLists).append(`<li class="label-crt-items" data-id="${ele.attr("data-id")}" title="${ele.text()}"><span class="crt-items-md">${ele.text()}</span><i class="crt-items-close" data-node="crt-close">×</i></li>`);
			// 			_this.closeLabel(ele.attr('data-id'));
			// 		} else {
			// 			alert("标签重复")
			// 		}
			// 	} else {
			// 		alert(`标签最多展示${tag_max_num}个`)
			// 	}
			// 	// _this.itemsArray.push(`${ele.text()}`);
			// 	return false;
			// });
			// console.log(ele.find('span').get(0));
			// ele.one('click', function(event) {

				if(event&&event.stopPropagation)event.stopPropagation();
				// event.stopImmediatePropagation();
				if(window.event)window.event.cancelBubble = true;
				// console.log('ele');
				if(_this.itemsArray.length < tag_max_num) {
					$(_this.elementNode.searchLenovo).hide();

					var tempStr = ele.text();

	            	var result = checkLabelHtml.unhtml(tempStr);
					var resId = ele.attr('data-id');
					if(/(\s+|&nbsp)/g.test(tempStr)){
						alert("标签不能包含空格")
						$('.pub-lab-cont').val('');
						$(_this.elementNode.listSearch).html('');
						return false;
					}
					if(!_this.arrayInItems(resId, _this.itemsArray)){

						$(_this.elementNode.crtLists).append(`<li class="label-crt-items" data-id="${ele.attr("data-id")}" title="${result}"><span class="crt-items-md">${result}</span><i class="crt-items-close" data-node="crt-close">×</i></li>`);
						_this.closeLabel(ele.attr('data-id'));
						$('.pub-lab-cont').val('');
						$(_this.elementNode.listSearch).html('');
					} else {
						alert("标签重复")
						$('.pub-lab-cont').val('');
						$(_this.elementNode.listSearch).html('');
						return false;
					}
				} else {
					alert(`标签最多展示${tag_max_num}个`)
					$('.pub-lab-cont').val('');
					$(_this.elementNode.listSearch).html('');
					return false;
				}
				return false;
			// });

			// $(document).on('click', function(event) {
			// 	// event.stopPropagation();
			// 	if($(event.target)[0] != ele[0] && $(event.target)[0] != ele.find('span')[0] && $(event.target)[0] != $(_this.elementNode.labCont)[0]) {
			// 		// console.log('document');
			// 		$(_this.elementNode.searchLenovo).hide();
			// 	}
			// });
		}
	},
	closeArray(needId) {
		var closeEleArray = document.getElementsByClassName('label-crt-items');
		closeEleArray = Array.prototype.slice.call(closeEleArray, 0);
		this.itemsArray = closeEleArray.map((item) => {
			return {
				id : $(item).attr('data-id') ?  $(item).attr('data-id') : null,
				name : $(item).find('.crt-items-md').html()
			}
		});
		// console.log(this.itemsArray);
	},
	closeLabel(needId) {
		var _this = this;
		// $('.crt-items-close').each(function(index) {
		// 	$(this).off();
		// 	$(this).on('click', function() {
		// 		$(this).parent().remove();
		// 		_this.itemsArray.splice(rem, 1);
		// 		console.log(rem);
		// 		console.log(_this.itemsArray);
		// 	})
		// })

		// $('.crt-items-close').each(function(index, ele) {
		// 	ele.attr('data-index', index);
		// })
		_this.closeArray(needId);

		$(_this.elementNode.crtLists).off();
		$(_this.elementNode.crtLists).on('click', function(event) {
			if( $(event.target).attr('data-node') == 'crt-close' ) {
				$(event.target).parent().remove();
				_this.closeArray(needId);
			}
		})
	},
	arrayInItems(value, array) {
	  	var i = array.length;
		while (i--) {
		    if (array[i].id === value) {
		      return true;
		    }
		}
	    return false;
	},
	arrayInNames(value, array) {
	  	var i = array.length;
		while (i--) {
		    if (array[i].name === value) {
		      return true;
		    }
		}
	    return false;
	},
	alertComponent(Textstring) {
		var ElementStr = `<div data-node="lab-alert" class="publish-label-alert"><i class="publish-alert-icon"></i><span class="publish-alert-text">${Textstring}</span><b class="publish-label-triangle"></b></div>`;
	}
}


module.exports = init;
