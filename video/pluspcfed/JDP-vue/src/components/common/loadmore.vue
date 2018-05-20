<template>
  <div @touchstart=touchstart($event) @touchmove=touchmove($event) @touchend=touchend($event) class="load-more">
    <span>{{configs.descritText}}</span>
    <em class="icon iconn-3"></em>
  </div>
</template>
<script>
import store from '../../vuex';
import {mapState} from 'vuex';
export default {
  name: 'loadmore',
  data() {
    return {
      startY: 0,
      moveY: 0
    }
  },
  props:['configs'],
  methods: {
    touchstart(event){
      this.startY = event.touches[0].clientY;
    },
    touchmove(event){
      this.moveY = event.touches[0].clientY;
    },
    touchend(event){
      /*if((this.startY - this.moveY) >= 80){
        store.dispatch('setIsLoad', true);
        switch(this.configs.type){
          case 'memberList': 
            store.dispatch('filterMembersList', true);
            break;
          case 'department':
            store.dispatch('filterDepartList', true);
            break;
          case 'filterProject':
            store.dispatch('filterProjectList', true);
            break;
        }
      }else{
        store.dispatch('setIsLoad', false);
      }*/
    }
  },
  mounted() {

  }
};
</script>