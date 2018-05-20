
import { win } from '../config';
import actions from './actions';
import getters from './getters';
import { BP } from '../BP';
import { SdkStore, SdkControllerInterface, SdkControllerConstructor } from './interface';
export default class Processor {
	store: SdkStore;
	start?: number;
	length?: number;
	controllers: {
		process: SdkControllerInterface[],
		post: SdkControllerInterface[]
	};
	constructor(Controllers: SdkControllerConstructor[], store: SdkStore) {
		this.store = store;
		/* dev-only start */
		this.start = win.performance && win.performance.now && win.performance.now();
		/* dev-only end */
		let length = this.length = Controllers.length;
		let process: SdkControllerInterface[] = [];
		let post: SdkControllerInterface[] = [];
		for (let i = 0; i < length; i++) {
			let ctrl = new (Controllers[i])(store, actions, getters);
			ctrl.process && process.push(ctrl);
			ctrl.post && post.push(ctrl);
		}
		this.controllers = {
			process,
			post
		};
	}
	exec(op) {
		let controllers = this.controllers[op];
		if (controllers) {
			let controller;
			let i = 0;
			while (controller = controllers[i]) {
				controller[op](this.store, actions, getters);
				if (controller.done) {
					controllers.splice(i, 1);
				} else {
					i++;
				}
			}
		}
	}
	update(target) {
		actions.setCurrentTarget(this.store, target);
	}
	post() {
		let data = getters.getSudaDate(this.store);
		// suda不存在时 无需设置href属性
		if (data) {
			let href = getters.getHref(this.store);
			if (href) {
				// dirty in final step
				data = actions.updateSuda(this.store, 'href', encodeURIComponent(href));
				// 设置 a标签href
				actions.updateATagHref(this.store);
			}
			BP.send(data);
		}
		/* dev-only start */
		let end = win.performance && win.performance.now && win.performance.now();
		(() => {
			if (this.start && end) {
				let spend = (end - this.start).toFixed(3);
				data = actions.updateSuda(this.store, 'spend', spend);
			}
		})();
		/* dev-only end */
	}
}
