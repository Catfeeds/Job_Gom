import { SdkControllerConstructor } from './interface';
import { isMobile, addEvent } from '../utils';
import { doc } from '../config';

// export { findTagByIntcmp } from './intcmp/helpers';
import Suda from './suda';
import UBA from './uba';
import Intcmp from './intcmp';
import Cmpid from './cmpid';
import Processor from './processor';
import Store from './store';
export function load() {
	const Controllers: SdkControllerConstructor[] = [];
	for (let cc of [Suda, UBA, Intcmp, Cmpid] as SdkControllerConstructor[]) {
		if (cc.enable) {
			cc.load && cc.load();
			Controllers.push(cc);
		}
	}
	bindClickEvent(Controllers);
}

function bindClickEvent(Controllers: SdkControllerConstructor[]) {
	if (Controllers.length === 0) {
		return;
	}
	var eventType = isMobile ? 'touchstart' : 'click';
	addEvent(doc, eventType, function (e) {
		let target = e.srcElement || e.target;
		let processor = new Processor(Controllers, new Store({ target }));
		while (target && target.parentNode) {
			processor.update(target);
			processor.exec('process');
			target = target.parentNode;
		}
		// 应该已循环到最顶层
		processor.exec('post');
		processor.post();
	});
}
