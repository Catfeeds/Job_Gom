import npo from './npo.js';

export const $Promise = typeof Promise === 'function' ? Promise : npo;
