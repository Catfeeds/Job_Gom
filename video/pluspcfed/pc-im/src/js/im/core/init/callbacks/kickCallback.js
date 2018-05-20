import store from '../../vuex';
export const kick_callback = () => {
	store.dispatch('showKick');
}