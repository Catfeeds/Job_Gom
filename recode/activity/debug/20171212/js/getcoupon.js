'use strict';

var Toast = function Toast(msg, time) {
  this.msg = msg;
  this.dom = this.createToast();
  this.setContent(msg);
  this.hide(time);
};

Toast.prototype = {
  constructor: Toast,

  createToast: function createToast() {
    var $notice = $('<div style="position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);background:rgba(0,0,0,.7);fomt-size:12px;color:#fff;border:1px #000 solid;padding:10px;max-width:50%;">爱爱所大多</div>');
    $('body').append($notice);

    return $notice[0];
  },

  setContent: function setContent(msg) {
    this.dom.innerHTML = msg;
    return this;
  },

  setSize: function setSize(width, height) {
    //
  },

  resetSize: function resetSize(width, height) {
    //
  },

  show: function show(cb) {
    this.dom.style.display = "-webkit-box;";
    this.dom.style.display = "-webkit-flex;";
    this.dom.style.display = "flex";
    typeof cb == "function" && cb.apply(this, arguments);
    return this;
  },

  hide: function hide(time, cb) {
    var _this = this;
    setTimeout(function () {
      _this.dom.style.display = "none";
    }, time * 1000);
    typeof cb == "function" && cb.apply(this, arguments);
    return this;
  }
};

var Double12 = {
  init: function init() {
    this.firstCode = 0;
    this.toastTime = 3;
    this.data = {};
    this.pageCoupon = $("#page-coupon");
    this.pageCouponSuccess = $("#page-coupon-success");
    this.hintPop = $("#vericode");
    this.bind();
  },

  bind: function bind() {
    var _this = this;
    var pageCoupon = this.pageCoupon;
    var hintPop = this.hintPop;

    pageCoupon.on("click", '[node-data="back"]', function () {
      history.back();
    });
    pageCoupon.on("click", '[data-node="coupon"]', function () {
      _this.popVeriCode($(this));
    });
    $("#curityimg").on("click", this.getVericode.bind(this));
    hintPop.on("click", '[data-node="confirm"]', this.confirmGetCoupon.bind(this));
    hintPop.on("click", '[data-node="cancel"]', this.closeVeriCode.bind(this));
    $('#goback').on('click', function () {
      window.location.href = window.location.href;
    });
  },

  popVeriCode: function popVeriCode($this) {
    this.data["couponId"] = $this.attr("data-couponid");
    this.data["couponParam"] = $this.attr("data-couponparam");
    this.data["couponMoney"] = $this.attr("data-money");
    this.getVericode();
  },

  getVericode: function getVericode() {
    var _this = this;
    $.ajax({
      url: "/api/getCaptcha",
      type: "post",
      data: {
        couponParam: this.data["couponParam"],
        couponId: this.data["couponId"]
      },
      dataType: "json",
      success: function success(res) {
        if (res.code == 200) {
          _this.hintPop.removeClass("hide");
          $("#curityimg").attr("src", res.data.captchaImgUrl + "_&" + Date.now());
        } else {
          _this.getCouponFail(res.message);
        }
      },
      error: function error(err) {
        // do sth
      }
    });
  },

  confirmGetCoupon: function confirmGetCoupon() {
    this.getCoupon();
    this.closeVeriCode();
  },

  closeVeriCode: function closeVeriCode() {
    this.hintPop.addClass("hide");
    $("#curitytext").val("");
  },

  getCoupon: function getCoupon() {
    var _this = this;
    var code = $.trim($("#curitytext").val());
    if (code !== '') {
      $.ajax({
        url: "/api/receiveCoupon",
        type: "post",
        data: {
          couponId: this.data["couponId"],
          couponParam: this.data["couponParam"],
          authCode: code,
          money: this.data["couponMoney"]
        },
        success: function success(res) {
          if (res.code == "200") {
            _this.getCouponSuccess(_this.data["couponId"]);
          } else {
            _this.getCouponFail(res.message);
          }
        },
        error: function error(err) {
          _this.getCouponFail("领取失败");
        }
      });
    }
  },

  getCouponSuccess: function getCouponSuccess(id) {
    var pageCouponSuccess = this.pageCouponSuccess;
    this.pageCoupon.addClass("hide");
    pageCouponSuccess.removeClass("hide");
    pageCouponSuccess.find('[data-conponid]').addClass("hide");
    pageCouponSuccess.find('[data-conponid="' + id + '"]').removeClass("hide");
  },

  getCouponFail: function getCouponFail(msg) {
    if (this.toast) {
      this.toast.setContent(msg).show().hide(this.toastTime);
    } else {
      this.toast = new Toast(msg, this.toastTime);
    }
  }
};
Double12.init();