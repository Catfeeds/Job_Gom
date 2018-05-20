var WebUploader = require('../../plugin/webuploader/webuploader.js');
require('../../plugin/jquery.cropper.js');
var alert = require('module/popup/alert');

var confirm = require('module/popup/confirm');
var $webUpLoader;
var $noticeBox = $('[data-node="noticeBox"]');
// var $noticeInfo = $noticeBox.find('[data-node="noticeInfo"]');
var $wrap = $('.preview-layer');
var $cropImg = $wrap.find('img');
var $preview = $('[data-node="avatrSelector"]');
var $avatarSave = $('[data-action="avatarSave"]')
var $progress = $wrap.find('[data-node="uploadProgress"]');
var $error = $('[data-node="error"]');
var $loadNotice = $wrap.find('[data-node="loadNotice"]');
var $cancel = $wrap.find('[data-action="cancel"]');
var $previewTitle0 = $(".preview-title0");

var avatarData = {};
var files;
var defaultImage = $cropImg.attr('data-default');
var isUpload = false;
var link = '';
var isIE8 = !window.FormData;
var key = false;


var startCrop = function() {
  isUpload = true;
  $cropImg.cropper({
    aspectRatio: 2/1,
    background: false,
    guides: false,
    modal: true,
    highlight: true,
    autoCropArea: 1,
    dragCrop: true,
    touchDragZoom: false,
    zoomable: false,
  });

  // $cropImg.on('dragend.cropper', function (e) {
  //
  //   if(e.originalEvent.offsetX && e.originalEvent.offsetX>=200) {
  //   } else {
  //     alert('截取失败');
  //   }
  //
  // });
};

