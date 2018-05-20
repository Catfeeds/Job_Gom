<template>
  <div class="im-no-news" v-show="hasNewMsg">暂时没有新消息</div>
</template>

<script>

import store from '../../../vuex';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      hasNewMsg:state =>store.state.listModule.curTalk.showNoMsg
    })
  }
}

</script>

<style>
 @import  '../../../../../../css/core/msgNormal.css';
</style>

   