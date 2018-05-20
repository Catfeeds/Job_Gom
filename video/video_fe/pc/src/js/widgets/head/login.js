import {login, logout} from 'common/commonLogin.js';
import {loginFlag, page} from 'util/phpCommon';

const loginEle = $('[data-node=userArea]');

if (loginFlag) {
	// 已登录
	applyHtml();
} else {
	loginEle.find('p').on('click', () => {
		login();
	});
}

function applyHtml() {
	const tpl = `<div class="avatar"><a href="/u/index.html"><img src="${page.avatar}"></a></div>
            <div class="user-info hide">
                <em class="arrow"></em>
                <dl class="user-nickname">
                    <dt><a href="/u/index.html"><img src="${page.avatar}"></a></dt>
                    <dd><a href="/u/index.html">${page.nickName}</a></dd>
                </dl>
                <div class="user-nav">
                    <a href="/u/collect.html">我的收藏</a>
                    <a href="/u/sub.html">我的订阅</a>
                </div>
            </div>`;
	loginEle.html(tpl);
	loginEle.on('mouseenter', () => {
		loginEle.find('.user-info').show();
	});
	loginEle.on('mouseleave', () => {
		loginEle.find('.user-info').hide();
	});
}