var preview = function(upload, cropper, callback) {

  $webUpLoader = WebUploader.create(upload);

  $('[data-node="upload-success-wrap"]').on('mouseenter', function() {
    $('[data-node="upload-success-close"]').show();
  }).on('mouseleave', function() {
    $('[data-node="upload-success-close"]').hide();
  })

  $('[data-node="upload-success-close"]').on('click', function() {
    $('.upload-success').hide();
    $('[data-node="upload-img"]').show();
    $('[data-defaultAddFile=topic-picker]').show();
    $('[data-node="upload-success-img"]').attr('src','');
    // console.log($('[data-defaultAddFile=topic-picker]'));
    $webUpLoader.addButton({
      id: '[data-defaultAddFile=topic-picker]',
    });
    submit();

    /*if (isUpload && $(this).hasClass('active')) {
      isUpload = false;
      avatarData = $cropImg.cropper('getData');
      avatarData.type = 'crop';
      $webUpLoader.on('uploadBeforeSend', function(object, data) {
        $.extend(data, avatarData);
      });
      $webUpLoader.retry(files);
    }*/
  })

  $webUpLoader.on('beforeFileQueued', function() {
    isUpload = false;
    $('[data-node="upload-success-img"]').hide().attr({
      'src': null,
      'proto': ''
    })
    $cropImg.cropper('destroy');
    $error.hide();
    files !== undefined && $webUpLoader.removeFile(files.id);
  });

  $webUpLoader.on('fileQueued', function(file) {
      files = file;

      if (isIE8 && !key) {
        key = true;
        $webUpLoader.upload(files);
      } else {
        $webUpLoader.makeThumb(file, function(error, ret) {
          if (error) {
            $webUpLoader.removeFile(files.id);
            $noticeBox.removeClass('load-ing').show();
            alert('上传失败，请重新上传');
          } else {
            $('.pop-box-backdrop').show();
            $noticeBox.hide();
            $progress.css('width', 0);
            $cropImg.attr('src', ret);
            startCrop(cropper);
            $avatarSave.addClass('active');
            if ($cropImg.attr('data-edit')) {
              $('[data-defaultAddFile=topic-picker]').hide();
              $webUpLoader.addButton({
                id: '[data-action="upload-edit"]',
                innerHTML: '修改'
              });
            }

          }
        });
      }
      /* 解决错误图片报错，无法在获取进度条之前获取报错，故暂不显示进度条 */
      /*$webUpLoader.md5File(file)
        // 及时显示进度
        .progress(function(percentage) {
          $loadNotice.text('图片加载中');
          $noticeBox.addClass('load-ing').show();
          $progress.css('width', percentage * 100 + '%');
        })
        // 完成
        .then(function(  ) {
          console.log(arguments)
        });*/
      
    })
    //报错
  $webUpLoader.on('error', function( /*type*/ ) {
    /*var errNotice = {
        Q_EXCEED_NUM_LIMIT: '文件个数超出限制',
        Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
        Q_TYPE_DENIED: '文件类型错误',
        F_EXCEED_SIZE: '请上传jpg、png格式且小于4M的图片！'
    }*/
    $cropImg.attr('src', defaultImage);
    $preview.find('img').attr('src', defaultImage);
    $error.show().find('span').text('请上传小于2M的图片，支持格式jpg、jpeg、png、gif！');
    alert('请上传小于2M的图片，支持格式jpg、jpeg、png！');
    $avatarSave.removeClass('active');
  });

  //上传成功
  $webUpLoader.on('uploadSuccess', function(file, response) {
    $('[data-node="upload-success-close"]').hide();
    if (response.success || response.code == 200) {
      //正则匹配协议头
      var url = response.data[0];
      var reg = new RegExp(/(\w+:)(\/\/.*)/)
      var result = url.match(reg);
      if (key) {  

        var isImg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(result[2]);
        if( isImg ){

          // $('.upload-img').attr('src', response.data[0]);
          $('.pop-box-backdrop').show();
          $('[data-edit="btn"]').attr('src', response.data[0]);
          $('[data-node="upload-img"]').hide();

          $('.upload-success').show();
          $('[data-node="upload-success-img"]').show().attr({
            'src': result[2],
            'proto': result[1]
          }).load(function() {
            this.realWidth = this.width;
            this.realHeight = this.height;

            // if(this.realWidth>=790){
            //   $('[data-node="upload-success-img"]').css("width","790px").css("height","auto");
            //   $('[data-node="upload-success-close"]').css("left", 790 - 46 + "px");
            // } else if(this.realWidth<=76){
            //   $('[data-node="upload-success-img"]').css("width", "76px").css("height","auto");
            //   $('[data-node="upload-success-close"]').css("left", 76 - 46 + "px");
            // } else {
            //   $('[data-node="upload-success-img"]').css("width", this.realWidth + "px").css("height", this.realHeight + "px");
            //   $('[data-node="upload-success-close"]').css("left", this.realWidth - 46 + "px");
            // }
            $('[data-node="upload-success-img"]').css("width","790px").css("height","395px");
            $('[data-node="upload-success-close"]').css("left", 790 - 46 + "px");
            // $('[data-node="upload-success-close"]').show();
          });
          startCrop();
          $noticeBox.hide();
          key = false;
          $avatarSave.addClass('active');
        }else{
          alert('上传失败，请重新上传');
        }
      } else {
        // $('.upload-img').attr('src', response.data[0]);
        $('.pop-box-backdrop').hide();
        $('[data-edit="btn"]').attr('src', response.data[0]);
        $('[data-node="upload-img"]').hide();

        $('.upload-success').show();
        $('[data-node="upload-success-img"]').show().attr({
          'src': result[2],
          'proto': result[1]
        }).load(function() {
          this.realWidth = this.width;
          this.realHeight = this.height;

          // if(this.realWidth>=790){
          //   $('[data-node="upload-success-img"]').css("width","790px").css("height","auto");
          //   $('[data-node="upload-success-close"]').css("left", 790 - 46 + "px").show();
          // } else if(this.realWidth<=76){
          //   $('[data-node="upload-success-img"]').css("width", "76px").css("height","auto");
          //   $('[data-node="upload-success-close"]').css("left", 76 - 46 + "px");
          // } else {
          //   $('[data-node="upload-success-img"]').css("width", this.realWidth + "px").css("height", this.realHeight + "px");
          //   $('[data-node="upload-success-close"]').css("left", this.realWidth - 46 + "px").show();
          // }
          $('[data-node="upload-success-img"]').css("width","790px").css("height","395px");
          $('[data-node="upload-success-close"]').css("left", 790 - 46 + "px");
          // $('[data-node="upload-success-close"]').show();
        });
        $noticeBox.hide();
        $cropImg.cropper('destroy');
        $preview.find('img').attr('src', response.data[0]);
        $webUpLoader.removeFile(files);
        link = response.data[0];
        callback.call(null, response.data[0]);
        $avatarSave.removeClass('active');
        files = undefined;
      }
    } else {
      console.log('上传异常');
      $('.pop-box-backdrop').hide();
      $('[data-node="upload-img"]').hide();
      $('.cropper-crop-box').hide();
      $noticeBox.removeClass('load-ing').show();
      isUpload = true;
    }
  });
  //上传失败
  $webUpLoader.on('uploadError', function( /*file, reason*/ ) {
    // $('.cropper-crop-box').hide();
    submit();
    $('.pop-box-backdrop').hide();
    $('[data-defaultAddFile=topic-picker]').show();
    alert('上传失败，请重新上传');
    $noticeBox.removeClass('load-ing').show();
    isUpload = true;
  });

  //上传时
  $webUpLoader.on('uploadProgress', function(file, percentage) {
    $('.failure').hide();
    $('.cropper-canvas').hide();
    $('.cropper-crop-box').hide();
    $loadNotice.text('正在上传...');
    $('.loading-img-progress').show();
    $noticeBox.addClass('load-ing').show();
    $progress.css('width', percentage * 100 + '%');
    isUpload = false;
  });

}

