<template>
  <div>    
    <div class="im-edit">
      <textarea name="" cols="" rows="" class="edit-area" id="sendMsg"  @input="EDIT_MSG"   @keydown="SEND_MSG_TEXTAREA"></textarea>
    </div>
    <div class="im-btn">
      <a href="javascript:;" title="发送" class="btn-a" @click="SEND_MSG_BTN">发送</a>
    </div>
  </div>
</template>

<script>
  import store from '../../../vuex';
  import { mapState, mapActions } from 'vuex';
  export default {

    computed:{
      ...mapState({
        sendMsgBody: state => store.state.sendMsgModule.sendMsgBody,
      })
    },
    methods:{
      ...mapActions(['EDIT_MSG', 'SEND_MSG_TEXTAREA', 'SEND_MSG_BTN'])
    }
  }

</script>

<style>
  @import  '../../../../../../css/core/sendArea.css';
</style>

   