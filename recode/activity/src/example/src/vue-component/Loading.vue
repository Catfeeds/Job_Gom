<template>
  <div class="loading" v-show="childLoading">
    <div class="loading-cont">
      <div class="cont-img">
        <div class="img-box" :style="{height: loadPercent + '%'}">
          <div class="box-up"></div>
        </div>
      </div>
      <div class="percent"> <span>{{loadPercent}}</span>%</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data() {
      return {
        imagePath: $GLOBAL_CONFIG['pcimgpath']+ '/20171212/images/',
        imgArray: ["adjustBg.png", "adjustMan.png", "adjustWoman.png", "already.png", "also.png", "audioClose.png", "audioOpen.png", "back.png", "bg.jpg", "choice1.png", "choice2.png", "choice3.png", "choice4.png", "choiceBg.png", "choiceMan.png", "choicePic.jpg", "choiceWoman.png", "confirm.png", "continue.png", "cruelBg.png", "cruelMan.png", "cruelTitle.png", "cruelWoman.png", "current.png", "equip1.png", "equip2.png", "equip3.png", "equip4.png", "equipBg.png", "equipMan.png", "equipTitle.png", "equipWoman.png", "exchangeBg.png", "flame.png", "flameBg.png", "flameMan.png", "flameWoman.png", "friendBg.png", "friendMan.png", "friendWoman.png", "homeText.png", "import.png", "importNo.png", "infoBg.png", "loadImg.png", "loadImg2.png", "man.png", "manBtn.png", "manual.png", "more.png", "musicClose.png", "musicOpen.png", "numerical.png", "ok.png", "photoBtn.png", "photoMan.jpg", "photoWoman.jpg", "pitch1.png", "pitch2.png", "pitch3.png", "pitch4.png", "poster.png", "presentBg.png", "presentMan.png", "presentWoman.png", "resultBg.png", "resultMan.png", "resultWoman.png", "ruleBg.png", "ruleBtn.png", "share.png", "shareTitle.png", "stroll.png", "successfulBg.png", "temp.png", "time.png", "unclaimed.png", "vsenue.png", "warmBtn.png", "woman.png", "womanBtn.png"],
        loadPercent: 0,
      }
    },
    created() {
      let _this = this;
      (function() {
        let totle = _this.imgArray.length;
        let num = 0;
        _this.imgArray.forEach(function(item, index) {
          var img = document.createElement('img');
          img.src = _this.imagePath + item;
          img.onload = function() {
            num += 1;
            _this.loadPercent = num/totle * 100;
            _this.loadPercent = _this.loadPercent.toFixed(0);
            _this.loadHeight = _this.loadPercent + '%';
            if(_this.loadPercent/100 == 1) {
              _this.$emit('complete', true);
            }
          }
        })
      })()
    },
    props: {
      childLoading: Boolean
    }
  }
</script>
