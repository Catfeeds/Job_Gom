var url = require('../../io/url');
var fetch = require('io/fetch');
var hint = require('module/hint');
var loginPop = require('module/popup/login');
module.exports = {
	init: function(){
		var curIndex = 0,
			$recommendBox = $('[data-node="recommend-box"]'),
			$ul = $recommendBox.find('.recommend_list_box ul'),
			arr = [],
			$lis = $ul.eq(0).children().eq(curIndex).find('li'),
			isLogin = parseInt($GLOBAL_CONFIG['islogin']);
		// 点击我的美店
		/*$('[data-node="meidian_my"]').off('click').on('click', function (){
			myMeidian({
				refresh: false
			});
		});*/
		$('[data-node="kt-meidian"]').off('click').on('click', function (){
			myMeidian({
				refresh: false
			});
		});
		$('[data-node="ranking-box"]').off('click').on('click', '[data-node="kt-meidian-refresh"]', function (){
			myMeidian({
				refresh: true
			});
		});
		function myMeidian(options){
			if(isLogin){
				window.open($GLOBAL_CONFIG['meidian_domain'] + 'admin', '_blank');
			}else{
				// 去登陆 再跳转
				loginPop(function (){
					location.reload();
					/*if(options.refresh){
						location.reload();
					}else{
						window.open($GLOBAL_CONFIG['meidian_domain'] + 'admin', '_blank');
					}*/
				});
			}
		}
		// 一键上架
		var $sjBtn = $('[data-node="sj_btn"]');
		$sjBtn.off('click').on('click', function (){
			var $this = $(this);
			if(!$(this).hasClass('on')){
				return;
			}
			if(isLogin){
				fetchData();
			}else{
				loginPop(function (){
					location.reload();
				});
			}
			function fetchData(){
				var $soldUp = $lis.find('[data-node="single_btn"]');
				$(this).text('正在上架中...') ;
		        var _items = [];
		        $soldUp.each(function(){
		            var _status = $(this).attr('data-status');
		            if(_status == 0){
		                $(this).text('上架中...') ;      
		                var _itemId = $(this).attr('data-itemid');
		                var _skuId = $(this).attr('data-skuid');
		                var _identification = $(this).attr('data-identification');
		                var json = {
		                    itemId: _itemId,
		                    skuId:_skuId,
		                    identification:_identification 
		                }
		                _items.push(json);
		            }
		        }); 
		        fetch.post(url.get('itemBatchMangeInShop'), {
		            data: {
		                shopId: $_CONFIG.shopId,
		                items: _items
		            }
		        }).done(function(result) {
		            if( result && result.code === 713001 ){
		                hint.init(result.msg);
		                $soldUp.text('上架');
		            }else{
		            	// hint.init(result.msg);
		                $sjBtn.removeClass('on');
		                $soldUp.text('已上架').addClass('already_sj').removeClass('sj').attr('data-status', 1);
		            }
		            $sjBtn.text('一键上架');
		        });
			}
			return false;
		});
		// 上下架
		$('[data-node="recommend-box"]').on('click', '[data-node="single_btn"]', function (){
			var $this = $(this);
			if(isLogin){
				fetchData();
			}else{
				loginPop(function (){
					location.reload();
				});
			}
			function fetchData(){
				if($this.attr('data-status') == 0){
    				$this.text('上架中...');
    			}else if($this.attr('data-status') == 1){
    				$this.text('下架中...');
    			}
				fetch.get( url.get('soldInOut'), {
					data: {
						shopId: $GLOBAL_CONFIG['shopId'] || 0,
						status: $this.attr('data-status'),
						itemId: $this.attr('data-itemId'),
						skuId: $this.attr('data-skuId'),
						identification: $this.attr('data-identification')
					}
				}).then(function(result) {
			    	if( result && result.success ){
			    		if(result.code == 713001){
			    			window.open($GLOBAL_CONFIG['meidian_domain'] + 'admin', '_blank');
			    		}else{
			    			if($this.attr('data-status') == 0){
			    				$this.text('已上架').attr('data-status', 1).removeClass('sj').addClass('already_sj');
			    				$sjBtn.removeClass('on');
			    				checkSjBtn(curIndex);
			    			}else if($this.attr('data-status') == 1){
			    				$this.text('上架').attr('data-status', 0).removeClass('already_sj').addClass('sj');
			    				checkSjBtn(curIndex);
			    			}
			    		}
			    	}else{
			    		if($this.attr('data-status') == 0){
		    				$this.text('上架');
		    			}else if($this.attr('data-status') == 1){
		    				$this.text('已上架');
		    			}
			    		hint.init(result.message);
			    	}
			    }, function(){
			    	hint.init('数据获取失败，请重试！');
			    });
			}
		});
		// 轮播图
		function loop(){
			var index = 0,
				$bannerBox = $('[data-node="banner"]'),
				$ul = $bannerBox.find('ul'),
				$li = $ul.find('li'),
				width = $li.eq(0).width(),
				liLength = $li.length,
				$ol = $bannerBox.find('ol'),
				timer = null;
			if($li.length >= 2){
				 $ul.append($li.eq(0).clone())
			}else{
				$ol.hide();
				return;
			}
			$li = $ul.find('li');
			liLength = $li.length;
			$ul.width($li.length * width);
			$bannerBox.hover(function (){
				clearInterval(timer);
			}, function (){
				openTimer();
			});
			$ol.on('click', 'li', function(){
				index = $(this).index();
				tab();
			});
			$ol.on('mouseover', 'li', function(ev){
				index = $(this).index();
				tab();
				return false;
			});
			function next(){
				index ++;
				if(index == liLength){
					index = 1;
					$ul.css('left', '0px');
				}
				tab();
			}
			openTimer();
			function openTimer(){
				timer = setInterval(function (){
					next();
				}, 5000);
			}
			function tab(){
				$ul.stop().animate({'left': '-' + index *width + 'px'});
				if(index == liLength - 1){
					$ol.find('li').removeClass('on').eq(0).addClass('on');
					return;
				}
				$ol.find('li').removeClass('on').eq(index).addClass('on');
			}
			$bannerBox.find('img').on('error', function (){
				$(this).attr('src', $GLOBAL_CONFIG.pcimgpath + '/images/meidian/loop-default.png');
			});
		}
		loop();
		// 爆品推荐
		function loopBp(){
			var $left = $recommendBox.find('.turn_left');
			var $right = $recommendBox.find('.turn_right');
			var len = $ul.eq(0).children().length;
			var width = $($ul.eq(0).children().eq(0)).width();
			var $ol = $recommendBox.find('ol');
			var timer = null;
			/*$recommendBox.hover(function (){
				clearInterval(timer);
			}, function (){
				openTimer();
			});*/
			$ol.on('click', 'li', function(){
				curIndex = $(this).index();
				tab(curIndex);
			});
			$ol.on('mouseover', 'li', function(){
				curIndex = $(this).index();
				tab(curIndex);
				return false;
			});
			$left.on('click', function(){
				curIndex--;
				if(curIndex == -1){
					curIndex = len - 1;
				}
				tab(curIndex);
			});
			$right.on('click', function(){
				curIndex++;
				if(curIndex == len){
					curIndex = 0;
				}
				tab(curIndex);
			});
			//openTimer();
			function openTimer(){
				timer = setInterval(function (){
					curIndex ++;
					if(curIndex == len){
						curIndex = 0;
						$ul.css('left', '0px');
						$ol.find('li').removeClass('on').eq(0).addClass('on');
					}
					tab(curIndex);
				}, 5000);
			}
			function tab(index){
				checkSjBtn(index);
				$ul.eq(0).attr('data-index', index);
				$ul.stop().animate({'left': '-' + index *width + 'px'});
				$ol.find('li').removeClass('on').eq(index).addClass('on');
			}
		}
		loopBp();
		checkSjBtn(0);
		function checkSjBtn(index){
			var flag = false;
			var flag2 = false;
			$lis = $ul.eq(0).children().eq(index).find('li');
			$lis.find('[data-node="single_btn"]').each(function (index, item){
				arr.push($(item).attr('data-status'));
			});
			// console.log(arr);
			flag = arr.some(function ( item ){
				return (item == 0);
			});
			flag2 = arr.every(function ( item ){
				return (item == 1);
			});
			// console.log(flag);
			// console.log(flag2);
			if(flag){
				$sjBtn.addClass('on');
			}else{
				$sjBtn.removeClass('on');
			}
			if(flag2){
				$sjBtn.removeClass('on');
			}
			arr = [];
			flag = false;
			flag2 = false;
		}
		$('.shopest_list li > a > img').on('error', function (){
			$(this).attr('src', $GLOBAL_CONFIG.pcimgpath + '/images/meidian/zuimei-default.png');
		});
		// 处理最美美店与轮播图默认图片
		window.mdImgError = function(img, type) {
			var imgs = {
				zm: 'zuimei-default.png',
				loop: 'loop-default.png'
			};
			var src = imgs[type];
			src = src ? src : imgs.loop;
			img.onerror = '';
			img.src = $GLOBAL_CONFIG.pcimgpath + '/images/meidian/' + src + '?v='+$GLOBAL_CONFIG['versionData'];
		};
	}
}






















