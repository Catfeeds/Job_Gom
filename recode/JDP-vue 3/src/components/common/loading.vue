<template>
  <div>
    <div class="loading">
    </div>
  </div>
</template>
<script>
  export default {
    name: "app-loading"
  }
</script>
<style>
.loading{
	height: 80px;
  width: 80px;
  position:absolute;
  top: 50%;
  left: 50%;
  margin-left: -40px;
  margin-top: -40px;
  background: url(../../assets/images/loading.gif) no-repeat;
}
</style>