import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import "babel-polyfill";
import {store} from 'store';
import App from 'page/app';
import renderMain from 'page/main';

let $root = document.getElementById('root');
let indexPath = ['/','/login','/register'];
if(indexPath.indexOf(location.pathname) != -1){
	renderMain();
} else {
	$root && render(
	    <Provider store={store}>
	        <div>
	            <App />
	            <div className="pgc-loading-box"><span className="icon-20"></span></div>
	        </div>
	    </Provider>,
	    $root
	)
}
