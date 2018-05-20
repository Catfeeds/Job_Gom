<template>
  <div class="fj_page">
    <!-- <p v-show="isShowP">图片加载中</p> -->
    <div v-if="attach.pics" class="main fj_box" id="fj_box">
      <img v-for="(item, index) in attach.pics" :class="{pic_preload: index <= 1 }" :src = "index <= 1 ? item.pic_url : defaultSrc" :data-src="item.pic_url" />
    </div>
    <no-result :configs="resConfigs" v-if="false"></no-result>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import store from '../../../vuex';
import noResult from '../../common/noResult';
// import defaultSrc from '@/assets/images/white.png';
export default {
  name: 'fj',
  components: {
    noResult
  },
  data(){
    return {
      resConfigs: {
        text: '暂无数据'
      },
      isShowP: true,
      defaultSrc: require('../../../assets/images/white.png'),
      // defaultSrc: defaultSrc
    }
  },
  computed:{
    ...mapState({
      configs:state=>state.xmxqModule.xmxqConfigs,
      attach:state=>state.zxxqModule.attach[state.zxxqModule.fjIndex],
      isShowNoData:state=>!state.zxxqModule.attach[state.zxxqModule.fjIndex].length
    })
  },
  methods: {
    
  },
  mounted(){
    let _this = this;
    let _height = 0;
    let _width = 0;
    let _n = 0;
    let aImgs = document.getElementsByClassName('pic_preload');
    aImgs[0].onload = function (){
      console.log(1);
      _n ++;
      if(_n == 2){
        _this.isShowP = false;
      }
    };
    aImgs[1].onload = function (){
      console.log(2);
      _n ++;
      if(_n == 2){
        _this.isShowP = false;
      }
    };
    let ele = document.getElementById('fj_box').children;
    let timer = setInterval(function (){
      _height = parseInt(getStyle(ele[0], 'height'));
      _width = parseInt(getStyle(ele[0], 'width'));
      if(_height && _width){
        clearInterval(timer);
        for(var i = 0 ; i < ele.length; i ++){
          ele[i].width = _width;
          ele[i].height = _height;
        }
      }else{
        // console.log('zai deng deng');
      }
    }, 30);
    function getStyle(obj, attr){  
      if(obj.currentStyle){  
        return obj.currentStyle[attr];  
      }else{  
        return getComputedStyle(obj,false)[attr];  
      }  
    }
    function getOffset(ele){
      var l = 0;
      var t = 0;
      while(ele){
        l += ele.offsetLeft;
        t += ele.offsetTop;
        ele = ele.offsetParent;
      }
      return {left:l, top:t};
    }
    document.addEventListener('scroll', function (){
      if(_this.$route.name == 'fj'){
        let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollBottom = document.documentElement.clientHeight + scrollT;
        for(let i = 2; i < ele.length; i ++){
          let imgT = getOffset(ele[i]).top;
          if(scrollBottom > imgT){
            ele[i].src = ele[i].getAttribute('data-src');
          }
        }
      }
    }, false);
  }
}
</script>
<style lang="scss">
.fj_page{
  p{
    margin-top: 1.4rem;
    text-align: center;
    font-size: .4rem;
  }
}
.fj_box{
  padding: .2rem;
  box-sizing: border-box;
  img{
    width: 100%;
    margin-bottom: .2rem;
  }
}
</style>