<template>
  <div id="hostgame">
    <Loading :child-loading="loading" @complete="loadingComplete"></Loading>
    <Outer :child-outer="outer"></Outer>
  </div>
</template>

<script>
  import Loading from './vue-component/Loading.vue';
  import Outer from './vue-component/Outer.vue';

  export default {
    name: 'app',
    data() {
      return {
        loading: true,
        outer: false
      }
    },
    methods: {
      loadingComplete(beal) {
        // console.log(beal)
        this.loading = !beal;
        this.outer = beal;
      }
    },
    components: {
  		Loading,
      Outer
  	},
  }
</script>
