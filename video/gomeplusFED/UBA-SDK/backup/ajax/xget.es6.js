import {win, utils} from '../../src/BP.js'
// Get XMLHttpRequest object
let xdr,
getXHR = win.XMLHttpRequest? function(){
	return new win.XMLHttpRequest();
}: function(){
	return new ActiveXObject('Microsoft.XMLHTTP');
},
xhr2 = (getXHR().responseType==='');


export default class Xget {

	constructor(url, data, options) {
		this.headers = {
			Accept: '*/*',
			'Cache-Control': ''
		};
		this.callback = options.callback;
		this.errHandler = options.errHandler || function(msg) {
			console.log(`error: ${msg}`);
		};
		// Prepare URL
		// 注意在此之前手动encodeURIComponent
		this.url = url + '?'+ utils.jsonToQuery(data);
	    this.options = {
	   		_async: true,
	   		timeout: 30000,
	   		attempts: 2
	    };
	    this.attempts = 0;
		this.aborted = false;
		// timeout id
		this.timeoutid = null;


	}

	abort() {
		if(!this.aborted) {
			if(this.xhr && this.xhr.readyState != 4) { // https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
				this.xhr.abort();
			}
			this.aborted = true;
		}
	}
	handleResponse(xhr = this.xhr) {
		clearTimeout(this.timeoutid);
		// Verify if the request has not been previously aborted
		if(this.aborted) {
			return;
		}
		// Handle response
		try{
			// Process response
			if(xhr.responseType == 'json') {
				if('response' in xhr && xhr.response === null) {
					throw 'The request response is empty';
				}
				this.response = xhr.response;
			}
			else {
				this.response = utils.JSONParse(xhr.responseText);
			}
			// Late status code verification to allow passing data when, per example, a 409 is returned
			// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
			if('status' in xhr && !/^2|1223/.test(xhr.status)) {
				throw xhr.status + ' (' + xhr.statusText + ')';
			}
			// Fulfilled
			this.callback(this.response);
		}
		catch(e) {
			// Rejected
			this.handleError(e.message);
		}
	}
	handleTimeout(options = this.options) {
		if(!this.aborted) {
			if(!options.attempts || ++this.attempts != options.attempts) {
				this.xhr.abort();
				this.send();
			}
			else {
				this.handleError('Timeout (' + this.url + ')');
			}
		}
	}
	handleError(message) {
		if(!this.aborted) {
			message = typeof message == 'string' ? message : 'Connection aborted';
			this.abort();
			this.errHandler(message);

		}
	}
	send({method = 'get', url = this.url, options = this.options, headers = this.headers} = {}) {
		// Get XHR object
		let xhr = getXHR();
		if(win.XDomainRequest) {
			xhr = new XDomainRequest(); // CORS with IE8/9
			xdr = true;
		}
		// Open connection
		if(xdr) {
			xhr.open(method, url);
		}
		else {
			xhr.open(method, url, options._async);
		}
		this.xhr = xhr;

		// Set headers
		if(!xdr) {
			for(var i in headers) {
				if(headers[i]) {
					xhr.setRequestHeader(i, headers[i]);
				}
			}
		}
		// Plug response handler
		if(xhr2 || xdr) {
			xhr.onload = () => {
				this.handleResponse.apply(this);
			};
			xhr.onerror = () => {
				this.handleError.apply(this);
			};
			// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
			if(xdr) {
				xhr.onprogress = function() {};
			}
		}
		else {
			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4) {
					this.handleResponse.apply(this);
				}
			};
		}
		// Plug timeout
		if(options._async) {
			if('timeout' in xhr) {
				xhr.timeout = options.timeout;
				xhr.ontimeout = () => {
					this.handleTimeout.apply(this);
				}
			}
			else {
				this.timeoutid = setTimeout(() => {
					this.handleTimeout.apply(this);
				}, options.timeout);
			}
		}
		// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
		else if(xdr) {
			xhr.ontimeout = function() {};
		}

		// Send request
		if(xdr) {
			// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
			setTimeout(function() {
				xhr.send(null);
			}, 0);
		}
		else {
			xhr.send(null);
		}
	}

}
