<template>
	<div class="im-chat-scroll" id="im-scroll">
		<history></history>
		<msgNormal></msgNormal>
    <list></list>
	</div>
</template>

<script>

import store from '../../../vuex';
import { mapState, mapActions } from 'vuex';

import history from './history.vue';
import msgNormal from './msgNormal.vue';
import list from './list.vue';
export default {
	components: {
	    history,
	    msgNormal,
      list
    }
}
</script>

<style>
 @import  '../../../../../../css/core/msgInfoList.css';
</style>

   