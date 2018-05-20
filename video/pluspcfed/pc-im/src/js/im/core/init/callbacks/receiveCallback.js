import store from '../../vuex';
import handleRecMsg from '../handleData/receiveMsg';
export const receive_callback = (msg) => {
	handleRecMsg(msg);
	store.dispatch( 'SEND_IM_MSG', msg );
}