import React from 'react';

let linkConfig = {
	pre:[{
		title: '联系我们',
		url: '/article/1681.html'
	},{
		title: '关于我们',
		url: '/article/1680.html'
	},{
		title: '平台协议',
		url: '/article/1683.html'
	}],
	production:[{
		title: '联系我们',
		url: '/article/11180.html'
	},{
		title: '关于我们',
		url: '/article/11179.html'
	},{
		title: '平台协议',
		url: '/article/11181.html'
	}]
}

export default ()=>{

	let link = linkConfig[process.env.NODE_ENV];
	let linkLen = link.length;
	let nav = link.map((v,k)=>{
		let gapLine = linkLen-1 > k ? (<span>|</span>) : null;
		return (
			<li key={k}><a href={v.url} target="_blank">{v.title}</a>{gapLine}</li>
		);
	});

    return (
        <div className="bg">
            <ul>
                <li><a href="http://www.gomeplus.com" target="_blank">国美官网</a><span>|</span></li>
                <li><a href="https://v.gome.com.cn" target="_blank">美秒官网</a><span>|</span></li>
                {nav}
            </ul>
            <div className="copyRight">Copyright © 2015-2018 美信网络技术有限公司版权所有</div>
        </div>
    );
};