var imgArr = ["layer-error.png","bg.jpg","center.png","del.png","footer.png","guize-layer.png","hit.png","home.png","layer.png","layer-bg.png","left.png","left-arrow.png","loading.png","login.png","no-hit.png","once-again.png","redpacket.png","right.png","rule.png","shabao.png","share.png","start.png","submit.png","upload.png","yellow.png","percent.png","plan.png","submit1.png","cancel.png","share-layer.png"];
var peopleTimer = null,
	countDownTimer = null,
	progressBarNum = 0;
var isClick = true,
	isStart = false;
var timeNum = 60,
	shabaoNum = 10,
	hitNum = 0,
	speed = 300;
var isShare = true,
	isUpload = true;
var uuid = uuid1();
var codeENV = imgcode_domain+'getimage.no?type=gome_sale_activities&capCd='
var api = hd_domain+'promotion/hedonicValue/wap/';
var ENV = source_path+'shabao';
var setHeaderObj = {
	type:'share',
	icon:'file://share',
	shareInfo:{
		title: '玩游戏练手速  11.11终极大考验',
		shareDesc: '千万惊喜抢个够  神秘大奖等着你！',
		shareImageUrl: share_img,
		shareUrl : location.href,
		platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
	},
};

$.ajaxSettings.beforeSend = function(xhr) {
    xhr.withCredentials = true;
};
var game = {
	dom: {
		startBtn: $('#startTime'),
		ruleBtn: $('#ruleBtn'),
		closeBtn: $('.del'),
		onceAgainBtn:$('.once-again'),
		uploadBtn: $('#upload'),
		feastSubmitBtn:$('#feastSubmit'),
		homeBtn: $('#home'),
		shareBtn:$('#shareBtn'),
		loginBtn:$('#loginBtn'),
		countDownNum: $('#countDownNum'),
		shabaoText: $('#shabaoText'),
		hitNumText:$('#hitNumText'),
		peoples: $('#peoples'),
		noHit: $('#noHit'),
		hit: $('#hit'),
		getFeastNum:$('#getFeastNum'),
		overHitNum:$('#overHitNum'),
		planNum:$('#planNum'),
		plan:$('#plan'),
		page: $('.page'),
		loading:$('#loading'),
		startConLayer: $('#startCon'),
		gameOverLayer:$('#gameOver'),
		ruleLayer:$('#ruleLayer'),
		confirmFeastLayer:$('#confirmFeast'),
		uploadErrorLayer:$('#uploadError'),
		uploadSuccessLayer:$('#uploadSuccess'),
		shareLayer:$('#shareLayer'),
		identifyingCodeLayer:$('#identifyingCode'),
		loginLayer:$('#login'),
		toastLayer:$('#toastLayer'),
		shareSuccessLayer:$('#shareSuccess'),
		errorLayer:$('#error')
	},
	init:function(){
		this.loadImg();
		this.bindEvents();
		this.getUploadShareStatus();
		this.dom.identifyingCodeLayer.find('img').attr('src',codeENV+uuid+"&v="+new Date()*1);
		if(access_terminal === "app"){
			this.resetShare();
		}
	},
	bindEvents:function() {
		var self = this;
		this.dom.startBtn.click(function() {
			var $self = $(this);
			if(access_terminal === "app"){
				$g.getUserInfo(function(data) {
					self.startGame();
				}, function(data) {
					$self.parents('.layer').hide();
					self.dom.loginLayer.show();
				});
			}else{
				self.startGame();
			}
		})
		this.dom.loginBtn.click(function(){
			$g.login();
		})
		this.dom.closeBtn.click(function(){
			var parents = $(this).parents('.layer'),
				id = $(this).parents('.layer').attr('id');
			$(this).parents('.layer').hide();
			if(id === "confirmFeast" || id === "uploadError"){
				self.dom.gameOverLayer.show();
			}else if(id === "ruleLayer" || id === "gameOver" || id === "shareSuccess" || id === "login"){
				self.dom.startConLayer.show();
			}else if(id === "uploadSuccess"){
				if(isUpload){
					self.dom.gameOverLayer.show();
				}else{
					self.dom.startConLayer.show();
				}
			}else if(id === "toastLayer" || id === "error"){
				self.dom.uploadSuccessLayer.show();
			}
		})
		this.dom.ruleBtn.click(function(){
			self.dom.ruleLayer.show().siblings('#startCon').hide();
		})
		this.dom.onceAgainBtn.click(function(){
			$(this).parents('.layer').hide();
			self.startGame();
		})
		this.dom.uploadBtn.click(function(){
			$(this).parents('.layer').hide();
			if(!isShare){
				self.dom.uploadSuccessLayer.find('.share-text').css('opacity',"0");
			}
			if(!isUpload){
				self.dom.uploadSuccessLayer.find('.upload-success-text').text("今日已上传过享乐值！");
				self.dom.uploadSuccessLayer.show();
			}else{
				self.dom.confirmFeastLayer.show();
			}
		})
		this.dom.feastSubmitBtn.click(function(){
			$(this).parents('.layer').hide();
			self.dom.identifyingCodeLayer.find('input').val("");
			self.dom.identifyingCodeLayer.show();
		})
		self.dom.identifyingCodeLayer.on('click','.cancel',function(){
			self.dom.confirmFeastLayer.show();
			$(this).parents('.layer').hide();
		})
		self.dom.identifyingCodeLayer.on('click','.confirm',function(){
			var text = self.dom.identifyingCodeLayer.find('input').val(),
				$self = $(this);
				if(text!=="" && text.length===4){
					var params = {
							promId: shabaoid,
							throwSandbagsCount: hitNum,
							captchaCode: text,
							uuid: uuid,
							source:access_terminal,
							equipmentUfpd: $g.cookie.parse()['ufpd'],
						    mac: uniqueId,
						    ufpd: $g.cookie.parse()['ufpd'],
						    version: version || '',
						    uniqueId: uniqueId,
						    is_req: version > 64 ? '1' : '0',
						    uA: Base64.encode(navigator.userAgent.toLowerCase()),
						    luckType: 'normal'
					}
					var version = -1;
					if ($g.system.android && navigator.userAgent.match(/gome/)) {
					  version = navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1];
					} else if ($g.system.ios && navigator.userAgent.match(/gome/)) {
					  version = navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1];
					}
					var uniqueId = $g.cookie.parse()['__clickidc'];
					if ($g.env.gomeplus || (version > 64 && $g.env.gome)) {
					   params.is_req = '1';//新版本
					} else {
					   params.is_req = '0';//新版本
					}
					if ($g.env.app) {
					//app需要覆盖wap的部分
					  params.source = 'app',
					  params.app_type = $g.system.android ? 'android_app' : 'ios_app'
					  params.mac = params.app_type + version + uniqueId
					  params.platform = $g.system.android ? '2' : '1'
					  params.equipmentUfpd = $g.cookie.parse()['GDF']
					  params.ufpd = $g.cookie.parse()['GDF']
					}
					$.ajax({
						type: "GET",
						xhrFields: {
							withCredentials: true
						},
						crossDomain: true,
						url: api + 'doThrowSandbagsResult.do',
						data: params,
						dataType: "json",
						success: function(data) {
							if (data.state == 'success') {
								$self.parents('.layer').hide();
								self.dom.uploadSuccessLayer.show();
								isUpload = false;
							} else {
								$self.parents('.layer').hide();
								self.dom.uploadErrorLayer.show();
								self.dom.identifyingCodeLayer.find('img').attr('src',codeENV+uuid+"&v="+new Date()*1);
								setTimeout(function(){
									self.dom.uploadErrorLayer.hide();
									self.dom.gameOverLayer.show();
								},3000)
							}
						},
						error: function(err) {
							self.dom.identifyingCodeLayer.find('img').attr('src',codeENV+uuid+"&v="+new Date()*1);
						}
					});
				}else{
					self.dom.identifyingCodeLayer.find('input').val("");
					self.dom.identifyingCodeLayer.find('p').addClass("shake");
					self.dom.identifyingCodeLayer.find('img').attr('src',codeENV+uuid+"&v="+new Date()*1);
					setTimeout(function(){
						self.dom.identifyingCodeLayer.find('p').removeClass("shake");
					},500)
				}
		})
		self.dom.identifyingCodeLayer.find('img').click(function(){
			$(this).attr('src',codeENV+uuid+"&v="+new Date()*1);
		})
		self.dom.identifyingCodeLayer.find('input').focus(function(){
			document.body.scrollTop = 200;
		})
		this.dom.shareLayer.click(function(){
			$(this).hide();
			self.dom.startConLayer.show();
		})
		this.dom.homeBtn.click(function(){
			$(this).parents('.layer').hide();
			self.dom.startConLayer.show();
		})
		this.dom.errorLayer.find('.submit').click(function(){
			$(this).parents('.layer').hide();
			self.dom.uploadSuccessLayer.show();
		})
		this.dom.shareBtn.click(function(){
			var $self = $(this),
				isAndroid = window.navigator.userAgent.match(/android/i) ? true : false;
			if(access_terminal === "app"){
				var param = {
					title: '玩游戏练手速  11.11终极大考验',
					shareDesc: '千万惊喜抢个够  神秘大奖等着你！',
					shareImageUrl: share_img,
					shareUrl: location.href,
					platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
				};
				 if (isAndroid && window.navigator.userAgent.match(/gome/)) {
	                var version = window.navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1]; //设备版本
	                if (version < 100) {
	                    self.shareover();
	                    $self.parents('.layer').hide();
						self.dom.shareLayer.show();
	                } else {
	                  self.appShare(param);
	                }
	            } else {
	            	self.appShare(param);
	            }
			}else if(access_terminal === "weixin"){
				$self.parents('.layer').hide();
				self.dom.shareLayer.show();
			}else{
				$self.parents('.layer').hide();
				self.dom.toastLayer.find('p').text("请用浏览器自带分享功能分享");
				self.dom.toastLayer.show();
			}
		})
		this.dom.toastLayer.find('.confirm').click(function(){
			$(this).parents('.layer').hide();
			self.dom.uploadSuccessLayer.show();
		})
		this.dom.errorLayer.find('.confirm').click(function(){
			$(this).parents('.layer').hide();
			self.dom.uploadSuccessLayer.show();
		})
		this.dom.page.click(function(e) {
			var $target = $(e.target);
			if (!isClick || !isStart) {
				return;
			}
			isClick = false;
			var $class = $target.attr('class');
			// clearInterval(countDownTimer);
			clearInterval(peopleTimer);
			if ($target.attr('id') === "peoples" || $class === "people" || $class === "people-img") {
				var display = $target.css("display");
				if ($class === "people") {
					display = $target.children('p').css("display");
				}
				if (display === "none") {
					self.dom.noHit.show();
					self.dom.peoples.find('p').hide();
					setTimeout(function() {
						self.dom.noHit.hide();
						self.gameOver();
					}, 500)
				} else {
					self.dom.hit.show();
					self.dom.peoples.find('p').hide();
					self.dom.hitNumText.text(hitNum+=1);
					setTimeout(function() {
						self.dom.hit.hide();
						self.gameOver();
					}, 500)
				}
			} else {
				self.dom.noHit.show();
				self.dom.peoples.find('p').hide();
				setTimeout(function() {
					self.dom.noHit.hide();
					self.gameOver();
				}, 500)
			}
			shabaoNum--;
			self.dom.shabaoText.text(shabaoNum);
		})
	},
	appShare:function(params){
		var self = this;
		$g.callShareComp(params, function(data) {
			if (data.shareResult === "0") {
				// 分享成功显示结果
				self.dom.shareSuccessLayer.css("display","block");
				self.dom.shareBtn.parents('.layer').hide();
				self.shareover();
			} else if(data.shareResult === "1"){
				self.dom.shareBtn.parents('.layer').hide();
				$('#error').css("display","block");
			}
		}, function(err) {
			self.dom.shareBtn.parents('.layer').hide();
			$('#error').css("display","block");
		})
	},
	// 分享
	resetShare:function() {
		$g.ready().then(function() {
			if ($g.env.app) {
				$g.setHeadBar({
					menus:{
						isShowCloseMenu:'Y',
						rightMenus:[
							setHeaderObj
						]
					},
				});
			}
		});
	},
	startGame:function(){
		timeNum = 60;
		shabaoNum = 10;
		hitNum = 0;
		speed = 500;
		this.dom.shabaoText.text(shabaoNum);
		this.dom.hitNumText.text(hitNum);
		this.dom.countDownNum.text(timeNum);
		this.dom.startConLayer.hide();
		this.countDown();
		this.peopleRun(speed);
		setTimeout(function() {
			isStart = true;
		}, 350)
	},
	loadImg:function() {
		var total = imgArr.length,
			self = this,
			percent = 0;
		/*var timer = setInterval(function(){
			progressBarNum += 1;
		    self.dom.plan.css('width',progressBarNum+"%");
		    self.dom.planNum.text(progressBarNum);
		    if(progressBarNum === 95){
		    	clearInterval(timer);
		    }
		},100)*/
	    imgArr.forEach(function(item, index){
	    	var img = new Image();
		    img.onload = function(){
	    		progressBarNum += 1;
			    percent = parseInt(progressBarNum/total*100);
			    self.dom.plan.css('width',percent+"%")
			    self.dom.planNum.text(percent);
			    if(percent === 100){
		    	    self.dom.startConLayer.show();
			   		self.dom.loading.hide();
			    }
		    };
		    img.src = ENV+"/images/"+item;
	    })
	},
	gameOver:function() {
		if (shabaoNum <= 0 || timeNum <= 0) {
			clearInterval(countDownTimer);
			clearInterval(peopleTimer);
			this.dom.gameOverLayer.show();
			this.dom.peoples.find('p').show();
			this.gameOverText();
			isStart = false;
		} else {
			// this.countDown();
			this.peopleRun(speed);
		}
	},
	gameOverText:function(){
		this.dom.overHitNum.text(hitNum);
		this.dom.getFeastNum.text(hitNum*20);
	/*ajax*/
	},
	countDown:function() {
		var self = this;
		countDownTimer = setInterval(function() {
			timeNum--;
			if(timeNum%4===0){
				clearInterval(peopleTimer);
				self.peopleRun(speed-=10);
			}
			if (timeNum <0) {
				clearInterval(countDownTimer);
				self.gameOver();
			}else{
				self.dom.countDownNum.text(timeNum);
			}
		}, 1000)
	},
	peopleRun:function(sp) {
		var self = this;
		isClick = true;
		clearInterval(peopleTimer);
		peopleTimer = setInterval(function() {
			var show = Math.floor(Math.random() * 3);
			self.dom.peoples.children('li').eq(show).children('p').show().parent().siblings().children('p').hide();
		}, sp)
	},
	getUploadShareStatus:function(){
	/*	isUpload = false;
		isShare = false;*/
		$.ajax({
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			url: api + 'getUploadHedonicState.do',
			data: {
				promId: shabaoid,
				source:access_terminal
			},
			dataType: "json",
			success: function(data) {
				console.log(data)
				if (data.state == 'success') {
					isUpload = data.data.uploadState === "1";
					isShare = data.data.shareState === "1";
				}
			},
			error: function(err) {
				console.log(err)
			}
		});
	},
	shareover: function() {
		var self = this;
	    if(isShare) {
			$.ajax({
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				url: api + 'doShareHedonicValue.do',
				data: {
					promId: shabaoid,
					source: access_terminal
				},
				dataType: "json",
				success: function(data) {
					console.log(data)
					if (data.state == 'success') {
						isShare = false;
						if(self.dom.shareLayer.css('display') === "block"){
							self.dom.shareLayer.hide();
							self.dom.shareSuccessLayer.show();
						}
					}
				},
				error: function(err) {
					console.log(err)
				}
			});
	    }else{
	    	if(self.dom.shareLayer.css('display') === "block"){
				self.dom.shareLayer.hide();
				self.dom.shareSuccessLayer.show();
			}
	    }
    },
    shareerror:function(){
    	if(self.dom.shareLayer.css('display') === "block"){
			self.dom.shareLayer.hide();
			self.dom.errorLayer.show();
		}
    }
}
game.init();
