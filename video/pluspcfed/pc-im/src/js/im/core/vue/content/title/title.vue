<template>
  <div class="im-title">
    <h2>{{name[imId].name}}</h2>
  </div>
</template>

<script>

import store from '../../../vuex';
import { mapState, mapActions } from 'vuex';

export default {
  computed:{
    ...mapState({
      name: state =>store.state.contentTitleModule.talkName,
      imId: state => store.state.initModule.imid 
    })
  }
}

</script>

<style>
  @import  '../../../../../../css/core/title.css';
</style>

   