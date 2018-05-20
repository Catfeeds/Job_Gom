<template>
  <div class="im-expression" v-show="isShowFace" id="facePop">
    <div class="item" v-for="(index, n) in pageShowArr"   v-bind:class="{ active: pageShowArr[n] }"  >
      <a href="javascript:;" :title="i.name" class="face" v-for="i of emojiArr[n]" @click.stop="ADD_FACE" >
        <img :src="i.url" :title="i.name">
      </a>
      
    </div>
    <div class="num">
      <span  
        v-for="(index, n) in pageShowArr" 
        v-bind:class="{ active: pageShowArr[n] }" 
        @mouseover="FACE_MOUSEOVER(n)"
      ></span>
    </div>
  </div>
</template>

<script>

  import store from '../../vuex';
  import { mapState, mapActions } from 'vuex';

  const faceModule = store.state.faceModule;
  //console.log(faceModule)
  export default {
    computed:{
      ...mapState({
        emojiArr:state =>faceModule.emojiArr,
        pageSize: state =>faceModule.pageSize,
        isShowFace: state =>faceModule.isShowFace,
        pageShowArr: state =>faceModule.pageShowArr
      })
    },
    methods:{
      ...mapActions(['FACE_MOUSEOVER', 'ADD_FACE'])
    }
  }

</script>

<style>
 @import '../../../../../css/core/face.css';
</style>

   