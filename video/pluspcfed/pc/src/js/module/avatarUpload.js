var Pubsub = require('io/pubsub');
var alert = require('module/popup/alert');
/**
 * webuploader图片上传
 */
 var WebUploader = require('../plugin/webuploader/webuploader.js'),
     ratio = window.devicePixelRatio || 1,
     initialize = {
       refs : {
         $wrap : '[data-node="cropWrap"]',
         $loadNotice : '[data-node="loadNotice"]',
         $noticeBox : '[data-node="noticeBox"]',
         $progress : '[data-node="uploadProgress"]',
         $retry : '[data-action="upload-edit"]',
         $cropImg : '',
         $editImg : '[data-edit="editImg"]'
       },
       state : {
          webuploaderutil : {},
          uploader : '',
          files : '',
          key : false,
          filter : false,
          isIE8 : !window.FormData,
          // 优化retina, 在retina下这个值是2
          thumbnailWidth : 100 * ratio,
          thumbnailHeight : 100 * ratio,
          upOption : {
              pick: {
                id: '[data-defaultAddFile=picker]',
                multiple: false
              },
              thumb: false,
              compress: false,
              accept: {
                  title: 'Images',
                  extensions: 'jpg,jpeg,png',
                  mimeTypes: 'image/jpg,image/jpeg,image/png'
              },
              method: 'post',
              // swf文件路径
              swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
              disableGlobalDnd: true,
              duplicate: true,
              prepareNextFile: true,
              chunked: true,
              fileVal: 'avatar_file',
              server: '/ajax/crop/crop_img',
              fileNumLimit: 1,
              fileSizeLimit: 2 * 1024 * 1024,
              fileSingleSizeLimit: 2 * 1024 * 1024
          }
       },
       init(Action) {
         var _this = this;
         switch (Action) {
           case 'ADD_IMG':
              $(document.body).append(`<img src="${$_CONFIG.imgpath}/images/meihao/headH.jpg" style="position: absolute; z-index: -999; width: 0; height: 0;"/>`);
              $(this.refs.$editImg).css({background: `url(${$_CONFIG.imgpath}/images/meihao/headImg.jpg) no-repeat`});
              $(this.refs.$wrap).on('mouseover', function() {
                  $(_this.refs.$editImg).css({background: `url(${$_CONFIG.imgpath}/images/meihao/headH.jpg) no-repeat`});
              }).on('mouseleave', function() {
                  $(_this.refs.$editImg).css({background: `url(${$_CONFIG.imgpath}/images/meihao/headImg.jpg) no-repeat`});
              });
              $(this.refs.$retry).parent('.img-again').css({visibility:"hidden"});
             break;
           case 'REPAIR_IMG':
              $(this.refs.$retry).parent('.img-again').css({visibility:"visible"});
              initialize.state.upOption.pick.id = '[data-action="upload-edit"]';

             break;
           default:
             return false;
         }
         window.state = {};
         var _this = this;
         this.refs.$cropImg =  $(initialize.refs.$wrap).find('img');
         this.state.uploader = WebUploader.create(this.state.upOption);

         this.error();
         this.beforeFileQueued();
         this.fileQueued();
         this.uploadProgress();
         this.uploadSuccess();
         this.uploadError();
       },
       error() {
         var _this = this;
         this.state.uploader.on('error', function() {
           $(_this.refs.$wrap).off('mouseover');
           $(_this.refs.$wrap).off('mouseleave');
           $('[data-defaultAddFile=picker]').hide();
           _this.state.uploader.addButton({
             id: '[data-action="upload-edit"]',
             innerHTML: '重新上传'
           });

           $(_this.refs.$loadNotice).find('p').text('上传失败');
           $(_this.refs.$noticeBox).addClass('right-error');
           $(_this.refs.$cropImg).attr('src', $_CONFIG.imgpath + '/images/meihao/uploadError.png');
          //  $(_this.refs.$loadNotice).show();
           $(_this.refs.$retry).parent('.img-again').css({visibility:"visible"});
           Pubsub('editImg').pub(0);
         })
       },
       beforeFileQueued() {
         var _this = this;
         this.state.uploader.on('beforeFileQueued', function() {
           window.state.filter = _this.state.filter = false;
           Pubsub('editImg').pub(0);
           $(_this.refs.$noticeBox).removeClass('right-error');
           !!_this.state.files && _this.state.uploader.removeFile(_this.state.files.id);
         });
       },
       fileQueued() {
         var _this = this;
         this.state.uploader.on( 'fileQueued', function( file ) {
             _this.state.files = file;
             // 创建缩略图
             // 如果为非图片文件，可以不用调用此方法。
             // thumbnailWidth x thumbnailHeight 为 100 x 100
             if(_this.state.isIE8 && !_this.state.key) {
               _this.state.uploader.upload(file);
               _this.state.key = true;
             } else {
               _this.makeThumb(file);
             }
             this.md5File(file);
         });
       },
       makeThumb(file) {
         var _this = this;
         _this.state.uploader.makeThumb( file, function( error, src ) {
             if ( error ) {
                $( _this.refs.$cropImg).replaceWith('<span>不能预览</span>');
                 return;
             }
            $(_this.refs.$wrap).off('mouseover');
            $(_this.refs.$wrap).off('mouseleave');
            $(_this.refs.$cropImg).css('background', 'none').attr( 'src', src );
             $('[data-defaultAddFile=picker]').hide();
             _this.state.uploader.addButton({
               id: '[data-action="upload-edit"]',
               innerHTML: '重新上传'
             });
             _this.state.uploader.upload(file);
         }, _this.state.thumbnailWidth, _this.state.thumbnailHeight );
       },
       md5File(file) {
         var _this = this;
         this.state.uploader.md5File(file).progress(function(percentage){
           $(_this.refs.$loadNotice).find('p').text('图像加载中');
           $(_this.refs.$loadNotice).show();
           $(_this.refs.$progress).css('width', percentage * 100 + '%');
         }).then(function() {
           $(_this.refs.$loadNotice).hide();
           $(_this.refs.$progress).css('width', 0);
         })
       },
       uploadProgress() {
         var _this = this;
         this.state.uploader.on('uploadProgress', function(file, percentage) {
           $(_this.refs.$loadNotice).find('p').text('图片上传中');
           $(_this.refs.$loadNotice).show();
           $(_this.refs.$progress).css('width', percentage * 100 + '%');
         })
       },
       uploadSuccess() {
         var _this = this;
         this.state.uploader.on('uploadSuccess', function(file, response) {
           if(response.success && response.code === 200) {
             if(_this.state.key) {
               $(_this.refs.$noticeBox).removeClass('right-error');
               $(_this.refs.$cropImg).attr('src', response.data[0]);
               $(_this.refs.$loadNotice).hide();
               $(_this.refs.$retry).parent('.img-again').css({visibility:"visible"});
               _this.state.key = false;
               window.state.filter = _this.state.filter = response.data[0];
               Pubsub('editImg').pub(1);
             } else {
               $(_this.refs.$noticeBox).removeClass('right-error');
               $(_this.refs.$cropImg).attr('src', response.data[0]);
               $(_this.refs.$loadNotice).hide();
               $(_this.refs.$retry).parent('.img-again').css({visibility:"visible"});
               _this.state.uploader.removeFile(_this.state.files.id);
               _this.state.files = undefined;
               window.state.filter = _this.state.filter = response.data[0];
               Pubsub('editImg').pub(1);
             }
           } else {
             alert(response.message)
             $(_this.refs.$loadNotice).find('p').text('上传失败');
             $(_this.refs.$noticeBox).addClass('right-error');
             $(_this.refs.$cropImg).attr('src', $_CONFIG.imgpath + '/images/meihao/uploadError.png');
             $(_this.refs.$loadNotice).hide();
             $(_this.refs.$retry).parent('.img-again').css({visibility:"visible"});
             Pubsub('editImg').pub(0);
           }
         })
       },
       uploadError() {
         var _this = this;
        _this.state.uploader.on('uploadError', function() {
          $(_this.refs.$loadNotice).find('p').text('上传失败');
          $(_this.refs.$noticeBox).addClass('right-error');
          $(_this.refs.$cropImg).attr('src', $_CONFIG.imgpath + '/images/meihao/uploadError.png');
          $(_this.refs.$loadNotice).show();
          $(_this.refs.$retry).parent('.img-again').css({visibility:"visible"});
          Pubsub('editImg').pub(0);
        })
       }
     }

 module.exports = initialize;
