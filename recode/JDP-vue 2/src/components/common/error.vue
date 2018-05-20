<template>
  <div>
    <div>页面加载失败，<span @click="retry">请重试</span></div>
  </div>
</template>
<script>
  export default {
    name: "app-error",
    methods: {
      retry(){
        console.log("error")
        this.$store.dispatch("error", 0)
      }
    }
  }
</script>
