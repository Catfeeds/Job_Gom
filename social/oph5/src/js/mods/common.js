define("mods/common",function(require,exports,module) {
	var sg = require('mods/storage'),
		$ = require('vendors/zepto'),
		ck = require('mods/check'),
		alert = require('UI/alert'),
		appEvent=require('mods/appEvent'),
       fastclick = require('UI/fastclick'),
		storage = require('mods/storage'),
        base64 = require('utils/base64');
	function Common(){
		var self = this;
		this.removeCover = function(){
			var cover = document.querySelector('.loading-cover');
			if(cover){
				document.body.removeChild(cover);
			}
		};
        this.addCover = function(){
            var oldCover = document.querySelector('.loading-cover');
            if(oldCover){
                return;
            }
            var cover = document.createElement('div');
            cover.className = 'loading-cover';
            cover.innerHTML = ' <img src="'+_PUBLIC_+'/images/loading-1.gif" >';
            if(cover){
                document.body.appendChild(cover);
            }
        };
		this.init = function(){
            self.alertIsLogin();
			var href=location.href;
			String.prototype.trim = function(){
				return this.replace(/^\s+/,'').replace(/\s+$/,'');
			};
			String.prototype.len = function(){return this.replace(/^[^x00-xff]$/g,"aa").length;}
			if (ck.isPC()) {// && !ck.isqqbrowser()
				if(!!document.documentElement.getAttribute('data-use-rem')){
					 alert.prompt("在手机浏览器打开我会更好看哦!");
					 $(".xin-mask h3").css('border','none');
					$('.xin-dialog h3').html("在手机浏览器打开我会更好看哦!");
					}else{
						 alert.alerter("在手机浏览器打开我会更好看哦!");
						 $(".btnBox1 h3").css('border','none');
						$('.btnBox1 h3').html("在手机浏览器打开我会更好看哦!");
					}
			}
           window.addEventListener( "load", function() {
               fastclick.attach( document.body );
           }, false );
		    if(isStr('/address/index',[href])<0
				&& isStr('/car/invoice',[href])<0
				&& isStr('/car/distribution',[href])<0
				&& isStr('/car/checkstand',[href])<0
				&& isStr('/car/usecoupons',[href])<0
				&& isStr('/address/add',[href])<0
				&& isStr('/order/detail',[href])<0
				&& isStr('/order/index',[href])<0){
               history();
		    }
		    //非商品详情和地址也清除addressid
		  /*  if(href.indexOf('/product/index')<0 && href.indexOf('/address/index')<0){
		        sg.setItem('parentsId','');
		    }*/
		    //非订单页面去除
		   /* if(href.indexOf('/order/index')<0 && href.indexOf('/car/usecoupons')<0){
		        sg.setItem('parentsId','');
		    }*/
		    $('.changecode').tap(function(){
			    $("#identify_code").attr('src','/login/identifycode?r='+Math.random());
			});
			$(".autologin span").on("click",function(){
			    var autologin = self.trimVal('autologin');
			    if(!autologin){
			        gId('autologin').value = '1';
			        $(".autologin span").css('backgroundPosition','2px -16px');
			    }else{
			        gId('autologin').value = '';
			        $(".autologin span").css('backgroundPosition','2px 0px');
			    }
			});
            //兼容注册页面
			$('#goback,#goback_self').on('click',function(){
		        var ref=location.href;
                !self.isLogin()&&self.nextUrl('');
		        getHistory(ref);
		    });
		    $('#wodeye').on('click',function () {
			    $(this).addClass('high');
			    var href=base64.encode('/user/index');
			    if (self.isLogin()) {
			       window.location.href = "/user/index";
			    } else {
			        window.location.href = "/login/index?redirect="+href;
			    }
			})
			$('#shouye').on('click',function(){
			    $(this).addClass('high');
			    var href=location.href;
			    sg.removeItem("myHref",true);
			    window.location.href="/";
			});
			$('#fenleiye').on('click',function(){
			    $(this).addClass('high');
			    var href=location.href;
			    sg.removeItem("myHref",true);
			    window.location.href="/cate/index";
			});
			$('#gouwucheye').on('click',function(){
			    $(this).addClass('high');
                if(!self.isLogin()){
                    location.assign('/login/index?redirect='+base64.encode('/car/index'));
                    return false;
                }else{
                    location.href="/car/index";
                }
			    sg.removeItem("myHref",true);
			});
			//关闭顶页客户端下载
             $('.dl_close').on('click', function () {
                 $(this).parents('.dl_clients').remove();
                 $('.g_sp_list').css({'margin-bottom': '0'});
                 $('header').css({'top':'0px'});
                 $('#head ul').css({'top':'44px'});
                 return false;
             });
			displayDiv();
			var html='<ul class="clearfix menu"><li id="fankui"><a class="menu-each" href="javascript:void(0)"><span id="fankui">反馈</span></a></li><li><a class="menu-each" href="javascript:void(0)">触屏版</a></li><li id="gokhd"><a class="menu-each" href="javascript:void(0)">客户端</a></li></ul><p>©2015-2016美信网络技术有限公司 版权所有</p><p style="padding:0;">渝ICP备15012739号</p>';
			$('#yejiao').html(html);
			$('#fankui').on('click',function(){
                appEvent.appStart(self.goToApp({type:18,fir:userId}));
			});
			$('#gokhd').on('click',function(){
				appEvent.appStart(self.goToApp({type:17}));
			});
           $('#download').on('click',function(){
//               appEvent.appStart(self.goToApp({type:17}));
               location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.gome.meixin';
               BP.send({"event_id":"b000h002"});
           });


		};
		this.isLogin = function(){
			//userId是国家宁在head头部里加的一个全局变量，未登录状态为0，登录状态会有一个用户id
			return !!userId;
		};
		this.getUserId = function(){
			return sg.getCookie('userId') || 0;
		};
		this.onLine = function(){
			if('onLine' in navigator && !navigator.onLine){
				// alert.alerter('网络连接失败，请重试');
				return false;
			}
			return true;
		};
		this.addLoading = function(){
			var div = document.getElementById('w_loadPage');

				if(!div){
				var load = document.createElement('div');
				load.id = 'w_loadPage';
				load.innerHTML = '<div class="xin-colorbox-loading"><div class="xin-loading-box"><div class="xin-loading-animation"></div></div><p>正在加载...</p></div>';
				document.body.appendChild(load);
			}
		};
		this.removeLoading = function(){
			var loadDiv = document.getElementById('w_loadPage');
			if(loadDiv){
				document.body.removeChild(loadDiv);
			}
		};
		this.fixedTwo = function(money){
		    var m = parseFloat(money);
		    if(m >= 0){
		        return m.toFixed(2);
		    }
		    return '0.00';
		};
		this.meta = function(title,keywords,description){
		    $('title').html(title);
		    $('meta[name="keywords"]').attr('content',keywords);
		    $('meta[name="description"]').attr('content',description);
		};
		this.trimVal = function(id){
		    var element = document.getElementById(id);
		    return element.value?element.value.replace(/(^\s*)|(\s*$)/g,""):element.innerHTML.replace(/(^\s*)|(\s*$)/g,"");
		};
		this.checkPwd = function(str){
		    var strReg=/^[a-zA-Z]{6,20}$/;
		    var numReg=/^\d{6,20}$/;
		    if(str.length<6 || str.length>20){
		        alert.alerter('密码位数错误');
		        return false;
		    }
		    if(strReg.test(str)){
		        alert.alerter('密码不能为纯字母');
		        return false;
		    }
		    if(numReg.test(str)){
		        alert.alerter('密码不能为纯数字');
		        return false;
		    }
		    var reg= /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
		    if(reg.test(str)){
		        return true;
		    }
		};
		//隐藏显示密码
		this.showOrhide = function(showpwd,pwd,repwd,node){
		    var ty = this.trimVal(showpwd);
		    if(!ty){
		        $('#'+showpwd).val('1');
		        $('#'+pwd).attr('type','password');
		        if(repwd != null){
		            $('#'+repwd).attr('type','password');
		        }
		        $(node).find('span').css('backgroundPosition','0 0');
		    }else{
		        $('#'+showpwd).val('');
		        $('#'+pwd).attr('type','text');
		        if(repwd != null){
		            $('#'+repwd).attr('type','text');
		        }
		        $(node).find('span').css('backgroundPosition','0 -16px');
		    }
		};

		this.route = function(ref){
			var arr=[],carsStr;
			if(carsStr = storage.getItem("cars",true)){//from:lgetItem
				var cars = JSON.parse(carsStr);
				var token=storage.getCookie('token');
				if(cars && cars.length > 0){
					for(var i=0;i<cars.length;i++){
						var car = {
							shopId : cars[i].shopId,
							kId : cars[i].kId,
							skuId : cars[i].skuId,
							proNum : cars[i].productNum
						};
						arr.push(car);
					}
					arr = JSON.stringify(arr);
					/**此处的逻辑是合并购物车内的商品 客户端与服务器端的数据合并**/
					/*ajax.postData('cart/join_shopcart.json',{cartJson:arr,loginToken:token},function(data){
						if(data.success){
							storage.setItem("cars",'',true);//from:lsetItem
							storage.setItem("carArr",[],true);//from:lsetItem
							if(storage.getItem("myHref",true)){//from:lgetItem
								location.assign('/user/index')
							}else{
								getHistory(ref);
							}
						}else{
							alert.alertSecond(data.message);
							storage.removeItem('cars',true);//from:lremoveItem
							setTimeout(function(){
								if(storage.getItem("myHref",true)){//from:lgetItem
									location.assign('/user/index')
								}else{
									getHistory(ref);
								}
							},1500);
						}
					});*/
				}
			}else{
				if(storage.getItem("myHref",true)){//from:lgetItem
					location.assign('/user/index')
				}else{
					getHistory(ref);
				}
			}
		};
		this.nextUrl = function(url,option,isThis){
		    var link = url;
		    if(!isThis){
		        if(option){
		            link += '?';
		            for(var k in option){
		                link += k.toString() + "="+option[k].toString()+'&';
		            }
		            link.length = link.length - 1;
		        }
		    }
		    sg.setItem("route",link);
		};
		this.noSlide = function(j){
		    document.addEventListener("touchmove",function(e){
		        if(j==0){
		            //移动端禁止页面滑动
		            e.preventDefault();
		            e.stopPropagation();

		        }else if(j==1){
		            //取消event绑定的默认事件
		            if(e&&e.preventDefault && e&&e.stopPropagation){
		                window.event.returnValue = true;
		            }
		        }
		    },false);
		};
		this.getByteLen = function(val) {
		    var len = 0;
		    for (var i = 0; i < val.length; i++) {
		        if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
		            len += 2;
		        else
		            len += 1;
		    };
		    return len;
		};
		//搜索排序
		this.sortType = function(val){
		    switch(val){
		        case "综合":return 0;
		        case "价格":return 9;
		        case "商品销量":return 10;
		        case "新品":return 6;
		        case "人气":return 3;
		        case "店铺销量":return 7;
		    }
		};
		this.nullHtml = function(url,test){
		    var str='<div class="null" id="null"><p><img src="'+url+'" alt=""/></p><span>'+test+'</span></div>';
		    return str;
		}
		//拆单的时候按照金额从小到大
		this.orderSort = function(res){
            var data = res.providerList;
            for (var i = 0, l = data.length; i < l; i++) {
                var price = 0,
                    list = data[i].productList;
                for (var j = 0, k = list.length; j < k; j++) {
                    price += parseFloat(list[j].price * list[j].productNum);
                }
                data[i]["total_price"] = price; //这个是用来判断排序的
            }
            return data.sort(function(a,b){
                return a.total_price > b.total_price;
            });
		};
		//获取url传递的参数*/
		this.getParams = function(url){
			var params = {};
			if(!url){
				var search = location.search.substr(1);
				if(search){
					var key_values = search.split('&');
					if(key_values && key_values.length > 0){
						for(var i=0;i<key_values.length;i++){
							var key = key_values[i].split('=')[0];
							var val = key_values[i].split('=')[1];
							params[key] = val;
						}
					}
				}
			}else{
				var search1 = url.substr(url.indexOf('?')+1);
				if(search1){
					var key_values1 = search1.split('&');
					if(key_values1 && key_values1.length > 0){
						for(var i=0;i<key_values1.length;i++){
							var key = key_values1[i].split('=')[0];
							var val = parseInt(key_values1[i].split('=')[1]);
							params[key] = val;
						}
					}
				}
			}
			return params;
		};
        //对应唤起app传参
        this.goToApp=function(obj){
            var str="";
            obj.type==1 && (str+="product/detail?productId="+obj.fir+"&shopId="+obj.two+"&kid="+obj.three);//商品详情
            obj.type==3 && (str+="shop/detail?shopId="+obj.fir);//店铺详情
            obj.type==5 && (str+="mine/coupon?shopId="+obj.fir);//优惠券
            obj.type==7 && (str+="list/couponcenter");//领券中心
            obj.type==9 && (str+="circle/home?groupId="+obj.fir);//圈子
            obj.type==11 && (str+="circle/topicDetail?topicId="+obj.fir);//话题
            obj.type==13 && (str+="mine/money?userId="+obj.fir);//返利-提现
            obj.type==14 && (str+="mine/collection?userId="+obj.fir+"&type="+obj.two);//我的收藏-编辑
            obj.type==15 && (str+="order/comment?userId="+obj.fir+"&orderId="+obj.two);//订单详情：评价
            obj.type==16 && (str+="order/service?userId="+obj.fir+"&orderId="+obj.two);//订单详情：申请售后
            obj.type==17 && (str+="common/open_app");//“下载客户端”和客户端
            obj.type==18 && (str+="common/feedback_app?userId="+obj.fir);//“反馈”
            obj.type==19 && (str+="shop/settle");//商家入驻
            obj.type==20 && (str+="common/login");//登录
            return str;
        };
        this.alertIsLogin = function(){
            if(alertIsLogin===1){
            	if(!!document.documentElement.getAttribute('data-use-rem')){
            		alert.alertNewBox('账号已在其他设备登录','提示',function(){
                    var str=base64.encode(location.href);
                    location.assign('/login/index?redirect='+str);
	                },'去登录','知道了',true,function(){
	                    location.reload();
	                });
            	}else{
            		alert.alertBox('账号已在其他设备登录','提示',function(){
                    location.assign('/login/index');
	                },'去登录','知道了',true,function(){
	                    location.reload();
	                });
            	}
               /* alert.alertBox('账号已在其他设备登录','提示',function(){
                    location.assign('/login/index');
                },'去登录','知道了',true,function(){
                    location.reload();
                });*/
                // return false;
            }
        };
		function gId(id){
		    return document.getElementById(id);
		};
		function displayDiv(){
		    $('.zhezhao1').css('display','none');
		    $('.dianjianniu1').css('display','none');
		    $('#dianjianniu').on('click',function(){
		        if(!$(this).hasClass('round')){
		            $(this).addClass('round');
		            $('.zhezhao1').css('display','block');
		            $('.dianjianniu1').css('display','block');
		        } else {
		            $(this).removeClass('round');
		            $('.zhezhao1').css('display','none');
		            $('.dianjianniu1').css('display','none');
		        }
		    })
		    $(document).on('touchstart click',function(e){
		        var e = e || window.event; //浏览器兼容性
		        var elem = e.target || e.srcElement;
		        if($(elem).attr('id')!='dianjianniu' && $(elem).attr('class')=='zhezhao1'){
		            if($(elem).parent('div').attr('class')!='dianjianniu1'){
		                $('#dianjianniu').removeClass('round');
		                $('.zhezhao1').css('display','none');
		                $('.dianjianniu1').css('display','none');
		                return false;
		            }
		        }
		    })
		};
		function getHistory(str,flog){
		    var arr = sg.getCookie('history')!=''? JSON.parse(sg.getCookie('history')):[],
		        len=arr.length,
		        flog,flog1,
		        index=$.inArray(str,arr);
		    if(index!=-1){
                if(index!=0){
                    arr.splice(len-1,1);
                    sg.setCookie('history',JSON.stringify(arr),0);
                    location.assign(arr[index-1]);
                }else{
                    location.assign('/');
                }
		    }else{
                if(len<=1){
                    location.assign('/');
                }else{
                    arr.splice(len-1,1);
                    sg.setCookie('history',JSON.stringify(arr),0);
                    location.assign(arr[index-1]);
                }
		    }
		};
		function history(){
		    var href=location.href,
		        arr=sg.getCookie('history')!=''?JSON.parse(sg.getCookie('history')):[],
		        len=arr.length,
		        flog,flog1,
		        index=$.inArray(href,arr);
		    if(len>9){
		        arr.splice(0,1);
		    }
		    if(index==-1){
		        arr.push(href);
               arr=deleteHis(arr,href);
		    }else{
                if(index==0){
                    arr=arr.slice(1);
                }else{
                    flog1=arr;
                    arr=[];
                    arr=flog1.slice(0,index);
                    flog=flog1.slice(index+1);
                    arr=arr.concat(flog);
                }
                if(arr[arr.length-1]!=href){
                    arr.push(href);
                }
                arr=deleteHis(arr,href);
		    }
		    sg.setCookie('history',JSON.stringify(arr),0);
		    console.log(JSON.stringify(arr));
		};
        //在购物车、收银台和商品详情根据是否去过订单页 去除历史记录
        function deleteHis(arr,href){
           var  arr = arr;
            var checkstandIndex = isStr('car/checkstand',arr),
                loginIndex = isStr('login/index',arr),
                carIndex = isStr('car/index',arr),
                productIndex = isStr('/product/',arr),
                confirmIndex = isStr('car/confirm',arr),
                registIndex=isStr('/regist/index',arr),
                forgetpwdIndex=isStr('/forgetpwd/index',arr),
                repwdphoneIndex=isStr('/forgetpwd/repwdphone',arr),
                forgetpwdSetIndex=isStr('/forgetpwd/set',arr);
            if(confirmIndex >= 0){
                if(carIndex >= 0 && carIndex == (arr.length-1)){
                    return concatHis(arr,carIndex);
                }
                if(productIndex >= 0 && productIndex == (arr.length-1)){
                    return concatHis(arr,productIndex);
                }
                if(checkstandIndex >= 0 && checkstandIndex == (arr.length-1)){
                    return concatHis(arr,checkstandIndex);
                }
            }
            if(loginIndex >= 0 && self.isLogin()){
                return concatHis(arr,loginIndex);
            }
            //登录之后去除注册，忘记密码等非登录页。
            if(self.isLogin()){
                if(registIndex >= 0){
                    return concatHis(arr,registIndex);
                }
                if(forgetpwdIndex >= 0){
                    return concatHis(arr,forgetpwdIndex);
                }
                if(repwdphoneIndex >= 0){
                    return concatHis(arr,repwdphoneIndex);
                }
                if(forgetpwdSetIndex >= 0){
                    return concatHis(arr,forgetpwdSetIndex);
                }
            }
            return arr;
        }
        //删除指定索引的 数组.
        function concatHis(arr,idx){
           var flog,flog1,arr=arr;
            if(idx==0){
                arr=arr.slice(1);
            }else{
                flog1=arr;
                arr=[];
                arr=flog1.slice(0,idx-1);
                flog=flog1.slice(idx);
                arr=arr.concat(flog);
            }
            return arr;
        }
       //检测数组中是否含有某个字符串，是返回索引
       function isStr(str,arr){
           var index=-1;
           for(var i=arr.length-1;i>=0;i--){
               if(arr[i].indexOf(str)>=0){
                   index=i;
               }
           }
           return index;
       }

	}
	module.exports = new Common();
});