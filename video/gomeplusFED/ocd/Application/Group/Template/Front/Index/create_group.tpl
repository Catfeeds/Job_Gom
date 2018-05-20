<?php
    $csspath = 'circle/createcircle.css';
    $jspath = '/js/conf/createGroup.js';
?>

<include file="Home@Public:header"/>
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/cropper.css">
<!--
<link type="text/css" rel="stylesheet" href="http://pc.gomeplus.com/public/css/module/circle/createcircle.css">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/circle/circleindex.css">
-->
 <div class="circle-bj">
      <div class="circle-con-box" data-node='circleBox'>
        <p class="pad-top10">选择圈子分类<span>选择兴趣分类，便于相同兴趣爱好的人查找（单选，必填）</span></p>
        <ul class="category-list" data-node='categoryList'>
          <foreach name="cat_lists" item="v" key="k">
              <li >
                  <a href="javascript:void(0);" node-id="<{$v.id}>" data-node='catList'><{$v.name}></a>
              </li>
          </foreach>
        </ul>

        <volist name="cat_lists" id="vo" key="k">
            <!-- <if condition="$k neq 1">hide<else />show</if> -->
            <div class="category-list2 hide" node-parent="<{$vo.id}>" data-node='categoryList2'>
                <volist name="vo.children" id="vo1">
                <a href="javascript:void(0);" node-id="<{$vo1.id}>"><{$vo1.name}></a>
                </volist>
            </div>
        </volist>

        <p>输入圈子名称<span data-node="tipName">起个响亮的圈子名称，让你的圈子更有吸引力（必填）</span></p>
        <div class="div-input"><span data-node="nameLength">0/15</span>
          <input type="text" placeholder="填写圈子名称" class="write-name" data-node="inputName">
        </div>
        <p class="pad-top10">上传圈子头像<span>请上传JPG/PNG/JPEG格式的图片（选填）</span></p>
        <div class="circle-head">
            <div class="upload-head-bx">
              <a href="javascript:" class="pc-btn pc-bj-fc8753 pc-btnw155 pc-btnh40 upload-picture" data-defaultAddFile=picker>
                <span>+</span>上传头像
              </a>
              <div class="picture-bj-img ">
                <!-- 提示类 -->
                <div  class="position-abso" data-node="noticeBox">
                  
                    <div class="picture-bx"></div>
                    <div class="load-failed-bx">
                      <span class="opacity-all"></span>
                      <span class="top-left"></span>
                      <span class="top-right"></span>
                      <span class="bottom-left"></span>
                      <span class="bottom-right"></span>
                    </div>
                    <div class="load-failed-txt failure"><span data-node="noticeInfo">图片上传失败！<span><em class="icon">&#xe98e;</em><a href="javascript:;" data-action="retry">重新上传</a></div>
                    <div class="load-failed-txt image-load">
                      <p data-node="loadNotice">图片加载中</p>
                      <div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
                      <!--img.img250(src="../../images/public/circle-default-head.jpg")-->
                    </div>
                </div>
                <!-- 默认 -->
                <div class="circle-default-head" data-node="cropWrap" >
                  <img src="<{$pcimgpath}>/images/public/circle-default-head.jpg" alt="" data-default="<{$pcimgpath}>/images/public/circle-default-head.jpg" />
                </div>
                <span class="error" data-node="error">＊ <span >图片格式有误</span> 请重新上传</span>
              </div>

              <a href="javascript:" class="pc-btn pc-bj-fc8753 pc-btnw80 pc-btnh35" data-action="avatarSave">保存</a>
            </div>
            <div class="head-preview-bx">
              <p class="head-title">效果预览</p>
              <p class="head-size">你上传的图片会自动生成2种尺寸，请注意小尺寸的头像是否清晰</p>
              <div class="picture2-bx">
                <div class="picture-bx2">
                  <div class="default-img1" data-node="avatrSelector"><img src="<{$pcimgpath}>/images/public/default-img1.jpg"></div>
                  <p class="p-size">160*160px</p>
                </div>
                <div class="picture-bx3">
                  <div class="picture-bx4">
                    <div class="default-img2" data-node="avatrSelector"><img src="<{$pcimgpath}>/images/public/default-img2.jpg"></div>
                    <p class="p-size">60*60px</p>
                  </div>
                  <div class="picture-bx5">
                    <div class="default-img3" data-node="avatrSelector"><img src="<{$pcimgpath}>/images/public/default-img3.jpg"></div>
                    <p class="p-size">30*30px</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="submit-btn"><a href="javascript:" class="pc-btn pc-btnw200 pc-btnh50" data-node='submit'>提交审核</a></div>
      </div>
    </div>
<include file="Home@Public:footer" />
