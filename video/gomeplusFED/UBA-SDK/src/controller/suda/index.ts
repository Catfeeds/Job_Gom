import { SUDA_META } from '../constants';
import { JSONParse, permit } from '../../utils';
import { allowBindClick, isGomePlus } from '../../config';
import { SdkControllerInterface } from '../interface';

@permit(allowBindClick && isGomePlus)
export default class Suda implements SdkControllerInterface {
	done: boolean;
	enable: boolean;
	constructor() {
		this.done = false;
	}
	process(store, { assignSuda }, { getCurrentTarget }) {
		let target = getCurrentTarget(store);
		if (target.hasAttribute(SUDA_META)) {
			var metaData = target.getAttribute(SUDA_META); // json格式
			var data: any = {};
			try {
				data = JSONParse(metaData);
			} catch (err) {
				data.error = `JSON parse error, please check ${SUDA_META}`;
			}
			if (!data.name) {
				data.name = '-';
			}
			assignSuda(store, data);
			this.done = true;
		}
	}
}
