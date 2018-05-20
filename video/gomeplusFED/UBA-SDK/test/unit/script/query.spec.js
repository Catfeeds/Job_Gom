
import {querySelector, querySelectorAll} from '../../../polyfill/query.js';

// 测试首页banner
let result = {};

// 选择器进行选择
// (selector) 
let secbanner = querySelector('body > div.banner > div > div.bx-viewport > ul > li:nth-child(2) > a');
// console.log(secbanner);

let allBanners = querySelectorAll('body > div.banner > div > div.bx-viewport > ul > li');

// href="https://group.gomeplus.com/topic/57ece65158e2353f4f5ad904.html?csid=150000005003"
let href = secbanner.getAttribute('href');

result['querySelector'] = /https:\/\/group\.gomeplus\.com\/topic\/\w+\.html\?csid=[0-9]+/.test(href);

// console.log(allBanners[1]);

result['querySelectorAll'] = (secbanner === allBanners[1].children[0]);

export default result;
