import {ack_callback} from './callbacks/ackCallback';
import {receive_callback} from './callbacks/receiveCallback';
import {login_callback} from './callbacks/loginCallback';
import {kick_callback} from './callbacks/kickCallback';
import {logout_callback} from './callbacks/logoutCallback';
import {getNowDayDate} from '../plugin/dateFormat';
import {disConnection} from './callbacks/disConnection';

export const initSDK = () => {

	new InitConf(
		new IMConstants().setUid( $GLOBAL_CONFIG.imUserId ),
		new IMCallBack()
			.setAckImMsg(ack_callback)
			.setImMsg(receive_callback)
			.setUserLogin(login_callback)
			.setUserKicked(kick_callback)
			.setUserLogout(logout_callback)
			.setDisconnection(disConnection),
		$GLOBAL_CONFIG.token
	);
	getNowDayDate();
}