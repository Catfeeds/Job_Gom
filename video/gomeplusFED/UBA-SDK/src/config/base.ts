interface SdkWindow extends Window {
	XMLHttpRequest: () => void;
	XDomainRequest: () => void;
	ActiveXObject: (type?: string) => void;
	BPConfig: {
		shop_id: string
		produce_id: string
		channel: string
		serverTime: number
		startTime: number
		headEndTime: number
	};
	groupId?: string;
	topicId?: string;
	active_no?: string;
	_page_name_?: string;
	testinfo?: {
		socketid: string
		env: string
		fetch: string
	};
}
export const win: SdkWindow = typeof window !== 'undefined' ? <SdkWindow> window : <SdkWindow> self;
export const PAGE_ID = 'page_id';
export const dataUrl = {
	pre: '//point-pre.gomeplus.com/bomber-api/sdk/point',
	pro: '//point.gomeplus.com/bomber-api/sdk/point'
};

export const doc = document;
export let scr = win.screen,
	nav = navigator,
	ua = nav.userAgent,
	prtl = 'https:' === win.location.protocol ? 'https://' : 'http://',
	host = 'beacon.gomeplus.com/',
	// mainhost = 'gomeplus.com',
	// errorHost = 'm.gomeplus.com/',
	gifurl = prtl + host + 'log?';
/* dev-only start */
if (window['testinfo']) {
	host = window['testinfo'].report;
	gifurl = prtl + host + 'log?';
}
/* dev-only end */
