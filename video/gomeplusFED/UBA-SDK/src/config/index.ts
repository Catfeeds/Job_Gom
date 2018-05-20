import { ua } from './base';
import { tid } from './tid';
export * from './base';
export * from './tid';
export * from './domain';
const isGomeWebView = (/gomeplus/i).test(ua),
	isPhantomJSUser = (/PhantomJSUser/i).test(ua);
export const allowBindClick = !isGomeWebView;
// export const allowPlusHack = allowBindClick && isGomePlus;

// export const allowBindClick = !isGomeWebView && isGomePlus;
export const allowInitLog = allowBindClick || !!tid;
export const allowSendLog = !isPhantomJSUser && allowInitLog;
