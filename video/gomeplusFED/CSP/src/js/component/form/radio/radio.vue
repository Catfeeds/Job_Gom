<template>
    <span :class="{'raido':!checked,'raido active':checked}" @click="choose"></span>
</template>
<script>
import Vue from 'vue';

const Radio = Vue.extend({
    name: 'Radio',
    props: ['value', 'checked', 'change'],
    methods: {
        choose() {
            this.checked = !this.checked;
            this.change && this.change(this.value);
        }
    }
})

Vue.component('v-radio', Radio);

export default Radio;
</script>