var submit = function() {
  $avatarSave.on('click', function() {
    if (isUpload && $(this).hasClass('active')) {
      avatarData = $cropImg.cropper('getData');
      // avatarData = $cropImg.cropper('getImageData');
      avatarData.type = 'crop';
      // console.log(avatarData)
      $webUpLoader.on('uploadBeforeSend', function(object, data) {
        $.extend(data, avatarData);
        $avatarSave.off('click');
        $cancel.off('click');
      });
      if(avatarData.width < 2) {
        alert('截取过小，请重新截取');
      } else if(avatarData.width > 4000 || avatarData.height > 4000) {
        alert('请上传小于4000*4000像素的图片');
      } else {
        isUpload = false;
        $webUpLoader.upload(files);
      }
    }
    $cancel.addClass('active');
  });
  $cancel.on('click', function() {
    $('.pop-box-backdrop').hide();
    $('[data-defaultAddFile=topic-picker]').show();
    /*if (isUpload && $(this).hasClass('active')) {
      isUpload = false;
      avatarData = $cropImg.cropper('getData');
      avatarData.type = 'crop';
      $webUpLoader.on('uploadBeforeSend', function(object, data) {
        $.extend(data, avatarData);
      });
      $webUpLoader.retry(files);
    }*/

  });
}

var init = function(callback, uploadOptions, cropperOptions) {
  $noticeBox = $('[data-node="noticeBox"]');
  // $noticeInfo = $noticeBox.find('[data-node="noticeInfo"]');
  $wrap = $('.preview-layer');
  $cropImg = $wrap.find('img');
  $preview = $('[data-node="avatrSelector"]');
  $avatarSave = $('[data-action="avatarSave"]')
  $progress = $noticeBox.find('[data-node="uploadProgress"]');
  $error = $('[data-node="error"]');
  $loadNotice = $noticeBox.find('[data-node="loadNotice"]');
  $cancel = $wrap.find('[data-action="cancel"]');
  defaultImage = $cropImg.attr('data-default');
  var fn = callback || function() {};
  var defaultUpload = {
    pick: {
      id: '[data-defaultAddFile=topic-picker]',
      innerHTML: '<span class="icon-camara"></span><span class="topic-camara">上传封面</span>',
      multiple: false
    },
    thumb: false,
    compress: false,
    accept: {
      title: 'Images',
      extensions: 'jpg,jpeg,png',
      mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
    },
    method: 'post',
    // swf文件路径
    swf: $GLOBAL_CONFIG.pcimgpath + '/images/swf/Uploader.swf',
    disableGlobalDnd: true,
    duplicate: true,
    prepareNextFile: true,
    chunked: true,
    // width:2000,
    // height:800,
    fileVal: 'avatar_file',
    server: '/ajax/crop/crop_img_real_size',
    fileNumLimit: 1,
    fileSizeLimit: 2 * 1024 * 1024,
    fileSingleSizeLimit: 2 * 1024 * 1024
  };
  var defaultCropper = {
    strict: true,
    aspectRatio: 2/1,
    background: false,
    guides: false,
    autoCropArea:1,
    dragCrop:false,
    minContainerWidth: 2,
    minContainerHeight: 1,
    minCanvasWidth: 2,
    minCanvasHeight: 1
  };
  var upload = $.extend(true, defaultUpload, uploadOptions);
  var copper = $.extend(true, defaultCropper, cropperOptions);
  preview(upload, copper, fn);

  $("<div data-node='preview-img-cover' class='preview-img-cover' style='display:none'><img src='' /></div>").insertBefore($previewTitle0);
  submit();

  return {
    webUpLoader: $webUpLoader, //webuploader实例对象

    cropper: $cropImg //cropper实例对象
  }
}

var destroy = function(callback) {
  callback = callback || function() {};
  callback.call(null, {
    webUpLoader: $webUpLoader, //webuploader实例对象
    cropper: $cropImg //cropper实例对象
  });
  files = undefined;
  $webUpLoader.destroy();
  $cropImg.cropper('destroy');
}

var getData = function() {
  return link;
}
// init();
module.exports = {
  init: init,
  getData: getData,
  destroy: destroy
}
