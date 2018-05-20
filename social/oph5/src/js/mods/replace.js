define('mods/replace',function(require,exports,module){
	module.exports = {
		replaceData:function(timestamp){
		    var timestamp = parseInt(this.get_unix_time(timestamp))*1000;
		    if(timestamp && timestamp > 0){
		        var now = Date.now();
		        var duration = Math.round((now - timestamp)/60000);
		        if(duration < 60){
		            return duration + "分钟前";
		        }else if(duration >= 60 && duration < 60 * 24){
		            return Math.floor(duration/60) + '小时前';
		        }else if(duration >= 60 * 24 && duration < 60 * 48){
		            return '昨天';
		        }else if(duration >= 60 * 48){
		            return Math.floor(duration/(60*24)) + '天前';
		        }
		    }else{
		        return "刚刚";
		    }
		},
		get_unix_time:function(dateStr)
		{
		    var newstr = dateStr.replace(/-/g,'/'); 
		    var date =  new Date(newstr); 
		    var time_str = date.getTime().toString();
		    return time_str.substr(0, 10);
		},
		replaceFace:function(content){
		    var faces = new Array('微笑','YY','惊恐','愤怒','色','尴尬','石化','大笑','流泪','可怜','大哭','晕','抠鼻','得意','疑问','抓狂','亲','恶心','鄙视','伤心','阴险','困','迷茫','睡觉','努力','怒视','衰','咒骂','左撇嘴','右撇嘴','口罩','生病','无语','调皮','流汗','欢庆','吐血');
		    var res = content;
		    if(res && res.indexOf('[') > -1){
		        for(var i=0;i<faces.length;i++){
		            if(res.indexOf(faces[i]) > -1){
		                var reg = RegExp('\\['+faces[i]+'\\]','g');
		                res = res.replace(reg,'<img src="'+_PUBLIC_+'/images/face_'+(i>=9?(i+1):('0'+(i+1)))+'.gif">');
		            }
		        }
		    }
		    return res; 
		},
		/**
		 * @method replace2overview
		 * @desc 将原图替换成缩略图
		 * @author yanglang
		 */
		replace2Overview:function(){
			var orginImages = $('img[data-src]'),self = this;
			orginImages.each(function(){
				var $this = $(this),
					orignSrc = $this.attr('data-src'),
					transSize = $this.attr('data-size'),
					isDefault = $this.attr('data-default');
				$this.attr('src',self.replaceImg(orignSrc,transSize,isDefault));
			});
		},
		/**
		 * 替换图片路径为相应缩略图路径
		 * @param url 图片路径
		 * @param size 尺寸序号
		 * @param isDefault
		 * @author 杨浪
		 * @returns {*}
		 */
		replaceImg:function(url,size,isDefault){
			if(arguments.length == 0)
				return this.replace2Overview();
			if(!url){
                return !isDefault?''+_PUBLIC_+'/images/default_product.png':''+_PUBLIC_+'/images/gmlogo.png';
			}
			size = size?size:0;
			var sizes = ['260','260','260','360'];
			if(/^.*(?:\_\d{2,3})\.(?:JPG|PNG|JPEG|GIF)$/i.test(url)){
				//自带缩略图
				return url.replace(/^(.*)(?:\_\d{2,3})\.(JPG|PNG|JPEG|GIF)$/i,function(i,v,m){
					return v+'_'+sizes[size]+'.'+m;
				});
			}else{
				//未自带缩略图
				return url.replace(/^(.*)\/([^\/]*).(JPG|PNG|JPEG|GIF)$/i,function(i,v,m,n){
					return v+'/'+m+'_'+sizes[size]+'.'+n;
				});
			}
		},
		//把时间戳改为字符串
		getLocalDate:function(time,separator,hasTime,isHours) {     
		    var date = time? new Date(time) : new Date();
		    var year = date.getFullYear();
		    var month = (date.getMonth() + 1) > 9?(date.getMonth() + 1):'0'+(date.getMonth() + 1);
		    var day = date.getDate() > 9?date.getDate():'0'+date.getDate();
		    var hour = date.getHours() > 9?date.getHours():'0'+date.getHours();
		    var minute = date.getMinutes() > 9?date.getMinutes():'0'+date.getMinutes();
		    var second = date.getSeconds() > 9?date.getSeconds():'0'+date.getSeconds();
		    var dateStr = '';
		    if(separator){
		        dateStr += year + separator + month + separator + day;
		    }else{
		        dateStr += year + '.' + month + '.' + day;
		    }
		    if(hasTime){
		        if(isHours){
		            dateStr += ' ' + hour +':' + minute;
		        }else{
		            dateStr += ' ' + hour +':' + minute + ':' + second;
		        }
		    }
		    return dateStr;
		},
		/********星号替换***********/
		replaceX:function(str){
		    var newstr = '';
		    if(str.length == 11){
		        newstr = str.substr(0,3) + "*****" + str.substr(8);
		    }
		    return newstr;
		},
		replaceStr:function(str){
		    var newstr = '';
		    if(str.length >= 6){
		        newstr = str.substr(0,2) + "***" + str.substr(-2);
		    }else{
		        return str;
		    }
		    return newstr;
		}
	}
});