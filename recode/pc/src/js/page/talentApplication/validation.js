var fetch = require('io/fetch');
var urls = require('io/url');
var checkLabelHtml = require('utils/unHtml');
var toast = require('module/hint').init;

var initialize = {
	elements: {
		$talentname: '[data-node=talentname]',
		$talentmobile: '[data-node=talentmobile]',
		$talenttype: '[data-node=talenttype]',
		$talenttypediv: '[data-node=talenttypediv]',
		$talenttypepul: '[data-active=talenttypepul]',
		$talentsearch: '[data-node=talentsearch]',
		$talentlists: '[data-node=talentlists]',
		$talentarea: '[data-node=talentarea]',
		$talentareaKeyin: '[data-node=talentarea-keyin]',
		$talentcheck: '.talent-p-check',
		$talentuncheck: '.talent-p-uncheck',
		$talentsubmit: '.talent-p-submit'
	},
	data: {
		realName: '',
		mobile: '',
		categoryId: '',
		introduction: '',
		randStr: ''
	},
	timer: 0,
	agreeFlag: 1,
	init() {
		this.touchIpt();
		this.countIpt();
		if($GLOBAL_CONFIG['xm_tag'] == '1'){
			this.needFetchPull('get', 'expertCtgy', (data) => {
				$(this.elements.$talentsearch).append(
					data.data.expertCategories.map((item) => {
						return `<li class="talentlists" data-id="${item.id}" data-node="talentlists">${item.name}</li>`
					}).join("")
				);
			});
		}
	},
	removeSpace(val) {
		return val.replace(/\s+/gm,'');
	},
	needFetchPull(method, paths, successCallback, faultCallback) {
		fetch[method](urls.get(paths), {
			// xhr: () => {
			// 	var xhr = $.ajaxSettings.xhr();
			// if(this.onprogress && xhr.upload) {
			//   xhr.upload.addEventListener("progress" , this.onprogress, false);
			//   return xhr;
			// }
			// }
		}).done(function(data) {
			if (data.success === true) {
				successCallback && successCallback(data);
				// console.log(data);
			} else {
				faultCallback && faultCallback(data);
				console.log(data.message);
			}
		}).fail(function(error) {
			console.error(error);
		})
	},
	touchIpt() {
		var _this = this;
		$(this.elements.$talentname).on('blur', function() {
			$(this).val(_this.removeSpace($(this).val()));
			if(/^[\u4E00-\u9FA5aa-zA-Z]{2,20}$/.test(_this.removeSpace($(this).val()))) {
				initialize.data.realName = _this.removeSpace($(this).val());
				$(this).nextAll('span').hide();
			} else {
				initialize.data.realName = '';
				$(this).nextAll('span').html('请输入真实姓名').show();
			}
		});
		$(this.elements.$talentmobile).on('blur', function() {
			$(this).val(_this.removeSpace($(this).val()));
			if(_this.removeSpace($(this).val()).length != 0) {
				if(/^1[3|4|5|7|8][0-9]{9}$/.test(_this.removeSpace($(this).val()))) {
					initialize.data.mobile = _this.removeSpace($(this).val());
					$(this).nextAll('span').hide();
				} else {
					initialize.data.mobile = '';
					$(this).nextAll('span').html('请输入正确的手机号码').show();
				}
			} else {
				initialize.data.mobile = '';
				$(this).nextAll('span').html('请输入手机号').show();
			}
		});
		$(this.elements.$talenttype).on('blur', function() {
			if($(this).val().length != 0) {
				initialize.data.categoryId = $(this).val();
				$(this).nextAll('span').hide();
			} else {
				initialize.data.categoryId = '';
				$(this).nextAll('span').html('请选择达人类别').show();
			}
		});
		$(this.elements.$talentarea).on('blur', function() {
			if($(this).val().length != 0) {
				if($(this).val().length >= 2 && $(this).val().length <= 100) {
					initialize.data.introduction = $(this).val();
					$(this).nextAll('span').hide();
				} else {
					initialize.data.introduction = '';
					$(this).nextAll('span').html('请填写2--100个字符以内').show();
				}
			} else {
				$(this).nextAll('span').html('请填写个人介绍').show();
			}
		});
		$(this.elements.$talenttypediv).on('click',function(event) {
			if( $(event.target).attr('data-node') == 'talentlists' ) {
				$(_this.elements.$talentsearch).hide();
				$(_this.elements.$talenttype).nextAll('span').hide();
				$(_this.elements.$talenttype).attr('value',  $(event.target).attr('data-id'));
				initialize.data.categoryId =$(_this.elements.$talenttype).val();
				// css('talenttype-font-color')
				$(this).parent().find('p').html($(event.target).text());
			} else {
				if($(_this.elements.$talentsearch).is(":visible")) {
					$(_this.elements.$talentsearch).hide();
				} else {
					$(_this.elements.$talentsearch).show();
				}
			}
		});
		$(this.elements.$talenttypepul).on('click',function() {
			if($(_this.elements.$talentsearch).is(":visible")) {
				$(_this.elements.$talentsearch).hide();
			} else {
				$(_this.elements.$talentsearch).show();
			}
		});
		$(this.elements.$talentarea).on('keyup', function() {
			$(_this.elements.$talentareaKeyin).html($(this).val().length)
		}).on('paste', function() {
			$(_this.elements.$talentareaKeyin).html($(this).val().length)
		}).on('cut', function() {
			$(_this.elements.$talentareaKeyin).html($(this).val().length)
		}).on('copy', function() {
			$(_this.elements.$talentareaKeyin).html($(this).val().length)
		});
		$(this.elements.$talentsearch).on('mouseover', function(event) {
			if( $(event.target).attr('data-node') == 'talentlists' ) {
				$(event.target).addClass('active')
			}
		}).on('mouseout', function(event) {
			if( $(event.target).attr('data-node') == 'talentlists' ) {
				$(event.target).removeClass('active')
			}
		})
		$(this.elements.$talentcheck).on('click', function() {
			$(this).hide();
			initialize.agreeFlag = 0;
			$(_this.elements.$talentuncheck).show();
		})
		$(this.elements.$talentuncheck).on('click', function() {
			$(this).hide();
			initialize.agreeFlag = 1;
			$(_this.elements.$talentcheck).show();
		})
		$(this.elements.$talentsubmit).on('click', function() {
			return _this.checkData(initialize.data);
		})
	},
	ajaxSubmit(paths) {
		/* 修改调用接口 */
		console.log(paths)
		var _this = this;
		fetch.post(urls.get(paths), {
			data: initialize.data
		}).done(function(data) {
			if (data.success === true && data.code == 200) {
				console.log(data);
				toast('申请达人成功', {
                    callback: function() {
                    	//回跳到国美我的圈子
                        window.location.href = $GLOBAL_CONFIG['i_domain'] + 'expert/index';
                    }
                });
			} else {
				console.log(data.message);
				data.message = data.message ? data.message : '亲，您的手机网络不太顺畅喔～';
				toast(data.message, {
                    callback: function() {
                    	//回跳到国美我的圈子
                        window.location.href = $GLOBAL_CONFIG['i_domain'] + 'expert/index';
                    }
                });
			}
		}).fail(function(error) {
			console.error(error);
			toast('亲，您的手机网络不太顺畅喔～');
		})
	},
	checkData(data) {
		var _this = this;
		var flag = false;
		var flagArray = [];
		if(!initialize.agreeFlag) {
			toast('请同意《达人用户协议》');
		}

		if(/^[\u4E00-\u9FA5aa-zA-Z]{2,20}$/.test(_this.removeSpace($(_this.elements.$talentname).val()))) {
			initialize.data.realName = _this.removeSpace($(_this.elements.$talentname).val());
		} else {
			initialize.data.realName = '';
		}
		if(_this.removeSpace($(_this.elements.$talentmobile).val()).length != 0) {
			if(/^1[3|4|5|7|8][0-9]{9}$/.test(_this.removeSpace($(_this.elements.$talentmobile).val()))) {
				initialize.data.mobile = _this.removeSpace($(_this.elements.$talentmobile).val());
			} else {
				initialize.data.mobile = '';
			}
		} else {
			initialize.data.mobile = '';
		}
		if($(_this.elements.$talenttype).val().length != 0) {
			initialize.data.categoryId = $(_this.elements.$talenttype).val();
		} else {
			initialize.data.categoryId = '';
		}
		if($(_this.elements.$talentarea).val().length != 0) {
			if($(_this.elements.$talentarea).val().length >= 2 && $(_this.elements.$talentarea).val().length <= 100) {
				initialize.data.introduction = $(_this.elements.$talentarea).val();
			} else {
				initialize.data.introduction = '';
			}
		} else {
			initialize.data.introduction = '';
		}

		initialize.data.randStr = $('#randStr').val();
		for(var keys of Object.keys(data)) {
			if(data[keys] != '') {
				flag = true;
				flagArray.push(flag);
			} else {
				this.checkAlert(keys);
				flag = false;
				flagArray.push(flag);
			}
		}
		if(flagArray.indexOf(false) != -1) {
			this.countIpt();
			return false;
		} else {
			if(initialize.agreeFlag) {
				clearInterval(this.timer);
				console.log($GLOBAL_CONFIG['apply'] );
				if($GLOBAL_CONFIG['apply'] == '0'){this.ajaxSubmit('postExpert')}else if($GLOBAL_CONFIG['apply'] == '1'){this.ajaxSubmit('putExpert')}
			}
			return false;
		}
	},
	checkAlert(keys) {
		switch(keys)
		{
			case 'realName':
				$(initialize.elements.$talentname).nextAll('span').show();
				break;
			case 'mobile':
				$(initialize.elements.$talentmobile).nextAll('span').show();
				break;
			case 'categoryId':
				$(initialize.elements.$talenttype).nextAll('span').show();
				break;
			case 'introduction':
				$(initialize.elements.$talentarea).nextAll('span').show();
				break;
		}
	},
	countIpt() {
		var _this = this;
		clearInterval(_this.timer);
		_this.timer = setInterval(function() {
			$(_this.elements.$talentarea).val() && $(_this.elements.$talentareaKeyin).html($(_this.elements.$talentarea).val().length)
		}, 80);
	}
}
module.exports = initialize;
