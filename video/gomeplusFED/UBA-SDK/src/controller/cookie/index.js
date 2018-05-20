// import { PLUS_REGEX } from '../../config';
// import { getCmpid } from './helpers.js';
// export { storeCmpid } from './helpers.js';
// const DOMAIN_REGEX = /^(https?:)?\/\//;
export default function Cookie() {
}
Cookie.prototype.post = function(store, { updateHrefJson }, { getHref }) {
	let href = getHref(store);
	if (href && DOMAIN_REGEX.test(href) && !PLUS_REGEX.test(href)) {
		let cmpid = getCmpid();
		cmpid && updateHrefJson(store, 'cmpid', cmpid);
	}
};
