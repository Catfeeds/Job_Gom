<template>
  <div class="load-more">
    <span>上拉加载更多</span>
    <em class="icon iconn-3"></em>
    <slot></slot>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
  export default {
    name: 'loadmore',
    props: {
      maxDistance: {
        type: Number,
        default: 0
      },
      autoFill: {
        type: Boolean,
        default: true
      },
      distanceIndex: {
        type: Number,
        default: 2
      },
      bottomPullText: {
        type: String,
        default: '上拉刷新'
      },
      bottomDropText: {
        type: String,
        default: '释放更新'
      },
      bottomLoadingText: {
        type: String,
        default: '加载中...'
      },
      bottomDistance: {
        type: Number,
        default: 70
      },
      bottomMethod: {
        type: Function
      },
      bottomAllLoaded: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        translate: 0,
        scrollEventTarget: null,
        containerFilled: false,
        bottomText: '',
        bottomDropped: false,
        bottomReached: false,
        direction: '',
        startY: 0,
        startScrollTop: 0,
        currentY: 0,
        topStatus: '',
        bottomStatus: '',
      };
    },
    watch: {
      // 改变当前加载在状态
      bottomStatus(val) {
        this.$emit('bottom-status-change', val);
        switch (val) {
          case 'pull':
            this.bottomText = this.bottomPullText;
            break;
          case 'drop':
            this.bottomText = this.bottomDropText;
            break;
          case 'loading':
            this.bottomText = this.bottomLoadingText;
            break;
        }
      }
    },
    methods: {
      onBottomLoaded() {
        this.bottomStatus = 'pull';
        this.bottomDropped = false;
        this.$nextTick(() => {
          if (this.scrollEventTarget === window) {
          document.body.scrollTop += 50;
        } else {
          this.scrollEventTarget.scrollTop += 50;
        }
        this.translate = 0;
      });
        if (!this.bottomAllLoaded && !this.containerFilled) {
          this.fillContainer();
        }
      },

      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },
      //  获取scrollTop
      getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },
      bindTouchEvents() {
        this.$el.addEventListener('touchstart', this.handleTouchStart);
        this.$el.addEventListener('touchmove', this.handleTouchMove);
        this.$el.addEventListener('touchend', this.handleTouchEnd);
      },
      init() {
        this.bottomStatus = 'pull';
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer();
          this.bindTouchEvents();
        }
      },
      fillContainer() {
        if (this.autoFill) {
          this.$nextTick(() => {
              if (this.scrollEventTarget === window) {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom;
            } else {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >= this.scrollEventTarget.getBoundingClientRect().bottom;
            }
            if (!this.containerFilled) {
              this.bottomStatus = 'loading';
              this.bottomMethod();
            }
          });
        }
      },
      //  获取监听滚动元素的scrollTop
      checkBottomReached() {
        if (this.scrollEventTarget === window) {
          return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
        } else {
          return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
        }
      },
      // ontouchstart 事件
      handleTouchStart(event) {
        this.startY = event.touches[0].clientY;
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
        this.bottomReached = false;
        if (this.bottomStatus !== 'loading') {
            this.bottomStatus = 'pull';
            this.bottomDropped = false;
        }
      },
      // ontouchmove事件
      handleTouchMove(event) {
        if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
          return;
        }
        this.currentY = event.touches[0].clientY;
        let distance = (this.currentY - this.startY) / this.distanceIndex;
        this.direction = distance > 0 ? 'down' : 'up';
        if (this.direction === 'up') {
          this.bottomReached = this.bottomReached || this.checkBottomReached();
        }
        if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
              this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
          event.preventDefault();
          event.stopPropagation();
          if (this.maxDistance > 0) {
              this.translate = Math.abs(distance) <= this.maxDistance
                      ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
          } else {
              this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
          }
          if (this.translate > 0) {
              this.translate = 0;
          }
          this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
        }
      },
      // ontouchend事件
      handleTouchEnd() {
        if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
          this.bottomDropped = true;
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
            this.translate = '-50';
            this.bottomStatus = 'loading';
            this.bottomMethod();
          } else {
            this.translate = '0';
            this.bottomStatus = 'pull';
          }
        }
        this.direction = '';
      }
    },
    mounted() {
      this.init();
    }
  };
</script>