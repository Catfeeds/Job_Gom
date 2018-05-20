<template>
  <div class="outerWrap">
    <div class="im-wrap">
      <!-- 用户列表 start -->
      <list></list>
      <!-- 用户列表 end -->
      <!-- 消息区域 start -->
      <imContent></imContent>
      <!-- 消息区域 end -->
    </div>
    <!-- 图片预览 start -->
    <images></images>
    <!-- 图片预览 end -->
    <!-- 视频预览 start -->
    <videos></videos>
    <!-- 视频预览 end -->

    <face></face>

    <!-- 互踢 start -->
    <kick></kick>
    <!-- 互踢 end -->

  </div>
</template>

<script>
import list from './list/list.vue';
import imContent from './content/content.vue';
import face from './mask/face.vue';
import images from './mask/images.vue';
import videos from './mask/video.vue';
import kick from './mask/kick.vue';

export default {
  components: {
    list,
    videos,
    imContent,
    images,
    face,
    kick
  }
}
</script>
<style>
  .outerWrap,.im-wrap{height: 100%;}
</style>
