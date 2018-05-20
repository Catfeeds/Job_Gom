import { win, pageHost, PAGE_ID, allowBindClick, isGomePlus } from '../../config';
import { getSubDomain, permit } from '../../utils';
import { calcTagNum, cleanIntcmp, getIntcmp } from './helpers';
import { MOD_META } from '../constants';
import { SdkControllerInterface } from '../interface';

@permit(allowBindClick && isGomePlus)
export default class Intcmp implements SdkControllerInterface {
	public done: boolean;
	private modelid: string;
	private modeltarget: HTMLLinkElement;
	private atarget: HTMLLinkElement;
	constructor() {
		this.done = false;
	}
	process(store, actions, { getCurrentTarget }) {
		let target = getCurrentTarget(store);
		if (target.hasAttribute(MOD_META)) {
			this.modelid = target.getAttribute(MOD_META);
			this.modeltarget = target;
			this.done = true;
		} else {
			if (!this.atarget && (target.tagName.toLowerCase() === 'a') && (target.href.indexOf('javascript') === -1)) {
				this.atarget = target;
			}
		}
	}
	post(store, { setATag, updateSuda, setHref, updateHrefJson }) {
		let atarget = this.atarget;
		if (atarget) {
			let href = atarget.href;
			let intcmp;
			// pageid在其他js中赋值， 所以不能提前取得
			let pageid = win[PAGE_ID] || getSubDomain(pageHost) || 'null';
			// updateHref(store, )
			if (this.modelid) {
				let { count } = calcTagNum(this.modeltarget, atarget);
				intcmp = `${pageid}-${this.modelid}-${count}`;
				updateSuda(store, 'intcmp', intcmp);
			} else {
				intcmp = getIntcmp(href);
				if (intcmp) {
					updateSuda(store, 'intcmp', intcmp);
				}
			}
			href = cleanIntcmp(href);
			intcmp && updateHrefJson(store, 'intcmp', intcmp);
			setHref(store, href);
			setATag(store, atarget);
		}
	}
}
