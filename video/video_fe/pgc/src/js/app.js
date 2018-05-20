import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import "babel-polyfill";
import {store} from 'store';
import App from 'page/app';
import renderMain from 'page/main';
import 'page/gomeIntr/index';

let $root = document.getElementById('root');

let indexPath = ['/','/login','/register'];
if(indexPath.indexOf(location.pathname) != -1){
	renderMain();
} else {
	$root && render(
	    <Provider store={store}>
	    	<React.Fragment>
	        	<App />
	        	<div className="pgc-loading-box"><span className="icon-20"></span></div>
	    	</React.Fragment>
	    </Provider>,
	    $root
	)
}