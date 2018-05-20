var Pubsub = require('io/pubsub');
var checkHtml = require('utils/unHtml');
var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var urls = require('io/url');

var i = 100
/**
 * 判断每一项是否写入
 */
var initialize = {
  refs : {
    $editImg : '[data-edit="editImg"]',
    $editName : '[data-edit="editName"]',
    $editLabel : '[data-edit="editLabel"]',
    $editDetail : '[data-edit="editDetail"]',
    $editBinding : '[data-edit="editBinding"]',
    $editCircleFri : '[data-edit="editCircleFri"]',
    $editCircleSec : '[data-edit="editCircleSec"]',
    $editCheck : '[data-edit="editCheck"]',
    $noticeBox : '[data-node="noticeBox"]',
    $noticeName : '[data-node="noticeName"]',
    $noticeLabel : '[data-node="noticeLabel"]',
    $noticeDetail : '[data-node="noticeDetail"]',
    $noticeBinding : '[data-node="noticeBinding"]',
    $noticeCircle : '[data-node="noticeCircle"]',
    $noticeCheck : '[data-node="noticeCheck"]',
    $editLabelSearch : '[data-edit="editLabelSearch"]',
    $editCircleFriSearch : '[data-edit="editCircleFriSearch"]',
    $editCircleSecSearch : '[data-edit="editCircleSecSearch"]',
    $editLabelList : '[data-edit="editLabelList"]',
    $editCircleFriList : '[data-edit="editCircleFriList"]',
    $editCircleSecList : '[data-edit="editCircleSecList"]',
    $editLabelDiv : '[data-edit="editLabelDiv"]',
    $editCircleFriDiv : '[data-edit="editCircleFriDiv"]',
    $editCircleSecDiv : '[data-edit="editCircleSecDiv"]',
    $editSubmit : '[data-submit="editSubmit"]',
    $ALert : '.affirm-popup',
    $ALertClose : '[data-node="close"]',
    $ALertUpdate : '[data-node="update"]',
    $editDivBind : '[data-edit="editDivBind"]'
  },
  state : {
    imgfail : 0,
    privateTag : [],
    privateCateList : [],
    filter : {
      editImg : false,
      editName : false,
      editNameArr : [],
      editLabel : false,
      editDetail : false,
      editDetailArr : [],
      editBinding : false,
      editBindingArr : [],
      editCircleFri : false,
      editCircleSec : false,
      editCheck : false,
      categoryId : 0,
      editCircleId : 0,
    },
    filterData : false,
    cateListRes : [],
    editDataId : 0,
    subListRes : [],
    autoBinding : true,
  },
  init(Action) {
    var _this = this;
    this.state.action = Action;
    window.onbeforeunload = function() {
      // console.log(1)
      return ''
    }
    window.onunload = function() {
      // console.log(2)
      return ''
    }
    this.touchIpt();
    this.allPull(this.openPage);
    Pubsub('editImg').sub(function(booleans) {
      if(booleans) {
        _this.state.imgfail = 0;
        // console.log('头像上传成功')
        _this.bindLock();
      } else {
        _this.state.imgfail = 1;
        _this.state.filter.editImg = false;
        // console.log('头像上传未成功')
        _this.bindLock();
      }
      // console.log(_this.state.imgfail)
    });
  },
  openPage(_this) {
    switch (_this.state.action) {
      case "ADD_PRIVATE":
          _this.bindLock();
        break;
      case "REPAIR_AMEND":
          _this.checkData(initialize.state.filter);
        break;
      case "ADD_COMPANY":
          _this.bindLock();
        break;
      case "COMPANY_AMEND":
          _this.checkData(initialize.state.filter);
        break;
      case "STAGE_AMEND":
          _this.checkData(initialize.state.filter);
        break;
      case "BAND_FAIL":
          _this.checkData(initialize.state.filter);
        break;
      default:
        return false;
    }
  },
  removeSpace(val) {
    return val&&val.replace(/\s+/gm, '');
  },
  removeSpaceTb(val) {
    return val&&val.replace(/(^\s*)|(\s*$)/gm, '');
  },
  allPull(fn) {
    var _this = this;
    this.needFetchPull({}, 'get', 'privateTag', (data) => {
      initialize.state.privateTag = data.data;
      $(this.refs.$editLabelSearch).append(
        data.data.map((item) => {
          return `<li data-id="${item.id}" data-edit="editLabelList"><a href="javascript:;">${checkHtml.unhtml(item.name)}</a></li>`
        }).join("")
      );
      fn(_this);
    });

    this.needFetchPull({}, 'get', 'privateCateList', (data) => {
      initialize.state.privateCateList = initialize.state.cateListRes = data.data;
      $(this.refs.$editCircleFriSearch).append(
        data.data.map((item) => {
          return `<li data-id="${item.id}" data-edit="editCircleFriList"><a href="javascript:;">${checkHtml.unhtml(item.name)}</a></li>`
        }).join("")
      );
      fn(_this);
    });
  },
  needFetchPull(dataJson, method, paths, successCallback, faultCallback) {
		fetch[method](urls.get(paths), dataJson).done(function(data) {
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
  checkTitle (_this, _input, _state, $_ele, alertStr, cb, type) {
    initialize.state.filter.editName = checkHtml.html(initialize.state.filter.editName);
    initialize.state.filter.editDetail = checkHtml.html(initialize.state.filter.editDetail);
    initialize.state.filter.editBinding = checkHtml.html(initialize.state.filter.editBinding);
    _state = false;
    if($(_input).val() != undefined && $(_input).val().length) {
      _state = false;
      //敏感词
      // console.log($($_ele).html())
      _this.needFetchPull({
        data: {
          text: $(_input).val()
        }
      }, 'post', 'meihaoTitle', (data) => {
        if(data && !data.data.length) {
          $($_ele).html(alertStr);
          $($_ele).removeClass('right-error');

            //名字重复
            if(type) {
              _this.needFetchPull({
                data: {
                  name: $(_input).val()
                }
              }, 'get', 'meihaoName', (data) => {
                if(data && data.data) {
                  $($_ele).html(alertStr);
                  $($_ele).removeClass('right-error');

                  //基础逻辑
                  cb && cb();
                } else {
                  $($_ele).html('您输入的名称已被占用，请换个名称');
                  $($_ele).addClass('right-error');
                  _this.unGoon();
                  return false;
                }
              }, (error) => {
                alert(error.message);
                _state = false;
                return false;
              });
            } else {
              //基础逻辑
              cb && cb();
            }

        } else {
          $($_ele).html('您输入的名称中含有敏感词，请重新输入');
          $($_ele).addClass('right-error');
          _this.unGoon();
          _state = false;
          return false;
        }

      }, (error) => {
        $($_ele).html('您输入的名称中含有敏感词，请重新输入');
        $($_ele).addClass('right-error');
        _this.unGoon();
        _state = false;
        return false;
      });
    } else {
      //基础逻辑
      cb && cb();
    }
  },
  touchIpt() {
    var _this = this;

    $(this.refs.$editName).on('focus', function() {
      // _this.unGoon();
      initialize.state.filter.editName = false;
      // $(_this.refs.$noticeName).removeClass('right-error');
    });
    $(this.refs.$editDetail).on('focus', function() {
      // _this.unGoon();
      // initialize.state.filter.editDetail = false;
      // $(_this.refs.$noticeDetail).removeClass('right-error');
    });
    $(this.refs.$editBinding).on('focus', function() {
      // _this.unGoon();
      // initialize.state.filter.editBinding = false;
      // $(_this.refs.$noticeBinding).removeClass('right-error');
      if($(this).val() == $(_this.refs.$editName).val()) {
        _this.state.autoBinding = true;
      } else {
        _this.state.autoBinding = false;
      }
    });
    $(this.refs.$editCircleFri).on('focus', function() {
      // _this.unGoon();
      // initialize.state.filter.editCircleFri = false;
      // $(_this.refs.$noticeCircle).removeClass('right-error');
    });
    $(this.refs.$editCircleSec).on('focus', function() {
      // _this.unGoon();
      // initialize.state.filter.editCircleSec = false;
      // $(_this.refs.$noticeCircle).removeClass('right-error');
    });

    $(document).on('click', function(event) {
      $(_this.refs.$editLabelSearch).hide();
      $(_this.refs.$editCircleFriSearch).hide();
      $(_this.refs.$editCircleSecSearch).hide();
    });

    $(this.refs.$editName).on('blur', function() {
      $(this).val(_this.removeSpace($(this).val()));
      if(!_this.state.autoBinding) {
        $(_this.refs.$editBinding).val($(_this.refs.$editBinding).val());
      } else {
        $(_this.refs.$editBinding).val($(this).val());
      }
      let formatReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(_this.removeSpace($(this).val()));
      // console.log(!formatReg && $(this).val().length >= 2 && $(this).val().length <= 15);
      _this.checkTitle(_this, this, initialize.state.filter.editName, _this.refs.$noticeName, '名称长度为2-15个字，不含有特殊字符',() => {
        if(!formatReg && $(this).val() && $(this).val().length >= 2 && $(this).val().length <= 15) {
          initialize.state.filter.editName = checkHtml.unhtml(_this.removeSpace($(this).val()));
          $(_this.refs.$noticeName).html('名称长度为2-15个字，不含有特殊字符');
          $(_this.refs.$noticeName).removeClass('right-error');
        } else {
          initialize.state.filter.editName = false;
          $(_this.refs.$noticeName).html('名称长度为2-15个字，不含有特殊字符');
          $(_this.refs.$noticeName).addClass('right-error');
          return false;
        }

        _this.checkTitle(_this, this, initialize.state.filter.editBinding, _this.refs.$noticeBinding, '15个字以内，您发的内容可在绑定的圈子中展示',() => {
          if(/^.{1,15}$/.test(_this.removeSpace($(this).val()))) {
            initialize.state.filter.editBinding = checkHtml.unhtml(_this.removeSpace($(this).val()));
            $(_this.refs.$noticeBinding).removeClass('right-error');
          } else {
            initialize.state.filter.editBinding = false;
            $(_this.refs.$noticeBinding).addClass('right-error');
          }
        });
        _this.bindLock();
      }, 'name');
    })
    // $(this.refs.$editLabel).on('blur', function() {
    //   if($(this).val().length != 0) {
    //     initialize.state.filter.editLabel = $(_this).val();
    //     $(_this.refs.$noticeLabel).html('');
    //   } else {
    //     initialize.state.filter.editLabel = false;
    //     $(_this.refs.$noticeLabel).html('选择您擅长/感兴趣的领域').show();
    //   }
    // });
    $(this.refs.$editDetail).on('blur', function() {
      $(this).val(_this.removeSpaceTb($(this).val()));
      let formatReg = new RegExp("[`@#^&*|''\\[\\]<>/@#&*——|]").test($(this).val());
      _this.checkTitle(_this, this, initialize.state.filter.editDetail, _this.refs.$noticeDetail, '简介长度为4-120个字，不含有特殊字符',() => {
  			if(!formatReg && $(this).val().length != 0) {
  				if($(this).val().length >= 4 && $(this).val().length <= 120) {
            initialize.state.filter.editDetail = checkHtml.unhtml($(this).val());
  					$(_this.refs.$noticeDetail).removeClass('right-error');
  				} else {
            initialize.state.filter.editDetail = false;
  					$(_this.refs.$noticeDetail).addClass('right-error');
  				}
  			} else {
          initialize.state.filter.editDetail = false;
  				$(_this.refs.$noticeDetail).addClass('right-error');
  			}
        // console.log(11111)
        _this.bindLock();
      });
		})
    $(this.refs.$editBinding).on('blur', function() {
      if($(this).val() == $(_this.refs.$editName).val()) {
        _this.state.autoBinding = true;
      } else {
        _this.state.autoBinding = false;
      }
      $(this).val(_this.removeSpace($(this).val()));
      _this.checkTitle(_this, this, initialize.state.filter.editBinding, _this.refs.$noticeBinding, '15个字以内，您发的内容可在绑定的圈子中展示',() => {
        if(/^.{1,15}$/.test(_this.removeSpace($(this).val()))) {
          initialize.state.filter.editBinding = checkHtml.unhtml(_this.removeSpace($(this).val()));
          $(_this.refs.$noticeBinding).removeClass('right-error');
        } else {
          initialize.state.filter.editBinding = false;
          $(_this.refs.$noticeBinding).addClass('right-error');
        }
        _this.bindLock();
      });
    })
    $(this.refs.$editCircleFri).on('blur', function() {
      if($(this).val().length != 0) {
        initialize.state.filter.editCircleFri = $(_this).val();
        $(_this.refs.$noticeCircle).removeClass('right-error');
      } else {
        initialize.state.filter.editCircleFri = false;
        $(_this.refs.$noticeCircle).addClass('right-error');
      }
      _this.bindLock();
    })
    $(this.refs.$editCircleSec).on('blur', function() {
      if($(this).val().length != 0) {
        initialize.state.filter.editCircleSec = $(_this).val();
        $(_this.refs.$noticeCircle).removeClass('right-error');
      } else {
        initialize.state.filter.editCircleSec = false;
        $(_this.refs.$noticeCircle).addClass('right-error');
      }
      _this.bindLock();
    })
    $(this.refs.$editLabelDiv).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
      $(_this.refs.$editCircleFriSearch).hide();
      $(_this.refs.$editCircleSecSearch).hide();
			if($(_this.refs.$editLabelSearch).is(":visible")) {
        $(this).find('span').removeClass('lable-btn');
				$(_this.refs.$editLabelSearch).hide();
			} else {
        $(this).find('span').addClass('lable-btn');
				$(_this.refs.$editLabelSearch).show();
			}
      _this.bindLock();
    });
    $(this.refs.$editLabelSearch).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
      $(_this.refs.$editCircleFriSearch).hide();
      $(_this.refs.$editCircleSecSearch).hide();
      if( $(event.target).parent().attr('data-edit') == 'editLabelList' ) {
        $(this).hide();
				$(_this.refs.$noticeLabel).removeClass('right-error');
				$(_this.refs.$noticeLabel).attr('value',  $(event.target).parent().attr('data-id'));
				initialize.state.filter.editLabel = $(event.target).text();
        initialize.state.filter.categoryId = $(_this.refs.$noticeLabel).attr('value');
        $(_this.refs.$editLabelDiv).find('div').html(checkHtml.unhtml($(event.target).text()));
			}
      _this.bindLock();
    });
    $(this.refs.$editCircleFriDiv).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
      $(_this.refs.$editLabelSearch).hide();
      $(_this.refs.$editCircleSecSearch).hide();
			if($(_this.refs.$editCircleFriSearch).is(":visible")) {
        $(this).find('span').removeClass('lable-btn');
				$(_this.refs.$editCircleFriSearch).hide();
			} else {
        $(this).find('span').addClass('lable-btn');
				$(_this.refs.$editCircleFriSearch).show();
			}
    });
    $(this.refs.$editCircleFriSearch).on('click', function(event) {
  		if(event&&event.stopPropagation)event.stopPropagation();
  		if(window.event)window.event.cancelBubble = true;
      $(_this.refs.$editLabelSearch).hide();
      $(_this.refs.$editCircleSecSearch).hide();
      if( $(event.target).parent().attr('data-edit') == 'editCircleFriList' ) {
        initialize.state.filter.editCircleSec = false;
				initialize.state.filter.editCircleId = false;
        $(_this.refs.$editCircleSecDiv).find('div').html('');
        $(_this.refs.$noticeCircle).addClass('right-error');
        $(this).hide();
				// $(_this.refs.$noticeCircle).removeClass('right-error');
				$(_this.refs.$noticeCircle).attr('value',  $(event.target).parent().attr('data-id'));
				initialize.state.filter.editCircleFri = $(event.target).text();
				initialize.state.editDataId = $(event.target).parent().attr('data-id');
        // console.log(initialize.state.editDataId, initialize.state.cateListRes);
				$(_this.refs.$editCircleFriDiv).attr('data-id', $(event.target).parent().attr('data-id')).find('div').html($(event.target).text());

        initialize.state.subListRes = initialize.state.cateListRes.filter(function(item, index) {
          return item.id == initialize.state.editDataId;
        });
        $(_this.refs.$editCircleSecSearch).html(
          initialize.state.subListRes[0] && initialize.state.subListRes[0].children.map((item) => {
            return `<li data-id="${item.id}" data-edit="editCircleSecList"><a href="javascript:;">${item.name}</a></li>`
          }).join("")
        );
        _this.bindLock();
      }
    });
    $(this.refs.$editCircleSecDiv).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
      $(_this.refs.$editLabelSearch).hide();
      $(_this.refs.$editCircleFriSearch).hide();
			if($(_this.refs.$editCircleSecSearch).is(":visible")) {
        $(this).find('span').removeClass('lable-btn');
				$(_this.refs.$editCircleSecSearch).hide();
			} else {
        $(this).find('span').addClass('lable-btn');
				$(_this.refs.$editCircleSecSearch).show();
			}
    });
    $(this.refs.$editCircleSecSearch).on('click', function(event) {
			if(event&&event.stopPropagation)event.stopPropagation();
			if(window.event)window.event.cancelBubble = true;
      $(_this.refs.$editLabelSearch).hide();
      $(_this.refs.$editCircleFriSearch).hide();
      if( $(event.target).parent().attr('data-edit') == 'editCircleSecList' ) {
        $(this).hide();
				$(_this.refs.$noticeCircle).removeClass('right-error');
				$(_this.refs.$noticeCircle).attr('sub-value',  $(event.target).parent().attr('data-id'));
        // console.log($(_this.refs.$noticeCircle).attr('sub-value'))
        initialize.state.filter.editCircleSec = $(event.target).text();
				initialize.state.filter.editCircleId = $(_this.refs.$noticeCircle).attr('sub-value');
        $(_this.refs.$editCircleSecDiv).attr('data-subid', $(event.target).parent().attr('data-id')).find('div').html($(event.target).text());
        _this.bindLock();
      }
    });
    $(this.refs.$editCheck).on('click', function() {
      if($(_this.refs.$editCheck).is(':checked')) {
        initialize.state.filter.editCheck = true;
				$(_this.refs.$noticeCheck).removeClass('right-error');
			} else {
				initialize.state.filter.editCheck = false;
				$(_this.refs.$noticeCheck).addClass('right-error');
			}
      _this.bindLock();
    });

    $(this.refs.$editSubmit).on('click', function() {
      _this.onClickBtn(initialize.state.filter);
    });
  },
  onClickBtn(data) {
    var _this = this;
    _this.checkData(data, () => {

      // console.log(initialize.state.filter);
      if(_this.state.filterData) {
        switch (_this.state.action) {
          case "STAGE_AMEND":
            initialize.state.filter.editName = checkHtml.html(initialize.state.filter.editName);
            initialize.state.filter.editLabel = checkHtml.html(initialize.state.filter.editLabel);
            initialize.state.filter.editDetail = checkHtml.html(initialize.state.filter.editDetail);
            initialize.state.filter.editBinding = checkHtml.html(initialize.state.filter.editBinding);
            _this.needFetchPull({
              data : {
                imageUrl: initialize.state.filter.editImg,
                name: initialize.state.filter.editName,
                categoryId: initialize.state.filter.categoryId,
                introduction: initialize.state.filter.editDetail
              }
            }, 'post', 'modifySetting', (data) => {
              console.log(data);
              window.onbeforeunload = window.onunload = null;
              window.location.href = '/setting/index';
            }, (error) => {
              alert(error.message);
            });
            break;

          case "BAND_FAIL":
            initialize.state.filter.editName = checkHtml.html(initialize.state.filter.editName);
            initialize.state.filter.editLabel = checkHtml.html(initialize.state.filter.editLabel);
            initialize.state.filter.editDetail = checkHtml.html(initialize.state.filter.editDetail);
            initialize.state.filter.editBinding = checkHtml.html(initialize.state.filter.editBinding);
            _this.needFetchPull({
              data : {
                groupCategoryId: initialize.state.filter.editCircleId,
                groupName: initialize.state.filter.editBinding
              }
            }, 'post', 'groupRebind', (data) => {
              console.log(data);
              window.onbeforeunload = window.onunload = null;
              window.location.href = '/index/index';
            }, (error) => {
              alert(error.message);
            });
            break;

          default:
            // console.log($(_this.refs.$editDivBind).text());
            if($(_this.refs.$editDivBind).text())initialize.state.filter.editBinding = $(_this.refs.$editDivBind).text();
          // initialize.state.filter.editName = checkHtml.unhtml(initialize.state.filter.editName);
          // initialize.state.filter.editDetail = checkHtml.unhtml(initialize.state.filter.editDetail);
          // initialize.state.filter.editBinding = checkHtml.unhtml(initialize.state.filter.editBinding);
            $('.popup-info').html(`
              <div class="info-title">请确认您填写的信息是否有误    </div>
                <div class="info pt26 clearfix">
                  <p>美号头像</p>
                  <div class="info-head"><img src="${initialize.state.filter.editImg}" alt=""></div>
                </div>
                <div class="info clearfix">
                  <p>美号名称</p>
                  <div class="info-name">${checkHtml.unhtml(initialize.state.filter.editName)}</div>
                </div>
                <div class="info clearfix">
                  <p>美号标签</p>
                  <div class="info-label">${checkHtml.unhtml(initialize.state.filter.editLabel)}</div>
                </div>
                <div class="info clearfix">
                  <p>美号简介</p>
                  <div class="info-intro">
                     ${checkHtml.unhtml(initialize.state.filter.editDetail)}
                  </div>
                </div>
                <div class="info clearfix">
                  <p>绑定圈子
                    <div>
                      <div class="info-circle">${checkHtml.unhtml(initialize.state.filter.editBinding)}</div>
                      <div class="info-notice">绑定圈子一经提交，不能修改</div>
                    </div>
                  </p>
                </div>
                <div class="choose-btn clearfix">
                  <div class="continue" data-node="update"><a href="javascript:;">确认</a></div>
                  <div class="back" data-node="close"><a href="javascript:;">返回修改</a></div>
                </div>
                <div class="popup-close" data-node="close"><a href="javascript:;"></a></div>
              </div>
            `);

              initialize.state.filter.editName = checkHtml.html(initialize.state.filter.editName);
              initialize.state.filter.editLabel = checkHtml.html(initialize.state.filter.editLabel);
              initialize.state.filter.editDetail = checkHtml.html(initialize.state.filter.editDetail);
              initialize.state.filter.editBinding = checkHtml.html(initialize.state.filter.editBinding);
              // console.log(initialize.state.filter)
            break;
        }

        $(_this.refs.$ALertClose).on('click', function() {
          $(_this.refs.$ALert).hide();
        });

        $(_this.refs.$ALertUpdate).on('click', function() {
          switch (_this.state.action) {
            case "ADD_PRIVATE":
              _this.needFetchPull({
                data : {
                  type: 0,
                  imageUrl: initialize.state.filter.editImg,
                  name: initialize.state.filter.editName,
                  categoryId: initialize.state.filter.categoryId,
                  introduction: initialize.state.filter.editDetail,
                  groupCategoryId: initialize.state.filter.editCircleId,
                  groupName: initialize.state.filter.editBinding
                }
              }, 'post', 'createPrivate', (data) => {
                console.log(data);
                window.onbeforeunload = window.onunload = null;
                window.location.href = '/account/awaitPrivate';
              }, (error) => {
                alert(error.message);
              });
              break;

            case "REPAIR_AMEND":
              _this.needFetchPull({
                data : {
                  imageUrl: initialize.state.filter.editImg,
                  name: initialize.state.filter.editName,
                  categoryId: initialize.state.filter.categoryId,
                  introduction: initialize.state.filter.editDetail
                }
              }, 'post', 'editPrivate', (data) => {
                console.log(data);
                window.onbeforeunload = window.onunload = null;
                window.location.href = '/account/awaitPrivate';
              }, (error) => {
                alert(error.message);
              });
              break;

            case "ADD_COMPANY":
              _this.needFetchPull({
                data : {
                  type: 1,
                  imageUrl: initialize.state.filter.editImg,
                  name: initialize.state.filter.editName,
                  categoryId: initialize.state.filter.categoryId,
                  introduction: initialize.state.filter.editDetail,
                  groupCategoryId: initialize.state.filter.editCircleId,
                  groupName: initialize.state.filter.editBinding
                }
              }, 'post', 'createPrivate', (data) => {
                console.log(data);
                window.onbeforeunload = window.onunload = null;
                window.location.href = '/account/awaitCompany';
              }, (error) => {
                alert(error.message);
              });
              break;

            case "COMPANY_AMEND":
              _this.needFetchPull({
                data : {
                  imageUrl: initialize.state.filter.editImg,
                  name: initialize.state.filter.editName,
                  categoryId: initialize.state.filter.categoryId,
                  introduction: initialize.state.filter.editDetail
                }
              }, 'post', 'editPrivate', (data) => {
                console.log(data);
                window.onbeforeunload = window.onunload = null;
                window.location.href = '/account/awaitCompany';
              }, (error) => {
                alert(error.message);
              });
              break;

            default:
              return false;
          }
        });

        $(_this.refs.$ALert).show();
      } else {
        return false;
      }
    });
  },
  checkData(data, cb) {
    var _this = this;
    if(!_this.state.imgfail) {
      if($(this.refs.$editImg).attr('src')) {
        this.state.filter.editImg = $(this.refs.$editImg).attr('src');
      } else {
        window.state = window.state ? window.state : {};
        this.state.filter.editImg = window.state.filter;
      }
    } else {
      this.state.filter.editImg = false;
    }

    if(this.state.filter.editImg) {
      $(_this.refs.$noticeBox).removeClass('right-error');
    } else {
      $(_this.refs.$noticeBox).addClass('right-error');
    }

    _this.checkTitle(_this, _this.refs.$editName, initialize.state.filter.editName, _this.refs.$noticeName, '名称长度为2-15个字，不含有特殊字符',() => {
      let formatReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(_this.removeSpace($(_this.refs.$editName).val()));
      // console.log(!formatReg && $(this).val().length >= 2 && $(this).val().length <= 15);
      if(!formatReg && $(_this.refs.$editName).val() && $(_this.refs.$editName).val().length >= 2 && $(_this.refs.$editName).val().length <= 15) {
  			initialize.state.filter.editName = checkHtml.unhtml(_this.removeSpace($(_this.refs.$editName).val()));
        $(_this.refs.$noticeName).removeClass('right-error');
  		} else {
  			initialize.state.filter.editName = '';
        $(_this.refs.$noticeName).addClass('right-error');
  		}

        let tagFlag = initialize.state.privateTag.filter(function(item, index) {
          // console.log(item.name, $(_this.refs.$editLabelDiv).find('div').text())
          return item.name == $(_this.refs.$editLabelDiv).find('div').text()
        })

        if(tagFlag.length) {
          initialize.state.filter.editLabel = tagFlag[0].name;
          initialize.state.filter.categoryId = tagFlag[0].id;
          $(_this.refs.$noticeLabel).removeClass('right-error');
    		} else {
    			initialize.state.filter.editLabel = '';
          initialize.state.filter.categoryId = '';
          $(_this.refs.$noticeLabel).addClass('right-error');
    		}

        _this.checkTitle(_this, this.refs.$editDetail, initialize.state.filter.editDetail, _this.refs.$noticeDetail, '简介长度为4-120个字，不含有特殊字符',() => {
          $(this.refs.$editDetail).val(_this.removeSpaceTb($(this.refs.$editDetail).val()));
          let formatReg = new RegExp("[`@#^&*|''\\[\\]<>/@#&*——|]").test(_this.removeSpaceTb($(_this.refs.$editDetail).val()));
          if(!formatReg && $(this.refs.$editDetail).val() && $(this.refs.$editDetail).val().length != 0) {
            if($(this.refs.$editDetail).val().length >= 4 && $(this.refs.$editDetail).val().length <= 120) {
              // console.log(initialize.state.filter.editDetail);
              initialize.state.filter.editDetail = checkHtml.unhtml(_this.removeSpaceTb($(this.refs.$editDetail).val()));
              // console.log(initialize.state.filter.editDetail);
              $(_this.refs.$noticeDetail).removeClass('right-error');
            } else {
              initialize.state.filter.editDetail = false;
              $(_this.refs.$noticeDetail).addClass('right-error');
            }
          } else {
            initialize.state.filter.editDetail = false;
            $(_this.refs.$noticeDetail).addClass('right-error');
          }
          // console.log(22222)

          _this.checkTitle(_this, this.refs.$editBinding, initialize.state.filter.editBinding, _this.refs.$noticeBinding, '15个字以内，您发的内容可在绑定的圈子中展示',() => {
            if($(_this.refs.$editBinding).val() && /^.{1,15}$/.test(_this.removeSpace($(this.refs.$editBinding).val()))) {
              initialize.state.filter.editBinding = checkHtml.unhtml(_this.removeSpace($(this.refs.$editBinding).val()));
              $(_this.refs.$noticeBinding).removeClass('right-error');
            } else {
              initialize.state.filter.editBinding = false;
              $(_this.refs.$noticeBinding).addClass('right-error');
            }


            let cateFlag = initialize.state.subListRes.length ? initialize.state.subListRes.length : 0;
            cateFlag = cateFlag?initialize.state.subListRes[0].children.filter(function(item, index) {
              return item.name == $(_this.refs.$editCircleSecDiv).find('div').text();
            }):null;

            if(cateFlag && Array.isArray(cateFlag) && cateFlag.length != 0) {
              if(cateFlag[0]) {
                initialize.state.filter.editCircleId = cateFlag[0].id;
              }
              initialize.state.filter.editCircleFri = $(this.refs.$editCircleFriDiv).find('div').text();
              initialize.state.filter.editCircleSec = $(this.refs.$editCircleSecDiv).find('div').text();
              $(_this.refs.$noticeCircle).removeClass('right-error');
            } else {
              initialize.state.filter.editCircleId = '';
              initialize.state.filter.editCircleFri = '';
              initialize.state.filter.editCircleSec = '';
              $(_this.refs.$noticeCircle).addClass('right-error');
            }

            if($(_this.refs.$editCheck).is(':checked')) {
              initialize.state.filter.editCheck = true;
              $(_this.refs.$noticeCheck).removeClass('right-error');
            } else {
              initialize.state.filter.editCheck = false;
              $(_this.refs.$noticeCheck).addClass('right-error');
            }
            _this.bindLock(cb);
          });
        });
    }, 'name');
  },
  unGoon() {
    var _this = this;
    switch (this.state.action) {
      case "ADD_PRIVATE":
        $(_this.refs.$editSubmit).parent().removeClass('continue');
        break;
      case "REPAIR_AMEND":
        $(_this.refs.$editSubmit).parent().removeClass('continue');
        break;
      case "ADD_COMPANY":
        $(_this.refs.$editSubmit).parent().removeClass('continue');
        break;
      case "COMPANY_AMEND":
        $(_this.refs.$editSubmit).parent().removeClass('continue');
        break;
      case "STAGE_AMEND":
        $(_this.refs.$editSubmit).removeClass('continue');
        break;
      case "BAND_FAIL":
        $(_this.refs.$editSubmit).removeClass('confirm-btn');
        break;
      default:
        return false;
    }
    _this.state.filterData = false;
  },
  bindLock(cb) {
    var _this = this;
    _this.state.filterData = false;
    let flag;

    if(!_this.state.imgfail) {
      // console.log(0)
      if($(this.refs.$editImg).attr('src')) {
        // console.log(1)
        this.state.filter.editImg = $(this.refs.$editImg).attr('src');
      } else {
        // console.log(2)
        window.state = window.state ? window.state : {};
        this.state.filter.editImg = window.state.filter;
      }
    }

    switch (this.state.action) {
      case "ADD_PRIVATE":
        flag = [this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail, this.state.filter.editBinding, this.state.filter.editCircleFri, this.state.filter.editCircleSec, this.state.filter.editCheck].every(item => item);
        break;
      case "REPAIR_AMEND":
        flag = [this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail, this.state.filter.editCheck].every(item => item);
        break;
      case "ADD_COMPANY":
        flag = [this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail, this.state.filter.editBinding, this.state.filter.editCircleFri, this.state.filter.editCircleSec, this.state.filter.editCheck].every(item => item);
        break;
      case "COMPANY_AMEND":
        flag = [this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail, this.state.filter.editCheck].every(item => item);
        break;
      case "STAGE_AMEND":
        flag = [this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail].every(item => item);
        break;
      case "BAND_FAIL":
        flag = [this.state.filter.editBinding, this.state.filter.editCircleFri, this.state.filter.editCircleSec].every(item => item);
        break;
      default:
        return false;
    }
    // let flag = [this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail, this.state.filter.editBinding, this.state.filter.editCircleFri, this.state.filter.editCircleSec, this.state.filter.editCheck].every(item => item);

    // console.log(flag, this.state.filter.editImg, this.state.filter.editName, this.state.filter.editLabel, this.state.filter.editDetail, this.state.filter.editBinding, this.state.filter.editCircleFri, this.state.filter.editCircleSec, this.state.filter.editCheck);

    if(flag) {
      // console.log('验证成功');
      switch (this.state.action) {
        case "ADD_PRIVATE":
          $(_this.refs.$editSubmit).parent().addClass('continue');
          break;
        case "REPAIR_AMEND":
          $(_this.refs.$editSubmit).parent().addClass('continue');
          break;
        case "ADD_COMPANY":
          $(_this.refs.$editSubmit).parent().addClass('continue');
          break;
        case "COMPANY_AMEND":
          $(_this.refs.$editSubmit).parent().addClass('continue');
          break;
        case "STAGE_AMEND":
          $(_this.refs.$editSubmit).addClass('continue');
          break;
        case "BAND_FAIL":
          $(_this.refs.$editSubmit).addClass('confirm-btn');
          break;
        default:
          return false;
      }
      _this.state.filterData = true;
      cb && cb(_this.state.filterData);
    } else {
      // console.log('验证失败');
      _this.unGoon();
      cb && cb(_this.state.filterData);
    }
  }
}

module.exports = initialize;
