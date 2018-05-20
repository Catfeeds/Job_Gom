(function(window) {
	'use strict';
	function Danma(argument) {
		this.stage = null;
		this.duringTime = 4; 
		this._state = 0;
		this.pool = [];
	}

	Danma.prototype.init = function(opt) {
		var _this = this;
		this.wrap = opt.wrapper;

		this.place = 0;
		this.runningPool = []; 


		this.parser = (opt.parser || 'dom').toLowerCase();
		this._useCanvas = ( this.parser === 'canvas');

		this._isMedia = ( opt.type == 'media'); 
		this._isMedia ? this.video = opt.element : this.video = null;

		if(this.video){
			this.video.addEventListener('play', function() { _this._play(); });
			this.video.addEventListener('pause', function() { _this._pause(); });
			this.video.addEventListener('seeking', function() { _this._seek(); });
		}


		this.wrap.appendChild(this._stageBuilder());

		this.pool = JSON.parse(JSON.stringify(opt.danmaList || []));
		this.formatList(this.pool);

		this._poolRange = this.fixRange();

		if (!this._isMedia) {
			this._seek();
			this._play();
		}		

	}

	Danma.prototype.formatList = function(danmaList){
		if(this._isMedia){
			danmaList.sort(function(a, b) { return a.stime - b.stime });
		}		
	};
	
	Danma.prototype.fixRange = function(){
		var max = 9007199254740991;
		return [{ range: 0, time: -max, width: max, height: 0 }, { range: max, time: max, width: 0, height: 0 }];
	};

	Danma.prototype._stageBuilder = function() {
		if(this._useCanvas){
			this.stage = document.createElement('canvas');
			this.stage.context = this.stage.getContext('2d');
			this.stage.className = 'danma';
			this.stage.style.cssText = 'position:absolute; pointer-events:none;'; 			
		}else{
			this.stage = document.createElement('div');
			this.stage.className = 'danma';
			this.stage.style.cssText = 'position:absolute;top:0;overflow:hidden; pointer-events:none; transform:translateZ(0);'
		}

		this.width = this.wrap.offsetWidth; this.height = this.wrap.offsetHeight;

		if(this._isMedia && (!this.width || !this.height)){
		  this.width = this.video.clientWidth; this.height = this.video.clientHeight;
		}
		if(this._useCanvas){
		  this.stage.width = this.width; this.stage.height = this.height;
		}else{
		  this.stage.style.width = this.width + 'px'; this.stage.style.height = this.height - 50 + 'px';
		}
		return this.stage;		
	};	

	Danma.prototype.nodeParser = function(canvas){
		var now = this._isMedia ? this.video.currentTime : Date.now() / 1000, _node = null;
		if(canvas) this.stage.context.clearRect(0, 0, this.width, this.height);

		for (var i = this.runningPool.length - 1; i >= 0; i--) {
			_node = this.runningPool[i];
			if (now - this.runningPool[i].stime > this.duringTime){
				if(canvas){
					_node.canvas = null;
					this.runningPool.splice(i, 1);
				}else{
					this.stage.removeChild(_node.dom);
					this.runningPool.splice(i, 1);
				}
			}
		}

		if(!canvas) var pendingPool = [], fragment_tree = document.createDocumentFragment();
		while (this.place < this.pool.length && this.pool[this.place].stime < now) {
			_node = this.pool[this.place];

			canvas?_node.canvas = Danma.utils.createNode(this._useCanvas, _node): _node.dom = Danma.utils.createNode(this._useCanvas, _node);
			if(canvas) _node.y = this.getTop(_node)
			this.runningPool.push(_node); 
			if(!canvas){
				pendingPool.push(_node);
				fragment_tree.appendChild(_node.dom);
			}
			++this.place;
		}
		if (!canvas && pendingPool && pendingPool.length) {
			this.stage.appendChild(fragment_tree);
		}	
		if(!canvas){
			for (var p = pendingPool.length - 1; p >= 0; p--) {
				_node = pendingPool[p];
				_node.width = _node.width || _node.dom.offsetWidth;
				_node.height = _node.height || _node.dom.offsetHeight;
				_node.y = this.getTop(_node);
			}			
		}

		for (var r = this.runningPool.length - 1; r >= 0; r--) {
			_node = this.runningPool[r];
			var elapsed = (this.width + _node.width) * (now - _node.stime) / this.duringTime;
			_node.x = this.width - elapsed;
			canvas?this.stage.drawImage(_node.canvas, _node.x, _node.y):_node.dom.style.cssText += Danma.utils.transforming(_node.x, _node.y);
		}

		return this.nodeParser;
	} 	

	Danma.prototype.getTop = function(node){
		var poolname = '_poolRange',
			nodeLen = this[poolname].length,
			last = 0,
			curr = 0;
		for (var i = 1; i < nodeLen; i++) {
			var currect = this[poolname][i];
			var requiredRange = node.height;

			if (currect.range - this[poolname][last].range > requiredRange) {
			curr = i; break;
			}	

			if (this.collide(currect, node)) last = i;		    		
		};

		var channel = this[poolname][last].range;
		var crObj = { range: channel + node.height, time: node.stime, width: node.width, height: node.height };
		this[poolname].splice(last + 1, curr - last - 1, crObj);	

		return channel % (this.height - node.height);;
	}

	Danma.prototype.collide = function(currect, node){
		var now = now = this._isMedia ? this.video.currentTime : Date.now() / 1000;
		var rip = (this.width + currect.width) * (now - currect.stime) / this.duringTime;
		var curRip = this.duringTime + currect.time - now;
		var nodeRip = this.duringTime * this.width / (this.width + node.width);
		return (curRip > nodeRip) || (currect.width > rip);
	}

	Danma.prototype.add_emit = function(comment){
		for (var s = 0; s< comment.length; s++) {	
			if (this._isMedia) {
				var now = this.video.currentTime;
				comment[s].time = comment[s].stime || now;
				this.pool.splice(Danma.utils.binsearch(this.pool, 'stime', now) + 1, 0, comment[s]);
			} else {
				comment[s].stime = new Date().getTime() / 1000;
				this.pool.push(comment[s]);
			}
		}
		this.formatList(this.pool);
		return this;		
	}

	Danma.prototype.clear = function(){
		if (this._useCanvas) {
			this.stage.context.clearRect(0, 0, this.width, this.height);
			for (var i = this.runningPool.length - 1; i >= 0; i--) {
				this.runningPool[i].canvas = null;
			}
		} else {
			var _last = this.stage.lastChild;
				while (_last) {
					this.stage.removeChild(_last);
					_last = this.stage.lastChild;
				}
			}
			this.runningPool = [];
		return this;
	};

	Danma.prototype._seek = function(){
		var now = this._isMedia ? this.video.currentTime : Date.now() / 1000;
		this.clear();
		this.fixRange();
		this.place = Danma.utils.binsearch(this.pool, 'stime', now);
		return this;
	};

	Danma.prototype._play = function(){
		var _this = this, _parse = _this.nodeParser();
		function frame() {
			_parse.call(_this, _this._useCanvas)
			_this._state = RAF(frame);
		}	
		this._state = RAF(frame);	
	};	

	Danma.prototype._pause = function(){
		this.paused = true;
		CAF(this._state);
		this._state = 0;
	};	

	Danma.utils = {
		createNode: function(type, curDanma){
			if(!type){
				var node = document.createElement('div');
				node.appendChild(document.createTextNode(curDanma.content));
				node.style.cssText = 'position:absolute;';
				if (curDanma.style) {
					for (var key in curDanma.style) {
						node.style[key] = curDanma.style[key];
					}
				}
				return node;		
			}else{
				var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d');
				var font = (curDanma.canvasStyle && curDanma.canvasStyle.font) || '10px sans-serif';
				ctx.font = font;
				canvas.width = curDanma.width || ((ctx.measureText(curDanma.content).width + .5) | 0);
				canvas.height = curDanma.height || ((font.match(/(\d+)px/)[1] * 1.2 + .5) | 0);
				curDanma.width = canvas.width; curDanma.height = canvas.height;
				if (curDanma.canvasStyle) {
					for (var key in curDanma.canvasStyle) {
						ctx[key] = curDanma.canvasStyle[key];
					}
				}
				ctx.textBaseline = 'top';
				ctx.strokeText(curDanma.content, 0, 0);
				ctx.fillText(curDanma.content, 0, 0);

				return canvas;		    	
			}
		},

		binsearch: function(a, k, t) {
			var m = 0;
			var l = 0;
			var r = a.length;
			while (l < r) {
				m = (l + r) >> 1;
				if (t <= a[m][k]) {
					r = m - 1;
				} else {
					l = m + 1;
				}
			}
			return Math.max(0, r);
		},

		transforming: function (x, y) {
			var vendors = ['', '-o-', '-ms-', '-moz-', '-webkit-'];
			var translateStr = 'transform:translate(' + x + 'px,' + y + 'px);';
			var transformStr = '';
			for (var i = vendors.length - 1; i >= 0; i--) {
				transformStr += vendors[i] + translateStr;
			}
			return transformStr;		
		},

		parseDom: function(arg) {
			var objE = document.createElement('div');
			objE.innerHTML = arg;
			return objE.childNodes;
		}
	}

	//polyfill4requestAnimeFrame on window
	var lastTime = 0;
	var prefixes = 'webkit moz ms o'.split(' '); 

	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;

	var prefix;
	for( var i = 0; i < prefixes.length; i++ ) {
		if ( requestAnimationFrame && cancelAnimationFrame ) {
		  break;
		}
		prefix = prefixes[i];
		requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
		cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
	}

	if ( !requestAnimationFrame || !cancelAnimationFrame ) {
		requestAnimationFrame = function( callback, element ) {
		  var currTime = new Date().getTime();
		  var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ); 
		  var id = window.setTimeout( function() {
			callback( currTime + timeToCall );
		  }, timeToCall );
		  lastTime = currTime + timeToCall;
		  return id;
		};
		
		cancelAnimationFrame = function( id ) {
		  window.clearTimeout( id );
		};
	}
	var RAF = requestAnimationFrame; 
	var CAF = cancelAnimationFrame;		

	
	window.Danma = Danma;
})(window)