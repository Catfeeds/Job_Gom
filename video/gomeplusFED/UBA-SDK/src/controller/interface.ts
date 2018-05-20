export interface SdkControllerConstructor {
	new (store: SdkStore, actions: {}, getters: {}): SdkControllerInterface;
	load?: () => void;
	enable?: boolean;
}

export interface SdkControllerInterface {
	done?: boolean;
	// constructor: (store: SdkStore, actions: {}, getters: {}) => baseController
	process ? (store: SdkStore, actions: {}, getters: {}): boolean | void;
	post ? (store: SdkStore, actions: {}, getters: {}): boolean | void;
}
export interface SdkStore {
	getState(key: string): {};
	commit(action: {}): {};
}
export interface SdkAction {
	key: string;
	data: {};
}
