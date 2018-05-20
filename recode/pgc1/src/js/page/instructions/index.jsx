/**
 * [操作指南]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import 'css/page/instructions/index.scss';
import React, { Component } from 'react';
import { page } from 'util/phpCommon.js';

let guideImgs = [
	'guide-1.gif',
	'guide-2.gif',
	'guide-3.gif',
	'guide-4.gif',
	'guide-5.gif',
	'guide-6.jpg'
];
class Instructions extends Component{
	render(){
		let imgs = guideImgs.map((v,i) => {
			return <img key={i} src={page.jsPath+'dist/imgs/public/'+v} />;
		});
		return(
			<div className="guide-wrap">
				<div className="guide-content">
					<div className="guide-head">
						<h2>操作指南</h2>
					</div>
					<div className="guide-info">
						{imgs}
					</div>
				</div>
			</div>
		)
	}
}

export default Instructions;