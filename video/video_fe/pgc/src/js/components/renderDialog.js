/**
 * [render Dialog]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import {render} from 'react-dom';
export default (component)=>{
	let portalID = 'rc-dialog-portal';
	let $portal = document.getElementById(portalID);
	if(!$portal){
		$portal = document.createElement('div');
		$portal.id = portalID;
		document.body.appendChild($portal);
	}
	render(component, $portal);
};