<?php
    $csspath = 'createcircle.css';
    $jspath = '/js/conf/createCompile.js';
?>

<include file="Home@Public:header"/>
<script>
    var group_id = '<{$gid}>';
    var old_name = '<{$circleInfo['name']}>';
</script>
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/cropper.css">
<!--
<link type="text/css" rel="stylesheet" href="http://pc.gomeplus.com/public/css/module/circle/createcircle.css">
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/circle/circleindex.css">
-->

<div class="circle-bj" data-small="circle-bjS">
    <div class="circle-con-box" data-node="circleBox">
        <p class="circle-name"> 输入圈子名称<span>起个响亮的圈子名称，让你的圈子更有吸引力（必填）</span></p>
        <div class="div-input"><span data-node="nameLength">0/15</span>
            <input class="write-name" type="text" placeholder="填写圈子名称" value="<{$circleInfo['name']}>" data-node="inputName">
        </div>
        <p class="circle-selected circle-name pad-top10">
            <em data-node="circle-selected">选择圈子分类</em>
            <span data-node="circle-selected-classify" class="circle-selected-classify" node-id="<{$circleInfo['category']['id']}>">
                <{$circleInfo['category']['name']}>
            </span>
        </p>
        <div class="circle-category">
            <ul class="category-list" data-node="category-list">
                <foreach name="cat_lists" item="v" key="k">
                    <li class="list-li" data-node="category-list-li">
                        <a class="li-img" href="javascript:;" node-id="<{$v.id}>" data-node='catList' >
                            <div>
                                <img onerror="imgError(this,'m')" src="<{$pcimgpath}>/images/circle_category/cat<{$v.id}>.png" data-node='categoryList'/>
                                <if condition="$v.id == $circleInfo['category']['parent']['id']">
                                    <span data-node="img-active" class="img-active" ></span>
                                <else />
                                    <span data-node="img-active" ></span>
                                </if>

                            </div>
                            <em><{$v.name}></em>
                        </a>
                        <notempty name="v.children">
                            <div class="category-list2" data-node="category-list2"><i></i>
                                <div class="category-hover" data-node="category-hover">
                                    <volist name="v.children" id="vo1">
                                        <if condition="$vo1.id == $circleInfo['category']['id']">
                                            <a herf="javascritp:;" class="hoverActive" node-id="<{$vo1.id}>" data-node='categoryList2'><{$vo1.name}></a>
                                        <else />
                                            <a herf="javascritp:;" node-id="<{$vo1.id}>" data-node='categoryList2'><{$vo1.name}></a>
                                        </if>


                                    </volist>
                                </div>
                            </div>
                        </notempty>
                    </li>
                </foreach>
            </ul>
        </div>
        <p>输入圈子简介<span>输入圈子介绍，你的圈子更加精彩</span></p>
        <div class="introduce-textarea" data-node="introduce-textarea"><span data-node="introduce-textareaNum">0/500</span>
            <textarea class="write-introduce" data-node="textarea-info" placeholder="请输入圈子简介" data-node="introduction"><{$circleInfo['introduction']}></textarea>
        </div>
        <p class="pad-top10">上传圈子头像<span>请上传JPG/PNG/JPEG格式的图片（选填）</span></p>
        <div class="circle-head">
            <div class="error" data-node="error">＊请上传小于2M的图片，支持格式jpg、jpeg、png！</div>
            <div class="upload-head-bx">
             
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
                    <div class="load-failed-txt failure"><span data-node="noticeInfo">图片上传失败！<span><em class="icon iconn-24"></em><a href="javascript:;" data-action="retry">重新上传</a></div>
                    <div class="load-failed-txt image-load">
                      <p data-node="loadNotice">图片加载中</p>
                      <div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
                      <!--img.img250(src="../../images/public/circle-default-head.jpg")-->
                    </div>
                </div>
                <!-- 默认 -->
                <div class="circle-default-head" data-node="cropWrap" >
                    <!-- <div data-defaultAddFile="picker"></div> -->
                    <notempty name="circleInfo.icon">
                        <img src="<{$circleInfo['icon']}>">
                    <else />
                        <img src="<{$pcimgpath}>/images/public/circle-default2.png" alt="" data-default="<{$pcimgpath}>/images/public/circle-default2.png.jpg" data-edit="btn"/>
                    </notempty>
                </div>
              </div>
                <div class="pc-btn-box">
                    <a class="pc-btn-amend pc-bj-fc8753 pc-btnw80 pc-btnh35" href="javascript:" data-action="upload-edit" data-defaultAddFile="picker">修改</a>
                    <a class="pc-btn pc-bj-fc8753 pc-btnw80 pc-btnh35" href="javascript:" data-action="avatarSave">保存</a>
                </div>
            </div>
            <div class="head-preview-bx">
              <p class="head-title">效果预览</p>
              <p class="head-size">你上传的图片会自动生成3种尺寸，请注意小尺寸的头像是否清晰</p>
              <div class="picture2-bx">
                <div class="picture-bx2">
                  <div class="default-img1" data-node="avatrSelector">
                      <notempty name="circleInfo.icon">
                          <img src="<{$circleInfo['icon']}>">
                      <else />
                          <img src="<{$pcimgpath}>/images/public/default-img1.jpg">
                      </notempty>

                  </div>
                  <p class="p-size">160*160px</p>
                </div>
                <div class="picture-bx3">
                  <div class="picture-bx4">
                    <div class="default-img2" data-node="avatrSelector">
                        <notempty name="circleInfo.icon">
                            <img src="<{$circleInfo['icon']}>">
                        <else />
                            <img src="<{$pcimgpath}>/images/public/default-img2.jpg">
                        </notempty>
                    </div>
                    <p class="p-size">60*60px</p>
                  </div>
                  <div class="picture-bx5">
                    <div class="default-img3" data-node="avatrSelector">
                        <notempty name="circleInfo.icon">
                            <img src="<{$circleInfo['icon']}>">
                        <else />
                            <img src="<{$pcimgpath}>/images/public/default-img3.jpg">
                        </notempty>
                    </div>
                    <p class="p-size">30*30px</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="submit-btn"><a class="pc-btn pc-bj-fc8753 pc-btnw200 pc-btnh50" href="javascript:" data-node='submit'>提交审核</a></div>
    </div>
</div>


<include file="Home@Public:footer" />
