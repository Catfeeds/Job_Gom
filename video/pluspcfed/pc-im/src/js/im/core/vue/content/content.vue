<template>
  <div class="im-right">
    <div class="im-chat">
      <imTitle></imTitle>
      <msgInfoList></msgInfoList>
      <div class="im-chat-bottom">
        <handel></handel>
        <sendArea></sendArea>
      </div>
    </div>
  </div>
</template>

<script>


import imTitle from './title/title.vue';
import msgInfoList from './msg-position/msgInfoList.vue';
import handel from './handelArea/handel.vue';
import sendArea from './sendArea/sendArea.vue';

export default {
  components: {
    imTitle,
    msgInfoList,
    handel,
    sendArea
  }
}
</script>

<style>
 @import '../../../../../css/core/content.css';
</style>

   