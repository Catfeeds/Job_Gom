import { SdkStore, SdkAction } from './interface';
export default class Store implements SdkStore {
	private _state: {};
	constructor(data: {}) {
		this._state = data;
	}
	getState(key: string) {
		return this._state[key];
	}
	commit(action: SdkAction) {
		this._state[action.key] = action.data;
		return action.data;
	}
}
