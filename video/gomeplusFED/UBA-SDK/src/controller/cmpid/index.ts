import { PLUS_REGEX, allowBindClick, isGomePlus, win, mainhost } from '../../config';
import { permit, before } from '../../utils';
import { getCmpid } from './helpers';
import { storeCmpid } from './helpers';
import { SdkControllerInterface } from '../interface';
const DOMAIN_REGEX = /^(https?:)?\/\//;

@before(() => storeCmpid(win.location.href, mainhost, 30))
@permit(allowBindClick && isGomePlus)
export default class Cmpid implements SdkControllerInterface {
	post(store, { updateHrefJson }, { getHref }) {
		let href = getHref(store);
		if (href && DOMAIN_REGEX.test(href) && !PLUS_REGEX.test(href)) {
			let cmpid = getCmpid();
			cmpid && updateHrefJson(store, 'cmpid', cmpid);
		}
	}
}
