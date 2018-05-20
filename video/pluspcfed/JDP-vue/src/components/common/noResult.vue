<template>
  <div class="no-data">
    <em class="icon iconn-12"></em>
    <p>{{configs.text}}</p>
  </div>
</template>
<script>
export default {
  name: "no-data",
  props:['configs']
}
</script>
<style scoped lang="scss">
.no-data{
  height: 100%;
  width: 100%;
  -webkit-box-flex: 1;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
  *{
	  vertical-align: middle;
	}
	.iconn-12{
		font-size: 2rem;
		margin: 3rem 0 .8rem;
	}
	p{
		font-size: .28rem;
		color: #666;
	}
}

</style>