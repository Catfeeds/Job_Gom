<template>
  <div>
    <div class="im-more" v-show="hasHistoryMsg">
      <a href="javascript:;" @click="GET_HISTORY">查看更多消息</a>
    </div>
    <div class="im-no-more" v-show="isNoMsg">没有更多历史消息</div>
  </div>
</template>

<script>

import store from '../../../vuex';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      hasHistoryMsg:state =>store.state.listModule.curTalk.hasHistoryMsg,
      showNoMsg:state=>store.state.listModule.curTalk.showNoMsg
    }),
    isNoMsg (){
      return !this.hasHistoryMsg && !this.showNoMsg
    }
  },
  methods:{
    ...mapActions(['GET_HISTORY'])
  }
}

</script>

<style>

@import '../../../../../../css/core/history.css';
</style>

   