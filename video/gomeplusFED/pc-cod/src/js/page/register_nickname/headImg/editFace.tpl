  <div>
      <!--修改头像-->
      <div class="pop-box">
        <div class="ui-dialog-arrow-a"></div>
        <div class="ui-dialog-arrow-b"></div>
        <table class="ui-dialog-grid">
          <tbody>
          <!--   <tr>
            <td class="ui-dialog-header">
              <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button>
              <div class="ui-dialog-title">头像照片</div>
            </td>
          </tr> -->
            <tr>
              <td class="ui-dialog-body">
                <div class="upload-head">
                  <div class="upload-pic clearfix">
                  <a href="#" class="pc-btn pc-btn-bjfc514e pc-btnw155 pc-btnh40 upload-picture" data-defaultaddfile="picker"></a><span class="note">请上传JPG/PNG/JPEG格式的图片（选填）</span></div>
                  <div class="circle-head">
                    <div class="upload-head-bx">
                      <div class="picture-bj-img load-ing">
                        <div class="position-abso" data-node="noticeBox">
                          <div class="picture-bx"></div>
                          <div class="load-failed-bx"><span class="top-left"></span><span class="top-right"></span><span class="bottom-left"></span><span class="bottom-right"></span><span class="opacity-all"></span></div>
                          <div class="load-failed-txt failure" data-node="noticeInfo">图片加载失败！<em class="icon">&#xe98e;</em><a href="#">点击刷新</a></div>
                          <div class="load-failed-txt image-load">
                            <p data-node="loadNotice">图片加载中</p>
                            <div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
                          </div>
                        </div>
                        <div class="circle-default-head" data-node="cropWrap">
                        <img src="{{faceSrc}}" class="img250" data-default="{{faceSrc}}">
                        </div>
                        <span class="error" data-node="error">＊ <span>总文件大小超出限制</span> 请重新上传</span>
                      </div>
                    </div>
                    <div class="head-preview-bx">
                      <p class="head-title">效果预览</p>
                      <p class="head-size">你上传的图片会自动生成3种尺寸，请注意小尺寸的头像是否清晰</p>
                      <div class="picture2-bx clearfix">
                        <div class="picture-bx2">
                          <div class="default-img1" data-node="avatrSelector">
                          <img src="{{faceSrc}}"></div>
                          <p class="p-size">160*160px</p>
                        </div>
                        <div class="picture-bx3">
                          <div class="picture-bx4">
                            <div class="default-img2" data-node="avatrSelector"><img src="{{faceSrc}}"></div>
                            <p class="p-size">60*60px</p>
                          </div>
                          <div class="picture-bx5">
                            <div class="default-img3" data-node="avatrSelector"><img src="{{faceSrc}}"></div>
                            <p class="p-size">30*30px</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><a href="javascript:;" class="personal-save-btn" data-action="avatarSave">保存</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>