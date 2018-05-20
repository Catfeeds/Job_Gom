     function ajaxFileUpload(objUpload) {

         var nowTime = (new Date()).valueOf();
         var keyStr = objUpload.option.appId + objUpload.option.uid + nowTime;
         var keys = md5(keyStr);
         var formData = new FormData();
         formData.append('file', $(objUpload.option.file)[0].files[0]); //将文件转成二进制形式
         formData.append('appId', objUpload.option.appId);
         formData.append('uid', objUpload.option.uid);
         formData.append('currentTime', nowTime);
         formData.append('key', keys);
         formData.append('traceId', new Date().getTime() + "!" + Math.random(10000));
         $.ajax({
             type: "post",
             url: IMConstants.IM_FILESERVERLIST + "/im-upload/ImageUploadServlet.do",
             contentType: false, //这个一定要写
             processData: false, //这个也一定要写，不然会报错
             data: formData,
             dataType: 'json', //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
             success: function(data) {
                 data.data.imgUrl = IMConstants.IM_LOADFILEURL + "/v1/img/" + data.data.imgSmallName;
                 objUpload.option.fileUpload(data);
             },
             error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                 objUpload.option.error(data);
             }
         });
     }

     function sendListOffileMsgs(obj) {

         var groupId = "";
         if (obj.option.userType == 1) {
             groupId = obj.option.imUserId + "_" + "9999999997" + "_" + obj.option.shopId; //商家客服
         } else if (obj.option.userType == 2) {
             groupId = obj.option.imUserId + "_" + "9999999999"; //小美客服
         }
         $.ajax({
             type: "POST",
             //url:"http://10.125.3.61:8080/im-platform/msg/jsPullMsg.json?appId=TEST_APP_ID&groupId=658_853&imUserId=658&token=696cab163afb4a50bec0adea95420a48",
             url: IMConf.IM_API_URL + "msg/jsPullMsg.json",
             data: {
                 "appId": IMConf.APPID,
                 "groupId": groupId,
                 "imUserId": obj.option.imUserId,
                 "token": obj.option.token,
                 "deviceType": IMConf.DEVICE_TYPE,
                 "pageSize": obj.option.pageSize,
                 "msgSeqId": obj.option.msgSeqId
             },
             dataType: 'json',
             success: function(data) {
                 obj.option.listOfficeMsg(data);
             },
             error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                 obj.option.error(data);
             }
         });
     }

     function sendListGroupMsgs(obj) {
         $.ajax({
             type: "POST",
             // http://localhost:8081/im-platform/msg/listGroup.json?appId=gomeplus_pre&imUserId=658&time=1464271262966&token=696cab163afb4a50bec0adea95420a48
             url: IMConf.IM_API_URL + "msg/jsListGroup.json",
             data: {
                 "appId": IMConf.APPID,
                 "imUserId": obj.option.uid,
                 "time": obj.option.time,
                 "token": obj.option.token,
                 "deviceType": IMConf.DEVICE_TYPE
             },
             dataType: 'json',
             success: function(data) {
                 obj.option.listGroupMsg(data);
             },
             error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                 obj.option.error(data);
             }
         });
     }
     /**
      * 获取网络视频截图：视频文件
      */
     function getServerVideoAndPicPath(message) {
         var videopic = "";
         var videoName = "";
         if (message.attch !== undefined && message.attch[0].attachUrl !== undefined) {
             videopic = message.attch["0"].attachUrl;
             if (videopic.toLowerCase().indexOf("_vedio.mp4") !== -1) {
                 videoName = videopic.replace("_vedio.mp4", "_img.jpg");
                 message.attch["0"].attachUrl = videoName;
             }
         }
         return message;
     }

     function Dictionary() {
         this.data = new Array();
         this.put = function(key, value) {
             this.data[key] = value;
         };

         this.get = function(key) {
             return this.data[key];
         };

         this.remove = function(key) {
             this.data[key] = null;
         };

         this.isEmpty = function() {
             return this.data.length == 0;
         };

         this.size = function() {
             return this.data.length;
         };
     }
