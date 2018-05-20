<template>
  <div class="im-bar">
    <a href="javascript:;" title="表情" class="bar-face" @click.stop="SHOW_FACE">
      <em class="im-icon"></em>
    </a>
    <a href="javascript:;" title="图片" class="bar-pic">
      <em class="im-icon"></em>
      <input type="file" name="file" class="ipt" @change="SEND_IMAGE"  accept="image/*">
    </a>
  </div>
</template>

<script>

  import store from '../../../vuex';
  import { mapState, mapActions } from 'vuex';
  export default {

    methods:{
      ...mapActions(['SHOW_FACE', 'SEND_IMAGE'])
    }
  }

</script>

<style>
  @import  '../../../../../../css/core/handel.css';
</style>

   