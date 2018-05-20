<template>
  <div id="hello" v-if="isShow">
    <div class="dialog-pop">
      <div class="pop-header">
        <span class="header-text">{{titleChild}}</span>
        <span class="header-close">
        <em class="icon icon-close"></em>
        </span>
      </div>
      <div class="pop-body">
        <div class="body-infor">
          {{body}}
        </div>
      </div>
      <div class="pop-footer">
        <a href="javascript:;" @click="click_ok" class="btn btn-primary">确认</a>
        <a href="javascript:;" class="btn btn-gray">取消</a>
      </div>
    </div>
    <div class="master"></div>

  </div>
</template>
<script>
export default {
  name: 'dialog',
  data : {
    isShow : true
  },
  props : {
    title : String,
    body : String,
    fun: Function,
    onSure: {
      type: Function,
      default: function() {
        this.isShow = false;
      }
    },
    onCancel: {
      type: Function,
      default: function() {
        this.isShow = false;
      }
    }
  },
  computed: {
    titleChild: function(){
        return this.title || '提示';
      }
  },
  created: function(){
    console.log(this.fun)
  },
  methods: {
    click_ok: function(){
      this.fun();
    }
  }
}
</script>