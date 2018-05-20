<template>
  <div class="outer" v-show="childOuter&&outer">

    <div class="home" v-show="home">
      <div class="home-text"></div>
      <div class="home-btn"><a class="warmBtn" href="javascript:;" @touchend="InfoShow(true, true)"></a><a class="ruleBtn" href="javascript:;" @touchend="RuleShow(true)"></a></div>
    </div>

    <div class="rule" v-show="rule">
      <div class="bg">
        <div class="back"><a href="javascript:;" @touchend="HomeShow(true)"></a></div>
        <div class="rule-cont">
          <div class="cont-text">
            <!-- <div class="text-title">规则：</div> -->
              <p>• 活动时间：2017.12.10 -2017.12.13</p>
              <p>• 活动奖品兑换：</p>
              <p>50暖心值兑换2元优惠券（无门槛）</p>
              <p>100暖心值兑换5元优惠券（无门槛）</p>
              <p>150暖心值兑换121元优惠券（满500可使用）</p>
              <p>优惠券使用时间：2017.12.10 -2017.12.13</p>
              <p>注：每个ID不同面额各仅限一张，优惠券为红券，每笔支付订单限用一张，不可叠加使用）；数量有限先到先得，优惠券仅限全场自营购买使用；</p>
              <p>• 活动内容：</p>
              <p>1.在活动期间，用户登录“取暖大作战”互动H5，通过邀请好友参与“送暖心值”互动小游戏，用户可获得相应的暖心值；</p>
              <p>2.每个好友每次最高可送出40暖心值（好友对于每个用户ID，仅有一次“送暖心值”的机会），当用户暖心值累计分别达到三个不同等级，用户则有机会获得兑换优惠券的机会；</p>
              <p>• 活动细则：</p>
              <p>1.临近活动时间，记得刷新页面；</p>
              <p>2.本次活动严禁恶意刷奖行为，一经发现立即取消中奖资格，不予发奖 ；</p>
              <p>3.互联网业务活动存在诸多不确定性，如因不可抗因素，例如活动中存在大面积作弊行为（如使用机器刷单等）、通讯线路故障、网络异常或计算机大规模瘫痪等原因致使活动难以继续开展的，国美有权取消、修改或暂停本活动；</p>
              <p>4.用户参与此活动即视为理解并同意本活动细则，在法律允许范围内， 国美对本活动有最终解释权。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="info" v-show="info">
      <div class="bg">
        <div class="back"><a href="javascript:;" @touchend="HomeShow(true)"></a></div>
        <div class="sex">
          <div class="sex-title">请选择你的性别</div>
          <div class="sex-btn clearfix">
            <div class="man fl" @touchend="touchMan">
              <div :class="[{'pitch': sex}, 'head']"><img :src="imagePath + 'man.png'" alt=""></div>
              <div class="btn"><a class="btn-man" href="javascript:;"></a></div>
            </div>
            <div class="woman fr" @touchend="touchWoman">
              <div :class="[{'pitch': !sex}, 'head']"><img :src="imagePath + 'woman.png'" alt=""></div>
              <div class="btn"><a class="btn-woman" href="javascript:;"></a></div>
            </div>
          </div>
        </div>
        <div class="nickname">
          <input :class="{'pitch': nickname.check}" type="text" maxlength="10" name="tname" placeholder="输入昵称" @touchend="focusInput" @keyup="checkNickname" @change="checkNickname" ref="inputNickname">
        </div>
        <div class="picture" @touchend="adjustFile($event, true)">
          <div class="picturetitle">请选择你的头像</div>
          <div class="head"><img v-show="!sex" class="head-woman" :src="imagePath + 'photoWoman.jpg'" alt=""><img v-show="sex" class="head-man" :src="imagePath + 'photoMan.jpg'" alt=""></div>
          <!-- <div class="picture-btn"><input type="file" id="upload3" style="display:block; width: 100%; height: 100%; opacity: 0; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1, true)" :disabled="nickname.disabled"></div> -->
          <div class="picture-btn"><input type="button" style="display:block; width: 100%; height: 100%; opacity: 0; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" :disabled="nickname.disabled"></div>
        </div>
      </div>
    </div>

    <div class="adjust" v-show="adjust">
      <div class="bg">
        <div class="back">
          <!-- <a href="javascript:;"></a> -->
        </div>

        <!-- <vueCropper
          ref="cropper1"
          :img="cropper.img"
          :autoCrop="cropper.autoCrop"
          :autoCropWidth="cropper.autoCropWidth"
          :autoCropHeight="cropper.autoCropHeight"
          :fixedBox="cropper.fixedBox"
        ></vueCropper> -->

        <div class="ocrop"   style="width: 200px;height: 200px;position: absolute;top: 50%;left: 50%;margin: -100px 0 0 -100px;">
          <croppa
            v-model="CroppaOption"
            canvas-color="#fff"
            :prevent-white-space="false"
            placeholder=" "
            placeholder-color="#200069"
            :show-remove-button="false"
            :show-loading="true"
            :loading-size="20"
            :initial-image="initialImg"
            >
          </croppa>
          <!-- <button class="btn" @click="generateImage"></button> -->
        </div>

        <div class="adjust-title">调整你的头像位置</div>
        <!-- <div class="head">
          <img class="head-woman" :src="imagePath + 'photoWoman.jpg'" alt="">
          <img class="head-man hide" :src="imagePath + 'photoMan.jpg'" alt="">
        </div> -->
        <div class="btn"><a @touchend="generateImage" href="javascript:;"></a></div>
      </div>
    </div>

    <div class="choice" v-show="choice">
      <div class="bg">
        <div class="back"><a href="javascript:;" @touchend="InfoShow(true, false)"></a></div>
        <div class="choice-pic">
          <div class="pic"><img :src="modelSrc" alt=""></div>
          <div class="choice-woman" v-show="!sex"></div>
          <div class="choice-man" v-show="sex"></div>
        </div>
        <div class="choice-text"><span>{{nickname.value}}</span>，选一个过冬吧？</div>
        <div class="choice-btn">
          <div class="btn choice1"><a @touchend="choiceTool($event, 1)" :class="[tool.value===1?'pitch-btn':'']" href="javascript:;"></a></div>
          <div class="btn choice2"><a @touchend="choiceTool($event, 2)" :class="[tool.value===2?'pitch-btn':'']" href="javascript:;"></a></div>
          <div class="btn choice3"><a @touchend="choiceTool($event, 3)" :class="[tool.value===3?'pitch-btn':'']" href="javascript:;"></a></div>
          <div class="btn choice4"><a @touchend="choiceTool($event, 4)" :class="[tool.value===4?'pitch-btn':'']" href="javascript:;"></a></div>
        </div>
      </div>
      <div class="ok-btn" @touchend="EquipShow(true)"></div>
    </div>

    <div class="equip" v-show="equip">
      <div class="bg">
        <div class="equip-text"> <span class="name">{{nickname.value}} </span><br>你给我的温暖，我都收在心里了</div>
        <div class="equip-pic">
          <div class="pic-head">
            <div class="pic"><img :src="modelSrc" alt=""></div>
            <div class="head-woman" v-show="!sex"></div>
            <div class="head-man" v-show="sex"></div>
            <div :class="[tool.value!=1?'hide':'', 'pic-equip1']"></div>
            <div :class="[tool.value!=2?'hide':'', 'pic-equip2']"></div>
            <div :class="[tool.value!=3?'hide':'', 'pic-equip3']"></div>
            <div :class="[tool.value!=4?'hide':'', 'pic-equip4']"></div>
          </div>
          <div class="pic-title"></div>
        </div>
      </div>
      <div class="equip-btn clearfix">
        <div class="poster btn"><a @touchend="createBanner(true)" href="javascript:;"></a></div>
        <div class="share btn"><a @touchend="ShareShow(true)" href="javascript:;"></a></div>
      </div>
    </div>

    <div class="shareWx" v-show="share" @touchend="EquipShowOver(true)">
      <div class="share-bg"></div>
      <div class="share-title"></div>
    </div>

    <!-- <div class="bannerPic" v-show="banner"> -->
      <!-- <img ref="banner1" style="display:block" :src="bannerSrc" alt=""> -->
    <!-- </div> -->
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  // import vueCropper from '../vue-cropper'

  var http = axios.create({
    timeout: 15 * 1000,
    baseURL: $GLOBAL_CONFIG['activity_domain'] + 'api'
  });
  // console.log('axios')
  export default {
    name: 'outer',
    data() {
      return {
        imagePath: $GLOBAL_CONFIG['pcimgpath']+ '/20171212/images/',
        outer: true,
        home: true,
        rule: false,
        info: false,
        adjust: false,
        choice: false,
        equip: false,
        share: false,
        banner: false,
        //需要验证的数据
        sex: true,
        faceUrl: "",
        nickname: {
          value: '',
          check: false,
          disabled: "disabled"
        },
        tool: {
          value: null,
          array: [null, null, null, null],
          check: false
        },
        //vueCropper所需数据
        cropper: {
  				img: '',
  				autoCrop: true,
  				autoCropWidth: 200,
  				autoCropHeight: 200,
  				fixedBox: true,
  			},
  			downImg: '#',
        modelSrc: null,
        bannerSrc: null,
        canvasSrc: null,

        CroppaOption: {},
        imgUrl: null,
        initialImg: null,

        newFile: null
      }
    },
    created() {
    },
    methods: {
      Toast(msg, time) {
        this.msg = msg;
        this.dom = this.createToast();
        this.setContent(msg);
        this.hide(time);

        Toast.prototype = {
          createToast: function(){
            var outerDiv = document.createElement("div");
            outerDiv.style.position = "fixed";
            outerDiv.style.zIndex = 999;
            outerDiv.style.bottom = "20%";
            outerDiv.style.width = "100%";
            outerDiv.style.display = "-webkit-box;";
            outerDiv.style.display = "-webkit-flex;";
            outerDiv.style.display = "flex";
            outerDiv.style["-webkitBoxPack"] = "center";
            outerDiv.style["-webkitJustifyContent"] = "center";
            outerDiv.style["justifyContent"] = "center";

            var innerDiv = document.createElement("div");
            innerDiv.style.maxWidth = "60px";
            innerDiv.style.padding = "10px";
            innerDiv.style.border = "1px solid #000";
            innerDiv.style.background = "#000";
            //innerDiv.style.opacity = 0.5;
            innerDiv.style.textAlign = "center";
            innerDiv.style.color = "#fff";
            innerDiv.style.fontSize = "12px";

            outerDiv.appendChild(innerDiv);
            document.body.appendChild(outerDiv);
            return outerDiv;
          },

          setContent: function(msg){
            this.dom.getElementsByTagName("div")[0].innerHTML = msg;
            return this;
          },

          setSize: function(width, height){
            //
          },

          resetSize: function(width, height){
            //
          },

          show: function(cb){
            this.dom.style.display = "-webkit-box;";
            this.dom.style.display = "-webkit-flex;";
            this.dom.style.display = "flex";
            typeof cb == "function" &&  cb.apply(this, arguments);
            return this;
          },

          hide: function(time, cb){
            var _this = this;
            setTimeout(function(){
              _this.dom.style.display = "none";
            }, time * 1000);
            typeof cb == "function" && cb.apply(this, arguments);
            return this;
          }
        }
      },
      uploadCroppedImage() {
        var _vue = this;
        this.CroppaOption.generateBlob((blob) => {
          // write code to upload the cropped image file (a file is a blob)
          _vue.modelSrc = blob;
        }, 'image/jpeg', 0.8) // 80% compressed jpeg file
      },
      generateImage(e) {
        var _vue = this;
    		e.preventDefault();
        e.stopPropagation();
	      let url = this.CroppaOption.generateDataUrl('image/jpeg', 0.3)
        if (!url) {
        	alert('请传图片')
          return
        }

        this.modelSrc = url

        this.adjust = !true;
        this.choice = true;
      },
      RuleShow(beal) {
        this.home = !beal;
        this.rule = beal;
      },
      HomeShow(beal) {
        this.share = this.info = this.rule = !beal;
        this.home = beal;
      },
      InfoShow(beal, once) {
        let _vue = this;
        let value = this.$refs.inputNickname.value.replace(/\s+/gm,'');
        $g.getUserInfo(function(data) {
         //登录成功
         console.log('登录成功')
         _vue.home = !beal;
         _vue.choice = !beal;
         _vue.info = beal;
        }, function(e) {
         //登录失败
         console.log('登录失败')
         $g.login();
        });
        // console.log(value)
        if(once) {

        } else {
          if(/^[\u4E00-\u9FA5aa-zA-Z1-9]{1,10}$/ig.test(value)){
            if(value.length&&value.length<=10) {
              this.nickname.value = value;
              this.nickname.check = true;
              this.nickname.disabled = false;
            } else {
              this.nickname.value = '';
              this.nickname.check = false;
              this.nickname.disabled = "disabled";
              this.setToast('名字长度超过10位');
            }
          } else {
            this.setToast('名字含有异常字符');
            this.nickname.check = false;
            this.nickname.disabled = "disabled";
          }
        }
      },
      EquipShow(beal) {
        let _vue = this;
        if(this.tool.check) {
          this.share = this.choice = !beal;
          this.equip = beal;
          this.sex = this.sex?1:0;

          http.post('upload', qs.stringify({
            "content": this.modelSrc
          })).then(function(res) {
            // debug
             //res.data.success = false;
             _vue.faceUrl = res.data.data[0];
            if(res.data.success) {
              http.post('save', qs.stringify({
                'user_id'   : $GLOBAL_CONFIG['user_id'],
                'sex'       : _vue.sex,
                'nick_name' : _vue.nickname.value,
                'icon'      : res.data.data[0],
                'product_type' :  _vue.tool.value
              })).then(function(data) {
                // console.log(data);
              })
            }
          })
        }
      },
      EquipShowOver(beal) {
        this.share = this.choice = !beal;
        this.equip = beal;
      },
      ShareShow(beal) {
        var UA = window.navigator.userAgent.toLowerCase();

        if( UA.indexOf('micromessenger') !== -1 ) {
          this.share = beal;
        } else if( UA.indexOf('gome') !== -1 ) {
          var param = {
            title: qq_zone_title,
            shareDesc: qq_zone_desc,
            shareImageUrl: qq_zone_img,
            shareUrl: qq_zone_link,
            platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
          };
          $g.callShareComp(param);
       } else {
         this.setToast('请用浏览器自带分享功能分享');
       }
     },
      setToast(messages) {
          var dom = document.getElementById("browser-share");
          if(dom){
            dom.innerHTML = '<div style="max-width: 60px; padding: 10px; border: 1px solid rgb(0, 0, 0); background: rgb(0, 0, 0); text-align: center; color: rgb(255, 255, 255); font-size: 12px;">'+ messages +'</div>';
          }else{
            $("body").append('<div id="browser-share" style="position: fixed; z-index: 999; bottom: 20%; width: 100%; display:-webkit-box;display:-webkit-flex;display: flex; -webkit-box-pack: center; justify-content: center;"><div style="max-width: 60px; padding: 10px; border: 1px solid rgb(0, 0, 0); background: rgb(0, 0, 0); text-align: center; color: rgb(255, 255, 255); font-size: 12px;">'+ messages +'</div></div>');
          }

         setTimeout(function(){
           $("#browser-share").hide();
         }, 3 * 1000);
      },
      adjustFile(e, beal) {
        let _vue = this;
        //上传图片
  			// this.option.img
  			// var file = e.target.files[0]
  			// if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
  			// 	 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
  			// 	 return false
  			//  }
  			// var reader = new FileReader()
  			// // 转化为base64
  			// reader.readAsDataURL(file)
  			// reader.onload = (e) => {
  			// 	let data
  			// 		data = e.target.result
        //     _vue.initialImg = data
        //     _vue.info = !beal;
        //     _vue.adjust = beal;
  			// }
  			// 转化为blob
  			if(_vue.nickname.check) {
          document.querySelector('.croppa-container').querySelector('input').click();
          // console.log(document.querySelector('.croppa-container').querySelector('input').value)


          document.querySelector('.croppa-container').querySelector('input').addEventListener('change', function(e) {
      			var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
      				 // alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
      				 return false
      			 }
      			var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function() {
              _vue.info = !beal;
              _vue.adjust = beal;
            }
          })
          // this.newFile = this.CroppaOption.getChosenFile();
        }
      },
      touchMan() {
        this.sex = true;
      },
      touchWoman() {
        this.sex = false;
      },
      focusInput(e) {
        e.target.focus();
      },
      checkNickname(event) {
        let value = this.$refs.inputNickname.value.replace(/\s+/gm,'');
        // console.log(value)
        if(/^[\u4E00-\u9FA5aa-zA-Z1-9]{1,10}$/ig.test(value)){
          if(value.length&&value.length<=10) {
            this.nickname.value = value;
            this.nickname.check = true;
            this.nickname.disabled = false;
          } else {
            this.nickname.value = '';
            this.nickname.check = false;
            this.nickname.disabled = "disabled";
            this.setToast('名字长度超过10位');
          }
        } else {
          this.setToast('名字含有异常字符');
          this.nickname.check = false;
          this.nickname.disabled = "disabled";
        }
      },
      uploadImg (e, num, beal) {
  			//上传图片
  			// this.option.img
  			let _vue = this;
        //上传图片
  			// this.option.img
  			var file = e.target.files[0]
  			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
  				 // alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
  				 return false
  			 }
  			var reader = new FileReader()
  			reader.onload = (e) => {
  				let data
  				if (typeof e.target.result === 'object') {
  					// 把Array Buffer转化为blob 如果是base64不需要
  					data = window.URL.createObjectURL(new Blob([e.target.result]))
  				} else {
  					data = e.target.result
  				}
  				if (num === 1) {
            _vue.cropper.img = data
  				}
  			}
  			// 转化为base64
  			// reader.readAsDataURL(file)
  			// 转化为blob
  			reader.readAsArrayBuffer(file)
        e.target.value = '';
        e.target.onchange = null;
        _vue.info = !beal;
        _vue.adjust = beal;
  		},
      finish (e, type) {
  			e.preventDefault();
        e.stopPropagation();
        // window.ontouchend = window.ontouchmove = window.onmouseup = window.onmousemove = null;
  			this.$refs.cropper1.getCropData((data) => {
  				//data 在这里表示数据层

          this.adjust = false;
  				this.choice = true;
  				this.modelSrc = data
  			})
  		},
      choiceTool(e, num) {
  			// e.preventDefault();
        // e.stopPropagation();
        switch (e, num) {
          case 1:
            this.tool.value = 1;
            this.tool.check = true;
            break;
          case 2:
            this.tool.value = 2;
            this.tool.check = true;
            break;
          case 3:
            this.tool.value = 3;
            this.tool.check = true;
            break;
          case 4:
            this.tool.value = 4;
            this.tool.check = true;
            break;
          default:

        }
      },
      setShare() {
        (function(){
            $g.ready().then(function() {
                var obj = {
                    type:'share',
                    icon:'file://share',
                    shareInfo:{
                        title: qq_zone_title,
                        shareDesc: qq_zone_desc,
                        shareImageUrl: qq_zone_img,
                        shareUrl: link_login,
                        platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
                    },
                };
                if ($g.env.app) {
                    $g.setHeadBar({
                        menus:{
                            isShowCloseMenu:'Y',
                            rightMenus:[
                                obj
                            ]
                        },
                    });
                }
            });
        })();
      },
      createBanner(beal) {
        this.setShare();
        var data={
        	"error":"生成封面图失败，请重新加载生成",
        	"name":"",
        	"detail1": "你给我的温暖，",
        	"detail2": "我都收在心里了",
        	"codetalk": "长按识别二维码    为ta送温暖",
        	"image":[this.imagePath + 'banner/bg1.png'],
        	"faceImage":[],
        	"resImage":[],
        	"toolImage":[],
        	"codeImage":[$GLOBAL_CONFIG['activity_domain'] + 'qrcode/urlcode?url=' + encodeURIComponent(link_login)],
          "wSize": 0,
          "hSize": 0,
          "Xposition": 0,
          "Yposition": 0
        },imgPath,_vue=this;

        (function init() {
          _vue.outer = _vue.equip = !beal;
          data.name = _vue.nickname.value + ':';
          data.faceImage.push(_vue.modelSrc);
          if(_vue.sex) {
            data.resImage[0] = _vue.imagePath + 'banner/body1.png';
          } else {
            data.resImage[0] = _vue.imagePath + 'banner/body2.png';
          }

          switch (_vue.tool.value) {
            case 1:
                data.toolImage.push(_vue.imagePath + 'banner/food1.png');
                data.wSize = 139
                data.hSize = 177
                data.Xposition = 369
                data.Yposition = 638
              break;
            case 2:
                data.toolImage.push(_vue.imagePath + 'banner/trousers1.png');
                data.wSize = 150
                data.hSize = 223
                data.Xposition = 128
                data.Yposition = 616
              break;
            case 3:
                data.toolImage.push(_vue.imagePath + 'banner/nuanbaby1.png');
                data.wSize = 133
                data.hSize = 95
                data.Xposition = 178
                data.Yposition = 671
              break;
            case 4:
                data.toolImage.push(_vue.imagePath + 'banner/shoes1.png');
                data.wSize = 169
                data.hSize = 112
                data.Xposition = 345
                data.Yposition = 730
              break;
            default:

          }

          draw();
        })()


        function draw(){
        	var canvas=document.createElement('canvas');
        	// document.body.appendChild(canvas);
        	canvas.width=640;
        	canvas.height=1008;
        	if(canvas.getContext){
        		var context=canvas.getContext('2d');
  					context.save()
        		context.fillStyle='#fff';
        		context.fillRect(0,0,canvas.width,canvas.height);
        		// 宣传图片
        		var h=0;
        		function faceDraw(num){
        			var len=data.faceImage.length;
        			if(num < len){
        				var img=new Image();
          			img.crossOrigin = 'anonymous'
        				if(num==0){
        					img.onerror=function(){
        						context.fillStyle='#fff';
        						context.stokeStyle='#dfdfdf';
        						context.fillRect(20,20,100,100);
        						context.strokeRect(20,20,100,100);
        						context.font='60px MicrosoftYaHei';
        						context.textAlign='center';
        						context.textBaseline='middle';
        						context.fillStyle='#333';
        						context.fillText(data.error,context.measureText(data.error).width,120);
        						return false;
        					}
        					img.onload=function(){
        						context.globalAlpha = 1;
        						// context.drawImage(img,203,461,200,200);
        						context.drawImage(img,250,521,140,140);
        						faceDraw(num+1);
        					}
          				img.src=_vue.faceUrl;
        				}
        			} else {
        				bgDraw(0);
        			}
        		}


        		function bgDraw(num){
        			var len=data.image.length;
        			if(num<len){
        				var img=new Image;
          			img.crossOrigin = 'anonymous'
        				if(num==0){
        					img.onerror=function(){
        						context.fillStyle='#fff';
        						context.stokeStyle='#dfdfdf';
        						context.fillRect(20,20,100,100);
        						context.strokeRect(20,20,100,100);
        						context.font='60px MicrosoftYaHei';
        						context.textAlign='center';
        						context.textBaseline='middle';
        						context.fillStyle='#333';
        						context.fillText(data.error,context.measureText(data.error).width,120);
        						return false;
        					}
        					img.onload=function(){
        						context.globalAlpha = 1;
        						context.drawImage(img,1,0,640,1008,0,0,640,1008);
        						bgDraw(num+1);
        					}
          				img.src=data.image[num];
        				}
        			}else{
        				context.globalAlpha = 1;
        				context.font='normal 28px MicrosoftYaHei';
        				context.fillStyle='#fff';
        				context.textAlign='center';
        				context.fillText(data.name,canvas.width/2-context.measureText(data.name).width/4,139);
        				context.fillText(data.detail1,context.measureText(data.detail1).width/2+208,139 + 50);
        				context.fillText(data.detail2,context.measureText(data.detail2).width/2+208,189 + 50);
        				resDraw(0);
        			}
        		}


        		function resDraw(num) {
        			var len=data.resImage.length;
        			var img=new Image;
        			img.crossOrigin = 'anonymous'
        			if(num < len) {
        				if(num==0){
        					img.onerror=function(){
        						context.clearRect(0,0,640,1008);
        						context.fillStyle='#fff';
        						context.stokeStyle='#dfdfdf';
        						context.fillRect(20,20,100,100);
        						context.strokeRect(20,20,100,100);
        						context.font='60px MicrosoftYaHei';
        						context.textAlign='center';
        						context.textBaseline='middle';
        						context.fillStyle='#333';
        						context.fillText(data.error,context.measureText(data.error).width,120);
        						return false;
        					}
        					img.onload=function(){
        						context.globalAlpha = 1;
        						context.drawImage(img,167,431,307,365);
        						resDraw(num+1);
        					}
        				}
          			img.src=data.resImage[num];
        			} else {
        				toolDraw(0);
        			}
        			//需要跨域
        			// else{
        			// 	imgPath=canvas.toDataURL("image/jpeg");
        			// 	document.getElementsByTagName('img')[0].src=imgPath;
        			// }
        		}


        		function toolDraw(num) {
        			var len=data.toolImage.length;
        			var img=new Image;
        			img.crossOrigin = 'anonymous'
        			if(num < len) {
        				if(num==0){
        					img.onerror=function(){
        						context.clearRect(0,0,640,1008);
        						context.fillStyle='#fff';
        						context.stokeStyle='#dfdfdf';
        						context.fillRect(20,20,100,100);
        						context.strokeRect(20,20,100,100);
        						context.font='60px MicrosoftYaHei';
        						context.textAlign='center';
        						context.textBaseline='middle';
        						context.fillStyle='#333';
        						context.fillText(data.error,context.measureText(data.error).width,120);
        						return false;
        					}
        					img.onload=function(){
        						context.globalAlpha = 1;
        						context.drawImage(img,data.Xposition,data.Yposition,data.wSize,data.hSize);
        						toolDraw(num+1);
        					}
        				} else if(num==1) {
        					img.onload=function(){
        						context.globalAlpha = 1;
        						context.drawImage(img,178,671,133,95);
        						toolDraw(num+1);
        					}
        				} else if(num==2) {
        					img.onload=function(){
        						context.globalAlpha = 1;
        						context.drawImage(img,133,647,150,233);
        						toolDraw(num+1);
        					}
        				} else if(num==3) {
        					img.onload=function(){
        						context.globalAlpha = 1;
        						context.drawImage(img,369,638,139,177);
        						toolDraw(num+1);
        					}
        				}
          			img.src=data.toolImage[num];
        			} else {
        				codeDraw();
        			}
        		}


        		function codeDraw() {
        			var len=data.codeImage.length;
        			var img=new Image;
              img.crossOrigin = 'anonymous'
        			img.onerror=function(){
        				context.clearRect(0,0,640,1008);
        				context.fillStyle='#fff';
        				context.stokeStyle='#dfdfdf';
        				context.fillRect(20,20,100,100);
        				context.strokeRect(20,20,100,100);
        				context.font='60px MicrosoftYaHei';
        				context.textAlign='center';
        				context.textBaseline='middle';
        				context.fillStyle='#333';
        				context.fillText(data.error,context.measureText(data.error).width,120);
        				return false;
        			}
        			img.onload=function(){
        				context.globalAlpha = 1;
        				context.drawImage(img,canvas.width/2-86/2,863,87,87);

        				context.font='normal 14px MicrosoftYaHei';
        				context.fillStyle='#fff';
        				context.textAlign='center';
        				context.fillText(data.codetalk,canvas.width/2,979);
                createImg();
        			}
        			img.src=data.codeImage[0];
        		}

            function createImg() {
              // debug
              // alert(_vue.bannerSrc)   null
              // canvas.style.width = '100%';
              // canvas.style.height = '100vh';
              // canvas.style.display = 'none';
        			// document.body.appendChild(canvas);
    					// context.resave()
        			// _vue.$refs.banner1.crossOrigin = '*'
              // _vue.$refs.banner1.crossOrigin='anonymous';
              // _vue.$refs.banner1.style.width = '100%';
              // _vue.$refs.banner1.style.height = '100vh';
              var bannerSrc = canvas.toDataURL('image/jpeg', 0.4);
              var img = new Image();
              img.crossOrigin = '*'
              img.crossOrigin='anonymous';
              img.src = bannerSrc;
              img.style.width = '100%';
              img.style.height = '100vh';
              img.style.position = 'absolute';
              img.style.zIndex = 99999;
              document.body.appendChild(img);
              // alert(_vue.bannerSrc)    无法打印
              _vue.banner = _vue.outer = beal;
        			// console.log(this.imgs)

            }
        		faceDraw(0);
        	}
        }

        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            var min_size = Math.min(w, h);
            if (r > min_size / 2) r = min_size / 2;
            // 开始绘制
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        }
      }
    },
    props: {
      childOuter: Boolean
    },
      // components: {
      //   vueCropper
      // }
  }
</script>
