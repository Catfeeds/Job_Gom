import handleRecMsg from '../handleData/receiveMsg';

import store from '../../vuex';

export const ack_callback = (msg) => {
	handleRecMsg(msg);
	store.dispatch('ACK_MSG', msg);
}