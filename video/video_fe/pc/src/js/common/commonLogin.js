/**
 *
 Created by zhangzhao on 2017/3/23.
 Email: zhangzhao@gomeplus.com
 */
import './login';

export let login = function () {
    window.g.login(()=>{
        window.location.reload();
    });
}

export let logout = function () {
	var loc = window.location;
	var host = loc.host;
	var href = 'https://login.gome.com.cn/login?type=logout'; // 线上
    if (host.indexOf('pre') != -1 || host.indexOf('dev') != -1) {
        href = 'http://login.atguat.com.cn/login?type=logout';
    }
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = href;
    iframe.onload = function () {
        loc.reload();
    }
}
