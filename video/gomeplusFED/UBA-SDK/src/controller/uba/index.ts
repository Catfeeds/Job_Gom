import { SdkBp } from './helpers';
interface BpCache {
	node: HTMLElement;
	data: SdkBp;
}
import { querySelector, permit, before } from '../../utils';
import { BP_BLOCK, BP_POINT } from '../constants';
import { bps, bplength, setData } from './helpers';
import { fetchData } from './helpers';
import { SdkControllerInterface } from '../interface';
import { allowBindClick, GOME_REGEX, pageHost } from '../../config';

@before(fetchData)
@permit(allowBindClick && !GOME_REGEX.test(pageHost))
export default class UBA implements SdkControllerInterface {
	done: boolean;
	private ptfound: boolean;
	private blockfound: boolean;
	private _filterd: SdkBp[];
	private _blocks: BpCache[];
	private _points: BpCache[];
	private ubaparam: SdkBp[];
	constructor(store, actions, { getCurrentTarget }) {
		let target = getCurrentTarget(store);
		this.done = false;
		// 拷贝筛选bps
		this._filterd = [];
		this._blocks = [];
		this._points = [];
		// 找到了精确埋点
		this.ptfound = false;
		// 当前埋点是精确埋点
		// let ptfoundCurr = false;
		// 找到了区块埋点
		this.blockfound = false;
		this.ubaparam = [];
		let haserr = false;
		for (let i = 0; i < bplength; i++) {
			let t = bps[i];
			let s = t.selector;
			let node;
			try {
				node = querySelector(s);
				this._filterd.push(t);
			} catch (e) {
				// 选择器获取失败
				/* dev-only start */
				console.log(e);
				/* dev-only end */
				haserr = true;
			}
			if (node) {
				// block
				if (t.type === BP_BLOCK) {
					this._blocks.push({
						node,
						data: t
					});
				} else if (!this.ptfound && (t.type === BP_POINT)) {
					// 很大概率 直接找到
					if (target === node) {
						this.ptfound = true;
						this.ubaparam.push(t);
					} else {
						this._points.push({
							node,
							data: t
						});
					}
				}
			}
		}
		// 去除非法的选择器
		if (haserr) {
			setData(bps);
		}
	}
	process(store, actions, { getCurrentTarget }) {
		let target = getCurrentTarget(store);
		// 查找精确埋点
		// 标识当前target是否为精确埋点
		let ptfoundCurr = false;
		if (!this.ptfound && !this.blockfound) {
			let _points = this._points;
			for (let i = 0, l = _points.length; i < l; i++) {
				if (_points[i].node === target) {
					// 找到了精确埋点
					this.ubaparam.push(_points[i].data);
					this.ptfound = true;
					ptfoundCurr = true;
					break;
				}
			}
		}
		// 向上查找区块
		if (!ptfoundCurr) {
			let blockfoundIndex;
			let _blocks = this._blocks;
			for (let i = 0, l = _blocks.length; i < l; i++) {
				if (_blocks[i].node === target) {
					// 找到了区块埋点
					this.ubaparam.push(_blocks[i].data);
					this.blockfound = true;
					blockfoundIndex = i;
					break;
				}
			}
			// 去除已找到的区块
			if (blockfoundIndex != null) {
				_blocks.splice(blockfoundIndex, 1);
			}
		}
	}
	post(store, { updateSuda }) {
		let bpdata = this.ubaparam;
		if (bpdata.length) {
			let UBAid = bpdata[0]._point_id;
			let UBA = '';
			for (let i = 0, l = bpdata.length; i < l; i++) {
				UBA += bpdata[i].pointParam + '|';
			}
			UBA = UBA.slice(0, -1).replace(/=/g, ':').replace(/&/g, '|');
			updateSuda(store, 'UBA', UBA);
			updateSuda(store, 'UBAid', UBAid);
		}
	}
}
